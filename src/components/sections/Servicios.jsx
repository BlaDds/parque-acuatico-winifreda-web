import { Tent, Flame, Droplets, ShoppingBag, Bed, Car, LifeBuoy, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/Badge.jsx";
import { Card, CardContent } from "../ui/Card.jsx";

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

export default function Servicios() {
    return (
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
    )
}