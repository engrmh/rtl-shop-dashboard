import React, { useEffect, useState } from "react";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import { Button, Form, Modal, Table } from "react-bootstrap";
import AcceptModal from "../../Components/AcceptModal/AcceptModal";
import EditModal from "../../Components/EditModal/EditModal";
import { BiSolidCity, BiText } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail, MdOutlinePayment, MdPassword } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { GrScorecard } from "react-icons/gr";
import DetailsModal from "../../Components/DetailsModal/DetailsModal";
export default function Users() {
  const [allUsers, setAllUsers] = useState([]);

  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const [currentUserID, setCurrentUserID] = useState(null);

  const [firstnameValue, setFirstnameValue] = useState("");
  const [lastnameValue, setLastnameValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [scoreValue, setScoreValue] = useState("");
  const [buyValue, setBuyValue] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:8000/api/users/")
      .then((res) => res.json())
      .then((json) => setAllUsers(json));
  };

  const deleteUser = (action) => {
    if (action) {
      fetch(`http://localhost:8000/api/users/${currentUserID}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(async (json) => {
          if (!json.fieldCount) {
            getAllUsers();
          }
        });
    }
  };

  const editUser = (action) => {
    if (action) {
      const newUserData = {
        firsname: setFirstnameValue,
        lastname: setLastnameValue,
        username: setUsernameValue,
        password: setPasswordValue,
        phone: setPhoneValue,
        city: setCityValue,
        email: setEmailValue,
        address: setAddressValue,
        score: setScoreValue,
        buy: setBuyValue,
      };

      fetch(`http://localhost:8000/api/users/${currentUserID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      })
        .then((res) => res.json())
        .then(async (json) => {
          if (!json.fieldCount) {
            getAllUsers();
          }
        });
    }
  };

  const closingDetailModalHandler = (status) => {
    setIsShowDetailsModal(status);
  };
  const closingDeleteModalHandler = (status) => {
    setIsShowDeleteModal(status);
  };
  const closingEditModalHandler = (status) => {
    setIsShowEditModal(status);
  };

  return (
    <div>
      {allUsers ? (
        <div className="shadow p-3">
          <h2 className="mb-4 border-bottom border-black pb-2">لیست کابران</h2>
          <Table borderless>
            <thead className="border-bottom border-dark">
              <tr className="text-center">
                <th>اسم و فامیلی کاربر</th>
                <th>نام کاربری</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {allUsers.map((user, index) => (
                <tr key={index}>
                  <th>
                    {user.firsname} - {user.lastname}
                  </th>
                  <th>{user.username}</th>
                  <th>{user.password}</th>
                  <th>{user.phone}</th>
                  <th>{user.email}</th>
                  <th>
                    <Button
                      className="mx-1 text-white border-0 bg-danger"
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setCurrentUserID(user.id);
                      }}
                    >
                      حذف
                    </Button>
                    <Button
                      className="mx-1 text-white border-0"
                      style={{ backgroundColor: "var(--blue)" }}
                      onClick={() => {
                        setIsShowDetailsModal(true);
                        setUsernameValue(user.username);
                        setCityValue(user.city);
                        setAddressValue(user.address);
                        setScoreValue(user.score);
                        setBuyValue(user.buy);
                      }}
                    >
                      جزتیات
                    </Button>
                    <Button
                      className="mx-1 text-white border-0"
                      style={{ backgroundColor: "var(--blue)" }}
                      onClick={() => {
                        setIsShowEditModal(true);
                        setCurrentUserID(user.id);
                        setFirstnameValue(user.firsname);
                        setLastnameValue(user.lastname);
                        setUsernameValue(user.username);
                        setPasswordValue(user.password);
                        setPhoneValue(user.phone);
                        setCityValue(user.city);
                        setEmailValue(user.email);
                        setAddressValue(user.address);
                        setScoreValue(user.score);
                        setBuyValue(user.buy);
                      }}
                    >
                      ویرایش
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <ErrorBox msg={"هیچ کاربری یافت نشد"} />
      )}
      {isShowDeleteModal && (
        <AcceptModal
          title="حذف"
          context="ایا برای حذف اطمینان دارید؟"
          onGetAction={(action) => deleteUser(action)}
          showStatus={isShowDeleteModal}
          onClose={(status) => closingDeleteModalHandler(status)}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal
          showStatus={isShowDetailsModal}
          onClose={(status) => closingDetailModalHandler(status)}
        >
          <Modal.Header className="text-center">
            <Modal.Title>جزییات کاربر</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table borderless>
              <thead>
                <tr className="text-center border-bottom border-black">
                  <th>نام کاربری</th>
                  <th>شهر</th>
                  <th>آدرس</th>
                  <th>امتیاز</th>
                  <th>میزان خرید</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>{usernameValue}</td>
                  <td>{cityValue}</td>
                  <td>{addressValue}</td>
                  <td>{scoreValue}</td>
                  <td>{buyValue}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal
          onSendStatusForEditing={(action) => editUser(action)}
          isOpening={isShowEditModal}
          onClose={(status) => closingEditModalHandler(status)}
        >
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <BiText className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="text"
                value={firstnameValue}
                onChange={(event) => setFirstnameValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <BiText className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="text"
                value={lastnameValue}
                onChange={(event) => setLastnameValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <FaUser className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="text"
                value={usernameValue}
                onChange={(event) => setUsernameValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <MdPassword className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="text"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <BsTelephoneFill className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="tel"
                value={phoneValue}
                onChange={(event) => setPhoneValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <BiSolidCity className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="text"
                value={cityValue}
                onChange={(event) => setCityValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <MdAlternateEmail className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="email"
                value={emailValue}
                onChange={(event) => setEmailValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <AiFillHome className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                as="textarea"
                value={addressValue}
                onChange={(event) => setAddressValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <GrScorecard className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="number"
                value={scoreValue}
                onChange={(event) => setScoreValue(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center bg-secondary bg-opacity-25 rounded my-2 px-2">
              <MdOutlinePayment className="ms-2 text-black fs-4" />
              <Form.Control
                className="bg-transparent border-0"
                type="number"
                value={buyValue}
                onChange={(event) => setBuyValue(event.target.value)}
              />
            </Form.Group>
          </Form>
        </EditModal>
      )}
    </div>
  );
}
