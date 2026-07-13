---
version: alpha
name: Ezoic Open Web
description: A bright, minimal growth marketing system with soft surfaces, vivid lime accents, and bold editorial typography.
colors:
  primary: "#bbffa6"
  secondary: "#d8ded2"
  tertiary: "#0b0c0b"
  neutral: "#f5f9f1"
  surface: "#ffffff"
  on-surface: "#0b0c0b"
  muted: "#6f736d"
  border: "#d8ded2"
  success: "#09a86f"
  error: "#d84c4c"
  primary-contrast: "#0b0c0b"
  primary-soft: "#e9ffe0"
  surface-strong: "#eef4e8"
typography:
  headline-display:
    fontFamily: ui-sans-serif
    fontSize: 48px
    fontWeight: 800
    lineHeight: 50.4px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: ui-sans-serif
    fontSize: 38px
    fontWeight: 800
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-md:
    fontFamily: ui-sans-serif
    fontSize: 29px
    fontWeight: 700
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: ui-sans-serif
    fontSize: 23px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: ui-sans-serif
    fontSize: 18px
    fontWeight: 300
    lineHeight: 27px
    letterSpacing: -0.02em
  body-md:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: -0.01em
  body-sm:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: ui-sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.02em
  link-sm:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 6px
  sm: 16px
  md: 32px
  lg: 64px
  xl: 96px
  gutter: 24px
  section: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-contrast}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "11px 16px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "11px 16px"
    height: "44px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.link-sm}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "12px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: "14px 18px"
    height: "52px"
  chip:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
---

# Ezoic Open Web

## Overview
Ezoic feels light, optimistic, and performance-oriented, with a distinctly modern marketing tone rather than a heavy enterprise feel. The interface uses a soft off-white canvas, a vivid lime accent, and large confident headlines to communicate growth and momentum. It is spacious, clean, and approachable, aimed at publishers and brands that want clarity and conversion without visual clutter.

## Colors
- **Primary (#bbffa6):** A bright lime green used for the main CTA, subtle highlights, and the brand’s energetic “growth” signal. It should feel fresh, optimistic, and attention-grabbing without becoming neon.
- **Secondary (#d8ded2):** A soft neutral border and divider color used to define controls and separate sections delicately. It supports the airy, low-contrast look.
- **Tertiary (#0b0c0b):** A near-black ink used for headlines, primary text, and high-contrast button labels. It provides the system’s strongest readability anchor.
- **Neutral (#f5f9f1):** The default page and card background, creating a warm, slightly green-tinted off-white atmosphere. This is the dominant visual field.
- **Surface (#ffffff):** Reserved for elevated or input-like surfaces when a cleaner white is needed against the muted page background.
- **On-surface (#0b0c0b):** Primary text color for body copy, controls, and navigation.
- **Muted (#6f736d):** A softer supporting text tone for secondary copy, labels, and helper text.
- **Border (#d8ded2):** The main hairline border color for buttons, cards, and form controls.
- **Success (#09a86f):** A positive action or confirmation color, used sparingly and only when a distinct success state is needed.
- **Error (#d84c4c):** Reserved for validation and destructive states; it should remain rare in the brand surface.
- **Primary contrast (#0b0c0b):** The recommended text color on lime backgrounds for maximum legibility.
- **Primary soft (#e9ffe0):** A gentle tint for hover fills, badges, and subtle emphasis states.
- **Surface strong (#eef4e8):** A slightly deeper off-white for chips, quiet panels, or nested containers.

## Typography
The system uses a ui-sans-serif stack with a bold, condensed editorial rhythm. Headlines are heavy and tightly tracked, with strong negative letter-spacing that gives the brand a crisp, confident, conversion-focused personality. Body text is lighter and more restrained, while labels stay medium-weight for legibility in navigation and controls.

Use `headline-display` for hero statements like “Grow on the open web,” and `headline-lg` through `headline-sm` for section hierarchy. `body-lg` and `body-md` support marketing copy and explanatory content, with `body-sm` and `label-sm` reserved for meta text, helper copy, and small captions. Uppercase treatments are subtle and limited to short section labels or brand callouts; when used, keep tracking modest and rely more on weight than decoration.

## Layout
The layout is centered, spacious, and built around a fixed-max-width hero stack rather than a dense grid. Content tends to sit in one strong central column, with balanced left and right whitespace that makes the page feel open and premium. The spacing rhythm follows a clean 6/16/32/64/96px scale, with generous separation between hero, cards, partner logos, and the lower search area.

Cards and media modules should use consistent internal padding, typically 12px or similar, with larger gaps between clusters than within components. Sections should breathe; avoid tight stacking or overly compressed layouts. On wide screens, keep the main narrative centered and allow content cards to fan out in a controlled horizontal row.

## Elevation & Depth
The design is mostly flat, but it uses soft shadows and light tonal contrast to create gentle hierarchy. Buttons, cards, and the bottom search field rely on subtle drop shadows and thin borders rather than dramatic elevation. The result feels polished and light, not glossy or heavy.

Use shadows sparingly and consistently: enough to separate interactive surfaces from the background, but not enough to make the UI feel layered or app-like. Borders in `#d8ded2` and tonal differences between `#f5f9f1`, `#ffffff`, and `#eef4e8` do most of the work. When depth is needed, prefer soft shadow plus rounded geometry over strong blur or dark overlays.

## Shapes
The shape language is rounded and friendly, especially for interactive elements. Pills and circular-end controls are common, while cards use a moderate 16px radius for soft containment. The overall feeling is approachable and modern, with no sharp corners in primary UI.

Use `rounded.full` for primary and secondary buttons, search fields, and chips. Use `rounded.lg` for cards and media containers, and reserve `rounded.md` for smaller utility surfaces if needed. Avoid angular or highly architectural geometry; this system wants smooth, low-friction forms.

## Components
Buttons are the most defined interactive element. `button-primary` is a lime-filled pill with dark text, medium-weight 14px type, 11px vertical padding, and a 44px minimum height. `button-secondary` is a transparent pill with a light border and the same sizing, used for alternate actions. `button-tertiary` should stay text-only or link-like, with no border and no container chrome.

Cards should use the `card` token: soft off-white background, subtle border or shadow treatment, 16px radius, and restrained internal padding. They should feel like content frames rather than heavy containers. For content-rich ad or preview modules, keep overlays and captions readable through high-contrast text, with the image remaining dominant.

Inputs should be pill-shaped and calm, matching the visual tone of buttons but with a surface treatment closer to a field than a CTA. Use the `input` token for search bars and text entry, and keep helper text quiet in `Muted` or lighter label styles. Chips, tags, and small status pills should stay compact, softly filled, and fully rounded via `chip`.

Navigation links and dropdown triggers should be typographically strong but visually light, relying on spacing and weight rather than heavy separators. If checkboxes, radios, or tooltips are introduced later, they should follow the same language: minimal borders, soft fills, dark text, and gentle radii. Avoid introducing ornamental iconography or aggressive gradients unless they are part of a content preview.

## Do's and Don'ts
- Do keep the page airy with generous whitespace between major content blocks.
- Do use the lime `primary` color only for key actions and small accents so it remains special.
- Do favor bold, high-contrast headlines paired with lighter body copy.
- Do keep controls pill-shaped and softly shadowed to match the brand’s friendly performance tone.
- Don't introduce dark backgrounds as a default mode in this system.
- Don't overuse borders or heavy shadows; hierarchy should stay subtle and clean.
- Don't make cards or buttons square or sharp-cornered.
- Don't crowd the layout with dense grids or tight vertical stacking.