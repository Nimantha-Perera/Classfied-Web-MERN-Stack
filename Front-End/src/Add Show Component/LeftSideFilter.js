import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./LeftSideFilter.css";

const LeftSideFilter = ({ onFilterApply }) => {
  const [newUsedValue, setNewUsedValue] = useState("");
  const [filterVisible, setFilterVisible] = useState(true);
  const [categoryValue, setCategoryValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const handleFilterChange = (event) => {
    const { id, value, checked } = event.target;

    if (id === "new" || id === "used") {
      setNewUsedValue(checked ? value : "");
    } else if (id === "categoryFilter") {
      setCategoryValue(value);
    } else if (id === "dateFilter") {
      setDateValue(value);
    } else if (id === "priceFilter") {
      setPriceValue(value);
    }
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const applyFilter = () => {
    // Construct the filter object
    const filters = {
      newUsedValue,
      categoryValue,
      dateValue,
      priceValue,
    };

    console.log(dateValue);
    console.log(priceValue);

    // Pass the filter object to the parent component for further processing
    onFilterApply(filters);
  };

  return (
    <Card className="left-side-filter" style={{ marginTop: -1, border: "none" }}>
      <Card.Body>
        <div className="d-md-none mb-2">
          {/* Responsive View Toggle Button (Mobile View) */}
          <Button
            variant="primary"
            onClick={toggleFilter}
            style={{ float: "right", background: "none", border: "none" }}
          >
            {filterVisible ? (
              <>
                <i className="bi bi-funnel-fill" style={{ color: "#0d6efd" }}></i>
              </>
            ) : (
              <>
                <i className="bi bi-funnel-fill" style={{ color: "#0d6efd" }}></i>{" "}
              </>
            )}
          </Button>
        </div>

        <div
          className={`filter-section ${filterVisible ? "" : "filter-section-hidden"}`}
        >
          <Form>
            <Form.Group controlId="filterForm">
              <Form.Label style={{ fontSize: 12 }}>
                <strong>Category</strong>
              </Form.Label>
              <Form.Control
                as="select"
                onChange={handleFilterChange}
                style={{ fontSize: 10, boxShadow: "none" }}
                id="categoryFilter"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                  <option value="Property">Property</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Business & Industry">Business & Industry</option>
                  <option value="Services">Services</option>
                  <option value="Sports & Kids">Sports & Kids</option>
                  <option value="Animals">Animals</option>
                  <option value="Fashion & Beauty">Fashion & Beauty</option>
                  <option value="Jobs">Jobs </option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="newUsedFilter">
              <Form.Label style={{ fontSize: 12 }}>
                <strong>New & Used</strong>
              </Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  id="new"
                  label="New"
                  value="new"
                  style={{ fontSize: 10, boxShadow: "none" }}
                  checked={newUsedValue === "new"}
                  onChange={handleFilterChange}
                />
                <Form.Check
                  type="checkbox"
                  id="used"
                  label="Used"
                  className="chk_filter"
                  style={{ fontSize: 10, boxShadow: "none" }}
                  value="used"
                  checked={newUsedValue === "used"}
                  onChange={handleFilterChange}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="dateFilter">
              <Form.Label style={{ fontSize: 12 }}>
                <strong>Date</strong>
              </Form.Label>
              <Form.Control
                as="select"
                onChange={handleFilterChange}
                style={{ fontSize: 10, boxShadow: "none" }}
                id="dateFilter"
              >
                <option value="">Select an option</option>
                <option value="newest">Date: Newest on top</option>
                <option value="oldest">Date: Oldest on top</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="priceFilter">
              <Form.Label style={{ fontSize: 12 }}>
                <strong>Price</strong>
              </Form.Label>
              <Form.Control
                as="select"
                onChange={handleFilterChange}
                style={{ fontSize: 10, boxShadow: "none" }}
                id="priceFilter"
              >
                <option value="" style={{ fontSize: 12 }}>
                  Select an option
                </option>
                <option value="highToLow">Price: High to low</option>
                <option value="lowToHigh">Price: Low to high</option>
              </Form.Control>
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            onClick={applyFilter}
            style={{
              fontSize: 12,
              marginTop: 10,
              width: 135,
              boxShadow: "none",
            }}
          >
            APPLY FILTERS
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LeftSideFilter;
