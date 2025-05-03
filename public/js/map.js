console.log("Map script loaded");
console.log("Mapbox Token:", mapToken);

mapboxgl.accessToken = mapToken;

const location = document.querySelector('#location').value;
const country = document.querySelector('#country').value;

console.log("Location:", location);
console.log("Country:", country);

async function getCoordinates() {
    try {
        const searchQuery = `${location}, ${country}`;
        console.log("Search Query:", searchQuery);
        
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        console.log("Geocoding Response:", data);
        
        if (data.features && data.features.length > 0) {
            const coordinates = data.features[0].center;
            console.log("Coordinates found:", coordinates);
            return coordinates;
        }
        throw new Error('Location not found');
    } catch (error) {
        console.error('Error getting coordinates:', error);
        return null;
    }
}

async function initMap() {
    try {
        console.log("Initializing map...");
        const coordinates = await getCoordinates();
        if (!coordinates) {
            console.error("No coordinates available");
            return;
        }

        console.log("Creating map with coordinates:", coordinates);
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: coordinates,
            zoom: 12
        });

        // Add marker
        new mapboxgl.Marker({ color: '#FF0000' })
            .setLngLat(coordinates)
            .addTo(map);

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl());
        console.log("Map initialization complete");

    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

initMap(); 