import DottedMapInstance from "dotted-map";
import React, { useMemo } from "react";

export interface Marker {
  lat: number;
  lng: number;
  size: number;
}

export interface DottedMapProps<T extends Marker = Marker> {
  markers?: T[];
  renderMarkerOverlay?: (props: {
    marker: T;
    x: number;
    y: number;
    r: number;
    index: number;
  }) => React.ReactNode;
}

export function DottedMap<T extends Marker = Marker>({
  markers,
  renderMarkerOverlay,
}: DottedMapProps<T>) {
  const mapWithMarkers = useMemo(() => {
    const map = new DottedMapInstance({ height: 120, grid: "diagonal", countries: ["BGD"] }) as any;
    if (markers) {
      markers.forEach((marker) => {
        map.addPin({
          lat: marker.lat,
          lng: marker.lng,
          data: marker,
        });
      });
    }
    return map;
  }, [markers]);

  const points = useMemo(() => (mapWithMarkers as any).getPoints(), [mapWithMarkers]);
  
  // Calculate bounds
  const bounds = useMemo(() => {
    if (points.length === 0) return { width: 0, height: 0, minX: 0, minY: 0 };
    const minX = Math.min(...points.map((p: any) => p.x));
    const maxX = Math.max(...points.map((p: any) => p.x));
    const minY = Math.min(...points.map((p: any) => p.y));
    const maxY = Math.max(...points.map((p: any) => p.y));
    
    // Add some padding
    const padding = 2;
    return { 
      minX: minX - padding, 
      minY: minY - padding, 
      width: (maxX - minX) + padding * 2, 
      height: (maxY - minY) + padding * 2 
    };
  }, [points]);

  return (
    <svg
      viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ willChange: "transform" }}
    >
      {/* Background Dots as a single path for performance */}
      <path
        d={points
          .filter((p: any) => !p.data)
          .map((p: any) => `M ${p.x},${p.y} m -0.5,0 a 0.5,0.5 0 1,0 1,0 a 0.5,0.5 0 1,0 -1,0`)
          .join(" ")}
        fill="currentColor"
        fillOpacity="0.7"
      />
      
      {/* Markers as individual elements since they have unique data/overlays */}
      {points
        .filter((p: any) => !!p.data)
        .map((point: any, index: number) => {
          return (
            <React.Fragment key={`marker-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r={1.5}
                fill="currentColor"
                fillOpacity={1}
              />
              {renderMarkerOverlay && (
                renderMarkerOverlay({
                  marker: point.data as T,
                  x: point.x,
                  y: point.y,
                  r: 0.5,
                  index,
                })
              )}
            </React.Fragment>
          );
        })}
    </svg>
  );
}
