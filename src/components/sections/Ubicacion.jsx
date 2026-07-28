import { MapPin } from "lucide-react";
import { Badge } from "../ui/Badge.jsx";
import { Card, CardContent } from "../ui/Card.jsx";

export default function Ubicacion() {
  return (
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
  );
}