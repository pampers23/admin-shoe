import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { getStats, getRecentProducts } from "@/actions/private"
import { Tailspin } from "ldrs/react"
import "ldrs/react/Tailspin.css"

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
    color: "hsl(blue, 100%, 50%)",
  },
}

export default function Dashboard() {
  const { data: stats = [], isPending: statsLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  })

  const { data: topProducts = [], isPending: productsLoading } = useQuery({
    queryKey: ["recent-products"],
    queryFn: getRecentProducts,
  })

  if (statsLoading || productsLoading) {
    return (
      <div className="h-96 w-full flex flex-col gap-4 items-center justify-center">
        <p className="text-sm text-muted-foreground animate-pulse">Loading dashboard...</p>
        <Tailspin size="100" stroke="10" speed="0.9" color="#262E40" />
      </div>
    )
  }

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

        {/* Top Products - showing recent products from DB */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>
              Latest products added to inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No products found
                </p>
              ) : (
                topProducts.slice(0, 4).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.brand} • {product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₱{product.price}</p>
                      <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}