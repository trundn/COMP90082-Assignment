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
import Leon from '../academic/Leon_Sterling.png';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Virtual]);

const button_sytle = require('../academic/Academic.css');

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

const swiperStyle = {
  marginTop: '1vh',
};

const add_remove_button = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  position: 'absolute',
  padding: '0.5rem',
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
        css={swiperStyle}
        spaceBetween={10}
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
              <h5>{user.username}</h5>
              <h5>{user.testimonial}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="Demo-controls">
        <span className="Demo-controls__control">Add</span>
        <span className="Demo-controls__control">Delete</span>
      </div>
    </div>
  );
};

export { AcademicPage };
