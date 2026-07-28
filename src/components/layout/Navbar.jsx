import { useState } from "react";
import { Menu, X } from "lucide-react";
import nombreSolo from "../../assets/NombreSolo.png";

export default function Navbar({ temporada = "verano" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tempNormalizada = temporada.toLowerCase();

  // flag "special" para que resalte entre los items del menu
  const menuItems = [
    { id: "inicio", label: "Inicio" },
    { id: "atractivos", label: "Atractivos" },
    { id: "alojamientos", label: "Alojamientos" },
    { id: "servicios", label: "Servicios" },
    ...(tempNormalizada === "invierno" 
      ? [{ id: "actividades-temporada", label: "¡Actividades de invierno!", special: true }] 
      : []
    ),
    { id: "calendario", label: "Horarios" },
    { id: "clima", label: "Clima" },
    { id: "como-llegar", label: "Ubicación" },
    { id: "contacto", label: "Contacto" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("inicio")}>
            <img src={nombreSolo} alt="Winifreda" className="h-16 w-auto object-contain" />
          </div>

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={
                  item.special
                    ? "px-3 py-2 text-sm font-bold text-[#E78423] bg-orange-50 hover:bg-orange-100 rounded-lg transition-all shadow-sm border border-orange-200/50"
                    : "px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-sky-50 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-sky-100 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={
                  item.special
                    ? "block w-full text-left px-4 py-3 text-sm font-bold text-[#E78423] bg-orange-50 rounded-lg"
                    : "block w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-sky-50 rounded-lg"
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}