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
import { useNavigate, useParams } from "react-router-dom"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getProductById, updateProduct } from "@/actions/private"
import { Tailspin } from "ldrs/react"
import "ldrs/react/Tailspin.css"

const categories = ["Running", "Casual", "Lifestyle", "Skateboarding", "Sport"]
const brands = ["Adidas", "Converse", "New Balance", "Nike", "Vans", "Puma", "Reebok"]

export const EditProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: product, isPending } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(Number(id)),
        enabled: !!id,
    });

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "",
        description: "",
        price: 0,
        stock: 0,
        image_url: "",
    });

    React.useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                brand: product.brand || "",
                category: product.category || "",
                description: product.description || "",
                price: product.price || 0,
                stock: product.stock || 0,
                image_url: product.image_url || "",
            });
        }
    }, [product]);

    const updateMutation = useMutation({
        mutationFn: (updates: typeof formData) => updateProduct(Number(id), updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
            navigate("/products");
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation.mutate(formData);
    };

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (isPending) {
        return (
            <div className="h-96 w-full flex flex-col gap-4 items-center justify-center my-7 md:my-14">
                <p className="text-sm text-muted-foreground animate-pulse">Loading product...</p>
                <Tailspin size="100" stroke="10" speed="0.9" color="#262E40" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Product not found</h3>
                    <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate("/products")} className="mt-4">
                        Back to Products
                    </Button>
                </div>
            </div>
        );
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
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-muted-foreground">Update product information and details</p>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* product image */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Image</CardTitle>
                        <CardDescription>Upload or change the product image</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-muted">
                            {formData.image_url ? (
                                <img 
                                    src={formData.image_url}
                                    alt={formData.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    No image
                                </div>
                            )}
                        </div>
                        <Button variant="outline" className="w-full" type="button">
                            <Upload className="h-4 w-4 mr-2" />
                            Change image
                        </Button>
                    </CardContent>
                </Card>

                {/* product details */}
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
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Brand</Label>
                                    <Select
                                        value={formData.brand}
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
                                        value={formData.category}
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
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
                                    <Label>Price (₱)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
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
                                        value={formData.stock}
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
                <Button type="submit" disabled={updateMutation.isPending}>
                    <Save className="h-4 w-4 mr-2" />
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    </div>
  )
}