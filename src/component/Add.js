import React, { useState } from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../styles/add.css"
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/inventorySlicer";

export default function Add({func, onCloseModalAdd, openAdd}) {
  const dispatch = useDispatch();

  const [display_name, setName] = useState('');
  const [walk_in_selling_price, setSPrice] = useState('');
  const [cost_price, setCPrice] = useState('');
  const [mutti_selling_price, setMPrice] = useState('');
  const [insurance_unit_price, setIPrice] = useState('');
  const [unit_of_measure, setHow] = useState('');

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeSPrice = (e) => {
    setSPrice(e.target.value);
  };
  const changeCPrice = (e) => {
    setCPrice(e.target.value);
  };
  const changeMPrice = (e) => {
    setMPrice(e.target.value);
  };
  const changeIPrice= (e) => {
    setIPrice(e.target.value);
  };
  const changeHow = (e) => {
    setHow(e.target.value);
  };

  const transferValue = (e) => {
    e.preventDefault();
    // const val = {
      // display_name,
      // walk_in_selling_price,
      // cost_price,
      // mutti_selling_price,
      // insurance_unit_price,
      // human_name
    // };
    if(display_name){
    dispatch(
      addProduct({
      display_name: display_name,
      walk_in_selling_price: walk_in_selling_price,
      cost_price: cost_price,
      mutti_selling_price: mutti_selling_price,
      insurance_unit_price: insurance_unit_price,
      unit_of_measure: unit_of_measure,
      })
    );
    }
    // func(val);
    clearState();
  };

  const clearState = () => {
    setName('');
    setSPrice('');
    setCPrice('');
    setMPrice('');
    setIPrice('');
    setHow('');
  };

  return (
    <div>
      <Modal open={openAdd} onClose={onCloseModalAdd} center >
      <label>
        Product Name: <br/>
        <input type="text" value={display_name} name="display_name" onChange={changeName} />
      </label>
      <br/>
      <label>
        Selling Price: <br/>
        <input type="number" value={walk_in_selling_price} name="walk_in_selling_price" onChange={changeSPrice} />
      </label>
      <br/>
      <label>
        Cost Price: <br/>
        <input type="number" value={cost_price} name="cost_price" onChange={changeCPrice} />
      </label>
      <br/>
      <label>
        Mutti Price: <br/>
        <input type="number" value={mutti_selling_price} name="mutti_selling_price" onChange={changeMPrice} />
      </label>
      <br/>
      <label>
        Insurance Price: <br/>
        <input type="number" value={insurance_unit_price} name="insurance_unit_price" onChange={changeIPrice} />
      </label>
      <br/>
      <label>
        How it's sold: <br/>
        <select value={unit_of_measure} name="name" onChange={changeHow}>
        <option>click</option>
        <option>CONSUMABLE</option>
        <option>TABLET</option>
        <option>SUSPENSION</option>
        <option>SYRUP</option>
        <option>GEL</option>
        <option>INFUSION</option>
      </select>
      </label>
      <br/>
      <div style={{ width: '100%', marginTop: '2em'}}>
      <button onClick={(e) =>{
        transferValue(e);
        onCloseModalAdd()
        }}> Submit </button>
        <button onClick={onCloseModalAdd} style={{marginLeft: '1em'}}>Cancel</button>
      </div>
      </Modal>
    </div>
  );
}