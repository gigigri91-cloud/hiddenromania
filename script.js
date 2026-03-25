const destinations = [
    {
        id: 1,
        title: "Bigar Waterfall",
        location: "Caraș-Severin",
        category: "waterfalls",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
        rating: 4.9,
        lat: 44.4697,
        lng: 22.2378,
        featured: true
    },
    {
        id: 2,
        title: "Moecii de Sus",
        location: "Hidden Village",
        category: "villages",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop",
        rating: 4.8,
        lat: 45.3521,
        lng: 24.9868,
        featured: true
    },
    {
        id: 3,
        title: "Padis Plateau",
        location: "Cluj",
        category: "mountains",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        rating: 4.8,
        lat: 46.4833,
        lng: 23.2,
        featured: true
    },
    {
        id: 4,
        title: "Hidden Castles",
        location: "Various",
        category: "castles",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=400&fit=crop",
        rating: 4.7,
        lat: 45.5,
        lng: 23.5,
        featured: true
    },
    {
        id: 5,
        title: "Scarisoara Cave",
        location: "Alba",
        category: "caves",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=800&fit=crop",
        rating: 4.9,
        lat: 46.35,
        lng: 23.35,
        featured: true
    }
];

const categories = [
    {
        id: 1,
        title: "Hidden Mountains",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        tag: "Hidden Gem"
    },
    {
        id: 2,
        title: "Secret Waterfalls",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        tag: "Hidden Gem"
    },
    {
        id: 3,
        title: "Hidden Castles",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        tag: "Hidden Gem"
    },
    {
        id: 4,
        title: "Traditional Villages",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop",
        tag: "Hidden Gem"
    },
    {
        id: 5,
        title: "Hiking Trails",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=400&fit=crop",
        tag: "Hidden Gem"
    }
];

let map;

document.addEventListener('DOMContentLoaded', function() {
    renderDestinations();
    renderCategories();
    initializeMap();
    setupEventListeners();
});

function renderDestinations() {
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;

    destinations.forEach((dest) => {
        const card = document.createElement('div');
        card.className = 'destination-card';
        
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.title}" loading="lazy">
            <div class="destination-overlay">
                <div class="destination-title">${dest.title}</div>
                <div class="destination-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${dest.location}</span>
                </div>
                <div class="destination-tag">Hidden Gem</div>
                <button class="destination-button" onclick="showMapPopup('${dest.title}', '${dest.image}', ${dest.rating})">Discover</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;

    categories.forEach((cat) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.title}" loading="lazy">
            <div class="category-overlay">
                <h3>${cat.title}</h3>
                <p>${cat.tag}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function initializeMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;

    map = L.map(mapContainer).setView([45.9432, 24.9668], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
    }).addTo(map);

    destinations.forEach(dest => {
        const marker = L.circleMarker([dest.lat, dest.lng], {
            radius: 8,
            fillColor: '#2E8B57',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        marker.on('click', () => {
            showMapPopup(dest.title, dest.image, dest.rating);
        });
    });
}

function showMapPopup(title, image, rating) {
    const popup = document.getElementById('mapPopup');
    if (!popup) return;

    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupImage').src = image;
    popup.style.display = 'block';
}

function toggleMap() {
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
}

function setupEventListeners() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const results = destinations.filter(d =>
                d.title.toLowerCase().includes(query) ||
                d.location.toLowerCase().includes(query)
            );
            console.log('Results:', results);
        });
    }
}