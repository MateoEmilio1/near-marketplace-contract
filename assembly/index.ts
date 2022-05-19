import { PersistentUnorderedMap } from "near-sdk-as";
import { Product, listedProducts } from "./model";

export const products = new PersistentUnorderedMap<string, string>("PRODUCTS");

export function setProduct(product: Product ): void{
    //como funciona el tipo LET: the scope (alcance) of let variables is limited to their containing block, en este caso setProduct
    let storedProduct = listedProducts.get(product.id);
    if(storedProduct !== null ){ // Checkeamos si el valor del product id ya existe en el mapa, si existe tiramos un Error
        // !== checkea si el valor de algo es igual al valor de el, y si es del mismo tipo 
        //(ej x=1 , x es integer , x === true, va a dar false, pq x es integer y true es booleano )
        //entonces aca evalua si storedProduct (tipo Product) es distinto del tipo NULO, va a dar true, lo que significa que
        // el producto YA EXISTE.
        throw new Error('a product with ${product.id} already exists');
    }
    /*  ---------------Mapeo el producto-------------
      que hace set? 
            Sets the new value for the given key.

            @param key — Key of the element.

            @param value — The new value of the element. */
        
    listedProducts.set(product.id, Product.fromPayload(product)); //si no existe el producto, creamos uno nuevo, new Product object desde
    // el payload y lo almacenamos en la listedProducts map

}

/* Functions that need to be invoked from the outside of the smart contract need to be exported by adding the export keyword.

Our setProduct function needs two parameters: id and productName. The id parameter is the key of the product, and the productName parameter is the value of the product.

We need to specify the return type of the function, which is void, since we don't need to return anything.

To create a new entry to our products mapping we just need to call the set function on the mappings instance (products) and pass the key and value as parameters.
*/

// create a function to RETRIEVE a product FROM the products map --- READ FUNCTION ---
export function getProduct(id: string): Product | null {
    return listedProducts.get(id);
}

/*
We export the getProduct function and just have one parameter id, which is the key of the product we want to retrieve.

The return type of the function is string | null, since we can return either a product name or null if the product doesn't exist.

In the function body we call the get function on the products mapping, pass the key as a parameter and return the value.

Warning: The key for the persistent collection should be as short as possible to reduce storage space because 
this key will be repeated for every record in the collection. 
Here, we only used the longer PRODUCTS key to add more readability for first-time NEAR developers.

*/
 // Devuelve todos los productos 
export function getProducts(): Product[] {
    return listedProducts.values();
}