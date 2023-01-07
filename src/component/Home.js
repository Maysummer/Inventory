import React, { useState, useEffect, Fragment } from 'react'
import '../styles/home.css'
import 'react-responsive-modal/styles.css';
import Add from './Add'
import { CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListProd from './ListProd'
import Edit from './Edit';
import EditProductInArray from '../lib/EditProduct'

export function  markAsDeleted (prodID, products) {
  const newProd = [...products]
  const index = products.findIndex((prod)=> prod.id === prodID)
  const deletedProd = newProd[index]
  deletedProd.deleted = true
  return newProd
}


export default function Home() {
  const [products, setProducts] = useState([])
  const [openAdd, setOpenAdd] = useState(false)

  const getProduct = async () => {
    const response = await fetch('https://run.mocky.io/v3/c9a84e20-f49e-4e58-8f9e-e1b9c211320e')
    const data = await response.json()
    const displayProducts = data.results.map(obj => ({...obj, deleted:false, price: [{cost_price: obj.cost_price, timeStamp: new Date()}]}));
    setProducts(displayProducts)
    console.log(displayProducts)
  }

  const addRows = (data) => {
    const totalProducts = products.length;
    data.id = totalProducts + 1;

    const formVal = {
      display_name: data.display_name,
      walk_in_selling_price: data.walk_in_selling_price,
      cost_price: data.cost_price,
      mutti_selling_price: data.mutti_selling_price,
      insurance_unit_price: data.insurance_unit_price,
      unit_of_measure: {human_name: data.human_name},
      price: [{cost_price: data.cost_price, timeStamp: new Date()}],
      deleted: false
    }

    const updatedProductData = [...products];
    updatedProductData.push(formVal);
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
      unit_of_measure: product.unit_of_measure.human_name,
      price: [{cost_price: product.cost_price, timeStamp: new Date()}],
      deleted: false
    }
    setEditForm(formVal)
  }
  
  const [editForm, setEditForm] = useState({
    display_name: "",
    walk_in_selling_price: "",
    cost_price: "",
    mutti_selling_price: "",
    insurance_unit_price: "",
    human_name: "",
  })
  const handleEditForm = (e) => {
    e.preventDefault();
    const cellName = e.target.name;
    const cellVal = e.target.value;
    const newFormData = { ...editForm};
    newFormData[cellName] = cellVal
    setEditForm(newFormData)
  }
  
  const handleEditFormSumbit = (e) => {
    e.preventDefault();
    const index = products.findIndex((product)=> product.id === editProdID)
    const editedProduct = {
      id: editProdID,
      display_name: editForm.display_name,
      walk_in_selling_price: editForm.walk_in_selling_price,
      cost_price: editForm.cost_price,
      mutti_selling_price: editForm.mutti_selling_price,
      insurance_unit_price: editForm.insurance_unit_price,
      unit_of_measure: {human_name: editForm.human_name},
      price: [
        ...products[index].price, 
        {cost_price: editForm.cost_price, timeStamp: new Date()}
        ],
      deleted: false
    }
    console.log(editedProduct)
    const newEdit = EditProductInArray(editedProduct, products)
    // const newProd = [...products]
    // newProd[index] = editedProduct;
    // setProducts(newProd)
    setProducts(newEdit)
    setEditProdID(null)
  }

  const handleCancel = () => {
    setEditProdID(null)
  }

  const handleDelete = (prodID) => {
    setProducts(markAsDeleted(prodID, products))
    const deletedProducts = products.filter(del => del.deleted === true)
    console.log("Deleted Products: \n", deletedProducts)
  }

  useEffect(() => {
    getProduct()
  }, [])
  console.log(products)
  return (
    <div>
      {products.length >= 1 ?
      <>
      <div className='edit-modal'>
      <button onClick={onOpenModalAdd} style={{float:"right"}}>Add Product</button>
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
          {products.filter(del => del.deleted === false).map((product, i) => (
            <Fragment key={i}>
              {editProdID === product.id ? (
                <Edit 
                editForm={editForm} 
                handleEditForm={handleEditForm}
                handleCancel={handleCancel}
                product={product}/>
              ) : (
                <ListProd 
                product={product}
                handleEdit={handleEdit}
                handleDelete={handleDelete}/>
              )}
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
        </>
        : <CircularProgress
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}/>}
    </div>
  )
}