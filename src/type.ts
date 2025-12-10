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

// export type Order = {
//     id: string;
//     customerName: string;
//     email: string;
//     date: string;
//     status: "pending" | "completed" | "delivered" | "cancelled";
//     total: number;
//     items: number;
// }

export type Category = {
    name: string;
    productCount: number;
    description: string;
    color: string;
}

export type OrderItem = {
    id: string;
    quantity: number;
    name: string;
    price: number;
    product_id: number;
}

export type Customer = {
    firstname: string;
    lastname: string;
    email: string;
}

export type Order = {
    id: string;
    customer_id: string;
    payment_method: string;
    total_amount: number;
    status: "pending" | "completed" | "delivered" | "cancelled";
    shipping_address: string;
    created_at: string;
    customers: Customer;
    order_items: OrderItem[];
}
export const statusColors: Record<Order['status'], string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
}