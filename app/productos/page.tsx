"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Producto = {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
};

type Categoria = {
  id: number;
  nombre: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [newProduct, setNewProduct] = useState<Producto>({
    id: 0,
    codigo: "",
    nombre: "",
    categoria: "",
    precio: 0,
    stock: 0,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  // Cargar productos y categorías desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Producto[]>("http://localhost:8000/api/productos/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get<Categoria[]>("http://localhost:8000/api/categorias/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(search.toLowerCase()) ||
      product.codigo.includes(search)
  );

  // Crear nuevo producto
  const addProduct = async () => {
    console.log("Nuevo Producto:", newProduct);
  
    // Validación de los campos
    if (!newProduct.codigo || !newProduct.nombre || !newProduct.categoria || newProduct.precio <= 0 || newProduct.stock <= 0) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8000/api/productos/", newProduct);
      setProducts((prev) => [...prev, response.data]);
      setIsAddModalOpen(false);
      setNewProduct({ id: 0, codigo: "", nombre: "", categoria: "", precio: 0, stock: 0 });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        const errorStatus = error.response.status;
        console.error(`Error al agregar el producto: ${errorStatus}`, errorData);
        alert(`Error al agregar el producto: ${errorData?.detail || errorData?.message || 'Error desconocido'}`);
      } else {
        console.error("Error de red:", error);
        alert("Error de red al intentar agregar el producto. Por favor, intenta nuevamente.");
      }
    }
  };
  
  
  

  // Editar producto
  const editProduct = async () => {
    if (!editingProduct) return;
    try {
      const response = await axios.put(
        `http://localhost:8000/api/productos/${editingProduct.id}/`,
        editingProduct
      );
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id ? response.data : product
        )
      );
      setIsEditModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  // Eliminar producto
  const deleteProduct = async () => {
    if (!deleteProductId) return;
    try {
      await axios.delete(`http://localhost:8000/api/productos/${deleteProductId}/`);
      setProducts((prev) => prev.filter((product) => product.id !== deleteProductId));
      setIsDeleteModalOpen(false);
      setDeleteProductId(null);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventario de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código o nombre..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono">{product.codigo}</TableCell>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell>{product.categoria}</TableCell>
                  <TableCell>${product.precio}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingProduct(product);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeleteProductId(product.id);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para Crear Producto */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Producto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Código"
              value={newProduct.codigo}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, codigo: e.target.value }))
              }
            />
            <Input
              placeholder="Nombre"
              value={newProduct.nombre}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, nombre: e.target.value }))
              }
            />
            <select
  value={newProduct.categoria}  // Asegúrate de que esta sea una cadena o un número único
  onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
>
  <option value="">Seleccione una categoría</option>
  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.nombre}
    </option>
  ))}
</select>

            <Input
              placeholder="Precio"
              type="number"
              value={newProduct.precio || ""}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, precio: parseFloat(e.target.value) }))
              }
            />
            <Input
              placeholder="Stock"
              type="number"
              value={newProduct.stock || ""}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, stock: parseInt(e.target.value, 10) }))
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAddModalOpen(false)}>Cancelar</Button>
            <Button onClick={addProduct}>Crear Producto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Editar Producto */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Código"
              value={editingProduct?.codigo || ""}
              onChange={(e) =>
                setEditingProduct((prev) => prev && { ...prev, codigo: e.target.value })
              }
            />
            <Input
              placeholder="Nombre"
              value={editingProduct?.nombre || ""}
              onChange={(e) =>
                setEditingProduct((prev) => prev && { ...prev, nombre: e.target.value })
              }
            />
            <select
              className="w-full border rounded px-3 py-2"
              value={editingProduct?.categoria || ""}
              onChange={(e) =>
                setEditingProduct((prev) => prev && { ...prev, categoria: e.target.value })
              }
            >
              <option value="">Seleccionar Categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.nombre}>
                  {category.nombre}
                </option>
              ))}
            </select>
            <Input
              placeholder="Precio"
              type="number"
              value={editingProduct?.precio || ""}
              onChange={(e) =>
                setEditingProduct((prev) => prev && { ...prev, precio: parseFloat(e.target.value) })
              }
            />
            <Input
              placeholder="Stock"
              type="number"
              value={editingProduct?.stock || ""}
              onChange={(e) =>
                setEditingProduct((prev) => prev && { ...prev, stock: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
            <Button onClick={editProduct}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Eliminar Producto */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás seguro de eliminar este producto?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
            <Button onClick={deleteProduct}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
