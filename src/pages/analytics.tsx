import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"


const analyticsData = [
    {
        title: "Total Revenue",
        value: "$45,231.09",
        change: "+20.1%",
        changeType: "increase",
        icon: DollarSign,
        description: "from last month"
    },
    {
        title: "Sales",
        value: "2,345",
        change: "+15.3%",
        changeType: "increase",
        icon: ShoppingCart,
        description: "units"
    },
    {
        title: "Active Users",
        value: "1,234",
        change: "-2.5%",
        changeType: "decrease",
        icon: Users,
        description: "this month"
    },
    {
        title: "Products Sold",
        value: "892",
        change: "+12.1%",
        changeType: "increase",
        icon: Package,
        description: "total products"
    }
]

const topProducts = [
    { name: "Nike Air Max 90", sales: 145, revenue: "$17,400" },
    { name: "Adidas Ultraboost", sales: 112, revenue: "$20,160" },
    { name: "Converse Chuck Taylor", sales: 98, revenue: "$6,370" },
    { name: "Vans Old Skool", sales: 87, revenue: "$6,525" },
    { name: "New Balance 574", sales: 76, revenue: "$6,460" },
]

export default function Analytics() {
    return (
        <div className="space-y-6">
            {/* header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">
                        Track your shoe store's performance and sales metrics
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select defaultValue="7d">
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Time period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="90d">Last 90 days</SelectItem>
                            <SelectItem value="1y">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                        Export Report
                    </Button>
                </div>
            </div>

            {/* analytics grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {analyticsData.map((item, index) => (
                    <Card key={index} className="border-0 shadow-soft">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {item.title}
                            </CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                                {item.changeType === "increase" ? (
                                    <TrendingUp className="mr-1 h-3 w-3 text-success" />
                                ): (
                                    <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
                                )}
                                <span className={item.changeType === "increase" ? "text-success" : "text-destructive"}>
                                    {item.change}
                                </span>
                                <span className="ml-1">{item.description}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* charts section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* revenue chart */}
                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>
                            Monthly revenue trends for the past 6 months
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                                <p>Revenue chart would be displayed here</p>
                                <p className="text-sm">Connect to data visualization library</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* top products */}
                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                        <CardDescription>
                            Best performing shoes this month
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center 
                                        text-primary-foreground text-xs font-bold">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">{product.sales}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{product.revenue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>


            {/* performance metrics */}
            <Card className="border-0 shadow-soft">
                <CardHeader>
                    <CardTitle>Perfomance Metrics</CardTitle>
                    <CardDescription>
                        Key perfomance indicators for your business
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="text-center p-6 rounded-lg bg-gradient-surface">
                            <div className="text-3xl font-bold text-primary">87%</div>
                            <p className="text-sm text-muted-foreground mt-1">Customer Satisfaction</p>
                        </div>
                        <div className="text-center p-6 rounded-lg bg-gradient-surface">
                            <div className="text-3xl font-bold text-success">94%</div>
                            <p className="text-sm text-muted-foreground mt-1">Order Fulfillment Rate</p>
                        </div>
                        <div className="text-center p-6 rounded-lg bg-gradient-surface">
                            <div className="text-3xl font-bold text-warning">3.2</div>
                            <p className="text-sm text-muted-foreground">Avg. Days To Ship</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}