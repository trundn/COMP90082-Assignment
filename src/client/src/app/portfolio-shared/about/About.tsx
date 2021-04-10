import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Col, Row } from 'react-bootstrap';
import { AboutDisplay } from './AboutDisplay';
import { AboutEditor } from './AboutEditor';
import { updateDescription,updateMedialinks } from '../../admin/AdminUtils';
import { UserContext } from '../UserContext';
import { HomeAvatar } from '../../homepage/HomeAvatar';
import { ThemedBackgroundContainer } from '../ThemedBackgroundContainer';
import { css } from '@emotion/core';

import { MediaLink} from './MediaLink';

/* TODO:
1. Update this page to add new content area to show the connect me info.

2. Update line 22 to read the media link info from UserContext.

3. Update Usercontext.ts(line 7) to add media link to the info included in UserContext.

4. Update '\src\client\src\app\portfolio-shared\LoggedInUserContextProvider.tsx'
   to add the fetch of media links when login.

5. Update 'src\libs\api-interfaces\src\lib\api-interfaces.ts'
   to change content of 'UserProfile' to include medialinks. ????????

6. Update 'src\server\src\models\user.ts' to change data model.
    and change toProfile(). I guess yes. ??????

7. Router not clear now. 
  'src\client\src\app\App.tsx' in client has basic structure of router. 
      line 54 <PortfolioIndex />
          line 73 <About />

    For 'src\server\src\controller\portfolioController.ts'
    what is actual usage of 'viewProfile'?
    'editProfile' works as an update of userprofile? Need change or not?what page links to it?
8. Update 'src\client\src\app\admin\AdminUtils.tsx' to include the update of
    media info.   
       
*/

const About = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [editorOpen, setEditorOpen] = useState(false);
  //Description是About Meeditor里的内容，这里是从数据库里取用的接口内容
  const { description, setDescription, profilePicture, 
    twitteLink, facebookLink,githubLink,linkedinLink, 
    settwitteLink,setfacebookLink,setgithubLink,setlinkedinLink } = useContext(
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



  /*delete for function changes
  const handleSubmit = async (newMedialinks: []) => {
    try {
      await updateMedialinks(newMedialinks, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }
    //setEditorOpen(false);
    //setSaveButtonDisabled(false);
    setMedialinks(newMedialinks);
  };*/

  return (
    <ThemedBackgroundContainer>
      <Container className="pt-5">
        <Row>
          <Col sm={4} xs={12} className="pr-sm-5" css={profilePictureStyle}>
            <HomeAvatar image={profilePicture} />
          </Col>
          <Col sm={8} xs={12} className="pl-sm-5" css={descriptionStyle}>
            <Container className="p-4 mx-auto" style={containerStyle}>
              <AboutEditor
                initialDescription={description}
                editorSaveButtonDisabled={editorSaveButtonDisabled}
                onCancel={handleCancel}
                onSave={handleSave}
                show={editorOpen}
              />
              <AboutDisplay
                description={description}
                onOpenEditor={handleOpenEditor}
              />
              <MediaLink
                twitteLink={twitteLink}
                facebookLink={facebookLink}
                githubLink={githubLink}
                linkedinLink={linkedinLink}
                //onSubmit = {handleSubmit}
              />

            </Container>
          </Col>
        </Row>
      </Container>
    </ThemedBackgroundContainer>
  );
};

export { About };
