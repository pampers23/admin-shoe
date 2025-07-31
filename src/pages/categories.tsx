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
import { Plus, Edit, Trash2, Package } from "lucide-react"
import { toast } from "sonner"


const mockCategories = [
  { id: 1, name: "Sneaker", description: "Athlethic and casual sneakers", productCount: 34, color: "bg-blue-500" },
  { id: 2, name: "Running", description: "Performance running man", productCount: 18, color: "bg-green-500" },
  { id: 3, name: "Casual", description: "Everyday casual footwear", productCount: 25, color: "bg-purple-500" },
  { id: 4, name: "Lifestyle", description: "Lifestyle and fashion shoes", productCount: 12, color: "bg-orange-500" },
  { id: 1, name: "Formal", description: "Dress and formal shoes", productCount: 8, color: "bg-gray-500" },
]


export const Categories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const handleDelete = (id: number) => {
    setCategories(categories.filter(c => c.id !== id))
    toast("Category deleted!")
  }


  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Organize your products into categories for better management.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 tracking-opacity">
          <Plus className="mr-2 h-2 w-4" />
          Add Category
        </Button>
      </div>

      {/* categories grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="border-0 shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${category.color} text-white`}>
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    {category.productCount} products
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* add category form */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Quick Add Category</CardTitle>
          <CardDescription>
            Create a new product category quickly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Input placeholder="Category name" />
            <Input placeholder="Description" />
            <Button>Add Category</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
