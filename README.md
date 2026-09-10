# Shape Calculator & Unit Converter

A lightweight, zero-dependency, SEO-friendly static web application combining an interactive 2D geometry calculator with a bidirectional unit converter.

## Features

### 1. Shape Calculator (Area & Perimeter)
Calculates area and perimeter with live validation, formula transparency, and interactive SVG diagrams for 9 common 2D shapes:
- **Square**: Side ($a$)
- **Rectangle**: Length ($l$), Width ($w$)
- **Circle**: Radius ($r$)
- **Triangle**: Base ($b$), Height ($h$), Sides ($a, b, c$)
- **Parallelogram**: Base ($b$), Height ($h$), Side ($s$)
- **Trapezoid**: Base 1 ($a$), Base 2 ($b$), Height ($h$), Legs ($c, d$)
- **Rhombus**: Diagonals ($d_1, d_2$), Side ($s$)
- **Ellipse**: Semi-major axis ($a$), Semi-minor axis ($b$) via Ramanujan approximation
- **Regular Polygon**: Side length ($s$), Number of sides ($n \ge 3$)

### 2. Bidirectional Unit Converter
Instant calculation on input with unit swap button and transparent formula display:
- **Mass**: Milligram (mg), Gram (g), Kilogram (kg), Metric Ton (t), Ounce (oz), Pound (lb)
- **Volume**: Milliliter (mL), Liter (L), Cubic Meter (m³), US Teaspoon, US Tablespoon, US Cup, US Fluid Ounce (fl oz), US Gallon
- **Distance / Length**: Millimeter (mm), Centimeter (cm), Meter (m), Kilometer (km), Inch (in), Foot (ft), Yard (yd), Mile (mi)

### 3. Extra Capabilities
- **Dark Mode**: Toggle between light and dark themes with system preference detection.
- **Copy Result**: One-click clipboard copy with instant visual confirmation.
- **Derived Result Converter**: Convert calculated area or perimeter directly into other units.
- **Recent Calculation History**: In-memory log of last 5 calculations with quick-recall.
- **SEO & Accessibility**: Semantic HTML5, Schema.org WebApplication JSON-LD, ARIA live regions, keyboard navigation.

## Local Preview & Development

### Method 1: Direct Static File (Zero Dependencies)
Simply open `index.html` in any modern web browser.

### Method 2: Local Static Server
```bash
# Python 3
python3 -m http.server 3000

# or Node.js npx serve
npx serve .
```

### Method 3: Using Vite (included in repo)
```bash
npm install
npm run dev
```

## Deployment

### GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, select source: **Deploy from a branch** > branch: `main` / `root`.
4. Click **Save**. The app goes live immediately.

### Netlify
1. Drag and drop the project folder directly onto [Netlify Drop](https://app.netlify.com/drop).
2. Alternatively, connect your repository with build command left empty (or `npm run build` with publish directory `dist`).

### Vercel
1. Run `npx vercel` in the root folder, or import the GitHub repository into Vercel dashboard.
2. Zero build configuration required for static files.
