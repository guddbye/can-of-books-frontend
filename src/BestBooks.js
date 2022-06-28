import React from 'react';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  // Net effect is when the site loads,
  // Data will be displayed.
componentDidMount() {
  this.getBooks();

}
  

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
getBooks = async () => {
  try {
    let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
    // console.log(results.data);
    this.setState({
      books: results.data
    })
  } catch(error) {
    console.log('We have an error: ', error.response.data);
  }

}
  render() {

    // console.log(this.state.books);
    // let books = this.state.books.map(book => ( 
    //   <>
    //     <ul>Name: {this.state.books.title}</ul>
    //     <ul>Description: {this.state.books.description}</ul>
    //   </>
    // ))
    // console.log(books);

    return (
      <>
        <h3>Book Shelf:</h3>

        {
        this.state.books.length ? this.state.books.map(book => (<>
            <ul key={book._id}>Title: {book.title}</ul>
            <ul key={book._id}>Description: {book.description}</ul>
            <ul key={book._id}>Read: {book.read}</ul>
         </>
        )) : ( <ul>Book Carousel is empty!</ul> )}
      </>
    )
  }
}

export default BestBooks;
