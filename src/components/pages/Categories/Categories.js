import { useSelector } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {getPostByCategories} from '../../../redux/categoryRedux';
import { dateToStr } from '../../../Utils/dateToStr';
import { NavLink } from 'react-router-dom';


const Categories = () => {
  const { category } = useParams();
  const categoriesPost = useSelector((state) => getPostByCategories(state, category));
  
    return (
      <Row>
        {categoriesPost.map(post => (
           <Col key={post.id} xs='12' md='6' lg='4'>
          <Card key={post.id} className='mt-4'>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                <strong>Author: </strong>
                {post.author} <br />
                <strong>Published: </strong>
                {dateToStr(post.publishedDate)} <br />
                <strong>Category: </strong>
                {post.category}
              </Card.Text>
              <Card.Text>{post.shortDescription}</Card.Text>
              <Button variant='primary' as={NavLink} to={'/post/' + post.id}>
                Read more
              </Button>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    );
};
 

export default Categories;