import React from 'react';
import { Form } from 'react-bootstrap';

const CategorySelector = () => {
  return (
    <div  style={{marginTop:20}}>
        <Form.Group controlId="categorySelect">
      <Form.Label><i class="bi bi-bookmark-heart-fill"></i> Category</Form.Label>
      <Form.Control as="select">
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
        {/* Add more category options as needed */}
      </Form.Control>
    </Form.Group>
    </div>
  );
};

export default CategorySelector;
