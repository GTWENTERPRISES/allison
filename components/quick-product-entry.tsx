"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const commonProducts = [
  { code: "7861234567890", name: "Pan Supan", price: 2.15 },
  { code: "7869876543210", name: "Leche Vita 1L", price: 1.25 },
  { code: "7867654321098", name: "Huevos x12", price: 3.50 },
  { code: "7861112223334", name: "Azúcar 1Kg", price: 1.80 },
];

export default function QuickProductEntry() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrada Rápida</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="manual-code">Código de Producto</Label>
          <Input id="manual-code" placeholder="Ingrese código..." />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="manual-quantity">Cantidad</Label>
          <Input id="manual-quantity" type="number" min="1" defaultValue="1" />
        </div>

        <Button className="w-full">Agregar Producto</Button>

        <div className="pt-4">
          <h3 className="font-semibold mb-3">Productos Frecuentes</h3>
          <div className="grid grid-cols-2 gap-2">
            {commonProducts.map((product) => (
              <Button
                key={product.code}
                variant="outline"
                className="h-auto py-2 px-3 flex flex-col items-start text-left"
              >
                <span className="text-sm font-normal">{product.name}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {product.code}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}