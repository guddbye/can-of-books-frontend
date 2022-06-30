import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './BookFormModal';
import './BookFormModal.css';


class BookFormModal extends React.Component {

  render() {
    return (
   
      <Modal show = {this.props.showModal}
      onHide = {this.props.hideModal}>

      <Modal.Body>
      <Container className="mt-5">

        <Form onSubmit={this.props.addBook}>
          
          <Form.Group controlId="name">
            <Form.Label>Title </Form.Label>
            <Form.Control type="test" />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description </Form.Label>
            <Form.Control type="test" />
          </Form.Group>

          <Form.Group controlId="read">
            <Form.Check type="checkbox" label="Read" />
          </Form.Group>

          <div className="d-flex justify-content-center">
          <Button type="submit">New Book</Button></div>
        </Form>

      </Container>
      </Modal.Body>
    </Modal>
    );
  }
}

export default BookFormModal;