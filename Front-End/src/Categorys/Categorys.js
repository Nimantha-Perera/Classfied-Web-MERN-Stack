import React, { useState } from 'react';
import './Categorys.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link from React Router

// Category Icons

import elec from '../category_ico/plug 1.png';
import prop from '../category_ico/house (2) 1.png';
import car from '../category_ico/car 1.png';
import gar from '../category_ico/house (3) 1.png';

import buse from '../category_ico/growth 1.png';
import ser from '../category_ico/customer-service (1) 1.png';
import spo from '../category_ico/sports 1.png';
import dog from '../category_ico/dog 1.png';

import dres from '../category_ico/dress 1.png';
import job from '../category_ico/suitcase 1.png';
import edu from '../category_ico/education 1.png';
import oth from '../category_ico/other 1.png';

export default function Categorys() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

 // Sample data for cards
 const cardsData = [
  {
    title: 'Electronics',
    image: elec,
  },
  {
    title: 'Property ',
    image: prop,
  },
  // Add more cards with their respective titles and images here
  {
    title: 'Vehicles',
    image: car,
  },
  {
      title: 'Home & Garden',
      image: gar,
    },
    // Add more cards with their respective titles and images here
    {
      title: 'Business & Industry',
      image: buse,
    },
    {
      title: 'Services ',
      image: ser,
    },
    // Add more cards with their respective titles and images here
    {
      title: 'Sports & Kids',
      image: spo,
    },
    {
      title: 'Animals',
      image: dog,
    },
    // Add more cards with their respective titles and images here
    {
      title: 'Fashion & Beauty',
      image: dres,
    },
    {
      title: 'Jobs ',
      image: job,
    },
    // Add more cards with their respective titles and images here
    {
      title: 'Education',
      image: edu,
    },
    {
      title: 'Other',
      image: oth,
    },
  // Add more cards with their respective titles and images here
];

  return (
    <div className="container col-md-7 categorys_con">
      <h5 style={{textAlign:'center'}} className='find_add_header'>Browse items by category</h5>
      <div className="row">
        {cardsData.map((card, index) => (
          <div key={index} className={`col-lg-3 col-md-4 col-sm-6 g-3 ${selectedCardIndex === index ? 'selected' : ''}`} onClick={() => handleCardClick(index)}>
            <Link style={{textDecoration:"none"}} to={`/category/${encodeURIComponent(card.title)}`} className="card-link">
              <div className="card card_view text-center">
                <div className="card-body">
                  <h5 className="card-title crd_tit">{card.title}</h5>
                </div>
                <img src={card.image} alt={`Card ${index + 1}`} className="card-img-top crd_img" style={{width:60}} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
