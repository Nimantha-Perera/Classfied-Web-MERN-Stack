import React from 'react';
import Nav2 from '../Navi Component/Nav2';
import Postadd from './Post_add';
import Footer from '../Footer/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import post_img from '../SVG/Post-pana.svg';

export default function Post_Youre_Add() {
  return (
    <div>
    
      <Container>
        <Row>
          <Col lg={6} className="mb-4">
            {/* Add your image here */}
            <img src={post_img} style={{marginTop:100}}></img>
          </Col>
          <Col lg={6} className="mb-4">
            <Postadd />
          </Col>
        </Row>
      </Container>

    </div>
  );
}
