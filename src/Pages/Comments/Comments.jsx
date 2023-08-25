import React, { useEffect, useState } from "react";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import { Button, Form, Table } from "react-bootstrap";
import DetailsModal from "../../Components/DetailsModal/DetailsModal";
import EditModal from "../../Components/EditModal/EditModal";
import AcceptModal from "../../Components/AcceptModal/AcceptModal";

export default function Comments() {
  const [allComments, setAllComments] = useState();
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [currentCommentID, setCurrentCommentID] = useState(null);

  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptingModal, setIsShowAcceptingModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);

  useEffect(() => {
    getComents();
  }, []);

  const getComents = () => {
    fetch("http://localhost:8000/api/comments/")
      .then((res) => res.json())
      .then((json) => setAllComments(json));
  };

  const deleteComment = (action) => {
    if (action) {
      fetch(`http://localhost:8000/api/comments/${currentCommentID}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(async (json) => {
          if (!json.fieldCount) {
            getComents();
          }
        });
    }
  };

  const editComment = (action) => {
    if (action) {
      fetch(`http://localhost:8000/api/comments/${currentCommentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: mainCommentBody,
        }),
      })
        .then((res) => res.json())
        .then(async (json) => {
          if (!json.fieldCount) {
            getComents();
          }
        });
    }
  };

  const acceptComment = (action) => {
    if (action) {
      fetch(`http://localhost:8000/api/comments/${currentCommentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAccept: 1,
        }),
      })
        .then((res) => res.json())
        .then(async (json) => {
          console.log(json);
          if (!json.fieldCount) {
            getComents();
          }
        });
    }
  };
  const rejectComment = (action) => {
    if (action) {
      fetch(`http://localhost:8000/api/comments/${currentCommentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAccept: 0,
        }),
      })
        .then((res) => res.json())
        .then(async (json) => {
          console.log(json);
          if (!json.fieldCount) {
            getComents();
          }
        });
    }
  };

  const closingDetailModalHandler = (status) => {
    setIsShowDetailModal(status);
  };
  const closingDeleteModalHandler = (status) => {
    setIsShowDeleteModal(status);
  };
  const closingEditModalHandler = (status) => {
    setIsShowEditModal(status);
  };
  const closingAcceptModalHandler = (status) => {
    setIsShowAcceptingModal(status);
  };
  const closingRejectModalHandler = (status) => {
    setIsShowRejectModal(status);
  };

  return (
    <div>
      {allComments ? (
        <div className="shadow p-3">
          <h2 className="mb-4 border-bottom border-black pb-2">
            لیست نظرات کابران
          </h2>
          <Table borderless>
            <thead className="border-bottom border-dark">
              <tr className="text-center">
                <th>اسم کاربر</th>
                <th>محصول</th>
                <th>کامنت</th>
                <th>تاریخ</th>
                <th>ساعت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {allComments.map((item, index) => (
                <tr key={index}>
                  <th>{item.userID}</th>
                  <th>{item.prodductID}</th>
                  <th>
                    <Button
                      className="text-white border-0"
                      style={{ backgroundColor: "var(--blue)" }}
                      onClick={() => {
                        setIsShowDetailModal(true);
                        setMainCommentBody(item.body);
                      }}
                    >
                      دیدن متن
                    </Button>
                  </th>
                  <th>{item.date}</th>
                  <th>{item.hour}</th>
                  <th>
                    <Button
                      className="bg-danger border-0 text-white"
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setCurrentCommentID(index);
                      }}
                    >
                      حذف
                    </Button>
                    <Button
                      className="mx-1 text-white border-0"
                      style={{ backgroundColor: "var(--blue)" }}
                      onClick={() => {
                        setIsShowEditModal(true);
                        setMainCommentBody(item.body);
                        setCurrentCommentID(item.id);
                      }}
                    >
                      ویرایش
                    </Button>
                    <Button
                      className="mx-1 text-white border-0"
                      style={{ backgroundColor: "var(--blue)" }}
                    >
                      پاسخ
                    </Button>
                    {!item.isAccept ? (
                      <Button
                        className="bg-success border-0 text-white"
                        onClick={() => {
                          setIsShowAcceptingModal(true);
                          setCurrentCommentID(item.id);
                        }}
                      >
                        تایید
                      </Button>
                    ) : (
                      <Button
                        className="bg-secondary border-0 text-white"
                        onClick={() => {
                          setIsShowRejectModal(true);
                          setCurrentCommentID(item.id);
                        }}
                      >
                        تایید شده
                      </Button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <ErrorBox msg={"هیچ کامنتی یافت نشد"} />
      )}
      {isShowDetailModal && (
        <DetailsModal
          showStatus={isShowDetailModal}
          onClose={(status) => closingDetailModalHandler(status)}
        >
          <p className="p-3 m-2">{mainCommentBody}</p>
        </DetailsModal>
      )}
      {isShowDeleteModal && (
        <AcceptModal
          title="حذف"
          context="ایا برای حذف اطمینان دارید؟"
          onGetAction={(action) => deleteComment(action)}
          showStatus={isShowDeleteModal}
          onClose={(status) => closingDeleteModalHandler(status)}
        />
      )}
      {isShowEditModal && (
        <EditModal
          onSendStatusForEditing={(action) => editComment(action)}
          isOpening={isShowEditModal}
          onClose={(status) => closingEditModalHandler(status)}
        >
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Control
              as="textarea"
              value={mainCommentBody}
              onChange={(e) => setMainCommentBody(e.target.value)}
            />
          </Form>
        </EditModal>
      )}
      {isShowAcceptingModal && (
        <AcceptModal
          title="تاییدیه نمایش نظر"
          context="آیا برای تایید نمایش این نظر اطمینان دارید؟ درصورت کلیک بر روی بله٬ این نظر در سایت نمایش داده خواهد شد!"
          onGetAction={(action) => acceptComment(action)}
          showStatus={isShowAcceptingModal}
          onClose={(status) => closingAcceptModalHandler(status)}
        />
      )}
      {isShowRejectModal && (
        <AcceptModal
          title="باز گردانی نظر تایید شده"
          context="ایا میخواهید نمایش این نظر را از سایت بردارید؟"
          onGetAction={(action) => rejectComment(action)}
          showStatus={isShowRejectModal}
          onClose={(status) => closingRejectModalHandler(status)}
        />
      )}
    </div>
  );
}
