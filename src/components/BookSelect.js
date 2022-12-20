import PropTypes from "prop-types"
import React from 'react'

export const BookSelect = ({ book, updateShelf, mainBooks }) => {
    // get all books id for main page  in an array
    let allExist = mainBooks && mainBooks.map((ele) => ele.id);
    //check if books in mainPage equal to searchPage if it is so update the shelf in searchBooks
    // and default value is None if they're not the same book 
    function ifSameBook() {
        let myShelf = "None"
        if (allExist.includes(book.id)) {
            mainBooks.map((mainBook) => mainBook.id === book.id
                && ((book.shelf = mainBook.shelf) && (myShelf = book.shelf)))
        }
        return myShelf
    };
    // function to handle any change in select and update the change in page and API
    const handleChange = (e) => {
        const newShelf = e.target.value
        updateShelf(book, newShelf)
    };
    // render in the page 
    return (
        <select
            onChange={handleChange}
            defaultValue={ifSameBook()}
        >
            <option value="none" disabled>
                Move to...
            </option>
            <option value="currentlyReading">
                Currently Reading
            </option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="None">None</option>
        </select>
    )
};
// check props of BookSelect
BookSelect.propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired,
    mainBooks: PropTypes.array.isRequired,
}
// end select Books