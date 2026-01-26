import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Wind,
  Calendar,
  ChevronDown,
  Tent,
  Flame,
  Droplets,
  ShoppingBag,
  Bed,
  Car,
  LifeBuoy,
  ShieldCheck,
  RefreshCw,
  CloudSun,
  Video,
  Layers,
} from "lucide-react";

import logoParque from "./assets/LogoParqueAcuaticoWinifreda.png";
import bannerImg from "./assets/Banner.png";
import nombreSolo from "./assets/NombreSolo.png";
import backImg from "./assets/BACK.webp";

/* --- COMPONENTE DE CLIMA (7Timer) --- */
const ClimaWidget = () => {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = import.meta.env.VITE_7TIMER_API;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de 7Timer");
        return res.json();
      })
      .then((data) => {
        const amplitudeTermica = 14;
        const pronosticoLimpio = data.dataseries.map((dia) => {
          let max = dia.temp2m.max;
          let min = dia.temp2m.min;

          if (max < -100 && min < -100) {
            max = 30;
            min = 16;
          } else if (min < -100) {
            min = max - amplitudeTermica;
          } else if (max < -100) {
            max = min + amplitudeTermica;
          }

          return {
            fecha: dia.date,
            max: max,
            min: min,
            weather: dia.weather,
          };
        });

        const resultado = {
          actual: {
            temp: pronosticoLimpio[0].max,
            weather: pronosticoLimpio[0].weather,
          },
          diario: pronosticoLimpio,
        };

        setClima(resultado);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fallo el clima:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Función para interpretar los códigos de 7Timer
  const interpretarClima = (weatherName) => {
    switch (weatherName) {
      case "clear":
        return {
          texto: "Despejado",
          icon: <Sun className="w-8 h-8 text-yellow-500" />,
        };
      case "pcloudy":
      case "mcloudy":
        return {
          texto: "Parcial",
          icon: <CloudSun className="w-8 h-8 text-orange-400" />,
        };
      case "cloudy":
        return {
          texto: "Nublado",
          icon: <Cloud className="w-8 h-8 text-gray-400" />,
        };
      case "lightrain":
      case "oshower":
      case "ishower":
        return {
          texto: "Llovizna",
          icon: <CloudRain className="w-8 h-8 text-blue-400" />,
        };
      case "rain":
        return {
          texto: "Lluvia",
          icon: <CloudRain className="w-8 h-8 text-blue-600" />,
        };
      case "ts":
        return {
          texto: "Tormenta",
          icon: <CloudLightning className="w-8 h-8 text-purple-600" />,
        };
      default:
        return {
          texto: "Normal",
          icon: <Sun className="w-8 h-8 text-yellow-500" />,
        };
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'info', {
        get: function () {
          console.log(
            "%c Build Info %c v1.0.0-2026 ",
            "background: #2563eb; color: #fff; padding: 2px 5px; border-radius: 3px 0 0 3px; font-weight: bold;",
            "background: #f1f5f9; color: #475569; padding: 2px 5px; border-radius: 0 3px 3px 0; border: 1px solid #cbd5e1;"
          );
          console.log(
            "%c Developer %c Bladimir Rosane (BlaDds) ",
            "background: #0f172a; color: #fff; padding: 2px 5px; border-radius: 3px 0 0 3px; font-weight: bold;",
            "background: #fff; color: #0f172a; padding: 2px 5px; border-radius: 0 3px 3px 0; border: 1px solid #0f172a;"
          );
          return "Source code: https://github.com/BlaDds/parque-acuatico-winifreda-web";
        },
        configurable: true
      });
    }
  }, []);

  const formatearFecha = (fechaNum) => {
    const str = fechaNum.toString();
    const year = parseInt(str.substring(0, 4));
    const month = parseInt(str.substring(4, 6)) - 1;
    const day = parseInt(str.substring(6, 8));
    const date = new Date(year, month, day);

    const hoy = new Date();
    if (date.toDateString() === hoy.toDateString()) return "Hoy";

    return date.toLocaleDateString("es-AR", { weekday: "short" });
  };

  if (loading)
    return (
      <Card className="overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm border-blue-100 min-h-[200px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          <p>Cargando pronóstico...</p>
        </div>
      </Card>
    );

  if (error || !clima)
    return (
      <Card className="overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm border-red-100 min-h-[200px] flex items-center justify-center">
        <div className="text-center p-6">
          <Cloud className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-600 font-bold">Sin datos del clima</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-blue-600 underline"
          >
            Reintentar
          </button>
        </div>
      </Card>
    );

  const actual = interpretarClima(clima.actual.weather);

  return (
    <Card className="overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm border-blue-100">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl w-full justify-center border border-blue-50">
            <div className="scale-150 p-2 drop-shadow-md">{actual.icon}</div>

            <div className="text-center md:text-left">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                Hoy en Winifreda
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-5xl font-black text-winifreda-french tracking-tight">
                  {clima.actual.temp}°
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-bold text-slate-700">
                    {actual.texto}
                  </span>
                  <span className="text-xs text-slate-400">
                    Máxima estimada
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-left font-bold text-slate-700 mb-4 ml-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-winifreda-ocean" /> Próximos
              días
            </h3>
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-3 min-w-max px-2">
                {clima.diario.slice(1, 7).map((dia) => {
                  const info = interpretarClima(dia.weather);
                  return (
                    <div
                      key={dia.fecha}
                      className="flex flex-col items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm min-w-[100px]"
                    >
                      <span className="text-slate-600 font-bold capitalize text-sm mb-2">
                        {formatearFecha(dia.fecha)}
                      </span>
                      <div className="mb-2">{info.icon}</div>
                      <div className="flex flex-col items-center w-full">
                        <span className="font-bold text-slate-800">
                          {dia.max}°
                        </span>
                        <span className="text-slate-400 text-xs">
                          {dia.min}°
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


/* --- COMPONENTES */
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Badge = ({ className = "", children, ...props }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${className}`}
    {...props}
  >
    {children}
  </span>
);
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

/* --- HOME --- */
export default function Home() {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* --- LÓGICA INSTAGRAM (BEHOLD y JSON LOCAL) --- */
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    fetch(`/instagram_feed.json?t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se encontró el archivo JSON");
        return res.json();
      })
      .then((data) => {
        setFotos(data);
      })
      .catch((err) => {
        console.error("Aún no hay feed generado o hubo un error:", err);
        setFotos([]);
      });
  }, []);

  const menuItems = [
    { id: "inicio", label: "Inicio" },
    { id: "atractivos", label: "Atractivos" },
    { id: "alojamientos", label: "Alojamientos" },
    { id: "servicios", label: "Servicios" },
    { id: "calendario", label: "Horarios" },
    { id: "clima", label: "Clima" },
    { id: "como-llegar", label: "Ubicación" },
    { id: "contacto", label: "Contacto" },
  ];

  const serviciosIcons = [
    { name: "Camping", icon: Tent },
    { name: "Parrillas", icon: Flame },
    { name: "Duchas", icon: Droplets },
    { name: "Proveeduría", icon: ShoppingBag },
    { name: "Hostal", icon: Bed },
    { name: "Estacionamiento", icon: Car },
    { name: "Guardavidas", icon: LifeBuoy },
    { name: "Seguridad", icon: ShieldCheck },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const [feriadosData, setFeriadosData] = useState([]);
  const [loadingFeriados, setLoadingFeriados] = useState(true);

  useEffect(() => {
    const year = new Date().getFullYear();

    /* --- FERIADOS API --- */

    fetch(`https://api.argentinadatos.com/v1/feriados/${year}`)
      .then((res) => res.json())
      .then((data) => {
        setFeriadosData(data);
        setLoadingFeriados(false);
      })
      .catch((err) => {
        console.error("Error en feriados:", err);
        setLoadingFeriados(false);
      });
  }, []);

  /* --- LÓGICA DEL SEMÁFORO --- */

  const fechaActual = new Date();
  const diaSemana = fechaActual.getDay(); // 0=Dom, 1=Lun... 6=Sab

  const horaActual = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "numeric",
    hour12: false,
  }).format(new Date());

  const offsetArgentina = fechaActual.getTimezoneOffset() * 60000;
  const fechaLocal = new Date(fechaActual.getTime() - offsetArgentina);
  const hoyString = fechaLocal.toISOString().split("T")[0];

  const feriadoEncontrado = feriadosData.find((f) => f.fecha === hoyString);

  const esDiaExtendido =
    diaSemana === 5 ||
    diaSemana === 6 ||
    diaSemana === 0 ||
    !!feriadoEncontrado;

  const horaApertura = esDiaExtendido ? 11 : 13;
  const horaCierre = 20;

  const isOpen = horaActual >= horaApertura && horaActual < horaCierre;
  const todayHours = `${horaApertura}:00 - ${horaCierre}:00`;

  let textoEstado = "";
  if (feriadoEncontrado) {
    textoEstado = `Feriado (${feriadoEncontrado.nombre})`;
  } else if (diaSemana === 0 || diaSemana === 6) {
    textoEstado = "Fin de Semana";
  } else {
    textoEstado = "Día de Semana";
  }

  const mensajeFinal = isOpen ? `Abierto - ${textoEstado}` : `Cerrado!`;

  return (
    <div className="min-h-screen text-winifreda-french font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection("inicio")}
            >
              <img
                src={nombreSolo}
                alt="Winifreda"
                className="h-16 w-auto object-contain"
              />
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-sky-50 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-sky-100 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-sky-50 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        id="inicio"
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/30 z-10"></div>

          <video
            className="w-full h-full object-cover"
            src="/video-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/img/poster.webp"
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto mt-8 px-4 text-center flex flex-col items-center">
          <div className="w-full animate-in fade-in zoom-in duration-1000 flex justify-center">
            <img
              src={logoParque}
              alt="Parque Acuático Winifreda"
              className="w-[240px] lg:w-[280px] object-contain transition-all duration-500"
            />
          </div>

          <div className="mb-10 w-full max-w-xl">
            <img
              src={bannerImg}
              alt="Donde la familia disfruta todo el año"
              className="w-full h-auto drop-shadow-lg"
            />
          </div>

          <div className="flex justify-center w-full">
            <Card className="inline-block bg-white/95 backdrop-blur-lg shadow-2xl border-none max-w-sm mx-auto">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isOpen ? "bg-green-100" : "bg-red-100"
                    } shadow-inner`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                    ></div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wide text-slate-500 font-bold">
                    Estado Ahora
                  </div>
                  <div
                    className={`text-xl font-bold ${isOpen ? "text-green-600" : "text-red-600"}`}
                  >
                    {isOpen ? "ABIERTO" : "CERRADO"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {isOpen ? todayHours : mensajeFinal}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <ChevronDown className="w-10 h-10 text-white mx-auto mt-12 animate-bounce opacity-80" />
        </div>
      </section>

      {/* RESTO DE CONTENIDO */}
      <div className="relative w-full">
        <div className="fixed inset-0 z-[-1]">
          <img src={backImg} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Social Media Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-winifreda-french mb-4">
                  Seguinos en Redes
                </h2>
                <p className="text-slate-600 font-medium">
                  Enterate de todas las novedades y promociones
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Facebook Plugin */}
                <div className="flex flex-col items-center w-full">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 w-full max-w-[500px]">
                    <iframe
                      src={import.meta.env.VITE_FACEBOOK_URL}
                      width="500"
                      height="500"
                      style={{
                        border: "none",
                        overflow: "hidden",
                        width: "100%",
                      }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title="Facebook Feed"
                    ></iframe>
                  </div>
                  <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
                    <Facebook className="w-4 h-4" /> Noticias recientes
                  </p>
                </div>

                {/* Instagram Widget */}
                <div className="flex flex-col items-center w-full">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100 w-full max-w-[500px] flex flex-col relative">
                    {/* Header Instagram */}
                    <div className="w-full bg-slate-50 border-b border-slate-100 py-4 flex justify-center items-center">
                      <a
                        href="https://www.instagram.com/parqueacuaticowinifreda/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-sm ring-4 ring-white hover:scale-105 transition-transform"
                      >
                        <Instagram className="w-7 h-7" />
                      </a>
                    </div>

                    {/* Grilla */}
                    <div className="w-full bg-slate-50 p-3 min-h-[400px]">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {fotos.length > 0
                          ? fotos.slice(0, 6).map((post) => {
                              const imageUrl =
                                post.mediaType === "VIDEO"
                                  ? post.thumbnailUrl
                                  : post.mediaUrl;

                              return (
                                <a
                                  key={post.id}
                                  href={post.permalink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative group block aspect-square overflow-hidden rounded-md bg-gray-200"
                                >
                                  <img
                                    src={imageUrl}
                                    alt="Instagram post"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                  />
                                  <div className="absolute top-1 right-1 text-white drop-shadow-md">
                                    {post.mediaType === "VIDEO" && (
                                      <Video className="w-4 h-4" />
                                    )}
                                    {post.mediaType === "CAROUSEL_ALBUM" && (
                                      <Layers className="w-4 h-4" />
                                    )}
                                  </div>
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                              );
                            })
                          : // Skeleton de carga
                            [...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="aspect-square bg-slate-200 animate-pulse rounded-md"
                              ></div>
                            ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-3 flex items-center gap-1">
                    <Instagram className="w-4 h-4" /> Noticias recientes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atractivos Section */}
        <section id="atractivos" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-sky-50/90 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-xl">
              <div className="text-center mb-12 md:mb-16">
                <Badge className="bg-sky-100 text-sky-700 mb-4 border-sky-200">
                  Atractivos
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-winifreda-french mb-4">
                  Diversión para Toda la Familia
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                  Descubrí todas las opciones que tenemos para que pases un día
                  inolvidable
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Toboganes */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group bg-white">
                  <div className="h-56 flex items-center justify-center relative overflow-hidden bg-indigo-100">
                    <img
                      src="/img/toboganes.webp"
                      alt="Toboganes"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-winifreda-french mb-2">
                      Toboganes Acuáticos
                    </h3>
                    <p className="text-slate-600">
                      Diversión en nuestros diferentes toboganes.
                    </p>
                  </CardContent>
                </Card>

                {/* Juegos Infantiles */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group bg-white">
                  <div className="h-56 flex items-center justify-center relative overflow-hidden bg-sky-100">
                    <img
                      src="/img/juegos-ninos.webp"
                      alt="Juegos para Niños"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-winifreda-french mb-2">
                      Juegos infantiles
                    </h3>
                    <p className="text-slate-600">
                      Juegos acuáticos diseñados especialmente para los más
                      chicos.
                    </p>
                  </CardContent>
                </Card>

                {/* Pileta Infantil */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group bg-white">
                  <div className="h-56 flex items-center justify-center relative overflow-hidden bg-cyan-100">
                    <img
                      src="/img/piletas-para-niños.webp"
                      alt="Pileta Infantil"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-winifreda-french mb-2">
                      Pileta Infantil
                    </h3>
                    <p className="text-slate-600">
                      Espacios seguros y piletas bajas. Diversión asegurada para
                      niños con total tranquilidad para los adultos.
                    </p>
                  </CardContent>
                </Card>

                {/* Jacuzzi */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group bg-white">
                  <div className="h-56 flex items-center justify-center relative overflow-hidden bg-blue-100">
                    <img
                      src="/img/jacuzzi-adultos.webp"
                      alt="Piletas"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-winifreda-french mb-2">
                      Jacuzzi para adultos
                    </h3>
                    <p className="text-slate-600">
                      Jacuzzi exclusivo para relajarse y nadar.
                    </p>
                  </CardContent>
                </Card>

                {/* Parque Aéreo */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group bg-white">
                  <div className="h-56 flex items-center justify-center relative overflow-hidden bg-green-100">
                    <img
                      src="/img/arborismo.webp"
                      alt="Arborismo"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-winifreda-french mb-2">
                      Parque Aéreo
                    </h3>
                    <p className="text-slate-600">
                      Desafiá las alturas en nuestro circuito de arborismo entre
                      los árboles.
                    </p>
                  </CardContent>
                </Card>

                {/* Paintball */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group bg-white border-orange-100">
                  <div className="h-56 flex items-center justify-center relative overflow-hidden bg-orange-100">
                    <img
                      src="/img/paintball.webp"
                      alt="Paintball"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-winifreda-french mb-2">
                      Paintball
                    </h3>
                    <p className="text-slate-600">
                      Viví la adrenalina del combate en equipo en nuestro campo
                      de batalla estratégico.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Alojamientos Section */}
        <section id="alojamientos" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-16">
                <Badge className="bg-orange-100 text-orange-700 mb-4 border-orange-200">
                  Alojamientos
                </Badge>
                <h2 className="text-4xl font-bold text-winifreda-french mb-4">
                  Camping y Hostal
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                  Quedate a disfrutar más tiempo con nosotros
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white border-0 shadow-md h-full flex flex-col">
                  <div className="h-64 bg-green-100 relative">
                    <img
                      src="/img/camping.webp"
                      alt="Camping Parrillas"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="font-bold text-2xl text-white">Camping</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <p className="text-slate-600 mb-6">
                      Espacios naturales para cocinar, acampar y descansar con
                      todas las comodidades que necesitás.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div
                        className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() =>
                          setFullscreenImage("/img/area-descanso-sombra.webp")
                        }
                      >
                        <img
                          src="/img/area-descanso-sombra.webp"
                          alt="Sombra"
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                      <div
                        className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() => setFullscreenImage("/img/agua.webp")}
                      >
                        <img
                          src="/img/agua.webp"
                          alt="Parrillas y Agua"
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                      <div
                        className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() => setFullscreenImage("/img/camping.webp")}
                      >
                        <img
                          src="/img/camping.webp"
                          alt="Camping"
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white border-0 shadow-md h-full flex flex-col">
                  <div className="h-64 bg-orange-100 relative">
                    <img
                      src="/img/hostal-patio.webp"
                      alt="Hostal Patio"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="font-bold text-2xl text-white">Hostal</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <p className="text-slate-600 mb-6">
                      Alojamiento cómodo, seguro y familiar, ubicado a 2km del
                      parque para garantizarte total tranquilidad.
                    </p>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      <div
                        className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() =>
                          setFullscreenImage("/img/hostal-comedor.webp")
                        }
                      >
                        <img
                          src="/img/hostal-comedor.webp"
                          alt="Comedor"
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                      <div
                        className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() =>
                          setFullscreenImage("/img/hostal-dormitorio.webp")
                        }
                      >
                        <img
                          src="/img/hostal-dormitorio.webp"
                          alt="Habitación"
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                      <div
                        className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() =>
                          setFullscreenImage("/img/hostal-reglas.webp")
                        }
                      >
                        <img
                          src="/img/hostal-reglas.webp"
                          alt="Info"
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                      <div
                        className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() =>
                          setFullscreenImage("/img/hostal-patio.webp")
                        }
                      >
                        <img
                          src="/img/hostal-patio.webp"
                          alt="Exterior"
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios Section */}
        <section id="servicios" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-sky-50/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-16">
                <Badge className="bg-sky-100 text-sky-700 mb-4 border-sky-200">
                  Servicios
                </Badge>
                <h2 className="text-4xl font-bold text-winifreda-french mb-4">
                  Nuestros Servicios
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {serviciosIcons.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Card
                      key={item.name}
                      className="text-center hover:shadow-lg transition-shadow bg-white border-0 group"
                    >
                      <CardContent className="p-3 md:p-6 flex flex-col items-center justify-center h-full">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-sky-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-winifreda-ocean" />
                        </div>
                        <h3 className="font-bold text-sm md:text-base text-winifreda-french break-words w-full leading-tight">
                          {item.name}
                        </h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Calendario y Tarifas */}
        <section id="calendario" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-16">
                <Badge className="bg-green-100 text-green-700 mb-4 border-green-200">
                  Planeá tu visita
                </Badge>
                <h2 className="text-4xl font-bold text-winifreda-french mb-4">
                  Horarios y Tarifas
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {/* COLUMNA IZQUIERDA: LUNES A JUEVES */}
                <Card className="overflow-hidden bg-white border-slate-200 shadow-sm flex flex-col">
                  <CardContent className="p-8 flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <Calendar className="w-8 h-8 text-sky-600" />
                      <h3 className="text-xl font-bold text-winifreda-french leading-tight">
                        Horarios y Tarifas <br />
                        <span className="text-sky-600">Lunes a Jueves</span>
                      </h3>
                    </div>

                    {/* Horario */}
                    <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100 mb-6">
                      <p className="font-bold text-sky-700 uppercase mb-1 text-xs tracking-wider">
                        Horario de apertura
                      </p>
                      <p className="text-4xl font-bold text-winifreda-french">
                        13:00 - 20:00
                      </p>
                    </div>

                    {/* Tarifas */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-blue-900">
                          0 a 4 años
                        </span>
                        <span className="font-bold text-lg text-blue-700">
                          GRATIS
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-green-900">
                          5 a 11 años
                        </span>
                        <span className="font-bold text-lg text-green-700">
                          $10.000
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-purple-900">
                          12 años en adelante
                        </span>
                        <span className="font-bold text-lg text-purple-700">
                          $15.000
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* COLUMNA DERECHA: VIERNES A DOMINGO Y FERIADOS */}
                <Card className="overflow-hidden bg-white border-slate-200 shadow-sm flex flex-col">
                  <CardContent className="p-8 flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <Calendar className="w-8 h-8 text-indigo-600" />
                      <h3 className="text-xl font-bold text-winifreda-french leading-tight">
                        Horarios y Tarifas <br />
                        <span className="text-indigo-600">
                          Viernes, Sábados, Domingos y Feriados
                        </span>
                      </h3>
                    </div>

                    {/* Horario */}
                    <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100 mb-6">
                      <p className="font-bold text-indigo-700 uppercase mb-1 text-xs tracking-wider">
                        Horario de apertura
                      </p>
                      <p className="text-4xl font-bold text-winifreda-french">
                        11:00 - 20:00
                      </p>
                    </div>

                    {/* Tarifas */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50/70 rounded-lg">
                        <span className="font-medium text-blue-900">
                          0 a 4 años
                        </span>
                        <span className="font-bold text-lg text-blue-700">
                          GRATIS
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50/70 rounded-lg">
                        <span className="font-medium text-green-900">
                          5 a 11 años
                        </span>
                        <span className="font-bold text-lg text-green-700">
                          $15.000
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50/70 rounded-lg">
                        <span className="font-medium text-purple-900">
                          12 años en adelante
                        </span>
                        <span className="font-bold text-lg text-purple-700">
                          $20.000
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-10 bg-[#E78423]/5 border border-[#E78423]/40 rounded-2xl p-8 text-center shadow-sm">
                <div className="text-xl md:text-3xl font-bold leading-tight text-winifreda-french">
                  Propuesta con precios especiales a{" "}
                  <span className="text-[#E78423]">Delegaciones.</span>
                  <div className="mt-2 md:mt-4">
                    Contactate al{" "}
                    <a
                      href="https://wa.me/5492333414848"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E78423] hover:text-[#d6761b] underline underline-offset-4 transition-all"
                    >
                      2333414848
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clima Section */}
        <section id="clima" className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 bg-white/60 backdrop-blur-sm p-4 rounded-xl inline-block w-full">
              <Badge className="bg-blue-100 text-blue-700 mb-4 px-4 py-1 text-sm">
                Clima ahora
              </Badge>
              <h2 className="text-4xl font-bold text-winifreda-french mb-4">
                El Tiempo en Winifreda
              </h2>
            </div>
            <ClimaWidget />
          </div>
        </section>

        {/* Cómo Llegar */}
        <section id="como-llegar" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-16">
                <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-4 py-1 text-sm">
                  Ubicación
                </Badge>
                <h2 className="text-4xl font-bold text-winifreda-french mb-4">
                  Cómo Llegar
                </h2>
                <p className="text-lg text-slate-600">
                  Fácil acceso sobre la ruta
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <Card className="h-full bg-white border-indigo-50 shadow-sm">
                  <CardContent className="p-8 flex flex-col justify-center h-full">
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-winifreda-french mb-2">
                          Ubicación al parque acuático
                        </h3>
                        <p className="text-lg text-slate-700 font-medium">
                          Ruta 35
                        </p>
                        <p className="text-slate-500">Winifreda, La Pampa</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden shadow-lg border-2 border-slate-200 h-[500px]">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={import.meta.env.VITE_MAPS_API}
                    title="Ubicación Parque Acuático"
                    className="w-full h-full"
                  ></iframe>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="bg-slate-50/90 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-winifreda-french mb-8">
                Contacto
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <Card className="bg-white">
                  <CardContent className="p-4 md:p-6">
                    <Phone className="w-8 h-8 md:w-10 md:h-10 text-sky-600 mx-auto mb-4" />
                    <p className="font-bold mb-1">Información General</p>
                    <p className="text-sm md:text-base">2333 407901</p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-4 md:p-6">
                    <MapPin className="w-8 h-8 md:w-10 md:h-10 text-sky-600 mx-auto mb-4" />
                    <p className="font-bold mb-1">Ubicación</p>
                    <p className="text-sm md:text-base">Winifreda, La Pampa</p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-4 md:p-6">
                    <Mail className="w-8 h-8 md:w-10 md:h-10 text-sky-600 mx-auto mb-4" />
                    <p className="font-bold mb-1">Email</p>
                    <p className="text-xs md:text-sm break-all">
                      info@parqueacuaticowinifreda.com.ar
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 md:mt-12">
                <a
                  href={import.meta.env.VITE_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-winifreda-orange hover:bg-orange-600 text-base md:text-lg px-6 py-3 md:px-8 md:py-4 w-full md:w-auto">
                    Enviar WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-winifreda-egypt/95 text-white py-8 text-center backdrop-blur-md">
          <p>© Parque Acuático Winifreda. Todos los derechos reservados.</p>
        </footer>

        {fullscreenImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={fullscreenImage}
              alt="Vista completa"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
