import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import Main from './Main'
import { BrowserRouter, Route } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      shelfs: [ 
        { name: "currentlyReading" ,title: "Currently Reading"},
        { name: "read" ,title: "Read"},
        { name: "wantToRead" ,title: "WantToRead"},
      ]
    }

    this.changeBookShelf = this.changeBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  changeBookShelf(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(result => {
      book.shelf = shelf
      this.setState((state) => ({
        books: state.books.filter(b=>b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    return (
      <div>
      <BrowserRouter>
          <Route exact path="/" render={()=>(
            <Main books={this.state.books} onChangeShelf={this.changeBookShelf}/>
          )} />
        <div className="app">
          <Route path="/search" render={()=>(
            <SearchBooks books={this.state.books} onChangeShelf={this.changeBookShelf}/>
          )} />
        </div>
      </BrowserRouter>
      </div>
      
    )
  }
}

export default BooksApp
