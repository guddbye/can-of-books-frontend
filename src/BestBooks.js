import React from "react";
import axios from "axios";
import BookFormModal from "./BookFormModal";
import { Button, CarouselItem, Container, Form } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import './BestBooks.css';
// import UpdateBookForm from './UpdateBookForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    };
  }

  handleSubmit = (e) => {
    let bookToUpdate = {
      title: e.target.title.value || this.props.book.title,
      description: e.target.description.value || this.props.book.description,
      status: e.target.status.value || this.props.book.status,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }
    this.props.updateBooks(bookToUpdate)
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.name.value,
      description: e.target.description.value,
      read: e.target.read.checked,
    };
    console.log(newBook);
    this.postBooks(newBook);
  };

  handleShowModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleHideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  componentDidMount() {
    this.getBooks();
  }

  postBooks = async (newBookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBook = await axios.post(url, newBookObj);
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
      let updatedBooks = this.state.books.filter((book) => book._id !== id);
      this.setState({
        books: updatedBooks,
      });
    } catch (error) {
      console.log("We have an error.", error.response.data);
    }
  };

  getBooks = async () => {
    try {
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      console.log(results.data);
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
          <img
            src="https://mcdn.wallpapersafari.com/medium/67/6/Rj8qwh.jpg"
            alt="Test"
            width="630"
            height="360"
          />

          <Carousel.Caption>
            <p>{bookInfo.title}</p>
            <p>Description: {bookInfo.description}</p>
            <p>
              Status:{" "}
              {bookInfo.status
                ? "I have read this book!"
                : "I have not read this yet."}
            </p>

            <Button
              type="submit"
              variant="dark"
              onClick={() => this.deleteBooks(bookInfo._id)}
            >
              Delete Book
            </Button>

            <Button
              id="updateButton"
              variant="dark"
              onClick={() =>
                this.updateBookForm({ showUpdateForm: true, bookUpdate: bookInfo })
              }
            >
              Update Book
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

    console.log(bookShelf);

    return (
      <div id='bestBooksDiv'>
        <br />
        <BookFormModal
          hideModal={this.handleHideModal}
          showModal={this.state.showModal}
          addBook={this.handleBookSubmit}
        />
        <Button variant="dark" id="add" onClick={this.handleShowModal}>
          Add Book
        </Button>
        <Carousel variant="dark">{bookShelf}</Carousel>
      </div>
    );
  }
}

export default BestBooks;
