import PropTypes from "prop-types"
import React from 'react'
import { Book } from './Book'

export const BookShelf = ({ name, title, mainBooks, updateShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        mainBooks && mainBooks.map((book) => {
                            return (
                                name === book.shelf &&
                                <li key={book.id}>
                                    <Book
                                        updateShelf={updateShelf}
                                        book={book}
                                        mainBooks={mainBooks}
                                    />
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        </div >
    );
};
BookShelf.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired,
    mainBooks: PropTypes.array.isRequired,
};
// end coding BookShelf