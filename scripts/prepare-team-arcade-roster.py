"""Pack generated full-roster action sheets without cutting off extended limbs.

Usage: python3 scripts/prepare-team-arcade-roster.py --manifest .local/roster-art.json
The manifest is a list of {id, source} records. Source artwork stays local;
only final 1024px WebP atlases are served from public/games/team-arcade/v2/.
Requires Pillow. Connected alpha components recover a complete sprite when a
generated kick or defeated pose extends a little beyond its nominal grid cell.
"""
from argparse import ArgumentParser
from collections import deque
from hashlib import sha256
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/games/team-arcade/v2"
IDS = {"ryan", "pegah", "yana", "anjali", "anu", "daniel", "jun", "alisa", "shan", "kang", "juan", "alan", "callum"}


def frames_from_alpha(image):
    width, height = image.size
    alpha = image.getchannel("A").tobytes()
    remaining = bytearray(1 if value > 24 else 0 for value in alpha)
    groups = [[] for _ in range(16)]
    for start in range(len(remaining)):
        if not remaining[start]:
            continue
        remaining[start] = 0
        queue = deque([start])
        pixels = []
        left, top, right, bottom = width, height, 0, 0
        while queue:
            index = queue.popleft()
            pixels.append(index)
            x, y = index % width, index // width
            left, top, right, bottom = min(left, x), min(top, y), max(right, x + 1), max(bottom, y + 1)
            for ny in range(max(0, y - 1), min(height, y + 2)):
                for nx in range(max(0, x - 1), min(width, x + 2)):
                    neighbor = ny * width + nx
                    if remaining[neighbor]:
                        remaining[neighbor] = 0
                        queue.append(neighbor)
        if len(pixels) < 12:
            continue
        col = min(3, int((left + right) * 2 / width))
        row = min(3, int((top + bottom) * 2 / height))
        groups[row * 4 + col].append((left, top, right, bottom, pixels))

    frames = []
    for number, parts in enumerate(groups):
        if not parts or sum(len(part[4]) for part in parts) < 1000:
            raise ValueError(f"Frame {number}: missing or incomplete sprite")
        left, top = min(p[0] for p in parts), min(p[1] for p in parts)
        right, bottom = max(p[2] for p in parts), max(p[3] for p in parts)
        crop = image.crop((left, top, right, bottom))
        mask = bytearray(crop.width * crop.height)
        for part in parts:
            for index in part[4]:
                x, y = index % width - left, index // width - top
                mask[y * crop.width + x] = alpha[index]
        crop.putalpha(Image.frombytes("L", crop.size, bytes(mask)))
        # Remove RGB hidden under zero alpha, keeping inspection tools clean.
        clean = Image.new("RGBA", crop.size)
        clean.alpha_composite(crop)
        frames.append(clean)
    return frames


def pack(record):
    fighter = record["id"]
    if fighter not in IDS:
        raise ValueError(f"Unexpected fighter ID: {fighter}")
    image = Image.open(record["source"]).convert("RGBA")
    frames = frames_from_alpha(image)
    shared_scale = 188 / frames[0].height
    atlas = Image.new("RGBA", (1024, 1024))
    coverage = []
    for index, frame in enumerate(frames):
        scale = min(shared_scale, 238 / frame.width, 220 / frame.height)
        frame = frame.resize((max(1, round(frame.width * scale)), max(1, round(frame.height * scale))), Image.Resampling.NEAREST)
        atlas.alpha_composite(frame, (index % 4 * 256 + (256 - frame.width) // 2, index // 4 * 256 + 230 - frame.height))
        coverage.append(sum(value > 24 for value in frame.getchannel("A").tobytes()))
    target = OUT / f"{fighter}.webp"
    atlas.save(target, lossless=True, method=6)
    result = {"id": fighter, "file": str(target.relative_to(ROOT)), "bytes": target.stat().st_size, "frames": len(frames), "opaquePixels": coverage, "sha256": sha256(target.read_bytes()).hexdigest()}
    print(f"{fighter}: 16 action frames, {result['bytes']:,} bytes")
    return result


if __name__ == "__main__":
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", type=Path, required=True)
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    records = json.loads(args.manifest.read_text())
    if len({r["id"] for r in records}) != len(records):
        raise ValueError("Duplicate fighter IDs in source manifest")
    OUT.mkdir(parents=True, exist_ok=True)
    results = [pack(record) for record in records]
    if args.report:
        args.report.write_text(json.dumps(results, indent=2) + "\n")
