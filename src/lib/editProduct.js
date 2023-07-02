export default function EditProductInArray(index, product, products) {
  const newProd = [...products]
  newProd[index] = product;
  return newProd
}