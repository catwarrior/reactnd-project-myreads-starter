import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookList from './BookList'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: [ 
      { name: "currentlyReading" ,title: "currently Reading"},
      { name: "read" ,title: "Read"},
      { name: "wantToRead" ,title: "WantToRead"},
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  changeBookShelf(theBook, shelf) {
    this.setState((state) => {
      state.books.filter(b=>b.title === theBook.title)[0].shelf = shelf;
      return {books: state.books};
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <SearchBooks />
        )} />
        <Route exact path="/" render={()=>(
          <BookList books={this.state.books} shelfs={this.state.shelfs} changeBookShelf={this.changeBookShelf.bind(this)}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
