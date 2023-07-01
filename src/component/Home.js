import React, { useState, useEffect, Fragment, useRef } from "react";
import "../styles/home.css";
import "react-responsive-modal/styles.css";
import Add from "./Add";
import { CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListProd from "./ListProd";
import Edit from "./Edit";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, delProduct, editProduct } from "../redux/inventorySlicer";
import { store } from "../app/store";

export function markAsDeleted(prodID, products) {
  const newProd = [...products];
  const index = products.findIndex((prod) => prod.id === prodID);
  const deletedProd = newProd[index];
  deletedProd.deleted = true;
  return newProd;
}

export default function Home() {
  const dispatch = useDispatch();
  const prods = useSelector((state) => state.inventory.products);
  const dataFetchedRef = useRef(false);

  const getProduct = async () => {
    const persistedState = store.getState().inventory.products;
    console.log(persistedState);
    if (persistedState.length === 0) {
      const response = await fetch(
        "https://run.mocky.io/v3/c9a84e20-f49e-4e58-8f9e-e1b9c211320e"
      );
      const data = await response.json();
      const displayProducts = data.results.map((obj) => ({
        ...obj,
        deleted: false,
        price: [{ cost_price: obj.cost_price, timeStamp: new Date() }],
      }));
      dispatch(setProduct(displayProducts));
    }
  };

  const [openAdd, setOpenAdd] = useState(false);
  const onOpenModalAdd = () => setOpenAdd(true);
  const onCloseModalAdd = () => setOpenAdd(false);

  const [editProdID, setEditProdID] = useState("");
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

  const [editForm, setEditForm] = useState({
    display_name: "",
    walk_in_selling_price: "",
    cost_price: "",
    mutti_selling_price: "",
    insurance_unit_price: "",
    human_name: "",
  });

  const handleEditForm = (e) => {
    e.preventDefault();
    setEditForm((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditFormSumbit = (e) => {
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
    console.log(editedProduct);
    dispatch(editProduct(editedProduct));
    setEditProdID("");
  };

  const handleCancel = () => {
    setEditProdID("");
  };

  const handleDelete = (prodID) => {
    dispatch(delProduct(prodID));
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getProduct();
  }, []);

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
          <form onSubmit={handleEditFormSumbit}>
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell className="link-row"></TableCell>
                    <TableCell
                      className="a-left name"
                      style={{
                        color: "white",
                      }}
                    >
                      Product Name
                    </TableCell>
                    <TableCell className="a-mid"></TableCell>
                    <TableCell
                      className="a-right price"
                      style={{
                        color: "white",
                      }}
                    >
                      Selling Price (GHS)
                    </TableCell>
                    <TableCell
                      className="a-right price"
                      style={{
                        color: "white",
                      }}
                    >
                      Cost Price (GHS)
                    </TableCell>
                    <TableCell
                      className="a-right price"
                      style={{
                        color: "white",
                      }}
                    >
                      Mutti Price (GHS)
                    </TableCell>
                    <TableCell
                      className="a-right price"
                      style={{
                        color: "white",
                      }}
                    >
                      Insurance Price (GHS)
                    </TableCell>
                    <TableCell
                      className="a-left sold"
                      style={{
                        color: "white",
                      }}
                    >
                      How it's sold
                    </TableCell>
                    <TableCell className="icon-edit"></TableCell>
                    <TableCell className="icon-del"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tbody">
                  {prods
                    .filter((del) => del.deleted === false)
                    .map((prods, i) => (
                      <Fragment key={i}>
                        {editProdID === prods.id ? (
                          <Edit
                            editForm={editForm}
                            handleEditForm={handleEditForm}
                            handleCancel={handleCancel}
                            product={prods}
                          />
                        ) : (
                          <ListProd
                            product={prods}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                          />
                        )}
                      </Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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
