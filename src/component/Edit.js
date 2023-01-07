import React from 'react'
import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import link from '../link_icon.svg'

const Edit = ({editForm, handleEditForm, handleCancel, editProduct, product}) => {
    const [selectVal, setSelectVal] = useState(product.unit_of_measure?.human_name);

    const handleChange = (event) => {
        setSelectVal(event.target.value)
    }

  return (
    <TableRow>
            <TableCell className='link'><a href='#modal'><img src={link} alt=""/></a></TableCell>
            <TableCell className='a-left name'>
                <input type="text" name='display_name' onChange={handleEditForm} value={editForm.display_name}></input>
            </TableCell>
            <TableCell className='a-mid'>-</TableCell>
            <TableCell className='a-right price'>
                <input type="number" name='walk_in_selling_price' onChange={handleEditForm} value={editForm.walk_in_selling_price}></input>
            </TableCell>
            <TableCell className='a-right price' defaultValue={product.cost_price}>
                <input type="number" name='cost_price' onChange={handleEditForm} value={editForm.cost_price}></input>
            </TableCell>
            <TableCell className='a-right price'>
                <input type="number" name='mutti_selling_price' onChange={handleEditForm} value={editForm.mutti_selling_price}></input>
            </TableCell>
            <TableCell className='a-right price'>
                <input type="number" name='insurance_unit_price' onChange={handleEditForm} value={editForm.insurance_unit_price}></input>
            </TableCell>
            <TableCell className='a-left sold'>
                <select defaultValue={product.unit_of_measure?.human_name} value={selectVal} name="human_name" onChange={(e)=>{
                    handleChange()
                    handleEditForm()}}>
                <option>Select an option</option>
                <option value="CONSUMABLE">CONSUMABLE</option>
                <option value="TABLET">TABLET</option>
                <option value="SUSPENSION">SUSPENSION</option>
                <option value="SYRUP">SYRUP</option>
                <option value="GEL">GEL</option>
                <option value="INFUSION">INFUSION</option>
            </select>
            </TableCell>
            <TableCell style={{display: "flex"}}>
                <button type='submit' style={{marginRight: '1em'}}>Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </TableCell>
          </TableRow>
  )
}
export default Edit