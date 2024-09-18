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
import { delProduct } from "../redux/inventorySlicer";

export default function ListProd({
  prods,
  editProdID,
  editForm,
  handleEditForm,
  handleCancel,
  onCloseEditModal,
  openEdit,
  handleEditFormSubmit,
  handleEdit,
  onOpenModalEdit,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [openDel, setOpenDel] = useState(false);
  const onOpenDelModal = () => setOpenDel(true);
  const onCloseDelModal = () => setOpenDel(false);
  const [id, setId] = useState(null);
  const handleDelete = (prodID) => dispatch(delProduct(prodID));

  return (
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
                      <button onClick={onOpenModal}>
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
                          onOpenModalEdit();
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
                          onOpenDelModal();
                        }}
                      >
                        <i
                          className="fa fa-trash del-icon"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </TableCell>

                  <Modal open={open} onClose={onCloseModal} center>
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
                          <p style={{ fontSize: "1em", fontWeight: "bolder" }}>
                            Drug Image
                          </p>
                          <img src={drugImage} alt="" />
                        </div>
                      </div>
                    </div>
                  </Modal>
                  {console.log(product.id)}
                  {openDel && (
                    <Modal open={openDel} onClose={onCloseDelModal} center>
                      <p style={{ marginTop: "2em" }}>
                        Are you sure you want to delete this product?
                      </p>
                      {console.log(product.id)}
                      <div style={{ float: "right" }}>
                        <button
                          className="but-del-yes"
                          style={{ marginLeft: "1em" }}
                          onClick={() => {
                            handleDelete(id);
                            onCloseDelModal();
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="but-del-cancel"
                          onClick={onCloseDelModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </Modal>
                  )}
                </TableRow>
                {editProdID === product.id && (
                  <Edit
                    editForm={editForm}
                    handleEditForm={handleEditForm}
                    handleCancel={handleCancel}
                    product={product}
                    onCloseEditModal={onCloseEditModal}
                    openEdit={openEdit}
                    onSubmit={handleEditFormSubmit}
                  />
                )}
              </Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  {
    /* <TableRow>
      <TableCell className="link">
        <div className="ebutton">
          <button onClick={onOpenModal}>
            <i className="fa fa-link" aria-hidden="true"></i>
          </button>
        </div>
      </TableCell>
      <TableCell className="a-left name">{product.display_name.toUpperCase()}</TableCell>
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
              onOpenModalEdit();
            }}
          >
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </div>
      </TableCell>
      <TableCell>
        <div className="del-button">
          <button type="button" onClick={onOpenDelModal}>
            <i className="fa fa-trash del-icon" aria-hidden="true"></i>
          </button>
        </div>
      </TableCell>

      <Modal open={open} onClose={onCloseModal} center>
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
              <p style={{ fontSize: "1em", fontWeight: "bolder" }}>
                Drug Image
              </p>
              <img src={drugImage} alt="" />
            </div>
          </div>
        </div>
      </Modal>

      {openDel && (
        <Modal open={openDel} onClose={onCloseDelModal} center>
          <p style={{ marginTop: "2em" }}>
            Are you sure you want to delete this product?
          </p>
          <div style={{ float: "right" }}>
            <button
              className="but-del-yes"
              style={{ marginLeft: "1em" }}
              onClick={() => {
                handleDelete(product.id);
                onCloseDelModal();
              }}
            >
              Delete
            </button>
            <button className="but-del-cancel" onClick={onCloseDelModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </TableRow> */
  }
  // );
}
