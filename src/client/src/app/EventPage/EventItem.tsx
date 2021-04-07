import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectItemEditor } from '../projects/editor/ProjectItemEditor';
import { EventItemDisplay } from './EventItemDisplay';
import { deleteEventItem, updateEventItem } from './EventUtils';
import {
  PortfolioItem,
  PortfolioItemValue,
} from '@pure-and-lazy/api-interfaces';

interface EventItem {
  onUpdate: () => void;
  itemInfo: PortfolioItem;
}

const EventItem = (props: EventItem) => {
  const { _id: id, name: title, image, description } = props.itemInfo;
  const isPublic = !!props.itemInfo.public;
  const { getAccessTokenSilently } = useAuth0();

  const [info, setInfo] = useState(props.itemInfo);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const handleCancel = () => {
    setInfo(props.itemInfo);
    setEditorOpen(false);
  };
  const handleOpenEditor = () => setEditorOpen(true);

  const { pathname } = useLocation();
  const contentURL = pathname + '/' + id;
  const handleSave = async () => {
    setSaveButtonDisabled(true);
    try {
      await updateEventItem(info, id, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }
    setEditorOpen(false);
    setSaveButtonDisabled(false);
    props.onUpdate();
  };

  const handleDelete = async () => {
    try {
      await deleteEventItem(id, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }

    props.onUpdate();
    setEditorOpen(false);
  };

  const handleUpdateItem = (
    key: keyof PortfolioItem,
    value: PortfolioItemValue
  ) => {
    // Update key value pair while preserving other values
    setInfo({ ...info, [key]: value });
  };
  return (
    <>
      <ProjectItemEditor
        initialInfo={props.itemInfo}
        infoState={info}
        onUpdateItem={handleUpdateItem}
        editorSaveButtonDisabled={editorSaveButtonDisabled}
        onCancel={handleCancel}
        onSave={handleSave}
        show={editorOpen}
      />
      <EventItemDisplay
        title={title}
        image={image}
        link={contentURL}
        description={description}
        onOpenEditor={handleOpenEditor}
        onDelete={handleDelete}
        isPublic={isPublic}
      />
    </>
  );
};

export { EventItem };
