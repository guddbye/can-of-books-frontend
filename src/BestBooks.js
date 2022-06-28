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
    console.log(results.data);
    this.setState({
      books: results.data
    })
  } catch(error) {
    console.log('We have an error: ', error.response.data);
  }

}
  render() {

    /* TODO: render all the books in a Carousel */
console.log(this.state.books);
let books = this.state.books.map(book => ( <p>{book.name} <br/> {book.description}</p>
))
    return (
      <>
        <h2>Book Shelf:</h2>

        {this.state.books.length ?
        {books} 
        (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Entered!(</h3>
        )}
      </>
    )
  }
}


export default BestBooks;
