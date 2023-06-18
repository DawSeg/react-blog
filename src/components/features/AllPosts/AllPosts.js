import { useSelector } from 'react-redux';
import { getAllPosts } from '../../../redux/postsRedux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { dateToStr } from '../../../Utils/dateToStr';

const Posts = () => {

  const posts = useSelector(getAllPosts);

  return(
    <Row> 
      {posts.map((post) => (
        <Col key={post.id} xs='12' md='6' lg='4'>
          <Card key={post.id} className='mt-4'>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                <b>Author: </b>{post.author}<br />
                <b>Published: </b>{dateToStr(post.publishedDate)}<br />
                <b>Category: </b>{post.category}<br /> <br />
                {post.shortDescription}               
              </Card.Text>
              <Button variant="primary" as={NavLink} to={'/post/' + post.id}>Read more</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Posts;