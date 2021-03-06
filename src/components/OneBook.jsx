import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function OneBook(props) {
  const [bookDetails, setBookDetails] = useState({});
  const [coverIds, setCoverIds] = useState([]);
  useEffect(() => {
    const url = `https://openlibrary.org${props.book}.json`;
    const loadBook = async () => {
      const response = await axios.get(url).catch(function (error) {
        console.log(error);
      });
      if (typeof response !== "undefined") {
        setBookDetails(response.data);
        setCoverIds(response.data.covers);
      }
    };
    loadBook();
  }, [props.book]);
  let descript = "";

  if (typeof bookDetails.description === "undefined") {
    descript = "N/A";
  } else if (typeof bookDetails.description === "string") {
    descript = bookDetails.description;
  } else {
    descript = bookDetails.description.value;
  }
  let descriptShort = descript.split(" ").slice(0, 20).join(" ") + "...";
  const imgUrl = `http://covers.openlibrary.org/b/id/${coverIds[0]}-S.jpg`;
  return (
    <div className="one-book-container">
      <div className="temp-flex">
        <img className="one-book-img"src={imgUrl} alt="N/A" />

        <div className="one-book-text">
          <Link  className="one-book-title" to={props.book}> {bookDetails.title}</Link>
          <span className="one-book-description">{descriptShort}</span>
        </div>
      </div>
      <svg
        onClick={() => props.deleteBookHandler(props.book)}
        xmlns="http://www.w3.org/2000/svg"
        className="book-delete icon icon-tabler icon-tabler-x"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#2d373c"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      
    </div>
  );
}
export default OneBook;
