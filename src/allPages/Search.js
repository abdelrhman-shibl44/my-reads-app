import PropTypes from "prop-types"
import React, { useEffect, useMemo } from 'react'
import { Link } from "react-router-dom"
import { SearchResults } from '../components/SearchResults'
import { getAll } from "../utils/BooksAPI"
import { search } from "../utils/BooksAPI"
import debounce from 'lodash.debounce';

export const Search = ({ updateShelf, setSearchBooks, searchBooks, mainBooks, setSetState }) => {
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
            const res = await getAll()
            setSetState(res)

        })();
        // to prevent memory leaks
        return () => {
            setSetState([])
        };
    }, []);

    // render search page when user write new value in input search
    useEffect(() => {
        // run immediately invoked function
        (async () => {
            const res = await getAll()
            setSetState(res)

        })();
        // to prevent memory leaks
        return () => {
            setSetState([])
        };
    }, [query]);

    // function takse user'sValue in input search and set it to searchBook State
    React.useEffect(() => {
        (async () => {
            const res = query && query.length && await search(query)
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
    setSearchBooks: PropTypes.func.isRequired,
    searchBooks: PropTypes.array.isRequired,
    setSetState: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired,
}