import { useState, useEffect } from 'react';
import { Facebook, Instagram, Video, Layers } from "lucide-react";


export default function SocialMedia() {
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
    return (
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
    )
}