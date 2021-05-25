import { Container, Col, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { Pencil } from 'react-bootstrap-icons';
import { EditContext } from '../portfolio-shared/EditContext';
import React, { useContext, useEffect, useState } from 'react';
interface AboutDisplayManagaePage {
  description: string;
  onOpenEditor: () => void;
}

const AboutDisplayManagaePage = (props: AboutDisplayManagaePage) => {
  const contentStyle = {
    img: {
      maxWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
    },
  };
  const editMode = useContext(EditContext);

  if(editMode){
    return (
      <Container>
        <Row sm={10} style={{ wordWrap: 'break-word' }} className="ml-0">
          <ReactMarkdown
            source={props.description}
            escapeHtml={false}
            css={contentStyle}
          />
          <Col md={{ span: 3, offset: 4 }}>
            <Pencil
              onClick={props.onOpenEditor}
              className="pointer float-right"
            />
          </Col>
        </Row>
      </Container>
    );
  }
  else{
    return (
      <Container>
        <Row sm={10} style={{ wordWrap: 'break-word' }} className="ml-0">
          <ReactMarkdown
            source={props.description}
            escapeHtml={false}
            css={contentStyle}
          />
          
        </Row>
      </Container>
    );
  }
  
};

export { AboutDisplayManagaePage };
