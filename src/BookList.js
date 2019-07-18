import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

export default class BookList extends React.Component {
    static propType = {
        books: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired,
        shelfs: PropTypes.array.isRequired
    }

    render() {
        let shelfs = Array.from(new Set(this.props.books.map(book=>book.shelf)))
        console.log(shelfs)
        return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                  {
                      shelfs.map((shelf, index)=>(
                        <BookShelf key={index} changeBookShelf={this.props.changeBookShelf} shelf={shelf} shelfs={this.props.shelfs} books={this.props.books.filter(book=>book.shelf === shelf)} />
                      ))
                  }
            </div>
            <div className="open-search">
              <Link to="/search" />
            </div>
          </div>
        )
    }
}