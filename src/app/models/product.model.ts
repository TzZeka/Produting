// product.model.ts
export interface Product {
    id: string ;  
    name: string ;
    price: number ;
    description: string ;
    quantity: number ;
    [key: string]: any; 
  }
  