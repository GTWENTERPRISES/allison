"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuración</h1>

      <Tabs defaultValue="negocio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="negocio">Negocio</TabsTrigger>
          <TabsTrigger value="impuestos">Impuestos</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
        </TabsList>

        <TabsContent value="negocio">
          <Card>
            <CardHeader>
              <CardTitle>Información del Negocio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Nombre del Negocio</Label>
                <Input id="business-name" placeholder="Ingrese el nombre..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ruc">RUC</Label>
                <Input id="ruc" placeholder="Ingrese el RUC..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Ingrese la dirección..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="Ingrese el teléfono..." />
              </div>

              <Button>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impuestos">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Impuestos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="iva-rate">Porcentaje de IVA</Label>
                <Input
                  id="iva-rate"
                  type="number"
                  defaultValue="15"
                  min="0"
                  max="100"
                />
              </div>

              <Button>Actualizar Impuestos</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productos">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Productos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-prefix">Prefijo de Código de Productos</Label>
                <Input
                  id="product-prefix"
                  placeholder="Ej: 786"
                  maxLength={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-tax">Impuesto por Defecto</Label>
                <Input
                  id="default-tax"
                  type="number"
                  defaultValue="15"
                  min="0"
                  max="100"
                />
              </div>

              <Button>Guardar Configuración</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}