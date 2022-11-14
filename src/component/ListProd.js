import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import link from '../link_icon.svg'
import del from '../del-icon.png'
import edit from '../edit-icon.png'


export default function ListProd({ product, handleEdit, handleDelete }) {
  return (
    <TableRow>
            {/* ?.toFixed(2) */}
            {/* unit_of_measure.human_name */}
            <TableCell className='link'><a href='#modal'><img src={link} /></a></TableCell>
            <TableCell className='a-left name'>{product.display_name}</TableCell>
            <TableCell className='a-mid'>-</TableCell>
            <TableCell className='a-right price'>{product.walk_in_selling_price}</TableCell>
            <TableCell className='a-right price'>{product.cost_price}</TableCell>
            <TableCell className='a-right price'>{product.mutti_selling_price}</TableCell>
            <TableCell className='a-right price'>{product.insurance_unit_price}</TableCell>
            <TableCell className='a-left sold'>{product.unit_of_measure?.human_name}</TableCell>
            <TableCell><button type='button' onClick={(e)=>handleEdit(e, product)}>Edit</button></TableCell>
            <TableCell><button type='button' onClick={()=>handleDelete(product.id)}>Delete</button></TableCell>
          </TableRow>
  )
}
