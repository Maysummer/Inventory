import React from "react";
import { Drawer } from "@mui/material";
import "../styles/edit.css";
import "../styles/add.css";

function Edit({
  editForm,
  handleEditForm,
  handleCancel,
  product,
  onCloseEditModal,
  openEdit,
  onSubmit,
}) {
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={openEdit}
      onClose={onCloseEditModal}
    >
      <div className="aside">
        <label>
          Product Name:
          <input
            type="text"
            value={editForm.display_name}
            name="display_name"
            onChange={handleEditForm}
            className="add-input"
          />
        </label>
        <br />
        <label>
          Selling Price: <br />
          <input
            type="number"
            value={editForm.walk_in_selling_price}
            name="walk_in_selling_price"
            onChange={handleEditForm}
            className="add-input"
          />
        </label>
        <br />
        <label>
          Cost Price: <br />
          <input
            type="number"
            value={editForm.cost_price}
            name="cost_price"
            onChange={handleEditForm}
            className="add-input"
          />
        </label>
        <br />
        <label>
          Mutti Price: <br />
          <input
            type="number"
            value={editForm.mutti_selling_price}
            name="mutti_selling_price"
            onChange={handleEditForm}
            className="add-input"
          />
        </label>
        <br />
        <label>
          Insurance Price: <br />
          <input
            type="number"
            value={editForm.insurance_unit_price}
            name="insurance_unit_price"
            onChange={handleEditForm}
            className="add-input"
          />
        </label>
        <br />
        <label>
          How it's sold: <br />
          <select
            defaultValue={product.unit_of_measure?.human_name}
            name="editForm.human_name"
            onChange={handleEditForm}
            className="add-input"
          >
            <option value="">Select an option</option>
            <option value="CONSUMABLE">CONSUMABLE</option>
            <option value="TABLET">TABLET</option>
            <option value="SUSPENSION">SUSPENSION</option>
            <option value="SYRUP">SYRUP</option>
            <option value="GEL">GEL</option>
            <option value="INFUSION">INFUSION</option>
          </select>
        </label>
        <br />
        <div className="add-modal-buttons">
          <button
            type="button"
            onClick={() => {
              onCloseEditModal();
              handleCancel();
            }}
            className="but-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="but-submit"
            onClick={(e) => {
              onSubmit(e);
              onCloseEditModal();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </Drawer>
  );
}
export default Edit;
