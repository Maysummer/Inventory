import React, { useState}from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import link from '../link_icon.svg'
import del from '../del-icon.png'
import edit from '../edit-icon.png'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Edit from './Edit'
import '../styles/listProd.css'

export default function ListProd({ product, handleEdit, handleDelete }) {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [openDel, setOpenDel] = useState(false);
  const onOpenDelModal = () => setOpenDel(true);
  const onCloseDelModal = () => setOpenDel(false);

  const [openEdit, setOpenEdit] = useState(false);
  const onCloseEditModal = () => setOpenEdit(false);

  return (
    <TableRow>
            <TableCell className='link'><div className='ebutton'><button onClick={onOpenModal}><img src={link} alt="link symbol" /></button></div></TableCell>
            <TableCell className='a-left name'>{product.display_name}</TableCell>
            <TableCell className='a-mid'>-</TableCell>
            <TableCell className='a-right price'>{Number(product.walk_in_selling_price).toFixed(2)}</TableCell>
            <TableCell className='a-right price'>{Number(product.cost_price).toFixed(2)}</TableCell>
            <TableCell className='a-right price'>{Number(product.mutti_selling_price).toFixed(2)}</TableCell>
            <TableCell className='a-right price'>{Number(product.insurance_unit_price).toFixed(2)}</TableCell>
            <TableCell className='a-left sold'>{product.unit_of_measure?.human_name}</TableCell>
            <TableCell><div className='ebutton'><button type='button' onClick={(e)=>handleEdit(e, product)}><img src={edit} alt="Edit"/></button></div></TableCell>
            <TableCell><div className='ebutton'><button type='button' onClick={onOpenDelModal}><img src={del} alt="Delete" /></button></div></TableCell>
      
            <Modal open={open} onClose={onCloseModal} center>
            <div style={{margin: '2em 2em'}}>
              <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '1em', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                  <p style={{fontSize: '1em', fontWeight: 'bolder'}}>Display Name</p>
                  <p >{product.display_name}</p>
                </div>
              </div>
            </div>
            </Modal>

            {/* for putting edit in a modal */}
            <Modal open={openEdit} onClose={onCloseEditModal} center>
              <Edit />
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
