import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");
function Nav() {
  const [bookSearch, setbookSearch] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const searchUrl = `http://openlibrary.org/search.json?title=${searchText}&limit=10`;
    const loadSearch = async () => {
      const response = await axios.get(searchUrl).catch(function (error) {
        console.log(error);
      });
      if (typeof response != "undefined") {
        setbookSearch(response.data.docs);
      }

      console.log(bookSearch);
    };
    console.log("searchtext is " + searchText);

    let matches = [];
    if (searchText.length > 0) {
      loadSearch();
      if (searchText.length > 0) {
        matches = bookSearch.filter((book) => {
          const sanitized = book.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, "");
          return book.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, "")
            .match(sanitized);
        });
        setSuggestions(matches);
      }
    }
  }, [searchText]);
  const onChangeHandler = (text) => {
    setsearchText(text);
  };
  const onSuggestHandler = (text) => {
    setsearchText(text);
    setSuggestions([]);
  };
  return (
    <header className="nav-bar lg-container">
      <nav className="nav-container">
        <ul className="nav-flex">
          <div>
            <Link to="/">
              <img
                style={{ maxWidth: 32, maxHeight: 32 }}
                src="data:image/jpeg;base64,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"
                alt="N/A"
              />
            </Link>
          </div>
          <div className="nav-left">
            <Link className="nav-el" to="/">
              <span className="nav-el">home</span>
            </Link>
            <Link className="nav-el" to="/lists">
              {" "}
              <span className="nav-el">lists</span>{" "}
            </Link>
            <Link className="nav-el" to="/about">
              {" "}
              <span className="nav-el">about</span>{" "}
            </Link>
            <span className="nav-el">link 3</span>
          </div>
          <div></div>
          <div></div>

          <div className="nav-right">
            <img
              style={{ maxWidth: 20, maxHeight: 20 }}
              src="https://w7.pngwing.com/pngs/456/948/png-transparent-computer-icons-desktop-web-search-engine-wordpress-com-search-icon-search-logo-website-circle-wordpresscom.png"
              alt=""
            />
            <div>
              <input
                className="suggestion-input"
                type="text"
                onChange={(e) => onChangeHandler(e.target.value)}
                value={searchText}
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 100);
                }}
              />
              <div className="suggestion-container">
                {suggestions &&
                  suggestions.map((suggestion, i) => (
                    <div
                      className="suggestion-box"
                      key={i}
                      onClick={() => onSuggestHandler(suggestion.title)}
                    >
                      {suggestion.title}
                    </div>
                  ))}
              </div>
            </div>
            <span>signup</span>
            <span>login</span>
          </div>
        </ul>
      </nav>
    </header>
  );
}
export default Nav;
