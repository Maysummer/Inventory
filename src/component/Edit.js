import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import link from '../link_icon.svg'

const Edit = ({editForm, handleEditForm, handleCancel, editProduct, product}) => {
  return (
    <TableRow>
            {/* ?.toFixed(2) */}
            {/* unit_of_measure.human_name */}
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
                <select defaultValue={product.unit_of_measure?.human_name} name="human_name" onChange={handleEditForm}>
                <option>Select an option</option>
                <option value={editForm.human_name}>CONSUMABLE</option>
                <option value={editForm.human_name}>TABLET</option>
                <option value={editForm.human_name}>SUSPENSION</option>
                <option value={editForm.human_name}>SYRUP</option>
                <option value={editForm.human_name}>GEL</option>
                <option value={editForm.human_name}>INFUSION</option>
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