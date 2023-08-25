import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";

export default function AcceptModal({
  title,
  context,
  onGetAction,
  showStatus,
  onClose,
}) {
  const [isShow, setIsShow] = useState(showStatus);

  return ReactDOM.createPortal(
    <Modal
      show={isShow}
      onHide={() => {
        setIsShow(false);
        onClose(false);
      }}
      centered
    >
      <Modal.Header className="text-center">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{context}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          style={{ backgroundColor: "var(--blue)" }}
          className="border-0"
          onClick={() => {
            setIsShow(false);
            onGetAction(false);
            onClose(false);
          }}
        >
          بستن
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setIsShow(false);
            onGetAction(true);
            onClose(false);
          }}
        >
          بله
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("modals-container")
  );
}
