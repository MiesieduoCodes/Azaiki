"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";

const MapComponent = () => {
  const { theme } = useTheme(); // Get theme state
  const [map, setMap] = useState(null);

  useEffect(() => {
    const newMap = L.map("map", { zoomControl: false }).setView(
      [4.9336, 6.2836], // Centered on Azaiki Art Gallery
      15
    );
    setMap(newMap);

    // Define Light & Dark Mode Tile Layers
    const lightMode = L.tileLayer(
      `https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=TWbu15ozIVZVepK6OeVl`,
      { attribution: "&copy; MapTiler & OpenStreetMap contributors" }
    );

    const darkMode = L.tileLayer(
      `https://api.maptiler.com/maps/darkmatter/256/{z}/{x}/{y}.png?key=TWbu15ozIVZVepK6OeVl`,
      { attribution: "&copy; MapTiler & OpenStreetMap contributors" }
    );

    // Add the correct theme layer
    const currentLayer = theme === "dark" ? darkMode : lightMode;
    currentLayer.addTo(newMap);

    // Marker at Azaiki Art Gallery
    L.marker([4.9336, 6.2836])
      .addTo(newMap)
      .bindPopup("<b>Azaiki Art Gallery & Museum</b><br>Yenagoa, Nigeria")
      .openPopup();

    return () => {
      newMap.remove(); // Cleanup on unmount
    };
  }, []);

  // Handle theme changes dynamically
  useEffect(() => {
    if (!map) return;

    const lightMode = L.tileLayer(
      `https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=TWbu15ozIVZVepK6OeVl`
    );

    const darkMode = L.tileLayer(
      `https://api.maptiler.com/maps/darkmatter/256/{z}/{x}/{y}.png?key=TWbu15ozIVZVepK6OeVl`
    );

    if (theme === "dark") {
      darkMode.addTo(map);
    } else {
      lightMode.addTo(map);
    }
  }, [theme, map]);

  return (
    <div className="p-4"
      id="map"
      style={{
        height: "450px",
        width: "100%",
        zIndex: 0, // Ensure it's behind navbar
      }}
    />
  );
};

export default MapComponent;
