import { useState, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import logoParque from "../../assets/LogoParqueAcuaticoWinifreda.png";
import bannerImg from "../../assets/Banner.png";

// Esto genera una lista con las rutas de las imágenes de invierno:
// ["/img/invierno/1.webp", "/img/invierno/2.webp", ..., "/img/invierno/4.webp"]
const imagenesInvierno = Array.from({ length: 4 }, (_, i) => `img/invierno/${i + 1}.webp`);

const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-xl border border-winifreda-ocean/20 text-winifreda-french shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

// "temporada" como prop, puede venir en minúsculas o mayúsculas
export default function Hero({ isOpen, mensajeFinal, temporada = "verano" }) {
  const tempNormalizada = temporada.toLowerCase();

// Estado para controlar qué imagen se muestra
  const [indiceActual, setIndiceActual] = useState(0);

  // Efecto para el temporizador (se activa solamente en invierno)
  useEffect(() => {
    if (tempNormalizada !== "invierno") return;

    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % imagenesInvierno.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, [tempNormalizada]);

  const handleScrollToActivities = () => {
    const element = document.getElementById("actividades-temporada");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Video de Fondo */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/35 z-10"></div>
        {tempNormalizada !== "invierno" && (
        <video
          className="w-full h-full object-cover"
          src="/video-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/img/poster.webp"
        />)}

        {/* Carrusel de Fondo (Para invierno) */}
        {tempNormalizada === "invierno" && (
          <>
          {imagenesInvierno.map((img, index) => (
          <img
          key={img}
          src={img}
          alt={`Parque Acuático Winifreda - Temporada de Invierno ${index + 1}`}
          // Las imágenes se apilan y la clase de opacidad hace la transición
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === indiceActual ? "opacity-100" : "opacity-0"
          }`}
          />
            ))}
          </>
        )}
      </div>

      <div className="relative z-20 max-w-5xl mx-auto mt-4 px-4 text-center flex flex-col items-center justify-center h-full">
        
        {/* LOGO */}
        <div className="w-full animate-in fade-in zoom-in duration-1000 flex justify-center">
          <img
            src={logoParque}
            alt="Parque Acuático Winifreda"
            className="w-[240px] lg:w-[280px] object-contain transition-all duration-500"
          />
        </div>

        {/* Banner */}
        <div className="mb-6 w-full max-w-xl">
          <img
            src={bannerImg}
            alt="Donde la familia disfruta todo el año"
            className="w-full h-auto drop-shadow-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-3xl mb-4">
          
          {/* SEMÁFORO: Solo aparece si NO es invierno*/}
          {tempNormalizada !== "invierno" && (
            <Card className="inline-block bg-white/95 backdrop-blur-lg shadow-2xl border-none max-w-sm mx-auto w-full md:w-auto">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isOpen ? "bg-green-100" : "bg-red-100"
                    } shadow-inner`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wide text-slate-500 font-bold">
                    Estado Ahora
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      isOpen ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOpen ? "ABIERTO" : "CERRADO"}
                  </div>
                  <div className="text-xs text-slate-500">{mensajeFinal}</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* RECUADRO INVERNAL: Solo aparece si es invierno (desaparece en verano) */}
          {tempNormalizada === "invierno" && (
            <div className="w-full max-w-sm md:max-w-xs lg:max-w-sm bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 text-white text-left flex flex-col justify-between shadow-xl min-h-[104px]">
              <p className="text-xs md:text-[13px] leading-relaxed">
                <span className="font-bold">Parque acuático cerrado</span> por fuera de temporada,
                pero mirá todas las actividades que podés hacer en la temporada de invierno!
              </p>
              
              <button
                onClick={handleScrollToActivities}
                className="mt-2 inline-flex items-center gap-1 text-orange-300 hover:text-orange-400 text-xs md:text-sm font-bold transition-all group w-max"
              >
                Ver actividades de invierno
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}

        </div>

        {/* Flecha de Scroll */}
        <ChevronDown 
          className="w-10 h-10 text-white mx-auto mt-4 animate-bounce opacity-80 cursor-pointer" 
          onClick={handleScrollToActivities} 
        />
      </div>
    </section>
  );
}