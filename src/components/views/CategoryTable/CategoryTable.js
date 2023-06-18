import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllCategories } from '../../../redux/categoryRedux';

const CategoryTable = () => {
  const categories = useSelector(getAllCategories);
  return (
      <section>
        <h1 className="mb-5 justify-content-center d-flex">Categories</h1>
        <Row xs={1} md={1}>
        {categories.map((category) => (
          <Col key={category} className='mx-5'>
            <Button
              variant='link'
              as={NavLink}
              to={'/categories/' + category}
            >
              {category}
            </Button>
          </Col>
        ))}
      </Row>
      </section>
  );
};

export default CategoryTable;