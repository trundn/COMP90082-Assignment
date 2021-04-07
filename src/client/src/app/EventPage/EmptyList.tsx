import React, { useContext } from 'react';
import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
import { Container, Row } from 'react-bootstrap';
import { EditContext } from '../portfolio-shared/EditContext';

interface EmptyList {
  category: PortfolioCategory;
}

const EmptyList = (props: EmptyList) => {
  const isEditMode = useContext(EditContext);
  const largeText = 'No events yet';
  const subtext1 = 'Show off some amazing events';
  const subtext2 = "Click 'Add Event' to add a event to your portfolio";
  return (
    <Container>
      <Row className="mt-3">
        <h1
          className="text-center m-auto display-4"
          css={{ font: 'Roboto', fontWeight: 600 }}
        >
          {largeText}
        </h1>
      </Row>
      {isEditMode && (
        <Row className="mt-5">
          <p className="text-center m-auto " css={{ font: 'Roboto' }}>
            {subtext1} {'\n'} <br />
            {subtext2}
          </p>
        </Row>
      )}
    </Container>
  );
};

export { EmptyList };
