import * as React from "react";
import type { TCountryCode } from "countries-list";
import { DottedMap } from "./magicui/dotted-map";
import type { Marker } from "./magicui/dotted-map";

type CountryCode = Lowercase<TCountryCode>;

type MyMarker = Marker & {
  overlay: {
    countryCode: CountryCode;
    label: string;
  };
};

const markers: MyMarker[] = [
  {
    lat: 23.8103,
    lng: 90.4125,
    size: 2.8,
    overlay: { countryCode: "bd", label: "Dhaka" },
  },
  {
    lat: 22.3569,
    lng: 91.7832,
    size: 2.8,
    overlay: { countryCode: "bd", label: "Chittagong" },
  },
  {
    lat: 24.8949,
    lng: 91.8687,
    size: 2.8,
    overlay: { countryCode: "bd", label: "Sylhet" },
  },
  {
    lat: 22.8456,
    lng: 89.5403,
    size: 2.8,
    overlay: { countryCode: "bd", label: "Khulna" },
  },
  {
    lat: 24.3745,
    lng: 88.6042,
    size: 2.8,
    overlay: { countryCode: "bd", label: "Rajshahi" },
  },
];

export function BangladeshMap() {
  const id = React.useId();
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="text-primary-light/80 h-full w-full">
        <DottedMap<MyMarker>
          markers={markers}
          renderMarkerOverlay={({ marker, x, y, r, index }) => {
            const { countryCode, label } = marker.overlay;
            const href = `https://flagcdn.com/w80/${countryCode}.webp`;

            const clipId = `${id}-flag-clip-${index}`.replace(/:/g, "-");
            const imgR = r * 1.5;

            const fontSize = r * 1.2;
            const pillH = r * 2;
            const pillW = label.length * (fontSize * 0.65) + r * 2;
            const pillX = x + r + r * 1;
            const pillY = y - pillH / 2;

            return (
              <g key={index} style={{ pointerEvents: "none" }}>
                <defs>
                    <clipPath id={clipId}>
                    <circle cx={x} cy={y} r={imgR} />
                    </clipPath>
                </defs>

                <image
                  href={href}
                  x={x - imgR}
                  y={y - imgR}
                  width={imgR * 2}
                  height={imgR * 2}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${clipId})`}
                />

                <rect
                  x={pillX}
                  y={pillY}
                  width={pillW}
                  height={pillH}
                  rx={pillH / 2}
                  fill="rgba(0,0,0,0.55)"
                />
                <text
                  x={pillX + r * 0.7}
                  y={y + fontSize * 0.35}
                  fontSize={fontSize}
                  fill="white"
                >
                  {label}
                </text>
              </g>
            );
          }}
        />
      </div>
    </div>
  );
}
