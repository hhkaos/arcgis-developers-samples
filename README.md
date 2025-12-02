# ArcGIS Maps SDK for JavaScript Sample Apps Gallery

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://yourusername.github.io/arcgis-sample-gallery/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A beautiful, responsive gallery showcasing sample applications built with the ArcGIS Maps SDK for JavaScript. Built with vanilla JavaScript, HTML, CSS, and the Calcite Design System.

![Gallery Preview](./assets/preview.png)

## ✨ Features

- **Responsive Grid Layout**: Automatically adapts from 1-3 columns based on screen size
- **Fuzzy Search**: Real-time search across sample names, descriptions, and tags
- **Interactive Cards**: Hover overlays with quick access buttons
- **Lazy Loading**: Optimized performance with lazy-loaded images and videos
- **Accessible**: Full keyboard navigation and ARIA labels
- **Modal Details**: Detailed view with full descriptions and metadata
- **Mobile-Friendly**: Touch-optimized interactions for mobile devices

## 🚀 Quick Start

### View Live Demo

Visit the [live demo](https://yourusername.github.io/arcgis-sample-gallery/) hosted on GitHub Pages.

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/arcgis-sample-gallery.git
   cd arcgis-sample-gallery
   ```

2. **Serve the files**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx serve
   ```
   
   Or use any static file server.

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
arcgis-sample-gallery/
├── index.html              # Main HTML file
├── app.js                  # Application logic
├── styles.css              # Custom styles
├── data/
│   └── apps.json          # Sample apps data
├── assets/                # Media files (images, GIFs, videos)
│   ├── preview.png
│   ├── building-3d.jpg
│   ├── weather-viz.gif
│   └── ...
├── README.md              # This file
├── CONTRIBUTING.md        # Contribution guidelines
└── LICENSE                # Apache 2.0 license
```

## 📊 JSON Schema

Each sample app in `data/apps.json` follows this schema:

```json
{
  "name": "string, required",
  "media": "string, required - URL or relative path to image/GIF/video",
  "mediaType": "image | gif | video",
  "samplelink": "string, required - URL to the live sample",
  "codeLink": "string, optional - URL to source code",
  "tags": ["array of strings"],
  "description": "string, required - detailed description"
}
```

### Example Entry

```json
{
  "name": "3D Building Explorer",
  "media": "./assets/building-3d.jpg",
  "mediaType": "image",
  "samplelink": "https://developers.arcgis.com/javascript/latest/sample-code/",
  "codeLink": "https://github.com/Esri/arcgis-maps-sdk-javascript-samples",
  "tags": ["3D", "Buildings", "Scene"],
  "description": "Explore 3D buildings with interactive navigation."
}
```

## 🎯 Adding New Samples

1. Add your media file to the `assets/` directory
2. Add a new entry to `data/apps.json` following the schema
3. Test locally
4. Submit a pull request (see [CONTRIBUTING.md](CONTRIBUTING.md))

## 🛠️ Technology Stack

- **Vanilla JavaScript** (ES6+)
- **HTML5** with semantic markup
- **CSS3** with Grid and Flexbox
- **[Calcite Design System](https://developers.arcgis.com/calcite-design-system/)** - Esri's design system
- **IntersectionObserver API** for lazy loading
- **GitHub Pages** for hosting

## 🎨 Customization

### Modify Grid Layout

Edit the CSS Grid configuration in `styles.css`:

```css
.gallery-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

### Change Image Height

Modify the CSS variable in `styles.css`:

```css
:root {
  --max-image-height: 250px; /* Change this value */
}
```

### Update Search Behavior

Adjust search debounce timing in `app.js`:

```javascript
const CONFIG = {
  searchDebounceMs: 300 // Milliseconds
};
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:

- How to add new samples
- Code style guidelines
- Pull request process
- Testing requirements

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Calcite Design System](https://developers.arcgis.com/calcite-design-system/)
- Sample apps from [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/)
- Icons from [Calcite UI Icons](https://developers.arcgis.com/calcite-design-system/icons/)

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/arcgis-sample-gallery/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/arcgis-sample-gallery/discussions)
- **ArcGIS Community**: [Esri Community Forums](https://community.esri.com/)

## 🔗 Related Resources

- [ArcGIS Maps SDK for JavaScript Documentation](https://developers.arcgis.com/javascript/)
- [ArcGIS Developer Portal](https://developers.arcgis.com/)
- [Calcite Design System Documentation](https://developers.arcgis.com/calcite-design-system/)

---

Made with ❤️ by the ArcGIS community