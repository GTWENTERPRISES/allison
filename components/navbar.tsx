"use client";

import { ShoppingCart, Store, Users, FileText, Settings, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  const pathname = usePathname();
  
  const navigation = [
    { name: "Ventas", href: "/", icon: Store },
    { name: "Productos", href: "/productos", icon: Package },
    { name: "Clientes", href: "/clientes", icon: Users },
    { name: "Facturas", href: "/facturas", icon: FileText },
    { name: "Carrito", href: "/carrito", icon: ShoppingCart },
    { name: "Configuración", href: "/configuracion", icon: Settings },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Store className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">VentasEC</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? "default" : "ghost"}
                  asChild
                >
                  <Link href={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              );
            })}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}