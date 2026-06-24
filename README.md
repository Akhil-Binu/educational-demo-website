# Aetheris Institute of Technology (AIT) — Demo Website

A premier, high-fidelity, and fully responsive educational demo website showcasing **Aetheris Institute of Technology (AIT)**, a futuristic research center pioneering Quantum Computing, Cognitive AI, Space Logistics, and Synthetic Biology. 

This project demonstrates advanced client-side engineering using vanilla web technologies, combined with modern visual design patterns like glassmorphism, responsive grids, scroll reveal animations, and glowing border gradients.

---

## 🚀 Key Features

*   **Fluid Responsive Layout**: Seamlessly adjusts across all form-factors—including ultra-wide 4K monitors, laptops, tablets, and mobile devices (down to 320px screen width).
*   **Dual-Theme System**: Premium dark theme by default, with a custom light-theme override that persists user choices in browser `localStorage`.
*   **Scroll-Reveal Interactions**: Navigation headers, text blocks, and grids slide up and fade into view dynamically as you scroll, using a lightweight JavaScript `IntersectionObserver`.
*   **Animated Vector (SVG) Backdrops**: The Hero section features a spinning, pulsing constellation network drawn with SVG vector lines, dashed orbits, and glowing neon nodes.
*   **Glow-Border Gradient Cards**: Academic and research cards illuminate with a vibrant gradient border overlay upon mouse hover, constructed using modern CSS mask-composites.
*   **Real-time Statistics Counter**: Triggers count-up animations (from 0 to target values) dynamically once the stats section scrolls into view.
*   **Program Filter & Search Explorer**: Allows students to search courses by keyword or filter them by fields of study (Computing & AI, Quantum & Space, Bio-Engineering) instantly.
*   **Program Advisor Wizard (Stepper)**: An interactive 3-step advisory quiz that collects user scientific interests, CGPA, and career goals to suggest a custom-tailored academic path.
*   **Modal Campus Tour**: An overlay dialogue box simulating campus camera feeds across the Central Hub, cleanroom labs, and autonomous drone bays.
*   **Validated Feedback Forms**: The contact form evaluates empty inputs and email formatting in real-time, displaying a success overlay card on submit.

---

## 🛠️ Technology Stack

*   **Structure**: Semantic HTML5 markup.
*   **Style**: Vanilla CSS3 (custom properties, flexbox, grid, keyframe animations, mask-composites).
*   **Logic**: ES6+ JavaScript (DOM manipulation, IntersectionObserver, transition hooks).
*   **Icons**: Lucide Icons CDN.
*   **Typography**: Google Fonts (*Outfit* for headings, *Inter* for body copy).

---

## 📂 Project Structure

```text
educational-demo-website/
├── assets/                     # Graphic Assets & Scene Previews
│   ├── scene_hub.png           # Campus Central Hub Quad Image
│   ├── scene_cleanroom.png     # Nanotechnology Cleanroom Image
│   └── scene_dronebay.png      # Autonomous Drone Bay Image
├── index.html                  # Main Page, Metadata & Structured Schemas
├── style.css                   # Layout Rules, Theme Tokens, & Animations
├── app.js                      # Countups, Modals, Steppers & Event Logic
└── README.md                   # Project Documentation
```

---

## 💻 How to Run the Website

Because this is a static frontend website, you do not need to install complex compilers or database dependencies.

### Option 1: Direct File Launch
1. Navigate to the project folder.
2. Double-click the `index.html` file to launch it directly in your web browser (Chrome, Edge, Safari, Firefox).

### Option 2: Run a Local Server (Recommended)
Hosting via a local server ensures consistent loading of local visual assets and avoids cross-origin (CORS) sandbox limitations.

*   **If you have Node.js / npm installed**:
    ```bash
    npx http-server -p 8080
    ```
    *Then open `http://localhost:8080` in your browser.*

*   **If you have Python installed**:
    ```bash
    python -m http.server 8080
    ```
    *Then open `http://localhost:8080` in your browser.*

---

## 🤖 SEO & AI Search Engine Optimization

AIT's landing page is built to be discoverable not only by traditional search crawlers (Google, Bing) but also by AI retrieval engines, chatbots, and agents (Perplexity, ChatGPT Search, Gemini, Claude crawler):

1.  **Open Graph & Twitter Cards**: Populated meta titles, summaries, and social banners for rich visual card embedding when shared across channels.
2.  **Structured JSON-LD Schema**: Implements structured data mapping for a `CollegeOrUniversity` organization. This allows LLMs to pull organized details like campus address, founding dates, social channels, and logos without parsing unstructured text.
3.  **Semantic Navigation**: Single-page `h1` layouts with hierarchical tag levels (`h2`, `h3`, `h4`) allow scrapers to build precise page indexes.
