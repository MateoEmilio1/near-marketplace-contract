import { PersistentUnorderedMap } from "near-sdk-as";

export const products = new PersistentUnorderedMap<string, string>("PRODUCTS");

// create a function to add a new product to the products map --- WRITE FUNCTION ---
export function setProduct(id: string, productName: string): void {
    products.set(id, productName);
}

/* Functions that need to be invoked from the outside of the smart contract need to be exported by adding the export keyword.

Our setProduct function needs two parameters: id and productName. The id parameter is the key of the product, and the productName parameter is the value of the product.

We need to specify the return type of the function, which is void, since we don't need to return anything.

To create a new entry to our products mapping we just need to call the set function on the mappings instance (products) and pass the key and value as parameters.
*/

// create a function to RETRIEVE a product FROM the products map --- READ FUNCTION ---
export function getProduct(id: string): string | null {
    return products.get(id);
}

/*
We export the getProduct function and just have one parameter id, which is the key of the product we want to retrieve.

The return type of the function is string | null, since we can return either a product name or null if the product doesn't exist.

In the function body we call the get function on the products mapping, pass the key as a parameter and return the value.

Warning: The key for the persistent collection should be as short as possible to reduce storage space because 
this key will be repeated for every record in the collection. 
Here, we only used the longer PRODUCTS key to add more readability for first-time NEAR developers.

*/