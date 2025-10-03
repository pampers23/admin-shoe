export type Product = {
    name: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
    sku: string;
    description: string;
    brand: string;
}

export type EditProduct = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
    description: string;
    brand: string;
    status: string;
}

export type getLimitedProducts = {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    image_url: string;
}

export type Order = {
    total_amount: number;
    status: "pending" | "completed" | "cancelled";
}

export type Categories = {
    name: string;
    productCount: number;
    description: string;
    color: string;
}