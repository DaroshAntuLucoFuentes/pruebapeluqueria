'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <>

      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-[0px_20px_40px_rgba(26,28,28,0.04)]">
        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="text-2xl font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">The Editorial Atelier</div>
          <div className="hidden md:flex items-center space-x-12">
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-manrope text-sm tracking-widest uppercase" href="#services">Servicios</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-manrope text-sm tracking-widest uppercase" href="#portfolio">Portafolio</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-manrope text-sm tracking-widest uppercase" href="#atelier">Atelier</a>
            <a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-manrope text-sm tracking-widest uppercase" href="#contact">Contacto</a>
          </div>
          <Link href="/reservar">
            <button className="bg-secondary text-on-secondary px-6 py-3 text-sm font-label tracking-widest uppercase rounded-lg hover:opacity-80 transition-opacity duration-600 scale-98">
              Reservar
            </button>
          </Link>
        </nav>
      </header>

      <main className="pt-24">
        <section className="relative min-h-[921px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Cinematic wide shot of a luxury minimalist hair salon interior with high ceilings, warm golden lighting, and architectural grey stone walls" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGtDZvyUrNMmLRbuj3Mv0OaO_LHhvA5SHqScnFjEkOvR7GXbx_22TV2CJ6Q7gmEJAIBb9-NtiaMt5hLtyh6zUQ9jBJGKXu4TZHzl0DMpEuJHyeO7ANfHjv2Euiq94VAuiHB57nleSeWuKg2TGYRcLXStwzRCsosELsSBXGiXxmffR7xg7UY55JaatInVfXujcnOLhxnLc1QcCFyncxQ_DjTVePNEDQC1pU18tiAsyTWrtuFxMjpDtC6iZVWzM46ryJ7S9jg00eyL3p"/>
            <div className="absolute inset-0 bg-primary/40 backdrop-grayscale-[0.2]"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="text-secondary-fixed font-label tracking-[0.3em] uppercase mb-6 block">Establecido en 2024</span>
              <h1 className="text-6xl md:text-8xl font-headline text-white leading-[1.1] mb-8 tracking-tighter">
                Esculpiendo <span className="italic font-normal">la</span> Identidad del Cabello Moderno.
              </h1>
              <p className="text-white/80 font-body text-xl md:text-2xl mb-12 leading-relaxed max-w-xl">
                Una experiencia curada donde la precisión arquitectónica se encuentra con el arte fluido del estilo editorial.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/reservar">
                  <button className="bg-secondary text-on-secondary px-10 py-5 text-sm font-label tracking-widest uppercase rounded-md hover:bg-secondary/90 transition-all duration-600">
                    Reservar
                  </button>
                </Link>
                <button className="group flex items-center gap-4 text-white font-label tracking-widest uppercase py-5 px-6">
                  Ver Lookbook
                  <span className="h-[1px] w-12 bg-secondary group-hover:w-16 transition-all duration-600"></span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface" id="services">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-24">
              <h2 className="text-4xl md:text-6xl font-headline text-primary mb-6">Menú de Servicios</h2>
              <div className="h-1 w-24 bg-secondary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 bg-surface-container-lowest p-12 flex flex-col justify-between group cursor-pointer border-none shadow-[0px_20px_40px_rgba(26,28,28,0.02)] transition-all duration-600 hover:bg-secondary-container/10">
                <div>
                  <span className="text-secondary font-label tracking-widest uppercase block mb-4">Precisión</span>
                  <h3 className="text-4xl font-headline mb-8">Corte Editorial &amp; Acabado</h3>
                  <p className="text-on-surface-variant font-body leading-relaxed mb-12 max-w-md">
                    Un corte arquitectónico a medida diseñado para realzar sus facciones únicas, seguido de un acabado editorial profesional.
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-headline italic">desde $145</span>
                  <span className="material-symbols-outlined text-4xl text-secondary">arrow_outward</span>
                </div>
              </div>

              <div className="md:col-span-5 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden group">
                <div className="relative z-10">
                  <span className="text-secondary-fixed font-label tracking-widest uppercase block mb-4">Luminosidad</span>
                  <h3 className="text-3xl font-headline mb-4">Balayage de Firma</h3>
                  <p className="text-white/60 font-body leading-relaxed mb-8">
                    Dimensiones pintadas a mano que imitan el cabello natural aclarado por el sol.
                  </p>
                  <span className="text-xl font-headline italic">desde $280</span>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-[15rem]">palette</span>
                </div>
              </div>

              <div className="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors duration-500">
                <h3 className="text-2xl font-headline mb-4">Peinado</h3>
                <p className="text-sm font-body text-on-surface-variant mb-6">Eventos formales, sesiones de fotos o estilo chic casual.</p>
                <span className="text-lg font-headline italic text-secondary">$95+</span>
              </div>
              <div className="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors duration-500">
                <h3 className="text-2xl font-headline mb-4">Brillo Tonal</h3>
                <p className="text-sm font-body text-on-surface-variant mb-6">Restaurando la vitalidad y profundidad con pigmentos de alto brillo.</p>
                <span className="text-lg font-headline italic text-secondary">$110+</span>
              </div>
              <div className="md:col-span-4 bg-surface-container-low p-10 hover:bg-surface-container-high transition-colors duration-500">
                <h3 className="text-2xl font-headline mb-4">Cuidado Molecular</h3>
                <p className="text-sm font-body text-on-surface-variant mb-6">Tratamientos de lujo para fortalecer los puentes internos del cabello.</p>
                <span className="text-lg font-headline italic text-secondary">$65+</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative bg-primary overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[100px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/3">
                <h2 className="text-4xl md:text-5xl font-headline text-white mb-8">Voces del <span className="italic">Atelier</span></h2>
                <p className="text-white/60 font-body leading-relaxed">
                  Nuestros clientes son nuestros mejores colaboradores. Descubra las experiencias que definen nuestra búsqueda de la excelencia.
                </p>
              </div>
              <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-xl border border-white/5">
                  <span className="material-symbols-outlined text-secondary text-4xl mb-6">format_quote</span>
                  <p className="text-xl font-headline text-white/90 italic mb-8 leading-relaxed">
                    &quot;La precisión en la técnica de corte aquí no se parece a nada que haya experimentado. No es solo un corte, es arquitectura para el rostro.&quot;
                  </p>
                  <div>
                    <h4 className="text-white font-label tracking-widest uppercase text-sm">Elena Vance</h4>
                    <span className="text-secondary-fixed text-xs font-body uppercase tracking-widest">Creativa de Moda</span>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-xl border border-white/5 mt-0 md:mt-12">
                  <span className="material-symbols-outlined text-secondary text-4xl mb-6">format_quote</span>
                  <p className="text-xl font-headline text-white/90 italic mb-8 leading-relaxed">
                    &quot;Entendieron mi visión perfectamente. La transición de los tonos carbón al oro suave se ejecutó con una delicadeza artística increíble.&quot;
                  </p>
                  <div>
                    <h4 className="text-white font-label tracking-widest uppercase text-sm">Julian Rossi</h4>
                    <span className="text-secondary-fixed text-xs font-body uppercase tracking-widest">Director</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface">
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-headline mb-4">Preguntas Frecuentes</h2>
              <p className="text-on-surface-variant font-label tracking-widest uppercase text-sm">Protocolos del Atelier</p>
            </div>
            <div className="space-y-4">
              <details className="group bg-surface-container-lowest overflow-hidden transition-all duration-500">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-lg font-headline">¿Cuál es su política de cancelación?</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant font-body leading-relaxed">
                  Solicitamos un aviso de 48 horas para cualquier cancelación. Las cancelaciones dentro de las 24 horas incurrirán en un cargo del 50% del servicio para respetar el tiempo dedicado de nuestros estilistas.
                </div>
              </details>
              <details className="group bg-surface-container-lowest overflow-hidden transition-all duration-500">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-lg font-headline">¿Ofrecen consultas de cortesía?</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant font-body leading-relaxed">
                  Absolutamente. Creemos que cada transformación comienza con un diálogo. Hay consultas de cortesía de 15 minutos disponibles para todos los nuevos clientes.
                </div>
              </details>
              <details className="group bg-surface-container-lowest overflow-hidden transition-all duration-500">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-lg font-headline">¿Cómo debo prepararme para mi cita de color?</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant font-body leading-relaxed">
                  Recomendamos llegar con el cabello limpio y seco. Evite el uso de sprays o ceras para retoque de raíces 24 horas antes de su visita.
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white" id="contact">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl font-headline mb-12">Encuentre <span className="italic text-secondary">el</span> Atelier</h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <span className="material-symbols-outlined text-secondary">location_on</span>
                    <div>
                      <h4 className="font-label tracking-widest uppercase text-xs mb-2">Dirección</h4>
                      <p className="text-xl font-headline">42 Vellum Avenue, Design District<br/>Nueva York, NY 10012</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <span className="material-symbols-outlined text-secondary">schedule</span>
                    <div>
                      <h4 className="font-label tracking-widest uppercase text-xs mb-2">Horarios</h4>
                      <p className="text-lg font-body">Mar — Vie: 10:00 — 20:00</p>
                      <p className="text-lg font-body">Sáb: 09:00 — 18:00</p>
                      <p className="text-on-surface-variant text-sm mt-1 italic">Dom — Lun: Días de descanso</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-96 shadow-inner grayscale hover:grayscale-0 transition-all duration-700">
                <img className="w-full h-full object-cover" alt="Minimalist abstract map of a city center with thin lines and soft neutral tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-E7djuOXW461nSyUHmcJu1TpsPmNlw17vq0YzOpKhvhipNyzt68cN0SQIR4OGtA68smql5pc35eVpxqguGkz55eSnTEU3gWQCMdYS0VZuzlQL7rvlRnc5LMjbVhJLL28-V1sGDvDdGoTHof0y9xeIFlzdJ3L93PrMI5Hj7fxbwDB6_0dtsTgO2fJM4a6dHDeiODs6Ay5-zdMMUlikY9nsR7a7I8ByymOfUa0SI47PRrhv9k71xYBlfgNcJU1qMS77Grp1gU5HmYRL"/>
              </div>
            </div>
          </div>
        </section>

        <section className="py-40 bg-secondary-container/20 text-center">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-5xl md:text-7xl font-headline text-primary mb-12">¿Listo para refinar su estética?</h2>
            <Link href="/reservar">
              <button className="bg-secondary text-on-secondary px-12 py-6 text-sm font-label tracking-widest uppercase rounded-lg shadow-xl hover:opacity-90 transition-all scale-98">
                Reservar
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 dark:bg-black text-zinc-50 dark:text-zinc-300 w-full py-20 px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-7xl mx-auto">
          <div className="max-w-xs">
            <div className="font-noto-serif text-xl text-zinc-50 uppercase mb-6">The Editorial Atelier</div>
            <p className="font-manrope text-sm text-zinc-400 leading-relaxed mb-8">
              Elevando el cabello a una forma de arte. Únase a nuestra comunidad para obtener información exclusiva sobre estilo y novedades del atelier.
            </p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined cursor-pointer hover:text-secondary-fixed transition-colors">public</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-secondary-fixed transition-colors">movie_filter</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-secondary-fixed transition-colors">photo_camera</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-4">
              <h4 className="font-manrope text-sm tracking-widest uppercase text-white mb-6">Navegación</h4>
              <a className="block text-zinc-400 hover:text-zinc-50 transition-colors font-manrope text-sm uppercase tracking-widest" href="#">Acerca de</a>
              <a className="block text-zinc-400 hover:text-zinc-50 transition-colors font-manrope text-sm uppercase tracking-widest" href="#">Diario</a>
              <a className="block text-zinc-400 hover:text-zinc-50 transition-colors font-manrope text-sm uppercase tracking-widest" href="#">Sostenibilidad</a>
              <a className="block text-zinc-400 hover:text-zinc-50 transition-colors font-manrope text-sm uppercase tracking-widest" href="#">Contacto</a>
            </div>
            <div className="space-y-4">
              <h4 className="font-manrope text-sm tracking-widest uppercase text-white mb-6">Legal</h4>
              <a className="block text-zinc-400 hover:text-zinc-50 transition-colors font-manrope text-sm uppercase tracking-widest" href="#">Política de Privacidad</a>
              <a className="block text-zinc-400 hover:text-zinc-50 transition-colors font-manrope text-sm uppercase tracking-widest" href="#">Términos de Servicio</a>
              <a className="block text-zinc-400 hover:text-zinc-50 transition-colors font-manrope text-sm uppercase tracking-widest" href="#">Carreras</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-manrope text-[10px] tracking-[0.2em] uppercase text-zinc-500">© 2024 The Editorial Atelier. Todos los derechos reservados.</span>
          <span className="font-manrope text-[10px] tracking-[0.2em] uppercase text-zinc-500">Arte en cada hebra</span>
        </div>
      </footer>
    </>
  )
}
