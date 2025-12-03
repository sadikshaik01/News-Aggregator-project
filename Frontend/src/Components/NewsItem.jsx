import PropTypes from "prop-types";
import image from '../assets/news.jpg'

const NewsItem = ({ title, description, src, url, publishedAt }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };
  return (
    <div 
      className="card bg-dark text-light fade-in" 
      style={{ 
        width: "100%",
        height: "100%",
        minHeight: "450px",
        maxHeight: "500px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        border: "none"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
      }}
    >
      <div style={{ 
        height: "200px", 
        overflow: "hidden",
        position: "relative"
      }}>
        {/* Date Badge */}
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "0.3rem 0.6rem",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: "600",
          zIndex: 2,
          animation: "slideDown 0.5s ease-out",
          backdropFilter: "blur(5px)"
        }}>
          {formatDate(publishedAt)}
        </div>
        <img 
          src={src && src.trim() !== "" ? src : image}
          onError={(e) => { e.target.onerror = null; e.target.src = image; }}
          className="card-img-top" 
          alt="news"
          style={{ 
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)"
        }}></div>
      </div>

      <div className="card-body" style={{ 
        flex: "1",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        justifyContent: "space-between"
      }}>
        <div>
          <h5 className="card-title" style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "0.8rem",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            {title ? title.slice(0, 80) : "No Title Available"}
          </h5>
          <p className="card-text" style={{ 
            fontSize: "0.9rem",
            color: "#c0c0c0",
            lineHeight: "1.5",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            {description ? description.slice(0, 120) : "News is being fetched from API, please wait and come back later."}
          </p>
        </div>
        
        <a 
          href={url} 
          className="btn btn-primary mt-3"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "0.6rem 1.2rem",
            fontSize: "0.95rem",
            fontWeight: "500",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            textDecoration: "none",
            textAlign: "center"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #764ba2 0%, #667eea 100%)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            e.target.style.transform = "scale(1)";
          }}
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
  publishedAt: PropTypes.string
};

export default NewsItem;
