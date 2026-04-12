import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '../utils/cn'; // Assuming you have a cn utility, or I'll define a simple one if not.

// Definindo o plugin
gsap.registerPlugin(ScrollTrigger);

interface PremiumScrollSectionProps {
  className?: string;
}

const PremiumScrollSection: React.FC<PremiumScrollSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const phrase = [
    "Desenvolvemos soluções digitais",
    "estratégicas para negócios que",
    "buscam crescimento consistente.",
    "Criamos experiências digitais",
    "que conectam marcas a resultados reais.",
    "Projetamos soluções que elevam o nível",
    "do seu negócio no digital."
  ];



  useGSAP(() => {
    if (!containerRef.current || !sectionRef.current || !textRef.current) return;

    // Timeline principal para o scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Duração do scroll
        scrub: 1,      // Suavidade do scroll
        pin: true,     // Trava a seção
        anticipatePin: 1,
      }
    });

    // 1. Transição de background para preto
    tl.to(sectionRef.current, {
      backgroundColor: "#000000",
      duration: 1,
    });

    // 2. Revelação do texto (Máscara: Direita para Esquerda)
    tl.from(".reveal-line span", {
      xPercent: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 2,
      ease: "power2.out",
    }, "-=0.5");

    // 3. Scale Down e Morphing (Texto vira legenda no rodapé)
    tl.to(textRef.current, {
      scale: 0.4,
      y: "35vh", // Move para baixo
      opacity: 0.6,
      duration: 3,
      ease: "power1.inOut",
    });

    // 4. Entrada da seção "Projetos Recentes"
    // Nota: Como a seção anterior está pinada, controlamos a opacidade/entrada aqui
    // ou deixamos o fluxo natural do scroll liberar o pin.
    // O pedido diz "libere o pin... deslizar de baixo para cima normalmente".
    // Então o tl termina e o scroll do navegador assume.
    // Mas podemos antecipar a visibilidade do título se necessário.

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* Seção Principal Pinada */}
      <section
        ref={sectionRef}
        className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-900 transition-colors duration-700"
      >
        <div ref={textRef} className="z-10 flex flex-col items-center justify-center text-center">
          {phrase.map((line, index) => (
            <div key={index} className="reveal-line relative overflow-hidden py-1 h-[1.2em] md:h-[1.4em]">
              <span className="block text-3xl font-bold uppercase tracking-tighter text-white sm:text-5xl md:text-7xl lg:text-8xl">
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Indicador de Legenda (visível após scale down) */}
        <div className="absolute bottom-10 left-0 w-full text-center opacity-0 transition-opacity duration-300">
          {/* Este espaço será ocupado pelo texto escalado */}
        </div>
      </section>

      {/* Próxima Seção: Projetos Recentes */}
      {/* Esta seção aparecerá naturalmente após o término do pin do containerRef */}
      <section
        ref={projectsRef}
        className="relative z-20 flex min-h-screen w-full flex-col items-center justify-start bg-black px-6 pt-24"
      >
        <div className="w-full max-w-7xl">
          <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-orange-500">
            Trabalho Selecionado
          </h2>
          <h3 className="mt-4 text-5xl font-bold text-white md:text-8xl">
            Projetos Recentes
          </h3>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-800 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                  <span className="text-white/60 text-sm">PROJETO 0{i}</span>
                  <h4 className="text-white text-2xl font-bold">Case Innovation 2026</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumScrollSection;
