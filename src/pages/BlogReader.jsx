import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; 
import { GOOGLE_SCRIPT_URL } from "../config";

function BlogReader() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=get_blogs`);
        const data = await response.json();
        
        // Find the blog with the matching ID from the URL
        // We convert both to string to be safe
        const foundBlog = data.find((b) => String(b.id) === String(id));
        
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          console.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [id]);

  if (loading) {
    return (
      <div className="blog-reader-container">
        <div className="blog-reader-header blog-reader-header--no-border">
          Loading article...
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-reader-container">
        <h1 className="blog-reader-title">404</h1>
        <p>Blog post not found.</p>
        <Link to="/blogs" className="blog-reader-back-link">
          ← Back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-reader-container">
      <Link to="/blogs" className="blog-reader-back-link">
        ← Back to All Articles
      </Link>

      {/* Header */}
      <div className="blog-reader-header">
        <h1 className="blog-reader-title">{blog.title}</h1>
        <p className="blog-reader-meta">
          {blog.author} •{" "}
          {blog.date ? new Date(blog.date).toLocaleDateString() : ""}
        </p>
      </div>

      {/* The Article Content (Markdown Rendered) */}
      <div className="blog-content" style={styles.content}>
        <ReactMarkdown
          children={blog.content}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            // Custom renderer to ensure images fit the screen
            img: ({node, ...props}) => <img style={{maxWidth: "100%", borderRadius: "8px", margin: "20px 0"}} {...props} />
          }}
        />
      </div>
    </div>
  );
}

export default BlogReader;
