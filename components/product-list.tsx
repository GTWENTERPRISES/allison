"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const currentSale = [
  {
    id: "001",
    code: "7861234567890",
    name: "Cartel de cartulina",
    price: 0.75,
    quantity: 2,
  },
  {
    id: "002",
    code: "7869876543210",
    name: "Paquete de hojas de papel bond",
    price: 2.15,
    quantity: 1,
  }
];

export default function ProductList() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD"
    }).format(price);
  };

  const subtotal = currentSale.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const iva = subtotal * 0.15;
  const total = subtotal + iva;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSale.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-mono">{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{formatPrice(item.price)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{formatPrice(item.price * item.quantity)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (15%):</span>
              <span>{formatPrice(iva)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Procesar Venta</Button>
        </CardFooter>
      </Card>
    </div>
  );
}