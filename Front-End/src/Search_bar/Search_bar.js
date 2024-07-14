import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search_bar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search_Bar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`/get-suggestions?query=${encodeURIComponent(query)}`);
      const suggestionsData = await response.json();
      setSuggestions(suggestionsData);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/allads?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(true); // Show suggestions as user types
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='searc'>
      <div className="container content-center col-md-5 search_br">
        <div className="row">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              style={{borderRadius:50}}
              id='input_search'
              placeholder="Search..."
              value={searchQuery}
              onChange={handleInputChange}
              onBlur={() => setShowSuggestions(false)} // Hide suggestions on blur
              onKeyPress={handleKeyPress} // Trigger search on Enter key press
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                id='srch_btn'
                type="button"
                onClick={handleSearch}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-modal">
              <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <ul className="list-group list-group-flush">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="list-group-item suggestion-item"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSuggestions(false);
                            handleSearch();
                          }}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
