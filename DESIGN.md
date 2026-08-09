---
name: Artisanal Nectar
colors:
  surface: '#121412'
  surface-dim: '#121412'
  surface-bright: '#383938'
  surface-container-lowest: '#0d0f0d'
  surface-container-low: '#1a1c1a'
  surface-container: '#1f201e'
  surface-container-high: '#292a29'
  surface-container-highest: '#343533'
  on-surface: '#e3e2e0'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e3e2e0'
  inverse-on-surface: '#2f312f'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#bfc9be'
  on-secondary: '#2a332b'
  secondary-container: '#424b43'
  on-secondary-container: '#b1bbb0'
  tertiary: '#fec381'
  on-tertiary: '#472a00'
  tertiary-container: '#dfa868'
  on-tertiary-container: '#633c04'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#dbe5d9'
  secondary-fixed-dim: '#bfc9be'
  on-secondary-fixed: '#151e16'
  on-secondary-fixed-variant: '#404941'
  tertiary-fixed: '#ffddb9'
  tertiary-fixed-dim: '#f5bc7a'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#653e05'
  background: '#121412'
  on-background: '#e3e2e0'
  surface-variant: '#343533'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is rooted in the "Bounty of My Country," a narrative that celebrates Moroccan terroir through a premium, organic lens. It balances the warmth of artisanal craftsmanship with the precision of a luxury brand. The visual identity avoids the clinical feel of mass-market products, opting instead for a **Tactile / Minimalist** hybrid that emphasizes texture, natural lighting, and heritage.

The brand personality is:
*   **Authentic:** Honest materials and unretouched natural textures.
*   **Artisanal:** Subtle imperfections and hand-drawn flourishes that suggest small-batch quality.
*   **Premium:** Generous use of whitespace and a sophisticated, dark-mode leaning palette.
*   **Moroccan:** Modern interpretations of traditional motifs (hexagons/honeycombs and botanical illustrations).

Targeting a discerning audience that values purity and origin, the UI should feel like a high-end digital boutique—calm, expensive, and deeply connected to the earth.

## Colors

The palette is derived directly from the lifecycle of honey and the Moroccan landscape. 

*   **Primary (Honey Gold):** A luminous, metallic-leaning gold used for calls to action, highlights, and the brand mark. It represents the "liquid gold" nature of the product.
*   **Secondary (Forest Moss):** A deep, earthy green-black that provides a grounded, organic foundation for dark-mode surfaces. It evokes the shade of carob trees and wild Daghmous.
*   **Tertiary (Burnt Amber):** A rich, warm brown used for accents, borders, and secondary buttons, reflecting the viscosity of aged honey.
*   **Neutral (Cream Silk):** An off-white, warm neutral used for typography on dark backgrounds or as the primary surface for light-mode sections, ensuring the design feels "organic" rather than "digital white."

## Typography

The typography strategy employs a high-contrast pairing to bridge tradition and modernity. 

*   **Headlines:** *Playfair Display* is used for all major headings. Its elegant serifs and varying stroke weights convey a sense of established luxury and literary tradition.
*   **Body & UI:** *Manrope* provides a clean, geometric counterpoint. It is highly legible at small sizes, ensuring that technical product details (origin, weight, benefits) are easily digestible.
*   **Arabic Context:** When rendering the tagline (العسل الصافي خيرات بلادي), use a traditional Naskh-style typeface that shares the high-contrast elegance of the Playfair Display Latin set.
*   **Hierarchy:** Use the `label-caps` style for price tags and product categories to create a rhythmic, structured feel against the more fluid display types.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** approach with generous margins to mimic the layout of high-end editorial magazines. 

*   **Desktop:** A 12-column grid with a 1280px max-width. Content is often offset to create asymmetrical interest, mirroring the organic growth of plants.
*   **Mobile:** A 4-column grid with reduced margins (16px). Images of jars should bleed to the edges where possible to emphasize the "physicality" of the product.
*   **Spacing Rhythm:** Use an 8px base unit. Component padding should be "airy"—prioritizing whitespace over density to signify luxury. Section breaks should use large vertical padding (80px - 120px) to allow the photography to "breathe."

## Elevation & Depth

This design system avoids heavy drop shadows in favor of **Tonal Layering** and **Subtle Inner Glows**.

*   **Surface Depth:** Use variations of the Forest Moss color to define depth. Higher elevation elements (like cards) use a slightly lighter tint of the background green rather than a shadow.
*   **Product Highlighting:** Jars and natural elements should use a "halo" effect—a soft, radial background blur in Honey Gold or Amber—to make products appear as if they are glowing from within.
*   **Tactile Borders:** Use extremely thin (1px) borders in muted gold (#D4AF37 at 30% opacity) for cards and inputs. This creates a "gold-leaf" effect that feels expensive without being heavy.
*   **Glassmorphism:** Use semi-transparent backgrounds with a backdrop blur for navigation bars and overlays, mimicking the translucency of honey.

## Shapes

The shape language is primarily **Soft (0.25rem)**, moving away from aggressive curves to maintain a sense of structured, high-end packaging.

*   **Containers:** Use sharp or slightly softened corners (4px) for most UI containers to suggest the rigidity of premium glass jars and cardboard boxes.
*   **The Hexagon:** The hexagon is the only "geometric" shape allowed, used sparingly for badges (e.g., "100% Pure") and icon backgrounds, referencing the honeycomb structure.
*   **Organic Masks:** Product photography should occasionally use organic, "blob" or botanical-inspired masks to break the grid and emphasize the natural origin.

## Components

*   **Buttons:** Primary buttons use a solid Honey Gold fill with dark text. Secondary buttons are "Ghost" style with a gold border. All buttons use 4px corner radii and `label-caps` typography.
*   **Chips/Tags:** Used for honey types (Lemon, Carob, etc.). These should have a subtle Cream Silk background with Forest Moss text and no border.
*   **Input Fields:** Minimalist design with only a bottom border in Burnt Amber. Floating labels in Manrope.
*   **Cards:** Backgrounds should be a shade lighter than the main page surface. Borders are 1px semi-transparent gold. Image headers for cards should always feature the product in natural light.
*   **Product Detail Lists:** Use the honeycomb (hexagon) as a bullet point for feature lists (e.g., "Immunity Boosting," "Cold Pressed").
*   **Selection Controls:** Checkboxes and radio buttons should use the Honey Gold primary color when active, with a custom hexagonal checkmark for a branded touch.