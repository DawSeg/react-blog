import { getPostById, removePost } from "../../../redux/postsRedux";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import { useState } from "react";
import { dateToStr } from '../../../Utils/dateToStr';

const Post = () => {
  const { id } = useParams();
  const postData = useSelector((state) => getPostById(state, id));
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const dispatch = useDispatch();
  const postOut = (id) => {
    dispatch(removePost(id));
  };
  if (!postData) return <Navigate to="/" />;
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col className="col-6">
          <Card border="light">
            <Card.Body>
              <Card.Title>{postData.title}</Card.Title>
              <Card.Text>
                <strong>Author: </strong>
                {postData.author} <br />
                <strong>Published: </strong>
                <b>Published:</b>{dateToStr(postData.publishedDate)}<br /> <br />
              </Card.Text>
              <Card.Text>{postData.shortDescription}</Card.Text>
              <Card.Text
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button
            className="mx-1"
            variant="outline-info"
            as={NavLink}
            to={"/post/edit/" + id}
          >
            Edit
          </Button>
          <Button variant="outline-danger" onClick={handleShow}>
            Delete
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This operation will completely remove this post from the app. <br />{" "}
          Are you sure you want to do that?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              postOut(postData.id);
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
