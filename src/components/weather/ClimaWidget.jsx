import { useState, useEffect } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Calendar,
  RefreshCw,
  CloudSun,
} from "lucide-react";

import { Badge } from "../ui/Badge.jsx";
import { Card, CardContent } from "../ui/Card.jsx";

export default function ClimaWidget() {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const convertirFecha7Timer = (fecha) => {
    const texto = fecha.toString();

    return `${texto.slice(0, 4)}-${texto.slice(
      4,
      6
    )}-${texto.slice(6, 8)}`;
  };

  useEffect(() => {
    fetch("/clima.json")

      .then((res) => {
        if (!res.ok) {
          throw new Error("Error consultando 7Timer");
        }

        return res.json();
      })
      .then((data) => {
        if (!data?.dataseries?.length) {
          throw new Error("No se recibieron datos");
        }

        const diario = data.dataseries
          .filter(
            (dia) =>
              dia?.temp2m &&
              typeof dia.temp2m.max !== "undefined" &&
              typeof dia.temp2m.min !== "undefined"
          )
          .map((dia) => ({
            fecha: convertirFecha7Timer(dia.date),
            max: dia.temp2m.max,
            min: dia.temp2m.min,
            weather: dia.weather,
          }));

        if (!diario.length) {
          throw new Error("Pronóstico inválido");
        }

        setClima({
          actual: {
            max: diario[0].max,
            min: diario[0].min,
            weather: diario[0].weather,
          },
          diario,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error clima:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const interpretarClima = (weather) => {
    const mapa = {
      clear: {
        texto: "Soleado",
        icon: <Sun className="w-8 h-8 text-yellow-500" />,
      },

      pcloudy: {
        texto: "Parcialmente nublado",
        icon: <CloudSun className="w-8 h-8 text-orange-400" />,
      },

      mcloudy: {
        texto: "Nublado",
        icon: <Cloud className="w-8 h-8 text-gray-400" />,
      },

      cloudy: {
        texto: "Muy nublado",
        icon: <Cloud className="w-8 h-8 text-gray-500" />,
      },

      humid: {
        texto: "Húmedo",
        icon: <Cloud className="w-8 h-8 text-gray-400" />,
      },

      fog: {
        texto: "Niebla",
        icon: <Cloud className="w-8 h-8 text-gray-500" />,
      },

      lightrain: {
        texto: "Lluvias débiles",
        icon: <CloudRain className="w-8 h-8 text-blue-400" />,
      },

      rain: {
        texto: "Lluvia",
        icon: <CloudRain className="w-8 h-8 text-blue-600" />,
      },

      oshower: {
        texto: "Chaparrones",
        icon: <CloudRain className="w-8 h-8 text-blue-500" />,
      },

      ishower: {
        texto: "Lluvias aisladas",
        icon: <CloudRain className="w-8 h-8 text-blue-500" />,
      },

      ts: {
        texto: "Tormenta",
        icon: <CloudLightning className="w-8 h-8 text-purple-500" />,
      },

      tsrain: {
        texto: "Tormenta con lluvia",
        icon: <CloudLightning className="w-8 h-8 text-purple-700" />,
      },
    };

    return (
      mapa[weather] || {
        texto: "Normal",
        icon: <Sun className="w-8 h-8 text-yellow-500" />,
      }
    );
  };

  const formatearFecha = (fechaString) => {
    const date = new Date(`${fechaString}T00:00:00`);
    const hoy = new Date();

    if (date.toDateString() === hoy.toDateString()) {
      return "Hoy";
    }

    return date.toLocaleDateString("es-AR", {
      weekday: "short",
    });
  };

  const renderWidgetContent = () => {
    if (loading) {
      return (
        <Card className="overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm border-blue-100 min-h-[200px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
            <p>Cargando pronóstico...</p>
          </div>
        </Card>
      );
    }

    if (error || !clima) {
      return (
        <Card className="overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm border-red-100 min-h-[200px] flex items-center justify-center">
          <div className="text-center p-6">
            <Cloud className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-600 font-bold">
              Sin datos del clima
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-blue-600 underline"
            >
              Reintentar
            </button>
          </div>
        </Card>
      );
    }

    const actual = interpretarClima(clima.actual.weather);

    return (
      <Card className="overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm border-blue-100">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center">

            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl w-full justify-center border border-blue-50">
              <div className="scale-150 p-2 drop-shadow-md">
                {actual.icon}
              </div>

              <div className="text-center md:text-left">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                  Hoy en Winifreda
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div>
                    <div className="text-5xl font-black text-winifreda-french tracking-tight">
                      {clima.actual.max}°
                    </div>

                    <div className="text-sm text-slate-500">
                      Mín. {clima.actual.min}°
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="text-lg font-bold text-slate-700">
                      {actual.texto}
                    </span>

                    <span className="text-xs text-slate-400">
                      Pronóstico para hoy
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-left font-bold text-slate-700 mb-4 ml-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                Próximos días
              </h3>

              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-3 min-w-max px-2">
                  {clima.diario.slice(1, 7).map((dia) => {
                    const info = interpretarClima(dia.weather);

                    return (
                      <div
                        key={dia.fecha}
                        className="flex flex-col items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm min-w-[110px]"
                      >
                        <span className="text-slate-600 font-bold capitalize text-sm mb-2">
                          {formatearFecha(dia.fecha)}
                        </span>

                        <div className="mb-2">
                          {info.icon}
                        </div>

                        <div className="text-xs text-slate-500 text-center mb-2">
                          {info.texto}
                        </div>

                        <div className="flex flex-col items-center w-full">
                          <span className="font-bold text-slate-800">
                            ↑ {dia.max}°
                          </span>

                          <span className="text-slate-500 text-xs">
                            ↓ {dia.min}°
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

  return (
    <section id="clima" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 bg-white/60 backdrop-blur-sm p-4 rounded-xl inline-block w-full">
          <Badge className="bg-blue-100 text-blue-700 mb-4 px-4 py-1 text-sm">
            Pronóstico
          </Badge>

          <h2 className="text-4xl font-bold text-winifreda-french mb-4">
            El Tiempo en Winifreda
          </h2>
        </div>

        {renderWidgetContent()}
      </div>
    </section>
  );
}