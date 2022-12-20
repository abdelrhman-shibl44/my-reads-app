import "./App.css";
import { useState } from "react";
import { Search } from "./allPages/Search";
import { Routes, Route } from "react-router-dom";
import { Main } from "./allPages/Main";
import * as  BooksAPI from "./utils/BooksAPI";

function App() {
  const [mainBooks, setMainBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  // function to set new books to mainBooksVariable
  function setSetState(value) {
    setMainBooks(value)
  };
  // get books from API and set it to state (mainBooks)
  function getBooks(APIbooks) {
    setMainBooks(APIbooks)
  };

  // check if sameBook if it is it will update the shelf in page and API else return mainBooks
  const updateShelf = (book, newShelf) => {
    const updateBook = mainBooks && mainBooks.filter((mainBooks) =>
      mainBooks.id === book.id ? (book.shelf = newShelf) : mainBooks
    );
    setMainBooks(updateBook)
    mainBooks &&
      BooksAPI.update(book, newShelf)
  };
  // get data from API

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <Main
            updateShelf={updateShelf}
            getBooks={getBooks}
            mainBooks={mainBooks}
            setSetState={setSetState}
          />}
        />

        <Route path="/search" element={
          <Search
            updateShelf={updateShelf}
            setSearchBooks={setSearchBooks}
            searchBooks={searchBooks}
            mainBooks={mainBooks}
            setSetState={setSetState}
          />}
        />
      </Routes>
    </div>
  );
};

export default App;
