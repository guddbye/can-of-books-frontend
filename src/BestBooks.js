import React from "react";
import axios from "axios";
import BookFormModal from './BookFormModal';
import { Button, CarouselItem, Container, Form } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
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

  handleShowModal = () => {
    this.setState({
      showModal: true,
    });
  }

  handleHideModal = () => {
    this.setState({
      showModal: false,
    });
  }

  postBooks = async (newBookObj) => {
    try {
      let url = (`${process.env.REACT_APP_SERVER}/books`)
      let createdBook = await axios.post(url, newBookObj);
      // this.getBooks;
      this.setState({
        books: [...this.state.books, createdBook.data],
      });
    } catch (error) {
      console.log("We have an error.", error.response.data);
    }
  };

  deleteBooks = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      await axios.delete(url);
      this.getBooks();
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      })
    } catch (error) {
      console.log('We have an error.', error.response.data);
    }
  };

  componentDidMount() {
    this.getBooks();
  }

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
// console.log(this.props.books);

    let bookShelf = this.state.books.map((bookInfo) => {
      return (
        <Carousel.Item key={bookInfo._id}>
          <img src="http://via.placeholder.com/640x360" 
          width='500' height = '500'/>
          <Carousel.Caption>
            <p>{bookInfo.title}</p>
            <p>Description: {bookInfo.description}</p>
            <p>Status: {bookInfo.status}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

console.log(bookShelf);

    return (
      <>
      <br/>
        <div class="d-flex justify-content-center">
          <Button onClick={this.handleShowModal}>Add Book</Button>
          
          <Carousel>
          {bookShelf}
        </Carousel>

        </div>
        {/* <main>
        <h3>Book Shelf:</h3>
        {this.state.books.length ? (
          this.state.books.map((book) => (
            <>
              <ul key={book._id}>
                Title: <i>{book.title}</i>
              </ul>


              <ul key={book._id}>Description: {book.description}</ul>
              <ul key={book._id}>
                Read: {" "}
                {book.read ? "I have read this book!" : "Have not yet read!"}
              </ul>
              <br />
            </>
          ))
        ) : (
          <ul>Book Carousel is empty!</ul>
        )}
        </main> */}
        <BookFormModal
          hideModal={this.handleHideModal}
          showModal={this.state.showModal}
        />
      </>
    );
  }
}

export default BestBooks;
