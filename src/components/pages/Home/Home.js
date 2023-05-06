import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AllPosts from "../../features/AllPosts/AllPosts";

const Home = () => {
    return (
      <>
        <Row>
            <Col className="d-flex justify-content-between">
                <h1>All posts</h1>
                <Button className="mb-3" variant='outline-primary' as={Link} to={'/post/add' }>Add post</Button>
            </Col>
        </Row>
        <AllPosts/>
      </>
    );
  };
  
  export default Home;