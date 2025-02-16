"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";

// Custom marker icons
const createIcon = (color = "red") => {
  const svgTemplate = (fill) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="${fill}">
      <path d="M16 0a16 16 0 0 0-16 16c0 12 16 28 16 28s16-16 16-28a16 16 0 0 0-16-16zm0 8a8 8 0 1 1 0 16 8 8 0 0 1 0-16z"/>
    </svg>
  `;

  return new L.Icon({
    iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svgTemplate(color))}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });
};

const MapComponent = () => {
  const { theme } = useTheme();
  const [map, setMap] = useState(null);
  const redIcon = createIcon("#ff0000");
  const darkModeIcon = createIcon("#fbbf24");

  useEffect(() => {
    const newMap = L.map("map", {
      zoomControl: false,
      center: [4.9336, 6.2836],
      zoom: 15,
      preferCanvas: true
    });

    // Add zoom control with custom styling
    L.control.zoom({
      position: 'bottomright',
      zoomInTitle: 'Zoom in',
      zoomOutTitle: 'Zoom out'
    }).addTo(newMap);

    setMap(newMap);

    return () => newMap.remove();
  }, []);

  useEffect(() => {
    if (!map) return;

    const tileLayers = {
      light: L.tileLayer(
        `https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=TWbu15ozIVZVepK6OeVl`,
        {
          attribution: '© <a href="https://www.maptiler.com/">MapTiler</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
          crossOrigin: true
        }
      ),
      dark: L.tileLayer(
        `https://api.maptiler.com/maps/darkmatter/256/{z}/{x}/{y}.png?key=TWbu15ozIVZVepK6OeVl`,
        {
          attribution: '© <a href="https://www.maptiler.com/">MapTiler</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
          crossOrigin: true
        }
      )
    };

    // Clear existing layers
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) map.removeLayer(layer);
    });

    // Add appropriate tile layer
    const currentLayer = theme === "dark" ? tileLayers.dark : tileLayers.light;
    currentLayer.addTo(map);

    // Add/update marker
    const marker = L.marker([4.9336, 6.2836], {
      icon: theme === "dark" ? darkModeIcon : redIcon,
      riseOnHover: true
    }).addTo(map);

    // Popup content with theme styling
    const popupContent = L.popup({
      className: `leaflet-popup ${theme === "dark" ? "dark:bg-gray-800 dark:text-white" : ""}`,
      maxWidth: 250,
      minWidth: 100
    }).setContent(`
      <div class="p-2 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}">
        <h3 class="font-bold text-lg">Azaiki Art Gallery & Museum</h3>
        <p class="text-sm mt-1">📍 Yenagoa, Nigeria</p>
        <a href="https://maps.google.com/?q=4.9336,6.2836" 
           target="_blank" 
           rel="noopener noreferrer"
           class="inline-block mt-2 px-3 py-1 ${
             theme === "dark" 
               ? "bg-yellow-600 hover:bg-yellow-700" 
               : "bg-blue-500 hover:bg-blue-600"
           } text-white rounded transition-colors">
          Get Directions
        </a>
      </div>
    `);

    marker.bindPopup(popupContent);

    return () => {
      map.removeLayer(marker);
    };
  }, [theme, map]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
      <div 
        id="map"
        className="h-[450px] w-full z-0"
        style={{
          background: theme === "dark" ? "#1a202c" : "#f7fafc",
          transition: "background 0.3s ease, border-color 0.3s ease"
        }}
      />
    </div>
  );
};

export default MapComponent;