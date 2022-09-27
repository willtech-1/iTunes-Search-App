import React from "react";

// receive props from parent component
const Data = ({ data, addFavourite }) => {
  // display data that is searched on the search input on the search component
  return (
    <div className="data-container">
      <div className="data-wrapper">
        {/* artwork */}
        <img
          src={data.artworkUrl100.replace("100x100", "250x250")}
          alt="artwork"
          className="itunes-images"
        />
        <div>
          {/* track and artist name */}
          <p className="track-text">{data.trackName}</p>
          <p className="track-text">{data.artistName}</p>
          {/* add to favourite */}
          <p className="add-fav" onClick={() => addFavourite(data)}>
            add to fav
          </p>
          {/* song preview */}
          <button className="audio-btn">
            <audio
              className="audio"
              controls
              src={data.previewUrl}
              type="audio/mp4"
            ></audio>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Data;
