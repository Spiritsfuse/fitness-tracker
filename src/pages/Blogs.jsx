import React, { useEffect, useState } from "react";

const PER_PAGE = 6;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://dev.to/api/articles?tag=fitness&per_page=${PER_PAGE}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  return (
    <div className="main-content">
      <h1 className="dashboard-header">Blogs</h1>
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <h2>{blog.title}</h2>
                <p>{blog.description?.substring(0, 100)}...</p>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-btn"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="modern-btn"
              aria-label="First Page"
            >
              1
            </button>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="modern-btn"
              aria-label="Previous Page"
            >
              &larr;
            </button>
            <span className="page-indicator">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={blogs.length < PER_PAGE}
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

export default Blogs;
