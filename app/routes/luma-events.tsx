import {
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CloudArrowDownIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";

interface LumaEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  url: string;
  calendar_api_id?: string;
}

interface LoaderData {
  events: LumaEvent[];
}

// Loader function to fetch events from Notion
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Fetch events from our Notion API route
    const url = new URL(request.url);
    const notionApiUrl = `${url.origin}/api/notion-events`;

    const response = await fetch(notionApiUrl);

    if (!response.ok) {
      console.error("Failed to fetch events from Notion API");
      return Response.json({ events: [] });
    }

    const data = (await response.json()) as { events?: LumaEvent[] };
    const events: LumaEvent[] = data.events || [];

    return Response.json({ events });
  } catch (error) {
    console.error("Error loading events:", error);
    return Response.json({ events: [] });
  }
}

export default function LumaEventsPage() {
  const { events: initialEvents } = useLoaderData<LoaderData>();
  const [events, setEvents] = useState<LumaEvent[]>(initialEvents);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Easter egg state
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  // Navigation functions
  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToEvent = (index: number) => {
    setCurrentIndex(index);
  };

  // Easter egg keyboard detection
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    
    if (key === "ArrowUp" || key === "ArrowRight") {
      setKeySequence((prev) => {
        const newSequence = [...prev, key].slice(-5); // Keep only last 5 keys

        // Check if we have 5 consecutive up/right arrow keys
        if (
          newSequence.length === 5 &&
          newSequence.every((k) => k === "ArrowUp" || k === "ArrowRight")
        ) {
          setShowBanner(true);
          return []; // Reset sequence
        }

        return newSequence;
      });
    } else {
      setKeySequence([]); // Reset if any other key is pressed
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Luma API integration
  const fetchFromLuma = async (): Promise<LumaEvent[]> => {
    try {
      const response = await fetch("/api/luma-events");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch from Luma API: ${response.status} ${response.statusText}`,
        );
      }

      const data = (await response.json()) as { events?: LumaEvent[] };

      if (!data.events || !Array.isArray(data.events)) {
        return [];
      }

      return data.events;
    } catch (error) {
      console.error("Error fetching from Luma:", error);
      throw error;
    }
  };

  // Notion database integration
  const saveToNotion = async (events: LumaEvent[]) => {
    try {
      const response = await fetch("/api/notion-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Failed to save to Notion (${response.status}): ${errorData}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error saving to Notion:", error);
      throw error;
    }
  };

  const fetchFromNotion = async (): Promise<LumaEvent[]> => {
    try {
      const response = await fetch("/api/notion-events");

      if (!response.ok) {
        throw new Error("Failed to fetch from Notion");
      }

      const data = (await response.json()) as { events?: LumaEvent[] };
      return data.events || [];
    } catch (error) {
      console.error("Error fetching from Notion:", error);
      throw error;
    }
  };

  // Import from Luma function
  const handleImportFromLuma = async () => {
    setImporting(true);
    setImportSuccess(false);

    try {
      // Fetch events from Luma
      const lumaEvents = await fetchFromLuma();
      // Save to Notion
      await saveToNotion(lumaEvents);

      // Update local state
      setEvents(lumaEvents);
      setCurrentIndex(0);
      setImportSuccess(true);

      // Hide banner after 3 seconds
      setTimeout(() => {
        setShowBanner(false);
        setImportSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Import failed:", error);

      if (error instanceof Error) {
        alert(`Failed to import events from Luma: ${error.message}`);
      } else {
        alert("Failed to import events from Luma. Please try again.");
      }
    } finally {
      setImporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Easter Egg Banner */}
        {showBanner && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-teal-600 shadow-lg transform transition-transform duration-500 ease-in-out">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CloudArrowDownIcon className="w-8 h-8 text-white" />
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {importSuccess
                        ? "✅ Import Successful!"
                        : "Import Events from Luma"}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {importSuccess
                        ? "Events have been imported and saved to Notion database"
                        : "Sync the latest events from Luma and save to Notion database"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!importSuccess && (
                    <button
                      onClick={handleImportFromLuma}
                      disabled={importing}
                      className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {importing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                          Importing...
                        </>
                      ) : (
                        "Import from Luma"
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => setShowBanner(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Luma Events</h1>
          <p className="text-lg text-gray-600">
            No events available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Easter Egg Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-teal-600 shadow-lg transform transition-transform duration-500 ease-in-out">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CloudArrowDownIcon className="w-8 h-8 text-white" />
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {importSuccess
                      ? "✅ Import Successful!"
                      : "Import Events from Luma"}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {importSuccess
                      ? "Events have been imported and saved to Notion database"
                      : "Sync the latest events from Luma and save to Notion database"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!importSuccess && (
                  <button
                    onClick={handleImportFromLuma}
                    disabled={importing}
                    className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {importing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                        Importing...
                      </>
                    ) : (
                      "Import from Luma"
                    )}
                  </button>
                )}
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Luma Events</h1>
          <p className="text-lg text-gray-600">
            Discover our upcoming events and join the MLAI community
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              {/* Event Image */}
              <div className="relative h-80 bg-gradient-to-r from-purple-900 via-gray-900 to-teal-900">
                <img
                  src={events[currentIndex].image}
                  alt={events[currentIndex].name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* Navigation buttons */}
                {events.length > 1 && (
                  <>
                    <button
                      onClick={prevEvent}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextEvent}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Event Details */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {events[currentIndex].name}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {events[currentIndex].description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold">
                        {formatDate(events[currentIndex].startDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-semibold">
                        {formatTime(events[currentIndex].startDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold">
                        {events[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <a
                    href={events[currentIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Register on Luma
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        {events.length > 1 && (
          <div className="flex justify-center gap-2 mb-8">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToEvent(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-teal-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              onClick={() =>
                window.open(event.url, "_blank", "noopener,noreferrer")
              }
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
                index === currentIndex ? "ring-2 ring-teal-600" : ""
              }`}
            >
              <div className="relative h-48 bg-gradient-to-r from-purple-900 via-gray-900 to-teal-900">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1 pr-2">
                    {event.name}
                  </h3>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {formatDate(event.startDate)}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
