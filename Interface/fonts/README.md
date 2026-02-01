# Fonts

## Monument Extended

Monument Extended is a premium font. To use it:

1. Purchase/download Monument Extended from [Pangram Pangram](https://pangrampangram.com/products/monument-extended)
2. Place the following files in this folder:
   - `MonumentExtended-Regular.otf`
   - `MonumentExtended-Bold.otf`

If you don't have Monument Extended, the interface will fall back to **Bebas Neue** (free on Google Fonts) or system fonts.

### Free Alternative

To use Bebas Neue instead, add this to your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
```

Then update the CSS variable in `styles.css`:

```css
--font-headline: 'Bebas Neue', 'Impact', sans-serif;
```

## Other Fonts (Auto-loaded)

- **IBM Plex Sans Arabic** - Arabic text (loaded from Google Fonts)
- **JetBrains Mono** - English body text (loaded from Google Fonts)
