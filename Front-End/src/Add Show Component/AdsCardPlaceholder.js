import React from 'react';
import './AdsCard.css';

const AdsCardPlaceholder = () => {
  return (
    <div className="card card_alls" style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
      <div
        className='img_sli placeholder'
        style={{
          width: '150px',
          height: '150px',
          marginRight: '10px',
          borderTopLeftRadius: '5px', // Rounded top-left corner
          borderBottomLeftRadius: '5px', // Rounded bottom-left corner
        }}
      ></div>
      <div className='cardf' style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
        <div className="card-title crd_tits placeholder"></div>
        <div className="card-text price_vv placeholder"></div>
        <div className="card-text" style={{ fontSize: 14 }} id='des_loc placeholder'></div>
        <div className="card-text time placeholder"></div>
        <div className="card-text" style={{ fontSize: 14 }}></div>
      </div>
    </div>
  );
};

export default AdsCardPlaceholder;
