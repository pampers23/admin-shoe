import AuthGuard from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import AddProducts from "@/pages/add-products"
import Analytics from "@/pages/analytics"
import Categories from "@/pages/categories"
import Dashboard from "@/pages/dashboard"
import { EditProducts } from "@/pages/edit-products"
import Login from "@/pages/auth/login"
import NotFound from "@/pages/not-found"
import Orders from "@/pages/orders"
import Products from "@/pages/products"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with layout */}
        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProducts />} />
          <Route path="products/edit/:id" element={<EditProducts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes