import React from "react";
import axios from "axios";
import BookFormModal from './BookFormModal';
import { Button, Container, Form } from "react-bootstrap";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.name.value,
      description: e.target.description.value,
      read: e.target.read.checked,
    };
    this.postBooks(newBook);
  };

  // postBooks = async (newBookObj) => {
  //   try {
  //     let url = `${SERVER}/newBook`;
  //     let createdBook = await axios.post(url, newBookObj);
  //     this.getBooks;
  //     this.setState({
  //       books: [...this.state.books, createdBooks],
  //     });
  //   } catch (error) {
  //     console.log("We have an error.", error.response.data);
  //   }
  // };

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
        books: results.data,
      });
    } catch (error) {
      console.log("We have an error: ", error.response.data);
    }
  };
  render() {
    return (
      <>
        <h3>Book Shelf:</h3>
        {this.state.books.length ? (
          this.state.books.map((book) => (
            <>
              <ul key={book._id}>
                Title: <i>{book.title}</i>
              </ul>
              <ul key={book._id}>Description: {book.description}</ul>
              <ul key={book._id}>
                Read:{" "}
                {book.read ? "I have read this book!" : "Have not yet read!"}
              </ul>
              <br />
            </>
          ))
        ) : (
          <ul>Book Carousel is empty!</ul>
        )}
        <main>
          <Container className="mt-5">
            <Form onSubmit={this.handleBookSubmit}>
              <Form.Group constrolId="name">
                <Form.Label>Name </Form.Label>
                <Form.Control type="test" />
              </Form.Group>
              <Form.Group constrolId="name">
                <Form.Label>Description </Form.Label>
                <Form.Control type="test" />
              </Form.Group>
              <Form.Group controlId="read">
                <Form.Check type="checkbox" label="Read" />
              </Form.Group>
              <Button type="submit">New Book</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

/*  */

export default BestBooks;
