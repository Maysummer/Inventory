import React, { Fragment, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../styles/listProd.css";
import drugImage from "../drug_image.jpg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Edit from "./Edit";
import { useDispatch } from "react-redux";
import { delProduct, editProduct } from "../redux/inventorySlicer";

export default function ListProd({ prods }) {
  const dispatch = useDispatch();
  const [editProdID, setEditProdID] = useState("");
  const [id, setId] = useState(null);
  const handleDelete = (prodID) => dispatch(delProduct(prodID));
  const handleCancel = () => setEditProdID("");
  const [modal, setModal] = useState("");

  const [editForm, setEditForm] = useState({
    display_name: "",
    walk_in_selling_price: "",
    cost_price: "",
    mutti_selling_price: "",
    insurance_unit_price: "",
    human_name: "",
  });

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

  return (
    <form onSubmit={handleEditFormSubmit}>
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
              .filter((del) => !del.deleted)
              .map((product, i) => (
                <Fragment key={i}>
                  <TableRow>
                    <TableCell className="link">
                      <div className="ebutton">
                        <button onClick={() => setModal("image")}>
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="a-left name">
                      {product.display_name.toUpperCase()}
                    </TableCell>
                    <TableCell className="a-mid">-</TableCell>
                    <TableCell className="a-right price">
                      {Number(product.walk_in_selling_price).toFixed(2)}
                    </TableCell>
                    <TableCell className="a-right price">
                      {Number(product.cost_price).toFixed(2)}
                    </TableCell>
                    <TableCell className="a-right price">
                      {Number(product.mutti_selling_price).toFixed(2)}
                    </TableCell>
                    <TableCell className="a-right price">
                      {Number(product.insurance_unit_price).toFixed(2)}
                    </TableCell>
                    <TableCell className="a-left sold">
                      {product.unit_of_measure?.human_name}
                    </TableCell>
                    <TableCell>
                      <div className="ebutton">
                        <button
                          onClick={(e) => {
                            handleEdit(e, product);
                            setModal("edit");
                          }}
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="del-button">
                        <button
                          type="button"
                          onClick={(e) => {
                            setId(product.id);
                            setModal("delete");
                          }}
                        >
                          <i
                            className="fa fa-trash del-icon"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {editProdID === product.id && (
                    <Edit
                      editForm={editForm}
                      handleEditForm={handleEditForm}
                      handleCancel={handleCancel}
                      product={product}
                      onCloseEditModal={() => setModal("")}
                      openEdit={modal === "edit"}
                      onSubmit={handleEditFormSubmit}
                    />
                  )}
                </Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {modal === "image" && (
        <Modal open onClose={() => setModal("")} center>
          <div style={{ margin: "2em 2em" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gridGap: "1em",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "1em",
                    fontWeight: "bolder",
                  }}
                >
                  Drug Image
                </p>
                <img src={drugImage} alt="" />
              </div>
            </div>
          </div>
        </Modal>
      )}
      {modal === "delete" && (
        <Modal open onClose={() => setModal("")} center>
          <p style={{ marginTop: "2em" }}>
            Are you sure you want to delete this product?
          </p>
          <div style={{ float: "right" }}>
            <button
              className="but-del-yes"
              style={{ marginLeft: "1em" }}
              onClick={() => {
                handleDelete(id);
                setModal("");
              }}
            >
              Delete
            </button>
            <button className="but-del-cancel" onClick={() => setModal("")}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </form>
  );
}
