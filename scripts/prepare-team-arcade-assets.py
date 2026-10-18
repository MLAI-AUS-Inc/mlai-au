"""Pack original 4x4 fighter keyframes and prepare small homepage images.

Run with Python/Pillow and --sam-sheet /path/to/source.png --sonia-sheet ... .
The runtime consumes 256px cells, anchored at centre x=128, feet y=230.
This is asset packing only; source artwork is generated separately.
"""
from argparse import ArgumentParser
from pathlib import Path
import re
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/games/team-arcade/v1"


def pack(source, name):
    image = Image.open(source).convert("RGBA")
    cells = []
    for row in range(4):
        for col in range(4):
            cell = image.crop((round(col*image.width/4), round(row*image.height/4), round((col+1)*image.width/4), round((row+1)*image.height/4)))
            bounds = cell.getchannel("A").point(lambda x: 255 if x > 24 else 0).getbbox()
            if not bounds:
                raise ValueError(f"{name}: empty frame {len(cells)}")
            cells.append(cell.crop(bounds))
    # One shared scale preserves crouching, jump and fallen proportions.
    scale = 188 / cells[0].height
    atlas = Image.new("RGBA", (1024, 1024))
    for index, cell in enumerate(cells):
        frame_scale = min(scale, 238/cell.width, 220/cell.height)
        cell = cell.resize((round(cell.width*frame_scale), round(cell.height*frame_scale)), Image.Resampling.NEAREST)
        atlas.alpha_composite(cell, (index%4*256+(256-cell.width)//2, index//4*256+230-cell.height))
    atlas.save(OUT / f"{name}.webp", lossless=True, method=6)
    print(f"{name}: 16 frames, 1024x1024, {(OUT / f'{name}.webp').stat().st_size:,} bytes")


def thumbnails():
    source = (ROOT / "app/components/team.tsx").read_text()
    for relative in re.findall(r'imageUrl: "(/press-kit/[^\"]+)"', source):
        original = Image.open(ROOT / "public" / relative.lstrip("/")).convert("RGB")
        original.thumbnail((192, 192), Image.Resampling.LANCZOS)
        target = ROOT / "public/press-kit/thumbnails" / (Path(relative).stem + ".webp")
        target.parent.mkdir(parents=True, exist_ok=True)
        original.save(target, "WEBP", quality=80, method=6)
    for gif in (ROOT / "public/press-kit/pixel-art").glob("*-pixel.gif"):
        frame = Image.open(gif).convert("RGBA")
        frame.thumbnail((400, 400))
        frame.save(gif.with_name(gif.stem + "-still.webp"), "WEBP", quality=85, method=6)
    for name, source_name in [("sam", "team-sam-donegan.png"), ("sonia", "team-sonia-kaurah.webp")]:
        image=Image.open(ROOT / "public/press-kit" / source_name).convert("RGB")
        # Crop from the centre to preserve recognisable selection portraits.
        size=min(image.size)
        image=image.crop(((image.width-size)//2,(image.height-size)//2,(image.width+size)//2,(image.height+size)//2))
        image.resize((320,320),Image.Resampling.LANCZOS).save(OUT / f"{name}-portrait.webp",quality=84,method=6)


if __name__ == "__main__":
    parser=ArgumentParser()
    parser.add_argument("--sam-sheet", type=Path, required=True)
    parser.add_argument("--sonia-sheet", type=Path, required=True)
    args=parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    pack(args.sam_sheet,"sam")
    pack(args.sonia_sheet,"sonia")
    thumbnails()
