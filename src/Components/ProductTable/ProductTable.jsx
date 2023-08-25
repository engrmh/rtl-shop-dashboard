import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ProductTableItem from "./ProductTableItem";
import ErrorBox from "../ErrorBox/ErrorBox";

export default function ProductTable({ allProduct, getAllProduct }) {
  const doUpdatedProduct = (update) => {
    if (update) {
      getAllProduct();
    }
  };

  return (
    <>
      {allProduct.length ? (
        <Table borderless>
          <thead className="border-bottom border-dark">
            <tr className="text-center">
              <th>عکس</th>
              <th>نام</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((item) => (
              <ProductTableItem
                key={item.id}
                {...item}
                onUpdateAfterDelete={async (update) => doUpdatedProduct(update)}
                onUpdateAfterEdit={async (update) => doUpdatedProduct(update)}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <ErrorBox msg={"هیچ محصولی یافت نشد"} />
      )}
    </>
  );
}
