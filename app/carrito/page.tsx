"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, FileText } from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Paquete de hojas de papel bond",
    price: 2.15,
    quantity: 1,
  },
  {
    id: 2,
    name: "Cartel de cartulina",
    price: 0.75,
    quantity: 2,
  }
];

export default function CartPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD"
    }).format(price);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const iva = subtotal * 0.15;
  const total = subtotal + iva;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Carrito de Compras</h1>

      <Card>
        <CardHeader>
          <CardTitle>Productos en el carrito</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio Unitario</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col items-end space-y-4">
          <div className="text-right space-y-2">
            <p>Subtotal: {formatPrice(subtotal)}</p>
            <p>IVA (15%): {formatPrice(iva)}</p>
            <p className="text-lg font-bold">Total: {formatPrice(total)}</p>
          </div>
          <Button className="w-full md:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            Generar Factura
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}