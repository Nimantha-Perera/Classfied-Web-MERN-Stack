import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSearchLocation, FaList } from 'react-icons/fa';
import './All.ads.css';
import LeftSideFilter from './LeftSideFilter';
import RightSideBanner from './RightSideBanner';
import SearchBar from './SearchBar'; // Import the SearchBar component
import LocationSelector from './LocationSelector';
import { useLocation } from 'react-router-dom';
import CenterContent from './CenterContent';
import Banner_H from '../Banner Add Horizontal/Banner_H';
import useScrollToTop from '../useScrollToTop';

const All_ads = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query');
  const [searchQuery2, setSearchQuery] = useState('');
  const[maim_location , setMainLocation] = useState('');

  const [filters, setFilters] = useState({
    newUsedValue: '',
    categoryValue: '',
    dateValue: '',
    priceValue: '',
  });

  const handleFilterApply = (filterValues) => {
    setFilters(filterValues);
  };

  // Define a function to handle the search action
  const handleSearch = (query) => {
    // Perform your search logic here, e.g., make an API request with the query
    setSearchQuery(query);
  };

  const handleLocationChange = (location) =>{
    setMainLocation(location);
  }
  useScrollToTop();
  return (
    <div>
      <Banner_H />
      <Container fluid className='container col-md-12 ads_bar'>
        <Row className='justify-content-center'>
          <Col md={2}>
            <LeftSideFilter onFilterApply={handleFilterApply} />
          </Col>
          <Col md={6}>
            <Row>
              {/* Render the SearchBar component and pass the handleSearch function */}
              <SearchBar onSearch={handleSearch} />
              <Col>
              <LocationSelector onSelectLocation={handleLocationChange} />

              </Col>
            </Row>
            <CenterContent
              searchQuery={searchQuery}
              filters={filters}
              searchQuery2={searchQuery2}
              maim_location = {maim_location}
            />
          </Col>
          <Col md={2}>
            <RightSideBanner />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default All_ads;
