import { PersistentUnorderedMap, u128, context } from "near-sdk-as"

@nearBindgen //to serialize our custom class before storing it on the blockchain.

export class Product{
    id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    price: u128;
    owner: string;
    sold: u32;
    
    // ALTA DEL PRODUCTO
    public static fromPayload(payload: Product ): Product {
        const product = new Product(); 
        product.id = payload.id;
        product.name = payload.name;
        product.description = payload.description;
        product.image = payload.image;
        product.location = payload.location;
        product.price = payload.price;
        product.owner = context.sender; //retrive the account id of the account that is calling the function.

        return product;
    }

    public incrementSoldAmount(): void {
        this.sold = this.sold + 1;
    }
}
// LISTED PRODUCTS: is a persistent unordered map and will replace the products map that we previously stored in our index.ts file.
export const listedProducts = new PersistentUnorderedMap < string, Product > ("LISTED_PRODUCTS");

/* porque no lo hacemos de otra forma?
We could also migrate the data from the products map to the listedProducts map, 
but this is an advanced topic that is out of scope for this learning module. */

/*we will use a more readable version of a key for LISTED_PRODUCTS to provide more readability to our code. 
To reduce storage space, you should pick a shorter key. */