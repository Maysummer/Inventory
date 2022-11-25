// export function markAsDeleted(product){
//     return { ...product, deleted: true }
// }

export function  markAsDeleted (prodID, products) {
    const newProd = [...products]
    const index = products.findIndex((prod)=> prod.id === prodID)
    const deletedProd = newProd[index]
    deletedProd.deleted = true
    const finalProducts = newProd.filter(del => del.deleted === false)
    return finalProducts
}