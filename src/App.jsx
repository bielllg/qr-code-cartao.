import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { ShineButton } from './components/lightswind/ShineButton';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AuroraTextEffect } from './components/AuroraTextEffect';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────
   Linhas de texto para a revelação com máscara
   ──────────────────────────────────────────────── */
const REVEAL_LINES = [
  'Desenvolvemos soluções digitais',
  'estratégicas para negócios que',
  'buscam crescimento consistente.',
  'Criamos experiências digitais',
  'que conectam marcas a resultados reais.',
  'Projetamos soluções que elevam o nível',
  'do seu negócio no digital.',
];

const SERVICES = [
  {
    title: 'Sites & Landing Pages',
    desc: 'Desenvolvimento de alta performance com foco total em conversão de clientes.',
    icon: '🚀',
  },
  {
    title: 'Automações Customizadas',
    desc: 'Sistemas inteligentes que trabalham por você 24h por dia, 7 dias por semana.',
    icon: '⚡',
  },
  {
    title: 'Design de Interface',
    desc: 'Experiências visuais impactantes que elevam a percepção de valor da sua marca.',
    icon: '✨',
  },
];

function App() {
  /* ─── Refs para GSAP ─── */
  const pinnedRef = useRef(null);
  const heroContentRef = useRef(null);
  const columnsContainerRef = useRef(null);
  const revealTextRef = useRef(null);

  /* Número de colunas para o efeito "persiana" */
  const NUM_COLUMNS = 10;

  /* ═══════════════════════════════════════════════
     GSAP SCROLL TIMELINE
     Todas as fases são amarradas ao scroll (scrub).
     A seção inteira fica pinada enquanto a animação
     acontece, então o pin é liberado para o conteúdo
     de baixo rolar normalmente.
     ═══════════════════════════════════════════════ */
  useGSAP(
     () => {
      const pinned = pinnedRef.current;
      const heroContent = heroContentRef.current;
      const columnsContainer = columnsContainerRef.current;
      const revealText = revealTextRef.current;
      if (!pinned || !heroContent || !columnsContainer || !revealText) return;

      const columns = columnsContainer.querySelectorAll('.curtain-col');
      const lineSpans = pinned.querySelectorAll('.line-text');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinned,
          start: 'top top',
          end: '+=400%',   // mais espaço para acomodar as colunas
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ── Fase 1 (0→3.5): COLUNAS descem do topo + hero desaparece ── */
      tl.to(
        heroContent,
        { opacity: 0, scale: 0.95, duration: 3, ease: 'power2.in' },
        0,
      );
      tl.fromTo(
        columns,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2.5,
          stagger: 0.2,          // cada coluna atrasa 0.2 → efeito escalonado
          ease: 'power2.inOut',
        },
        0,
      );

      /* ── Fase 2 (3→5.5): Revelação do texto ── */
      tl.fromTo(
        lineSpans,
        { xPercent: 110, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          stagger: 0.35,
          duration: 2.5,
          ease: 'power3.out',
        },
        3,
      );

      /* ── Fase 3 (5→6.5): Pausa para leitura ── */
      tl.to({}, { duration: 1.5 });

      /* ── Fase 4 (6.5→9.5): Scale down — texto vira legenda ── */
      tl.to(revealText, {
        scale: 0.3,
        y: '30vh',
        opacity: 0.4,
        duration: 3,
        ease: 'power2.inOut',
      });

      /* ── Fase 5 (9.5→10.5): Fade out do texto ── */
      tl.to(revealText, {
        opacity: 0,
        duration: 1,
        ease: 'power1.in',
      });
    },
    { scope: pinnedRef },
  );

  /* ═══════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════ */
  return (
    <div className="relative w-full bg-black font-sans selection:bg-orange-500/30">

      {/* ════════════════════════════════════════════
          SEÇÃO PINADA: Hero + Cortina + Texto
          Tudo vive dentro de uma única div h-screen.
          O GSAP pina ela e controla as camadas.
          ════════════════════════════════════════════ */}
      <div
        ref={pinnedRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* ── Camada 0: Shader Gradient Background ── */}
        <div className="absolute inset-0 z-0">
          <ShaderGradientCanvas
            className="h-full w-full"
            style={{ position: 'absolute', top: 0 }}
          >
            <ShaderGradient
              animate="on"
              axesHelper="off"
              brightness={1.2}
              cAzimuthAngle={180}
              cDistance={3.6}
              cPolarAngle={90}
              cameraZoom={1}
              color1="#ff5005"
              color2="#dbb45a"
              color3="#445be1"
              destination="onCanvas"
              embedMode="off"
              envPreset="city"
              format="gif"
              fov={45}
              frameRate={10}
              gizmoHelper="hide"
              grain="on"
              lightType="3d"
              pixelDensity={1}
              positionX={-1.4}
              positionY={0}
              positionZ={0}
              range="disabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.1}
              rotationX={0}
              rotationY={10}
              rotationZ={50}
              shader="defaults"
              type="plane"
              uAmplitude={1}
              uDensity={1.3}
              uFrequency={5.5}
              uSpeed={0.4}
              uStrength={4}
              uTime={0}
              wireframe={false}
            />
          </ShaderGradientCanvas>
        </div>

        {/* ── Camada 1: Overlay de blur/tom escuro ── */}
        <div className="absolute inset-0 z-[1] bg-black/30 backdrop-blur-[1px]" />

        {/* ── Camada 2: Conteúdo do Hero (desaparece com o scroll) ── */}
        <div
          ref={heroContentRef}
          className="relative z-[2] flex h-full flex-col items-center justify-center p-6 text-center text-white"
        >
          <div className="flex max-w-7xl flex-col items-center gap-8 px-4">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ShineButton
                label="VAMOS CRIAR ALGO INCRÍVEL JUNTOS"
                size="sm"
                bgColor="linear-gradient(to right, rgba(13, 46, 230, 0.29), rgba(255, 97, 5, 0.42))"
                className="rounded-full border-white/20 px-8 py-2 text-[10px] font-bold tracking-[0.2em]"
              />
            </motion.div>

            <div className="space-y-10">
              {/* Título principal */}
              <h1 className="slide-in-elliptic-top-bck-normal mx-auto max-w-none text-4xl font-bold uppercase italic leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
                O próximo nível do seu{' '}
                <AuroraTextEffect
                  text="negócio"
                  colors={{
                    first: 'bg-purple-300',
                    second: 'bg-white',
                    third: 'bg-violet-200',
                    fourth: 'bg-white',
                  }}
                  className="drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] drop-shadow-[0_0_22px_rgba(255,255,255,0.5)]"
                  textClassName="font-black italic uppercase"
                  style={{ fontWeight: 1000 }}
                />{' '}
                começa aqui
              </h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="mx-auto max-w-3xl text-lg font-bold leading-relaxed text-white/50 md:text-2xl"
              >
                Desenvolvemos soluções digitais inteligentes para negócios que
                querem escalar com tecnologia, design e automação.
              </motion.p>
            </div>

            {/* CTA WhatsApp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-center pt-6"
            >
              <WhatsAppButton />
            </motion.div>
          </div>
        </div>

        {/* ── Camada 3: COLUNAS PRETAS (descem do topo, escalonadas) ── */}
        <div
          ref={columnsContainerRef}
          className="absolute inset-0 z-[3] flex"
        >
          {Array.from({ length: NUM_COLUMNS }).map((_, i) => (
            <div
              key={i}
              className="curtain-col h-full flex-1"
              style={{
                backgroundColor: '#000000',
                transformOrigin: 'top center',
                transform: 'scaleY(0)',
              }}
            />
          ))}
        </div>

        {/* ── Camada 4: Texto de revelação (sobre a cortina) ── */}
        <div
          ref={revealTextRef}
          className="pointer-events-none absolute inset-0 z-[4] flex flex-col items-center justify-center px-6 text-center"
        >
          {REVEAL_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden py-1 md:py-3">
              <span className="line-text block text-2xl font-black uppercase leading-[1.15] tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-[4.5rem]">
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SEÇÃO DE SERVIÇOS — Scroll natural após pin
          ════════════════════════════════════════════ */}
      <div className="relative z-10 bg-black px-6 pb-20 pt-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-24 text-center"
          >
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
              Nossos Serviços
            </p>
            <h2 className="mb-8 text-4xl font-bold text-white md:text-6xl">
              Criamos o futuro digital do seu{' '}
              <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
                negócio
              </span>
            </h2>
            <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-purple-600 to-transparent" />
          </motion.div>

          {/* Cards de serviço */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {SERVICES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-md transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.05]"
              >
                <div className="mb-6 text-5xl transition-transform duration-500 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="leading-relaxed italic text-white/40">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA final */}
          <motion.div
            className="mt-32 rounded-[3rem] border border-purple-500/10 bg-gradient-to-b from-purple-900/10 to-black p-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-3xl font-bold text-white">
              Pronto para dominar o mercado digital?
            </h3>
            <WhatsAppButton />
          </motion.div>
        </div>
      </div>

      {/* Decorative blur */}
      <div className="pointer-events-none fixed -bottom-48 -right-48 z-0 h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-[150px]" />
    </div>
  );
}

export default App;
