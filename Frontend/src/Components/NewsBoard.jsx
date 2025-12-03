import { useEffect, useState } from "react"
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";

const NewsBoard = ({category}) => {

const [articles,setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(()=>{
    setLoading(true);
    setError(null);
    const apiKey = import.meta.env.VITE_NEWS_API_KEY || 'acd7637a0d124001b1e33db7424fe053';
    let url =`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch news. Please try again later.');
        }
        return response.json();
      })
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
        } else {
          setError('No articles found.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        setError(error.message || 'Unable to load news. Please check your connection.');
        setLoading(false);
      });

},[category])

  // Skeleton card component
  const SkeletonCard = () => (
    <div style={{
      width: "100%",
      height: "450px",
      borderRadius: "16px",
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      overflow: "hidden"
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );

  return (
    <div style={{ padding: "1.5rem 1rem", minHeight: "100vh" }}>
      <h2 className="text-center mb-3 fade-in" style={{ fontSize: "2rem", fontWeight: "700" }}>
        Latest <span className="badge bg-danger" style={{ fontSize: "1.6rem" }}>News</span>
      </h2>
      
      {loading ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1rem"
        }}>
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          padding: "2rem"
        }}>
          <div style={{
            fontSize: "3rem",
            marginBottom: "1rem"
          }}>⚠️</div>
          <h3 style={{ color: "#dc3545", marginBottom: "0.5rem" }}>Oops!</h3>
          <p style={{ color: "#666", textAlign: "center", maxWidth: "500px" }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: "1rem",
              padding: "0.7rem 1.5rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1rem"
        }}>
          {articles && articles.length > 0 ? (
            articles.map((news, index) => (
              <div 
                key={news.url || news.title}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <NewsItem 
                  title={news.title} 
                  description={news.description} 
                  src={news.urlToImage} 
                  url={news.url}
                  publishedAt={news.publishedAt}
                />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1/-1", fontSize: "1.2rem", color: "#666" }}>
              No news articles available at the moment.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

NewsBoard.propTypes = {
  category: PropTypes.string.isRequired
};

export default NewsBoard
