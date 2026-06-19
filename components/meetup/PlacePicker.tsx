"use client";

/**
 * PlacePicker
 *
 * A searchable place picker that fetches from GET /api/places?city=&search=.
 * Used in MeetupStepOne to let users pick a known venue as the meetup location.
 * Selecting a place fills the parent's location field; manual text entry still works.
 */

import { useEffect, useRef, useState } from "react";
import { searchPlaces } from "@/lib/api/places";
import type { Place } from "@/lib/types";
import { MapPin, Search, X } from "lucide-react";

interface PlacePickerProps {
  /** City to filter places by (should come from the city field in step 1) */
  city?: string;
  /** Called when a place is selected, with the place name as the value */
  onSelect: (placeName: string) => void;
  /** Currently selected place name (controlled) */
  value?: string;
}

export const PlacePicker: React.FC<PlacePickerProps> = ({
  city,
  onSelect,
  value,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim() && !city) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const { data, error } = await searchPlaces({
        city: city || undefined,
        search: query || undefined,
      });

      if (!error && data) {
        setResults(data);
        setOpen(data.length > 0);
      } else {
        setResults([]);
        setOpen(false);
      }
      setLoading(false);
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, city]);

  const handleSelect = (place: Place) => {
    onSelect(place.name);
    setQuery("");
    setOpen(false);
  };

  const handleClear = () => {
    onSelect("");
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Show current selection or search input */}
      {value ? (
        <div className="flex items-center justify-between px-3 py-2 border border-input rounded-md bg-background text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-purple-400 shrink-0" />
            <span className="truncate">{value}</span>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground transition-colors ml-2"
            aria-label="Clear selected place"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder={
              city ? `Search places in ${city}…` : "Search places…"
            }
            className="w-full pl-9 pr-3 py-2 border border-input rounded-md bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Dropdown results */}
      {open && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 max-h-52 overflow-y-auto bg-background border border-border rounded-md shadow-lg">
          {results.map((place) => (
            <li key={place.id}>
              <button
                type="button"
                onClick={() => handleSelect(place)}
                className="w-full flex items-start gap-3 px-3 py-2.5 text-left hover:bg-accent transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 text-purple-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{place.name}</p>
                  {place.address && (
                    <p className="text-xs text-muted-foreground truncate">
                      {place.address}
                    </p>
                  )}
                  {place.place_type && (
                    <span className="inline-block mt-0.5 text-xs px-1.5 py-0.5 bg-purple-900/40 text-purple-300 rounded">
                      {place.place_type}
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
