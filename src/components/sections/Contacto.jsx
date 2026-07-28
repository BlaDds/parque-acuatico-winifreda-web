import { Badge } from "../ui/Badge.jsx";
import { Card, CardContent } from "../ui/Card.jsx";
import { Button } from "../ui/Button.jsx";
import { Phone, MapPin, Mail, ChevronDown } from "lucide-react";

export default function Contacto() {
    return (
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
    );
};