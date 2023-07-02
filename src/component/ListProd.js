import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../styles/listProd.css";
import drugImage from "../drug_image.jpg";

export default function ListProd({
  product,
  handleEdit,
  handleDelete,
  onOpenModalEdit,
}) {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [openDel, setOpenDel] = useState(false);
  const onOpenDelModal = () => setOpenDel(true);
  const onCloseDelModal = () => setOpenDel(false);

  return (
    <TableRow>
      <TableCell className="link">
        <div className="ebutton">
          <button onClick={onOpenModal}>
            <i className="fa fa-link" aria-hidden="true"></i>
          </button>
        </div>
      </TableCell>
      <TableCell className="a-left name">{product.display_name}</TableCell>
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
    </TableRow>
  );
}
