// ==========================================
// ArcGIS Sample Gallery - Main Application
// ==========================================

// Configuration
const CONFIG = {
  dataPath: './data/apps.json',
  placeholderImage: 'https://via.placeholder.com/400x250?text=No+Image',
  searchDebounceMs: 300
};

// Application State
const state = {
  allApps: [],
  filteredApps: [],
  selectedApp: null,
  searchQuery: ''
};

// DOM Elements
let elements = {};

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
  initializeElements();
  await loadAppsData();
  setupEventListeners();
  renderGallery();
});

function initializeElements() {
  elements = {
    galleryGrid: document.getElementById('gallery-grid'),
    searchInput: document.getElementById('search-input'),
    noResults: document.getElementById('no-results'),
    modal: document.getElementById('details-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalContent: document.getElementById('modal-content'),
    modalOpenBtn: document.getElementById('modal-open-sample'),
    modalCodeBtn: document.getElementById('modal-view-code')
  };
}

// ==========================================
// Data Loading
// ==========================================

async function loadAppsData() {
  try {
    // Simulate loading from JSON file
    // In production, replace this with: ;
    // const mockData = [
    //   {
    //     name: "3D Building Explorer",
    //     media: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    //     mediaType: "image",
    //     samplelink: "https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-simple/",
    //     codeLink: "https://github.com/Esri/arcgis-maps-sdk-javascript-samples",
    //     tags: ["3D", "Buildings", "Scene", "WebGL"],
    //     description: "Explore 3D buildings in a realistic scene view with interactive navigation and detailed building information. Features include real-time shadows, realistic materials, and smooth camera transitions."
    //   },
    //   {
    //     name: "Real-time Weather Visualization",
    //     media: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80",
    //     mediaType: "image",
    //     samplelink: "https://developers.arcgis.com/javascript/latest/sample-code/layers-csv-layer/",
    //     codeLink: "https://github.com/Esri/arcgis-maps-sdk-javascript-samples",
    //     tags: ["Weather", "Real-time", "Animation", "WebSocket"],
    //     description: "Display real-time weather data with animated overlays showing temperature, precipitation, and wind patterns. Updates automatically as new data streams in."
    //   },
    //   {
    //     name: "Population Clustering",
    //     media: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    //     mediaType: "image",
    //     samplelink: "https://developers.arcgis.com/javascript/latest/sample-code/featurelayer-clustering/",
    //     codeLink: "https://github.com/Esri/arcgis-maps-sdk-javascript-samples",
    //     tags: ["Clustering", "Population", "Data Visualization", "Performance"],
    //     description: "Visualize population density using smart clustering algorithms that adapt to zoom levels. Efficiently renders millions of points with dynamic aggregation."
    //   },
    //   {
    //     name: "Route Planning Tool",
    //     media: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&q=80",
    //     mediaType: "image",
    //     samplelink: "https://developers.arcgis.com/javascript/latest/sample-code/routing-directions/",
    //     tags: ["Routing", "Navigation", "Planning", "Directions"],
    //     description: "Interactive route planning with multiple waypoints, traffic consideration, and detailed turn-by-turn directions. Supports multiple transportation modes."
    //   },
    //   {
    //     name: "Terrain Analysis",
    //     media: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    //     mediaType: "image",
    //     samplelink: "https://developers.arcgis.com/javascript/latest/sample-code/scene-terrain-exaggeration/",
    //     codeLink: "https://github.com/Esri/arcgis-maps-sdk-javascript-samples",
    //     tags: ["Terrain", "Analysis", "Elevation", "3D"],
    //     description: "Perform advanced terrain analysis including slope calculation, viewshed analysis, and elevation profiles. Interactive tools for geographic analysis."
    //   },
    //   {
    //     name: "Custom Vector Tiles",
    //     media: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80",
    //     mediaType: "image",
    //     samplelink: "https://developers.arcgis.com/javascript/latest/sample-code/layers-vectortilelayer/",
    //     codeLink: "https://github.com/Esri/arcgis-maps-sdk-javascript-samples",
    //     tags: ["Vector Tiles", "Styling", "Basemap", "Performance"],
    //     description: "Create and style custom vector tile basemaps with full control over colors, labels, and feature rendering. Optimized for performance and scalability."
    //   }
    // ];
    
    // state.allApps = mockData;
    // state.filteredApps = mockData;
    
    // Uncomment for production:
    const response = await fetch(CONFIG.dataPath);
    const data = await response.json();
    state.allApps = validateAndNormalizeData(data);
    state.filteredApps = state.allApps;
    
  } catch (error) {
    console.error('Error loading apps data:', error);
    showError('Failed to load sample apps. Please refresh the page.');
  }
}

function validateAndNormalizeData(apps) {
  return apps.map(app => ({
    name: app.name || 'Untitled Sample',
    media: app.media || CONFIG.placeholderImage,
    mediaType: app.mediaType || 'image',
    samplelink: app.samplelink || '#',
    codeLink: app.codeLink || null,
    tags: Array.isArray(app.tags) ? app.tags : [],
    description: app.description || 'No description available.',
    previewMedia: app.previewMedia || app.media || CONFIG.placeholderImage
  }));
}

// ==========================================
// Event Listeners
// ==========================================

function setupEventListeners() {
  // Search input with debounce
  let searchTimeout;
  elements.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.searchQuery = e.target.value;
      performSearch();
    }, CONFIG.searchDebounceMs);
  });

  // Modal close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.modal.open) {
      closeModal();
    }
  });

  // Modal button clicks
  elements.modalOpenBtn.addEventListener('click', () => {
    if (state.selectedApp) {
      window.open(state.selectedApp.samplelink, '_blank', 'noopener,noreferrer');
    }
  });

  elements.modalCodeBtn.addEventListener('click', () => {
    if (state.selectedApp?.codeLink) {
      window.open(state.selectedApp.codeLink, '_blank', 'noopener,noreferrer');
    }
  });
}

// ==========================================
// Search Functionality
// ==========================================

function performSearch() {
  const query = state.searchQuery.toLowerCase().trim();
  
  if (!query) {
    state.filteredApps = state.allApps;
  } else {
    state.filteredApps = fuzzySearch(state.allApps, query);
  }
  
  renderGallery();
}

function fuzzySearch(items, query) {
  return items
    .map(item => {
      let score = 0;
      const searchText = `${item.name} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
      
      // Exact match gets highest score
      if (searchText.includes(query)) {
        score += 100;
      }
      
      // Word matching
      const words = query.split(' ');
      words.forEach(word => {
        if (searchText.includes(word)) {
          score += 50;
        }
      });
      
      // Character-by-character fuzzy match
      let queryIndex = 0;
      for (let i = 0; i < searchText.length && queryIndex < query.length; i++) {
        if (searchText[i] === query[queryIndex]) {
          score += 1;
          queryIndex++;
        }
      }
      
      return { item, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
}

// ==========================================
// Rendering
// ==========================================

function renderGallery() {
  // Fade out existing cards
  const existingCards = elements.galleryGrid.querySelectorAll('.gallery-card');
  existingCards.forEach(card => card.classList.add('fade-out'));
  
  // Wait for fade animation, then render new content
  setTimeout(() => {
    elements.galleryGrid.innerHTML = '';
    
    if (state.filteredApps.length === 0) {
      elements.noResults.style.display = 'block';
      return;
    }
    
    elements.noResults.style.display = 'none';
    
    state.filteredApps.forEach(app => {
      const card = createCard(app);
      elements.galleryGrid.appendChild(card);
    });
    
    // Setup intersection observer for videos
    // setupLazyLoadingForVideos();
  }, 200);
}

function createCard(app) {
  const card = document.createElement('div');
  card.className = 'gallery-card';
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', app.name);
  card.setAttribute('tabindex', '0');
  
  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'card-media';
  
  const mediaElement = document.createElement('img');
  
  // If it's a video, use the GIF (previewMedia) in the grid
  if (app.mediaType === 'video') {
    mediaElement.src = app.previewMedia;
  } else {
    mediaElement.src = app.previewMedia || app.media;
  }

  mediaElement.alt = app.name;
  mediaElement.loading = 'lazy';
  
  mediaContainer.appendChild(mediaElement);

  const overlay = createOverlay(app);
  mediaContainer.appendChild(overlay);
  
  // const content = document.createElement('div');
  // content.className = 'card-content';
  // content.innerHTML = `
    
  // `;
  // <h3 class="card-title">${escapeHtml(app.name)}</h3>
  // <p class="card-description">${escapeHtml(app.description)}</p>
  //   <div class="card-tags">
  //     ${app.tags.slice(0, 3).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
  //   </div>
  
  card.appendChild(mediaContainer);
  // card.appendChild(content);
  
  setupCardEventListeners(card, app);
  
  return card;
}


function createOverlay(app) {
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  
  const title = document.createElement('h3');
  title.className = 'overlay-title';
  title.textContent = app.name;
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'overlay-buttons';
  
  // Open Sample button
  const openBtn = document.createElement('calcite-button');
  openBtn.setAttribute('width', 'full');
  openBtn.setAttribute('icon-start', 'launch');
  openBtn.textContent = 'Preview';
  openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.open(app.samplelink, '_blank', 'noopener,noreferrer');
  });
  
  buttonsContainer.appendChild(openBtn);
  
  // View Code button (if available)
  if (app.codeLink) {
    const codeBtn = document.createElement('calcite-button');
    codeBtn.setAttribute('width', 'full');
    codeBtn.setAttribute('icon-start', 'code');
    codeBtn.setAttribute('appearance', 'outline');
    codeBtn.textContent = 'View Code';
    codeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(app.codeLink, '_blank', 'noopener,noreferrer');
    });
    buttonsContainer.appendChild(codeBtn);
  }
  
  // View Details button
  const detailsBtn = document.createElement('calcite-button');
  detailsBtn.setAttribute('width', 'full');
  detailsBtn.setAttribute('appearance', 'outline-fill');
  detailsBtn.textContent = 'View Details';
  detailsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(app);
  });
  
  buttonsContainer.appendChild(detailsBtn);
  
  overlay.appendChild(title);
  overlay.appendChild(buttonsContainer);
  
  return overlay;
}

function setupCardEventListeners(card, app) {
  // Click to toggle overlay on mobile
  card.addEventListener('click', (e) => {
    if (window.matchMedia('(hover: none)').matches) {
      card.classList.toggle('active');
    }
  });
  
  // Keyboard support
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(app);
    }
  });
}

// ==========================================
// Modal Functions
// ==========================================

function openModal(app) {
  state.selectedApp = app;
  
  elements.modalTitle.textContent = app.name;
  
  let media = '';
  if(app.mediaType=="video"){
    media = `<video muted loop autoplay playsinline="" data-src="${app.media}" src="${app.media}" class="modal-media"></video>`
  }else{
    media = `<img src="${app.media}" alt="${escapeHtml(app.name)}" class="modal-media">`;
  }
  // Render modal content
  elements.modalContent.innerHTML = `
    ${media}
    
    <div class="modal-section">
      <h3 class="modal-section-title">Description</h3>
      <p class="modal-description">${escapeHtml(app.description)}</p>
    </div>
    
    <div class="modal-section">
      <h3 class="modal-section-title">Tags</h3>
      <div class="modal-tags">
        ${app.tags.map(tag => `<span class="modal-tag">${escapeHtml(tag)}</span>`).join('')}
      </div>
    </div>
  `;
  
  // Show/hide code button
  if (app.codeLink) {
    elements.modalCodeBtn.style.display = 'block';
  } else {
    elements.modalCodeBtn.style.display = 'none';
  }
  
  elements.modal.open = true;
}

function closeModal() {
  elements.modal.open = false;
  state.selectedApp = null;
}

// ==========================================
// Lazy Loading for Videos
// ==========================================

function setupLazyLoadingForVideos() {
  const videos = elements.galleryGrid.querySelectorAll('video[data-src]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log("entry:", entry)
      if (entry.isIntersecting) {
        const video = entry.target;
        video.src = video.dataset.src;
        video.load();
        video.setAttribute("autoplay",'true')
        console.log("play")
        video.play().catch((e) => {
          console.warn("Error playing video: ", e)
        }); // Autoplay may be blocked
        observer.unobserve(video);
      }
    });
  }, {
    rootMargin: '50px'
  });
  
  videos.forEach(video => observer.observe(video));
}

// ==========================================
// Utility Functions
// ==========================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showError(message) {
  const notice = document.createElement('calcite-notice');
  notice.setAttribute('kind', 'danger');
  notice.setAttribute('icon', 'exclamation-mark-triangle');
  notice.setAttribute('open', '');
  notice.innerHTML = `
    <div slot="title">Error</div>
    <div slot="message">${escapeHtml(message)}</div>
  `;
  document.body.appendChild(notice);
  
  setTimeout(() => notice.remove(), 5000);
}