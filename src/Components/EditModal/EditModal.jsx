import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";

export default function EditModal({
  children,
  onClose,
  onSendStatusForEditing,
  isOpening,
}) {
  const [isShow, setIsShow] = useState(isOpening);

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
        <Modal.Title>ویرایش محصول</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="">اطلاعات جدید را وارد نمایید:</h5>
        <div className="">{children}</div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          type="submit"
          style={{ backgroundColor: "var(--blue)" }}
          className="border-0"
          onClick={() => {
            setIsShow(false);
            onSendStatusForEditing(true);
            onClose(false);
          }}
        >
          ثبت اطلاعات جدید
        </Button>
        <Button
          style={{ backgroundColor: "var(--blue)" }}
          className="border-0"
          onClick={() => {
            onClose(false);
            setIsShow(false);
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("modals-container")
  );
}
