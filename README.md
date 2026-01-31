# ELECTRA: Interactive Electric Grid Viewer (Frontend)

## 🎓 Project Context
This project was developed as the core frontend component of my **Bachelor's Thesis (TFG)** in **Computer Engineering (Software Engineering)** at the **Barcelona School of Informatics (FIB - UPC)**.

**ELECTRA** is an architectural proposal to modernize engineering tools in the energy sector. It bridges the gap between rigid desktop software and modern web technologies, "democratizing access" to complex Power Flow simulations.

## 📋 Project Description
**Electra Frontend** is a high-performance Single Page Application (SPA) designed to visualize and interact with large-scale electric grids. Unlike traditional static diagrams, Electra provides a dynamic, zoomable, and interactive map of the grid, capable of displaying real-time simulation results (Power Flow).

### Key Features
* **High-Performance Visualization:** Uses WebGL-powered rendering to handle complex grid topologies smoothly.
* **Interactive Elements:** Clickable Buses, Lines, Transformers, Generators, and Loads with detailed information panels.
* **Visual Analytics:** Dynamic coloring of buses and branches based on Power Flow results (e.g., voltage levels, line loading).
* **Simulation Control:** Interface to trigger Power Flow calculations and view convergence status.
* **Grid Management:** Toggle active/inactive status of individual grid elements to simulate contingencies.

## 🛠️ Technical Implementation

### Core Stack
* **Framework:** [React 19](https://react.dev/) with functional components and hooks.
* **Build Tool:** [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized builds.
* **Language:** [TypeScript](https://www.typescriptlang.org/) for strict type safety across the domain model (Buses, Lines, Generators, etc.).

### Visualization Engine (Deck.GL)
The core viewer is built on top of **[Deck.GL](https://deck.gl/)**, a WebGL-powered framework for visual exploratory data analysis.
* **View Layer:** Implements an `OrthographicView` to maintain engineering precision (no perspective distortion).
* **Layers:**
    * `LineLayer`: Renders transmission lines and connectors.
    * `IconLayer`: Renders SVG icons for Buses, Generators, Loads, and Transformers with dynamic masking for color overlays.
    * `TextLayer`: Efficiently renders bus names and labels.
* **Optimization:** Uses `zoomMult` heuristics to scale icons and text dynamically based on the zoom level, ensuring readability at all scales.

### Architecture
* **State Management:** Uses React Context (`useGridModel`) to manage global grid state and simulation results.
* **API Integration:** A dedicated service layer (`gridcalApi.ts`) abstracts the communication with the backend (GridCal), handling data fetching, file uploads, and status updates.

## 🚀 Usage

### Prerequisites
* Node.js (v20+)
* npm

### Development
To run the application locally in development mode:

```bash
# Install dependencies
npm install

# Start the dev server (defaults to localhost:5173)
npm run dev
