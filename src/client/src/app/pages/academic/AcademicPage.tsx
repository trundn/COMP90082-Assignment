import * as React from 'react';
import { useState, useEffect, useContext, Fragment } from 'react';
import { TitleBox } from '../../portfolio-shared/TitleBox';
import { Swiper, SwiperSlide } from 'swiper/react';

import axios from 'axios';

import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Virtual,
} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import {
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
  Card,
  CardColumns,
  CardDeck,
  CardGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import AcademicModal from '../academic/AcademicModal';
import AcademicVeiwModal from '../../components/academic/academicViewModal';
import UploadImageModal from '../../components/academic/uploadImageModal';
import {
  SingalImage,
  Academic,
  AcademicModels,
} from '@pure-and-lazy/api-interfaces';

import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';

import { initialValues } from '../academic/initialAcademicValues';
import Confirmation from '../../components/ui/modals/Confirmation';
import { __values } from 'tslib';
import DeleteImageModal from '../../components/academic/deleteImageModal';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Virtual]);


const AcademicPage = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [alertMessage, setAlertMessage] = useState('');

  const editMode = useContext(EditContext);
  const { _id } = useContext(UserContext);

  const [academicData, setAcademicData] = useState<AcademicModels>();
  // show modal
  const [modalShow, setModalShow] = useState(false);

  const [saveData, setSaveDate] = useState<AcademicModels>();
  const [selectAcademic, setSelectAcademic] = useState<Academic>(initialValues);
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);
  const [viewAcademic, setViewAcademic] = useState<Academic>(initialValues);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [deleteImageModalShow,setDeleteImageModalShow] = useState(false);

  useEffect(() => {
    if (_id) {
      fetchAcademicData();
    }
  }, [_id]);

  const fetchAcademicData = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `/api/academics/${_id}`,
      });
      setAcademicData(result.data as AcademicModels);
    } catch (error) {
      console.log('Failed to fetch resume data', error);
    }
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    window.setTimeout(() => {
      setAlertMessage('');
    }, 2000);
  };

  const handleAcademicSubmit = (
    values: Academic,
    isAddMoreAcademic: boolean
  ): void => {
    setModalShow(false);
    if (isAddMoreAcademic) {
      const foundExistAca = academicData.academics?.find(
        (item) => item.title.toLowerCase() === values.title.toLowerCase()
      );

      if (foundExistAca) {
        showAlertMessage(
          'The degree in the same institution was already added.'
        );
      } else {
        const newAcademic = cloneAcademic(values);
        newAcademic.uuid = uuidv4();
        addAcademic(newAcademic);
      }
    } else {
      const update_Academic = cloneAcademic(values);
      updateAcademic(update_Academic);
    }
  };

  const addAcademic = async (newAcademic: Academic) => {
    try {
      const token = await getAccessTokenSilently();
      await axios({
        method: 'PUT',
        url: `/api/academics/add_academic`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          _id: academicData._id,
          academic: newAcademic,
        },
      });
      setAcademicData((prevState) => {
        return {
          ...prevState,
          academics: [newAcademic, ...prevState.academics],
        };
      });
    } catch (error) {
      console.log('Failed to add Academic', error);
    }
  };

  const updateAcademic = async (updateAcademic: Academic) => {
    try {
      const token = await getAccessTokenSilently();
      await axios({
        method: 'put',
        url: `/api/academics/update_academic`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          _id: academicData._id,
          academic: updateAcademic,
        },
      });
      setAcademicData((prevState) => {
        return {
          ...prevState,
          academics: prevState.academics.map<Academic>((academic) => {
            return updateAcademic.uuid == academic.uuid
              ? updateAcademic
              : academic;
          }),
        };
      });
    } catch (error) {
      console.log('Failed to update Academic', error);
    }
  };

  const cloneAcademic = (academic: Academic): Academic => {
    const newAcademic = { ...academic };
    return newAcademic;
  };

  const editAndDeletdButton = (onEditClick, onDeleteClick): JSX.Element => {
    if (editMode) {
      return (
        <Row>
          <Col xs={1} className="align-self-right">
            <span>
              <FontAwesomeIcon
                onClick={onEditClick}
                icon={faEdit}
                size="lg"
                color="#28a745"
                className="mr-2"
              />
            </span>
          </Col>
          <Col xs={1} className="align-self-center">
            <span>
              <FontAwesomeIcon
                onClick={onDeleteClick}
                icon={faTrashAlt}
                size="lg"
                color="#dc3545"
              />
            </span>
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  };

  const bindEditableButtons = (academic: Academic): JSX.Element => {
    return editAndDeletdButton(
      () => handleAcademicEdit(academic, true),
      () => handleAcademicDelete(academic, true)
    );
  };

  const handleAcademicEdit = (academic: Academic, status: boolean) => {
    setSelectAcademic(academic);
    setModalShow(status);
    // setModalShows((prevState) => {
    //   return { ...prevState, [resumeType]: status };
    // });
  };

  const handleAcademicDelete = (academic: Academic, status: boolean) => {
    setSelectAcademic(academic);
    setDeleteConfirmationShow(status);
  };

  const handleAcademicDeleteConfirm = (value: boolean) => {
    if (value) {
      deleteAcademic(selectAcademic);
      setSelectAcademic(null);
    }
    setDeleteConfirmationShow(false);
  };

  const deleteAcademic = async (deleteAcademic: Academic) => {
    try {
      const token = await getAccessTokenSilently();
      await axios({
        method: 'PUT',
        url: `/api/academics/delete_academic`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          _id: academicData._id,
          academic_uuid: deleteAcademic.uuid,
        },
      });
      fetchAcademicData();
    } catch (error) {
      console.log('Failed to delete Academic', error);
    }
  };

  const handleImageSubmit = async (newImage: SingalImage) => {
    setImageModalShow(false);
    try {
      newImage.uuid = uuidv4();
      const token = await getAccessTokenSilently();
      await axios({
        method: 'PUT',
        url: `/api/academics/add_image`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          _id: academicData._id,
          singalImage: newImage,
        },
      });
      setAcademicData((prevState) => {
        return {
          ...prevState,
          images: [newImage, ...prevState.images],
        };
      });
    } catch (error) {
      console.log('Failed to add image', error);
    }
  };

  const handleImageDelete = async (newImage: SingalImage) => {
    setDeleteImageModalShow(false);
    console.log(newImage)
    try {
      const token = await getAccessTokenSilently();
      await axios({
        method: 'PUT',
        url: `/api/academics/delete_image`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          _id: academicData._id,
          singalImage: newImage,
        },
      });
      fetchAcademicData();
    } catch (error) {
      console.log('Failed to delete image', error);
    }
  };

  const singleCard = (): JSX.Element[] => {
    let allCards: JSX.Element[] = null;

    if (academicData) {
      if (editMode) {
        allCards = academicData?.academics?.map((academic) => {
          return (
            <Card style={{ width: '30rem' }}>
              <Card.Img variant="top" src={academic.academicImage} />
              <Card.Body>
                <Card.Title>Title : {academic.title}</Card.Title>
                <Card.Text>Author: {academic.author}</Card.Text>
                <Card.Text>
                  Short Description: {academic.shortDescription}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {bindEditableButtons(academic)}
                <Button
                  onClick={() => {
                    setViewModalShow(true);
                    setViewAcademic(academic);
                  }}
                >
                  View
                </Button>
              </Card.Footer>
            </Card>
          );
        });
      } else {
        allCards = academicData?.academics?.map((academic) => {
          return (
            <Card style={{ width: '30rem' }}>
              <Card.Img variant="top" src={academic.academicImage} />
              <Card.Body>
                <Card.Title>Title : {academic.title}</Card.Title>
                <Card.Text>Author: {academic.author}</Card.Text>
                <Card.Text>
                  Short Description: {academic.shortDescription}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  onClick={() => {
                    setViewModalShow(true);
                    setViewAcademic(academic);
                  }}
                >
                  View
                </Button>
              </Card.Footer>
            </Card>
          );
        });
      }
    }

    return allCards;
  };

  const swiperSlides = [];
  var len = academicData?.images.length;
  for (let num = 0; num < len; num++){
    swiperSlides.push(
      <SwiperSlide key={`slide-${num}`}>
        <img src={academicData.images[num].imageUrl} />
      </SwiperSlide>
    )
  }

  if (editMode) {
    return (
      <>
        <TitleBox
          title="Academic"
          subtitle="My academics and academic picture."
        />
        <React.StrictMode></React.StrictMode>
        <Container fluid="xl">
          <Swiper
            className="swiper_con"
            spaceBetween={2}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
          {swiperSlides}
          </Swiper>
        </Container>
        <AcademicModal
          show={modalShow}
          onClose={() => {
            setModalShow(false);
          }}
          onSubmit={handleAcademicSubmit}
          selectedAcademic={selectAcademic}
        />
        <AcademicVeiwModal
          show={viewModalShow}
          onClose={() => {
            setViewModalShow(false);
            // setViewAcademic(initialValues);
          }}
          selectedAcademic={viewAcademic}
        />
        <UploadImageModal
          show={imageModalShow}
          onClose={() => {
            setImageModalShow(false);
          }}
          onSubmit={handleImageSubmit}
        />
        <DeleteImageModal 
          show={deleteImageModalShow}
          onClosed={() => {
            setDeleteImageModalShow(false);
          }}
          academicModels={academicData}
          onSubmit={handleImageDelete}
        />
        <Container>
          <Row className="justify-content-center ">
            <Col md="auto">
              <ButtonGroup aria-label="button_group">
                <Button
                  variant="primary"
                  onClick={() => {
                    setImageModalShow(true);
                  }}
                >
                  Add Image
                </Button>
                <Button variant="primary" onClick={() => {
                  setDeleteImageModalShow(true);
                }}>Delete Image</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setModalShow(true);
                    setSelectAcademic(initialValues);
                  }}
                >
                  Add Academic
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
        <Confirmation
          show={deleteConfirmationShow}
          onConfirm={handleAcademicDeleteConfirm}
          title="Delete"
          confirmation="Are you sure you want to delete this?"
          okText="Confirm Delete"
          cancelText="Cancel"
          okButtonStyle="danger"
          cancelButtonStyle="secondary"
        />
        <Container fluid="xl" css="margin-bottom: 70px"><Row xs="3" css="">{singleCard()}</Row></Container>
      </>
    );
  } else {
    return (
      <>
        <TitleBox
          title="Academic"
          subtitle="My academics and academic picture."
        />
        <AcademicVeiwModal
            show={viewModalShow}
            onClose={() => {
              setViewModalShow(false);
              // setViewAcademic(initialValues);
            }}
            selectedAcademic={viewAcademic}
        />
        <Container fluid="xl" css="margin-bottom: 70px">
          <Swiper
            className="swiper_con"
            spaceBetween={5}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
          {swiperSlides}
          </Swiper>
          <Row xs="3">{singleCard()}</Row>
        </Container>
      </>
    );
  }
};

export { AcademicPage };
