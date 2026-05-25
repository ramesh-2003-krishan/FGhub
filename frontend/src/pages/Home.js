import React, {useState, useEffect} from "react";
import MediaList from "../components/MediaList";
import OZzzAgent from "../components/OZzzAgent";
import axios from "axios";
import "../styles/home.css";
import AgentImage from "../assets/OZzzAgent_3D.png"; // your agent image


function Home({ setPage, isAdmin }) {
  const [activeView, setActiveView] = useState("rated");
  const [mediaList, setMediaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAgentChat, setShowAgentChat] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/media");
        setMediaList(response.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, []);

   const getSortedMedia = (category, sortBy) => {
    let filtered = mediaList.filter((m) => {
        if (!m.category || m.category.toLowerCase() !== category.toLowerCase()) return false;
        if (searchQuery && m.title && !m.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });
    if (sortBy === "rated") {
      filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    } else if (sortBy === "new") {
      filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }
    return filtered.slice(0, 3);
  };

  const filmsRated = getSortedMedia("film", "rated");
  const filmsNew = getSortedMedia("film", "new");
  const gamesRated = getSortedMedia("game", "rated");
  const gamesNew = getSortedMedia("game", "new");


  return (
    <div className="home-container">

     
      <div className="navbar">
        <div className="logo" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>FGhub</div>

        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className="search-container">
                {!isSearchOpen ? (
                    <span onClick={() => setIsSearchOpen(true)} style={{ cursor: "pointer", fontSize: "18px", color: "#bbb" }} title="Search">
                        🔍
                    </span>
                ) : (
                    <>
                        <input 
                            type="text" 
                            className="search-bar" 
                            placeholder="Search homepage..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <span onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} style={{ cursor: "pointer", marginLeft: "10px", color: "#aaa", fontSize: "14px" }} title="Close Search">✖</span>
                        {searchQuery && (
                            <div className="search-dropdown">
                                {mediaList
                                    .filter(m => m.title && m.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(item => (
                                        <div key={item.id} className="search-result-item" onClick={() => {
                                            localStorage.setItem("searchTargetId", item.id);
                                            setPage("Media");
                                        }}>
                                            {item.img && <img src={item.img} className="search-result-img" alt="poster" />}
                                            <div className="search-result-info">
                                                <span className="search-result-title">{item.title}</span>
                                                <span className="search-result-cat">{item.category}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            
            {isAdmin && (
                <span onClick={() => setPage("Admin")} style={{ color: "#ff0055", fontWeight: "bold" }}>Admin Dashboard</span>
            )}
            <span onClick={() => setPage("store")}>Store</span>
            <span onClick={() => setPage("Media")}>Media</span>
            <div className="profile-avatar-btn" onClick={() => setPage("Profile")} title="My Profile">
                {localStorage.getItem("username") ? localStorage.getItem("username").charAt(0).toUpperCase() : "👤"}
            </div>
        </div>
      </div>
      

      
      <h1 className="home-title">Home</h1>

      
      <div className="main-banner">
        <div className="slider">
          <img src="/assets/COD_new.png" alt="banner1" />
           <img src="/assets/AVN_new.png" alt="banner2" />
            <img src="/assets/Cyber_new.png" alt="banner3" />
        </div>
      </div>

     
      
      <div className="filter-bar">
        <button 
          className={activeView === "rated" ? "active" : ""} 
          onClick={() => setActiveView("rated")}
        >
          Most Rated
        </button>
        
        <button 
          className={activeView === "new" ? "active" : ""} 
          onClick={() => setActiveView("new")}
        >
          Newly Added
        </button>
      </div>

      
      <div className="home-main-layout">
        <div className="content-section">

         
          {activeView === "rated" && (
            <ol>
              <div className="content-box">
                <h3 className="fg">Film Collections</h3>
                <div className="box">
                  {filmsRated.map((film) => (
                    <div key={film.id} className="item" style={{ cursor: "pointer" }} onClick={() => {
                        localStorage.setItem("searchTargetId", film.id);
                        setPage("Media");
                    }}>
                      <img src={film.img} alt={film.title} />
                      <p>{film.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-box">
                <h3 className="fg">Game Collections</h3>
                <div className="box">
                  {gamesRated.map((game) => (
                    <div key={game.id} className="item" style={{ cursor: "pointer" }} onClick={() => {
                        localStorage.setItem("searchTargetId", game.id);
                        setPage("Media");
                    }}>
                      <img src={game.img} alt={game.title} />
                      <p>{game.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ol>
          )}

         
          {activeView === "new" && (
            <ol>
              <div className="content-box">
                <h3 className="fg">New Films</h3>
                <div className="box">
                  {filmsNew.map((film) => (
                    <div key={film.id} className="item" style={{ cursor: "pointer" }} onClick={() => {
                        localStorage.setItem("searchTargetId", film.id);
                        setPage("Media");
                    }}>
                      <img src={film.img} alt={film.title} />
                      <p>{film.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-box">
                <h3 className="fg">New Games</h3>
                <div className="box">
                  {gamesNew.map((game) => (
                    <div key={game.id} className="item" style={{ cursor: "pointer" }} onClick={() => {
                        localStorage.setItem("searchTargetId", game.id);
                        setPage("Media");
                    }}>
                      <img src={game.img} alt={game.title} />
                      <p>{game.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ol>
          )}

        </div>

        <div className="ozzz-sidebar">
          {!showAgentChat ? (
            <div className="agent-hero" onClick={() => setShowAgentChat(true)}>
              <img src={AgentImage} alt="OZzz Agent" className="agent-hero-img" />
              <p className="agent-hero-text">Hi, I am OZzz. What is your favor?</p>
            </div>
          ) : (
            <OZzzAgent setPage={setPage} agentImg={AgentImage} />
          )}
        </div>
      </div>
     
      <div className="footer">© 2026 FGhub. All rights reserved.</div>

    </div>
  );
}

export default Home;