import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Package, TrendingUp, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"


const stats = [
    {
        title: "Total Products",
        value: "124",
        description: "+12% from last month",
        icon: Package,
        color: "bg-blue-500"
    },
    {
        title: "Revenue",
        value: "$23,456",
        description: "+8% from last month",
        icon: DollarSign,
        color: "bg-green-500"
    },
    {
        title: "Active Orders",
        value: "45",
        description: "+15% from last week",
        icon: TrendingUp,
        color: "bg-purple-500"
    },
    {
        title: "Customers",
        value: "892",
        description: "+3% from last month",
        icon: Users,
        color: "bg-orange-500"
    },
]

const products = [
    { name: "Nike Air Max 90", category: "Sneakers", price: "$120", status: "Active" },
    { name: "Addidas Ultraboost 22", category: "Running", price: "$180", status: "Active" },
    { name: "Converse Chuck Taylor", category: "Casual", price: "$65", status: "Draft" },
]


export default function Dashboard(){
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
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">{product.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{product.price}</p>
                                    <p className="text-sm text-muted-foreground">{product.status}</p>
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
