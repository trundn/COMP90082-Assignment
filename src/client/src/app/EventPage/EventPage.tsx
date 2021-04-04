import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { TitleBox } from '../portfolio-shared/TitleBox';
import { ItemList } from '../projects/ItemList';

const EventPage = () => {
  return (
    <>
      <TitleBox title="Event" subtitle="My events" />
      <ItemList category={PortfolioCategory.EVENT} />
    </>
  );
};

export { EventPage };
