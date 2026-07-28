import { CheckCircle2, Clock, Info, Phone } from "lucide-react";
import { Badge } from "../ui/Badge.jsx";

export default function ActividadesTemporada() {
  return (
    <section id="actividades-temporada" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/90 border border-[#E78423]/20 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-xl">
          
          <div className="text-center mb-12">
            <Badge className="bg-orange-100 text-orange-700 mb-4 border-orange-200">
              Temporada invernal
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-winifreda-french mb-4">
              Actividades de Temporada
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Disfrutá del parque con propuestas únicas diseñadas para los meses fríos.
            </p>
          </div>

          {/* Grilla de Actividades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-700">Paintball</span>
            </div>
            <div className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-700">Paseo en altura y tirolesas</span>
            </div>
            <div className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-700">Mountain biking</span>
            </div>
            <div className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-700">Treking</span>
            </div>
            <div className="flex flex-col bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-700">Paseo del Luan</span>
              </div>
              <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-md mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Sábados y domingos de 9 a 17:30 hs
              </span>
            </div>
            <div className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-700">Avistajes de aves</span>
            </div>
            <div className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-700">Alquiler de parrillas y fogones</span>
            </div>
            <div className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-700">Arquerismo</span>
            </div>
            <div className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-700">Acampe 24hs.</span>
            </div>
            <div className="flex flex-col bg-white p-4 rounded-xl border border-slate-100 shadow-sm md:col-span-2 lg:col-span-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#E78423] shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-700">Ingreso al predio (sin reserva previa)</span>
              </div>
              <span className="text-sm text-slate-500 mt-1 pl-7">
                Habilitado para uso de parrillas, fogones, baños con ducha, agua fría y caliente.
              </span>
            </div>
          </div>

          {/* Notas de Reserva */}
          <div className="mt-6 bg-white/80 rounded-xl p-4 space-y-2 text-sm text-slate-700 border border-slate-100">
            <p className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <span><strong>Con Reserva Previa:</strong> Paintball, paseo en altura, tirolesas y arquerismo se deben reservar obligatoriamente de lunes a viernes de 9 a 20hs.</span>
            </p>
            <p className="flex items-start gap-2">
              <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <span>El funcionamiento de las actividades propuestas está sujeto a factores climáticos adversos y cupos mínimos.</span>
            </p>
          </div>

          {/* Banner de Contacto */}
          <div className="mt-6 bg-[#E78423] text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2 bg-white/20 rounded-lg">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-md text-orange-100 font-medium">¿Querés reservar o consultar por las actividades?</p>
                <p className="font-bold text-lg leading-tight">Contacto y Contrataciones de Temporada</p>
              </div>
            </div>
            <a
              href="https://wa.me/5492333407901"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-orange-700 font-bold px-5 py-2.5 rounded-lg hover:bg-orange-50 transition-all text-center w-full sm:w-auto shadow-sm"
            >
              2333 407901
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}