import "./App.css";
import { useState } from "react";
import { Search } from "./allPages/Search";
import { Routes, Route } from "react-router-dom";
import { Main } from "./allPages/Main";
import * as  BooksAPI from "./utils/BooksAPI";

function App() {
  const [mainBooks, setMainBooks] = useState([]);
  // check if sameBook if it is it will update the shelf in page and API else return mainBooks
  const updateShelf = (book, newShelf) => {
    const updateBook = mainBooks && mainBooks.filter((mainBooks) =>
      mainBooks.id === book.id ? (book.shelf = newShelf) : mainBooks
    );
    setMainBooks(updateBook)
    mainBooks &&
      BooksAPI.update(book, newShelf)
  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <Main
            updateShelf={updateShelf}
            mainBooks={mainBooks}
            setMainBooks={setMainBooks}
            BooksAPI={BooksAPI}
          />}
        />

        <Route path="/search" element={
          <Search
            updateShelf={updateShelf}
            mainBooks={mainBooks}
            setMainBooks={setMainBooks}
            BooksAPI={BooksAPI}
          />}
        />
      </Routes>
    </div>
  );
};

export default App;
