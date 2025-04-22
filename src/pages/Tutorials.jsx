import React, { useEffect, useState } from "react";

// YouTube Data API key from environment
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const MAX_RESULTS = 6;

// Tutorials page: search and display fitness YouTube videos
const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("fitness workouts"); // Default search
  const [search, setSearch] = useState("");
  const [pageToken, setPageToken] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");
  const [pageHistory, setPageHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch tutorials from YouTube API
  const fetchTutorials = async (q = query, token = "") => {
    setLoading(true);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      q
    )}&type=video&key=${API_KEY}&maxResults=${MAX_RESULTS}${
      token ? `&pageToken=${token}` : ""
    }`;
    const res = await fetch(url);
    const data = await res.json();
    setTutorials(data.items || []);
    setNextPageToken(data.nextPageToken || "");
    setLoading(false);
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchTutorials();
  }, []);

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    setPageHistory([]);
    setCurrentPage(1);
    fetchTutorials(search);
    setQuery(search);
    setPageToken("");
  };

  // Pagination: next page
  const handleNext = () => {
    setPageHistory((h) => [...h, pageToken]);
    setPageToken(nextPageToken);
    setCurrentPage((p) => p + 1);
    fetchTutorials(query, nextPageToken);
  };

  // Pagination: previous page
  const handlePrev = () => {
    const prevHistory = [...pageHistory];
    const prevToken = prevHistory.pop();
    setPageHistory(prevHistory);
    setPageToken(prevToken || "");
    setCurrentPage((p) => Math.max(1, p - 1));
    fetchTutorials(query, prevToken || "");
  };

  // Go to first page
  const goToFirst = () => {
    setPageHistory([]);
    setPageToken("");
    setCurrentPage(1);
    fetchTutorials(query, "");
  };

  return (
    <div className="main-content">
      <h1 className="dashboard-header">Tutorials</h1>
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search YouTube tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg flex-1"
          aria-label="Search Tutorials"
        />
        <button type="submit" className="modern-btn">
          Search
        </button>
      </form>
      {/* Loading spinner */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Tutorials grid */}
          <div className="tutorials-grid">
            {tutorials.map((tutorial) => (
              <div key={tutorial.id.videoId} className="tutorial-card">
                <img
                  src={tutorial.snippet.thumbnails.high.url}
                  alt={tutorial.snippet.title}
                />
                <h2>{tutorial.snippet.title}</h2>
                <a
                  href={`https://www.youtube.com/watch?v=${tutorial.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-btn"
                >
                  Watch Now
                </a>
              </div>
            ))}
          </div>
          {/* Pagination controls */}
          <div className="pagination">
            <button
              onClick={goToFirst}
              disabled={currentPage === 1}
              className="modern-btn"
              aria-label="First Page"
            >
              1
            </button>
            <button
              disabled={currentPage === 1}
              onClick={handlePrev}
              className="modern-btn"
              aria-label="Previous Page"
            >
              &larr;
            </button>
            <span className="page-indicator">Page {currentPage}</span>
            <button
              onClick={handleNext}
              disabled={!nextPageToken}
              className="modern-btn"
              aria-label="Next Page"
            >
              &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Tutorials;
