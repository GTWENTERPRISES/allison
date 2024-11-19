"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    ci: "",
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  // Cargar clientes desde la API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/clientes/");
        setCustomers(response.data);
        setFilteredCustomers(response.data); // Inicialmente todos los clientes
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Manejar búsqueda
  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    setFilteredCustomers(
      customers.filter(
        (customer) =>
          customer.nombre.toLowerCase().includes(text) ||
          customer.ci.includes(text) ||
          customer.email.toLowerCase().includes(text)
      )
    );
  };

  // Crear cliente
  const addCustomer = async () => {
    if (!newCustomer.ci || !newCustomer.nombre || !newCustomer.email) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/clientes/", newCustomer);
      const updatedCustomers = [...customers, response.data];
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers); // Actualizar la lista filtrada
      setNewCustomer({ ci: "", nombre: "", email: "", telefono: "", direccion: "" });
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
    }
  };

  // Actualizar cliente
  const updateCustomer = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/clientes/${currentCustomer.id}/`, currentCustomer);
      const updatedCustomers = customers.map((c) => (c.id === currentCustomer.id ? response.data : c));
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers); // Actualizar la lista filtrada
      setCurrentCustomer(null);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  // Eliminar cliente
  const deleteCustomer = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await axios.delete(`http://localhost:8000/api/clientes/${id}/`);
        const updatedCustomers = customers.filter((customer) => customer.id !== id);
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
      } catch (error) {
        console.error("Error al eliminar el cliente:", error);
      }
    }
  };

  // Manejar cambios en formularios
  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setCurrentCustomer({ ...currentCustomer, [name]: value });
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Button onClick={() => setAddModalOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Barra de búsqueda */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, CI o email..."
              value={searchText}
              onChange={handleSearch}
              className="pl-9"
            />
          </div>

          {/* Tabla de clientes */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>CI</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.nombre}</TableCell>
                  <TableCell>{customer.ci}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.telefono}</TableCell>
                  <TableCell>{customer.direccion}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentCustomer(customer);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCustomer(customer.id)}
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

      {/* Modal para añadir cliente */}
      <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="ci"
              placeholder="CI"
              value={newCustomer.ci}
              onChange={handleInputChange}
            />
            <Input
              name="nombre"
              placeholder="Nombre"
              value={newCustomer.nombre}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={handleInputChange}
            />
            <Input
              name="telefono"
              placeholder="Teléfono"
              value={newCustomer.telefono}
              onChange={handleInputChange}
            />
            <Input
              name="direccion"
              placeholder="Dirección"
              value={newCustomer.direccion}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={addCustomer}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para editar cliente */}
      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          {currentCustomer && (
            <div className="space-y-4">
              <Input
                name="ci"
                placeholder="CI"
                value={currentCustomer.ci}
                onChange={(e) => handleInputChange(e, true)}
              />
              <Input
                name="nombre"
                placeholder="Nombre"
                value={currentCustomer.nombre}
                onChange={(e) => handleInputChange(e, true)}
              />
              <Input
                name="email"
                placeholder="Email"
                value={currentCustomer.email}
                onChange={(e) => handleInputChange(e, true)}
              />
              <Input
                name="telefono"
                placeholder="Teléfono"
                value={currentCustomer.telefono}
                onChange={(e) => handleInputChange(e, true)}
              />
              <Input
                name="direccion"
                placeholder="Dirección"
                value={currentCustomer.direccion}
                onChange={(e) => handleInputChange(e, true)}
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={updateCustomer}>Actualizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
