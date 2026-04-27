'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>

      <header className="bg-black/90 backdrop-blur-md fixed top-0 w-full z-50 shadow-[0px_4px_20px_rgba(212,175,55,0.1)] border-b border-secondary/20">
        <nav className="flex justify-between items-center px-8 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="PeluRock Nata Leal" width={60} height={60} className="object-contain" />
            <span className="text-xl font-bold tracking-tight text-secondary uppercase hidden sm:block">PeluRock</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-zinc-300 hover:text-secondary transition-colors font-bold text-sm tracking-wide uppercase" href="#servicios">Servicios</a>
            <a className="text-zinc-300 hover:text-secondary transition-colors font-bold text-sm tracking-wide uppercase" href="#trabajo">Nuestro Trabajo</a>
            <a className="text-zinc-300 hover:text-secondary transition-colors font-bold text-sm tracking-wide uppercase" href="#pago">Pago</a>
            <a className="text-zinc-300 hover:text-secondary transition-colors font-bold text-sm tracking-wide uppercase" href="#cursos">Cursos</a>
            <a className="text-zinc-300 hover:text-secondary transition-colors font-bold text-sm tracking-wide uppercase" href="#contacto">Contacto</a>
          </div>
          <Link href="/reservar">
            <button className="bg-secondary text-on-secondary px-6 py-3 text-sm font-label tracking-widest uppercase rounded-lg hover:opacity-80 transition-opacity duration-600 scale-98">
              Reservar
            </button>
          </Link>
        </nav>
      </header>

      <main className="pt-20">
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-secondary/30 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-tertiary/20 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-secondary font-bold tracking-[0.3em] uppercase mb-6 block text-sm">Portal San Pedro, San Pedro de La Paz</span>
                <h1 className="text-6xl md:text-8xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                  PeluRock <span className="text-secondary">Nata Leal</span>
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-secondary mb-6 tracking-wide">
                  Peluquería y Spa Canino con actitud rockera
                </p>
                <p className="text-white/80 font-body text-xl md:text-2xl mb-8 leading-relaxed max-w-2xl">
                  De <span className="text-secondary font-bold">Peludogs Móvil</span> nos transformamos en <span className="text-secondary font-bold">PeluRock</span>: misma dedicación, ahora en un espacio fijo para atender mejor a tu peludito.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/reservar">
                    <button className="bg-secondary text-black px-10 py-5 text-sm font-bold tracking-widest uppercase rounded-md hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/20">
                      Reservar
                    </button>
                  </Link>
                  <a href="https://wa.me/56935884173" target="_blank" rel="noopener noreferrer">
                    <button className="group flex items-center gap-4 text-white font-bold tracking-widest uppercase py-5 px-8 border-2 border-secondary hover:bg-secondary/10 transition-all duration-300 rounded-md">
                      WhatsApp
                    </button>
                  </a>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-secondary/30 rounded-full blur-[80px]"></div>
                  <Image 
                    src="/images/logo.png" 
                    alt="PeluRock Nata Leal Logo" 
                    width={500} 
                    height={500} 
                    className="relative z-10 drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#servicios" className="text-secondary text-4xl">↓</a>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-black to-zinc-900" id="servicios">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 text-center">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase mb-4 block text-sm">Nuestros Servicios</span>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Menú Rock</h2>
              <div className="h-1 w-32 bg-secondary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl hover:border-secondary transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-secondary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-secondary">Rock Soft</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Baño, secado y corte funcional de fácil mantención. Corte parejo con numeración corta hasta 9mm. Ideal para mantener a tu peludito limpio y ordenado.
                </p>
              </div>

              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl hover:border-secondary transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-secondary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-secondary">Rock Cut</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Corte de raza o fantasía + baño completo. Corte sofisticado para un look con estilo y personalidad.
                </p>
              </div>

              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl hover:border-secondary transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-secondary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-secondary">Rock Bath</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Baño, secado y perfume. Limpieza completa para dejar a tu peludo fresco y brillante.
                </p>
              </div>

              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl hover:border-secondary transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-secondary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-secondary">Rock Fresh</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Baño, secado, retoques de corte y detalles. Perfecto para la mantención mensual.
                </p>
              </div>

              <div className="bg-gradient-to-br from-secondary/20 to-tertiary/20 border-2 border-secondary p-8 rounded-xl hover:border-tertiary transition-all duration-300 group cursor-pointer shadow-lg shadow-secondary/30">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-secondary">Rock Turbo</h3>
                </div>
                <p className="text-white leading-relaxed mb-6 font-semibold">
                  Experiencia premium: baño, corte, mascarillas, masajes y más. Para un pelaje sano, brillante y full actitud.
                </p>
              </div>

              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl hover:border-secondary transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-secondary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-secondary">Rock Smile</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Baño, secado y corte + cepillado dental + detalle especial + regalito sorpresa. Para un aliento fresco y una sonrisa rockera.
                </p>
              </div>

              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl hover:border-secondary transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-secondary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-secondary">Rock Zen</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Corte + baño relajante + masajes + aromaterapia + flores de Bach. Un momento de calma y bienestar para tu peludo.
                </p>
              </div>

            </div>

            <div className="mt-16 bg-gradient-to-r from-zinc-900 to-black border-2 border-secondary/40 p-10 rounded-xl">
              <h3 className="text-3xl font-bold text-secondary mb-6 text-center">Servicios Adicionales</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="text-white/90 font-semibold">Cortes de raza o fantasía</div>
                <div className="text-white/90 font-semibold">Deslanados</div>
                <div className="text-white/90 font-semibold">Stripping</div>
                <div className="text-white/90 font-semibold">Recuperación de manto</div>
                <div className="text-white/90 font-semibold">Baños medicados</div>
                <div className="text-white/90 font-semibold">Mantención</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-black" id="trabajo">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 text-center">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase mb-4 block text-sm">Resultados Reales</span>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Nuestro Trabajo</h2>
              <div className="h-1 w-32 bg-secondary mx-auto mb-6"></div>
              <p className="text-white/70 text-xl max-w-2xl mx-auto">
                Cada peludito es único y merece un cuidado especial. Mira algunos de nuestros trabajos recientes.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/dog-1.png" 
                  alt="Trabajo PeluRock" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/dog-2.png" 
                  alt="Trabajo PeluRock" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/dog-3.png" 
                  alt="Trabajo PeluRock" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/dog-4.png" 
                  alt="Trabajo PeluRock" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/dog-5.png" 
                  alt="Trabajo PeluRock" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/dog-6.png" 
                  alt="Trabajo PeluRock" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/dog-7.png" 
                  alt="Trabajo PeluRock" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/dog-8.png" 
                  alt="Trabajo PeluRock" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="mt-16 text-center">
              <a href="https://instagram.com/pelurocknataleal" target="_blank" rel="noopener noreferrer">
                <button className="bg-zinc-900 border-2 border-secondary text-secondary px-10 py-5 text-sm font-bold tracking-widest uppercase rounded-md hover:bg-secondary/10 transition-all duration-300">
                  Ver más en Instagram
                </button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-zinc-900 to-black" id="transformacion">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-secondary font-bold tracking-[0.3em] uppercase mb-4 block text-sm">Nuestra Historia</span>
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                  De Peludogs Móvil a <span className="text-secondary">PeluRock</span>
                </h2>
                <p className="text-white/80 text-xl leading-relaxed mb-8">
                  Nos transformamos para entregar una mejor experiencia: atención personalizada, espacio fijo y el mismo cariño de siempre para cada peludito.
                </p>
                <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded-lg mb-8">
                  <p className="text-white font-bold text-lg">
                    ¡Tenemos horas disponibles! Agenda directamente y asegura tu cupo.
                  </p>
                </div>
                <Link href="/reservar">
                  <button className="bg-secondary text-black px-10 py-5 text-sm font-bold tracking-widest uppercase rounded-md hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/20 flex items-center gap-3">
                    Reservar
                  </button>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-[100px]"></div>
                <div className="relative bg-zinc-900 border-2 border-secondary/40 rounded-xl p-8 text-center">
                  <h3 className="text-3xl font-bold text-secondary mb-4">Misma pasión, mejor espacio</h3>
                  <p className="text-white/80 text-lg">
                    Ahora en Portal San Pedro para atenderte con más comodidad y profesionalismo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-gradient-to-b from-zinc-900 to-black" id="pago">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="bg-gradient-to-br from-secondary/20 via-tertiary/20 to-secondary/20 border-2 md:border-4 border-secondary rounded-xl md:rounded-2xl p-4 md:p-8 lg:p-12 shadow-2xl shadow-secondary/30">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-3 md:mb-4">
                  Confirma tu Reserva con Pago
                </h2>
                <div className="h-1 w-24 md:w-32 bg-secondary mx-auto mb-4 md:mb-6"></div>
              </div>

              <div className="bg-black/50 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8 border-2 border-secondary/30">
                <div className="flex items-start gap-3 md:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center text-black font-bold text-lg md:text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Realiza tu reserva</h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      Completa el formulario de reserva seleccionando el servicio, fecha y hora que prefieras.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center text-black font-bold text-lg md:text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Realiza el pago</h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed mb-4">
                      Para confirmar tu reserva, realiza el pago a través de Mercado Pago.
                    </p>
                    <a 
                      href="https://mpago.la/2p2ixWw" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block w-full md:w-auto text-center bg-gradient-to-r from-[#00b3e6] to-[#009ee3] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:from-[#009ee3] hover:to-[#0089cc] transition-all duration-300 shadow-lg"
                    >
                      Pagar con Mercado Pago
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center text-black font-bold text-lg md:text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Envía tu comprobante</h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed mb-4">
                      Una vez realizado el pago, envía el comprobante por WhatsApp para validar tu reserva.
                    </p>
                    <a 
                      href="https://wa.me/56935884173" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block w-full md:w-auto text-center bg-[#25D366] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-[#20BA5A] transition-all duration-300 shadow-lg"
                    >
                      Enviar Comprobante
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-tertiary/20 border-2 border-tertiary/50 rounded-lg md:rounded-xl p-4 md:p-6 text-center">
                <p className="text-white font-bold text-sm md:text-base lg:text-lg leading-relaxed">
                  Tu reserva será válida una vez que realices el pago y envíes el comprobante por WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-black" id="cursos">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase mb-4 block text-sm">Formación Profesional</span>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                ¿Quieres aprender peluquería canina?
              </h2>
              <div className="h-1 w-32 bg-secondary mx-auto mb-8"></div>
              <p className="text-white/80 text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
                Inscríbete en nuestros cursos de peluquería canina y aprende este hermoso oficio con profesionales experimentados. Formamos groómers apasionados y capacitados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/curso-1.png" 
                  alt="Curso de Peluquería Canina" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/curso-2.png" 
                  alt="Estudiantes de Peluquería Canina" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/curso-3.png" 
                  alt="Graduación Curso Peluquería" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/curso-4.png" 
                  alt="Egresados Certificados" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/curso-5.png" 
                  alt="Práctica en Curso" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="group relative overflow-hidden rounded-xl aspect-square bg-zinc-900 border-2 border-secondary/30 hover:border-secondary transition-all duration-300">
                <Image 
                  src="/images/curso-6.png" 
                  alt="Testimonios Alumnos" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="text-center">
              <a href="https://wa.me/56947038938" target="_blank" rel="noopener noreferrer">
                <button className="bg-tertiary text-white px-12 py-6 text-lg font-bold tracking-wider uppercase rounded-md hover:bg-tertiary/90 transition-all duration-300 shadow-lg shadow-tertiary/30 inline-flex items-center gap-4">
                  Consultar por Cursos
                </button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-zinc-900 to-black" id="contacto">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Encuéntranos</h2>
              <div className="h-1 w-32 bg-secondary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl text-center hover:border-secondary transition-all duration-300">
                <h3 className="text-2xl font-bold text-secondary mb-4">Ubicación</h3>
                <p className="text-white/90 text-lg">
                  Portal San Pedro<br/>
                  San Pedro de La Paz
                </p>
              </div>

              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl text-center hover:border-secondary transition-all duration-300">
                <h3 className="text-2xl font-bold text-secondary mb-4">Contacto</h3>
                <div className="space-y-3">
                  <a href="https://wa.me/56935884173" target="_blank" rel="noopener noreferrer" className="block text-white/90 hover:text-secondary transition-colors text-lg font-semibold">
                    +56 9 3588 4173<br/>
                    <span className="text-sm text-white/60">Reservas</span>
                  </a>
                  <a href="https://wa.me/56947038938" target="_blank" rel="noopener noreferrer" className="block text-white/90 hover:text-secondary transition-colors text-lg font-semibold">
                    +56 9 4703 8938<br/>
                    <span className="text-sm text-white/60">Cursos</span>
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900 border-2 border-secondary/30 p-8 rounded-xl text-center hover:border-secondary transition-all duration-300">
                <h3 className="text-2xl font-bold text-secondary mb-4">Síguenos</h3>
                <a href="https://instagram.com/pelurocknataleal" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-secondary transition-colors text-lg font-semibold">
                  @pelurocknataleal
                </a>
              </div>

            </div>

            <div className="mt-16 text-center">
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/reservar">
                  <button className="bg-secondary text-black px-10 py-5 text-sm font-bold tracking-widest uppercase rounded-md hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/20">
                    Reservar Hora
                  </button>
                </Link>
                <a href="https://wa.me/56935884173" target="_blank" rel="noopener noreferrer">
                  <button className="bg-zinc-900 border-2 border-secondary text-secondary px-10 py-5 text-sm font-bold tracking-widest uppercase rounded-md hover:bg-secondary/10 transition-all duration-300">
                    Consultar Servicios
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-br from-secondary via-tertiary to-secondary text-center">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-5xl md:text-7xl font-bold text-black mb-8">
              ¿Listo para el cambio?
            </h2>
            <p className="text-black/80 text-xl mb-12 font-semibold">
              Dale a tu peludito el estilo y cuidado que se merece
            </p>
            <Link href="/reservar">
              <button className="bg-black text-secondary px-12 py-6 text-sm font-bold tracking-widest uppercase rounded-lg shadow-2xl hover:opacity-90 transition-all scale-98">
                Reservar
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white w-full py-16 px-8 border-t-2 border-secondary/30">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-7xl mx-auto">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/logo.png" alt="PeluRock Nata Leal" width={50} height={50} className="object-contain" />
              <span className="font-bold text-xl text-secondary uppercase">PeluRock Nata Leal</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Peluquería y Spa Canino con actitud rockera. Portal San Pedro, San Pedro de La Paz.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/pelurocknataleal" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 transition-colors text-xl font-bold">
                Instagram
              </a>
              <a href="https://wa.me/56935884173" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 transition-colors text-xl font-bold">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-3">
              <h4 className="font-bold text-sm tracking-widest uppercase text-secondary mb-4">Navegación</h4>
              <a className="block text-white/70 hover:text-secondary transition-colors text-sm uppercase tracking-wider" href="#servicios">Servicios</a>
              <a className="block text-white/70 hover:text-secondary transition-colors text-sm uppercase tracking-wider" href="#trabajo">Nuestro Trabajo</a>
              <a className="block text-white/70 hover:text-secondary transition-colors text-sm uppercase tracking-wider" href="#pago">Pago</a>
              <a className="block text-white/70 hover:text-secondary transition-colors text-sm uppercase tracking-wider" href="#cursos">Cursos</a>
              <a className="block text-white/70 hover:text-secondary transition-colors text-sm uppercase tracking-wider" href="#contacto">Contacto</a>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-sm tracking-widest uppercase text-secondary mb-4">Contacto</h4>
              <a href="https://wa.me/56935884173" className="block text-white/70 hover:text-secondary transition-colors text-sm">+56 9 3588 4173</a>
              <a href="https://wa.me/56947038938" className="block text-white/70 hover:text-secondary transition-colors text-sm">+56 9 4703 8938</a>
              <a href="https://instagram.com/pelurocknataleal" className="block text-white/70 hover:text-secondary transition-colors text-sm">@pelurocknataleal</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">© 2026 PeluRock Nata Leal. Todos los derechos reservados.</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-secondary">Rock + Amor por tu peludito</span>
        </div>
      </footer>
    </>
  )
}
