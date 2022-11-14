import React, { useState, useEffect, Fragment } from 'react'
import '../styles/home.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Add from './Add'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListProd from './ListProd'
import Edit from './Edit';

export default function Home() {
  const [products, setProducts] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openEd, setOpenEd] = useState(false);

  const getProduct = async () => {
    const response = await fetch('https://run.mocky.io/v3/c9a84e20-f49e-4e58-8f9e-e1b9c211320e')
    const data = await response.json()
    console.log(data.results)
    setProducts(data.results) 
  }

  const onOpenModalEd = () => setOpenEd(true);
  const onCloseModalEd = () => setOpenEd(false);

  const addRows = (data) => {
    const totalProducts = products.length;
    data.id = totalProducts + 1;
    const updatedProductData = [...products];
    updatedProductData.push(data);
    setProducts(updatedProductData);
  };

  const onOpenModalAdd = () => setOpenAdd(true);
  const onCloseModalAdd = () => setOpenAdd(false)


  const [editProdID, setEditProdID] = useState(null)
  const handleEdit = (e, product) => {
    e.preventDefault();
    setEditProdID(product.id)

    const formVal = {
      display_name: product.display_name,
      walk_in_selling_price: product.walk_in_selling_price,
      cost_price: product.cost_price,
      mutti_selling_price: product.mutti_selling_price,
      insurance_unit_price: product.insurance_unit_price,
      name: product.unit_of_measure?.human_name
    }
    setEditForm(formVal)
  }

  const [editForm, setEditForm] = useState({
    display_name: "",
    walk_in_selling_price: "",
    cost_price: "",
    mutti_selling_price: "",
    insurance_unit_price: "",
    name: ""
  })
  const handleEditForm = (e) => {
    e.preventDefault();
    const cellName = e.target.getAttribute("name");
    const cellVal = e.target.value;

    const newFormData = { ...editForm};
    newFormData[cellName] = cellVal

    setEditForm(newFormData)
  }

  const handleEditFormSumbit = (e) => {
    e.preventDefault();
    const editedProduct = {
      id: editProdID,
      display_name: editForm.display_name,
      walk_in_selling_price: editForm.walk_in_selling_price,
      cost_price: editForm.cost_price,
      mutti_selling_price: editForm.mutti_selling_price,
      insurance_unit_price: editForm.insurance_unit_price,
      name: editForm.unit_of_measure?.human_name
    }
    const newProd = [...products]
    const index = products.findIndex((product)=> product.id === editProdID)
    newProd[index] = editedProduct;
    setProducts(newProd)
    setEditProdID(null)
  }

  const handleCancel = () => {
    setEditProdID(null)
  }

  const handleDelete = (prodID) => {
    const newProd = [...products]
    const index = products.findIndex((prod)=> prod.id === prodID)
    newProd.splice(index, 1)
    setProducts(newProd)
  }

  useEffect(() => {
    getProduct()
  }, [])
  return (
    <div>
      <div className='edit-modal'>
      <button onClick={onOpenModalAdd} style={{float:"right"}}>Add Product</button>
        <Modal open={openEd} onClose={onCloseModalEd} center>
          <h3>Edit</h3>
          <button>Save</button>
        </Modal>
      </div>
      <form onSubmit={handleEditFormSumbit}>
      <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='link-row'></TableCell>
            <TableCell className='a-left name'>Product Name</TableCell>
            <TableCell className='a-mid'></TableCell>
            <TableCell className='a-right price'>Selling Price (GHS)</TableCell>
            <TableCell className='a-right price'>Cost Price (GHS)</TableCell>
            <TableCell className='a-right price'>Mutti Price (GHS)</TableCell>
            <TableCell className='a-right price'>Insurance Price (GHS)</TableCell>
            <TableCell className='a-left sold'>How it's sold</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='tbody'>
          {products.map((product, i) => (
            <Fragment>
              {editProdID === product.id ? (
                <Edit 
                editForm={editForm} 
                handleEditForm={handleEditForm}
                handleCancel={handleCancel}/>
              ) : (
                <ListProd 
                  product={product}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}/>
              ) }
            </Fragment>
            
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </form>
      <Add 
        onCloseModalAdd={onCloseModalAdd}
        openAdd={openAdd}
        func={addRows} />
      </div>
  )
}