import * as React from 'react';
import { TitleBox } from '../../portfolio-shared/TitleBox';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Virtual,
} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import Leon from '../academic/he.png';
import { Container } from 'react-bootstrap';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Virtual]);

const button_sytle = require('../academic/Academic.css');
const bootstrap = require('../academic/bootstrap.css');
// Test Data
const data = [
  {
    id: 1,
    username: 'ABC',
    testimonial: 'LLLLLLL',
  },
  {
    id: 2,
    username: 'BBB',
    testimonial: 'LLLLLLL',
  },
  {
    id: 3,
    username: 'CCC',
    testimonial: 'LLLLLLL',
  },
  {
    id: 4,
    username: 'DDD',
    testimonial: 'LLLLLLL',
  },
  {
    id: 5,
    username: 'EEE',
    testimonial: 'LLLLLLL',
  },
];

const ImageBox = () => {
  return (
    <div className="inner-box">
      <figure className="image-box">
        <img src={Leon} alt="" />
      </figure>
      <div className="lower-content">
        <div className="rating">
          <span>
            <i className="fas fa-star"></i>8.0 Superb
          </span>
        </div>
        <h3>
          <a href="tour-details.html">Moscow Red City Land</a>
        </h3>
        <h4>
          $170.00<span> / Per person</span>
        </h4>
        <ul className="info clearfix">
          <li>
            <i className="far fa-clock"></i>5 Days
          </li>
          <li>
            <i className="far fa-map"></i>G87P, Birmingham
          </li>
        </ul>
        <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
        <div className="btn-box">
          <a href="tour-details.html">See Details</a>
        </div>
      </div>
    </div>
  );
};

const AcademicPage = () => {
  return (
    <div>
      <TitleBox
        title="Academic"
        subtitle="My academics and academic picture."
      />
      <Swiper
        className="swiper_con"
        css={button_sytle}
        spaceBetween={5}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((user) => (
          <SwiperSlide key={user.id} className="slide">
            <div className="slide-content">
              <div className="academic_image">
                <img src={Leon} alt="" className="user_photo" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="Demo-controls">
        <button className="Demo-controls__control">Add Image</button>
        <button className="Demo-controls__control">Delete Image</button>
        <button className="Demo-controls__control">Add Academic</button>
        <button className="Demo-controls__control">Delete Academic</button>
      </div>

      <Container>
        <ImageBox css={bootstrap} />
        <ImageBox css={bootstrap} />
      </Container>
    </div>
  );
};

export { AcademicPage };
