/**
 * Shape Calculator, 3D Geometry, Unit Converter & Casio fx-991 Scientific Calculator
 * Vanilla JavaScript Engine
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA STRUCTURES & DEFINITIONS
  // =========================================================================

  // ----------------- 2D SHAPES -----------------
  const SHAPES_2D = {
    square: {
      name: 'Square',
      category: '2D',
      description: 'Equilateral quadrilateral with four equal sides and 90° angles.',
      inputs: [
        { id: 'side_a', label: 'Side (a)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const a = vals.side_a;
        if (!a || a <= 0) return null;
        const area = a * a;
        const perimeter = 4 * a;
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter', value: perimeter, unitSuffix: '' },
          formula: `Area = a² = ${a}² = ${formatNumber(area)}\nPerimeter = 4a = 4 × ${a} = ${formatNumber(perimeter)}`,
          inputSummary: `a = ${a}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Square diagram">
          <rect x="30" y="30" width="100" height="100" rx="4" class="svg-shape" />
          <line x1="30" y1="140" x2="130" y2="140" class="svg-dim-line" />
          <text x="80" y="154" class="svg-dim-text">a</text>
          <line x1="20" y1="30" x2="20" y2="130" class="svg-dim-line" />
          <text x="12" y="85" class="svg-dim-text">a</text>
        </svg>
      `
    },
    rectangle: {
      name: 'Rectangle',
      category: '2D',
      description: 'Quadrilateral with four right angles and opposite equal sides.',
      inputs: [
        { id: 'length_l', label: 'Length (l)', placeholder: 'e.g., 8', min: 0.0001, step: 'any', required: true },
        { id: 'width_w', label: 'Width (w)', placeholder: 'e.g., 4', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const l = vals.length_l;
        const w = vals.width_w;
        if (!l || l <= 0 || !w || w <= 0) return null;
        const area = l * w;
        const perimeter = 2 * (l + w);
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter', value: perimeter, unitSuffix: '' },
          formula: `Area = l × w = ${l} × ${w} = ${formatNumber(area)}\nPerimeter = 2(l + w) = 2(${l} + ${w}) = ${formatNumber(perimeter)}`,
          inputSummary: `l = ${l}, w = ${w}`
        };
      },
      svg: `
        <svg viewBox="0 0 180 140" class="shape-svg" aria-label="Rectangle diagram">
          <rect x="25" y="30" width="130" height="75" rx="4" class="svg-shape" />
          <line x1="25" y1="116" x2="155" y2="116" class="svg-dim-line" />
          <text x="90" y="130" class="svg-dim-text">l (length)</text>
          <line x1="15" y1="30" x2="15" y2="105" class="svg-dim-line" />
          <text x="10" y="72" class="svg-dim-text" transform="rotate(-90 10 72)">w (width)</text>
        </svg>
      `
    },
    circle: {
      name: 'Circle',
      category: '2D',
      description: 'Locus of all points equidistant from the center point (radius r).',
      inputs: [
        { id: 'radius_r', label: 'Radius (r)', placeholder: 'e.g., 6', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const r = vals.radius_r;
        if (!r || r <= 0) return null;
        const area = Math.PI * r * r;
        const perimeter = 2 * Math.PI * r;
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter (Circumference)', value: perimeter, unitSuffix: '' },
          formula: `Area = π × r² = π × ${r}² = ${formatNumber(area)}\nCircumference = 2 × π × r = 2 × π × ${r} = ${formatNumber(perimeter)}`,
          inputSummary: `r = ${r}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Circle diagram">
          <circle cx="80" cy="80" r="55" class="svg-shape" />
          <circle cx="80" cy="80" r="3" class="svg-accent" />
          <line x1="80" y1="80" x2="135" y2="80" class="svg-dim-line" stroke-dasharray="3,3" />
          <text x="106" y="74" class="svg-dim-text">r</text>
        </svg>
      `
    },
    triangle: {
      name: 'Triangle',
      category: '2D',
      description: 'Three-sided polygon defined by base, height, and side lengths.',
      inputs: [
        { id: 'base_b', label: 'Base (b)', placeholder: 'e.g., 6', min: 0.0001, step: 'any', required: true },
        { id: 'height_h', label: 'Height (h)', placeholder: 'e.g., 4', min: 0.0001, step: 'any', required: true },
        { id: 'side_a', label: 'Side a', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true },
        { id: 'side_b', label: 'Side b (base)', placeholder: 'Defaults to Base b', min: 0.0001, step: 'any', required: false },
        { id: 'side_c', label: 'Side c', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const b = vals.base_b;
        const h = vals.height_h;
        const a = vals.side_a;
        const sideB = vals.side_b || b;
        const c = vals.side_c;
        if (!b || b <= 0 || !h || h <= 0 || !a || a <= 0 || !sideB || sideB <= 0 || !c || c <= 0) return null;
        const area = 0.5 * b * h;
        const perimeter = a + sideB + c;
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter', value: perimeter, unitSuffix: '' },
          formula: `Area = 0.5 × b × h = 0.5 × ${b} × ${h} = ${formatNumber(area)}\nPerimeter = a + b + c = ${a} + ${sideB} + ${c} = ${formatNumber(perimeter)}`,
          inputSummary: `b = ${b}, h = ${h}, sides = [${a}, ${sideB}, ${c}]`
        };
      },
      svg: `
        <svg viewBox="0 0 180 140" class="shape-svg" aria-label="Triangle diagram">
          <polygon points="40,110 150,110 100,30" class="svg-shape" />
          <line x1="100" y1="30" x2="100" y2="110" class="svg-guide-line" stroke-dasharray="3,3" />
          <text x="105" y="75" class="svg-dim-text">h</text>
          <text x="90" y="126" class="svg-dim-text">b</text>
          <text x="60" y="65" class="svg-dim-text">a</text>
          <text x="133" y="65" class="svg-dim-text">c</text>
        </svg>
      `
    },
    parallelogram: {
      name: 'Parallelogram',
      category: '2D',
      description: 'Quadrilateral with two pairs of parallel opposite sides.',
      inputs: [
        { id: 'base_b', label: 'Base (b)', placeholder: 'e.g., 7', min: 0.0001, step: 'any', required: true },
        { id: 'height_h', label: 'Height (h)', placeholder: 'e.g., 4', min: 0.0001, step: 'any', required: true },
        { id: 'side_s', label: 'Side (s)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const b = vals.base_b;
        const h = vals.height_h;
        const s = vals.side_s;
        if (!b || b <= 0 || !h || h <= 0 || !s || s <= 0) return null;
        const area = b * h;
        const perimeter = 2 * (b + s);
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter', value: perimeter, unitSuffix: '' },
          formula: `Area = b × h = ${b} × ${h} = ${formatNumber(area)}\nPerimeter = 2(b + s) = 2(${b} + ${s}) = ${formatNumber(perimeter)}`,
          inputSummary: `b = ${b}, h = ${h}, s = ${s}`
        };
      },
      svg: `
        <svg viewBox="0 0 190 140" class="shape-svg" aria-label="Parallelogram diagram">
          <polygon points="35,110 135,110 160,40 60,40" class="svg-shape" />
          <line x1="60" y1="40" x2="60" y2="110" class="svg-guide-line" stroke-dasharray="3,3" />
          <text x="66" y="80" class="svg-dim-text">h</text>
          <text x="85" y="126" class="svg-dim-text">b</text>
          <text x="36" y="70" class="svg-dim-text">s</text>
        </svg>
      `
    },
    trapezoid: {
      name: 'Trapezoid',
      category: '2D',
      description: 'Quadrilateral with two parallel bases (a, b) and two legs (c, d).',
      inputs: [
        { id: 'base_a', label: 'Base 1 (a - top)', placeholder: 'e.g., 4', min: 0.0001, step: 'any', required: true },
        { id: 'base_b', label: 'Base 2 (b - bottom)', placeholder: 'e.g., 8', min: 0.0001, step: 'any', required: true },
        { id: 'height_h', label: 'Height (h)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true },
        { id: 'leg_c', label: 'Leg 1 (c - left)', placeholder: 'e.g., 5.5', min: 0.0001, step: 'any', required: true },
        { id: 'leg_d', label: 'Leg 2 (d - right)', placeholder: 'e.g., 5.5', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const a = vals.base_a;
        const b = vals.base_b;
        const h = vals.height_h;
        const c = vals.leg_c;
        const d = vals.leg_d;
        if (!a || a <= 0 || !b || b <= 0 || !h || h <= 0 || !c || c <= 0 || !d || d <= 0) return null;
        const area = 0.5 * (a + b) * h;
        const perimeter = a + b + c + d;
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter', value: perimeter, unitSuffix: '' },
          formula: `Area = 0.5 × (a + b) × h = 0.5 × (${a} + ${b}) × ${h} = ${formatNumber(area)}\nPerimeter = a + b + c + d = ${a} + ${b} + ${c} + ${d} = ${formatNumber(perimeter)}`,
          inputSummary: `bases = [${a}, ${b}], h = ${h}, legs = [${c}, ${d}]`
        };
      },
      svg: `
        <svg viewBox="0 0 190 140" class="shape-svg" aria-label="Trapezoid diagram">
          <polygon points="30,110 160,110 130,40 60,40" class="svg-shape" />
          <line x1="60" y1="40" x2="60" y2="110" class="svg-guide-line" stroke-dasharray="3,3" />
          <text x="95" y="32" class="svg-dim-text">a</text>
          <text x="95" y="126" class="svg-dim-text">b</text>
          <text x="65" y="80" class="svg-dim-text">h</text>
          <text x="35" y="70" class="svg-dim-text">c</text>
          <text x="150" y="70" class="svg-dim-text">d</text>
        </svg>
      `
    },
    rhombus: {
      name: 'Rhombus',
      category: '2D',
      description: 'Equilateral quadrilateral with intersecting perpendicular diagonals.',
      inputs: [
        { id: 'diag_1', label: 'Diagonal 1 (d1)', placeholder: 'e.g., 8', min: 0.0001, step: 'any', required: true },
        { id: 'diag_2', label: 'Diagonal 2 (d2)', placeholder: 'e.g., 6', min: 0.0001, step: 'any', required: true },
        { id: 'side_s', label: 'Side (s)', placeholder: 'Leave blank to auto-calc', min: 0.0001, step: 'any', required: false, helper: 'Auto-computed if empty: √((d1/2)² + (d2/2)²)' }
      ],
      calculate: function (vals) {
        const d1 = vals.diag_1;
        const d2 = vals.diag_2;
        if (!d1 || d1 <= 0 || !d2 || d2 <= 0) return null;
        let s = vals.side_s;
        if (!s || s <= 0) {
          s = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
        }
        const area = 0.5 * d1 * d2;
        const perimeter = 4 * s;
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter', value: perimeter, unitSuffix: '' },
          formula: `Area = 0.5 × d1 × d2 = 0.5 × ${d1} × ${d2} = ${formatNumber(area)}\nPerimeter = 4s = 4 × ${formatNumber(s)} = ${formatNumber(perimeter)}`,
          inputSummary: `d1 = ${d1}, d2 = ${d2}, s = ${formatNumber(s)}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Rhombus diagram">
          <polygon points="80,20 140,80 80,140 20,80" class="svg-shape" />
          <line x1="80" y1="20" x2="80" y2="140" class="svg-guide-line" stroke-dasharray="3,3" />
          <line x1="20" y1="80" x2="140" y2="80" class="svg-guide-line" stroke-dasharray="3,3" />
          <text x="85" y="60" class="svg-dim-text">d1</text>
          <text x="110" y="75" class="svg-dim-text">d2</text>
          <text x="40" y="45" class="svg-dim-text">s</text>
        </svg>
      `
    },
    ellipse: {
      name: 'Ellipse',
      category: '2D',
      description: 'Curved plane figure with semi-major axis (a) and semi-minor axis (b).',
      inputs: [
        { id: 'semi_a', label: 'Semi-Major Axis (a)', placeholder: 'e.g., 6', min: 0.0001, step: 'any', required: true },
        { id: 'semi_b', label: 'Semi-Minor Axis (b)', placeholder: 'e.g., 4', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const a = vals.semi_a;
        const b = vals.semi_b;
        if (!a || a <= 0 || !b || b <= 0) return null;
        const area = Math.PI * a * b;
        const term1 = 3 * (a + b);
        const term2 = Math.sqrt((3 * a + b) * (a + 3 * b));
        const perimeter = Math.PI * (term1 - term2);
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter (Ramanujan approx)', value: perimeter, unitSuffix: '' },
          formula: `Area = π × a × b = π × ${a} × ${b} = ${formatNumber(area)}\nPerimeter ≈ π[3(a+b) − √((3a+b)(a+3b))] ≈ ${formatNumber(perimeter)}`,
          inputSummary: `a = ${a}, b = ${b}`
        };
      },
      svg: `
        <svg viewBox="0 0 180 140" class="shape-svg" aria-label="Ellipse diagram">
          <ellipse cx="90" cy="70" rx="65" ry="40" class="svg-shape" />
          <line x1="90" y1="70" x2="155" y2="70" class="svg-dim-line" stroke-dasharray="3,3" />
          <line x1="90" y1="70" x2="90" y2="30" class="svg-dim-line" stroke-dasharray="3,3" />
          <text x="120" y="65" class="svg-dim-text">a</text>
          <text x="95" y="48" class="svg-dim-text">b</text>
        </svg>
      `
    },
    regular_polygon: {
      name: 'Regular Polygon',
      category: '2D',
      description: 'Equilateral and equiangular polygon with n equal sides.',
      inputs: [
        { id: 'side_s', label: 'Side Length (s)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true },
        { id: 'num_sides', label: 'Number of Sides (n ≥ 3)', placeholder: 'e.g., 6 for hexagon', min: 3, step: 1, required: true }
      ],
      calculate: function (vals) {
        const s = vals.side_s;
        const n = Math.round(vals.num_sides);
        if (!s || s <= 0 || !n || n < 3) return null;
        const area = (n * s * s) / (4 * Math.tan(Math.PI / n));
        const perimeter = n * s;
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter', value: perimeter, unitSuffix: '' },
          formula: `Area = (n × s²) / (4 × tan(π/n)) = (${n} × ${s}²) / (4 × tan(π/${n})) = ${formatNumber(area)}\nPerimeter = n × s = ${n} × ${s} = ${formatNumber(perimeter)}`,
          inputSummary: `s = ${s}, n = ${n}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Regular polygon diagram">
          <polygon points="80,25 130,55 130,105 80,135 30,105 30,55" class="svg-shape" />
          <line x1="30" y1="105" x2="80" y2="135" class="svg-dim-line" />
          <text x="45" y="130" class="svg-dim-text">s</text>
          <text x="80" y="85" class="svg-dim-text">n sides</text>
        </svg>
      `
    },
    circle_sector: {
      name: 'Sector of Circle',
      category: '2D',
      description: 'Pie-slice portion of a circle enclosed by two radii and an arc.',
      inputs: [
        { id: 'radius_r', label: 'Radius (r)', placeholder: 'e.g., 6', min: 0.0001, step: 'any', required: true },
        { id: 'angle_deg', label: 'Central Angle (θ in degrees)', placeholder: 'e.g., 60', min: 0.001, max: 360, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const r = vals.radius_r;
        const theta = vals.angle_deg;
        if (!r || r <= 0 || !theta || theta <= 0 || theta > 360) return null;
        const arcLength = (theta / 180) * Math.PI * r;
        const area = (theta / 360) * Math.PI * r * r;
        const perimeter = arcLength + 2 * r;
        return {
          primary: { label: 'Sector Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Total Perimeter (Arc + 2r)', value: perimeter, unitSuffix: '' },
          formula: `Arc Length = (θ/180) × π × r = ${formatNumber(arcLength)}\nArea = (θ/360) × π × r² = (${theta}/360) × π × ${r}² = ${formatNumber(area)}\nPerimeter = Arc + 2r = ${formatNumber(arcLength)} + 2(${r}) = ${formatNumber(perimeter)}`,
          inputSummary: `r = ${r}, θ = ${theta}°`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Sector of circle diagram">
          <path d="M 80 80 L 130 80 A 50 50 0 0 0 105 37 Z" class="svg-shape" />
          <line x1="80" y1="80" x2="130" y2="80" class="svg-dim-line" />
          <text x="105" y="94" class="svg-dim-text">r</text>
          <text x="96" y="68" class="svg-dim-text">θ</text>
        </svg>
      `
    },
    annulus: {
      name: 'Annulus (Ring)',
      category: '2D',
      description: 'Region bounded by two concentric circles of outer radius R and inner radius r.',
      inputs: [
        { id: 'radius_R', label: 'Outer Radius (R)', placeholder: 'e.g., 8', min: 0.0001, step: 'any', required: true },
        { id: 'radius_r', label: 'Inner Radius (r)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const R = vals.radius_R;
        const r = vals.radius_r;
        if (!R || R <= 0 || !r || r <= 0 || R <= r) return null;
        const area = Math.PI * (R * R - r * r);
        const perimeter = 2 * Math.PI * (R + r);
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Total Perimeter (Inner + Outer)', value: perimeter, unitSuffix: '' },
          formula: `Area = π(R² − r²) = π(${R}² − ${r}²) = ${formatNumber(area)}\nPerimeter = 2π(R + r) = 2π(${R} + ${r}) = ${formatNumber(perimeter)}`,
          inputSummary: `R = ${R}, r = ${r}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Annulus diagram">
          <circle cx="80" cy="80" r="60" class="svg-shape" />
          <circle cx="80" cy="80" r="35" style="fill: var(--bg-surface); stroke: var(--svg-shape-stroke); stroke-width: 2;" />
          <line x1="80" y1="80" x2="140" y2="80" class="svg-dim-line" stroke-dasharray="2,2" />
          <text x="125" y="74" class="svg-dim-text">R</text>
          <line x1="80" y1="80" x2="80" y2="45" class="svg-dim-line" stroke-dasharray="2,2" />
          <text x="88" y="65" class="svg-dim-text">r</text>
        </svg>
      `
    },
    kite: {
      name: 'Kite',
      category: '2D',
      description: 'Quadrilateral with two distinct pairs of adjacent equal-length sides.',
      inputs: [
        { id: 'diag_1', label: 'Diagonal 1 (d1)', placeholder: 'e.g., 10', min: 0.0001, step: 'any', required: true },
        { id: 'diag_2', label: 'Diagonal 2 (d2)', placeholder: 'e.g., 6', min: 0.0001, step: 'any', required: true },
        { id: 'side_a', label: 'Side a', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true },
        { id: 'side_b', label: 'Side b', placeholder: 'e.g., 7', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const d1 = vals.diag_1;
        const d2 = vals.diag_2;
        const a = vals.side_a;
        const b = vals.side_b;
        if (!d1 || d1 <= 0 || !d2 || d2 <= 0 || !a || a <= 0 || !b || b <= 0) return null;
        const area = 0.5 * d1 * d2;
        const perimeter = 2 * (a + b);
        return {
          primary: { label: 'Area', value: area, unitSuffix: '²' },
          secondary: { label: 'Perimeter', value: perimeter, unitSuffix: '' },
          formula: `Area = 0.5 × d1 × d2 = 0.5 × ${d1} × ${d2} = ${formatNumber(area)}\nPerimeter = 2(a + b) = 2(${a} + ${b}) = ${formatNumber(perimeter)}`,
          inputSummary: `d1 = ${d1}, d2 = ${d2}, a = ${a}, b = ${b}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Kite diagram">
          <polygon points="80,15 130,65 80,145 30,65" class="svg-shape" />
          <line x1="80" y1="15" x2="80" y2="145" class="svg-guide-line" stroke-dasharray="3,3" />
          <line x1="30" y1="65" x2="130" y2="65" class="svg-guide-line" stroke-dasharray="3,3" />
          <text x="85" y="80" class="svg-dim-text">d1</text>
          <text x="105" y="60" class="svg-dim-text">d2</text>
          <text x="50" y="35" class="svg-dim-text">a</text>
          <text x="50" y="115" class="svg-dim-text">b</text>
        </svg>
      `
    }
  };

  // ----------------- 3D SHAPES -----------------
  const SHAPES_3D = {
    cube: {
      name: 'Cube',
      category: '3D',
      description: 'Regular 3D solid bounded by 6 congruent square faces.',
      inputs: [
        { id: 'side_a', label: 'Edge Length (a)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const a = vals.side_a;
        if (!a || a <= 0) return null;
        const volume = Math.pow(a, 3);
        const surfaceArea = 6 * a * a;
        const lateralArea = 4 * a * a;
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Total Surface Area', value: surfaceArea, unitSuffix: '²' },
          extra: { label: 'Lateral Surface Area', value: lateralArea, unitSuffix: '²' },
          formula: `Volume = a³ = ${a}³ = ${formatNumber(volume)}\nTotal Surface Area = 6a² = 6 × ${a}² = ${formatNumber(surfaceArea)}\nLateral Area = 4a² = 4 × ${a}² = ${formatNumber(lateralArea)}`,
          inputSummary: `a = ${a}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Cube diagram">
          <polygon points="40,60 85,35 125,60 80,85" class="svg-shape" style="opacity:0.9;" />
          <polygon points="40,60 80,85 80,135 40,110" class="svg-shape" />
          <polygon points="80,85 125,60 125,110 80,135" class="svg-shape" style="opacity:0.8;" />
          <line x1="40" y1="115" x2="80" y2="140" class="svg-dim-line" />
          <text x="60" y="142" class="svg-dim-text">a</text>
        </svg>
      `
    },
    rectangular_prism: {
      name: 'Rectangular Prism (Cuboid)',
      category: '3D',
      description: 'Solid figure bounded by six rectangular faces.',
      inputs: [
        { id: 'length_l', label: 'Length (l)', placeholder: 'e.g., 8', min: 0.0001, step: 'any', required: true },
        { id: 'width_w', label: 'Width (w)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true },
        { id: 'height_h', label: 'Height (h)', placeholder: 'e.g., 4', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const l = vals.length_l;
        const w = vals.width_w;
        const h = vals.height_h;
        if (!l || l <= 0 || !w || w <= 0 || !h || h <= 0) return null;
        const volume = l * w * h;
        const surfaceArea = 2 * (l * w + l * h + w * h);
        const lateralArea = 2 * h * (l + w);
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Total Surface Area', value: surfaceArea, unitSuffix: '²' },
          extra: { label: 'Lateral Area', value: lateralArea, unitSuffix: '²' },
          formula: `Volume = l × w × h = ${l} × ${w} × ${h} = ${formatNumber(volume)}\nTotal Surface Area = 2(lw + lh + wh) = ${formatNumber(surfaceArea)}\nLateral Area = 2h(l + w) = ${formatNumber(lateralArea)}`,
          inputSummary: `l = ${l}, w = ${w}, h = ${h}`
        };
      },
      svg: `
        <svg viewBox="0 0 180 140" class="shape-svg" aria-label="Rectangular prism diagram">
          <polygon points="30,55 90,30 150,55 90,80" class="svg-shape" style="opacity:0.9;" />
          <polygon points="30,55 90,80 90,125 30,100" class="svg-shape" />
          <polygon points="90,80 150,55 150,100 90,125" class="svg-shape" style="opacity:0.8;" />
          <text x="60" y="115" class="svg-dim-text">l</text>
          <text x="125" y="115" class="svg-dim-text">w</text>
          <text x="20" y="80" class="svg-dim-text">h</text>
        </svg>
      `
    },
    cylinder: {
      name: 'Cylinder',
      category: '3D',
      description: 'Solid with two parallel circular bases of radius r joined by a curved surface of height h.',
      inputs: [
        { id: 'radius_r', label: 'Radius (r)', placeholder: 'e.g., 4', min: 0.0001, step: 'any', required: true },
        { id: 'height_h', label: 'Height (h)', placeholder: 'e.g., 10', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const r = vals.radius_r;
        const h = vals.height_h;
        if (!r || r <= 0 || !h || h <= 0) return null;
        const volume = Math.PI * r * r * h;
        const surfaceArea = 2 * Math.PI * r * (r + h);
        const lateralArea = 2 * Math.PI * r * h;
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Total Surface Area', value: surfaceArea, unitSuffix: '²' },
          extra: { label: 'Curved/Lateral Area', value: lateralArea, unitSuffix: '²' },
          formula: `Volume = π × r² × h = π × ${r}² × ${h} = ${formatNumber(volume)}\nTotal Surface Area = 2πr(r + h) = 2π(${r})(${r} + ${h}) = ${formatNumber(surfaceArea)}\nCurved Area = 2πrh = 2π(${r})(${h}) = ${formatNumber(lateralArea)}`,
          inputSummary: `r = ${r}, h = ${h}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Cylinder diagram">
          <ellipse cx="80" cy="35" rx="45" ry="15" class="svg-shape" />
          <path d="M 35 35 L 35 125 A 45 15 0 0 0 125 125 L 125 35 Z" class="svg-shape" style="opacity:0.85;" />
          <ellipse cx="80" cy="125" rx="45" ry="15" class="svg-shape" style="fill:none; stroke-dasharray:3,3;" />
          <line x1="80" y1="35" x2="125" y2="35" class="svg-dim-line" />
          <text x="100" y="28" class="svg-dim-text">r</text>
          <line x1="25" y1="35" x2="25" y2="125" class="svg-dim-line" />
          <text x="15" y="85" class="svg-dim-text">h</text>
        </svg>
      `
    },
    sphere: {
      name: 'Sphere',
      category: '3D',
      description: 'Symmetrical 3D ball where all surface points are equidistant from center (r).',
      inputs: [
        { id: 'radius_r', label: 'Radius (r)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const r = vals.radius_r;
        if (!r || r <= 0) return null;
        const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
        const surfaceArea = 4 * Math.PI * r * r;
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Surface Area', value: surfaceArea, unitSuffix: '²' },
          formula: `Volume = (4/3) × π × r³ = (4/3) × π × ${r}³ = ${formatNumber(volume)}\nSurface Area = 4 × π × r² = 4 × π × ${r}² = ${formatNumber(surfaceArea)}`,
          inputSummary: `r = ${r}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Sphere diagram">
          <circle cx="80" cy="80" r="55" class="svg-shape" />
          <ellipse cx="80" cy="80" rx="55" ry="18" class="svg-guide-line" stroke-dasharray="3,3" fill="none" />
          <line x1="80" y1="80" x2="135" y2="80" class="svg-dim-line" />
          <text x="108" y="74" class="svg-dim-text">r</text>
        </svg>
      `
    },
    hemisphere: {
      name: 'Hemisphere',
      category: '3D',
      description: 'Half of a sphere bounded by a planar circular base.',
      inputs: [
        { id: 'radius_r', label: 'Radius (r)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const r = vals.radius_r;
        if (!r || r <= 0) return null;
        const volume = (2 / 3) * Math.PI * Math.pow(r, 3);
        const totalArea = 3 * Math.PI * r * r;
        const curvedArea = 2 * Math.PI * r * r;
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Total Surface Area', value: totalArea, unitSuffix: '²' },
          extra: { label: 'Curved Surface Area', value: curvedArea, unitSuffix: '²' },
          formula: `Volume = (2/3) × π × r³ = ${formatNumber(volume)}\nTotal Surface Area = 3πr² = 3 × π × ${r}² = ${formatNumber(totalArea)}\nCurved Area = 2πr² = 2 × π × ${r}² = ${formatNumber(curvedArea)}`,
          inputSummary: `r = ${r}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Hemisphere diagram">
          <path d="M 25 80 A 55 55 0 0 0 135 80 Z" class="svg-shape" />
          <ellipse cx="80" cy="80" rx="55" ry="16" class="svg-shape" style="fill:var(--bg-subtle);" />
          <line x1="80" y1="80" x2="135" y2="80" class="svg-dim-line" />
          <text x="108" y="74" class="svg-dim-text">r</text>
        </svg>
      `
    },
    cone: {
      name: 'Cone',
      category: '3D',
      description: '3D geometric shape that tapers smoothly from a flat circular base (r) to an apex (h).',
      inputs: [
        { id: 'radius_r', label: 'Base Radius (r)', placeholder: 'e.g., 5', min: 0.0001, step: 'any', required: true },
        { id: 'height_h', label: 'Height (h)', placeholder: 'e.g., 12', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const r = vals.radius_r;
        const h = vals.height_h;
        if (!r || r <= 0 || !h || h <= 0) return null;
        const slantHeight = Math.sqrt(r * r + h * h);
        const volume = (1 / 3) * Math.PI * r * r * h;
        const totalArea = Math.PI * r * (r + slantHeight);
        const lateralArea = Math.PI * r * slantHeight;
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Total Surface Area', value: totalArea, unitSuffix: '²' },
          extra: { label: 'Slant Height (s)', value: slantHeight, unitSuffix: '' },
          formula: `Slant Height s = √(r² + h²) = √(${r}² + ${h}²) = ${formatNumber(slantHeight)}\nVolume = (1/3) × π × r² × h = ${formatNumber(volume)}\nTotal Surface Area = πr(r + s) = ${formatNumber(totalArea)}\nLateral Area = πrs = ${formatNumber(lateralArea)}`,
          inputSummary: `r = ${r}, h = ${h}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Cone diagram">
          <polygon points="80,25 35,120 125,120" class="svg-shape" />
          <ellipse cx="80" cy="120" rx="45" ry="14" class="svg-shape" style="fill:var(--bg-subtle);" />
          <line x1="80" y1="25" x2="80" y2="120" class="svg-guide-line" stroke-dasharray="3,3" />
          <text x="85" y="75" class="svg-dim-text">h</text>
          <line x1="80" y1="120" x2="125" y2="120" class="svg-dim-line" />
          <text x="102" y="114" class="svg-dim-text">r</text>
          <text x="110" y="70" class="svg-dim-text">s</text>
        </svg>
      `
    },
    square_pyramid: {
      name: 'Square Pyramid',
      category: '3D',
      description: 'Pyramid with a square base of side a and height h meeting at an apex.',
      inputs: [
        { id: 'base_a', label: 'Base Side (a)', placeholder: 'e.g., 6', min: 0.0001, step: 'any', required: true },
        { id: 'height_h', label: 'Height (h)', placeholder: 'e.g., 8', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const a = vals.base_a;
        const h = vals.height_h;
        if (!a || a <= 0 || !h || h <= 0) return null;
        const slantHeight = Math.sqrt(h * h + Math.pow(a / 2, 2));
        const volume = (1 / 3) * a * a * h;
        const lateralArea = 2 * a * slantHeight;
        const totalArea = a * a + lateralArea;
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Total Surface Area', value: totalArea, unitSuffix: '²' },
          extra: { label: 'Slant Height (s)', value: slantHeight, unitSuffix: '' },
          formula: `Slant Height s = √(h² + (a/2)²) = ${formatNumber(slantHeight)}\nVolume = (1/3) × a² × h = (1/3) × ${a}² × ${h} = ${formatNumber(volume)}\nTotal Surface Area = a² + 2as = ${formatNumber(totalArea)}\nLateral Area = 2as = ${formatNumber(lateralArea)}`,
          inputSummary: `a = ${a}, h = ${h}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Square pyramid diagram">
          <polygon points="80,25 35,115 90,135 135,100" class="svg-shape" style="opacity:0.85;" />
          <line x1="80" y1="25" x2="90" y2="135" class="svg-shape" style="stroke-width:2;" />
          <line x1="80" y1="25" x2="85" y2="115" class="svg-guide-line" stroke-dasharray="3,3" />
          <text x="60" y="132" class="svg-dim-text">a</text>
          <text x="88" y="75" class="svg-dim-text">h</text>
        </svg>
      `
    },
    torus: {
      name: 'Torus (Donut)',
      category: '3D',
      description: 'Surface of revolution generated by revolving a circle in three-dimensional space.',
      inputs: [
        { id: 'radius_R', label: 'Major Radius (R)', placeholder: 'e.g., 8', min: 0.0001, step: 'any', required: true },
        { id: 'radius_r', label: 'Minor Radius (r)', placeholder: 'e.g., 2', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const R = vals.radius_R;
        const r = vals.radius_r;
        if (!R || R <= 0 || !r || r <= 0 || R < r) return null;
        const volume = 2 * Math.PI * Math.PI * R * r * r;
        const surfaceArea = 4 * Math.PI * Math.PI * R * r;
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Surface Area', value: surfaceArea, unitSuffix: '²' },
          formula: `Volume = 2π² × R × r² = 2π² × ${R} × ${r}² = ${formatNumber(volume)}\nSurface Area = 4π² × R × r = 4π² × ${R} × ${r} = ${formatNumber(surfaceArea)}`,
          inputSummary: `R = ${R}, r = ${r}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Torus diagram">
          <ellipse cx="80" cy="80" rx="60" ry="36" class="svg-shape" />
          <ellipse cx="80" cy="80" rx="26" ry="14" style="fill: var(--bg-surface); stroke: var(--svg-shape-stroke); stroke-width: 2;" />
          <line x1="80" y1="80" x2="135" y2="80" class="svg-dim-line" stroke-dasharray="3,3" />
          <text x="110" y="74" class="svg-dim-text">R</text>
          <text x="140" y="90" class="svg-dim-text">r</text>
        </svg>
      `
    },
    capsule: {
      name: 'Capsule (Spherocylinder)',
      category: '3D',
      description: 'Cylinder with two hemispherical ends of radius r and cylindrical length a.',
      inputs: [
        { id: 'radius_r', label: 'Radius (r)', placeholder: 'e.g., 4', min: 0.0001, step: 'any', required: true },
        { id: 'length_a', label: 'Cylinder Length (a)', placeholder: 'e.g., 10', min: 0.0001, step: 'any', required: true }
      ],
      calculate: function (vals) {
        const r = vals.radius_r;
        const a = vals.length_a;
        if (!r || r <= 0 || !a || a <= 0) return null;
        const volume = Math.PI * r * r * a + (4 / 3) * Math.PI * Math.pow(r, 3);
        const surfaceArea = 2 * Math.PI * r * a + 4 * Math.PI * r * r;
        return {
          primary: { label: 'Volume', value: volume, unitSuffix: '³' },
          secondary: { label: 'Surface Area', value: surfaceArea, unitSuffix: '²' },
          formula: `Volume = πr²a + (4/3)πr³ = ${formatNumber(volume)}\nSurface Area = 2πra + 4πr² = ${formatNumber(surfaceArea)}`,
          inputSummary: `r = ${r}, a = ${a}`
        };
      },
      svg: `
        <svg viewBox="0 0 160 160" class="shape-svg" aria-label="Capsule diagram">
          <rect x="50" y="55" width="60" height="50" class="svg-shape" />
          <path d="M 50 55 A 25 25 0 0 0 50 105 Z" class="svg-shape" />
          <path d="M 110 55 A 25 25 0 0 1 110 105 Z" class="svg-shape" />
          <line x1="50" y1="115" x2="110" y2="115" class="svg-dim-line" />
          <text x="80" y="128" class="svg-dim-text">a</text>
          <text x="35" y="80" class="svg-dim-text">r</text>
        </svg>
      `
    }
  };

  // ----------------- UNIT CONVERTER DATA -----------------
  const CONVERTER_DATA = {
    mass: {
      name: 'Mass & Weight',
      baseUnit: 'g',
      units: [
        { id: 'mg', name: 'Milligram (mg)', factor: 0.001 },
        { id: 'g', name: 'Gram (g)', factor: 1 },
        { id: 'kg', name: 'Kilogram (kg)', factor: 1000 },
        { id: 't', name: 'Metric Ton (t)', factor: 1000000 },
        { id: 'oz', name: 'Ounce (oz)', factor: 28.349523125 },
        { id: 'lb', name: 'Pound (lb)', factor: 453.59237 }
      ]
    },
    volume: {
      name: 'Volume & Capacity',
      baseUnit: 'L',
      units: [
        { id: 'mL', name: 'Milliliter (mL)', factor: 0.001 },
        { id: 'L', name: 'Liter (L)', factor: 1 },
        { id: 'm3', name: 'Cubic Meter (m³)', factor: 1000 },
        { id: 'tsp', name: 'Teaspoon (US tsp)', factor: 0.00492892159375 },
        { id: 'tbsp', name: 'Tablespoon (US tbsp)', factor: 0.01478676478125 },
        { id: 'cup', name: 'Cup (US cup)', factor: 0.2365882365 },
        { id: 'fl_oz', name: 'Fluid Ounce (US fl oz)', factor: 0.0295735295625 },
        { id: 'gal', name: 'Gallon (US liquid gal)', factor: 3.785411784 }
      ]
    },
    distance: {
      name: 'Distance & Length',
      baseUnit: 'm',
      units: [
        { id: 'mm', name: 'Millimeter (mm)', factor: 0.001 },
        { id: 'cm', name: 'Centimeter (cm)', factor: 0.01 },
        { id: 'm', name: 'Meter (m)', factor: 1 },
        { id: 'km', name: 'Kilometer (km)', factor: 1000 },
        { id: 'in', name: 'Inch (in)', factor: 0.0254 },
        { id: 'ft', name: 'Foot (ft)', factor: 0.3048 },
        { id: 'yd', name: 'Yard (yd)', factor: 0.9144 },
        { id: 'mi', name: 'Mile (mi)', factor: 1609.344 }
      ]
    }
  };

  // ----------------- PHYSICS FORMULAS DATA -----------------
  const PHYSICS_FORMULAS = {
    kinematics: {
      velocity_speed: {
        name: 'Velocity & Speed',
        category: 'Kinematics',
        description: 'Calculates average velocity and converts to km/h from displacement and elapsed time.',
        inputs: [
          { id: 'phys_dist', label: 'Displacement / Distance (d)', unit: 'm', placeholder: '100', required: true, min: 0 },
          { id: 'phys_time', label: 'Time Elapsed (t)', unit: 's', placeholder: '10', required: true, min: 0.000001 }
        ],
        defaults: { phys_dist: 100, phys_time: 10 },
        primary: { label: 'Velocity (v)', unit: 'm/s' },
        secondary: { label: 'Speed in km/h', unit: 'km/h' },
        calculate: (vals) => {
          const d = vals.phys_dist;
          const t = vals.phys_time;
          if (t <= 0) return null;
          const v = d / t;
          const kmh = v * 3.6;
          return {
            primary: { label: 'Velocity (v)', value: v, unit: 'm/s' },
            secondary: { label: 'Speed in km/h', value: kmh, unit: 'km/h' },
            inputSummary: `d = ${d} m, t = ${t} s`,
            formula: `Formula: v = d / t\nStep 1: v = ${d} m / ${t} s = ${v} m/s\nStep 2: Speed in km/h = ${v} × 3.6 = ${kmh} km/h`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Velocity diagram">
            <line x1="20" y1="100" x2="140" y2="100" class="svg-dim-line" stroke-dasharray="3,3" />
            <rect x="30" y="65" width="40" height="24" rx="4" class="svg-shape" />
            <circle cx="42" cy="90" r="5" class="svg-shape" />
            <circle cx="58" cy="90" r="5" class="svg-shape" />
            <line x1="75" y1="77" x2="125" y2="77" class="svg-dim-line" stroke-width="2.5" />
            <polygon points="125,72 135,77 125,82" fill="var(--accent-primary)" />
            <text x="105" y="70" class="svg-dim-text">v = d / t</text>
            <line x1="20" y1="115" x2="140" y2="115" class="svg-dim-line" />
            <text x="80" y="128" class="svg-dim-text">displacement (d)</text>
          </svg>
        `
      },
      acceleration: {
        name: 'Linear Acceleration',
        category: 'Kinematics',
        description: 'Computes constant acceleration from initial velocity, final velocity, and elapsed time.',
        inputs: [
          { id: 'phys_u', label: 'Initial Velocity (u)', unit: 'm/s', placeholder: '0', required: true },
          { id: 'phys_v', label: 'Final Velocity (v)', unit: 'm/s', placeholder: '25', required: true },
          { id: 'phys_t_acc', label: 'Time Elapsed (t)', unit: 's', placeholder: '5', required: true, min: 0.000001 }
        ],
        defaults: { phys_u: 0, phys_v: 25, phys_t_acc: 5 },
        primary: { label: 'Acceleration (a)', unit: 'm/s²' },
        secondary: { label: 'Change in Velocity (Δv)', unit: 'm/s' },
        calculate: (vals) => {
          const u = vals.phys_u;
          const v = vals.phys_v;
          const t = vals.phys_t_acc;
          if (t <= 0) return null;
          const deltaV = v - u;
          const a = deltaV / t;
          return {
            primary: { label: 'Acceleration (a)', value: a, unit: 'm/s²' },
            secondary: { label: 'Change in Velocity (Δv)', value: deltaV, unit: 'm/s' },
            inputSummary: `u = ${u} m/s, v = ${v} m/s, t = ${t} s`,
            formula: `Formula: a = (v - u) / t\nStep 1: Δv = ${v} - ${u} = ${deltaV} m/s\nStep 2: a = ${deltaV} / ${t} = ${a} m/s²`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Acceleration diagram">
            <line x1="20" y1="105" x2="140" y2="105" class="svg-dim-line" stroke-dasharray="3,3" />
            <circle cx="40" cy="80" r="14" class="svg-shape" />
            <line x1="40" y1="80" x2="68" y2="80" class="svg-dim-line" />
            <polygon points="68,76 76,80 68,84" fill="var(--accent-primary)" />
            <text x="55" y="72" class="svg-dim-text">u</text>
            <circle cx="115" cy="80" r="14" class="svg-shape" />
            <line x1="115" y1="80" x2="152" y2="80" class="svg-dim-line" stroke-width="2" />
            <polygon points="152,76 160,80 152,84" fill="var(--accent-primary)" />
            <text x="135" y="72" class="svg-dim-text">v</text>
            <path d="M 50 45 Q 80 25 110 45" fill="none" class="svg-dim-line" stroke-width="2" stroke-dasharray="4,2" />
            <polygon points="107,39 116,46 107,51" fill="var(--accent-primary)" />
            <text x="80" y="32" class="svg-dim-text">a = Δv / t</text>
          </svg>
        `
      },
      displacement_accel: {
        name: 'Kinematic Distance',
        category: 'Kinematics',
        description: 'Computes total distance traveled under constant acceleration (d = ut + ½at²).',
        inputs: [
          { id: 'phys_u_dist', label: 'Initial Velocity (u)', unit: 'm/s', placeholder: '5', required: true },
          { id: 'phys_a_dist', label: 'Acceleration (a)', unit: 'm/s²', placeholder: '2', required: true },
          { id: 'phys_t_dist', label: 'Time (t)', unit: 's', placeholder: '4', required: true, min: 0 }
        ],
        defaults: { phys_u_dist: 5, phys_a_dist: 2, phys_t_dist: 4 },
        primary: { label: 'Displacement (d)', unit: 'm' },
        secondary: { label: 'Final Velocity (v)', unit: 'm/s' },
        calculate: (vals) => {
          const u = vals.phys_u_dist;
          const a = vals.phys_a_dist;
          const t = vals.phys_t_dist;
          const d = u * t + 0.5 * a * t * t;
          const v = u + a * t;
          return {
            primary: { label: 'Displacement (d)', value: d, unit: 'm' },
            secondary: { label: 'Final Velocity (v)', value: v, unit: 'm/s' },
            inputSummary: `u = ${u} m/s, a = ${a} m/s², t = ${t} s`,
            formula: `Formula: d = u·t + ½a·t²\nStep 1: u·t = ${u} × ${t} = ${u * t}\nStep 2: ½a·t² = 0.5 × ${a} × ${t * t} = ${0.5 * a * t * t}\nStep 3: d = ${u * t} + ${0.5 * a * t * t} = ${d} m\nFinal velocity: v = u + at = ${v} m/s`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Kinematic distance diagram">
            <path d="M 25 110 Q 70 85 135 35" fill="none" class="svg-dim-line" stroke-width="2.5" />
            <circle cx="25" cy="110" r="6" class="svg-shape" />
            <circle cx="135" cy="35" r="6" class="svg-shape" />
            <line x1="25" y1="125" x2="135" y2="125" class="svg-dim-line" />
            <text x="80" y="137" class="svg-dim-text">d = ut + ½at²</text>
            <text x="110" y="28" class="svg-dim-text">v = u + at</text>
          </svg>
        `
      },
      freefall: {
        name: 'Free Fall & Gravity Drop',
        category: 'Kinematics',
        description: 'Computes drop distance and impact velocity of a falling object from rest under gravity.',
        inputs: [
          { id: 'phys_fall_time', label: 'Fall Time (t)', unit: 's', placeholder: '3', required: true, min: 0 },
          { id: 'phys_gravity', label: 'Acceleration of Gravity (g)', unit: 'm/s²', placeholder: '9.80665', required: true, min: 0.1 }
        ],
        defaults: { phys_fall_time: 3, phys_gravity: 9.80665 },
        primary: { label: 'Drop Height (h)', unit: 'm' },
        secondary: { label: 'Impact Velocity (v)', unit: 'm/s' },
        calculate: (vals) => {
          const t = vals.phys_fall_time;
          const g = vals.phys_gravity;
          const h = 0.5 * g * t * t;
          const v = g * t;
          return {
            primary: { label: 'Drop Height (h)', value: h, unit: 'm' },
            secondary: { label: 'Impact Velocity (v)', value: v, unit: 'm/s' },
            inputSummary: `t = ${t} s, g = ${g} m/s²`,
            formula: `Formula: h = ½g·t², v = g·t\nStep 1: h = 0.5 × ${g} × (${t})² = ${h} m\nStep 2: v = ${g} × ${t} = ${v} m/s (${formatNumber(v * 3.6)} km/h)`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Free fall gravity diagram">
            <line x1="30" y1="20" x2="70" y2="20" class="svg-dim-line" />
            <circle cx="50" cy="35" r="12" class="svg-shape" />
            <line x1="50" y1="48" x2="50" y2="105" class="svg-dim-line" stroke-width="2" stroke-dasharray="4,3" />
            <polygon points="46,105 50,115 54,105" fill="var(--accent-primary)" />
            <line x1="25" y1="120" x2="75" y2="120" class="svg-shape" stroke-width="3" />
            <line x1="90" y1="20" x2="90" y2="120" class="svg-dim-line" />
            <text x="120" y="70" class="svg-dim-text">h = ½gt²</text>
            <text x="120" y="90" class="svg-dim-text">g ≈ 9.81</text>
          </svg>
        `
      }
    },
    force: {
      newton_second: {
        name: "Newton's Second Law (F = ma)",
        category: 'Force & Dynamics',
        description: 'Calculates the net force required to accelerate a body of mass m.',
        inputs: [
          { id: 'phys_mass_f', label: 'Mass (m)', unit: 'kg', placeholder: '10', required: true, min: 0 },
          { id: 'phys_acc_f', label: 'Acceleration (a)', unit: 'm/s²', placeholder: '3', required: true }
        ],
        defaults: { phys_mass_f: 10, phys_acc_f: 3 },
        primary: { label: 'Net Force (F)', unit: 'N' },
        secondary: { label: 'Force in lbf', unit: 'lbf' },
        calculate: (vals) => {
          const m = vals.phys_mass_f;
          const a = vals.phys_acc_f;
          const f = m * a;
          const lbf = f * 0.224808943;
          return {
            primary: { label: 'Net Force (F)', value: f, unit: 'N' },
            secondary: { label: 'Force in lbf', value: lbf, unit: 'lbf' },
            inputSummary: `m = ${m} kg, a = ${a} m/s²`,
            formula: `Formula: F = m × a\nStep 1: F = ${m} kg × ${a} m/s² = ${f} N\nStep 2: lbf = ${f} × 0.2248 = ${lbf} lbf`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Newton Second Law F=ma">
            <rect x="45" y="55" width="45" height="45" rx="3" class="svg-shape" />
            <text x="67" y="82" class="svg-dim-text" font-size="14">m</text>
            <line x1="95" y1="78" x2="140" y2="78" class="svg-dim-line" stroke-width="3" />
            <polygon points="140,72 150,78 140,84" fill="var(--accent-primary)" />
            <text x="120" y="68" class="svg-dim-text">F = ma</text>
            <line x1="20" y1="102" x2="150" y2="102" class="svg-guide-line" />
          </svg>
        `
      },
      gravitational_weight: {
        name: 'Weight Force (W = mg)',
        category: 'Force & Dynamics',
        description: 'Calculates the downward gravitational force (weight) acting on a mass.',
        inputs: [
          { id: 'phys_mass_w', label: 'Mass (m)', unit: 'kg', placeholder: '70', required: true, min: 0 },
          { id: 'phys_grav_w', label: 'Local Gravity (g)', unit: 'm/s²', placeholder: '9.80665', required: true, min: 0.1 }
        ],
        defaults: { phys_mass_w: 70, phys_grav_w: 9.80665 },
        primary: { label: 'Weight Force (W)', unit: 'N' },
        secondary: { label: 'Weight in lbf', unit: 'lbf' },
        calculate: (vals) => {
          const m = vals.phys_mass_w;
          const g = vals.phys_grav_w;
          const w = m * g;
          const lbf = w * 0.224808943;
          return {
            primary: { label: 'Weight Force (W)', value: w, unit: 'N' },
            secondary: { label: 'Weight in lbf', value: lbf, unit: 'lbf' },
            inputSummary: `m = ${m} kg, g = ${g} m/s²`,
            formula: `Formula: W = m × g\nStep 1: W = ${m} kg × ${g} m/s² = ${w} N\nStep 2: Equivalent imperial weight = ${lbf} lbf`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Weight Force diagram">
            <circle cx="80" cy="45" r="22" class="svg-shape" />
            <text x="80" y="50" class="svg-dim-text" font-size="13">m</text>
            <line x1="80" y1="68" x2="80" y2="115" class="svg-dim-line" stroke-width="3" />
            <polygon points="74,115 80,126 86,115" fill="var(--accent-primary)" />
            <text x="110" y="95" class="svg-dim-text">W = mg</text>
          </svg>
        `
      },
      momentum: {
        name: 'Linear Momentum (p = mv)',
        category: 'Force & Dynamics',
        description: 'Computes linear momentum and kinetic impulse of a moving mass.',
        inputs: [
          { id: 'phys_mass_p', label: 'Mass (m)', unit: 'kg', placeholder: '1200', required: true, min: 0 },
          { id: 'phys_vel_p', label: 'Velocity (v)', unit: 'm/s', placeholder: '15', required: true }
        ],
        defaults: { phys_mass_p: 1200, phys_vel_p: 15 },
        primary: { label: 'Momentum (p)', unit: 'kg·m/s' },
        secondary: { label: 'Kinetic Energy (E)', unit: 'kJ' },
        calculate: (vals) => {
          const m = vals.phys_mass_p;
          const v = vals.phys_vel_p;
          const p = m * v;
          const ke_kj = (0.5 * m * v * v) / 1000;
          return {
            primary: { label: 'Momentum (p)', value: p, unit: 'kg·m/s' },
            secondary: { label: 'Kinetic Energy (E)', value: ke_kj, unit: 'kJ' },
            inputSummary: `m = ${m} kg, v = ${v} m/s`,
            formula: `Formula: p = m × v\nStep 1: p = ${m} kg × ${v} m/s = ${p} kg·m/s (N·s)\nStep 2: KE = ½mv² = ${ke_kj * 1000} J = ${ke_kj} kJ`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Momentum diagram">
            <circle cx="50" cy="70" r="20" class="svg-shape" />
            <text x="50" y="75" class="svg-dim-text" font-size="13">m</text>
            <line x1="72" y1="70" x2="135" y2="70" class="svg-dim-line" stroke-width="3" />
            <polygon points="135,64 146,70 135,76" fill="var(--accent-primary)" />
            <text x="105" y="58" class="svg-dim-text">p = mv</text>
          </svg>
        `
      },
      friction_force: {
        name: 'Friction Force (F_f = μN)',
        category: 'Force & Dynamics',
        description: 'Calculates the frictional resistance force between two contacting surfaces.',
        inputs: [
          { id: 'phys_norm_f', label: 'Normal Force (N)', unit: 'N', placeholder: '200', required: true, min: 0 },
          { id: 'phys_mu_f', label: 'Coefficient of Friction (μ)', unit: 'ratio', placeholder: '0.35', required: true, min: 0, step: '0.01' }
        ],
        defaults: { phys_norm_f: 200, phys_mu_f: 0.35 },
        primary: { label: 'Friction Force (F_f)', unit: 'N' },
        secondary: { label: 'Force in lbf', unit: 'lbf' },
        calculate: (vals) => {
          const n = vals.phys_norm_f;
          const mu = vals.phys_mu_f;
          const ff = mu * n;
          const lbf = ff * 0.224808943;
          return {
            primary: { label: 'Friction Force (F_f)', value: ff, unit: 'N' },
            secondary: { label: 'Force in lbf', value: lbf, unit: 'lbf' },
            inputSummary: `N = ${n} N, μ = ${mu}`,
            formula: `Formula: F_f = μ × N\nStep 1: F_f = ${mu} × ${n} N = ${ff} N\nStep 2: F_f in lbf = ${ff} × 0.2248 = ${lbf} lbf`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Friction force diagram">
            <line x1="15" y1="95" x2="145" y2="95" class="svg-dim-line" stroke-width="2" />
            <rect x="60" y="55" width="40" height="40" class="svg-shape" />
            <text x="80" y="80" class="svg-dim-text">m</text>
            <line x1="80" y1="55" x2="80" y2="25" class="svg-dim-line" stroke-width="2" />
            <polygon points="76,25 80,18 84,25" fill="var(--accent-primary)" />
            <text x="92" y="28" class="svg-dim-text">N</text>
            <line x1="60" y1="88" x2="25" y2="88" class="svg-dim-line" stroke-width="2" />
            <polygon points="25,84 17,88 25,92" fill="var(--accent-primary)" />
            <text x="35" y="78" class="svg-dim-text">F_f</text>
          </svg>
        `
      }
    },
    energy: {
      kinetic_energy: {
        name: 'Kinetic Energy (KE = ½mv²)',
        category: 'Work & Energy',
        description: 'Calculates the kinetic energy possessed by a body in motion.',
        inputs: [
          { id: 'phys_mass_ke', label: 'Mass (m)', unit: 'kg', placeholder: '80', required: true, min: 0 },
          { id: 'phys_vel_ke', label: 'Velocity (v)', unit: 'm/s', placeholder: '12', required: true }
        ],
        defaults: { phys_mass_ke: 80, phys_vel_ke: 12 },
        primary: { label: 'Kinetic Energy (KE)', unit: 'J' },
        secondary: { label: 'Energy in kilojoules', unit: 'kJ' },
        calculate: (vals) => {
          const m = vals.phys_mass_ke;
          const v = vals.phys_vel_ke;
          const ke = 0.5 * m * v * v;
          const kj = ke / 1000;
          return {
            primary: { label: 'Kinetic Energy (KE)', value: ke, unit: 'J' },
            secondary: { label: 'Energy in kilojoules', value: kj, unit: 'kJ' },
            inputSummary: `m = ${m} kg, v = ${v} m/s`,
            formula: `Formula: KE = ½ × m × v²\nStep 1: v² = (${v})² = ${v * v}\nStep 2: KE = 0.5 × ${m} × ${v * v} = ${ke} Joules\nStep 3: Energy in kJ = ${kj} kJ`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Kinetic energy diagram">
            <line x1="20" y1="100" x2="145" y2="100" class="svg-dim-line" stroke-dasharray="3,3" />
            <circle cx="50" cy="70" r="18" class="svg-shape" />
            <text x="50" y="75" class="svg-dim-text" font-size="12">m</text>
            <line x1="70" y1="70" x2="125" y2="70" class="svg-dim-line" stroke-width="2.5" />
            <polygon points="125,65 135,70 125,75" fill="var(--accent-primary)" />
            <text x="100" y="58" class="svg-dim-text">v</text>
            <text x="80" y="125" class="svg-dim-text">KE = ½mv²</text>
          </svg>
        `
      },
      potential_energy: {
        name: 'Potential Energy (PE = mgh)',
        category: 'Work & Energy',
        description: 'Calculates gravitational potential energy of an elevated object.',
        inputs: [
          { id: 'phys_mass_pe', label: 'Mass (m)', unit: 'kg', placeholder: '50', required: true, min: 0 },
          { id: 'phys_height_pe', label: 'Height (h)', unit: 'm', placeholder: '15', required: true, min: 0 },
          { id: 'phys_grav_pe', label: 'Gravity (g)', unit: 'm/s²', placeholder: '9.80665', required: true, min: 0.1 }
        ],
        defaults: { phys_mass_pe: 50, phys_height_pe: 15, phys_grav_pe: 9.80665 },
        primary: { label: 'Potential Energy (PE)', unit: 'J' },
        secondary: { label: 'Energy in kilojoules', unit: 'kJ' },
        calculate: (vals) => {
          const m = vals.phys_mass_pe;
          const h = vals.phys_height_pe;
          const g = vals.phys_grav_pe;
          const pe = m * g * h;
          const kj = pe / 1000;
          return {
            primary: { label: 'Potential Energy (PE)', value: pe, unit: 'J' },
            secondary: { label: 'Energy in kilojoules', value: kj, unit: 'kJ' },
            inputSummary: `m = ${m} kg, h = ${h} m, g = ${g} m/s²`,
            formula: `Formula: PE = m × g × h\nStep 1: PE = ${m} kg × ${g} m/s² × ${h} m = ${pe} Joules\nStep 2: Energy in kJ = ${kj} kJ`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Potential energy diagram">
            <line x1="30" y1="110" x2="130" y2="110" class="svg-dim-line" stroke-width="3" />
            <rect x="40" y="30" width="30" height="30" class="svg-shape" />
            <text x="55" y="50" class="svg-dim-text">m</text>
            <line x1="95" y1="30" x2="95" y2="110" class="svg-dim-line" />
            <text x="110" y="75" class="svg-dim-text">h</text>
            <text x="80" y="130" class="svg-dim-text">PE = mgh</text>
          </svg>
        `
      },
      work_done: {
        name: 'Work Done (W = Fd cos θ)',
        category: 'Work & Energy',
        description: 'Calculates mechanical work done by a force applied across a distance at angle θ.',
        inputs: [
          { id: 'phys_force_w', label: 'Force (F)', unit: 'N', placeholder: '150', required: true },
          { id: 'phys_dist_w', label: 'Distance / Displacement (d)', unit: 'm', placeholder: '20', required: true, min: 0 },
          { id: 'phys_angle_w', label: 'Angle θ between Force & Motion', unit: '°', placeholder: '0', required: true }
        ],
        defaults: { phys_force_w: 150, phys_dist_w: 20, phys_angle_w: 0 },
        primary: { label: 'Work Done (W)', unit: 'J' },
        secondary: { label: 'Effective Force F·cos(θ)', unit: 'N' },
        calculate: (vals) => {
          const f = vals.phys_force_w;
          const d = vals.phys_dist_w;
          const thetaDeg = vals.phys_angle_w;
          const thetaRad = (thetaDeg * Math.PI) / 180;
          const cosTheta = Math.cos(thetaRad);
          const effectiveF = f * cosTheta;
          const w = effectiveF * d;
          return {
            primary: { label: 'Work Done (W)', value: w, unit: 'J' },
            secondary: { label: 'Effective Force F·cos(θ)', value: effectiveF, unit: 'N' },
            inputSummary: `F = ${f} N, d = ${d} m, θ = ${thetaDeg}°`,
            formula: `Formula: W = F × d × cos(θ)\nStep 1: cos(${thetaDeg}°) = ${formatNumber(cosTheta, 4)}\nStep 2: Effective Force = ${f} × ${formatNumber(cosTheta, 4)} = ${effectiveF} N\nStep 3: W = ${effectiveF} × ${d} = ${w} Joules`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Work done diagram">
            <line x1="15" y1="95" x2="145" y2="95" class="svg-dim-line" />
            <rect x="35" y="60" width="35" height="35" class="svg-shape" />
            <line x1="70" y1="77" x2="125" y2="40" class="svg-dim-line" stroke-width="2.5" />
            <polygon points="122,34 132,35 127,44" fill="var(--accent-primary)" />
            <line x1="70" y1="77" x2="115" y2="77" class="svg-guide-line" stroke-dasharray="2,2" />
            <text x="115" y="55" class="svg-dim-text">F (θ)</text>
            <line x1="35" y1="110" x2="125" y2="110" class="svg-dim-line" />
            <text x="80" y="125" class="svg-dim-text">W = F·d·cos(θ)</text>
          </svg>
        `
      },
      power: {
        name: 'Mechanical Power (P = W / t)',
        category: 'Work & Energy',
        description: 'Calculates the rate of energy transfer or work performed over time.',
        inputs: [
          { id: 'phys_work_p', label: 'Work Done / Energy (W)', unit: 'J', placeholder: '5000', required: true },
          { id: 'phys_time_p', label: 'Time Elapsed (t)', unit: 's', placeholder: '8', required: true, min: 0.000001 }
        ],
        defaults: { phys_work_p: 5000, phys_time_p: 8 },
        primary: { label: 'Power (P)', unit: 'W' },
        secondary: { label: 'Horsepower (hp)', unit: 'hp' },
        calculate: (vals) => {
          const w = vals.phys_work_p;
          const t = vals.phys_time_p;
          if (t <= 0) return null;
          const p = w / t;
          const hp = p / 745.699872;
          return {
            primary: { label: 'Power (P)', value: p, unit: 'W' },
            secondary: { label: 'Horsepower (hp)', value: hp, unit: 'hp' },
            inputSummary: `W = ${w} J, t = ${t} s`,
            formula: `Formula: P = W / t\nStep 1: P = ${w} J / ${t} s = ${p} Watts\nStep 2: Mechanical Horsepower = ${p} / 745.7 = ${hp} hp`
          };
        },
        svg: `
          <svg viewBox="0 0 160 140" class="shape-svg" aria-label="Power diagram">
            <circle cx="80" cy="65" r="32" class="svg-shape" />
            <path d="M 80 40 L 80 65 L 98 65" stroke="var(--accent-primary)" stroke-width="2.5" fill="none" />
            <line x1="80" y1="102" x2="80" y2="115" class="svg-dim-line" />
            <text x="80" y="130" class="svg-dim-text">P = W / t (Watts)</text>
          </svg>
        `
      }
    }
  };

  // =========================================================================
  // 2. STATE
  // =========================================================================

  let activeShapeTab = '2D'; // '2D' or '3D'
  let currentShapeKey = 'square';
  let currentShapeUnit = 'cm';
  let calculationHistory = []; // Exactly last 5, in-memory, cleared on reload
  let lastCalculatedShapeResult = null;

  // Physics Calculator State
  let activePhysicsCat = 'kinematics'; // 'kinematics', 'force', 'energy'
  let currentPhysicsKey = 'velocity_speed';
  let lastCalculatedPhysicsResult = null;

  // Scientific Calculator State (Casio fx-991 style)
  const sciState = {
    expression: '',
    result: '0',
    ans: 0,
    numericResult: 0,
    memory: 0,
    angleMode: 'DEG', // 'DEG' or 'RAD'
    shiftActive: false,
    hasEvaluated: false,
    justInsertedFunc: false,
    sdState: 'decimal' // 'decimal', 'fraction', 'mixed'
  };

  // =========================================================================
  // 3. UTILITIES
  // =========================================================================

  function formatNumber(num, decimals = 4) {
    if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) return '0';
    if (Math.abs(num) < 0.00001 && num !== 0) {
      return num.toExponential(4);
    }
    const rounded = Number(num.toFixed(decimals));
    return rounded.toLocaleString('en-US', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: 0
    });
  }

  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('toast-visible');
    setTimeout(() => {
      toast.classList.remove('toast-visible');
    }, 2500);
  }

  function copyToClipboard(text, targetBtn, successMsg) {
    const originalContent = targetBtn ? targetBtn.innerHTML : null;

    const performVisualFeedback = () => {
      if (targetBtn) {
        targetBtn.classList.add('btn-copied-state');
        targetBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied! ✓
        `;
        setTimeout(() => {
          targetBtn.classList.remove('btn-copied-state');
          if (originalContent) targetBtn.innerHTML = originalContent;
        }, 1800);
      }
      showToast(successMsg || 'Copied to clipboard!');
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(performVisualFeedback).catch(() => {
        fallbackCopyText(text, performVisualFeedback);
      });
    } else {
      fallbackCopyText(text, performVisualFeedback);
    }
  }

  function fallbackCopyText(text, callback) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      showToast('Press Ctrl+C to copy');
    }
    document.body.removeChild(textarea);
  }

  // =========================================================================
  // 4. THEME MANAGEMENT (LIGHT / DARK)
  // =========================================================================

  function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('app-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    setTheme(isDark);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!currentDark);
      });
    }

    // Listen for OS scheme change if user hasn't set explicit preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('app-theme')) {
          setTheme(e.matches);
        }
      });
    }
  }

  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('app-theme', 'dark'); } catch(e){}
      updateThemeIcon(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      try { localStorage.setItem('app-theme', 'light'); } catch(e){}
      updateThemeIcon(false);
    }
  }

  function updateThemeIcon(isDark) {
    const container = document.getElementById('theme-icon-container');
    const label = document.getElementById('theme-toggle-text');
    if (!container) return;

    if (isDark) {
      container.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      `;
      if (label) label.textContent = 'Light';
      document.getElementById('theme-toggle-btn')?.setAttribute('aria-label', 'Switch to light theme');
    } else {
      container.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      `;
      if (label) label.textContent = 'Dark';
      document.getElementById('theme-toggle-btn')?.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  // =========================================================================
  // 5. APP NAVIGATION TABS
  // =========================================================================

  function initNavigation() {
    const navButtons = document.querySelectorAll('.main-nav-tab');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        navButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        try {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } catch(e){}

        document.querySelectorAll('.tool-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          if (targetId === 'sci-calc-panel') {
            try {
              targetPanel.focus();
            } catch (e) {}
          }
        }
      });
    });
  }

  // =========================================================================
  // 6. SHAPE CALCULATOR (2D & 3D)
  // =========================================================================

  function initShapeCalculator() {
    // 2D vs 3D category toggle
    const shapeDim2DBtn = document.getElementById('dim-toggle-2d');
    const shapeDim3DBtn = document.getElementById('dim-toggle-3d');

    if (shapeDim2DBtn && shapeDim3DBtn) {
      shapeDim2DBtn.addEventListener('click', () => {
        if (activeShapeTab !== '2D') {
          activeShapeTab = '2D';
          shapeDim2DBtn.classList.add('active');
          shapeDim2DBtn.setAttribute('aria-pressed', 'true');
          shapeDim3DBtn.classList.remove('active');
          shapeDim3DBtn.setAttribute('aria-pressed', 'false');
          currentShapeKey = 'square';
          renderShapeChips();
          renderShapeForm();
        }
      });

      shapeDim3DBtn.addEventListener('click', () => {
        if (activeShapeTab !== '3D') {
          activeShapeTab = '3D';
          shapeDim3DBtn.classList.add('active');
          shapeDim3DBtn.setAttribute('aria-pressed', 'true');
          shapeDim2DBtn.classList.remove('active');
          shapeDim2DBtn.setAttribute('aria-pressed', 'false');
          currentShapeKey = 'cube';
          renderShapeChips();
          renderShapeForm();
        }
      });
    }

    const shapeUnitSelect = document.getElementById('shape-unit-select');
    if (shapeUnitSelect) {
      shapeUnitSelect.addEventListener('change', (e) => {
        currentShapeUnit = e.target.value;
        updateShapeUnitLabels();
        calculateCurrentShape();
      });
    }

    const form = document.getElementById('shape-calc-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateCurrentShape(true);
      });
    }

    // Copy buttons
    const copyPrimaryBtn = document.getElementById('copy-primary-shape-btn');
    const copySecondaryBtn = document.getElementById('copy-secondary-shape-btn');

    if (copyPrimaryBtn) {
      copyPrimaryBtn.addEventListener('click', () => {
        const val = document.getElementById('shape-primary-val')?.textContent;
        const unit = document.getElementById('shape-primary-unit')?.textContent;
        const label = document.getElementById('shape-primary-label')?.textContent;
        if (val && val !== '--') {
          copyToClipboard(`${val} ${unit}`, copyPrimaryBtn, `${label} copied!`);
        }
      });
    }

    if (copySecondaryBtn) {
      copySecondaryBtn.addEventListener('click', () => {
        const val = document.getElementById('shape-secondary-val')?.textContent;
        const unit = document.getElementById('shape-secondary-unit')?.textContent;
        const label = document.getElementById('shape-secondary-label')?.textContent;
        if (val && val !== '--') {
          copyToClipboard(`${val} ${unit}`, copySecondaryBtn, `${label} copied!`);
        }
      });
    }

    // Render chips and first shape
    renderShapeChips();
    renderShapeForm();
  }

  function getActiveShapesMap() {
    return activeShapeTab === '2D' ? SHAPES_2D : SHAPES_3D;
  }

  function renderShapeChips() {
    const container = document.getElementById('shape-chips-container');
    if (!container) return;
    container.innerHTML = '';

    const shapes = getActiveShapesMap();
    Object.keys(shapes).forEach(key => {
      const shape = shapes[key];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `shape-chip ${key === currentShapeKey ? 'active' : ''}`;
      btn.setAttribute('data-shape', key);
      btn.textContent = shape.name;
      btn.addEventListener('click', () => {
        currentShapeKey = key;
        document.querySelectorAll('.shape-chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        try {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } catch(e){}
        renderShapeForm();
      });
      container.appendChild(btn);
    });
  }

  function renderShapeForm() {
    const shapes = getActiveShapesMap();
    const shape = shapes[currentShapeKey];
    if (!shape) return;

    // Update diagram & details
    const diagramEl = document.getElementById('shape-diagram-container');
    const descEl = document.getElementById('shape-description');
    const titleEl = document.getElementById('active-shape-title');
    if (diagramEl) diagramEl.innerHTML = shape.svg;
    if (descEl) descEl.textContent = shape.description;
    if (titleEl) titleEl.textContent = shape.name;

    // Update Result Labels (e.g. Area vs Volume)
    const primaryLabel = document.getElementById('shape-primary-label');
    const secondaryLabel = document.getElementById('shape-secondary-label');
    if (activeShapeTab === '2D') {
      if (primaryLabel) primaryLabel.textContent = 'Computed Area';
      if (secondaryLabel) secondaryLabel.textContent = 'Computed Perimeter';
    } else {
      if (primaryLabel) primaryLabel.textContent = 'Computed Volume';
      if (secondaryLabel) secondaryLabel.textContent = 'Total Surface Area';
    }

    // Build Inputs
    const inputsContainer = document.getElementById('shape-inputs-container');
    if (!inputsContainer) return;
    inputsContainer.innerHTML = '';

    shape.inputs.forEach(field => {
      const group = document.createElement('div');
      group.className = 'form-group';

      const label = document.createElement('label');
      label.setAttribute('for', field.id);
      label.className = 'form-label';
      label.innerHTML = `${field.label} ${field.required ? '<span class="req-star" aria-hidden="true">*</span>' : '<span class="opt-label">(optional)</span>'}`;

      const wrapper = document.createElement('div');
      wrapper.className = 'input-wrapper';

      const input = document.createElement('input');
      input.type = 'number';
      input.id = field.id;
      input.name = field.id;
      input.className = 'form-input shape-dim-input';
      input.placeholder = field.placeholder || '0';
      input.step = field.step || 'any';
      input.inputMode = 'decimal';
      if (field.min !== undefined) input.min = field.min;
      if (field.max !== undefined) input.max = field.max;
      if (field.required) input.required = true;

      const unitBadge = document.createElement('span');
      unitBadge.className = 'input-unit-badge shape-unit-badge';
      unitBadge.textContent = field.id.includes('deg') ? '°' : currentShapeUnit;

      wrapper.appendChild(input);
      wrapper.appendChild(unitBadge);
      group.appendChild(label);
      group.appendChild(wrapper);

      if (field.helper) {
        const helper = document.createElement('p');
        helper.className = 'form-helper-text';
        helper.textContent = field.helper;
        group.appendChild(helper);
      }

      inputsContainer.appendChild(group);

      input.addEventListener('input', () => {
        calculateCurrentShape();
      });
    });

    // Autofill sensible defaults
    applyDefaultShapeValues(currentShapeKey);
    updateShapeUnitLabels();
    calculateCurrentShape();
  }

  function applyDefaultShapeValues(key) {
    const defaults = {
      // 2D
      square: { side_a: 5 },
      rectangle: { length_l: 8, width_w: 4 },
      circle: { radius_r: 6 },
      triangle: { base_b: 6, height_h: 4, side_a: 5, side_b: 6, side_c: 5 },
      parallelogram: { base_b: 7, height_h: 4, side_s: 5 },
      trapezoid: { base_a: 4, base_b: 8, height_h: 5, leg_c: 5.5, leg_d: 5.5 },
      rhombus: { diag_1: 8, diag_2: 6, side_s: '' },
      ellipse: { semi_a: 6, semi_b: 4 },
      regular_polygon: { side_s: 5, num_sides: 6 },
      circle_sector: { radius_r: 6, angle_deg: 60 },
      annulus: { radius_R: 8, radius_r: 5 },
      kite: { diag_1: 10, diag_2: 6, side_a: 5, side_b: 7 },
      // 3D
      cube: { side_a: 5 },
      rectangular_prism: { length_l: 8, width_w: 5, height_h: 4 },
      cylinder: { radius_r: 4, height_h: 10 },
      sphere: { radius_r: 5 },
      hemisphere: { radius_r: 5 },
      cone: { radius_r: 5, height_h: 12 },
      square_pyramid: { base_a: 6, height_h: 8 },
      torus: { radius_R: 8, radius_r: 2 },
      capsule: { radius_r: 4, length_a: 10 }
    };

    const shapeVals = defaults[key];
    if (shapeVals) {
      Object.keys(shapeVals).forEach(id => {
        const inp = document.getElementById(id);
        if (inp && shapeVals[id] !== '') {
          inp.value = shapeVals[id];
        }
      });
    }
  }

  function updateShapeUnitLabels() {
    document.querySelectorAll('.shape-unit-badge').forEach(badge => {
      if (!badge.textContent.includes('°')) {
        badge.textContent = currentShapeUnit;
      }
    });

    const primaryUnit = document.getElementById('shape-primary-unit');
    const secondaryUnit = document.getElementById('shape-secondary-unit');

    if (activeShapeTab === '2D') {
      if (primaryUnit) primaryUnit.textContent = `${currentShapeUnit}²`;
      if (secondaryUnit) secondaryUnit.textContent = currentShapeUnit;
    } else {
      if (primaryUnit) primaryUnit.textContent = `${currentShapeUnit}³`;
      if (secondaryUnit) secondaryUnit.textContent = `${currentShapeUnit}²`;
    }
  }

  function calculateCurrentShape(recordHistory = false) {
    const shapes = getActiveShapesMap();
    const shape = shapes[currentShapeKey];
    if (!shape) return;

    const values = {};
    let hasError = false;

    shape.inputs.forEach(field => {
      const input = document.getElementById(field.id);
      if (input) {
        const raw = input.value.trim();
        if (raw !== '') {
          const val = parseFloat(raw);
          if (isNaN(val) || (field.min !== undefined && val < field.min) || (field.max !== undefined && val > field.max)) {
            hasError = true;
          } else {
            values[field.id] = val;
          }
        } else if (field.required) {
          hasError = true;
        }
      }
    });

    const primaryValEl = document.getElementById('shape-primary-val');
    const secondaryValEl = document.getElementById('shape-secondary-val');
    const formulaContentEl = document.getElementById('formula-details-content');

    if (hasError) {
      if (primaryValEl) primaryValEl.textContent = '--';
      if (secondaryValEl) secondaryValEl.textContent = '--';
      if (formulaContentEl) formulaContentEl.textContent = 'Please enter valid dimensions to calculate.';
      lastCalculatedShapeResult = null;
      return;
    }

    const result = shape.calculate(values);
    if (!result) {
      if (primaryValEl) primaryValEl.textContent = '--';
      if (secondaryValEl) secondaryValEl.textContent = '--';
      lastCalculatedShapeResult = null;
      return;
    }

    lastCalculatedShapeResult = {
      category: activeShapeTab,
      shapeName: shape.name,
      shapeKey: currentShapeKey,
      unit: currentShapeUnit,
      inputSummary: result.inputSummary,
      primaryLabel: result.primary.label,
      primaryValue: result.primary.value,
      primaryUnit: `${currentShapeUnit}${result.primary.unitSuffix}`,
      secondaryLabel: result.secondary.label,
      secondaryValue: result.secondary.value,
      secondaryUnit: `${currentShapeUnit}${result.secondary.unitSuffix}`
    };

    if (primaryValEl) primaryValEl.textContent = formatNumber(result.primary.value);
    if (secondaryValEl) secondaryValEl.textContent = formatNumber(result.secondary.value);

    if (formulaContentEl) {
      const steps = result.formula.split('\n');
      formulaContentEl.innerHTML = steps.map(s => `<div class="formula-step"><code>${s}</code></div>`).join('');
    }

    if (recordHistory) {
      addHistoryEntry({
        type: activeShapeTab === '2D' ? '2d-shape' : '3d-shape',
        typeLabel: `${shape.name} (${activeShapeTab})`,
        inputs: result.inputSummary,
        output: `${result.primary.label}: ${formatNumber(result.primary.value)} ${currentShapeUnit}${result.primary.unitSuffix}, ${result.secondary.label}: ${formatNumber(result.secondary.value)} ${currentShapeUnit}${result.secondary.unitSuffix}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  }

  // =========================================================================
  // 6.5. PHYSICS FORMULAS CALCULATOR
  // =========================================================================

  function initPhysicsCalculator() {
    // Category tabs (Kinematics, Force, Energy)
    const catButtons = document.querySelectorAll('.physics-cat-bar .btn-dim-toggle');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        if (cat && cat !== activePhysicsCat) {
          activePhysicsCat = cat;
          catButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');

          const formulas = PHYSICS_FORMULAS[activePhysicsCat];
          if (formulas) {
            currentPhysicsKey = Object.keys(formulas)[0];
          }
          renderPhysicsChips();
          renderPhysicsForm();
        }
      });
    });

    const form = document.getElementById('physics-calc-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateCurrentPhysics(true);
      });
    }

    // Copy buttons
    const copyPrimaryBtn = document.getElementById('copy-primary-physics-btn');
    const copySecondaryBtn = document.getElementById('copy-secondary-physics-btn');

    if (copyPrimaryBtn) {
      copyPrimaryBtn.addEventListener('click', () => {
        const val = document.getElementById('physics-primary-val')?.textContent;
        const unit = document.getElementById('physics-primary-unit')?.textContent;
        const label = document.getElementById('physics-primary-label')?.textContent;
        if (val && val !== '--') {
          copyToClipboard(`${val} ${unit}`, copyPrimaryBtn, `${label} copied!`);
        }
      });
    }

    if (copySecondaryBtn) {
      copySecondaryBtn.addEventListener('click', () => {
        const val = document.getElementById('physics-secondary-val')?.textContent;
        const unit = document.getElementById('physics-secondary-unit')?.textContent;
        const label = document.getElementById('physics-secondary-label')?.textContent;
        if (val && val !== '--') {
          copyToClipboard(`${val} ${unit}`, copySecondaryBtn, `${label} copied!`);
        }
      });
    }

    // Initial render
    renderPhysicsChips();
    renderPhysicsForm();
  }

  function renderPhysicsChips() {
    const container = document.getElementById('physics-chips-container');
    if (!container) return;
    container.innerHTML = '';

    const formulas = PHYSICS_FORMULAS[activePhysicsCat] || {};
    Object.keys(formulas).forEach(key => {
      const item = formulas[key];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `shape-chip ${key === currentPhysicsKey ? 'active' : ''}`;
      btn.setAttribute('data-formula', key);
      btn.textContent = item.name;
      btn.addEventListener('click', () => {
        currentPhysicsKey = key;
        container.querySelectorAll('.shape-chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        try {
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } catch(e){}
        renderPhysicsForm();
      });
      container.appendChild(btn);
    });
  }

  function renderPhysicsForm() {
    const formulas = PHYSICS_FORMULAS[activePhysicsCat] || {};
    const formula = formulas[currentPhysicsKey];
    if (!formula) return;

    // Update diagram & header details
    const diagramEl = document.getElementById('physics-diagram-container');
    const descEl = document.getElementById('physics-description');
    const titleEl = document.getElementById('active-physics-title');
    if (diagramEl) diagramEl.innerHTML = formula.svg;
    if (descEl) descEl.textContent = formula.description;
    if (titleEl) titleEl.textContent = formula.name;

    // Update Result Labels
    const primaryLabel = document.getElementById('physics-primary-label');
    const secondaryLabel = document.getElementById('physics-secondary-label');
    const primaryUnit = document.getElementById('physics-primary-unit');
    const secondaryUnit = document.getElementById('physics-secondary-unit');

    if (primaryLabel) primaryLabel.textContent = formula.primary.label;
    if (secondaryLabel) secondaryLabel.textContent = formula.secondary.label;
    if (primaryUnit) primaryUnit.textContent = formula.primary.unit;
    if (secondaryUnit) secondaryUnit.textContent = formula.secondary.unit;

    // Build Inputs
    const inputsContainer = document.getElementById('physics-inputs-container');
    if (!inputsContainer) return;
    inputsContainer.innerHTML = '';

    formula.inputs.forEach(field => {
      const group = document.createElement('div');
      group.className = 'form-group';

      const label = document.createElement('label');
      label.setAttribute('for', field.id);
      label.className = 'form-label';
      label.innerHTML = `${field.label} ${field.required ? '<span class="req-star" aria-hidden="true">*</span>' : '<span class="opt-label">(optional)</span>'}`;

      const wrapper = document.createElement('div');
      wrapper.className = 'input-wrapper';

      const input = document.createElement('input');
      input.type = 'number';
      input.id = field.id;
      input.name = field.id;
      input.className = 'form-input physics-dim-input';
      input.placeholder = field.placeholder || '0';
      input.step = field.step || 'any';
      input.inputMode = 'decimal';
      if (field.min !== undefined) input.min = field.min;
      if (field.max !== undefined) input.max = field.max;
      if (field.required) input.required = true;

      const unitBadge = document.createElement('span');
      unitBadge.className = 'input-unit-badge';
      unitBadge.textContent = field.unit;

      wrapper.appendChild(input);
      wrapper.appendChild(unitBadge);
      group.appendChild(label);
      group.appendChild(wrapper);

      inputsContainer.appendChild(group);

      input.addEventListener('input', () => {
        calculateCurrentPhysics();
      });
    });

    // Populate sensible defaults
    if (formula.defaults) {
      Object.keys(formula.defaults).forEach(id => {
        const inp = document.getElementById(id);
        if (inp) inp.value = formula.defaults[id];
      });
    }

    calculateCurrentPhysics();
  }

  function calculateCurrentPhysics(recordHistory = false) {
    const formulas = PHYSICS_FORMULAS[activePhysicsCat] || {};
    const formula = formulas[currentPhysicsKey];
    if (!formula) return;

    const values = {};
    let hasError = false;

    formula.inputs.forEach(field => {
      const input = document.getElementById(field.id);
      if (input) {
        const raw = input.value.trim();
        if (raw !== '') {
          const val = parseFloat(raw);
          if (isNaN(val) || (field.min !== undefined && val < field.min) || (field.max !== undefined && val > field.max)) {
            hasError = true;
          } else {
            values[field.id] = val;
          }
        } else if (field.required) {
          hasError = true;
        }
      }
    });

    const primaryValEl = document.getElementById('physics-primary-val');
    const secondaryValEl = document.getElementById('physics-secondary-val');
    const formulaContentEl = document.getElementById('physics-formula-details');

    if (hasError) {
      if (primaryValEl) primaryValEl.textContent = '--';
      if (secondaryValEl) secondaryValEl.textContent = '--';
      if (formulaContentEl) formulaContentEl.textContent = 'Please enter valid numbers to calculate.';
      lastCalculatedPhysicsResult = null;
      return;
    }

    const result = formula.calculate(values);
    if (!result) {
      if (primaryValEl) primaryValEl.textContent = '--';
      if (secondaryValEl) secondaryValEl.textContent = '--';
      lastCalculatedPhysicsResult = null;
      return;
    }

    lastCalculatedPhysicsResult = result;

    if (primaryValEl) primaryValEl.textContent = formatNumber(result.primary.value);
    if (secondaryValEl) secondaryValEl.textContent = formatNumber(result.secondary.value);

    if (formulaContentEl) {
      const steps = result.formula.split('\n');
      formulaContentEl.innerHTML = steps.map(s => `<div class="formula-step"><code>${s}</code></div>`).join('');
    }

    if (recordHistory) {
      addHistoryEntry({
        type: 'physics',
        typeLabel: `${formula.name} (${formula.category})`,
        inputs: result.inputSummary,
        output: `${result.primary.label}: ${formatNumber(result.primary.value)} ${result.primary.unit}, ${result.secondary.label}: ${formatNumber(result.secondary.value)} ${result.secondary.unit}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  }

  // =========================================================================
  // 7. UNIT CONVERTER
  // =========================================================================

  let currentConvCategory = 'mass';

  function initUnitConverter() {
    const categoryTabs = document.querySelectorAll('.converter-category-tab');
    const fromInput = document.getElementById('conv-from-value');
    const fromSelect = document.getElementById('conv-from-unit');
    const toSelect = document.getElementById('conv-to-unit');
    const swapBtn = document.getElementById('conv-swap-btn');
    const copyConvBtn = document.getElementById('copy-conv-btn');

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-category');
        if (cat && CONVERTER_DATA[cat]) {
          categoryTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          try {
            tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } catch(e){}
          currentConvCategory = cat;
          populateConverterUnits();
          runUnitConversion();
        }
      });
    });

    if (fromInput) {
      fromInput.addEventListener('input', () => runUnitConversion());
    }
    if (fromSelect) {
      fromSelect.addEventListener('change', () => runUnitConversion());
    }
    if (toSelect) {
      toSelect.addEventListener('change', () => runUnitConversion());
    }

    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        if (!fromSelect || !toSelect) return;
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;

        swapBtn.classList.add('animate-spin-once');
        setTimeout(() => swapBtn.classList.remove('animate-spin-once'), 400);
        runUnitConversion();
      });
    }

    if (copyConvBtn) {
      copyConvBtn.addEventListener('click', () => {
        const val = document.getElementById('conv-to-value')?.value;
        const toUnitText = toSelect?.options[toSelect.selectedIndex]?.text || '';
        if (val) {
          copyToClipboard(`${val} ${toUnitText}`, copyConvBtn, 'Converted value copied!');
        }
      });
    }

    document.getElementById('unit-calc-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      runUnitConversion(true);
    });

    populateConverterUnits();
    runUnitConversion();
  }

  function populateConverterUnits() {
    const data = CONVERTER_DATA[currentConvCategory];
    const fromSelect = document.getElementById('conv-from-unit');
    const toSelect = document.getElementById('conv-to-unit');
    if (!data || !fromSelect || !toSelect) return;

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    data.units.forEach(u => {
      const opt1 = document.createElement('option');
      opt1.value = u.id;
      opt1.textContent = u.name;
      fromSelect.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = u.id;
      opt2.textContent = u.name;
      toSelect.appendChild(opt2);
    });

    if (currentConvCategory === 'mass') {
      fromSelect.value = 'kg';
      toSelect.value = 'lb';
    } else if (currentConvCategory === 'volume') {
      fromSelect.value = 'L';
      toSelect.value = 'gal';
    } else if (currentConvCategory === 'distance') {
      fromSelect.value = 'km';
      toSelect.value = 'mi';
    }
  }

  function runUnitConversion(recordHistory = false) {
    const data = CONVERTER_DATA[currentConvCategory];
    const fromInput = document.getElementById('conv-from-value');
    const toInput = document.getElementById('conv-to-value');
    const fromSelect = document.getElementById('conv-from-unit');
    const toSelect = document.getElementById('conv-to-unit');
    const formulaDisplay = document.getElementById('conv-formula-display');

    if (!data || !fromInput || !toInput || !fromSelect || !toSelect) return;

    const fromVal = parseFloat(fromInput.value);
    const fromId = fromSelect.value;
    const toId = toSelect.value;

    const fromUnitObj = data.units.find(u => u.id === fromId);
    const toUnitObj = data.units.find(u => u.id === toId);

    if (!fromUnitObj || !toUnitObj) return;

    if (isNaN(fromVal)) {
      toInput.value = '';
      if (formulaDisplay) formulaDisplay.textContent = 'Enter a value to see conversion.';
      return;
    }

    const valueInBase = fromVal * fromUnitObj.factor;
    const targetVal = valueInBase / toUnitObj.factor;

    toInput.value = formatNumber(targetVal, 6);

    const factorRatio = fromUnitObj.factor / toUnitObj.factor;
    const reverseRatio = toUnitObj.factor / fromUnitObj.factor;

    if (formulaDisplay) {
      formulaDisplay.innerHTML = `
        <div class="conv-formula-card">
          <div class="conv-formula-item">
            <span class="factor-label">Direct Factor:</span>
            <strong>1 ${fromUnitObj.id} = ${formatNumber(factorRatio, 6)} ${toUnitObj.id}</strong>
          </div>
          <div class="conv-formula-item">
            <span class="factor-label">Reverse Factor:</span>
            <span>1 ${toUnitObj.id} = ${formatNumber(reverseRatio, 6)} ${fromUnitObj.id}</span>
          </div>
          <div class="conv-formula-step">
            <code>${fromVal} × (${fromUnitObj.factor} ÷ ${toUnitObj.factor}) = ${formatNumber(targetVal, 6)} ${toUnitObj.id}</code>
          </div>
        </div>
      `;
    }

    // Quick benchmark table
    const tableBody = document.getElementById('quick-ref-table-body');
    const tableHeader = document.getElementById('quick-ref-header');
    if (tableBody && tableHeader) {
      tableHeader.textContent = `Quick Reference: ${fromUnitObj.id} to ${toUnitObj.id}`;
      tableBody.innerHTML = '';
      [1, 2, 5, 10, 25, 50, 100].forEach(n => {
        const conv = n * factorRatio;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="ref-col-val">${n} ${fromUnitObj.id}</td>
          <td class="ref-col-arrow" aria-hidden="true">→</td>
          <td class="ref-col-result">${formatNumber(conv, 4)} ${toUnitObj.id}</td>
        `;
        tableBody.appendChild(tr);
      });
    }

    if (recordHistory) {
      addHistoryEntry({
        type: 'unit',
        typeLabel: `${data.name} Conversion`,
        inputs: `${fromVal} ${fromUnitObj.id}`,
        output: `${formatNumber(targetVal, 6)} ${toUnitObj.id}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  }

  // =========================================================================
  // 8. SCIENTIFIC CALCULATOR (CASIO fx-991 STYLE)
  // =========================================================================

  function highlightCasioButton(action, val) {
    const keypad = document.getElementById('casio-keypad');
    if (!keypad) return;

    let btn = null;
    if (val !== undefined && val !== null) {
      btn = keypad.querySelector(`button[data-action="${action}"][data-val="${val}"]`)
         || keypad.querySelector(`button[data-val="${val}"]`);
    }
    if (!btn && action) {
      btn = keypad.querySelector(`button[data-action="${action}"]`);
    }

    if (btn) {
      btn.classList.add('key-active');
      setTimeout(() => {
        btn.classList.remove('key-active');
      }, 150);
    }
  }

  function initScientificCalculator() {
    const exprDisplay = document.getElementById('casio-expr-line');
    const resultDisplay = document.getElementById('casio-result-line');
    const modeBadge = document.getElementById('casio-mode-badge');
    const memBadge = document.getElementById('casio-mem-badge');
    const copySciBtn = document.getElementById('copy-sci-btn');
    const keypad = document.getElementById('casio-keypad');
    const sciPanel = document.getElementById('sci-calc-panel');

    // Keypad event delegation
    if (keypad) {
      keypad.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const action = btn.getAttribute('data-action');
        const value = btn.getAttribute('data-val');

        handleCasioAction(action, value);
      });
    }

    if (copySciBtn) {
      copySciBtn.addEventListener('click', () => {
        const val = sciState.result;
        copyToClipboard(val, copySciBtn, 'Calculator result copied!');
      });
    }

    // Physical Keyboard Support for the Casio Calculator Panel
    let keyBuffer = '';
    let keyBufferTimer = null;

    const FUNCTION_WORDS = {
      'sin': { action: 'insert-func', val: 'sin' },
      'cos': { action: 'insert-func', val: 'cos' },
      'tan': { action: 'insert-func', val: 'tan' },
      'asin': { action: 'insert-func', val: 'asin' },
      'acos': { action: 'insert-func', val: 'acos' },
      'atan': { action: 'insert-func', val: 'atan' },
      'sinh': { action: 'insert-func', val: 'sinh' },
      'cosh': { action: 'insert-func', val: 'cosh' },
      'tanh': { action: 'insert-func', val: 'tanh' },
      'sqrt': { action: 'insert-func', val: 'sqrt' },
      'cbrt': { action: 'insert-func', val: 'cbrt' },
      'sq': { action: 'insert', val: '^2' },
      'ln': { action: 'insert-func', val: 'ln' },
      'log': { action: 'insert-func', val: 'log' },
      'abs': { action: 'insert-func', val: 'abs' },
      'exp': { action: 'insert-func', val: 'exp' },
      'pi': { action: 'insert', val: 'π' },
      'ans': { action: 'ans' },
      'ncr': { action: 'insert', val: 'nCr' },
      'npr': { action: 'insert', val: 'nPr' },
      'deg': { action: 'toggle-angle' },
      'rad': { action: 'toggle-angle' },
      'sd': { action: 'sd-toggle' },
      'mr': { action: 'mem-recall' },
      'mc': { action: 'mem-clear' },
      'm+': { action: 'mem-add' },
      'm-': { action: 'mem-sub' }
    };

    const SINGLE_LETTER_SHORTCUTS = {
      's': { action: 'insert-func', val: 'sin' },
      'c': { action: 'insert-func', val: 'cos' },
      't': { action: 'insert-func', val: 'tan' },
      'l': { action: 'insert-func', val: 'ln' },
      'r': { action: 'insert-func', val: 'sqrt' },
      'q': { action: 'insert-func', val: 'sqrt' },
      'p': { action: 'insert', val: 'π' },
      'e': { action: 'insert', val: 'e' },
      'a': { action: 'ans' },
      'd': { action: 'sd-toggle' },
      'g': { action: 'toggle-angle' }
    };

    function flushBuffer() {
      if (!keyBuffer) return;
      clearTimeout(keyBufferTimer);
      const buf = keyBuffer;
      keyBuffer = '';
      if (FUNCTION_WORDS[buf]) {
        const item = FUNCTION_WORDS[buf];
        handleCasioAction(item.action, item.val);
        highlightCasioButton(item.action, item.val);
      } else if (SINGLE_LETTER_SHORTCUTS[buf]) {
        const item = SINGLE_LETTER_SHORTCUTS[buf];
        handleCasioAction(item.action, item.val);
        highlightCasioButton(item.action, item.val);
      } else {
        for (const char of buf) {
          handleCasioAction('insert', char);
        }
      }
    }

    function handleCasioKeyDown(e) {
      const targetPanel = document.getElementById('sci-calc-panel');
      if (!targetPanel || !targetPanel.classList.contains('active')) return;

      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (['input', 'textarea', 'select'].includes(activeTag)) return;

      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === 'c') {
          e.preventDefault();
          const val = sciState.result;
          copyToClipboard(val, document.getElementById('copy-sci-btn'), 'Calculator result copied!');
        }
        return;
      }
      if (e.altKey) return;

      let key = e.key;
      if (!key && (e.keyCode || e.which)) {
        const code = e.keyCode || e.which;
        if (code >= 48 && code <= 57) {
          key = String.fromCharCode(code);
        }
      }

      // If shift key is held, normalize number row keys to their shifted symbols
      if (e.shiftKey) {
        if (key === '9') key = '(';
        else if (key === '0') key = ')';
        else if (key === '6') key = '^';
        else if (key === '8') key = '×';
        else if (key === '5') key = '%';
        else if (key === '1') key = '!';
        else if (key === '=') key = '+';
      }

      // Digits 0 - 9 (ensure Shift is NOT held so Shift+9/6/0 are not treated as digits)
      if (/^[0-9]$/.test(key) && !e.shiftKey) {
        flushBuffer();
        handleCasioAction('insert', key);
        highlightCasioButton('insert', key);
        e.preventDefault();
        return;
      }

      // Basic arithmetic & power operators
      if (key === '+') {
        flushBuffer();
        handleCasioAction('insert', '+');
        highlightCasioButton('insert', '+');
        e.preventDefault();
        return;
      }

      if (key === '-') {
        flushBuffer();
        handleCasioAction('insert', '-');
        highlightCasioButton('insert', '-');
        e.preventDefault();
        return;
      }

      if (key === '*' || key === '×') {
        flushBuffer();
        // Support typing '**' for power (converts second '*' to '^')
        if (sciState.expression.endsWith('×')) {
          sciState.expression = sciState.expression.slice(0, -1) + '^';
          highlightCasioButton('insert', '^');
        } else {
          handleCasioAction('insert', '×');
          highlightCasioButton('insert', '×');
        }
        e.preventDefault();
        return;
      }

      if (key === '/' || key === '÷') {
        flushBuffer();
        handleCasioAction('insert', '÷');
        highlightCasioButton('insert', '÷');
        e.preventDefault();
        return;
      }

      if (key === '^') {
        flushBuffer();
        handleCasioAction('insert', '^');
        highlightCasioButton('insert', '^');
        e.preventDefault();
        return;
      }

      if (key === '(') {
        flushBuffer();
        // If a function was just inserted (e.g. typing 'log' already inserted 'log('),
        // typing '(' simply confirms that open paren without duplicating it into 'log(('
        if (sciState.justInsertedFunc) {
          sciState.justInsertedFunc = false;
          highlightCasioButton('insert', '(');
          e.preventDefault();
          return;
        }
        handleCasioAction('insert', '(');
        highlightCasioButton('insert', '(');
        e.preventDefault();
        return;
      }

      if (key === ')') {
        flushBuffer();
        handleCasioAction('insert', ')');
        highlightCasioButton('insert', ')');
        e.preventDefault();
        return;
      }

      if (key === '!' || key === '%') {
        flushBuffer();
        handleCasioAction('insert', key);
        highlightCasioButton('insert', key);
        e.preventDefault();
        return;
      }

      if (key === '.' || key === ',') {
        flushBuffer();
        handleCasioAction('insert', '.');
        highlightCasioButton('insert', '.');
        e.preventDefault();
        return;
      }

      // Enter or equals => calculate
      if (key === 'Enter' || key === '=') {
        flushBuffer();
        handleCasioAction('calculate');
        highlightCasioButton('calculate');
        e.preventDefault();
        return;
      }

      // Backspace => delete
      if (key === 'Backspace') {
        if (keyBuffer.length > 0) {
          clearTimeout(keyBufferTimer);
          keyBuffer = keyBuffer.slice(0, -1);
        } else {
          handleCasioAction('backspace');
          highlightCasioButton('backspace');
        }
        e.preventDefault();
        return;
      }

      // Delete key
      if (key === 'Delete') {
        clearTimeout(keyBufferTimer);
        keyBuffer = '';
        handleCasioAction('backspace');
        highlightCasioButton('backspace');
        e.preventDefault();
        return;
      }

      // Escape => All Clear (AC)
      if (key === 'Escape') {
        clearTimeout(keyBufferTimer);
        keyBuffer = '';
        handleCasioAction('clear');
        highlightCasioButton('clear');
        e.preventDefault();
        return;
      }

      // Space => prevent page scroll
      if (key === ' ') {
        flushBuffer();
        e.preventDefault();
        return;
      }

      // Alphabetical characters for typing words or single-letter shortcuts
      if (/^[a-zA-Z]$/.test(key)) {
        const lower = key.toLowerCase();

        // Special case: standalone 'x' or 'X' when buffer is empty => multiplication
        if (lower === 'x' && keyBuffer === '') {
          handleCasioAction('insert', '×');
          highlightCasioButton('insert', '×');
          e.preventDefault();
          return;
        }

        keyBuffer += lower;
        clearTimeout(keyBufferTimer);

        // Exact match in function words
        if (FUNCTION_WORDS[keyBuffer]) {
          const item = FUNCTION_WORDS[keyBuffer];
          handleCasioAction(item.action, item.val);
          highlightCasioButton(item.action, item.val);
          keyBuffer = '';
          e.preventDefault();
          return;
        }

        // Check prefix match
        const isPrefix = Object.keys(FUNCTION_WORDS).some(w => w.startsWith(keyBuffer));
        if (isPrefix) {
          e.preventDefault();
          keyBufferTimer = setTimeout(() => {
            if (keyBuffer.length > 0) {
              if (SINGLE_LETTER_SHORTCUTS[keyBuffer]) {
                const item = SINGLE_LETTER_SHORTCUTS[keyBuffer];
                handleCasioAction(item.action, item.val);
                highlightCasioButton(item.action, item.val);
              } else {
                for (const char of keyBuffer) {
                  handleCasioAction('insert', char);
                }
              }
              keyBuffer = '';
            }
          }, 350);
          return;
        }

        // Not a prefix of any keyword
        if (keyBuffer.length > 1) {
          const first = keyBuffer[0];
          if (SINGLE_LETTER_SHORTCUTS[first]) {
            const item = SINGLE_LETTER_SHORTCUTS[first];
            handleCasioAction(item.action, item.val);
            highlightCasioButton(item.action, item.val);
          }
          const rem = keyBuffer.slice(1);
          keyBuffer = '';
          if (rem === 'x') {
            handleCasioAction('insert', '×');
            highlightCasioButton('insert', '×');
          } else if (SINGLE_LETTER_SHORTCUTS[rem]) {
            const item = SINGLE_LETTER_SHORTCUTS[rem];
            handleCasioAction(item.action, item.val);
            highlightCasioButton(item.action, item.val);
          }
        } else {
          if (SINGLE_LETTER_SHORTCUTS[lower]) {
            const item = SINGLE_LETTER_SHORTCUTS[lower];
            handleCasioAction(item.action, item.val);
            highlightCasioButton(item.action, item.val);
          } else {
            handleCasioAction('insert', lower);
          }
          keyBuffer = '';
        }
        e.preventDefault();
        return;
      }
    }

    // Attach listeners directly to Casio calculator panel element
    if (sciPanel) {
      sciPanel.setAttribute('tabindex', '0');
      sciPanel.addEventListener('keydown', handleCasioKeyDown);
      sciPanel.addEventListener('click', () => {
        try { sciPanel.focus(); } catch (e) {}
      });
    }

    // Also attach to window to handle key events whenever the Casio panel is active
    window.addEventListener('keydown', (e) => {
      if (e.defaultPrevented) return;
      const panel = document.getElementById('sci-calc-panel');
      if (!panel || !panel.classList.contains('active')) return;
      handleCasioKeyDown(e);
    });

    // Expose Casio interface on window
    window.casioCalc = {
      sciState,
      handleCasioAction,
      evaluateCasioExpression,
      handleCasioKeyDown,
      parseAndCompute
    };

    updateCasioDisplay();
  }

  function handleCasioAction(action, val) {
    switch (action) {
      case 'insert':
        if (sciState.hasEvaluated) {
          // If starting fresh with an arithmetic, power, or combinatoric operator, continue from previous result
          if (/^[+\-×÷^]/.test(val) || val === 'nCr' || val === 'nPr') {
            sciState.expression = 'Ans ' + val + ' ';
          } else {
            sciState.expression = '';
          }
          sciState.hasEvaluated = false;
        }
        sciState.justInsertedFunc = false;

        // Infix combinatoric operators nCr and nPr
        if (val === 'nCr' || val === 'nPr') {
          const trimmed = sciState.expression.trimEnd();
          if (!trimmed || trimmed === '0') {
            sciState.expression = `Ans ${val} `;
          } else if (/[+\-×÷^]$/.test(trimmed)) {
            // Replace trailing arithmetic operator with combinatoric operator
            sciState.expression = trimmed.replace(/[+\-×÷^]+$/, '').trimEnd() + ` ${val} `;
          } else if (trimmed.endsWith('nCr') || trimmed.endsWith('nPr')) {
            // Switch operator if another combinatoric was already there
            sciState.expression = trimmed.replace(/(nCr|nPr)$/, val) + ' ';
          } else {
            sciState.expression = `${trimmed} ${val} `;
          }
        } else {
          sciState.expression += val;
        }
        break;

      case 'fraction':
        sciState.justInsertedFunc = false;
        if (sciState.hasEvaluated) {
          if (sciState.numericResult !== null && !isNaN(sciState.numericResult)) {
            handleCasioAction('sd-toggle');
            return;
          }
          sciState.expression = 'Ans/';
          sciState.hasEvaluated = false;
        } else {
          const expr = sciState.expression;
          if (!expr || /[+\-×÷(]$/.test(expr)) {
            sciState.expression += '1/';
          } else if (/[0-9.]$/.test(expr)) {
            sciState.expression += '/';
          } else if (expr.endsWith('/')) {
            // Already has fraction separator
          } else {
            sciState.expression += '/';
          }
        }
        break;

      case 'sd-toggle':
        sciState.justInsertedFunc = false;
        if (!sciState.hasEvaluated && sciState.expression.trim()) {
          evaluateCasioExpression(false);
        }
        if (sciState.numericResult === null || isNaN(sciState.numericResult) || !isFinite(sciState.numericResult)) {
          return;
        }

        const frac = decimalToFraction(sciState.numericResult);
        if (!frac) {
          showToast('Cannot represent as exact fraction');
          return;
        }

        if (frac.den === 1) {
          // Pure integer
          sciState.result = sciState.numericResult.toString();
          sciState.sdState = 'decimal';
        } else if (sciState.sdState === 'decimal') {
          // Switch to improper fraction: a/b
          sciState.result = `${frac.num}/${frac.den}`;
          sciState.sdState = 'fraction';
        } else if (sciState.sdState === 'fraction') {
          // Switch to mixed fraction if improper: w a/b, else cycle back to decimal
          if (Math.abs(frac.num) > frac.den) {
            const whole = Math.trunc(frac.num / frac.den);
            const rem = Math.abs(frac.num % frac.den);
            sciState.result = `${whole} ${rem}/${frac.den}`;
            sciState.sdState = 'mixed';
          } else {
            sciState.result = formatNumber(sciState.numericResult, 10);
            sciState.sdState = 'decimal';
          }
        } else {
          // Cycle from mixed back to decimal
          sciState.result = formatNumber(sciState.numericResult, 10);
          sciState.sdState = 'decimal';
        }
        break;

      case 'insert-func':
        if (val === 'nCr' || val === 'nPr') {
          handleCasioAction('insert', val);
          return;
        }
        if (sciState.hasEvaluated) {
          sciState.expression = '';
          sciState.hasEvaluated = false;
        }
        // If an expression exists and does not end in an operator, wrap it: e.g. 2^8 -> log(2^8)
        if (sciState.expression && !/[+\-×÷(^\s]$/.test(sciState.expression)) {
          sciState.expression = `${val}(${sciState.expression})`;
          sciState.justInsertedFunc = false;
        } else {
          sciState.expression += `${val}(`;
          sciState.justInsertedFunc = true;
        }
        break;

      case 'clear':
        sciState.justInsertedFunc = false;
        sciState.expression = '';
        sciState.result = '0';
        sciState.numericResult = 0;
        sciState.sdState = 'decimal';
        sciState.hasEvaluated = false;
        break;

      case 'backspace':
        sciState.justInsertedFunc = false;
        if (sciState.hasEvaluated) {
          sciState.expression = '';
          sciState.hasEvaluated = false;
        } else {
          sciState.expression = sciState.expression.slice(0, -1);
        }
        break;

      case 'toggle-angle':
        sciState.justInsertedFunc = false;
        sciState.angleMode = sciState.angleMode === 'DEG' ? 'RAD' : 'DEG';
        break;

      case 'shift-toggle':
        sciState.justInsertedFunc = false;
        sciState.shiftActive = !sciState.shiftActive;
        updateShiftLabels();
        break;

      case 'ans':
        sciState.justInsertedFunc = false;
        sciState.expression += 'Ans';
        break;

      case 'mem-add':
        const currentNum = parseFloat(sciState.result);
        if (!isNaN(currentNum)) {
          sciState.memory += currentNum;
          showToast(`M+: Added ${formatNumber(currentNum)} (Total: ${formatNumber(sciState.memory)})`);
        }
        break;

      case 'mem-sub':
        const numSub = parseFloat(sciState.result);
        if (!isNaN(numSub)) {
          sciState.memory -= numSub;
          showToast(`M-: Subtracted ${formatNumber(numSub)} (Total: ${formatNumber(sciState.memory)})`);
        }
        break;

      case 'mem-recall':
        sciState.expression += sciState.memory.toString();
        break;

      case 'mem-clear':
        sciState.memory = 0;
        showToast('Memory Cleared (M = 0)');
        break;

      case 'calculate':
        evaluateCasioExpression(true);
        break;
    }

    updateCasioDisplay();
  }

  function updateShiftLabels() {
    const shiftBtn = document.getElementById('btn-casio-shift');
    const fracBtn = document.getElementById('btn-casio-frac');
    const sqBtn = document.getElementById('btn-casio-sq');
    const rootBtn = document.getElementById('btn-casio-root');
    const sdBtn = document.getElementById('btn-casio-sd');

    if (shiftBtn) {
      if (sciState.shiftActive) {
        shiftBtn.classList.add('shift-on');
      } else {
        shiftBtn.classList.remove('shift-on');
      }
    }

    if (sciState.shiftActive) {
      if (fracBtn) {
        fracBtn.textContent = 'aᵇ/c';
        fracBtn.setAttribute('title', 'Mixed Fraction (a b/c)');
      }
      if (sqBtn) {
        sqBtn.textContent = 'x³';
        sqBtn.setAttribute('data-val', '^3');
      }
      if (rootBtn) {
        rootBtn.textContent = '∛';
        rootBtn.setAttribute('data-val', 'cbrt');
      }
      if (sdBtn) {
        sdBtn.textContent = 'D⇔S';
      }
    } else {
      if (fracBtn) {
        fracBtn.textContent = '■/□';
        fracBtn.setAttribute('title', 'Fraction (a/b)');
      }
      if (sqBtn) {
        sqBtn.textContent = 'x²';
        sqBtn.setAttribute('data-val', '^2');
      }
      if (rootBtn) {
        rootBtn.textContent = '√';
        rootBtn.setAttribute('data-val', 'sqrt');
      }
      if (sdBtn) {
        sdBtn.textContent = 'S⇔D';
      }
    }
  }

  function decimalToFraction(val, maxDenominator = 100000) {
    if (typeof val !== 'number' || !isFinite(val) || isNaN(val)) return null;
    if (Math.abs(val - Math.round(val)) < 1e-9) {
      return { num: Math.round(val), den: 1, isExact: true };
    }
    const sign = val < 0 ? -1 : 1;
    const x = Math.abs(val);

    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = x;
    let iter = 0;
    while (iter < 30 && isFinite(b)) {
      const a = Math.floor(b);
      let aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      aux = k1;
      k1 = a * k1 + k2;
      k2 = aux;
      if (k1 > maxDenominator) break;
      const diff = Math.abs(x - h1 / k1);
      if (diff < 1e-8 || (x !== 0 && diff / x < 1e-7)) {
        return { num: sign * h1, den: k1, isExact: true };
      }
      const remainder = b - a;
      if (remainder < 1e-11) break;
      b = 1 / remainder;
      iter++;
    }

    if (k1 <= maxDenominator && Math.abs(x - h1 / k1) < 1e-5) {
      return { num: sign * h1, den: k1, isExact: false };
    }
    return null;
  }

  function updateCasioDisplay() {
    const exprEl = document.getElementById('casio-expr-line');
    const resultEl = document.getElementById('casio-result-line');
    const modeBadge = document.getElementById('casio-mode-badge');
    const memBadge = document.getElementById('casio-mem-badge');

    if (exprEl) exprEl.textContent = sciState.expression || '';
    if (resultEl) resultEl.textContent = sciState.result || '0';
    if (modeBadge) modeBadge.textContent = sciState.angleMode;
    if (memBadge) {
      if (sciState.memory !== 0) {
        memBadge.style.opacity = '1';
      } else {
        memBadge.style.opacity = '0';
      }
    }
  }

  function evaluateCasioExpression(recordHistory = false) {
    if (!sciState.expression.trim()) return;

    try {
      const parsed = parseAndCompute(sciState.expression, sciState.angleMode, sciState.ans);
      if (isNaN(parsed) || !isFinite(parsed)) {
        sciState.result = 'Math ERROR';
        sciState.numericResult = null;
      } else {
        sciState.numericResult = parsed;
        sciState.sdState = 'decimal';
        sciState.result = formatNumber(parsed, 10);
        sciState.ans = parsed;
        sciState.hasEvaluated = true;

        if (recordHistory) {
          addHistoryEntry({
            type: 'scientific',
            typeLabel: 'Casio fx-991',
            inputs: sciState.expression,
            output: sciState.result,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          });
        }
      }
    } catch (err) {
      sciState.result = 'Syntax ERROR';
      sciState.numericResult = null;
    }
  }

  // Safe scientific math evaluator
  function parseAndCompute(rawExpr, angleMode, ansVal) {
    let str = rawExpr;

    // Replace visual symbols
    str = str.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/π/g, 'Math.PI');
    str = str.replace(/\bAns\b/g, `(${ansVal})`);
    str = str.replace(/\be\b/g, 'Math.E');
    str = str.replace(/\(-\)/g, '-');
    str = str.replace(/([0-9.]+)\s*%/g, '($1/100)');

    // Normalize unparenthesized functions like "log 2^8" -> "log(2^8)"
    str = str.replace(/\b(sin|cos|tan|asin|acos|atan|sinh|cosh|tanh|sqrt|cbrt|ln|log|abs|exp)\s+([0-9.]+(\^[0-9.]+)?)/g, '$1($2)');

    // Convert infix combinatorics nCr and nPr (e.g., "5 nCr 2", "5nCr2", "5nCr(2", "(3+2) nCr 2")
    // into function notation before implicit multiplication so "5nCr" is never converted to "5*nCr"
    str = convertInfixCombinatorics(str);

    // Auto-close unbalanced open parentheses
    const openCount = (str.match(/\(/g) || []).length;
    const closeCount = (str.match(/\)/g) || []).length;
    if (openCount > closeCount) {
      str += ')'.repeat(openCount - closeCount);
    }

    // Handle exponentiation operator ^ => **
    str = str.replace(/\^/g, '**');

    // Handle unary minus directly before exponentiation to preserve mathematical order of operations:
    // e.g. -2**2 => -(2**2) = -4
    str = str.replace(/(^|[+\-*\/(\s])-([0-9.]+|\([^\)]+\))\s*\*\*\s*([0-9.]+|\([^\)]+\))/g, '$1-($2**$3)');

    // Implicit multiplication before functions, parens, constants:
    // e.g. 2(3) => 2*(3), (2)(3) => (2)*(3), 2sin(30) => 2*sin(30), 2Math.PI => 2*Math.PI
    str = str.replace(/([0-9πe\)])(?=\s*[a-zA-Z\(])/g, '$1*');

    // Angle conversion factor
    const toRad = (val) => angleMode === 'DEG' ? (val * Math.PI) / 180 : val;
    const fromRad = (val) => angleMode === 'DEG' ? (val * 180) / Math.PI : val;

    // Math functions
    const scope = {
      sin: (x) => Math.sin(toRad(x)),
      cos: (x) => Math.cos(toRad(x)),
      tan: (x) => Math.tan(toRad(x)),
      asin: (x) => fromRad(Math.asin(x)),
      acos: (x) => fromRad(Math.acos(x)),
      atan: (x) => fromRad(Math.atan(x)),
      sinh: (x) => Math.sinh(x),
      cosh: (x) => Math.cosh(x),
      tanh: (x) => Math.tanh(x),
      sqrt: (x) => Math.sqrt(x),
      cbrt: (x) => Math.cbrt(x),
      ln: (x) => Math.log(x),
      log: (x) => (Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10),
      abs: (x) => Math.abs(x),
      exp: (x) => Math.exp(x),
      fact: (n) => factorial(n),
      nCr: (n, r) => nCr(n, r),
      nPr: (n, r) => nPr(n, r)
    };

    // Factorial operator n! => fact(n)
    str = str.replace(/([0-9.]+)!/g, 'fact($1)');

    // Function replacements into scope calls
    const funcs = ['asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'sin', 'cos', 'tan', 'sqrt', 'cbrt', 'ln', 'log', 'abs', 'exp'];
    funcs.forEach(fn => {
      const reg = new RegExp(`\\b${fn}\\(`, 'g');
      str = str.replace(reg, `scope.${fn}(`);
    });

    str = str.replace(/\bfact\(/g, 'scope.fact(');
    str = str.replace(/\bnCr\(/g, 'scope.nCr(');
    str = str.replace(/\bnPr\(/g, 'scope.nPr(');

    // Build safe evaluator
    const fnEvaluator = new Function('scope', `return (${str});`);
    return fnEvaluator(scope);
  }

  // Translates infix combinatorics like "5 nCr 2", "5nCr2", "5nCr(2", "(3+2) nCr 2" into "nCr(5, 2)"
  function convertInfixCombinatorics(raw) {
    let str = raw;
    // Normalize single-letter notation like "5 C 2" or "5 P 2"
    str = str.replace(/([0-9.)])\s+C\s+([0-9.(])/g, '$1 nCr $2');
    str = str.replace(/([0-9.)])\s+P\s+([0-9.(])/g, '$1 nPr $2');

    let changed = true;
    let guard = 0;
    while (changed && guard++ < 50) {
      changed = false;
      const regex = /(nCr|nPr)/gi;
      let match;
      while ((match = regex.exec(str)) !== null) {
        const opIndex = match.index;
        const op = match[1];
        const canonicalOp = op.toLowerCase() === 'ncr' ? 'nCr' : 'nPr';

        const leftSub = str.slice(0, opIndex).trimEnd();
        if (!leftSub || /[+\-*\/,(\s]$/.test(leftSub)) {
          // Prefix function notation like nCr(5,2)
          continue;
        }

        // Find left operand
        let leftStart = 0;
        if (leftSub.endsWith(')')) {
          let depth = 0;
          for (let i = leftSub.length - 1; i >= 0; i--) {
            if (leftSub[i] === ')') depth++;
            else if (leftSub[i] === '(') {
              depth--;
              if (depth === 0) {
                leftStart = i;
                const beforeParen = leftSub.slice(0, i);
                const fnMatch = beforeParen.match(/([a-zA-Z0-9_]+)$/);
                if (fnMatch) leftStart = i - fnMatch[1].length;
                break;
              }
            }
          }
        } else {
          const numMatch = leftSub.match(/([0-9.]+(?:![0-9.]*)*|[a-zA-Z0-9_]+)$/);
          if (numMatch) {
            leftStart = leftSub.length - numMatch[0].length;
          } else {
            continue;
          }
        }

        const leftOperand = leftSub.slice(leftStart).trim();
        const beforeLeft = leftSub.slice(0, leftStart);

        // Find right operand
        const rightSub = str.slice(opIndex + op.length).trimStart();
        let rightEnd = 0;

        if (rightSub.startsWith('(')) {
          let depth = 0;
          let closed = false;
          for (let i = 0; i < rightSub.length; i++) {
            if (rightSub[i] === '(') depth++;
            else if (rightSub[i] === ')') {
              depth--;
              if (depth === 0) {
                rightEnd = i + 1;
                closed = true;
                break;
              }
            }
          }
          if (!closed) {
            // Malformed unclosed paren like '(2'
            const m = rightSub.slice(1).match(/^[0-9.]+/);
            rightEnd = m ? 1 + m[0].length : rightSub.length;
          }
        } else {
          const fnCallMatch = rightSub.match(/^([a-zA-Z0-9_]+)\s*\(/);
          if (fnCallMatch) {
            let depth = 0;
            let pStart = rightSub.indexOf('(');
            let closed = false;
            for (let i = pStart; i < rightSub.length; i++) {
              if (rightSub[i] === '(') depth++;
              else if (rightSub[i] === ')') {
                depth--;
                if (depth === 0) {
                  rightEnd = i + 1;
                  closed = true;
                  break;
                }
              }
            }
            if (!closed) rightEnd = rightSub.length;
          } else {
            const numMatch = rightSub.match(/^[0-9.]+/);
            if (numMatch) {
              rightEnd = numMatch[0].length;
            } else {
              const wordMatch = rightSub.match(/^[a-zA-Z0-9_]+/);
              if (wordMatch) rightEnd = wordMatch[0].length;
              else continue;
            }
          }
        }

        let rightOperand = rightSub.slice(0, rightEnd).trim();
        if (rightOperand.startsWith('(') && !rightOperand.endsWith(')')) {
          rightOperand = rightOperand.slice(1);
        }
        const afterRight = rightSub.slice(rightEnd);

        str = beforeLeft + canonicalOp + '(' + leftOperand + ',' + rightOperand + ')' + afterRight;
        changed = true;
        break;
      }
    }
    return str;
  }

  function factorial(n) {
    n = Math.round(n);
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  function nCr(n, r) {
    n = Math.round(n);
    r = Math.round(r);
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    if (r > n / 2) r = n - r;
    let res = 1;
    for (let i = 1; i <= r; i++) {
      res = (res * (n - i + 1)) / i;
    }
    return Math.round(res);
  }

  function nPr(n, r) {
    n = Math.round(n);
    r = Math.round(r);
    if (r < 0 || r > n) return 0;
    if (r === 0) return 1;
    let res = 1;
    for (let i = 0; i < r; i++) {
      res *= (n - i);
    }
    return Math.round(res);
  }

  // =========================================================================
  // 9. IN-MEMORY CALCULATION HISTORY (LAST 5 ENTRIES)
  // =========================================================================

  function addHistoryEntry(entry) {
    // Keep exactly last 5 calculations in-memory
    calculationHistory.unshift(entry);
    if (calculationHistory.length > 5) {
      calculationHistory.pop();
    }
    renderHistory();
  }

  function renderHistory() {
    const listEl = document.getElementById('history-list');
    const emptyEl = document.getElementById('history-empty-msg');
    if (!listEl) return;

    if (calculationHistory.length === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
      listEl.innerHTML = '';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    listEl.innerHTML = '';

    calculationHistory.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.innerHTML = `
        <div class="history-item-top">
          <span class="history-badge history-badge-${item.type}">${item.typeLabel}</span>
          <span class="history-time">${item.time}</span>
        </div>
        <div class="history-details">
          <div class="history-inputs"><strong>Inputs:</strong> ${item.inputs}</div>
          <div class="history-output"><strong>Result:</strong> <span>${item.output}</span></div>
        </div>
        <div class="history-actions">
          <button type="button" class="btn-history-copy" data-idx="${idx}" aria-label="Copy result from calculation ${idx + 1}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
            Copy
          </button>
        </div>
      `;
      listEl.appendChild(li);
    });

    // Copy listener
    document.querySelectorAll('.btn-history-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const item = calculationHistory[idx];
        if (item) {
          copyToClipboard(item.output, btn, 'History result copied!');
        }
      });
    });
  }

  function initHistory() {
    document.getElementById('clear-history-btn')?.addEventListener('click', () => {
      calculationHistory = [];
      renderHistory();
      showToast('Calculation history cleared');
    });
    renderHistory();
  }

  // =========================================================================
  // 10. INITIALIZATION
  // =========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initShapeCalculator();
    initPhysicsCalculator();
    initUnitConverter();
    initScientificCalculator();
    initHistory();
  });

})();
