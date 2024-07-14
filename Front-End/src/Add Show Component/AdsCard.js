import React from 'react';
import { Link } from 'react-router-dom';
import './AdsCard.css';
import AdsCardPlaceholder from './AdsCardPlaceholder';

const AdsCard = ({ adId, title, price, location, description, postedTime, img }) => {
  // Check if data is available
  const isDataAvailable = title && price && location && description && postedTime && img;

  return (
    <Link to={`/ad/${adId}`} className="card card_alls" style={{ display: 'flex', flexDirection: 'row', marginTop: 10, cursor: "pointer", textDecoration: "none" }}>
      {isDataAvailable ? (
        <>
          <img
            src={img}
            alt="Sample Ad"
            className='img_sli'

            style={{
              width: '150px',
              height: '150px',
              marginRight: '10px',
             
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px',
            }}
          />
          <div className='cardf' style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
            <h5 className="card-title crd_tits">{title}</h5>
            <p className="card-text price_vv">{price}</p>
            <p className="card-text" style={{ fontSize: 14 }} id='des_loc'>
              {location}
            </p>
            <p className="card-text time" style={{ float: 'right' }}>
              {postedTime}
            </p>
            <p className="card-text" style={{ fontSize: 14 }}>
              {description}
            </p>
          </div>
        </>
      ) : (
        <AdsCardPlaceholder /> // Display placeholder when data is not available
      )}
    </Link>
  );
};

export default AdsCard;
