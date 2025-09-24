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