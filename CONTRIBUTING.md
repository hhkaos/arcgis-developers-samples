# Contributing to the gallery

Thank you for your interest in contributing! This document provides guidelines for contributing new sample apps and improvements to the gallery.

## 📋 Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [🤝 How to Contribute](#-how-to-contribute)
- [➕ Adding a New Sample](#-adding-a-new-sample)
  - [Step 1: Prepare Your Media](#step-1-prepare-your-media)
  - [Step 2: Update apps.json](#step-2-update-appsjson)
  - [Step 3: Test Locally](#step-3-test-locally)
  - [Step 4: Submit Pull Request](#step-4-submit-pull-request)
- [✅ JSON Validation Rules](#-json-validation-rules)
  - [Required Fields](#required-fields)
  - [Optional Fields](#optional-fields)
  - [Field Requirements](#field-requirements)
  - [Validation Example](#validation-example)
- [🎬 Media Guidelines](#-media-guidelines)
  - [File Size Limits](#file-size-limits)
  - [Optimization Tips](#optimization-tips)
  - [Media Requirements](#media-requirements)
  - [Naming Convention](#naming-convention)
- [💻 Code Style Guidelines](#-code-style-guidelines)
  - [JavaScript](#javascript)
  - [CSS](#css)
  - [HTML](#html)
- [🔄 Pull Request Process](#-pull-request-process)
  - [1. Fork and Clone](#1-fork-and-clone)
  - [2. Create a Branch](#2-create-a-branch)
  - [3. Make Changes](#3-make-changes)
  - [4. Commit Changes](#4-commit-changes)
  - [5. Push and Create PR](#5-push-and-create-pr)
- [🧪 Testing Locally](#-testing-locally)
  - [Prerequisites](#prerequisites)
- [🐛 Reporting Bugs](#-reporting-bugs)
- [💡 Suggesting Features](#-suggesting-features)
- [App configurations](#app-configurations)
- [🎨 Customization](#-customization)
  - [Modify Grid Layout](#modify-grid-layout)
  - [Change Image Height](#change-image-height)
  - [Update Search Behavior](#update-search-behavior)
- [📞 Questions?](#-questions)
- [📜 Code of Conduct](#-code-of-conduct)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 🤝 How to Contribute

There are several ways to contribute:

1. **Add new sample apps** to the gallery
2. **Improve existing documentation**
3. **Fix bugs** or improve performance
4. **Suggest new features** via GitHub Issues
5. **Improve accessibility** or design

## ➕ Adding a New Sample

### Step 1: Prepare Your Media

1. Create or obtain a representative image, GIF, or video of your sample
2. Optimize the file size (see [Media Guidelines](#media-guidelines))
3. Save it in the `assets/` directory with a descriptive name

### Step 2: Update apps.json

Add a new entry to `data/apps.json`:

```json
{
  "name": "Your Sample Name",
  "description": "A clear, concise description of what the sample demonstrates.",
  "mediaType": "video",
  "media": "./assets/your-sample.mp4",
  "previewMedia": "./assets/your-sample.webp",
  "samplelink": "https://link-to-live-sample.com",
  "codeLink": "https://github.com/your-repo/sample-code",
  "tags": ["Tag1", "Tag2", "Tag3"]
}
```

### Step 3: Test Locally

Run a local server and verify:
- ✅ Sample appears in the gallery
- ✅ Media loads correctly
- ✅ Links work properly
- ✅ Search finds your sample
- ✅ Modal displays all information

### Step 4: Submit Pull Request

Follow the [Pull Request Process](#pull-request-process) below.

## ✅ JSON Validation Rules

### Required Fields

All samples **must** include:

- `name` (string): Display name of the sample
- `description` (string): Meaningful description (minimum 50 characters)
- `mediaType` (string): One of: `"image"`, `"gif"`, `"video"`
- `media` (string): Path or URL to media file
- `samplelink` (string): URL to the live sample
- `tags` (array): At least one tag


### Optional Fields

- `codeLink` (string): URL to source code repository
- `previewMedia` (string): Path or URL to media file (required if mediaType=video)

### Field Requirements

| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| name | string | Yes | 100 chars | Clear, descriptive name |
| description | string | Yes | 500 chars | Min 50 chars recommended |
| mediaType | string | Yes | - | Must be: image, gif, or video |
| media | string | Yes | - | Relative or absolute URL |
| previewMedia | string | Yes | - | Relative or absolute URL |
| samplelink | string | Yes | - | Must be valid URL |
| codeLink | string | No | - | Must be valid URL |
| tags | array | Yes | 5 tags max | Each tag max 20 chars |

### Validation Example

```javascript
// ✅ VALID
{
  "name": "3D Visualization",
  "description": "This sample demonstrates 3D visualization techniques...",
  "mediaType": "image",
  "media": "./assets/3d-viz.jpg",
  "samplelink": "https://example.com/sample",
  "codeLink": "https://github.com/example/sample",
  "tags": ["3D", "Visualization"]
  
}

// ❌ INVALID - Missing required fields
{
  "name": "My Sample",
  "media": "./assets/sample.jpg"
}

// ❌ INVALID - Invalid mediaType
{
  "name": "My Sample",
  "media": "./assets/sample.jpg",
  "mediaType": "png",  // Must be: image, gif, or video
  "samplelink": "https://example.com",
  "tags": ["demo"],
  "description": "A sample"
}
```

## 🎬 Media Guidelines

### File Size Limits

- **Images (JPG/PNG/WEBP)**: Maximum 500 KB (recommended 200-300 KB)
- **GIFs**: Maximum 2 MB (recommended 500 KB - 1 MB)
- **Videos (MP4)**: Maximum 5 MB (recommended 1-3 MB)

### Optimization Tips

**Images:**
```bash
# Using ImageMagick
convert input.jpg -quality 85 -resize 800x600 output.jpg

# Using online tools
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
```

**GIFs:**
```bash
# Using gifsicle
gifsicle -O3 --lossy=80 input.gif -o output.gif

# Using online tools
# - ezgif: https://ezgif.com/optimize
```

**Videos:**
```bash
# Using FFmpeg
ffmpeg -i input.mp4 -vcodec h264 -acodec none -vf scale=800:-1 output.mp4
```

### Media Requirements

- **Dimensions**: 
  - Aspect ratio (16:9) (recommended width: 700x394)
  - For `previewMedia` (recommended: 350x197)
- **Format**: 
  - Images: [WebP](https://en.wikipedia.org/wiki/WebP) (recommended), JPG or PNG
  - GIFs: GIF / Animated WebP
  - Videos: MP4 (H.264 codec, no audio)
- **Content**: Must accurately represent the sample
- **Copyright**: Ensure you have rights to use the media

> **Note**: Check the [utils folder](./utils) to find a script to convert static images or animated GIFs to Webp.

### Naming Convention

Use descriptive, lowercase filenames with hyphens:

✅ **Good:**
- `3d-building-explorer.jpg`
- `weather-visualization.gif`
- `route-planning-demo.mp4`

❌ **Bad:**
- `image1.jpg`
- `My Sample.png`
- `DEMO_VIDEO.mp4`

## 💻 Code Style Guidelines

### JavaScript

- Use **ES6+** syntax
- Use **const** and **let**, not **var**
- Use **async/await** for asynchronous code

### CSS

- Use **BEM** naming convention for custom classes
- Group related properties together
- Include comments for complex sections
- Use **CSS variables** for theme values

```css
/* ==========================================
   Gallery Grid
   ========================================== */

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--grid-gap);
}
```

### HTML

- Use **semantic HTML5** elements
- Include **ARIA labels** for accessibility
- Use **meaningful attribute names**
- Keep markup clean and readable

## 🔄 Pull Request Process

### 1. Fork and Clone

```bash
git clone https://github.com/hhkaos/arcgis-developers-samples.git
cd arcgis-developers-samples
```

### 2. Create a Branch

```bash
git checkout -b add-sample-your-sample-name
```

### 3. Make Changes

- Add your media to `assets/`
- Update `data/apps.json`
- Test locally

### 4. Commit Changes

```bash
git add .
git commit -m "Add new sample: Your Sample Name"
```

Use clear, descriptive commit messages:

- ✅ `Add new sample: 3D Building Explorer`
- ✅ `Fix: Correct media path for weather visualization`
- ✅ `Update: Improve search performance`
- ❌ `update`
- ❌ `fix bug`

### 5. Push and Create PR

```bash
git push origin add-sample-your-sample-name
```

Then create a Pull Request on GitHub with:

- **Clear title**: "Add new sample: [Sample Name]"
- **Description**: What the sample demonstrates
- **Screenshot**: Include a preview image
- **Checklist**: Use the template below

## 🧪 Testing Locally

### Prerequisites

Install a local web server. Choose one:

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx serve -p 8000
```

**PHP:**
```bash
php -S localhost:8000
```


## 🐛 Reporting Bugs

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Numbered steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Browser/OS**: Your environment
7. **Console errors**: Any JavaScript errors

## 💡 Suggesting Features

For feature requests, provide:

1. **Use case**: Why is this needed?
2. **Proposed solution**: How should it work?
3. **Alternatives**: Other approaches considered
4. **Additional context**: Mockups, examples, etc.

## App configurations

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

## 📞 Questions?

- **General questions**: [GitHub Discussions](https://github.com/hhkaos/arcgis-developers-samples/discussions)
- **Bug reports**: [GitHub Issues](https://github.com/hhkaos/arcgis-developers-samples/issues)
- **Direct contact**: Create an issue and tag maintainers

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

Thank you for contributing! 🎉