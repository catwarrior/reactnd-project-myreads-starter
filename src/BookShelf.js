import React from 'react'
import PropTypes from 'prop-types'

export default class BookShelf extends React.Component {
    static propType = {
        books: PropTypes.array,
        shelfs: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }

    handleChange(book, e) {
      let newShelf = e.target.value
      this.props.changeBookShelf(book, newShelf)
    }

    render() {
      let shelfTitle = this.props.shelfs.filter(shelf=>shelf.name === this.props.shelf)[0].title

        return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  this.props.books.map((book, index) => (
                    <li key={index}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={this.handleChange.bind(this, book)} >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        )
    }
}