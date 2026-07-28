import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "../ui/Badge.jsx";
import { Card, CardContent } from "../ui/Card.jsx";

export default function Alojamientos() {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  return (
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
            {/* CAMPING */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white border-0 shadow-md h-full flex flex-col">
              <div className="h-64 bg-green-100 relative">
                <img
                  src="img/camping.webp"
                  alt="Camping Parrillas"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="font-bold text-2xl text-white">Camping</h3>
                </div>
              </div>
              <CardContent className="p-6 flex-grow">
                <p className="text-slate-600 mb-6">
                  Espacios naturales para cocinar, acampar y descansar con todas las comodidades que necesitás.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div
                    className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setFullscreenImage("img/area-descanso-sombra.webp")}
                  >
                    <img
                      src="img/area-descanso-sombra.webp"
                      alt="Sombra"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div
                    className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setFullscreenImage("img/agua.webp")}
                  >
                    <img
                      src="img/agua.webp"
                      alt="Parrillas y Agua"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div
                    className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setFullscreenImage("img/camping.webp")}
                  >
                    <img
                      src="img/camping.webp"
                      alt="Camping"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HOSTAL */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white border-0 shadow-md h-full flex flex-col">
              <div className="h-64 bg-orange-100 relative">
                <img
                  src="img/hostal-patio.webp"
                  alt="Hostal Patio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="font-bold text-2xl text-white">Hostal</h3>
                </div>
              </div>
              <CardContent className="p-6 flex-grow">
                <p className="text-slate-600 mb-6">
                  Alojamiento cómodo, seguro y familiar, ubicado a 2km del parque para garantizarte total tranquilidad.
                </p>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  <div
                    className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setFullscreenImage("img/hostal-comedor.webp")}
                  >
                    <img
                      src="img/hostal-comedor.webp"
                      alt="Comedor"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div
                    className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setFullscreenImage("/img/hostal-dormitorio.webp")}
                  >
                    <img
                      src="img/hostal-dormitorio.webp"
                      alt="Habitación"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div
                    className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setFullscreenImage("img/hostal-reglas.webp")}
                  >
                    <img
                      src="img/hostal-reglas.webp"
                      alt="Info"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div
                    className="aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setFullscreenImage("img/hostal-patio.webp")}
                  >
                    <img
                      src="img/hostal-patio.webp"
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
    </section>
  );
}