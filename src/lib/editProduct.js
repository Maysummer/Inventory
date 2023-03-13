// export default function EditProductInArray(product, products = []) {
//     const spreadProducts = [...products];
//     spreadProducts.map((obj, index) => {
//       if (obj.id === product.id) {
//         obj = {
//           ...product,
//           id: product.id,
//           display_name: product.display_name,
//           walk_in_selling_price: Number(product.walk_in_selling_price).toFixed(2),
//           cost_price: Number(product.cost_price).toFixed(2),
//           insurance_unit_price: Number(product.insurance_unit_price).toFixed(2),
//           mutti_selling_price: Number(product.mutti_selling_price).toFixed(2),
//           unit_of_measure: { human_name: product.unit_of_measure.human_name },
//           price: obj.price.concat([
//             { cost_price: Number(product.cost_price), timeStamp: new Date() },
//           ]),
//         };
//         spreadProducts[index] = obj;
//       }
//       return obj;
//     });
  
//     console.log(spreadProducts);
//     return spreadProducts;
//   }


export default function EditProductInArray(index, product, products) {
  const newProd = [...products]
  newProd[index] = product;
  console.log(newProd[index])
  console.log(newProd)
  return newProd

  // const newProd = products.map(prod => {
  //   if (prod.id == product.id) {
  //     products[index] = product
  //   }
  // }
  // )
  // return newProd
}