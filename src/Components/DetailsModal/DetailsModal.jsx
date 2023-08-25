import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";

export default function DetailsModal({ children, showStatus, onClose }) {
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
      {children}
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          style={{ backgroundColor: "var(--blue)" }}
          className="border-0"
          onClick={() => {
            setIsShow(false);
            onClose(false);
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("modals-container")
  );
}
