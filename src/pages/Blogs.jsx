// src/pages/Blogs.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Blogs() {
  // 1. State to hold the fetched blogs
  const [blogs, setBlogs] = useState([]);
  // 2. State to show loading status
  const [loading, setLoading] = useState(true);

  // 3. Fetch data when the page loads
  useEffect(() => {
    const fetchBlogs = async () => {
      // REPLACE THIS WITH YOUR ACTUAL GOOGLE APPS SCRIPT WEB APP URL
      const GOOGLE_SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE"; 
      
      try {
        // We append ?action=get_blogs so the script knows what to send
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=get_blogs`);
        const data = await response.json();
        
        // Update state with the data from Google Sheets
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>All Articles</h1>
      <p style={styles.subHeader}>
        Explore our latest thoughts on Mathematics, Statistics, and logic.
      </p>

      {/* Show Loading Message or the Grid */}
      {loading ? (
        <p style={{ color: "#aaa", fontSize: "1.2rem" }}>Loading articles...</p>
      ) : (
        <div style={styles.grid}>
          {blogs.length === 0 ? (
            <p style={{ color: "#888" }}>No articles found yet.</p>
          ) : (
            blogs.map((blog) => (
              <article key={blog.id} style={styles.card}>
                <div style={styles.thumbnail}>
                  {/* Placeholder image - eventually you can add an image URL column to your sheet */}
                  <div style={styles.placeholderImg}></div>
                </div>
                
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{blog.title}</h2>
                  <p style={styles.meta}>
                    {/* Format the date nicely */}
                    {blog.author} · {blog.date ? new Date(blog.date).toLocaleDateString() : ""}
                  </p>
                  <Link to={`/blogs/${blog.id}`} style={styles.link}>
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

// Styles consistent with your dark theme
const styles = {
  container: {
    padding: "120px 20px 80px", // Adjusted top padding for fixed navbar
    maxWidth: "1200px",
    margin: "0 auto",
    color: "white",
    minHeight: "100vh",
  },
  header: {
    fontSize: "3rem",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  subHeader: {
    color: "#aaa",
    marginBottom: "50px",
    fontSize: "1.2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "transform 0.2s",
  },
  thumbnail: {
    height: "180px",
    backgroundColor: "#222", // Dark grey placeholder
    width: "100%",
  },
  cardContent: {
    padding: "20px",
  },
  cardTitle: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#fff",
    fontWeight: "bold",
  },
  meta: {
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "15px",
  },
  link: {
    color: "#7b4bff", // Updated to match your purple theme
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Blogs;