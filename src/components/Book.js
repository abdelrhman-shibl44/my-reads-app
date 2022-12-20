import PropTypes from "prop-types"
import React from 'react'
import { BookSelect } from './BookSelect'

export const Book = ({ updateShelf, book, mainBooks, searchBooks, }) => {
    // make destructuring for every book
    const { title, authors, imageLinks } = book
    // render book in the page 
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 188,
                        backgroundImage: `url(${imageLinks?.thumbnail})`
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <BookSelect
                        searchBooks={searchBooks}
                        updateShelf={updateShelf}
                        book={book}
                        mainBooks={mainBooks}
                    />
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">
                {/* mapping over all authors and (check if they exist) before print */}
                {
                    authors?.map((author) => {
                        return <p key={author}>{author}</p>
                    })
                }
            </div>
        </div>
    );
};
// check props of Book
Book.propTypes = {
    updateShelf: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    mainBooks: PropTypes.array.isRequired,
    searchBooks: PropTypes.array
}
// end book 