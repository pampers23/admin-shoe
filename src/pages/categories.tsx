
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Package } from "lucide-react"
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import type { Categories } from "@/type"
import { getCategories } from "@/actions/private"


const Categories = () => {
  const { data: categories = [], isPending } = useQuery<Categories[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })
  
  if (isPending) {
    return (
      <div className="h-96 w-full flex flex-col gap-4 items-center justify-center my-7 md:my-14">
        <p className="text-sm text-muted-foreground animate-pulse">Fetching products...</p>
        <Tailspin size="100" stroke="10" speed="0.9" color="#262E40" />
      </div>
    );
  }
  const handleDelete = (name: string) => {
    toast(`${name} deleted!`)
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
          <Card key={category.name} className="border-0 shadow-soft hover:shadow-elegant transition-shadow duration-300">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category.name)}
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
    </div>
  )
}

export default Categories;