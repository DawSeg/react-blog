import { getPostById, removePost } from '../../../redux/postsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Button, Card, Col, Row, Modal } from 'react-bootstrap';
import { useState } from 'react';

const Post = () => {
  const { postId } = useParams();
  const postData = useSelector((state) => getPostById(state, postId));
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const dispatch = useDispatch();
  const postOut = (id) => {
    dispatch(removePost(id));
  };
  if (!postData) return <Navigate to='/' />;
  return (
    <>
      <Row className='d-flex justify-content-center'>
        <Col className='col-6'>
          <Card border='light'>
            <Card.Body>
              <Card.Title>{postData.title}</Card.Title>
              <Card.Text>
                <strong>Author: </strong>
                {postData.author} <br />
                <strong>Published: </strong>
                {postData.publishedDate} <br />
              </Card.Text>
              <Card.Text>{postData.shortDescription}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className='d-flex justify-content-end align-items-center'>
          <Button variant='outline-info' as={NavLink} to={'/post/edit/' + postId}>
            Edit
          </Button>
          <Button variant='outline-danger' onClick={handleShow}>Delete</Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This operation will completely remove this post from the app. <br />{' '}
          Are you sure you want to do that?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              handleClose();
              postOut(postData.id);
            }}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;