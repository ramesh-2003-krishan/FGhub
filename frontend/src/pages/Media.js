import React, {useState, useEffect} from "react";
import MediaList from "../components/MediaList";
import RateMedia from "../components/RateMedia";
import axios from "axios";
import "../styles/Media.css"


function Media({ setPage, isAdmin }) {
     const [activeCategory, setActiveCategory] = useState("films");
     const [mediaList, setMediaList] = useState([]);
     const [selectedMedia, setSelectedMedia] = useState(null);
     const [refreshKey, setRefreshKey] = useState(0);
     const [filter, setFilter] = useState("ALL");
     const [searchQuery, setSearchQuery] = useState("");
     const [isSearchOpen, setIsSearchOpen] = useState(false);

     useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axios.get("http://localhost:9090/api/media");
                setMediaList(response.data);

                const targetId = localStorage.getItem("searchTargetId");
                if (targetId) {
                    const targetItem = response.data.find(m => m.id === targetId);
                    if (targetItem) {
                        setSelectedMedia(targetItem);
                        setActiveCategory(targetItem.category.toLowerCase() === "game" ? "games" : "films");
                        setSearchQuery("");
                    }
                    localStorage.removeItem("searchTargetId");
                }
            } catch (err) { }
        };
        fetchMedia();
    }, [refreshKey]);

     const backgroundStyle = selectedMedia && selectedMedia.img 
         ? { background: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${selectedMedia.img}) right center / cover no-repeat` }
         : {};

    return (
        <div className="media-container" style={backgroundStyle}>

     
           <div className="navbar">
             <div className="logo" onClick={() => setPage("Home")} style={{ cursor: "pointer" }}>FGhub</div>

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
                                placeholder="Search media..." 
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
                                                setSelectedMedia(item);
                                                setActiveCategory(item.category && item.category.toLowerCase() === "game" ? "games" : "films");
                                                setSearchQuery("");
                                                setIsSearchOpen(false);
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
                  <span onClick={() => setPage("Home")}>Home</span>
                  <span onClick={() => setPage("store")}>Store</span>
                  <div className="profile-avatar-btn" onClick={() => setPage("Profile")} title="My Profile" style={{ display: "inline-flex" }}>
                      {localStorage.getItem("username") ? localStorage.getItem("username").charAt(0).toUpperCase() : "👤"}
                  </div>
             </div>
           </div>

            

              <div className="catogory-switch">
                 <button 
                     className={activeCategory === "films" ? "active" : ""} 
                     onClick={() => setActiveCategory("films")}
                 >
                   Films
                 </button>
                 <button 
                     className={activeCategory === "games" ? "active" : ""} 
                     onClick={() => setActiveCategory("games")}
                 >
                   Games
                  </button> 
            </div>

            <div className="list">
                <MediaList category={activeCategory} onMediaClick={setSelectedMedia} refreshKey={refreshKey} searchQuery={searchQuery} />
            </div>

            {selectedMedia && (
                <div className="rating-container-floating">
                    <p className="rating-title">Rate {selectedMedia.title}</p>
                    <RateMedia 
                        media={selectedMedia} 
                        currentRating={Math.round(selectedMedia.averageRating || 0)} 
                        onRateSuccess={(updated) => {
                            setSelectedMedia(updated);
                            setRefreshKey(prev => prev + 1);
                        }}
                    />
                </div>
            )}

      </div>
    );
}

export default Media;