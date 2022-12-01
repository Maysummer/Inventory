export function  editProduct (product, products) {
    const newProd = [...products]
    // const index = products.findIndex((product)=> product.id === editProdID)
    // newProd[index] = editedProduct;
    newProd.map((obj, i) => {
        if (obj.id === product.id) {
            obj = {
                ...product,
                id: product.id,
                display_name: product.display_name,
                cost_price: product.cost_price,
            };
            newProd[i] = obj;
        }
        return obj;
    });
    return newProd;
}