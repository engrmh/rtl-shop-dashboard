import React, { useState } from "react";
import { Button, Form, Image, Modal, Table } from "react-bootstrap";
import "./ProductTableItem.css";
import DeleteModal from "../AcceptModal/AcceptModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import {
  BiText,
  BiDollar,
  BiBasket,
  BiStar,
  BiChart,
  BiColor,
  BiImage,
} from "react-icons/bi";
import Toast from "../Toast/Toast";
import AcceptModal from "../AcceptModal/AcceptModal";

export default function ProductTableItem({
  id,
  img,
  title,
  price,
  count,
  popularity,
  colors,
  sale,
  onUpdateAfterDelete,
  onUpdateAfterEdit,
}) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  const deleteProduct = (action) => {
    if (action) {
      fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(async (json) => {
          await onUpdateAfterDelete(true);
          <Toast toastTxt={"با موفقیت حذف شد"} />;
        });
    }
  };

  const updateProductInfos = (action) => {
    if (action) {
      const productNewInfos = {
        id: id,
        title: productNewTitle,
        price: productNewPrice,
        count: productNewCount,
        img: productNewImg,
        popularity: productNewPopularity,
        sale: productNewSale,
        colors: productNewColors,
      };
      fetch(`http://localhost:8000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productNewInfos),
      })
        .then((res) => res.json())
        .then(async (json) => {
          await onUpdateAfterEdit(true);
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
    <>
      <tr className="text-center">
        <td>
          <Image
            src={img}
            alt={title}
            srcSet={title}
            className="productTableItemImage"
          />
        </td>
        <td>{title}</td>
        <td>{price} تومان</td>
        <td>{count}</td>
        <td className="d-flex justify-content-center">
          <div className="d-flex justify-content-between w-75">
            <Button
              className="border-0"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={() => setIsShowDetailsModal(true)}
            >
              جزییات
            </Button>

            <Button
              className="bg-danger border-0 mx-3"
              onClick={() => setIsShowDeleteModal(true)}
            >
              حذف
            </Button>

            <Button
              className="border-0"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={() => {
                setIsShowEditModal(true);
                console.log(isShowEditModal);
                // namayesh data ha dar value har input
                setProductNewTitle(title);
                setProductNewPrice(price);
                setProductNewCount(count);
                setProductNewImg(img);
                setProductNewPopularity(popularity);
                setProductNewSale(sale);
                setProductNewColors(colors);
              }}
            >
              ویرایش
            </Button>
          </div>
        </td>
      </tr>
      {isShowDetailsModal && (
        <DetailsModal
          showStatus={isShowDetailsModal}
          onClose={(status) => closingDetailModalHandler(status)}
        >
          <Modal.Header className="text-center">
            <Modal.Title>جزییات محصول</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table borderless>
              <thead>
                <tr className="text-center">
                  <th>اسم</th>
                  <th>قیمت</th>
                  <th>محبوبیت</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>{popularity}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
        </DetailsModal>
      )}
      {isShowDeleteModal && (
        <AcceptModal
          title="حذف"
          context="ایا برای حذف اطمینان دارید؟"
          onGetAction={(action) => deleteProduct(action)}
          showStatus={isShowDeleteModal}
          onClose={(status) => closingDeleteModalHandler(status)}
        />
      )}
      {isShowEditModal && (
        <EditModal
          isOpening={isShowEditModal}
          onSendStatusForEditing={(status) => updateProductInfos(status)}
          onClose={(status) => closingEditModalHandler(status)}
        >
          <Form className="" onSubmit={(event) => event.preventDefault()}>
            <div
              className="d-flex justify-content-center align-items-center rounded px-2 my-2"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <BiText />
              <Form.Control
                placeholder="عنوان جدید را وارد کنید"
                type="text"
                className="border-0 bg-transparent"
                value={productNewTitle}
                onChange={(event) => setProductNewTitle(event.target.value)}
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded px-2 my-2"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <BiDollar />
              <Form.Control
                placeholder="قیمت جدید را وارد کنید"
                type="number"
                className="border-0 bg-transparent"
                value={productNewPrice}
                onChange={(event) => setProductNewPrice(event.target.value)}
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded px-2 my-2"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <BiBasket />
              <Form.Control
                placeholder="موجودی جدید را وارد کنید"
                type="number"
                className="border-0 bg-transparent"
                value={productNewCount}
                onChange={(event) => setProductNewCount(event.target.value)}
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded px-2 my-2"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <BiImage />
              <Form.Control
                placeholder="آدرس کاور جدید را وارد کنید"
                type="text"
                className="border-0 bg-transparent"
                value={productNewImg}
                onChange={(event) => setProductNewImg(event.target.value)}
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded px-2 my-2"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <BiStar />
              <Form.Control
                placeholder="محبوبیت جدید را وارد کنید"
                type="number"
                className="border-0 bg-transparent"
                value={productNewPopularity}
                onChange={(event) =>
                  setProductNewPopularity(event.target.value)
                }
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded px-2 my-2"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <BiChart />
              <Form.Control
                placeholder="میزان فروش جدید را وارد کنید"
                type="number"
                className="border-0 bg-transparent"
                value={productNewSale}
                onChange={(event) => setProductNewSale(event.target.value)}
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded px-2 my-2"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <BiColor />
              <Form.Control
                placeholder="تعداد رنگ یتدی جدید را وارد کنید"
                type="number"
                accept="image/x-png,image/gif,image/jpeg"
                className="border-0 bg-transparent"
                value={productNewColors}
                onChange={(event) => setProductNewColors(event.target.value)}
              />
            </div>
          </Form>
        </EditModal>
      )}
    </>
  );
}
