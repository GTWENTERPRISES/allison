"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Barcode } from "lucide-react";
import ProductList from "@/components/product-list";
import QuickProductEntry from "@/components/quick-product-entry";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Punto de Venta</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Venta Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Barcode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Escanear código o ingresar código manualmente..."
                  className="pl-9"
                />
              </div>
              <ProductList />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <QuickProductEntry />
        </div>
      </div>
    </div>
  );
}