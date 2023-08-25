import React from "react";
import { Image, Button, Row, Col } from "react-bootstrap";
import { BiBell, BiSun } from "react-icons/bi";
import "./Header.css";

export default function Header() {
  return (
    <div style={{ zIndex: "1000" }}>
      <Row className="d-flex justify-content-between align-items-center mb-4">
        <Col className="admin-profile d-flex align-items-center pe-4">
          <Image
            src="/img/mh.png"
            className="ms-3 img-fluid rounded-circle userPhoto"
          />
          <div className="">
            <h5 className="">محمد حسین سلیم بهرامی</h5>
            <h6 className="text-secondary">برنامه نویس فرانت اند</h6>
          </div>
        </Col>
        <Col
          md={5}
          className="header-left-section d-flex justify-content-between align-items-center"
        >
          <div className="searchBox bg-white rounded shadow-lg col-8 d-flex justify-content-between p-1 pe-3">
            <input
              type="text"
              placeholder="جستجو کنید..."
              className="border-0"
            />
            <Button className="headerBtn border-0">جستجو</Button>
          </div>
          <div className="">
            <Button className="mx-3 headerBtn border-0">
              <BiBell className="fs-5" />
            </Button>
            <Button className="headerBtn border-0">
              <BiSun className="fs-5" />
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
