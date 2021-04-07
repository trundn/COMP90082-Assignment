import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import React from 'react';
import { ItemList } from '../EventPage/ItemList';
import { TitleBox } from './TitleBox';

// Content of the project tab
const EventPage = () => {
  return (
    <>
      <TitleBox
        title="Events"
        subtitle="All university events and social events"
      />
      <ItemList category={PortfolioCategory.EVENTS} />
    </>
  );
};

export { EventPage };
