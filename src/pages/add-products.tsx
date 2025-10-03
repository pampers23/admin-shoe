import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { toast } from "sonner"
import { type Product, productSchema } from "@/zod-schema"
import { Textarea } from "@/components/ui/textarea"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addProducts } from "@/actions/private"
import { uploadImage } from "@/actions/upload"

function AddProducts() {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null) 

    const form = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            brand: "",
            price: 0,
            stock: 0,
            sku: "",
        },
    })

    const addProduct = useMutation({
        mutationFn: addProducts,
        onSuccess: (data) => {
            console.log("Product added successfully", data);
            toast.success("Product added successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/products");
        },
        onError: (error) => {
            console.error("Failed to add product:", error);
            toast.error("Failed to add product: " + error.message);
        }
    })

    const onSubmit = async (values: Product) => {
        setIsSubmitting(true);
        try {
            let imageUrl = "";

            if (uploadedFile) {
                imageUrl = await uploadImage(uploadedFile);
            }

            const result = await addProduct.mutateAsync({
                ...values,
                image_url: imageUrl
            })
        } catch (error) {
            console.error("Insert error: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    
  return (
    <div className="space-y-6">
        {/* header */}
        <div className="flex items-center gap-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/products")}
                className="hover:bg-accent cursor-pointer"
            >
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                <p className="text-muted-foreground">
                    Add a new shoe to your inventory calatalog.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* main form */}
            <div className="lg:col-span-2">
                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                        <CardDescription>
                            Enter the basic details for your new product.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="hover:border-blue-400"
                                                    placeholder="Add product" 
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                <FormField
                                    control={form.control}
                                    name="sku"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SKU</FormLabel>
                                            <FormControl>
                                                <Input placeholder="NK-AM90-001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                   placeholder="Describe your product features, materials and benefits..."
                                                   className="min-h-[100px]:"
                                                   {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-[368px]">
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Sneakers">Sneakers</SelectItem>
                                                        <SelectItem value="Running">Running</SelectItem>
                                                        <SelectItem value="Casual">Casual</SelectItem>
                                                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                                        <SelectItem value="Sport">Formal</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField 
                                        control={form.control}
                                        name="brand"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Brand</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Type the brand..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price (P)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Initial Stock</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-green-500 hover:opacity-90 transition-opacity hover:bg-green-600 cursor-pointer"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        {isSubmitting ? "Adding Product..." : "Add Product"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => navigate("/products")}
                                        className="cursor-pointer"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

            {/* sidebar */}
            <div className="space-y-6">
                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle>Product Image</CardTitle>
                        <CardDescription>
                            Upload product images to showcase your product.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setUploadedFile(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setSelectedImage(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            {selectedImage ? (
                                <div className="relative">
                                    <img 
                                        src={selectedImage} 
                                        alt="Product Preview"
                                        className="w-full h-48 object-cover rounded-lg" 
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity 
                                    rounded-lg flex items-center justify-center">
                                        <p className="text-white text-sm">Click to change image</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer h-48 flex flex-col items-center justify-center">
                                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-sm text-muted-foreground mb-2">
                                    Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                    PNG, JPG or WEBP (max. 5MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle>Quick Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="text-sm">
                            <p className="font-medium text-foreground mb-1">Product name</p>
                            <p className="text-muted-foreground">Use clear, descriptive names that customers will search for.</p>
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-foreground mb-1">SKU</p>
                            <p className="text-muted-foreground">Create unique identifiers for inventory tracking.</p>
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-foreground mb-1">Stock level</p>
                            <p className="text-muted-foreground">Set initial stock quantity. You can adjust this later.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default AddProducts