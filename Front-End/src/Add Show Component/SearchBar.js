import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Call the onSearch function with the current search query when the button is clicked
    onSearch(searchQuery);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Form inline>
        <div className="d-flex">
          <FormControl
            style={{ borderRadius: 50, marginRight: 20, boxShadow: 'none' }}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="outline-primary"
            style={{ backgroundColor: '#fbd408', borderRadius: 50, width: 50 }}
            onClick={handleSearch}
          >
            <i className="bi bi-search"></i>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
