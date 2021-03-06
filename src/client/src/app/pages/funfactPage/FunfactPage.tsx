import React, { useState, useEffect, useContext, } from 'react';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Row} from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';

import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';
import './funfactPage.css';
import FunfactModal from '../../components/funfact/FunfactModal';
import { Funfact,Funfacts } from '@pure-and-lazy/api-interfaces';
import Confirmation from '../../components/ui/modals/Confirmation';
import { initialFunfactValues,defaultTypesValues } from '../../constants/funfactInitValues';
import { FunfactSectionTypes } from '../../constants/funfactConstant';

const FunfactPage = () => {
 // Pre-pared content
 const [FunfactData, setFunfactData] = useState<Funfacts>();
 const [selectedFunfact, setSelectedFunfact] = useState<Funfact>(initialFunfactValues);
 
 // Control Modal
 const [modalShow, setModalShow] = useState(false);
 const [show, setShow] = useState(false);
 const [modalShows, setModalShows] = useState<{
    [funfactType: string]: boolean;
  }>(defaultTypesValues);

  // Control Confirmation
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);
  const [deleteTargetKind, setDeleteTargetKinds] = useState<{
      [funfactsType: string]: boolean;
    }>(defaultTypesValues);

  // login way
  const editMode = useContext(EditContext);
  const { _id } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();


   // Get funfact data
   useEffect(() => {
    fetchFunfactData();
   }, []);
   const fetchFunfactData = async () => {
     try {
       const result = await axios({
         method: 'GET',
         url: `/api/funfact/${_id}`,
       });
       setFunfactData(result.data as Funfacts);
     } catch (error) {
       console.log('Failed to fetch funfact data', error);
     }
   };

     // Change modal statue
  const updateModalShowStatus = (funfactType: string, status: boolean): void => {
    setModalShows((prevState) => {
      return { ...prevState, [funfactType]: status };
    });
  };

   const buildFunfactsSection = (
    contentBuilder: (() => JSX.Element[]) | (() => JSX.Element),
    sectionType: FunfactSectionTypes
  ): JSX.Element => {
    return (
      <Container className="row-separator">
        <Row>
          <Col md={8}>{contentBuilder()}</Col>
        </Row>
        {editMode && (
          <Row>
            <Col md="auto">
              <Button
                onClick={() => {
                  setSelectedFunfact(initialFunfactValues);
                  updateModalShowStatus(sectionType, true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Funfact
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    );
  };

  // Display funfact item to webpage
  const buildFunfactSection = (): JSX.Element[] => {
    let funfactEls: JSX.Element[] = null;
    if (FunfactData) {
      funfactEls = FunfactData.funfacts
        .map((funfact) => {
          return (
            <Row key={funfact.uuid}>
              <Col xs={editMode ? 10 : 12}>
                <div>
                  <h5>{funfact.factName}</h5>
                  <h5>Funfact details: {funfact.factDetail}</h5>
                </div>
              </Col>
              {bindEditaAndDeletebleButton(funfact, FunfactSectionTypes.Funfact)}
            </Row>
          );
        });
    }
    return funfactEls;
  };

 const handleFunfactSubmit = (values: Funfact,isAddMoreAction:boolean): void => {
  const newFunfact = cloneFunfact(values);
  updateModalShowStatus(FunfactSectionTypes.Funfact, false);
  if (isAddMoreAction) {
    console.log('isAddMoreAction is true');
    const foundFunfact = FunfactData.funfacts.find(
      (item) => item.factName.toLowerCase() == values.factName.toLowerCase()
     );
    if (foundFunfact) {
      alert('The same funfact was already added.');
    } else {
      const newFunfact = { ...values };
      newFunfact.uuid = uuidv4();
      addFunfact(newFunfact);
    }
  } else {
    const newFunfact = { ...values };
    updateFunfact(newFunfact);
  }
};

 // Display "edit" and "delete" button
 const buildEditaAndDeletebleButton = (
  onEditClick,
  onDeleteClick
): JSX.Element => {
  if (editMode) {
    return (
      <Col xs={2} className="align-self-center">
        <span>
          <FontAwesomeIcon
            onClick={onEditClick}
            icon={faEdit}
            size="lg"
            color="#28a745"
            className="mr-2"
          />
          <FontAwesomeIcon
            onClick={onDeleteClick}
            icon={faTrashAlt}
            size="lg"
            color="#dc3545"
          />
        </span>
      </Col>
    );
  } else {
    return null;
  }
};
// bind actions to "edit" and "delete" button
  const bindEditaAndDeletebleButton = (
    targetVal: any,
    targetKind: FunfactSectionTypes
  ): JSX.Element => {
    return buildEditaAndDeletebleButton(
      () => handleUpdateAction(targetVal, targetKind, true),
      () => handleDeleteAction(targetVal, targetKind, true)
    );
  };

  // handle Update button
  const handleUpdateAction = (
    targetVal: any,
    targetKind: string,
    status: boolean
  ): void => {
    // console.log('handleEditAction');
    updateSelectedEventPart(targetKind, targetVal);
    updateModalShowStatus(targetKind, status);
  };
  const updateSelectedEventPart = (targetKind: string, targetVal: any) => {
    if (targetKind === FunfactSectionTypes.Funfact) {
      setSelectedFunfact(targetVal);
    }
  };
  const handleFunfactModalCloseClick = () => {
    updateModalShowStatus(FunfactSectionTypes.Funfact, false);
  };
    // handle Delete button
    const handleDeleteAction = (
      targetVal: any,
      targetKind: string,
      status: boolean
    ): void => {
      updateSelectedEventPart(targetKind, targetVal);
      setDeleteConfirmationShow(true);
      setDeleteTargetKinds((prevState) => {
        return { ...prevState, [targetKind]: status };
      });
    };

    const handleConfirmDelete = (value: boolean) => {
      if (value) {
        if (deleteTargetKind[FunfactSectionTypes.Funfact]) {
          deleteFunfact(selectedFunfact);
          setSelectedFunfact(null);
          setDeleteTargetKinds((prevState) => {
            return { ...prevState, [FunfactSectionTypes.Funfact]: false };
          });
        }
      }
      setDeleteConfirmationShow(false);
    };
  
    const deleteFunfact = async (delFunfact: Funfact) => {
      try {
        const token = await getAccessTokenSilently();
        await axios({
          method: 'DELETE',
          url: `/api/funfact/delete`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            user: _id,
            funfactUUID: delFunfact.uuid,
          },
        });
  
        setFunfactData((prevState) => {
          return {
            ...prevState,
            funfacts: prevState.funfacts.filter<Funfact>(
              (fun): fun is Funfact => fun.uuid !== delFunfact.uuid
            ),
          };
        });
      } catch (error) {
        console.log('Failed to delete this funfact', error);
      }
    };


// Clone newFunfact data
const cloneFunfact = (funfact: Funfact): Funfact => {
  const newFunfact = { ...funfact };
  return newFunfact;
};

// Add newFunfact data
const addFunfact = async (newFunfact: Funfact) => {
  try {
    const token = await getAccessTokenSilently();
    await axios({
      method: 'PUT',
      // ????????????
      url: `/api/funfact/add`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        user: _id,
        funfact: newFunfact,
      },
    });
  } catch (error) {
    console.log('Failed to add Funfact', error);
  }
 };

  // Update funfact data
  const updateFunfact = async (updateFunfact: Funfact) => {
    try {
      const token = await getAccessTokenSilently();
       console.log("update", updateFunfact);
       console.log("update", _id);
      await axios({
        method: 'PUT',
        url: `/api/funfact/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          user: _id,
          funfact: updateFunfact,
        },
      });

      setFunfactData((prevState) => {
        return {
          ...prevState,
          funfacts: prevState.funfacts.map<Funfact>((funfact) => {
            return funfact.uuid === updateFunfact.uuid ? updateFunfact : funfact;
          }),
        };
      });
    } catch (error) {
      console.log('Failed to update funfacts', error);
    }
  };

 return (
   <div>
     <div className={'Header'}>
       <h1>Funfacts</h1>
     </div>
     <hr />
     <div>
       <FunfactModal
         selectedFunfact={selectedFunfact}
         show={modalShows[FunfactSectionTypes.Funfact]}
         onSubmit={handleFunfactSubmit}
         onClose={handleFunfactModalCloseClick}
       />
        <Confirmation
          show={deleteConfirmationShow}
          onConfirm={handleConfirmDelete}
          title="Delete Funfact"
          confirmation="Are you sure you want to delete this funfact?"
          okText="Yes"
          cancelText="Cancel"
          okButtonStyle="danger"
          cancelButtonStyle="secondary"
        />
       {/* All the newFunfacts are in here */}
       <ul>
       <Container>
          {buildFunfactsSection(buildFunfactSection, FunfactSectionTypes.Funfact)}
        </Container>
       </ul>
     </div>
     <hr />
   </div>
 );
};
  export { FunfactPage };
  