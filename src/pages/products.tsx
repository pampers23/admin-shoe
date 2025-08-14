import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Trash2, Eye } from "lucide-react"
import nike from "@/assets/Nike Air Max 90.jpg"
import adidas from "@/assets/Adidas Ultraboost 22.jpg"
import converse from "@/assets/Converse Chuck Taylor.jpg"
import vans from "@/assets/Vans Old Skool.jpg"
import new_balance from "@/assets/New Balance 574.jpg"
import { toast } from "sonner"


const mockProducts = [
  {
    id: 1,
    name: "Nike Air Max 90",
    category: "Sneakers",
    brand: "Nike",
    price: 120,
    stock: 50,
    status: "Active",
    image: {nike},
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    category: "Running",
    brand: "Adidas",
    price: 180,
    stock: 23,
    status: "Active",
    image: {adidas},
  },
  {
    id: 3,
    name: "Converse Chuck Taylor",
    category: "Casual",
    brand: "Converse",
    price: 65,
    stock: 0,
    status: "Out of Stock",
    image: {converse},
  },
  {
    id: 4,
    name: "Vans Old Skool",
    category: "Casual",
    brand: "Vans",
    price: 75,
    stock: 12,
    status: "Low Stock",
    image: {vans},
  },
  {
    id: 5,
    name: "New Balance 574",
    category: "Lifestyle",
    brand: "New Balance",
    price: 85,
    stock: 67,
    status: "Active",
    image: {new_balance},
  },
]



const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState(mockProducts)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "Out of Stock" || stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }

    if (status === "Low Stock" || stock < 20) {
      return <Badge variant="secondary" className="bg-warning text-warning-foreground">Low Stock</Badge>
    }

    return <Badge variant="secondary" className="bg-success text-success-foreground">Active</Badge>
  }


  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
    toast("Product deleted successfully")
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xxl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your shoe inventory and product catalog.
          </p>
        </div>
        <Button className="bg-gradient-primary text-black hover:text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* filters */}
      <Card className="border-0 shadow-soft">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Sneakers">Sneakers</SelectItem>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* products table */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                {filteredProducts.length} products found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {getStatusBadge(product.status, product.stock)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="text-destructive hover:bg-destructive"
                      >
                        <Trash2 className="h-4 w-4" /> 
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Products;