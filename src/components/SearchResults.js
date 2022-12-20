import PropTypes from "prop-types"
import React from 'react'
import { Book } from "./Book"

export const SearchResults = ({ searchBooks, updateShelf, mainBooks }) => {
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {
                    searchBooks && searchBooks.map((book) => {
                        return (
                            <li key={book.id}>
                                <Book
                                    updateShelf={updateShelf}
                                    book={book}
                                    mainBooks={mainBooks}
                                    searchBooks={searchBooks}
                                />
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
};
SearchResults.propTypes = {
    searchBooks: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    mainBooks: PropTypes.array.isRequired

}
