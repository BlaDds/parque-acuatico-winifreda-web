import { Calendar } from "lucide-react";
import { Badge } from "../ui/Badge.jsx";
import { Card, CardContent } from "../ui/Card.jsx";

export default function Horarios({ cerradoLV, cerradoSD, data }) {

  const esInvierno = data?.temporada?.toLowerCase() === "invierno";

    return (
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
              {/* COLUMNA IZQUIERDA: LUNES A VIERNES */}
              <Card className="overflow-hidden bg-white border-slate-200 shadow-sm flex flex-col">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-8 h-8 text-indigo-600" />
                    <h3 className="text-xl font-bold text-winifreda-french leading-tight">
                      Atención <br />
                      <span className="text-indigo-600">Lunes a Viernes</span>
                    </h3>
                  </div>

                  {cerradoLV ? (
                    <div className="bg-red-50 p-6 rounded-xl text-center border border-red-100 mb-6 flex-1 flex flex-col justify-center">
                      <p className="text-2xl font-bold text-winifreda-french-600 uppercase">
                        {esInvierno 
                        ? "Cerrado por estar fuera de temporada." 
                        : "Cerrado a la espera de mejor clima."}
                      </p>
                      {!esInvierno && (
                      <p className="text-indigo-800 mt-4 font-medium">
                        Reapertura sujeta a la mejora de los pronósticos meteorológicos.
                      </p>
                    )}
                    </div>
                  ) : (
                    <>
                      <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100 mb-6">
                        <p className="font-bold text-indigo-700 uppercase mb-1 text-xs tracking-wider">
                          Horario de apertura
                        </p>
                        <p className="text-4xl font-bold text-winifreda-french">
                          {data?.horario_semana}
                        </p>
                      </div>
                      <div className="space-y-3 mt-auto">
                        <div className="flex justify-between items-center p-3 bg-blue-50/70 rounded-lg">
                          <span className="font-medium text-blue-900">0 a 4 años</span>
                          <span className="font-bold text-lg text-blue-700">{data?.tarifa_niños_lv}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50/70 rounded-lg">
                          <span className="font-medium text-green-900">5 a 11 años</span>
                          <span className="font-bold text-lg text-green-700">{data?.tarifa_menores_lv}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50/70 rounded-lg">
                          <span className="font-medium text-purple-900">12 años en adelante</span>
                          <span className="font-bold text-lg text-purple-700">{data?.tarifa_adultos_lv}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* COLUMNA DERECHA: FIN DE SEMANA */}
              <Card className="overflow-hidden bg-white border-slate-200 shadow-sm flex flex-col">
                <CardContent className="p-8 flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-8 h-8 text-indigo-600" />
                    <h3 className="text-xl font-bold text-winifreda-french leading-tight">
                      Horarios y Tarifas <br />
                      <span className="text-indigo-600">Sábados y Domingos</span>
                    </h3>
                  </div>

                  {cerradoSD ? (
                    <div className="bg-red-50 p-6 rounded-xl text-center border border-red-100 mb-6 flex-1 flex flex-col justify-center">
                      <p className="text-2xl font-bold text-winifreda-french-600 uppercase">
                        {esInvierno 
                        ? "Cerrado por estar fuera de temporada." 
                        : "Cerrado a la espera de mejor clima."}
                      </p>
                      {!esInvierno && (
                      <p className="text-indigo-800 mt-4 font-medium">
                        Reapertura sujeta a la mejora de los pronósticos meteorológicos.
                      </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100 mb-6">
                        <p className="font-bold text-indigo-700 uppercase mb-1 text-xs tracking-wider">
                          Horario de apertura
                        </p>
                        <p className="text-4xl font-bold text-winifreda-french">
                          {data?.horario_finde}
                        </p>
                      </div>
                      <div className="space-y-3 mt-auto">
                        <div className="flex justify-between items-center p-3 bg-blue-50/70 rounded-lg">
                          <span className="font-medium text-blue-900">0 a 4 años</span>
                          <span className="font-bold text-lg text-blue-700">{data?.tarifa_niños_sd}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50/70 rounded-lg">
                          <span className="font-medium text-green-900">5 a 11 años</span>
                          <span className="font-bold text-lg text-green-700">{data?.tarifa_menores_sd}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50/70 rounded-lg">
                          <span className="font-medium text-purple-900">12 años en adelante</span>
                          <span className="font-bold text-lg text-purple-700">{data?.tarifa_adultos_sd}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Delegaciones */}
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
  );
}