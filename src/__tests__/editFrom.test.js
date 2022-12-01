import { editProduct } from "../lib/editProduct";

describe("editing products", function() {
    it("should edit a selected product", function() {
        const editedProduct = [
            {
              id: 5,
              display_name: "",
              cost_price: "",
            }]
          
        const dummyProducts = [{
            id: 5,
            display_name: "FLAGYL",
            cost_price: 40,
        }];
        const editedArr = editProduct(editedProduct, dummyProducts)
        expect(editedArr).toContainEqual(editedProduct)
    });
})