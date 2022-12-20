import PropTypes from "prop-types"
import { BookShelf } from '../components/BookShelf'
import { Header } from '../components/Header'
import { Link } from "react-router-dom"
import { useEffect } from 'react'
import * as BooksAPI from "../utils/BooksAPI"
export const Main = ({ mainBooks, updateShelf, setSetState }) => {
    useEffect(() => {
        // run immediately invoked function
        (async () => {
            const res = await BooksAPI.getAll()
            setSetState(res)

        })();
        // to prevent memory leaks
        return () => {
            setSetState([])
        };
    }, []);

    return (
        <div className="list-books">
            <Header />
            <div className="list-books-content">
                <div>
                    <BookShelf
                        name="currentlyReading"
                        title="Currently Reading"
                        mainBooks={mainBooks}
                        updateShelf={updateShelf}

                    />
                    <BookShelf
                        name="wantToRead"
                        title="want To Read"
                        mainBooks={mainBooks}
                        updateShelf={updateShelf}
                    />
                    <BookShelf
                        name="read"
                        title="Read"
                        mainBooks={mainBooks}
                        updateShelf={updateShelf}
                    />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">+</Link>
            </div>
        </div>
    );
};
// check the type of props 
Main.propTypes = {
    mainBooks: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired,
    setSetState: PropTypes.func.isRequired
}