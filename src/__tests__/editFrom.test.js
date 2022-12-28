import EditProductInArray from "../lib/EditProduct";

describe("editing products", function() {
    it("should edit a selected product", function() {
        const editedProduct = [
            {
                id: 5,
                display_name: "PARARARACETAMOL",
                walk_in_selling_price: 30,
                cost_price: 40,
                mutti_selling_price: 90,
                insurance_unit_price: 2,
                human_name: {unit_of_measure: "INFUSION"}
            }]
          
        const dummyProducts = [{
            id: 5,
            display_name: "PARACETAMOL",
            walk_in_selling_price: 20,
            cost_price: 30,
            mutti_selling_price: 40,
            insurance_unit_price: 50,
            human_name: {unit_of_measure: "GEL"}
            }, {
            id: 6,
            display_name: "AMOXIL",
            walk_in_selling_price: 40,
            cost_price: 70,
            mutti_selling_price: 20,
            insurance_unit_price: 10,
            human_name: {unit_of_measure: "SUSPENSION"}
            }
        ];
        const editedArr = EditProductInArray(editedProduct, dummyProducts)
        expect(editedArr).toContainEqual(editedProduct)
    });
})