import { useState, useEffect } from "react";
import { Badge } from "./components/ui/Badge.jsx";
import { Card, CardContent } from "./components/ui/Card.jsx";
import { Button } from "./components/ui/Button.jsx";

import backImg from "./assets/BACK.webp";
import backInviernoImg from "./assets/BACK_Invierno.webp";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import SocialMedia from "./components/sections/SocialMedia.jsx";
import Atractivos from "./components/sections/Atractivos.jsx";
import Alojamientos from "./components/sections/Alojamientos.jsx";
import Servicios from "./components/sections/Servicios.jsx";
import Horarios from "./components/sections/Horarios.jsx";
import Ubicacion from "./components/sections/Ubicacion.jsx";
import Contacto from "./components/sections/Contacto.jsx";
import ClimaWidget from "./components/weather/ClimaWidget.jsx";
import ActividadesTemporada from "./components/sections/ActividadesTemporada.jsx";

import logoParque from "./assets/LogoParqueAcuaticoWinifreda.png";

export default function Home() {
  // --- EASTER EGG: MODO DESARROLLADOR ---
  useEffect(() => {
    const mostrarCreditos = () => {
      console.log(
        "%cDesarrollador: Bladimir Rosane\n%cGitHub del proyecto: https://github.com/BlaDds/parque-acuatico-winifreda-web",
        "color: #0ea5e9; font-size: 16px; font-weight: semi-bold;", // Estilo para el nombre
        "color: #64748b; font-size: 14px;" // Estilo para el link
      );
      return "¡Hola!"; // Lo que devuelve la variable para que no diga "undefined"
    };

    const palabrasClave = [
      "desarrollador", "software", "dev", 
      "developer", "webdev", "bladimir", "rosane"
    ];

    palabrasClave.forEach(palabra => {
      // Las variaciones cubren las formas más comunes de escribir
      const variaciones = [
        palabra.toLowerCase(), // ej: dev
        palabra.toUpperCase(), // ej: DEV
        palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase() // ej: Dev
      ];

      variaciones.forEach(variacion => {
        // Para no sobreescribir ninguna variable real del navegador
        if (!Object.prototype.hasOwnProperty.call(window, variacion)) {
          Object.defineProperty(window, variacion, {
            get: mostrarCreditos,
            configurable: true // Permite que React limpie esto si es necesario
          });
        }
      });
    });
  }, []);
  // --------------------------------------
  
/* --- LÓGICA DE HORARIOS Y SEMÁFORO --- */
  const [data, setData] = useState(null);
  
  // // Para saber si esta esperando el JSON
  const [cargando, setCargando] = useState(true); 

    useEffect(() => {
    // Número único basado en la fecha y hora actual
    const timestamp = new Date().getTime();
    
    fetch(`/datos_parque.json?v=${timestamp}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error cargando datos:", err);
        setCargando(false);
      });
  }, []);

  // Si todavía está cargando, retorna UNA PANTALLA DE CARGA
  // Esto evita que se renderice el Hero de verano y luego cambie bruscamente

  if (cargando) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-sky-50 transition-opacity duration-500">
        <img 
          src={logoParque} 
          alt="Cargando..." 
          className="w-48 md:w-64 object-contain animate-pulse" 
        />
        <p className="text-sky-800 font-medium mt-4 animate-pulse">
          Cargando temporada...
        </p>
      </div>
    );
  }
  
  // Para la sección "Horarios"
  const horarioSemanaNormalizado = (data?.horario_semana || "").toLowerCase().trim();
  const horarioFindeNormalizado = (data?.horario_finde || "").toLowerCase().trim();
  const cerradoLV = horarioSemanaNormalizado === "cerrado";
  const cerradoSD = horarioFindeNormalizado === "cerrado";

  // Día de la semana en hora Argentina
  const fechaArgActual = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  const diaSemana = fechaArgActual.getDay(); 
  const esFinDeSemana = diaSemana === 0 || diaSemana === 6;

  // Determinar el string de horario que aplica para hoy
  const horarioHoyRaw = esFinDeSemana ? data?.horario_finde : data?.horario_semana;
  const horarioHoy = (horarioHoyRaw || "").toLowerCase().trim();

  // Variables para controlar el estado y el mensaje del semáforo
  let isOpen = false;
  let mensajeFinal = "Cargando...";

  if (!data) {
    mensajeFinal = "Sincronizando...";
  } else if (horarioHoy === "cerrado") {
    // Fallback por si el día específico en el horario está marcado como "cerrado"
    isOpen = false;
    mensajeFinal = "Cerrado hasta nuevo aviso";
  } else {
    // Extrae los 4 números del formato "HH:MM"
    const numeros = horarioHoy.match(/\d+/g); 

    // Validamos que existan al menos 4 números (Hora Apertura, Min Apertura, Hora Cierre, Min Cierre)
    if (numeros && numeros.length >= 4) {
      const apHora = parseInt(numeros[0], 10);
      const apMin = parseInt(numeros[1], 10);
      const ciHora = parseInt(numeros[2], 10);
      const ciMin = parseInt(numeros[3], 10);

      const aperturaEnMinutos = (apHora * 60) + apMin;
      const cierreEnMinutos = (ciHora * 60) + ciMin;

      const actualEnMinutos = (fechaArgActual.getHours() * 60) + fechaArgActual.getMinutes();

      const stringApertura = `${apHora}:${apMin.toString().padStart(2, "0")}`;
      const stringCierre = `${ciHora}:${ciMin.toString().padStart(2, "0")}`;

      // Lógica de comparaciones
      if (actualEnMinutos < aperturaEnMinutos) {
        isOpen = false;
        mensajeFinal = `Abrimos a las ${stringApertura} hs`;
      } else if (actualEnMinutos >= aperturaEnMinutos && actualEnMinutos < cierreEnMinutos) {
        isOpen = true;
        mensajeFinal = `Abierto hasta las ${stringCierre} hs`; 
      } else {
        isOpen = false;
        mensajeFinal = `Cerró a las ${stringCierre} hs`;
      }
    } else {
      isOpen = false;
      mensajeFinal = "Consultar horarios disponibles";
    }
  }
  return (
    <div className="min-h-screen text-winifreda-french font-sans">
      {/* Navigation */}
      <Navbar
      temporada={data?.temporada}
      />

      {/* --- HERO SECTION --- */}
      <Hero
      isOpen={isOpen}
      mensajeFinal={mensajeFinal}
      temporada={data?.temporada}
      />

      {/* RESTO DE CONTENIDO */}
      <div className="relative w-full">
        <div className="fixed inset-0 z-[-1]">
          {data?.temporada?.toLowerCase() === "verano" && (
        <img src={backImg} alt="" className="w-full h-full object-cover" />
        )}
          
          {data?.temporada?.toLowerCase() === "invierno" && (
        <img src={backInviernoImg} alt="" className="w-full h-full object-cover" />
        )}
        </div>

        {/* Social Media Section */}
        <SocialMedia />

        {/* Atractivos Section */}
        <Atractivos />

        {/* Alojamientos Section */}
        <Alojamientos />

        {/* Servicios Section */}
        <Servicios />

        {/* Actividades invierno Section */}
        {data?.temporada?.toLowerCase() === "invierno" && (
        <ActividadesTemporada />
        )}
        {/* Horarios y Tarifas */}
        <Horarios cerradoLV={cerradoLV} cerradoSD={cerradoSD} data={data}/>

        {/* Clima Section */}
        <ClimaWidget />

        {/* Cómo Llegar */}
        <Ubicacion />

        {/* Contacto */}
        <Contacto />

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
}