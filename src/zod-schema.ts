import { z } from "zod"

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    brand: z.string().min(1, "Brand is required"),
    price: z.number().min(0, "Price must be a greater than 0"),
    stock: z.number().min(0, "Stock cannot be negative"),
    sku: z.string().min(1, "SKU is required"),
})

export type Product = z.infer<typeof productSchema>