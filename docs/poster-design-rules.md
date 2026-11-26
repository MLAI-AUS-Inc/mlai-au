# Poster design rules

The public site uses the same gig-poster language as MLAI Chat: photocopied, pasted up crooked, lettered by
hand, a bit careless and proud of it. It should feel made by a person in a hurry who has good taste.

The page is a dark brick wall. Each section of the home page is a bill pasted on that wall in its own spot ink.
The sidebar is a black rail with torn labels. An article is one clean sheet of paper on the wall, and the
reading on it stays level.

The styles live in `app/styles/poster/` and the art in `public/poster/`. Classes start with `mp-` and tokens
with `--mp-`. (`/kindness` has its own `rk-` styles and is separate.)

| File | Holds |
| --- | --- |
| `tokens.css` | Inks, type voices, tilt angles, drops, textures, tape, marks |
| `primitives.css` | Wall, bills, cards, scraps, tape, titles, buttons, labels, stamps, marks |
| `shell.css` | Sidebar rail, menu button, section ticks and dividers, footer |
| `home.css` | Home page sections |
| `articles.css` | Article cards, the articles index, article pages |

A page opts in with `mp-page` on its outer element (add `mp-wall` for the brick ground). The sidebar and
footer use `mp-shell` and show on every route.

There are twelve rules. When a page looks wrong, one of them has been broken.

## 1. Nothing sits square

No bill, card, button, label, stamp or picture is level. Each leans by a small fixed amount.

- Paper (bills, cards, notices) leans between 0.3 and 1.1 degrees. Use `--mp-a1` to `--mp-a5`.
- Small loud things (buttons, labels, badges, stamps, tape) lean between 1.5 and 4 degrees. Use `--mp-b1` to
  `--mp-b5`.
- Neighbours never lean the same way. Alternate by position with `:nth-child`, never by chance. The same page
  looks the same every time.
- Every angle is multiplied by `--mp-tilt`, which drops to 0.6 on phones. Never write a bare `rotate(2deg)`.

Five things stay level, always:

1. Anything you type into.
2. Long text you read: the article sheet and its body.
3. Table rows and calendar grids, so columns line up.
4. Scroll containers. Lean the things inside them, not the scroller.
5. The page frame: the sidebar column and the edge of the main area.

A leaning box must not cut off its own corners. Give its parent a little padding.

## 2. No machine edges

- Corner radius is zero. Circles are allowed for pins: avatars and dots (`mp-pin`, `mp-round`).
- Keylines are ink: 2px or 3px solid, or a dashed typewriter rule for table and list lines. No 1px grey
  hairlines.
- Depth is a hard offset slab (`--mp-drop`, `--mp-drop-spot`). No blur, no glow, no gradient shine, no glass.
- Dividers are scribbles, torn edges or a row of typed dashes.

## 3. Black does the work

Roughly a third of any page is black or near black: the rail, the wall, the footer, the black bills, primary
buttons. Cream type on black is the loudest thing on the page. Black furniture carries photocopy speckle.

## 4. Colour is scarce and off-register

- The inks: ink `#1A1A1A`, paper `#F5F0E6`, orange `#FF3C00`, yellow `#FEFC22`, red `#FF003D`, blue `#3637DC`,
  teal `#00FFD7`, purple `#4B0DB3`.
- One spot ink per bill. Set it with `data-mp-ink` on the bill; `--mp-spot` and `--mp-on-spot` follow. A bill
  may be printed on its spot colour (`mp-bill--spot`), but it still has only one.
- Elsewhere spot colour is an off-register print: a slab behind a headline or a button, a highlighter swipe, a
  stamp, a scribble. Never a soft tint or a gradient.
- Text must pass contrast. Ink on cream, yellow, teal and orange. Cream on black, blue, purple and red. Never
  orange or red text smaller than a headline on cream.

## 5. Four voices of type

| Voice | Face | Class | Used for |
| --- | --- | --- | --- |
| Shout | Anton, caps | `mp-shout`, `mp-title` | Page titles, bill headlines, big numbers |
| Head | Oswald, caps, 700 | `mp-head` | Section headings, buttons, menu items, card titles |
| Typewriter | Special Elite | `mp-type` | Labels, dates, meta, table headers, short blurbs on furniture |
| Marker | Permanent Marker | `mp-hand` | Rare hand notes: one or two per page |

Article body copy stays in Inter at its normal size. Loud type is for furniture, not for what people came to
read. Sizes are rem.

## 6. Paper, tape and grit

- Bills and cards are stock with grain, an ink keyline and a hard drop.
- Bills are taped to the wall (`data-mp-tape`, or an `mp-tp` piece). Tape is crooked.
- A card inside a bill is a pasted scrap: thinner line, smaller drop (`mp-scrap`).
- Grit lives on furniture only, and it is printed light on coloured stock. Nothing heavily textured sits
  behind text you read.

## 7. Marks are made by hand

The current section in the rail is pulled out with chevrons and a yellow number block, not a pill. Underlines
are scribbles. Emphasis is a highlighter swipe (`mp-hilite`), a strip (`mp-strip`) or a stamp. Icons stay
where they carry meaning, drawn in ink.

## 8. Pictures go through the copier

Photos used as furniture are photocopied: greyscale and high contrast (`mp-xerox`, `--mp-copier`). That covers
testimonial portraits and article hero images. Sponsor logos, the team arcade and pictures inside article
content are left as they are.

## 9. Roo turns up only where Roo is named

Roo is the MLAI logo, so Roo appears as the logo in the rail, the footer and the phone hero. Nowhere else
unless the words say Roo. There is no Cocky and no Wombat. A page never needs a character to feel finished.

## 10. Things move like cut paper

Nothing glides. Hover jolts a button up and off-angle in two steps (`steps()`). Press slams it flat and the
drop disappears. `prefers-reduced-motion` is honoured: no movement, same end state.

## 11. Loud around the edges, calm in the middle

The poster treatment belongs to headers, navigation, cards and buttons. Reading surfaces (article text,
tables, forms, the calendar) stay quiet, level and clean, with the poster showing around them. If a page is
hard to use, turn the furniture down before touching the content.

## 12. Same places, same words

The poster look never moves a section, renames a control or changes what anything does. It only changes how
things look. Article content files are not edited for style: `articles.css` restyles what they already render.

## Building with it

- A home section is `<section class="mp-sec">` holding a `<div class="mp-bill" data-mp-ink="…">`. Pick the
  bill's stock with `mp-bill--black`, `mp-bill--spot` or `mp-bill--kraft`, and its lean with `mp-bill--a2` to
  `--a5`.
- On black stock set `data-mp-ground="black"` so lines and text flip to paper. Paper pasted back on top sets
  `data-mp-ground="paper"`.
- Buttons are `mp-btn` with `--go`, `--spot`, `--paper`, `--teal`, `--purple` and `--lg`.
- To bring another route into the look, add `mp-page mp-wall` to its outer element, wrap its sections in
  bills, and put any route-specific rules in a new file in `app/styles/poster/`.

## Checklist for a new page

1. Is anything other than the five exceptions sitting level?
2. Is there a rounded corner, a soft shadow or a grey hairline?
3. Is about a third of it black?
4. Does each bill have exactly one spot ink?
5. Is every heading in one of the four voices, and body text left alone?
6. Can you read and use everything at 390px wide and at 200% text?
7. Is there a character anywhere the words do not say Roo?
8. Does every link, button and form still do what it did?
