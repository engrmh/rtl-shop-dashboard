import React, { useEffect, useState } from "react";
import NewProduct from "../../Components/NewProduct/NewProduct";
import ProductTable from "../../Components/ProductTable/ProductTable";
export default function Products() {
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((json) => setAllProduct(json));
  };
  return (
    <>
      <NewProduct getAllProduct={getAllProduct} />
      <ProductTable allProduct={allProduct} getAllProduct={getAllProduct} />
    </>
  );
}
