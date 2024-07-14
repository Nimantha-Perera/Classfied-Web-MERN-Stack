
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const LocationSelector = ({onSelectLocation}) => {
  const districtOptions = [
    // Colombo District
    { value: 'colombo', label: 'Colombo' },
    { value: 'colombo_town', label: 'Colombo Town' },
    { value: 'nugegoda', label: 'Nugegoda' },
    // ... Add more sub-towns for Colombo district
  
    // Gampaha District
    { value: 'gampaha', label: 'Gampaha' },
    { value: 'gampaha_town', label: 'Gampaha Town' },
    { value: 'negombo', label: 'Negombo' },
    // ... Add more sub-towns for Gampaha district
  
    // Kalutara District
    { value: 'kalutara', label: 'Kalutara' },
    { value: 'kalutara_town', label: 'Kalutara Town' },
    { value: 'panadura', label: 'Panadura' },
    // ... Add more sub-towns for Kalutara district
  
    // Kandy District
    { value: 'kandy', label: 'Kandy' },
    { value: 'kandy_town', label: 'Kandy Town' },
    { value: 'peradeniya', label: 'Peradeniya' },
    // ... Add more sub-towns for Kandy district
  
    // Galle District
    { value: 'galle', label: 'Galle' },
    { value: 'galle_town', label: 'Galle Town' },
    { value: 'unawatuna', label: 'Unawatuna' },
    // ... Add more sub-towns for Galle district
  
    // Matara District
    { value: 'matara', label: 'Matara' },
    { value: 'matara_town', label: 'Matara Town' },
    { value: 'weligama', label: 'Weligama' },
    // ... Add more sub-towns for Matara district
  
    // Hambantota District
    { value: 'hambantota', label: 'Hambantota' },
    { value: 'hambantota_town', label: 'Hambantota Town' },
    { value: 'tangalle', label: 'Tangalle' },
    // ... Add more sub-towns for Hambantota district
  
    // Jaffna District
    { value: 'jaffna', label: 'Jaffna' },
    { value: 'jaffna_town', label: 'Jaffna Town' },
    { value: 'chavakachcheri', label: 'Chavakachcheri' },
    // ... Add more sub-towns for Jaffna district
  
    // Vavuniya District
    { value: 'vavuniya', label: 'Vavuniya' },
    { value: 'vavuniya_town', label: 'Vavuniya Town' },
    { value: 'nedunkeni', label: 'Nedunkeni' },
    // ... Add more sub-towns for Vavuniya district
  
    // Kurunegala District
    { value: 'kurunegala', label: 'Kurunegala' },
    { value: 'kurunegala_town', label: 'Kurunegala Town' },
    { value: 'kuliyapitiya', label: 'Kuliyapitiya' },
    // ... Add more sub-towns for Kurunegala district
  
    // Puttalam District
    { value: 'puttalam', label: 'Puttalam' },
    { value: 'puttalam_town', label: 'Puttalam Town' },
    { value: 'chilaw', label: 'Chilaw' },
    // ... Add more sub-towns for Puttalam district
  
    // Anuradhapura District
    { value: 'anuradhapura', label: 'Anuradhapura' },
    { value: 'anuradhapura_town', label: 'Anuradhapura Town' },
    { value: 'medawachchiya', label: 'Medawachchiya' },
    // ... Add more sub-towns for Anuradhapura district
  
    // Polonnaruwa District
    { value: 'polonnaruwa', label: 'Polonnaruwa' },
    { value: 'polonnaruwa_town', label: 'Polonnaruwa Town' },
    { value: 'kaduruwela', label: 'Kaduruwela' },
    // ... Add more sub-towns for Polonnaruwa district
  
    // Matale District
    { value: 'matale', label: 'Matale' },
    { value: 'matale_town', label: 'Matale Town' },
    { value: 'dambulla', label: 'Dambulla' },
    // ... Add more sub-towns for Matale district
  
    // Nuwara Eliya District
    { value: 'nuwara_eliya', label: 'Nuwara Eliya' },
    { value: 'nuwara_eliya_town', label: 'Nuwara Eliya Town' },
    { value: 'hatton', label: 'Hatton' },
    // ... Add more sub-towns for Nuwara Eliya district
  
    // Ratnapura District
    { value: 'ratnapura', label: 'Ratnapura' },
    { value: 'ratnapura_town', label: 'Ratnapura Town' },
    { value: 'embilipitiya', label: 'Embilipitiya' },
    // ... Add more sub-towns for Ratnapura district
  
    // Kegalle District
    { value: 'kegalle', label: 'Kegalle' },
    { value: 'kegalle_town', label: 'Kegalle Town' },
    { value: 'mawanella', label: 'Mawanella' },
    // ... Add more sub-towns for Kegalle district
  
    // Trincomalee District
    { value: 'trincomalee', label: 'Trincomalee' },
    { value: 'trincomalee_town', label: 'Trincomalee Town' },
    { value: 'kinniya', label: 'Kinniya' },
    // ... Add more sub-towns for Trincomalee district
  
    // Batticaloa District
    { value: 'batticaloa', label: 'Batticaloa' },
    { value: 'batticaloa_town', label: 'Batticaloa Town' },
    { value: 'kattankudy', label: 'Kattankudy' },
    // ... Add more sub-towns for Batticaloa district
  
    // Ampara District
    { value: 'ampara', label: 'Ampara' },
    { value: 'ampara_town', label: 'Ampara Town' },
    { value: 'akkarapattu', label: 'Akkarapattu' },
    // ... Add more sub-towns for Ampara district
  
    // Monaragala District
    { value: 'monaragala', label: 'Monaragala' },
    { value: 'monaragala_town', label: 'Monaragala Town' },
    { value: 'badalkumbura', label: 'Badalkumbura' },
    // ... Add more sub-towns for Monaragala district
  
    // Hambantota District
    { value: 'hambantota', label: 'Hambantota' },
    { value: 'hambantota_town', label: 'Hambantota Town' },
    { value: 'tangalle', label: 'Tangalle' },
    // ... Add more sub-towns for Hambantota district
  
    // Ratnapura District
    { value: 'ratnapura', label: 'Ratnapura' },
    { value: 'ratnapura_town', label: 'Ratnapura Town' },
    { value: 'embilipitiya', label: 'Embilipitiya' },
    // ... Add more sub-towns for Ratnapura district
  
    // Kalutara District
    { value: 'kalutara', label: 'Kalutara' },
    { value: 'kalutara_town', label: 'Kalutara Town' },
    { value: 'panadura', label: 'Panadura' },
    // ... Add more sub-towns for Kalutara district
  
    // Matale District
    { value: 'matale', label: 'Matale' },
    { value: 'matale_town', label: 'Matale Town' },
    { value: 'dambulla', label: 'Dambulla' },
    // ... Add more sub-towns for Matale district
  
    // Galle District
    { value: 'galle', label: 'Galle' },
    { value: 'galle_town', label: 'Galle Town' },
    { value: 'unawatuna', label: 'Unawatuna' },
    // ... Add more sub-towns for Galle district
  ];

  const [selectedLocation, setSelectedLocation] = useState('');

  // Event handler for location selection change
  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLocation(selectedValue);

    // Call the callback function to pass the selected location to the parent component
    onSelectLocation(selectedValue);
  };
  

  return (
    <div style={{ marginTop: 20 }}>
      <Form.Group controlId="locationSelect">
        <Form.Label><i class="bi bi-geo-alt-fill"></i> Location</Form.Label>
        <Form.Control as="select" style={{ boxShadow: "none" }} onChange={handleLocationChange} value={selectedLocation}>
          <option value="">All</option>
          {districtOptions.map((district) => (
            <option key={district.value} value={district.value}>
              {district.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default LocationSelector;
