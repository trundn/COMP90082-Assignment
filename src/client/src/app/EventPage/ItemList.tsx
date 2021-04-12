import {
  PortfolioCategory,
  PortfolioItem,
} from '@pure-and-lazy/api-interfaces';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Loader } from '../layout/Loader';
import { EditContext } from '../portfolio-shared/EditContext';
import { PortfolioAddButton } from '../portfolio-shared/PortfolioAddButton';
import { UserContext } from '../portfolio-shared/UserContext';
import { getPortfolioItems, getOwnPortfolioItems } from './EventUtils';
import { useAuth0 } from '@auth0/auth0-react';
import { EmptyList } from './EmptyList';
import { SearchFilter } from '../projects/SearchFilter';
import { NoResults } from '../projects/NoResults';
import { EventItem } from './EventItem';

interface ItemList {
  category: PortfolioCategory;
}

const ItemList = (props: ItemList) => {
  const editMode = useContext(EditContext);
  const { username } = useContext(UserContext);
  const [items, setItems] = useState([] as Array<PortfolioItem>);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  // This is kinda gross
  const loadItems = useCallback(() => {
    const promise: Promise<Array<PortfolioItem>> = editMode
      ? getOwnPortfolioItems(props.category, getAccessTokenSilently)
      : getPortfolioItems(username, props.category);
    console.log(promise);
    promise
      .then((r) => setItems(r))
      .then(() => setLoaded(true))
      .catch((e) => {
        console.log(e);
      });
  }, [props, username, editMode, getAccessTokenSilently]);

  //Update Items on Load
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // console.log(items)
  const itemComponents = items
    .filter((item: PortfolioItem) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((item) => (
      <EventItem key={item._id} onUpdate={loadItems} itemInfo={item} />
    ));

  return (
    <Container className="pt-5 mb-5 pb-5">
      <Row>
        <Col>
          <SearchFilter value={filter} onChange={setFilter} />
        </Col>
      </Row>
      <Loader loaded={loaded}>
        {itemComponents.length === 0 ? (
          filter.length === 0 ? (
            <EmptyList category={props.category} />
          ) : (
            <NoResults />
          )
        ) : (
          // Change it to map, everyone is one line?
          <Row>{itemComponents} </Row>
        )}
      </Loader>
      {editMode && (
        <Row className="align-items-center my-5">
          <PortfolioAddButton onAdd={loadItems} category={props.category} />
        </Row>
      )}
    </Container>
  );
};

export { ItemList };
