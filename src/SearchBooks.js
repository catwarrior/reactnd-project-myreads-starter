import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

export default class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      results: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.searchBooks = this.searchBooks.bind(this)
  }
  static propType = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  handleChange(event) {
    this.searchBooks(event.target.value)
  }

  searchBooks(keyword) {
    this.setState({keyword})

    if(keyword.trim().length > 0) {
      BooksAPI.search(keyword).then(results => {
        this.setState({results})
      })
    } else {
      this.setState({results:[]})
    }

  }

  render() {
    const { books, onChangeShelf } = this.props
    const { keyword, results } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              onChange={event=>this.searchBooks(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
            { 
              results.length > 0 && 
              keyword.length > 0 &&
              results.map((book) => (
                <li key = {book.id} >
                    <div className="book">
                        <div className="book-top">
                            {
                                book.imageLinks !== undefined ?
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url( ' + book.imageLinks.thumbnail + ')' }}></div>
                                : <div className="book-cover" style={{ width: 128, height: 193, background: 'gray' }}></div>
                            }
                            <div className="book-shelf-changer">
                            <select 
                                onChange = {(e) => onChangeShelf(book, e.target.value)} 
                                value = { 
                                    //check if the book exists in the shelf. 
                                    //If so, set the value of the select to the shelf status.
                                    //If not, set the value to none.
                                    books.findIndex(x => x.id === book.id) >= 0 
                                    ? books[books.findIndex(x => x.id === book.id)].shelf 
                                    : 'none'
                                }
                                >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                        { 
                            book.authors !== undefined && 
                            book.authors.map((author, i) => (
                                book.authors.length - 1  !== i ? author + ", " : author 
                            ))
                        }
                        </div>

                    </div>
                </li>
                )) 
            }
            </ol>

            {   
                //Show only if results are not returned
                (
                  results.error === "empty query" &&
                  <div> 
                      <p>No Results </p>
                  </div>
                )
            }
        </div>
      </div>
    )
  }
}