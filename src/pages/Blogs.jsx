import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GOOGLE_SCRIPT_URL } from "../config"; 

import "../styles/pages/blogs.css"; // ← NEW

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. CHECK LOCAL CACHE FIRST (Instant Load)
    const cachedData = localStorage.getItem("stamatics_blogs");
    if (cachedData) {
      setBlogs(JSON.parse(cachedData));
      setLoading(false); // Show content immediately
    }

    // 2. FETCH FRESH DATA IN BACKGROUND
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=get_blogs`);
        const data = await response.json();
        
        const validData = Array.isArray(data) ? data : [];
        
        // Update state and cache ONLY if data changed (simple check)
        if (JSON.stringify(validData) !== cachedData) {
          setBlogs(validData);
          localStorage.setItem("stamatics_blogs", JSON.stringify(validData));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blogs-page">
      <h1 className="blogs-header">All Articles</h1>
      <p className="blogs-subheader">
        Explore our latest thoughts on Mathematics, Statistics, and logic.
      </p>

      {loading && blogs.length === 0 ? (
        // Only show loading text if we have NO cache and are waiting
        <div style={{textAlign: "center", marginTop: "50px"}}>
          <p style={{ color: "#aaa", fontSize: "1.2rem" }}>Loading articles...</p>
        </div>
      ) : (
        <div className="blogs-grid">
          {blogs.length === 0 ? (
            <p style={{ color: "#888", gridColumn: "1 / -1", textAlign: "center" }}>
              No articles found.
            </p>
          ) : (
            blogs.map((blog) => (
              <article key={blog.id} style={styles.card}>
                <div style={styles.thumbnail}></div> 
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>
                    {blog.title.length > 60 ? blog.title.substring(0, 60) + "..." : blog.title}
                  </h2>
                  <p style={styles.meta}>
                    {blog.author} • {blog.date ? new Date(blog.date).toLocaleDateString() : "Recent"}
                  </p>
                  <Link to={`/blogs/${blog.id}`} className="blogs-link">
                    Read Article →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "120px 20px 80px", maxWidth: "1200px", margin: "0 auto", color: "white", minHeight: "100vh" },
  header: { fontSize: "3rem", marginBottom: "10px", fontWeight: "bold" },
  subHeader: { color: "#aaa", marginBottom: "50px", fontSize: "1.2rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" },
  card: { backgroundColor: "#111", border: "1px solid #333", borderRadius: "12px", overflow: "hidden", transition: "transform 0.2s" },
  thumbnail: { height: "150px", background: "linear-gradient(135deg, #1e293b, #475569)" },
  cardContent: { padding: "20px" },
  cardTitle: { fontSize: "1.2rem", marginBottom: "10px", color: "#fff", fontWeight: "bold", lineHeight: "1.4" },
  meta: { color: "#888", fontSize: "0.9rem", marginBottom: "15px" },
  link: { color: "#7b4bff", textDecoration: "none", fontWeight: "bold" },
};

export default Blogs;
