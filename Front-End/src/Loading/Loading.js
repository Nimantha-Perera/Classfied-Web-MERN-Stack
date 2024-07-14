import React from 'react';
import { css } from '@emotion/react';
import { FadeLoader } from 'react-spinners';
import './Loading.css'; // Import a CSS file for styling

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #007bff;
`;

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading">
        <FadeLoader color={'#ffffff'} css={override} size={50} />
      </div>
    </div>
  );
}

export default Loading;
