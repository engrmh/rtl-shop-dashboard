import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { TbDiscount2 } from "react-icons/tb";
import { BiBasket, BiCommentDetail, BiCart } from "react-icons/bi";

const SideBar = () => {
  // let pageLinks = ["/", "/products", "/comments", "/users", "/orders", "/offs"];
  let thisPage = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(thisPage.pathname);
  }, []);

  return (
    <div className="sidebar-wrapper col-md-2">
      <h5 className="text-white border-bottom text-center py-3">
        به داشبورد خود خوش آمدید
      </h5>
      <ListGroup>
        <ListGroup.Item
          className={
            !currentPage == thisPage.pathname
              ? "border-0 bg-transparent my-1 sidebarMenuLink activeMenu"
              : "border-0 bg-transparent my-1 sidebarMenuLink"
          }
        >
          <Link
            to="/"
            className="text-decoration-none text-white"
            onClick={() => setCurrentPage("/")}
          >
            <AiOutlineHome className="ms-2 fs-5" />
            صفحه اصلی
          </Link>
        </ListGroup.Item>
        <ListGroup.Item
          className={
            !currentPage == thisPage.pathname
              ? "border-0 bg-transparent my-1 sidebarMenuLink activeMenu"
              : "border-0 bg-transparent my-1 sidebarMenuLink"
          }
        >
          <Link
            to="/products"
            className="text-decoration-none text-white"
            onClick={() => setCurrentPage("/products")}
          >
            <BiCart className="ms-2 fs-5" />
            محصولات
          </Link>
        </ListGroup.Item>
        <ListGroup.Item
          className={
            currentPage == thisPage.pathname
              ? "border-0 bg-transparent my-1 sidebarMenuLink activeMenu"
              : "border-0 bg-transparent my-1 sidebarMenuLink"
          }
        >
          <Link
            to="/comments"
            className="text-decoration-none text-white"
            onClick={() => setCurrentPage("/comments")}
          >
            <BiCommentDetail className="ms-2 fs-5" />
            کامنت ها
          </Link>
        </ListGroup.Item>
        <ListGroup.Item
          className={
            currentPage == thisPage.pathname
              ? "border-0 bg-transparent my-1 sidebarMenuLink activeMenu"
              : "border-0 bg-transparent my-1 sidebarMenuLink"
          }
        >
          <Link
            to="/users"
            className="text-decoration-none text-white"
            onClick={() => setCurrentPage("/users")}
          >
            <FiUsers className="ms-2 fs-5" />
            کاربران
          </Link>
        </ListGroup.Item>
        <ListGroup.Item
          className={
            currentPage == thisPage.pathname
              ? "border-0 bg-transparent my-1 sidebarMenuLink activeMenu"
              : "border-0 bg-transparent my-1 sidebarMenuLink"
          }
        >
          <Link
            to="/orders"
            className="text-decoration-none text-white"
            onClick={() => setCurrentPage("/orders")}
          >
            <BiBasket className="ms-2 fs-5" />
            سفارشات
          </Link>
        </ListGroup.Item>
        <ListGroup.Item
          className={
            currentPage == thisPage.pathname
              ? "border-0 bg-transparent my-1 sidebarMenuLink activeMenu"
              : "border-0 bg-transparent my-1 sidebarMenuLink"
          }
        >
          <Link
            to="/offs"
            className="text-decoration-none text-white"
            onClick={() => setCurrentPage("/offs")}
          >
            <TbDiscount2 className="ms-2 fs-5" />
            تخفیف ها
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SideBar;
