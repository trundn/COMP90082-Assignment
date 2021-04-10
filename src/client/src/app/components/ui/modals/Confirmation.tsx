import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmationProps {
  title: string;
  confirmation: string;
  okText: string;
  cancelText: string;
  okButtonStyle:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  cancelButtonStyle:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  show: boolean;
  onConfirm: (value: boolean) => void;
}

const Confirmation = ({
  show,
  onConfirm,
  title,
  confirmation,
  okText,
  cancelText,
  okButtonStyle,
  cancelButtonStyle,
  ...options
}: ConfirmationProps) => {
  const header = title ? (
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
  ) : null;

  return (
    <Modal
      {...options}
      size="sm"
      show={show}
      onHide={() => onConfirm(false)}
      backdrop="static"
      centered
    >
      {header}
      <Modal.Body>{confirmation}</Modal.Body>
      <Modal.Footer>
        <Button variant={cancelButtonStyle} onClick={() => onConfirm(false)}>
          {cancelText}
        </Button>
        <Button variant={okButtonStyle} onClick={() => onConfirm(true)}>
          {okText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;
