import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { toast } from "sonner"
import adidas from "../assets/Adidas Ultraboost 22.jpg"
import converse from "../assets/Converse Chuck Taylor.jpg"
import balance from "../assets/New Balance 574.jpg"
import nike from "../assets/Nike Air Max 90.jpg"
import vans from "../assets/Vans Old Skool.jpg"
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { type EditProduct } from "@/type"

const imageMap: Record <string, string>= {
    "Adidas Ultraboost 22.jpg": adidas,
    "Converse Chuck Taylor.jpg": converse,
    "New Balance 574.jpg": balance,
    "Nike Air Max 90.jpg": nike,
    "Vans Old Skool.jpg": vans,
}

const mockProduct = [
    {
        id: 1,
        name: "Adidas Ultraboost 22",
        category: "Running",
        brand: "Adidas",
        price: 180,
        stock: 25,
        status: "Active",
        image_url: "Adidas Ultraboost 22.jpg",
        description: "Experience unparalleled comfort and energy return with the Adidas Ultraboost 22, designed for runners who demand the best.",
    },
    {
        id: 2,
        name: "Converse Chuck Taylor",
        category: "Casual",
        brand: "Converse",
        price: 60,
        stock: 0,
        status: "Out of Stock",
        image_url: "Converse Chuck Taylor.jpg",
        description: "The iconic Converse Chuck Taylor, a timeless sneaker that combines classic style with modern comfort for everyday wear.",
    },
    {
        id: 3,
        name: "New Balance 574",
        category: "Lifestyle",
        brand: "New Balance",
        price: 80,
        stock: 15,
        status: "Low Stock",
        image_url: "New Balance 574.jpg",
        description: "The New Balance 574 offers a perfect blend of retro style and contemporary comfort, making it a versatile choice for any wardrobe.",
    },
    {
        id: 4,
        name: "Nike Air Max 90",
        category: "Running",
        brand: "Nike",
        price: 120,
        stock: 30,
        status: "Active",
        image_url: "Nike Air Max 90.jpg",
        description: "Step into the iconic Nike Air Max 90, featuring bold design and superior cushioning for a sneaker that stands out in both style and performance.",
    },
    {
        id: 5,
        name: "Vans Old Skool",
        category: "Skateboarding",
        brand: "Vans",
        price: 70,
        stock: 5,
        status: "Low Stock",
        image_url: "Vans Old Skool.jpg",
        description: "The Vans Old Skool, a classic skate shoe that combines durability and style, perfect for both the skate park and everyday wear.",
    }
]

const categories = ["Running", "Casual", "Lifestyle", "Skateboarding"]
const brands = ["Adidas", "Converse", "New Balance", "Nike", "Vans"]
const statusOptions = ["Active", "Out of Stock", "Low Stock"]


export const EditProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<EditProduct | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const foundProduct = mockProduct.find(p => p.id === parseInt(id!))
        if (foundProduct) {
            setProduct(foundProduct)
        } else {
            toast.error("Product not found")
            navigate("/products")
        }
    }, [id, navigate, toast])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        await new Promise(resolve => setTimeout(resolve, 1000))

        toast.success("Product updated successfully")

        setLoading(false)
        navigate("/products")
    }

    const handleInputChange = (field: string, value: string | number) => {
        setProduct(prev => prev ? { ...prev, [field]: value } : null)
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Loading...</h3>
                    <p className="text-muted-foreground">Please wait while we load the product details.</p>
                </div>
            </div>
        )
    }

  return (
    <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/products")}
                className="flex items-center gap-2"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Products
            </Button>
            <div>
                <h1 className="text-3xl font-bold">Edit products</h1>
                <p className="text-muted-foreground">Update product information and details</p>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* product image change */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Image</CardTitle>
                        <CardDescription>Upload or change the product image</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-muted">
                            <img 
                                src={imageMap[product.image_url]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <Button variant="outline" className="w-full">
                            <Upload className="h-4 w-4 mr-2" />
                            Change image
                        </Button>
                    </CardContent>
                </Card>

                {/* product details change */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                            <CardDescription>Update the product details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        value={product.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Brand</Label>
                                    <Select
                                        value={product.brand}
                                        onValueChange={(value) => handleInputChange("brand", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map(brand => (
                                                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={product.category}
                                        onValueChange={(value) => handleInputChange("category", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={product.status}
                                        onValueChange={(value) => handleInputChange("status", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map(status => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={product.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="Enter product description"
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing & Inventory</CardTitle>
                            <CardDescription>Manage pricing and stock levels</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Price (P)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        value={product.price}
                                        onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Stock Quantity</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        min="0"
                                        value={product.stock}
                                        onChange={(e) => handleInputChange("stock", parseInt(e.target.value))}
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/products")}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    </div>
  )
}
