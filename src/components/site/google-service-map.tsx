"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type ServiceAreaMapItem = {
  slug: string;
  city: string;
  mapQuery: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

type GoogleMapsWindow = Window &
  typeof globalThis & {
    google?: {
      maps: {
        Animation: { DROP: unknown };
        InfoWindow: new (options: { content: string }) => {
          close: () => void;
          open: (map: unknown, marker: unknown) => void;
        };
        LatLngBounds: new () => {
          extend: (point: { lat: number; lng: number }) => void;
        };
        Map: new (
          element: HTMLElement,
          options: {
            center: { lat: number; lng: number };
            zoom: number;
            mapTypeControl: boolean;
            streetViewControl: boolean;
            fullscreenControl: boolean;
          }
        ) => {
          fitBounds: (bounds: unknown, padding?: number) => void;
          panTo: (point: { lat: number; lng: number }) => void;
          setZoom: (zoom: number) => void;
        };
        Marker: new (options: {
          map: unknown;
          position: { lat: number; lng: number };
          title: string;
          animation?: unknown;
        }) => {
          addListener: (eventName: string, handler: () => void) => void;
        };
      };
    };
    __googleMapsPromise?: Promise<void>;
  };

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function loadGoogleMaps(apiKey: string) {
  const mapsWindow = window as GoogleMapsWindow;

  if (mapsWindow.google?.maps) {
    return Promise.resolve();
  }

  if (mapsWindow.__googleMapsPromise) {
    return mapsWindow.__googleMapsPromise;
  }

  mapsWindow.__googleMapsPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-google-maps="service-area-map"]');

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Google Maps.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "service-area-map";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps."));
    document.head.appendChild(script);
  });

  return mapsWindow.__googleMapsPromise;
}

export function GoogleServiceMap({ areas }: { areas: readonly ServiceAreaMapItem[] }) {
  const [activeSlug, setActiveSlug] = useState(areas[0]?.slug ?? "");
  const [mapReady, setMapReady] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<unknown>(null);
  const infoWindowRef = useRef<unknown>(null);
  const markersRef = useRef<Record<string, unknown>>({});

  const activeArea = useMemo(
    () => areas.find((area) => area.slug === activeSlug) ?? areas[0],
    [activeSlug, areas]
  );

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !mapNodeRef.current || mapRef.current) {
      return;
    }

    let cancelled = false;

    loadGoogleMaps(GOOGLE_MAPS_API_KEY)
      .then(() => {
        if (cancelled || !mapNodeRef.current) {
          return;
        }

        const mapsWindow = window as GoogleMapsWindow;
        const googleMaps = mapsWindow.google?.maps;

        if (!googleMaps) {
          setMapFailed(true);
          return;
        }

        const map = new googleMaps.Map(mapNodeRef.current, {
          center: activeArea.coordinates,
          zoom: 9,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true
        });

        const bounds = new googleMaps.LatLngBounds();
        const infoWindow = new googleMaps.InfoWindow({ content: "" });
        const markers: Record<string, unknown> = {};

        areas.forEach((area) => {
          bounds.extend(area.coordinates);

          const marker = new googleMaps.Marker({
            map,
            position: area.coordinates,
            title: `${area.city} service area`,
            animation: googleMaps.Animation.DROP
          });

          marker.addListener("click", () => {
            setActiveSlug(area.slug);
          });

          markers[area.slug] = marker;
        });

        map.fitBounds(bounds, 80);
        mapRef.current = map;
        infoWindowRef.current = infoWindow;
        markersRef.current = markers;
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setMapFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeArea.coordinates, areas]);

  useEffect(() => {
    if (!mapReady || !activeArea || !mapRef.current || !infoWindowRef.current) {
      return;
    }

    const map = mapRef.current as {
      panTo: (point: { lat: number; lng: number }) => void;
      setZoom: (zoom: number) => void;
    };
    const infoWindow = infoWindowRef.current as {
      close: () => void;
      open: (map: unknown, marker: unknown) => void;
      setContent?: (content: string) => void;
    };
    const marker = markersRef.current[activeArea.slug];

    map.panTo(activeArea.coordinates);
    map.setZoom(10);

    if (infoWindow.setContent) {
      infoWindow.setContent(
        `<div style="padding:8px 10px;font-family:Arial,sans-serif;"><strong>${activeArea.city}</strong><br />OJ Junk Removal service area</div>`
      );
    }

    infoWindow.close();
    infoWindow.open(mapRef.current, marker);
  }, [activeArea, mapReady]);

  const embedSrc = `https://www.google.com/maps?output=embed&q=${encodeURIComponent(activeArea.mapQuery)}`;

  return (
    <div className="service-map-shell reveal">
      <div className="service-map-panel">
        <div className="service-map-panel-head">
          <span className="tagline">Google coverage view</span>
          <h2>See the route areas on the map.</h2>
          <p>Select a city to focus the map and jump to its local service page.</p>
        </div>

        <div className="service-map-list" aria-label="Service areas">
          {areas.map((area) => {
            const isActive = area.slug === activeArea.slug;

            return (
              <button
                type="button"
                key={area.slug}
                className={`service-map-chip${isActive ? " is-active" : ""}`}
                onClick={() => setActiveSlug(area.slug)}
                aria-pressed={isActive}
              >
                <span>{area.city}</span>
                <small>View on map</small>
              </button>
            );
          })}
        </div>

        <div className="service-map-actions">
          <Link href={`/service-areas/${activeArea.slug}`} className="btn btn-primary">
            Open {activeArea.city} Page
          </Link>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeArea.mapQuery)}`}
            className="btn btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      </div>

      <div className="service-map-frame">
        {GOOGLE_MAPS_API_KEY && !mapFailed ? (
          <div
            ref={mapNodeRef}
            className="service-map-canvas"
            role="img"
            aria-label="Google map showing OJ Junk Removal service areas"
          />
        ) : (
          <iframe
            title={`${activeArea.city} service area map`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="service-map-embed"
          />
        )}
      </div>
    </div>
  );
}
