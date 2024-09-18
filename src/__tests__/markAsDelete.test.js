import { markAsDeleted } from "../redux/inventorySlicer";

describe("Deleting products", function (){
    it("should mark a selected product as deleted", function () {
        const dummyProduct = [{
            id: 1,
            display_name: "FLAGYL",
            walk_in_selling_price: 60,
            cost_price: 40,
            insurance_unit_price: 50,
            human_namme: "CONSUMABLE",
            deleted: false,
        }];

        const newProduct = markAsDeleted(1, dummyProduct);

        expect(newProduct).toEqual([{
            id: 1,
            display_name: "FLAGYL",
            walk_in_selling_price: 60,
            cost_price: 40,
            insurance_unit_price: 50,
            human_namme: "CONSUMABLE",
            deleted: true
        }]);
    });
})