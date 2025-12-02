# Contributing to ArcGIS Sample Gallery

Thank you for your interest in contributing! This document provides guidelines for contributing new sample apps and improvements to the gallery.

## 📋 Table of Contents

- [How to Contribute](#how-to-contribute)
- [Adding a New Sample](#adding-a-new-sample)
- [JSON Validation Rules](#json-validation-rules)
- [Media Guidelines](#media-guidelines)
- [Code Style Guidelines](#code-style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Locally](#testing-locally)

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
  "media": "./assets/your-sample.jpg",
  "mediaType": "image",
  "samplelink": "https://link-to-live-sample.com",
  "codeLink": "https://github.com/your-repo/sample-code",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "description": "A clear, concise description of what the sample demonstrates."
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
- `media` (string): Path or URL to media file
- `mediaType` (string): One of: `"image"`, `"gif"`, `"video"`
- `samplelink` (string): URL to the live sample
- `tags` (array): At least one tag
- `description` (string): Meaningful description (minimum 50 characters)

### Optional Fields

- `codeLink` (string): URL to source code repository

### Field Requirements

| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| name | string | Yes | 100 chars | Clear, descriptive name |
| media | string | Yes | - | Relative or absolute URL |
| mediaType | string | Yes | - | Must be: image, gif, or video |
| samplelink | string | Yes | - | Must be valid URL |
| codeLink | string | No | - | Must be valid URL |
| tags | array | Yes | 5 tags max | Each tag max 20 chars |
| description | string | Yes | 500 chars | Min 50 chars recommended |

### Validation Example

```javascript
// ✅ VALID
{
  "name": "3D Visualization",
  "media": "./assets/3d-viz.jpg",
  "mediaType": "image",
  "samplelink": "https://example.com/sample",
  "codeLink": "https://github.com/example/sample",
  "tags": ["3D", "Visualization"],
  "description": "This sample demonstrates 3D visualization techniques..."
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

- **Images (JPG/PNG)**: Maximum 500 KB (recommended 200-300 KB)
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

- **Dimensions**: 800x600px or similar aspect ratio (4:3 or 16:9)
- **Format**: 
  - Images: JPG or PNG
  - GIFs: GIF
  - Videos: MP4 (H.264 codec, no audio)
- **Content**: Must accurately represent the sample
- **Copyright**: Ensure you have rights to use the media

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
- Include **JSDoc** comments for functions
- Follow **2-space indentation**

```javascript
/**
 * Searches apps using fuzzy matching
 * @param {Array} items - Array of app objects
 * @param {string} query - Search query
 * @returns {Array} Filtered and sorted results
 */
function fuzzySearch(items, query) {
  // Implementation
}
```

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
git clone https://github.com/yourusername/arcgis-sample-gallery.git
cd arcgis-sample-gallery
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

### Pull Request Checklist

```markdown
## Pull Request Checklist

- [ ] JSON entry follows schema exactly
- [ ] Media file is optimized (under size limits)
- [ ] All links are valid and working
- [ ] Sample appears correctly in local testing
- [ ] Search finds the sample by name and tags
- [ ] Modal displays all information
- [ ] No console errors
- [ ] Commit message is descriptive
- [ ] Media file included in assets/
```

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

### Testing Checklist

1. **Visual Testing**
   - [ ] Sample card appears in gallery
   - [ ] Media loads without errors
   - [ ] Hover overlay works correctly
   - [ ] Modal opens and displays all info
   - [ ] Tags are visible and formatted

2. **Functional Testing**
   - [ ] Search finds sample by name
   - [ ] Search finds sample by tags
   - [ ] Search finds sample by description
   - [ ] All links open in new tabs
   - [ ] Modal closes on ESC key
   - [ ] No JavaScript errors in console

3. **Responsive Testing**
   - [ ] Test on mobile viewport (375px)
   - [ ] Test on tablet viewport (768px)
   - [ ] Test on desktop viewport (1280px)
   - [ ] Touch interactions work on mobile

4. **Performance Testing**
   - [ ] Images use lazy loading
   - [ ] Videos only load when visible
   - [ ] No layout shift during load
   - [ ] Search responds quickly

### Browser Testing

Test in these browsers (latest versions):

- Chrome
- Firefox
- Safari
- Edge

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

## 📞 Questions?

- **General questions**: [GitHub Discussions](https://github.com/yourusername/arcgis-sample-gallery/discussions)
- **Bug reports**: [GitHub Issues](https://github.com/yourusername/arcgis-sample-gallery/issues)
- **Direct contact**: Create an issue and tag maintainers

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

Thank you for contributing! 🎉