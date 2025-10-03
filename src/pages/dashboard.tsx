import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import { useQuery } from "@tanstack/react-query"
import { getRecentProducts, getStats } from "@/actions/private"
import { Badge } from "@/components/ui/badge"
import { Package, TrendingUp, Users } from "lucide-react"



export default function Dashboard(){
    const { data: products = [], isLoading: productsLoading } = useQuery({
        queryKey: ["recent-products"],
        queryFn: getRecentProducts
    })

    const { data: stats = [], isLoading: statsLoading } = useQuery({
        queryKey: ["stats"],
        queryFn: getStats
    })


    const getStatusBadge = (stock: number) => {
        if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>
        if (stock < 20) return <Badge className="bg-yellow-500">Low Stock</Badge>
        return <Badge className="bg-green-500">Active</Badge>
    }

    if (productsLoading || statsLoading) {
    return (
      <div className="h-96 w-full flex flex-col gap-4 items-center justify-center my-7 md:my-14">
        <p className="text-sm text-muted-foreground animate-pulse">Fetching products...</p>
        <Tailspin size="100" stroke="10" speed="0.9" color="#262E40" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* header */}
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's an overview of your shoe store
                </p>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                View Analytics
            </Button>
        </div>

        {/* stats grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-soft hover:shadow-elegant transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                            <stat.icon className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold ">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* recent acitivty */}
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-soft">
                <CardHeader>
                    <CardTitle>Recent Products</CardTitle>
                    <CardDescription>
                        Latest shoes added to your inventory
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {products.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-200/45">
                                <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">{product.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium pr-2">{product.price}</p>
                                    <p 
                                        >
                                            {getStatusBadge(product.stock)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        Common tasks and shortcuts
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <a href="/products">
                                <Package className="mr-2 w-4 h-4" />
                                Add New Product
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <a href="/categories">
                                <Users className="mr-2 h-4 w-4" />
                                Manage Categories
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <a href="/analytics">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                View Reports
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
