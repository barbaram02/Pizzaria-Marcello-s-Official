export interface Order{
    created_at: string, 
    draft: boolean, 
    id: string, 
    name?: string | null, 
    status: boolean, 
    table: number, 
    item?: Item[];
}

export interface Category{
    id: string,
    name: string,
    createdAt: string;
}

export interface Product{
    id: string,
    name: string,
    price: number,
    description: string,
    category_id: string,
    createdAt: string,
    banner: string;
    disabled: boolean
    category?: Category;
}

export interface Item{
    id: string,
    created_at: string, 
    order_id: string, 
    product_id: string, 
    amount: number,
    product: Product,
}

