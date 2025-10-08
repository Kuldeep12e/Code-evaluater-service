<!-- Save this as pipeline.svg or paste into an HTML file inside <svg>...</svg> -->
<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="380" viewBox="0 0 1100 380">
  <defs>
    <linearGradient id="g1" x1="0" x2="1">
      <stop offset="0" stop-color="#6C7CF2"/>
      <stop offset="1" stop-color="#8FE3C0"/>
    </linearGradient>
    <style>
      .box { fill: url(#g1); stroke:#1F2937; stroke-width:1; rx:14; ry:14; filter: drop-shadow(0 4px 8px rgba(15,23,42,0.15)); }
      .small { font: 12px/1.2 "Segoe UI", Roboto, sans-serif; fill:#0b1220; }
      .title { font: 14px/1.2 "Segoe UI Semibold", Roboto, sans-serif; fill:#071029; font-weight:700; }
      .muted { font: 11px/1.2 "Segoe UI", Roboto, sans-serif; fill:#072033; opacity:0.75; }
      .arrow { fill:none; stroke:#0b1220; stroke-width:2; marker-end: url(#arrowhead); }
    </style>

    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#0b1220" />
    </marker>
  </defs>

  <!-- Client -->
  <g>
    <rect class="box" x="20" y="30" width="170" height="90" />
    <text class="title" x="105" y="58" text-anchor="middle">Client</text>
    <text class="small" x="105" y="80" text-anchor="middle">Submission Request</text>
    <text class="muted" x="105" y="98" text-anchor="middle">(source code + metadata)</text>
  </g>

  <!-- Arrow to Evaluator -->
  <path class="arrow" d="M190 80 L260 80" />

  <!-- Evaluator Service -->
  <g>
    <rect class="box" x="260" y="20" width="200" height="110" />
    <text class="title" x="360" y="54" text-anchor="middle">Evaluator Service</text>
    <text class="small" x="360" y="76" text-anchor="middle">Validate & queue job</text>
    <text class="muted" x="360" y="96" text-anchor="middle">Pick language, test specs</text>
  </g>

  <!-- Arrow to Orchestrator / Builder -->
  <path class="arrow" d="M460 75 L540 75" />

  <!-- Container Builder / Orchestrator -->
  <g>
    <rect class="box" x="540" y="20" width="200" height="110" />
    <text class="title" x="640" y="54" text-anchor="middle">Container Builder</text>
    <text class="small" x="640" y="76" text-anchor="middle">Prepare Docker image</text>
    <text class="muted" x="640" y="96" text-anchor="middle">(select base image, deps)</text>
  </g>

  <!-- Arrow into Docker Container (runtime) -->
  <path class="arrow" d="M740 75 L810 75" />

  <!-- Docker Container (running) -->
  <g>
    <rect class="box" x="810" y="10" width="270" height="160" />
    <text class="title" x="945" y="40" text-anchor="middle">Docker Container</text>
    <text class="small" x="945" y="64" text-anchor="middle">Language: <tspan font-weight="700">Python / Java / Node</tspan></text>

    <!-- Inner pipeline inside container -->
    <g transform="translate(840,80)">
      <rect x="0" y="0" width="100" height="36" rx="8" ry="8" fill="#ffffff" stroke="#0b1220" />
      <text class="small" x="50" y="22" text-anchor="middle">Load Code</text>

      <rect x="120" y="0" width="120" height="36" rx="8" ry="8" fill="#ffffff" stroke="#0b1220" />
      <text class="small" x="180" y="22" text-anchor="middle">Run Tests</text>

      <rect x="260" y="0" width="60" height="36" rx="8" ry="8" fill="#ffffff" stroke="#0b1220" />
      <text class="small" x="290" y="22" text-anchor="middle">Judge</text>

      <path class="arrow" d="M100 18 L120 18" />
      <path class="arrow" d="M240 18 L260 18" />
    </g>

    <text class="muted" x="945" y="132" text-anchor="middle">Isolated runtime, resource limits, logs</text>
  </g>

  <!-- Arrow back to Evaluator with results -->
  <path class="arrow" d="M945 170 L945 220 L360 220 L360 140" />

  <!-- Results box near Evaluator -->
  <g>
    <rect x="260" y="230" width="200" height="90" class="box" />
    <text class="title" x="360" y="258" text-anchor="middle">Results</text>
    <text class="small" x="360" y="280" text-anchor="middle">Pass / Fail, logs, score</text>
    <text class="muted" x="360" y="298" text-anchor="middle">Store & return to client</text>
  </g>

  <!-- Arrow from Results back to Client -->
  <path class="arrow" d="M360 320 L105 320 L105 120" />
  <path class="arrow" d="M105 120 L105 118" />

  <!-- Footer note -->
  <text class="muted" x="20" y="365">Notes: container image selection, timeouts, memory limits, artifact storage (logs, stdout/stderr), secure sandboxing.</text>
</svg>
