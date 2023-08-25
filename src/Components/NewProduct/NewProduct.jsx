import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  BiText,
  BiDollar,
  BiBasket,
  BiSolidImage,
  BiStar,
  BiChart,
  BiColor,
} from "react-icons/bi";

export default function NewProduct({ getAllProduct }) {
  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  // const productID = useId();

  const newProductForAdd = {
    title: productNewTitle,
    price: productNewPrice,
    count: productNewCount,
    img: productNewImg,
    popularity: productNewPopularity,
    sale: productNewSale,
    colors: productNewColors,
  };
  const productGen = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductForAdd),
    })
      .then((res) => res.json())
      .then((json) => {
        getAllProduct();
        emptyInput();
      });
  };

  function emptyInput() {
    setProductNewTitle("");
    setProductNewPrice("");
    setProductNewCount("");
    setProductNewImg("");
    setProductNewPopularity("");
    setProductNewSale("");
    setProductNewColors("");
  }

  return (
    <div className="mb-5">
      <div className="">
        <h2 className="">افزودن محصول جدید</h2>
        <div className="newProdductContainer">
          <Form className="bg-white p-2 shadow rounded">
            <Row className="">
              <Col xs={12}>
                <Row>
                  <Col xs={6}>
                    <Form.Group
                      className="d-flex py-0 px-2 m-2 rounded"
                      style={{ backgroundColor: "#f4f4f4" }}
                    >
                      <Form.Text className="fs-5 text-dark ms-1">
                        <BiText />
                      </Form.Text>
                      <Form.Control
                        required
                        type="text"
                        placeholder="اسم محصول را وارد کنید"
                        className="border-0 bg-transparent"
                        value={productNewTitle}
                        onChange={(event) =>
                          setProductNewTitle(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group
                      className="d-flex py-0 px-2 m-2 rounded"
                      style={{ backgroundColor: "#f4f4f4" }}
                    >
                      <Form.Text className="fs-5 text-dark ms-1">
                        <BiDollar />
                      </Form.Text>
                      <Form.Control
                        required
                        type="number"
                        placeholder="قیمت محصول را وارد کنید (تومان)"
                        className="border-0 bg-transparent"
                        value={productNewPrice}
                        onChange={(event) =>
                          setProductNewPrice(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={6}>
                    <Form.Group
                      className="d-flex py-0 px-2 m-2 rounded"
                      style={{ backgroundColor: "#f4f4f4" }}
                    >
                      <Form.Text className="fs-5 text-dark ms-1">
                        <BiBasket />
                      </Form.Text>
                      <Form.Control
                        required
                        type="number"
                        placeholder="موجودی محصول را وارد کنید"
                        className="border-0 bg-transparent"
                        value={productNewCount}
                        onChange={(event) =>
                          setProductNewCount(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group
                      className="d-flex py-0 px-2 m-2 rounded"
                      style={{ backgroundColor: "#f4f4f4" }}
                    >
                      <Form.Text className="fs-5 text-dark ms-1">
                        <BiSolidImage />
                      </Form.Text>
                      <Form.Control
                        required
                        type="text"
                        placeholder="آدرس عکس محصول را وارد کنید"
                        className="border-0 bg-transparent"
                        value={productNewImg}
                        onChange={(event) =>
                          setProductNewImg(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={6}>
                    <Form.Group
                      className="d-flex py-0 px-2 m-2 rounded"
                      style={{ backgroundColor: "#f4f4f4" }}
                    >
                      <Form.Text className="fs-5 text-dark ms-1">
                        <BiStar />
                      </Form.Text>
                      <Form.Control
                        required
                        type="number"
                        placeholder="میزان محبوبیت محصول را وارد کنید"
                        className="border-0 bg-transparent"
                        value={productNewPopularity}
                        onChange={(event) =>
                          setProductNewPopularity(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group
                      className="d-flex py-0 px-2 m-2 rounded"
                      style={{ backgroundColor: "#f4f4f4" }}
                    >
                      <Form.Text className="fs-5 text-dark ms-1">
                        <BiChart />
                      </Form.Text>
                      <Form.Control
                        required
                        type="number"
                        placeholder="میزان فروش محصول را وارد کنید"
                        className="border-0 bg-transparent"
                        value={productNewSale}
                        onChange={(event) =>
                          setProductNewSale(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={6}>
                    <Form.Group
                      className="d-flex py-0 px-2 m-2 rounded"
                      style={{ backgroundColor: "#f4f4f4" }}
                    >
                      <Form.Text className="fs-5 text-dark ms-1">
                        <BiColor />
                      </Form.Text>
                      <Form.Control
                        required
                        type="number"
                        placeholder="تعداد رنگ بندی محصول را وارد کنید"
                        className="border-0 bg-transparent"
                        value={productNewColors}
                        onChange={(event) =>
                          setProductNewColors(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button
                style={{ backgroundColor: "var(--blue)" }}
                className="border-0 py-2 px-3"
                onClick={(event) => productGen(event)}
              >
                ثبت محصول
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
