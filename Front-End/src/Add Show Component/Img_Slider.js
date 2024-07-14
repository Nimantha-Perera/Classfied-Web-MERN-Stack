import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Img_Slider.css';

const Img_Slider = () => {
  const sliderRef = useRef(null);

  const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, 
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const slidesData = [
    {
      imageUrl: 'https://via.placeholder.com/736x368',
      altText: 'Slide 1',
      price: 'Rs 10,000,0',
      description: 'This is a beautiful item!',
    },
    {
      imageUrl: 'https://via.placeholder.com/736x368',
      altText: 'Slide 2',
      price: 'Rs 15,000,00',
      description: 'Limited edition product.',
    },
    {
      imageUrl: 'https://via.placeholder.com/736x368',
      altText: 'Slide 3',
      price: 'Rs 80,000,0',
      description: 'Get it while it lasts!',
    },
  ];

  return (
    <div>
      <div style={{ position: 'relative'}} className='img_con'>
        <Slider {...settings} ref={sliderRef}>
          {slidesData.map((slide, index) => (
            <div key={index}v >
              <img src={slide.imageUrl} alt={slide.altText} style={{ width: '100%' }} />
              <div className='dis_img' style={{ position: 'absolute', bottom: -10, color: '#fff', padding: '10px', width: '100%' }}>
                <h4 className='price_img_s'>Price: {slide.price}</h4>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>
        <Button
          className="position-absolute btn btn-primary border border-white preview"
          style={{ top: '45%', left: '0' }}
          onClick={goToPrevSlide}
        >
          <i className="bi bi-chevron-left"></i>
        </Button>
        <Button
          className="position-absolute btn btn-primary border border-white next"
          style={{ top: '45%', right: '0' }}
          onClick={goToNextSlide}
        >
         <i className="bi bi-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
};

export default Img_Slider;
