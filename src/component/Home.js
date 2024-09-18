import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/home.css";
import "react-responsive-modal/styles.css";
import Add from "./Add";
import { CircularProgress } from "@mui/material";
import ListProd from "./ListProd";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/inventorySlicer";
import { store } from "../app/store";
import productsData from "./data/products";

export default function Home() {
  const dispatch = useDispatch();
  const prods = useSelector((state) => state.inventory.products);
  const dataFetchedRef = useRef(false);
  const [openAdd, setOpenAdd] = useState(false);

  const getProduct = useCallback(async () => {
    const persistedState = store.getState().inventory.products;
    if (persistedState.length === 0) {
      // const response = await fetch("https://localhost:7133/api/Drugs");
      // const data = await response.json();
      const displayProducts = productsData.map((obj) => ({
        ...obj,
        deleted: false,
        price: [{ cost_price: obj.cost_price, timeStamp: new Date() }],
      }));
      dispatch(setProduct(displayProducts));
    }
  }, [dispatch]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getProduct();
  }, [getProduct]);

  return (
    <div>
      {prods.length >= 1 ? (
        <>
          <h2 style={{ textAlign: "left" }}>Product Inventory</h2>
          <div className="add-modal">
            <button className="add-button" onClick={() => setOpenAdd(true)}>
              Add Product
            </button>
          </div>
          <ListProd prods={prods} />
          <Add onCloseModalAdd={() => setOpenAdd(false)} openAdd={openAdd} />
        </>
      ) : (
        <CircularProgress className="progress" />
      )}
    </div>
  );
}
