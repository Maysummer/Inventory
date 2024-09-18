import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import "../styles/home.css";
import "react-responsive-modal/styles.css";
import Add from "./Add";
import { CircularProgress } from "@mui/material";
import ListProd from "./ListProd";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, editProduct } from "../redux/inventorySlicer";
import { store } from "../app/store";
import productsData from "./data/products";

export default function Home() {
  const dispatch = useDispatch();
  const prods = useSelector((state) => state.inventory.products);
  const dataFetchedRef = useRef(false);

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

  const [openAdd, setOpenAdd] = useState(false);
  const [editProdID, setEditProdID] = useState("");
  const [editForm, setEditForm] = useState({
    display_name: "",
    walk_in_selling_price: "",
    cost_price: "",
    mutti_selling_price: "",
    insurance_unit_price: "",
    human_name: "",
  });

  const onOpenModalAdd = () => setOpenAdd(true);
  const onCloseModalAdd = () => setOpenAdd(false);
  const onOpenModalEdit = () => setOpenEdit(true);
  const onCloseEditModal = () => setOpenEdit(false);

  const handleEdit = (e, product) => {
    e.preventDefault();
    setEditProdID(product.id);
    const formVal = {
      id: product.id,
      display_name: product.display_name,
      walk_in_selling_price: product.walk_in_selling_price,
      cost_price: product.cost_price,
      mutti_selling_price: product.mutti_selling_price,
      insurance_unit_price: product.insurance_unit_price,
      human_name: product.unit_of_measure.human_name,
      price: [{ cost_price: product.cost_price, timeStamp: new Date() }],
      deleted: false,
    };
    setEditForm(formVal);
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    setEditForm((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const index = prods.findIndex((product) => product.id === editProdID);
    const editedProduct = {
      id: editProdID,
      display_name: editForm.display_name,
      walk_in_selling_price: editForm.walk_in_selling_price,
      cost_price: editForm.cost_price,
      mutti_selling_price: editForm.mutti_selling_price,
      insurance_unit_price: editForm.insurance_unit_price,
      unit_of_measure: { human_name: editForm.human_name },
      price: [
        ...prods[index].price,
        { cost_price: editForm.cost_price, timeStamp: new Date() },
      ],
      deleted: false,
    };
    dispatch(editProduct(editedProduct));
    setEditProdID("");
  };

  const handleCancel = () => setEditProdID("");

  const [openEdit, setOpenEdit] = useState(false);
console.log({prods})
  return (
    <div>
      {prods.length >= 1 ? (
        <>
          <h2 style={{ textAlign: "left" }}>Product Inventory</h2>
          <div className="add-modal">
            <button className="add-button" onClick={onOpenModalAdd}>
              Add Product
            </button>
          </div>
          <form onSubmit={handleEditFormSubmit}>
            <ListProd
              prods={prods}
              editProdID={editProdID}
              editForm={editForm}
              handleEditForm={handleEditForm}
              handleCancel={handleCancel}
              onCloseEditModal={onCloseEditModal}
              openEdit={openEdit}
              handleEditFormSubmit={handleEditFormSubmit}
              handleEdit={handleEdit}
              onOpenModalEdit={onOpenModalEdit}
            />
          </form>
          <Add onCloseModalAdd={onCloseModalAdd} openAdd={openAdd} />
        </>
      ) : (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "hsl(230, 13%, 35%)",
          }}
        />
      )}
    </div>
  );
}
