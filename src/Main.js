import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class Main extends React.Component {

    static propType = {
        books: PropTypes.array,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {

        const { onChangeShelf, books } = this.props

        const SHELF = { currentlyReading: "currently Reading", read: "Read", wantToRead: "WantToRead" }

        const shelves = Object.keys(SHELF).map(k=> ({ 
            shelf:k,
            books:books.filter(b=>b.shelf===k)
        }))

        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                {
                    shelves.map(x => (
                        x.books.length > 0 &&
                        <div key={x.shelf} className="bookshelf">
                            <h2 className="bookshelf-title">{SHELF[x.shelf]}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                { x.books.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        onChangeShelf={onChangeShelf}
                                    />
                                ))}
                                </ol>
                            </div>
                        </div>
                    ))
                }
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" />
              </div>
            </div>
          )
    }
}

export default Main
