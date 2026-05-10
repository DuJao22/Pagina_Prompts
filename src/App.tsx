/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  Copy, 
  ExternalLink, 
  Zap, 
  Code, 
  Layers, 
  Box, 
  ShoppingBag, 
  Cpu, 
  Layout, 
  Sparkles,
  ChevronRight,
  Check,
  X,
  Globe,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
  difficulty: "Fundamental" | "Intermediário" | "Avançado";
  visualPreview?: string;
}

const CATEGORIES = [
  "Todos",
  "Landing Page",
  "3D / Three.js",
  "Parallax",
  "Minimalista",
  "E-commerce",
  "UI/UX Avançado",
  "Portfólio",
  "Empresarial"
];

const PROMPTS: Prompt[] = [
  {
    id: "landing-premium",
    title: "Landing Page Premium SaaS",
    description: "Uma landing page de alta conversão para produtos digitais com grid bento e animações suaves.",
    category: "Landing Page",
    tags: ["#SaaS", "#BentoGrid", "#Conversão"],
    difficulty: "Avançado",
    content: "Aja como um desenvolvedor frontend expert. Crie uma landing page premium para um software de IA. Utilize React, Tailwind CSS e Framer Motion. O design deve seguir um estilo 'Dark Mode' sofisticado, com um Hero impactante (título gigante, subtítulo elegante), uma seção de funcionalidades em 'Bento Grid', depoimentos flutuantes e um CTA radiante. Use gradientes sutis (do índigo ao violeta), tipografia Inter de peso variado e garanta que o layout seja 100% responsivo e acessível. Inclua animações de entrada (fade-in e slide-up) para cada seção conforme o usuário rola a página.",
  },
  {
    id: "site-3d-threejs",
    title: "Site 3D Imersivo (Three.js)",
    description: "Estrutura avançada integrando elementos 3D interativos no fundo da página.",
    category: "3D / Three.js",
    tags: ["#ThreeJS", "#3D", "#Interativo"],
    difficulty: "Avançado",
    content: "Desenvolva uma página web que integre Three.js para um fundo 3D interativo. O tema é 'Inovação Espacial'. No centro da tela, deve haver uma esfera de partículas reagindo ao movimento do mouse. Sobreponha um menu minimalista e um texto 'Glassmorphism' que descreve a visão da empresa. Utilize React Three Fiber para a implementação. As cores devem alternar entre azul profundo e ciano neon. Otimize a performance para dispositivos móveis, reduzindo a contagem de partículas se necessário.",
  },
  {
    id: "parallax-immersive",
    title: "Página Parallax Imersiva",
    description: "Scroll dinâmico onde camadas de fundo e foreground se movem em velocidades diferentes.",
    category: "Parallax",
    tags: ["#Parallax", "#Storytelling", "#Visual"],
    difficulty: "Intermediário",
    content: "Crie uma experiência de storytelling visual utilizando efeitos de Parallax avançados. Ao rolar a página, elementos de tipografia devem deslizar por trás de imagens de alta qualidade com máscaras personalizadas (formas orgânicas). Use a biblioteca 'framer-motion' para controlar os valores de scroll (useScroll e useTransform). O tema deve ser 'Exploração Urbana', com fotos em preto e branco e textos em amarelo neon. A navegação lateral deve indicar o progresso visual da jornada do usuário.",
  },
  {
    id: "minimalist-elegant",
    title: "Site Minimalista Elegante",
    description: "Foco total na tipografia e no espaço negativo. Estilo galeria de arte moderna.",
    category: "Minimalista",
    tags: ["#Minimalismo", "#Elite", "#Arte"],
    difficulty: "Fundamental",
    content: "Modele um site ultra-minimalista no estilo de uma agência de design suíça. Use apenas preto, branco e uma única cor de destaque (vermelho vivo). Priorize o espaço negativo. Utilize a fonte 'Space Grotesk' para títulos e uma fonte mono para pequenos detalhes técnicos. O layout deve ser assimétrico e as transições de página devem ser 'fade-out' lentos e elegantes. Sem bordas, sem sombras pesadas — apenas linhas finas de 1px e hierarquia tipográfica impecável.",
  },
  {
    id: "ecommerce-premium",
    title: "E-commerce Tech Lifestyle",
    description: "Loja virtual focada em produtos físicos com visual de produto Apple.",
    category: "E-commerce",
    tags: ["#Ecommerce", "#AppleStyle", "#Vendas"],
    difficulty: "Avançado",
    content: "Projete uma página de produto para um gadget de luxo. O estilo deve ser 'Apple-esque': fundo branco puro, fotos de produto gigantes (high-res), seções que explicam cada detalhe com zoom interativo. Inclua um 'Navbar' que fica fixo no topo e muda levemente conforme o scroll. O botão de compra deve ter um efeito de brilho suave ao passar o mouse. Utilize transições de entrada sincronizadas que dão a sensação de que o produto está sendo 'montado' na tela do usuário.",
  },
  {
    id: "ui-ux-advanced",
    title: "Dashboard Futurista UI/UX",
    description: "Interface de controle com painéis translúcidos e micro-interações intensas.",
    category: "UI/UX Avançado",
    tags: ["#Dashboard", "#Glassmorphism", "#DataViz"],
    difficulty: "Avançado",
    content: "Crie um protótipo funcional de um dashboard futurista. Use o conceito de 'Neumorphism Modernizado' ou 'Glassmorphism' com desfoque de fundo intenso (backdrop-filter: blur(20px)). Inclua gráficos de área animados (usando Recharts ou D3) que pulsam com dados em tempo real. O esquema de cores deve ser monocromático (vários tons de grafite) com acentos em verde esmeralda. Cada painel deve ser arrastável ou expansível, proporcionando uma UX de alta fidelidade.",
  },
  {
    id: "portfolio-pro",
    title: "Portfólio de Desenvolvedor de Elite",
    description: "Destaque seus projetos com um layout que grita competência técnica e criativa.",
    category: "Portfólio",
    tags: ["#Portfolio", "#Developer", "#PersonalBranding"],
    difficulty: "Intermediário",
    content: "Desenvolva um portfólio pessoal que utilize um tema 'Terminal meets Modern Art'. No topo, um terminal interativo que aceita comandos simples. Abaixo, uma grade de projetos que usa 'Tilt Effect' (parallax no mouse) nos cards. Inclua uma seção 'Skills' representada por uma nuvem de tags 3D ou um gráfico radial dinâmico. O rodapé deve ter links sociais com animações de hover magnéticas.",
  },
  {
    id: "business-presentation",
    title: "Apresentação Corporativa IA",
    description: "Site institucional para empresas de tecnologia que buscam autoridade e modernidade.",
    category: "Empresarial",
    tags: ["#Business", "#AI", "#Trust"],
    difficulty: "Fundamental",
    content: "Crie uma página institucional para uma empresa de consultoria em IA. O design deve equilibrar seriedade e inovação. Use azul marinho como cor base e tons de prata para os detalhes. Implemente uma seção de 'Processo' usando um Stepper animado. O Hero deve conter uma animação de texto tipo 'typing' que demonstra as capacidades da consultoria. Garanta que o tempo de carregamento seja otimizado e que as fontes carreguem instantaneamente.",
  },
  {
    id: "apple-vision-style",
    title: "Página Estilo Apple Vision",
    description: "Visual imersivo com profundidade visual e efeitos de vidro avançados.",
    category: "UI/UX Avançado",
    tags: ["#Spatial", "#Glass", "#VisionPro"],
    difficulty: "Avançado",
    content: "Aja como um Senior UX Designer na Apple. Crie uma interface de 'Computação Espacial' usando React e Tailwind. Use um fundo de gradiente dinâmico que se move sutilmente. Os cards devem ser 'Glassmorphic' com reflexos internos e bordas de 1px ultra-brilhantes. Ao passar o mouse, o card deve ter um efeito de 'hover 3D' seguindo o cursor. Tipografia: San Francisco (ou Inter) com pesos variados para criar profundidade. Inclua ícones que parecem flutuar em diferentes camadas de Z-index.",
  },
  {
    id: "cyberpunk-lp",
    title: "Landing Page Cyberpunk 2077",
    description: "Design futurista com cores neon vibrantes, glitches e estética industrial.",
    category: "Landing Page",
    tags: ["#Cyberpunk", "#Neon", "#Glitch"],
    difficulty: "Intermediário",
    content: "Crie uma página de destino com estética Cyberpunk. As cores dominantes devem ser Amarelo Canário (#FCEE09), Azul Ciano e Rosa Magenta. Adicione efeitos de 'Glitch' sutis no texto do Hero. Utilize fontes angulares e industriais. Inclua uma grade de fundo simulando um HUD de ficção científica. Os botões devem ter animações de 'flicker' (piscar) e bordas recortadas. Use SVG patterns para texturas de ruído e linhas de scan line.",
  },
  {
    id: "luxury-watch-ecommerce",
    title: "E-commerce de Relógios de Luxo",
    description: "Layout de prestígio focado em detalhes macro e tipografia serifada.",
    category: "E-commerce",
    tags: ["#Luxury", "#Fashion", "#Ecom"],
    difficulty: "Avançado",
    content: "Desenvolva uma vitrine para relógios de luxo. Use uma combinação de tipografia Serifada (Playfair Display) para títulos e Sans-serif (Inter) para corpo. O fundo deve ser um 'Champagne' muito leve ou 'Off-white'. Use animações de 'Mask Reveal' para as imagens dos produtos ao rolar a página. O carrinho de compras deve ser um painel lateral elegante com transições suaves. Foque em micro-interações: ao passar o mouse na foto, o zoom deve ser suave e cinematográfico.",
  },
  {
    id: "arch-portfolio-minimal",
    title: "Portfólio de Arquitetura Minimal",
    description: "Pureza geométrica e foco em fotografia de alta qualidade.",
    category: "Minimalista",
    tags: ["#Architecture", "#Pure", "#NegativeSpace"],
    difficulty: "Fundamental",
    content: "Crie um portfólio para um estúdio de arquitetura. O layout deve ser baseado em uma grade rígida de 12 colunas, mas com uso massivo de espaços vazios. Use apenas tons de cinza e branco. As transições entre projetos devem ser uma cortina de cor sólida que sobe e desce. As legendas das fotos devem ser pequenas e em fonte mono, alinhadas às bordas da tela. O menu de navegação deve ser um 'Hamburguer' que expande para uma tela cheia minimalista.",
  },
  {
    id: "threejs-wave-terrain",
    title: "Terreno de Ondas 3D",
    description: "Fundo animado com ondas de fios (wireframe) reagindo ao mouse.",
    category: "3D / Three.js",
    tags: ["#ThreeJS", "#Math", "#Interactive"],
    difficulty: "Avançado",
    content: "Aja como um desenvolvedor Creative Technologist. Crie um componente Three.js que renderiza um terreno infinito de ondas em wireframe. Use um Vertex Shader para animar as ondas com ruído de Perlin. O usuário deve ser capaz de rotacionar a câmera levemente ao mover o mouse. As linhas do wireframe devem brilhar em azul neon sobre um fundo preto profundo. Adicione um efeito de névoa (fog) para dar profundidade ao horizonte 3D.",
  },
  {
    id: "horizontal-storytelling",
    title: "Storytelling de Scroll Horizontal",
    description: "Uma experiência cinematográfica que se move lateralmente.",
    category: "Parallax",
    tags: ["#HorizontalScroll", "#Cinema", "#Modern"],
    difficulty: "Intermediário",
    content: "Implemente um site que utiliza todo o conteúdo em scroll horizontal. Use a biblioteca 'Framer Motion' para interceptar o scroll vertical e transformá-lo em movimento no eixo X. Cada seção deve ocupar 100% da largura da tela (100vw). Adicione um indicador de progresso na parte inferior. O design deve ser rico em tipografia grande que 'atravessa' as seções durante a transição, criando um efeito de continuidade visual única.",
  },
  {
    id: "fintech-enterprise-app",
    title: "Dashboard Fintech Enterprise",
    description: "Interface complexa de dados financeiros com clareza absoluta.",
    category: "Empresarial",
    tags: ["#Fintech", "#Data", "#SaaS"],
    difficulty: "Avançado",
    content: "Crie uma interface de analytics para uma plataforma de pagamentos. O foco é densidade de informação com legibilidade. Use tabelas customizadas com estados de 'sorting' e 'filtering' animados. Inclua pequenos gráficos de faísca (sparklines) em cada linha de dados. A paleta de cores deve ser profissional: azul petróleo escuro para a barra lateral e cinzas frios para o conteúdo principal. O sistema de notificações deve ser discreto mas funcional (estilo toast).",
  },
  {
    id: "creative-agency-2026",
    title: "Agência Criativa Avant-Garde",
    description: "Brutalismo moderno misturado com elegância tech.",
    category: "Landing Page",
    tags: ["#Brutalism", "#Agency", "#Bold"],
    difficulty: "Intermediário",
    content: "Aja como um diretor de arte premiado. Crie a landing page de uma agência criativa. Use tipografia 'Sans-serif' pesada e extra-bold. Implemente um 'Custom Cursor' que muda de forma ao passar por links. O layout deve ignorar as grades convencionais, com textos sobrepostos e elementos flutuantes. Inclua uma seção 'Work' onde os projetos aparecem em um carrossel vertical infinito. Cores: Laranja vibrante e Cinza Chumbo.",
  },
  {
    id: "glass-dashboard-ux",
    title: "Dashboard de Vidro Interativo",
    description: "Explora o ápice do design Glassmorphism com interações complexas.",
    category: "UI/UX Avançado",
    tags: ["#Glassmorphism", "#Interactive", "#UX"],
    difficulty: "Avançado",
    content: "Desenvolva um dashboard de 'Smart Home' altamente tátil. Cada controle (slider de iluminação, termostato) deve parecer feito de vidro fosco com iluminação interna. Ao interagir com um slider, a cor de fundo do dashboard deve mudar dinamicamente para refletir o estado do dispositivo. Use sombras suaves de 2 níveis para dar profundidade. Adicione sons de feedback tátil (opcional nas instruções) e animações suaves de 'spring' em todas as interações. O design deve ser relaxante e luxuoso.",
  },
  {
    id: "bento-product-launch",
    title: "Lançamento de Produto (Bento Grid)",
    description: "Apresentação modular estilo Apple ou Stripe para novos hardwares/softwares.",
    category: "Landing Page",
    tags: ["#Bento", "#Launch", "#Marketing"],
    difficulty: "Intermediário",
    content: "Projete uma página de anúncio para um novo smartphone. Use a técnica de 'Bento Grid' para exibir fotos de hardware, especificações técnicas e recursos de software em quadrados de tamanhos variados. Cada 'box' do bento deve ter sua própria animação de entrada com atrasos incrementais. Inclua uma seção de 'Especificações' que se expande ao clicar. A tipografia deve ser limpa (Outfit ou Inter) e a paleta de cores deve ser baseada no acabamento do produto (ex: Titânio ou Grafite).",
  },
];

// Components
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-10 h-10 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <Zap className="text-black fill-black" size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-white uppercase italic">Prompt<span className="text-emerald-400">Master</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <a href="#explorar" className="hover:text-white transition-colors">Explorar</a>
        <a href="#categorias" className="hover:text-white transition-colors">Categorias</a>
        <a href="#como-usar" className="hover:text-white transition-colors">Como Usar</a>
        <button className="px-5 py-2 bg-white text-black rounded-full hover:bg-emerald-400 transition-all duration-300 font-bold active:scale-95">
          Acesso Premium
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[80vh] flex flex-col justify-center">
    {/* Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 blur-[120px] rounded-full -z-10" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full -z-10" />

    <div className="max-w-4xl mx-auto text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest inline-block mb-6">
          A Nova Era do Web Design
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
          Biblioteca de Prompts para <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto] animate-gradient-x">Sites Profissionais com IA</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Gere páginas incríveis, animadas e prontas para produção em segundos usando nossos comandos de elite testados.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <a href="#explorar" className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl flex items-center gap-2 hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30">
          <Sparkles size={20} />
          Explorar Prompts
        </a>
      </motion.div>
    </div>
  </section>
);

interface SearchAndFilterProps {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const SearchAndFilter = ({ 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery 
}: SearchAndFilterProps) => (
  <div id="explorar" className="max-w-7xl mx-auto px-6 mb-12 space-y-8">
    <div className="relative group">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
        <Search size={22} />
      </div>
      <input 
        type="text" 
        placeholder="Pesquise por tecnologia, tipo de site ou funcionalidade..." 
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-14 pr-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start" id="categorias">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border ${
            selectedCategory === cat 
              ? "bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20" 
              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

interface PromptCardProps {
  prompt: Prompt;
  onOpen: (p: Prompt) => void;
}

const PromptCard: React.FC<PromptCardProps & { onCopy: () => void }> = ({ prompt, onOpen, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  const IconMap: Record<string, any> = {
    "Landing Page": Layout,
    "3D / Three.js": Box,
    "Parallax": Layers,
    "Minimalista": Monitor,
    "E-commerce": ShoppingBag,
    "UI/UX Avançado": Cpu,
    "Portfólio": Code,
    "Empresarial": Globe
  };

  const CategoryIcon = IconMap[prompt.category] || Zap;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col h-full overflow-hidden"
      onClick={() => onOpen(prompt)}
    >
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-all" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 text-gray-400 group-hover:text-emerald-400 transition-all">
            <CategoryIcon size={24} />
          </div>
          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md border tracking-tighter ${
            prompt.difficulty === "Avançado" ? "text-purple-400 border-purple-400/30 bg-purple-400/5" :
            prompt.difficulty === "Intermediário" ? "text-blue-400 border-blue-400/30 bg-blue-400/5" :
            "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
          }`}>
            {prompt.difficulty}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
          {prompt.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
          {prompt.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {prompt.tags.map(tag => (
            <span key={tag} className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-tighter">{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-white/5">
          <button 
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
              copied 
              ? "bg-emerald-500 text-black" 
              : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado!" : "Copiar Prompt"}
          </button>
          <button className="p-3 rounded-xl bg-white/5 text-white hover:bg-emerald-500 hover:text-black transition-all border border-white/10 active:scale-95">
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Modal = ({ prompt, onClose, onCopy }: { prompt: Prompt; onClose: () => void; onCopy: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex justify-center overflow-y-auto p-4 md:p-6 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-3xl bg-[#0F0F0F] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative self-start my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className="p-10 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
              <Zap size={14} />
              {prompt.category}
            </div>
            <h2 className="text-4xl font-black text-white leading-tight">
              {prompt.title}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Conteúdo do Prompt</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copiado para o Clipboard" : "Copiar Texto"}
              </button>
            </div>
            <div className="relative group">
              <pre className="w-full bg-black border border-white/10 rounded-2xl p-6 text-emerald-400/90 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-[40vh] overflow-y-auto custom-scrollbar">
                {prompt.content}
              </pre>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Code size={40} className="text-white" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-white/5 rounded-2xl space-y-2 border border-white/5">
              <h4 className="text-white font-bold flex items-center gap-2">
                <Layout size={18} className="text-emerald-400" />
                Estrutura Sugerida
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed italic">
                Este prompt foca em components modulares, animações fluidas e semântica HTML pura. Recomenda-se o uso de Tailwind para produtividade.
              </p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl space-y-2 border border-white/5">
              <h4 className="text-white font-bold flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-400" />
                Dica Expert
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed italic">
                Tente pedir para a IA adicionar um 'efeito de brilho no cursor' ou 'parallax suave ao mover o mouse' para elevar o nível do site final.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Guide = () => (
  <section id="como-usar" className="max-w-4xl mx-auto px-6 py-24">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-black text-white mb-4 italic uppercase tracking-tighter">Como usar os <span className="text-emerald-400">Prompts</span></h2>
      <p className="text-gray-400">Transforme texto em código profissional em 3 passos simples.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-12 relative">
      <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-[2px] bg-white/5 -z-10" />
      
      {[
        { step: "01", title: "Copie o Prompt", desc: "Selecione o modelo desejado e clique no botão de copiar azul." },
        { step: "02", title: "Cole em sua IA", desc: "Use o ChatGPT, Claude ou Gemini. Certifique-se de usar modelos premium." },
        { step: "03", title: "Customize", desc: "Peça ajustes finos e gere seu site de alto impacto em segundos." }
      ].map((item, i) => (
        <div key={i} className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-black border-2 border-white/10 rounded-full flex items-center justify-center text-emerald-400 font-black text-2xl shadow-xl shadow-emerald-500/5">
            {item.step}
          </div>
          <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">{item.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 bg-black/50 py-16 px-6">
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-black" />
            </div>
            <span className="font-bold text-lg text-white italic uppercase tracking-tighter">PromptMaster</span>
          </div>
          <p className="text-gray-500 text-sm mt-2 text-center md:text-left">
            Desenvolvido por <span className="text-white font-bold">João Layon</span><br/>
            Dev Fullstack & <span className="text-emerald-400">CEO DS Company</span>
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">Siga no Instagram</span>
          <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
            <a href="https://instagram.com/layon.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors group">
              @layon.dev
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://instagram.com/dscompany1_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors group">
              @dscompany1_
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://instagram.com/davi._link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors group">
              @davi._link
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-4">
        <div className="flex gap-8 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-emerald-400 transition-colors">Termos</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Suporte</a>
        </div>
        <div className="text-gray-700 text-[10px] font-mono">
          © 2026 DS COMPANY. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  </footer>
);

const OfferCard = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 50 }}
    className="fixed bottom-8 right-8 z-[100] w-full max-w-sm bg-[#0F0F0F] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl shadow-emerald-500/10 overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
    <button 
      onClick={onClose}
      className="absolute top-4 right-4 p-1 rounded-full bg-white/5 text-gray-400 hover:text-white"
    >
      <X size={16} />
    </button>
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em]">
        <Sparkles size={14} />
        Oportunidade Única
      </div>
      <h3 className="text-xl font-bold text-white italic uppercase tracking-tighter">
        Transforme em <span className="text-emerald-400">Mini SaaS</span>
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        Não apenas crie sites. Aprenda a desenvolver um Mini SaaS lucrativo do zero com nosso método exclusivo.
      </p>
      <a 
        href="https://crie-site.onrender.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full py-3 bg-emerald-500 text-black text-center font-black rounded-xl hover:bg-emerald-400 transition-all active:scale-95 uppercase tracking-tighter text-sm"
      >
        Aprender Agora
      </a>
    </div>
  </motion.div>
);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showOffer, setShowOffer] = useState(false);

  const handleCopyAction = () => {
    setShowOffer(true);
  };

  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter(p => {
      const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedPrompt) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedPrompt]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black relative">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <Navbar />
      
      <main>
        <Hero />
        
        <SearchAndFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="max-w-7xl mx-auto px-6 pb-32">
          {filteredPrompts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} onOpen={setSelectedPrompt} onCopy={handleCopyAction} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[40px]">
              <div className="inline-block p-6 bg-white/5 rounded-full mb-6">
                <Search size={48} className="text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400">Nenhum prompt encontrado</h3>
              <p className="text-gray-600 mt-2">Tente ajustar seus termos de pesquisa ou filtros.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("Todos"); }}
                className="mt-8 text-emerald-400 font-bold hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>

        <div className="bg-[#050505] border-y border-white/5">
          <Guide />
        </div>
        
        <section className="max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="p-16 rounded-[48px] bg-gradient-to-tr from-emerald-500/10 via-black to-cyan-500/10 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
            <h2 className="text-5xl font-black text-white mb-6 italic tracking-tighter uppercase">Quer prompts ainda mais <span className="text-emerald-400">Potentes?</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-medium">
              Assine nossa newsletter e receba semanalmente os comandos que as maiores agências do mundo estão usando.
            </p>
            <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
              <button className="px-8 py-4 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all active:scale-95 uppercase tracking-tighter">
                Quero Receber
              </button>
            </form>
          </motion.div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedPrompt && (
          <Modal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} onCopy={handleCopyAction} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOffer && (
          <OfferCard onClose={() => setShowOffer(false)} />
        )}
      </AnimatePresence>

      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
}
