import React, { useState } from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../styles/add.css"
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/inventorySlicer";

export default function Add({ onCloseModalAdd, openAdd }) {
  const dispatch = useDispatch();

  const [newFormData, setNewFormData] = useState({
    display_name: "",
    walk_in_selling_price: "",
    cost_price: "",
    mutti_selling_price: "",
    insurance_unit_price: "",
    means: "",
  });

  function handleChange(event) {
    const {name, value} = event.target
    setNewFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const transferValue = (e) => {
    e.preventDefault();
    if(newFormData.display_name){
      dispatch(
        addProduct({
          display_name: newFormData.display_name,
          walk_in_selling_price: newFormData.walk_in_selling_price,
          cost_price: newFormData.cost_price,
          mutti_selling_price: newFormData.mutti_selling_price,
          insurance_unit_price: newFormData.insurance_unit_price,
          unit_of_measure: { human_name: newFormData.means },
        })
      );
    }
    clearState();
  };

  const clearState = () => {
    setNewFormData({})
  };

  return (
    <div>
      <Modal open={openAdd} onClose={onCloseModalAdd} center>
        <label>
          Product Name: <br />
          <input
            type="text"
            value={newFormData.display_name}
            name="display_name"
            onChange={handleChange}
            className="add-input"
          />
        </label>
        <br />
        <label>
          Selling Price: <br />
          <input
            type="number"
            value={newFormData.walk_in_selling_price}
            name="walk_in_selling_price"
            onChange={handleChange}
            className="add-input"
          />
        </label>
        <br />
        <label>
          Cost Price: <br />
          <input
            type="number"
            value={newFormData.cost_price}
            name="cost_price"
            onChange={handleChange}
            className="add-input"
          />
        </label>
        <br />
        <label>
          Mutti Price: <br />
          <input
            type="number"
            value={newFormData.mutti_selling_price}
            name="mutti_selling_price"
            onChange={handleChange}
            className="add-input"
          />
        </label>
        <br />
        <label>
          Insurance Price: <br />
          <input
            type="number"
            value={newFormData.insurance_unit_price}
            name="insurance_unit_price"
            onChange={handleChange}
            className="add-input"
          />
        </label>
        <br />
        <label>
          How it's sold: <br />
          <select
            name="means"
            value={newFormData.means}
            onChange={handleChange}
            className="add-input"
          >
            <option>click</option>
            <option>CONSUMABLE</option>
            <option>TABLET</option>
            <option>SUSPENSION</option>
            <option>SYRUP</option>
            <option>GEL</option>
            <option>INFUSION</option>
          </select>
        </label>
        <br />
        <div className="add-modal-buttons">
          <button
            className="but-submit"
            onClick={(e) => {
              transferValue(e);
              onCloseModalAdd();
            }}
          >
            Submit
          </button>
          <button onClick={onCloseModalAdd} className="but-cancel">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}