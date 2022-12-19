import React, { useState}from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import link from '../link_icon.svg'
import del from '../del-icon.png'
import edit from '../edit-icon.png'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function ListProd({ product, handleEdit, handleDelete }) {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [openDel, setOpenDel] = useState(false)
  const onOpenDelModal = () => setOpenDel(true)
  const onCloseDelModal = () => setOpenDel(false)

  return (
    <TableRow>
            {/* ?.toFixed(2) */}
            {/* unit_of_measure.human_name */}
            <TableCell className='link'><button onClick={onOpenModal}><img src={link} alt="link symbol" /></button></TableCell>
            <TableCell className='a-left name'>{product.display_name}</TableCell>
            <TableCell className='a-mid'>-</TableCell>
            <TableCell className='a-right price'>{product.walk_in_selling_price}</TableCell>
            <TableCell className='a-right price'>{product.cost_price}</TableCell>
            <TableCell className='a-right price'>{product.mutti_selling_price}</TableCell>
            <TableCell className='a-right price'>{product.insurance_unit_price}</TableCell>
            <TableCell className='a-left sold'>{product.unit_of_measure?.human_name}</TableCell>
            <TableCell><button type='button' onClick={(e)=>handleEdit(e, product)}><img src={edit} alt="Edit" /></button></TableCell>
            <TableCell><button type='button' onClick={onOpenDelModal}><img src={del} alt="Delete" /></button></TableCell>
            <Modal open={open} onClose={onCloseModal} center>
            <div style={{margin: '2em 2em'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '1em', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <p style={{fontSize: '1.5em', fontWeight: 'bolder'}}>Display Name</p>
              <p >{product.display_name}</p>
            </div>
            </div>
            </Modal>

            <Modal open={openDel} onClose={onCloseDelModal} center>
            <p style={{marginTop: '2em'}}>Are you sure you want to delete this product?</p>
            <div style={{ float: 'right'}}>
            <button onClick={onCloseDelModal}>Cancel</button>
            <button
            style={{marginLeft: '1em'}}
            onClick={() => {
              handleDelete(product.id);
              onCloseDelModal()
            }}
            >
              Yes
            </button>
            </div>
            
            </Modal>
          </TableRow>
  )
}
