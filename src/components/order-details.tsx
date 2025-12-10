import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/type";
import { format } from "date-fns";
import { Package, MapPin, CreditCard, Calendar, Hash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProductsForOrder } from "@/actions/private";



interface OrderDetailsSheetProps {
  selectedOrder: Order | null;
  isSheetOpen: boolean;
  onOpenChange: (open: boolean) => void;
}


export const OrderDetails = ({
  selectedOrder,
  isSheetOpen,
  onOpenChange,
}: OrderDetailsSheetProps) => {
  const { data: products = [] } = useQuery({
    queryKey: ["order-products", selectedOrder?.id],
    queryFn: () => {
      const productIds = selectedOrder?.order_items?.map((item) => item.product_id) || [];
      return productIds.length > 0 ? getProductsForOrder(productIds) : Promise.resolve([]);
    },
    enabled: !!selectedOrder && !!selectedOrder.order_items?.length,
  });

  if (!selectedOrder) return null;

  const itemCount = selectedOrder.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <Sheet open={isSheetOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col overflow-hidden">
        <SheetHeader className="flex-shrink-0 border-b pb-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-2xl">Order Details</SheetTitle>
              <SheetDescription className="mt-1">
                View complete information for this order
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="py-6 space-y-6">
            {/* Customer Information */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Package className="h-4 w-4" />
                Customer
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-1">
                <p className="font-semibold text-lg">
                  {selectedOrder.customers.firstname} {selectedOrder.customers.lastname}
                </p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customers.email}</p>
              </div>
            </div>

            <Separator />

            {/* Order Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  Order ID
                </p>
                <p className="font-semibold font-mono text-sm">
                  #{selectedOrder.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Order Date
                </p>
                <p className="font-semibold text-sm">
                  {format(new Date(selectedOrder.created_at), "MMM dd, yyyy")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  Payment Method
                </p>
                <p className="font-semibold text-sm capitalize">{selectedOrder.payment_method}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  Items Count
                </p>
                <p className="font-semibold text-sm">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            <Separator />

            {/* Shipping Address */}
            {selectedOrder.shipping_address && (
              <>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Shipping Address
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm">{selectedOrder.shipping_address}</p>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Order Items */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Items</h3>
              <div className="space-y-3">
                {selectedOrder.order_items && selectedOrder.order_items.length > 0 ? (
                  selectedOrder.order_items.map((item, index: number) => {
                    const product = products.find((p) => p.id === item.product_id);
                    const itemTotal = Number(item.price) * item.quantity;

                    return (
                      <div key={item.id || index} className="bg-muted/50 rounded-lg p-4">
                        <div className="flex gap-3">
                          {product?.image_url && (
                            <div className="w-14 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium">
                                {product?.name || `Product #${item.product_id}`}
                              </p>
                              <p className="font-semibold">${itemTotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Quantity: {item.quantity}</span>
                              <span>${Number(item.price).toFixed(2)} each</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No items found</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex-shrink-0 border-t px-6 py-4 bg-muted/20">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-primary">
              ${Number(selectedOrder.total_amount).toFixed(2)}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};