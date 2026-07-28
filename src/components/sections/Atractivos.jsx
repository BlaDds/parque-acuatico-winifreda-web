import { Badge } from "../ui/Badge.jsx";
import { Card, CardContent } from "../ui/Card.jsx";
export default function Atractivos() {
    return (
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
                  Descubrí todas las opciones que tenemos para que pases un día inolvidable
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Toboganes */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group bg-white">
                  <div className="h-56 flex items-center justify-center relative overflow-hidden bg-indigo-100">
                    <img
                      src="img/toboganes.webp"
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
                      src="img/juegos-ninos.webp"
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
                      src="img/piletas-para-niños.webp"
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
                      src="img/jacuzzi-adultos.webp"
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
                      src="img/arborismo.webp"
                      alt="Arborismo"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl text-winifreda-french mb-2">
                      Parque Aéreo
                    </h3>
                    <p className="text-slate-600">
                      Desafiá las alturas en nuestro circuito de arborismo entre los árboles.
                    </p>
                  </CardContent>
                </Card>

                {/* Paintball */}
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group bg-white border-orange-100">
                  <div className="h-56 flex items-center justify-center relative overflow-hidden bg-orange-100">
                    <img
                      src="img/paintball.webp"
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
    )
}