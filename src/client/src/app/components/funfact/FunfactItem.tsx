import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { EditContext } from '../../portfolio-shared/EditContext';
import './Funfact.css';
import { v4 as uuidv4 } from 'uuid';


export default class FunfactItem extends Component {

  render() {
    return (
      <li className={'item'}>
        <div className={'content'}>
          <p className={'date'}>
            <time>28 May 2020</time>
          </p>
          <div className={'event-details'}>
            <h3>
              <a href="wwww.google.com">When JavaScript Bytes</a>
            </h3>
            <span className={'hoster'}>Hoster: Yangfan</span>
            <span className={'location'}>Location: Carlton</span>
          </div>
        </div>
        <div className={'buttons'}>
          <span>
            <FontAwesomeIcon
              // onClick={onEditClick}
              icon={faEdit}
              size="lg"
              color="#28a745"
              className="mr-2"
             
            />
            <FontAwesomeIcon
              // onClick={onDeleteClick}
              icon={faTrashAlt}
              size="lg"
              color="#dc3545"
              
            />
          </span>
        </div>
      </li>
    );
  }
}