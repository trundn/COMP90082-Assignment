import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Col, Row } from 'react-bootstrap';
import { updateDescription,updateMedialinks } from '../admin/AdminUtils';
import { UserContext } from './UserContext';
import { HomeAvatar } from '../homepage/HomeAvatar';
import { ThemedBackgroundContainer } from './ThemedBackgroundContainer';
import { css } from '@emotion/core';

const FunfactPage = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [editorOpen, setEditorOpen] = useState(false);
    //Description是About Meeditor里的内容，这里是从数据库里取用的接口内容
    const { description, setDescription, profilePicture, 
      twitterLink, facebookLink,githubLink,linkedinLink, 
      settwitterLink,setfacebookLink,setgithubLink,setlinkedinLink } = useContext(
      UserContext
    );
  
    const containerStyle = {
      backgroundColor: 'white',
      overflow: 'auto',
      height: '100%',
    };
  
    const profilePictureStyle = {
      marginTop: '18%',
      '@media (max-width: 576px)': {
        marginTop: '0%',
      },
    };
  
    const descriptionStyle = {
      marginTop: '18%',
      paddingBottom: '120px',
    };
  
    const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);
  
    const handleCancel = () => {
      setEditorOpen(false);
    };
    const handleOpenEditor = () => {
      setEditorOpen(true);
    };
  
    const handleSave = async (newDescription: string) => {
      setSaveButtonDisabled(true);
      try {
        await updateDescription(newDescription, getAccessTokenSilently);
      } catch (e) {
        console.log(e);
      }
      setEditorOpen(false);
      setSaveButtonDisabled(false);
      setDescription(newDescription);
    };
  

    return (
        <ThemedBackgroundContainer>
        <Container className="pt-5">
          <Row>
            <Col sm={12} xs={12} className="pl-sm-5" css={descriptionStyle}>
              <Container className="p-4 mx-auto" style={containerStyle}>

  
              </Container>
            </Col>
          </Row>
        </Container>
      </ThemedBackgroundContainer>
    );
  };
  
  export { FunfactPage };
  