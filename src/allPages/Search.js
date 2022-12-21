import PropTypes from "prop-types"
import React, { useState, useEffect, useMemo } from 'react'
import { Link } from "react-router-dom"
import { SearchResults } from '../components/SearchResults'
import debounce from 'lodash.debounce';

export const Search = ({ updateShelf, mainBooks, setMainBooks, BooksAPI }) => {
    const [searchBooks, setSearchBooks] = useState([]);
    const [query, setQuery] = React.useState('');
    // function to take value in search and set it to query
    const handleSearch = (e) => {
        setQuery(e.target.value)
    };
    // function to delay what does apear in page until user write value
    const onAmountChanged = useMemo(() => debounce(handleSearch, 500), []);
    useEffect(() => {
        return () => {
            onAmountChanged.cancel();
        };
    }, [onAmountChanged])

    // render all Books in Api when when user enter search page for the first time.
    useEffect(() => {
        // run immediately invoked function
        (async () => {
            const res = await BooksAPI.getAll()
            setMainBooks(res)

        })();
        // to prevent memory leaks
        return () => {
            setMainBooks([])
        };
    }, []);

    // render search page when user write new value in input search
    useEffect(() => {
        // run immediately invoked function
        (async () => {
            const res = await BooksAPI.getAll()
            setMainBooks(res)

        })();
        // to prevent memory leaks
        return () => {
            setMainBooks([])
        };
    }, [query]);

    // function takse user'sValue in input search and set it to searchBook State
    React.useEffect(() => {
        (async () => {
            const res = query && query.length && await BooksAPI.search(query)
            res && res.length &&
                setSearchBooks(res)
        })();

        return () => {
            setSearchBooks([])
        };
    }, [query]);
    // render searchBooks in the page
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to='/' className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={onAmountChanged}
                    />
                </div>
            </div>
            <SearchResults
                updateShelf={updateShelf}
                query={query}
                searchBooks={searchBooks}
                mainBooks={mainBooks}
            />
        </div>
    );
};

Search.propTypes = {
    mainBooks: PropTypes.array.isRequired,
    setMainBooks: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired,
}