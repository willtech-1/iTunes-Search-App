import React, { useState, useEffect } from "react";

const Favourites = () => {
  //favourites empty array default state
  const [displayFavourites, setdisplayFavourites] = useState([]);

  // remove item using id
  const removeItem = (id) => {
    // get favourites array of objects stored on the browser localStorage
    const favourites = JSON.parse(localStorage.getItem("Favourites"));
    // delete favourite by filtering using trackId
    const filteredFavourites = favourites.filter((x) => x.trackId !== id);
    // alert user song has been successfully removed!
    if (filteredFavourites) {
      alert("Removed from favourites!");
    }
    // set the favourites that were not removed into the localStorage
    localStorage.setItem("Favourites", JSON.stringify(filteredFavourites));
    // reload the page to display an updated favourites list
    window.location.reload();
  };

  // useEffect
  useEffect(() => {
    // handle local storage in every re-render
    setdisplayFavourites(JSON.parse(localStorage.getItem("Favourites")));
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", color: "white" }}>Favourites</h2>
      <a href="/" className="back-home">
        Home
      </a>
      <div className="data-container">
        <div className="data-wrapper">
          {/* map over favourites */}
          {displayFavourites.map((data) => (
            <div>
              <img
                src={data.artworkUrl100.replace("100x100", "250x250")}
                alt="artwork"
                className="itunes-images"
              />
              <p className="track-text">{data.trackName}</p>
              <p className="track-text">{data.artistName}</p>

              {/* delete favourite */}
              <p className="add-fav" onClick={() => removeItem(data.trackId)}>
                remove
              </p>

              {/* audio btn */}
              <button className="audio-btn">
                <audio
                  className="audio"
                  controls
                  src={data.previewUrl}
                  type="audio/mp4"
                ></audio>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favourites;
