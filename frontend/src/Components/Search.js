// react router hook
import React, { useState, useEffect } from "react";
import axios from "axios";
// react router link
import { Link } from "react-router-dom";
// react bootstrap for dropdown media types
import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";
import Data from "./Data.js";

const Search = () => {
  // name and type of media state
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  // searched results empty array
  const [itunesData, setItunesData] = useState([]);
  // favourites
  const [favourites, setFavourites] = useState([]);
  // media type button state
  const [open, setOpen] = useState(false);

  // add to favourite function which adds song or any media type clicked to favourites
  const addFavourite = (favourite) => {
    // add the current favourite to the already existing list of favourites
    if (favourite) {
      setFavourites([...favourites, favourite]);
      alert("Added To Favourites!");
    }
  };

  // after song/media type is added save it the localStorage
  useEffect(() => {
    localStorage.setItem("Favourites", JSON.stringify(favourites));
    // show favourites list on every render
  }, [favourites]);

  // searched input
  let nameEntry = "";
  // function
  const nameSubmit = (e) => {
    // input string
    const entry = e.target.value;
    // make searched string = e.target.value
    nameEntry = entry;
    // save it to setName on the state
    setName(nameEntry);
  };

  // object of diffrent media types categories
  const categories = {
    All: "allTrack",
    MUSIC: "music",
    "MUSIC VIDEOS": "musicVideo",
    APPS: "software",
    EBOOKS: "ebook",
    "AUDIO BOOKS": "audiobook",
    PODCASTS: "podcast",
    MOVIES: "movie",
    "TV SHOWS": "tvSeason",
    "SHORT FILMS": "shortFilm",
  };

  // handleClick to toggle media type button
  const handleClick = () => {
    setOpen(!open);
  };

  // search button function
  const submitSearch = (e) => {
    e.preventDefault();

    // axios get request from itunes search API 
    axios
      .get(`/search?name=${name}&type=${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // successful results from the promise
        const searchedName = res.data.results;
        setItunesData(searchedName ? searchedName : []);
      })
      // catch the error
      .catch((err) => {
        console.log("error => " + err);
      });
  };

  return (
    <div>
      <div className="container">
        {/* search input */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            name="name"
            className="search-input"
            onChange={(e) => nameSubmit(e)}
          />

          {/* search button */}
          <Link to={`/search`}>
            <button
              className="search-btn"
              type="submit"
              onClick={(e) => submitSearch(e)}
            >
              Search
            </button>
          </Link>
        </div>

        {/* favourites link */}
        <a href="/favourites" className="fav-link">
          Favourites
        </a>

        {/* Dropdown */}
        <button onClick={handleClick} className="toggle-categories-button">
          Media Type
        </button>
        {/* show drop down conditionally */}
        {open && (
          <DropdownButton
            as={ButtonGroup}
            variant="info"
            id="drop-down-btn"
            drop="right"
            title="CATEGORIES"
            size="md"
          >
            {/* display listed object media types in dropdown list*/}
            {Object.keys(categories).map((category, i) => (
              <Dropdown.Item
                as="button"
                key={i}
                type="submit"
                name="category"
                id="drop-down-list"
                value={category.value}
                active={type === category.value}
                onClick={() => setType(categories[category])}
              >
                {category}
                
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}
      </div>
      <span className="select-type">Seleted: {type.toUpperCase()}</span>
      <div>
        {/* itunes api return data data */}
        <div>
          {itunesData.map((data, i) => (
            <Data key={i} addFavourite={addFavourite} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
