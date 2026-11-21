---
name: Vibrant Civic Tech Retail
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#434655'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display:
    fontFamily: Manrope
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Manrope
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Manrope
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an approachable, premium, yet deeply trustworthy digital retail presence for a community-rooted consumer technology brand in Pune. It pairs high-velocity e-commerce clarity with the warmth and reliability of an established neighborhood destination. The visual direction balances modern consumer tech minimalism with utilitarian clarity: generous breathable negative space, precise product framing, crisp typography, and intentional pops of electric royal blue to convey forward-looking digital confidence. 

The aesthetic eschews visual clutter, aggressive promotional banners, or dense dark patterns. Instead, it leans on structured modernism: pristine white canvases, soft slate framing surfaces, subtle optical borders, and tactile, rounded cards that treat smartphones, audio gear, and appliances as refined design objects. The atmosphere is quiet, dependable, and swift.

## Colors

The palette relies on absolute purity in the surface tier and intentional restraint in interactive signaling:

- **Primary (`#2563EB`):** High-energy royal blue reserved strictly for active states, conversion actions (Add to Cart, Buy Now), key category badges, and focused interactive outlines.
- **Secondary (`#0D9488`):** Balanced emerald-teal used for positive validation, official warranty badges, WhatsApp direct-connect touchpoints, and in-stock inventory markers.
- **Tertiary (`#F59E0B`):** Warm amber applied sparingly for seasonal festival offers, trade-in value highlights, and verified customer rating stars.
- **Neutral Base (`#111827`):** Dark rich slate providing high-contrast accessibility for headlines, product titles, and primary iconography.
- **Support Tones:** Soft slate secondary text (`#64748B`) establishes clear data hierarchy; delicate cool-grey borders (`#E2E8F0`) define structure; and pristine off-white canvas layers (`#F8FAFC` to `#FFFFFF`) guarantee clarity across extensive catalog pages.

## Typography

The typographic hierarchy combines **Manrope** for authoritative structural framing with **Inter** for neutral, utilitarian information delivery:

- **Headlines & Feature Titles:** Rendered in Manrope with geometric curves and tight letter-spacing. This produces a contemporary, premium electronic showroom cadence. Large numerals in specification comparisons and Indian Rupee (`₹`) pricing use Manrope's bold figures for instant readability.
- **Body & Technical Specs:** Inter handles micro-copy, tabular device comparisons, technical spec lists, and policy prose. Inter maintains neutral legibility even in complex chipsets, cellular band tables, and warranty footnotes.
- **Price Figures:** Standardize currency styling using `headline-md` or `headline-lg` in Manrope with tabular alignment (`font-variant-numeric: tabular-nums`) so shoppers scanning spec sheets can compare costs without staggered visual baseline jumps.

## Layout & Spacing

This design system uses a flexible 12-column grid constrained to an ergonomic max container width of `1280px`, anchored by a strict 4px/8px incremental spacing rhythm:

- **Desktop (1024px+):** 12 columns with `1.5rem` (24px) gutters and `2rem` (32px) outer canvas margins. Category grids favor a 4-column layout; technical side-by-side spec sheets utilize 6-column splits.
- **Tablet (768px - 1023px):** 8 columns with `1rem` (16px) gutters and `1.5rem` (24px) margins. Product listings collapse smoothly to 2 or 3 columns.
- **Mobile (320px - 767px):** 4 columns with `1rem` (16px) gutters and `1rem` (16px) outer margin. Horizontal category carousels bleed edge-to-edge with negative margin offsets and internal scroll snaps to maximize device screen economy.
- **Vertical Spacing:** Generous section intervals (`space-xl` scaled to 4rem - 5rem on desktop viewports) provide atmospheric breathing room between flagship product reveals, trade-in value calculators, and local store service guarantees.

## Elevation & Depth

Visual hierarchy uses a refined hybrid of soft tonal layering and luminous, ambient micro-shadows rather than heavy, murky drop-shadows:

- **Ground Canvas:** Background base surfaces sit at `#F8FAFC`.
- **Level 1 (Card & Module Resting):** Pure `#FFFFFF` surfaces nested over `#F8FAFC`, bound by an ultra-fine structural stroke (`1px solid #E2E8F0`). Subtle ambient shadow: `0 1px 3px 0 rgba(17, 24, 39, 0.04), 0 1px 2px -1px rgba(17, 24, 39, 0.02)`.
- **Level 2 (Hover & Active Product Tiles):** Dynamic elevation applied on hover: border shifts to `#CBD5E1`, with elevation rising via `0 10px 25px -5px rgba(37, 99, 235, 0.06), 0 8px 10px -6px rgba(17, 24, 39, 0.04)`. The faint tint of primary blue in the shadow gives hovered electronics an illuminated, active feel.
- **Level 3 (Sticky Commerce Bar, Filters, & Overlays):** `#FFFFFF` with 95% opacity paired with backdrop-filter blur (`backdrop-blur-md`) and a defined directional shadow: `0 20px 25px -5px rgba(17, 24, 39, 0.08), 0 8px 10px -6px rgba(17, 24, 39, 0.04)`.

## Shapes

The interface embraces a unified, modern squircle geometry that mirrors the rounded chassis of contemporary flagship mobile hardware:

- **Default Element Radius:** `0.5rem` (8px) applied to compact inputs, chips, badge tags, and secondary pills.
- **Large Components (`rounded-lg`):** `1rem` (16px) applied to primary modal dialogs, store location maps, trade-in calculator boxes, and promotional banners.
- **Extra Large Containers (`rounded-xl`):** `1.5rem` (24px) for master product showroom cards, hero highlight wrappers, and category visual tiles.
- **Full Pill (`rounded-full`):** Strictly reserved for floating action buttons (e.g., "Chat with Pune Store Specialist" via WhatsApp), stock indicators, and price change chips.

## Components

### Buttons & Interactive Controls
- **Primary Action Button:** Solid `#2563EB` background with pure white typography, `0.75rem` vertical by `1.5rem` horizontal padding, `rounded-xl` geometry, and smooth transition states (`150ms ease-in-out`). Hover shifts to `#1D4ED8` with subtle optical lift.
- **Secondary Action Button:** Surface white background with `#E2E8F0` border and `#111827` label. On hover, background shifts to `#F1F5F9` and border to `#CBD5E1`.
- **Local Express/WhatsApp Button:** Background `#0D9488` with white text, featuring an inline messaging glyph for rapid regional buyer consultations.

### Product & Showcase Cards
- **Product Card (`rounded-xl`):** Built on a pure white `#FFFFFF` substrate with a `1px solid #E2E8F0` edge. Includes a top-right regional stock tag (e.g., "In Stock at Kothrud & Camp Branches"), centered high-resolution transparent hardware photography, product name in `headline-sm`, model capacity/color variants, clear bold pricing in tabular numerals, and an instant "Compare" trigger.
- **Specification Matrix:** Clean, alternating zebra rows (`#FFFFFF` and `#F8FAFC`) with subtle divider lines and `body-sm` typography for technical device comparisons.

### Form Inputs & Search Fields
- **Search Bar:** Elevated omni-search field with `rounded-xl` geometry, large `1rem` inner padding, pre-pended search icon in `#64748B`, placeholder text showcasing popular local queries (e.g., *"Search iPhone 15 Pro, OnePlus 12, or 65\" OLED TV..."*), and quick-clear action.
- **Filter Chips:** Tonal chips with `0.5rem` radius. Unselected: `#F1F5F9` text `#475569`. Selected: solid `#2563EB` with `#FFFFFF` text.

### Selection Controls (Checkboxes & Radios)
- **Checkboxes & Radios:** Native form scaling using custom `#2563EB` active fills, `0.25rem` radius for checkboxes, full circle for radios, and accessible 2px focus rings (`ring-2 ring-blue-500/20`).

### Regional Retail Utility Modules
- **Store Inventory Indicator:** Micro-component highlighting physical availability across Pune outlets (FC Road, Kothrud, Viman Nagar, Hadapsar), combining a pulsing green indicator (`#0D9488`) with branch pick-up times.
- **EMI & Exchange Widget:** Compact card featuring a dynamic slider for exchange valuations, monthly installment calculation breakdown, and supported local banking partners.