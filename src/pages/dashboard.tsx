import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 5200 },
  { month: "Apr", revenue: 4600 },
  { month: "May", revenue: 6100 },
  { month: "Jun", revenue: 5800 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
}

const topProducts = [
  { name: "Nike Air Max 90", sales: 145, revenue: "$17,400" },
  { name: "Adidas Ultraboost", sales: 112, revenue: "$20,160" },
  { name: "Converse Chuck Taylor", sales: 98, revenue: "$6,370" },
  { name: "Vans Old Skool", sales: 87, revenue: "$6,525" },
  { name: "New Balance 574", sales: 76, revenue: "$6,460" }
]

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
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your shoe store.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          View Analytics
        </Button>
      </div>

      {/* Stats Grid */}
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
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue trends for the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="url(#fillRevenue)"
                  fillOpacity={0.4}
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
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
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} units</p>
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
    </div>
  )
}