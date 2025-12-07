import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, CheckCircle2, Play, Users, DollarSign, ShieldCheck, Star, ChevronLeft, ChevronRight, Zap, TrendingUp, Sparkles, X, Eye, ThumbsUp, Truck, ShoppingBag, Lock } from 'lucide-react';
import { Button } from './components/Button';
import { QuizStep } from './components/QuizStep';
import { Step, UserState, Package } from './types';
import { playSound } from './utils/audio';

// Assets
const TIKTOK_ICON = <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 1 7.66V2.2h3.45a8.41 8.41 0 0 0 4.78 4.49z"/></svg>;

// URL da imagem fornecida
const LOGO_URL = "https://applig.site/wp-content/uploads/2025/12/lolo.png";

// --- Shared Components ---

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden relative selection:bg-tiktok-pink selection:text-white">
    {/* Ambient Background Glows */}
    <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-tiktok-cyan/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />
    <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-tiktok-pink/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2 z-0" />

    {/* Header */}
    <header className="p-6 flex justify-between items-center z-10 relative border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0">
      <div className="flex items-center gap-3">
        {/* Logo LOLO no lugar do Cadeado */}
        <div className="w-10 h-10 flex items-center justify-center">
          <img 
            src={LOGO_URL} 
            alt="JVL Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,242,234,0.6)]"
          />
        </div>
        <div className="font-bold text-xl tracking-tight flex items-center gap-1">
          <span className="text-white">JVL</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-tiktok-cyan to-tiktok-pink">TikTok Shop</span>
        </div>
      </div>
      <div className="text-tiktok-cyan animate-pulse">
        {TIKTOK_ICON}
      </div>
    </header>

    {/* Main Content */}
    <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 max-w-md mx-auto w-full">
      {children}
    </main>

    {/* Footer */}
    <footer className="py-8 px-6 border-t border-white/5 bg-[#080808] z-10 mt-auto w-full">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10 backdrop-blur-sm">
          <div className="flex justify-center items-center gap-2 mb-2 text-green-400">
            <ShieldCheck size={20} />
            <span className="font-bold uppercase text-xs tracking-wider">Operação verificada e segura</span>
          </div>
          <p className="text-xs text-gray-500">Pagamentos criptografados • Entrega garantida em minutos • Processamento automático</p>
        </div>
        
        <div className="text-xs text-gray-500 space-y-2">
          <p>© 2026 JVL Company™ — Plataforma 100% segura e validada.</p>
          <div className="flex justify-center gap-4 text-gray-400">
            <span>Termos</span>
            <span>Privacidade</span>
            <span>Como funciona</span>
            <span>Suporte</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/5 text-xs text-gray-600">
          <p>📧 atendimento@jvlcompany.com.br</p>
          <p className="mt-1">📱 WhatsApp: (88) 99634-9597</p>
        </div>
      </div>
    </footer>
  </div>
);

const Popup: React.FC<{ title: string; message: string; onClose: () => void; autoClose?: boolean }> = ({ title, message, onClose, autoClose }) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Fecha automaticamente após 2 segundos
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1a1a1a] border border-tiktok-cyan/50 p-6 rounded-2xl max-w-xs w-full text-center shadow-[0_0_30px_rgba(0,242,234,0.2)] transform scale-100 animate-bounce-in">
        <div className="w-16 h-16 bg-gradient-to-tr from-tiktok-cyan to-tiktok-pink rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle2 className="text-white w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        {/* Renderiza o botão apenas se NÃO for autoClose */}
        {!autoClose && <Button onClick={onClose} fullWidth>CONTINUAR</Button>}
      </div>
    </div>
  );
};

// --- Upsell Popup Component (Premium) ---

const UpsellPopup: React.FC<{ onAccept: () => void; onDecline: () => void }> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-[32px] overflow-hidden bg-[#0a0a0a] border-2 border-purple-500/30 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] animate-bounce-in flex flex-col">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-32 bg-purple-600/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-green-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 p-6 flex flex-col items-center text-center">
          
          {/* Título Principal */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">Oferta Especial!</h2>
            <p className="text-purple-300 font-medium text-sm">Apenas para você, agora!</p>
          </div>

          {/* Preço com Destaque */}
          <div className="mb-6 flex flex-col items-center">
             <span className="text-gray-500 text-lg font-bold line-through decoration-2 decoration-gray-600">
                R$170,00
             </span>
             <div className="relative">
                <span className="text-5xl font-black text-[#00FFA7] drop-shadow-[0_0_15px_rgba(0,255,167,0.6)] tracking-tighter">
                   R$67,90
                </span>
                <div className="absolute -top-4 -right-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full transform rotate-12 shadow-lg">
                   60% OFF
                </div>
             </div>
          </div>

          {/* Bloco do Pacote Especial */}
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
             <h3 className="text-white font-bold text-lg mb-4 border-b border-white/10 pb-2">
                Pacote Premium – 1.700 seguidores
             </h3>
             <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3 text-sm text-gray-200">
                   <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-400">
                      <CheckCircle2 size={14} />
                   </div>
                   1.700 seguidores para metas
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                   <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
                      <Eye size={14} />
                   </div>
                   + 15.000 visualizações incluídas
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                   <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400">
                      <ThumbsUp size={14} />
                   </div>
                   + 5.000 curtidas incluídas
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                   <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-400">
                      <Truck size={14} />
                   </div>
                   Entrega imediata
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                   <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0 text-gray-300">
                      <ShieldCheck size={14} />
                   </div>
                   Garantia de 60 dias
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                   <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 text-pink-400">
                      <ShoppingBag size={14} />
                   </div>
                   Libere o TikTok Shop agora
                </li>
             </ul>
          </div>

          {/* Aviso de Urgência */}
          <p className="text-yellow-400 text-xs text-center mb-5 font-medium bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/20">
             ⚠ Oferta disponível somente nesta tela. Se você sair, não aparece de novo.
          </p>

          {/* Botões */}
          <div className="w-full space-y-3">
             <button 
                onClick={onAccept}
                className="w-full py-4 bg-[#00FFA7] hover:bg-[#00e696] text-black font-black text-sm uppercase rounded-xl shadow-[0_0_25px_rgba(0,255,167,0.4)] transition-transform active:scale-95 flex items-center justify-center gap-2 group"
             >
                <Sparkles size={18} className="animate-pulse" />
                Sim! Quero desbloquear esse super desconto!
             </button>

             <button 
                onClick={onDecline}
                className="w-full py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-gray-400 font-medium text-xs rounded-xl transition-colors"
             >
                Não, prefiro continuar com o pacote menor
             </button>
          </div>

          {/* Rodapé */}
          <div className="mt-4 pt-4 border-t border-white/5 w-full">
             <p className="text-[10px] text-gray-600">547 pessoas aproveitaram esta oferta hoje.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const VturbPlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  useEffect(() => {
    const scriptUrl = `https://scripts.converteai.net/e9498e2f-7073-43d3-8b8a-8112140f3e45/players/${videoId}/v4/player.js`;
    
    // Verifica se o script já existe para evitar duplicação
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [videoId]);

  const VturbSmartplayer = 'vturb-smartplayer' as any;

  return (
    <div className="w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,242,234,0.15)] border border-white/10 bg-black">
      <VturbSmartplayer
        id={`vid-${videoId}`}
        style={{ display: 'block', margin: '0 auto', width: '100%' }}
      ></VturbSmartplayer>
    </div>
  );
};

const HomeStep: React.FC<{ user: UserState; setUser: (u: UserState) => void; onNext: () => void }> = ({ user, setUser, onNext }) => (
  <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
    <div className="relative w-40 h-64 md:w-48 md:h-80 bg-gray-900 rounded-[2rem] border-4 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden animate-float">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-90"></div>
      <div className="z-10 flex flex-col items-center gap-4">
        {/* Logo LOLO dentro do celular */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center drop-shadow-[0_0_15px_rgba(0,242,234,0.4)] bg-black/40 border border-white/10 p-2">
           <img 
            src={LOGO_URL} 
            alt="JVL" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex gap-2 text-white/50">
          <Heart size={20} className="text-tiktok-pink animate-pulse" />
          <MessageCircle size={20} />
          <Share2 size={20} className="text-tiktok-cyan" />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h1 className="text-3xl md:text-4xl font-black leading-tight">
        Vamos acelerar o crescimento do seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-tiktok-cyan to-tiktok-pink">TikTok</span>?
      </h1>
      <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">
        Em poucos passos, vamos identificar seu perfil, liberar funções essenciais e preparar seu TikTok para alcançar mais pessoas.
      </p>
    </div>

    <div className="w-full max-w-sm space-y-4">
      <div className="text-left">
        <label className="text-xs font-bold text-tiktok-cyan ml-1 uppercase tracking-wider">Antes de começar</label>
        <input 
          type="text" 
          placeholder="Como devo te chamar?"
          className="w-full mt-2 bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-tiktok-pink focus:shadow-[0_0_15px_rgba(255,0,80,0.3)] transition-all"
          value={user.name}
          onChange={(e) => setUser({...user, name: e.target.value})}
        />
      </div>
      <Button 
        fullWidth 
        onClick={onNext}
        disabled={!user.name.trim()}
      >
        CONTINUAR
      </Button>
    </div>
    
    <p className="text-[10px] text-gray-600">© 2026 JVL Company™ — Sistema oficial verificado.</p>
  </div>
);

const ConnectingStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => onNext(), 3000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
      <div className="w-64 h-64 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center relative shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-tiktok-cyan/10 to-tiktok-pink/10 rounded-3xl animate-pulse"></div>
        
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-tiktok-cyan border-r-tiktok-pink border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        
        <p className="text-lg font-bold animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-tiktok-cyan to-white">Conectando ao sistema JVL...</p>
      </div>
    </div>
  );
};

const SocialProofStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const videos = [
    "69321308c5a3364c78128963", // Vídeo 1
    "6932130eafcc411b3a71a671", // Vídeo 2
    "693217862c6468ef650595f0"  // Vídeo 3
  ];

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
       // Ativa o botão após rolar 50px
       if (window.scrollY > 50) {
         setShowButton(true);
       } else {
         setShowButton(false);
       }
    };

    window.addEventListener('scroll', handleScroll);
    // Verificar estado inicial
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextClick = () => {
    playSound('CLICK', 0.4);
    onNext();
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-fade-in w-full pb-32">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-tiktok-pink to-tiktok-cyan">
          Resultados Reais • Pessoas Reais
        </h2>
        <p className="text-white/90 text-lg font-medium drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
          Assista como funciona na prática
        </p>
      </div>

      {/* Seção de Vídeos Verticais */}
      <div className="w-full flex flex-col items-center gap-8">
        {videos.map((id) => (
          <VturbPlayer key={id} videoId={id} />
        ))}
      </div>

      {/* Botão Flutuante Fixo - Oculto inicialmente, aparece no scroll */}
      <div 
        className={`fixed bottom-4 left-0 right-0 z-50 flex justify-center transition-all duration-700 transform ${
          showButton ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={handleNextClick}
          className="w-[90%] max-w-md bg-gradient-to-r from-tiktok-pink to-tiktok-cyan text-white font-bold text-lg py-4 rounded-full shadow-[0_0_25px_rgba(255,0,80,0.4)] animate-breathing border border-white/20 backdrop-blur-md active:scale-95 transition-transform"
        >
          AVANÇAR PARA OS RESULTADOS
        </button>
      </div>
    </div>
  );
};

const SimulateSelectStep: React.FC<{ user: UserState; setUser: (u: UserState) => void; onNext: () => void }> = ({ user, setUser, onNext }) => (
  <div className="w-full space-y-8 animate-fade-in text-center">
    <h2 className="text-3xl font-black text-white">Quantos seguidores você deseja hoje?</h2>
    
    <div className="grid grid-cols-1 gap-4">
      {[1000, 2000, 5000, 10000].map((num) => (
        <button
          key={num}
          onClick={() => setUser({...user, selectedFollowers: num})}
          className={`p-6 rounded-xl border font-bold text-xl transition-all duration-300
            ${user.selectedFollowers === num 
              ? 'bg-tiktok-cyan/20 border-tiktok-cyan text-white shadow-[0_0_20px_rgba(0,242,234,0.3)] scale-105' 
              : 'bg-white/5 border-white/10 hover:border-tiktok-cyan/50'
            }`}
        >
          {num === 1000 ? '1 MIL' : num === 10000 ? '10 MIL' : `${num / 1000} MIL`} SEGUIDORES
        </button>
      ))}
    </div>

    <Button 
      fullWidth 
      onClick={onNext}
      disabled={user.selectedFollowers === 0}
    >
      INICIAR MEU CRESCIMENTO
    </Button>
  </div>
);

const SimulationRunStep: React.FC<{ user: UserState; onNext: () => void }> = ({ user, onNext }) => {
  const [currentFollowers, setCurrentFollowers] = useState(0);
  
  useEffect(() => {
    // Iniciar som de contagem (loop)
    const audio = playSound('SPIN', 0.3, true); 

    const duration = 2500; // 2.5 seconds
    const steps = 60;
    const increment = user.selectedFollowers / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= user.selectedFollowers) {
        current = user.selectedFollowers;
        clearInterval(timer);
        if (audio) audio.pause(); // Parar som
      }
      setCurrentFollowers(Math.floor(current));
    }, duration / steps);

    return () => {
      clearInterval(timer);
      if (audio) audio.pause();
    };
  }, [user.selectedFollowers]);

  return (
    <div className="w-full flex flex-col items-center space-y-8 animate-fade-in">
      {/* TikTok Profile Simulation */}
      <div className="w-full bg-black border border-white/10 rounded-2xl overflow-hidden max-w-sm relative">
        <div className="h-24 bg-gray-800 w-full relative">
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-300 rounded-full border-4 border-black z-10"></div>
        </div>
        <div className="pt-10 pb-6 px-4 text-center space-y-4">
          <div className="space-y-1">
              <div className="h-4 w-32 bg-gray-800 mx-auto rounded"></div>
              <div className="h-3 w-20 bg-gray-900 mx-auto rounded"></div>
          </div>
          
          <div className="flex justify-center gap-8 py-2 border-y border-white/10">
              <div className="text-center">
                <div className="font-bold text-lg text-white">12</div>
                <div className="text-xs text-gray-500">Seguindo</div>
              </div>
              <div className="text-center scale-110">
                <div className="font-bold text-xl text-tiktok-cyan drop-shadow-[0_0_10px_rgba(0,242,234,0.8)]">
                  {currentFollowers.toLocaleString()}
                </div>
                <div className="text-xs text-white">Seguidores</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-white">0</div>
                <div className="text-xs text-gray-500">Curtidas</div>
              </div>
          </div>

          {/* Blurred Grid */}
          <div className="grid grid-cols-3 gap-1 opacity-50 blur-[2px]">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-[3/4] bg-gray-800 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>

      {currentFollowers >= user.selectedFollowers && (
        <Button fullWidth onClick={onNext} className="animate-bounce-in">
          VER PACOTES OFICIAIS COM MEU DESCONTO
        </Button>
      )}
    </div>
  );
};

const RouletteStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [spinning, setSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [modal, setModal] = useState<'LOSS' | 'WIN' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    
    // Iniciar som de rotação (loop)
    audioRef.current = playSound('SPIN', 0.4, true);

    // Determine outcome
    const isWin = spinCount === 1; // 0 = first spin (loss), 1 = second spin (win)
    
    // Visual rotation
    const extraSpins = 360 * 6;
    const targetAngle = isWin ? 240 : 0; // Win lands on Double, Loss lands on Ah nao
    const randomOffset = Math.floor(Math.random() * 40) - 20; 
    
    const totalRotation = rotation + extraSpins + targetAngle + randomOffset;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setSpinCount(prev => prev + 1);
      
      // Parar som de rotação
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      if (isWin) {
        playSound('WIN', 0.5);
        setModal('WIN');
      } else {
        playSound('LOSS', 0.5);
        setModal('LOSS');
      }
    }, 5000); // 5s spin
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in w-full overflow-hidden">
      {/* Pointer */}
      <div className="absolute top-[20%] z-20 w-0 h-0 border-l-[15px] border-l-transparent border-t-[30px] border-t-white border-r-[15px] border-r-transparent drop-shadow-lg"></div>

      {/* Wheel Container */}
      <div 
        className="relative w-72 h-72 md:w-80 md:h-80 rounded-full border-4 border-gray-800 shadow-[0_0_50px_rgba(255,0,80,0.2)] overflow-hidden transition-transform duration-[5000ms] cubic-bezier(0.25, 0.1, 0.25, 1)"
        style={{ transform: `rotate(-${rotation}deg)` }}
      >
          {/* Segments (Simulated visually with gradient/conic for simplicity in code) */}
          <div className="w-full h-full rounded-full bg-[conic-gradient(#1a1a1a_0deg_60deg,#333_60deg_120deg,#1a1a1a_120deg_180deg,#333_180deg_240deg,#FF0050_240deg_300deg,#333_300deg_360deg)] relative">
            {/* Text Labels - absolute positioning based on angle */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center -rotate-0 origin-bottom h-28 w-4 flex flex-col justify-start"><span className="text-xs font-bold text-gray-400 whitespace-nowrap -ml-4">Ah não...😢</span></div>
            <div className="absolute top-[25%] right-[10%] rotate-[60deg] origin-center text-xs font-bold text-gray-300"> +1000</div>
            <div className="absolute bottom-[25%] right-[10%] rotate-[120deg] origin-center text-xs font-bold text-gray-300"> +2000</div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rotate-[180deg] origin-center text-xs font-bold text-gray-300"> +5000</div>
            <div className="absolute bottom-[25%] left-[10%] rotate-[240deg] origin-center text-xs font-bold text-white drop-shadow-md">EM DOBRO!</div>
            <div className="absolute top-[25%] left-[10%] rotate-[300deg] origin-center text-xs font-bold text-gray-300">BÔNUS</div>
          </div>
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 rounded-full border-2 border-tiktok-cyan flex items-center justify-center text-white font-bold shadow-lg z-10">
            JVL
          </div>
      </div>

      <Button 
        onClick={handleSpin} 
        disabled={spinning} 
        className="w-full max-w-xs z-10"
      >
        {spinning ? 'GIRANDO...' : spinCount === 0 ? 'GIRAR ROLETA' : 'TENTAR NOVAMENTE'}
      </Button>

      {modal === 'LOSS' && (
        <Popup 
          title="Ah não... 😢" 
          message="Você perdeu a chance... Mas como somos legais, vamos te dar mais uma tentativa!" 
          onClose={() => setModal(null)} 
        />
      )}

      {modal === 'WIN' && (
        <Popup 
          title="PARABÉNS! 🎉" 
          message="Você desbloqueou TUDO EM DOBRO nos pacotes!" 
          onClose={() => {
            setModal(null);
            onNext();
          }} 
        />
      )}
    </div>
  );
};

// --- New Components for Offers Step ---

const RotatingBadge: React.FC = () => {
  const [index, setIndex] = useState(0);
  const messages = [
    "70% DE DESCONTO ATIVADO",
    "APENAS HOJE: PAGA MENOS",
    "TUDO EM DOBRO DESBLOQUEADO"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-center mb-3">
      <div className="relative overflow-hidden bg-gradient-to-r from-tiktok-green to-[#00D46E] py-1 px-4 rounded-full shadow-[0_0_15px_rgba(0,255,167,0.4)] border border-tiktok-green/30">
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        <p key={index} className="relative z-10 text-[10px] font-black text-black tracking-widest uppercase animate-slide-up whitespace-nowrap">
          {messages[index]}
        </p>
      </div>
    </div>
  );
};

const SocialNotifications: React.FC = () => {
  const [notification, setNotification] = useState<{ name: string; action: string } | null>(null);
  
  const messages = [
    { name: "Ana", action: "liberou o TikTok Shop agora mesmo 📈" },
    { name: "João", action: "acabou de comprar 5.000 seguidores 🔥" },
    { name: "Maria", action: "recebeu +500 curtidas bônus ✨" },
    { name: "Carlos", action: "ativou o pacote de 1.000 seguidores ⚡" },
    { name: "Ricardo", action: "está viralizando… +10.000 visualizações 🎉" },
    { name: "Sofia", action: "comprou o pacote Mais Pedido 💎" }
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setNotification(randomMsg);
      
      // Hide after 3.5s
      setTimeout(() => setNotification(null), 3500);
    };

    // Initial delay
    const initialTimer = setTimeout(showNotification, 2000);
    
    // Loop
    const loopTimer = setInterval(showNotification, 6000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopTimer);
    };
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none animate-slide-up">
      <div className="bg-black/80 border border-tiktok-cyan/30 backdrop-blur-md rounded-full py-2 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-tiktok-cyan to-tiktok-pink flex items-center justify-center text-[10px] font-bold text-white">
          {notification.name[0]}
        </div>
        <p className="text-xs text-white/90">
          <span className="font-bold text-tiktok-cyan">{notification.name}</span> {notification.action}
        </p>
      </div>
    </div>
  );
};

// Recebe a função onSelectPackage para comunicar ao pai qual pacote foi clicado
const OffersStep: React.FC<{ onSelectPackage: (pkg: Package) => void }> = ({ onSelectPackage }) => {
  useEffect(() => {
    // Tocar som de woosh ao entrar na tela de ofertas
    playSound('WHOOSH', 0.3);
  }, []);

  const packages: Package[] = [
    {
      name: "POPULAR",
      followers: "1.000",
      price: "47,90",
      features: ["Entrega imediata", "Ideal para liberar link na bio", "Aumenta autoridade instantânea"],
      bonuses: ["500 curtidas", "5.000 visualizações"]
    },
    {
      name: "PROFISSIONAL",
      followers: "2.000",
      price: "97,90",
      features: ["Entrega em minutos", "Ajuda a liberar TikTok Shop", "Crescimento rápido"],
      bonuses: ["1.000 curtidas", "10.000 visualizações"]
    },
    {
      name: "AVANÇADO",
      followers: "5.000",
      price: "287,90",
      features: ["Forte autoridade", "Perfeito para viralizar", "Suporte prioritário"],
      bonuses: ["2.500 curtidas", "30.000 visualizações"],
      highlight: true // Agora o de 5k é o destaque dourado
    },
    {
      name: "MÁXIMO",
      followers: "10.000",
      price: "487,90",
      features: ["Libera monetização", "Autoridade de influenciador", "Gerente de conta"],
      bonuses: ["5.000 curtidas", "60.000 visualizações"]
    }
  ];

  const handlePurchase = (pkg: Package) => {
    // Som positivo de clique
    playSound('CLICK', 0.4);
    onSelectPackage(pkg);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in relative pb-10">
      <SocialNotifications />
      
      <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2">OFERTAS EXCLUSIVAS</h2>
          <div className="inline-block bg-tiktok-pink/20 border border-tiktok-pink/50 rounded-full px-3 py-1">
             <p className="text-tiktok-pink text-xs font-bold animate-pulse flex items-center gap-1">
                <Zap size={12} fill="currentColor" /> Desconto de 70% Aplicado
             </p>
          </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {packages.map((pkg, idx) => (
          <div 
            key={idx} 
            className={`relative rounded-3xl p-6 border transition-all duration-300 group
              ${pkg.highlight 
                ? 'bg-gradient-to-b from-[#1a1a1a] to-black border-tiktok-gold shadow-[0_0_30px_rgba(255,215,0,0.15)] scale-[1.02] z-10' 
                : 'bg-black border-white/10 hover:border-tiktok-cyan/30'
              }`}
          >
            {/* Background Effects */}
            {pkg.highlight && (
               <div className="absolute inset-0 bg-tiktok-gold/5 rounded-3xl animate-pulse-slow pointer-events-none"></div>
            )}
            
            {/* 5k Gold Badge */}
            {pkg.highlight && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-full flex justify-center z-20">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black text-xs px-6 py-2 rounded-lg shadow-[0_5px_15px_rgba(255,215,0,0.4)] border border-yellow-300 flex items-center gap-1 transform rotate-1">
                   <Star size={12} fill="currentColor" /> MAIS PEDIDO <Star size={12} fill="currentColor" />
                </div>
              </div>
            )}

            {/* Rotating Green Bar */}
            <RotatingBadge />

            {/* Header: Name & Followers */}
            <div className="text-center mb-6 relative">
               <h3 className="font-bold text-gray-500 text-xs tracking-[0.2em] uppercase mb-1">{pkg.name}</h3>
               <div className="flex items-center justify-center gap-1">
                 <span className="text-5xl font-black text-white drop-shadow-md">{pkg.followers}</span>
               </div>
               <p className="text-sm text-gray-400">Seguidores Reais</p>
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-center gap-4 mb-8 bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">De:</span>
                    <span className="text-tiktok-red line-through decoration-2 decoration-tiktok-red/80 -rotate-3 text-lg font-bold opacity-70">
                        R${parseInt(pkg.price) * 3}
                    </span>
                </div>
                <div className="w-[1px] h-8 bg-white/10"></div>
                <div className="flex flex-col items-start">
                    <span className="text-[10px] text-tiktok-green uppercase font-bold">Por:</span>
                    <span className="text-4xl font-black text-tiktok-green drop-shadow-[0_0_10px_rgba(0,255,167,0.4)]">
                        R${pkg.price}
                    </span>
                </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8 pl-2">
              {pkg.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-tiktok-cyan/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-tiktok-cyan" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* 3D Bonus Box */}
            <div className="relative mb-6 transform transition-transform group-hover:translate-y-1">
               <div className="absolute inset-0 bg-tiktok-pink/20 blur-md rounded-xl"></div>
               <div className="relative bg-gradient-to-r from-tiktok-pink/10 to-transparent border border-tiktok-pink/30 rounded-xl p-4 overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="bg-tiktok-pink text-white p-1 rounded">
                        <Sparkles size={12} fill="currentColor" />
                     </div>
                     <span className="text-xs font-black text-white uppercase tracking-wider">BÔNUS GRÁTIS SÓ HOJE</span>
                  </div>
                  <div className="space-y-1">
                    {pkg.bonuses.map((bonus, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                            <div className="w-1.5 h-1.5 bg-tiktok-pink rounded-full shadow-[0_0_5px_#FF0050]"></div>
                            {bonus}
                        </div>
                    ))}
                  </div>
                  {/* Decorative particles */}
                  <div className="absolute bottom-0 right-0 opacity-10">
                     <Heart size={40} fill="currentColor" />
                  </div>
               </div>
            </div>

            {/* Call to Action Button */}
            <Button 
              fullWidth 
              onClick={() => handlePurchase(pkg)}
              className="bg-gradient-to-r from-tiktok-cyan to-tiktok-pink border-none text-white shadow-[0_0_20px_rgba(0,242,234,0.3)] hover:shadow-[0_0_30px_rgba(255,0,80,0.5)] relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wide">
                 <Zap size={18} fill="currentColor" className="text-yellow-300" />
                 FINALIZAR COMPRA COM DESCONTO
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            </Button>
            
            <div className="text-center mt-3">
               <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500">
                  <ShieldCheck size={10} /> Compra 100% Segura e Anônima
               </div>
            </div>

          </div>
        ))}
      </div>
      
      {/* Spacer for bottom notifications */}
      <div className="h-16"></div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5588996349597" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-[100] w-16 h-16 bg-[#25D366] rounded-[14px] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 active:scale-95 group"
        style={{ boxShadow: '0 0 15px rgba(37, 211, 102, 0.6)' }}
        aria-label="Fale conosco no WhatsApp"
      >
         <div className="absolute inset-0 rounded-[14px] bg-[#25D366] blur-md opacity-40 animate-pulse"></div>
         <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 md:w-9 md:h-9 relative z-10">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
         </svg>
      </a>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('HOME');
  const [user, setUser] = useState<UserState>({ name: '', discount: 0, selectedFollowers: 0 });
  const [showPopup, setShowPopup] = useState<{ title: string; message: string; nextStep?: Step; autoClose?: boolean } | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Handlers
  const handleNext = (next: Step) => setStep(next);
  
  const closePopup = () => {
    if (showPopup?.nextStep) {
      handleNext(showPopup.nextStep);
    }
    setShowPopup(null);
  };

  const handleQuizSelection = (discountAdd: number, nextStep: Step, popupTitle: string, popupMsg: string) => {
    setUser(prev => ({ ...prev, discount: prev.discount + discountAdd }));
    setShowPopup({
      title: popupTitle,
      message: popupMsg,
      nextStep: nextStep,
      autoClose: true // Ativa o fechamento automático e remove o botão para os quizzes
    });
  };

  const handlePackageSelection = (pkg: Package) => {
    if (pkg.price === "47,90") {
      // Se for o pacote de 47 reais, mostra o upsell
      setShowUpsell(true);
      playSound('POP', 0.5);
    } else {
      // Lógica normal de checkout (aqui apenas simula som de compra)
      playSound('PURCHASE', 0.6);
      // alert(`Redirecionando para checkout do pacote: ${pkg.name}`);
    }
  };

  const handleUpsellAccept = () => {
    playSound('PURCHASE', 0.7);
    setShowUpsell(false);
    // Lógica para levar ao checkout do pacote de 67,90
    // alert("Redirecionando para checkout: PACOTE UPSELL (R$67,90)");
  };

  const handleUpsellDecline = () => {
    setShowUpsell(false);
    // Lógica para levar ao checkout do pacote original de 47,00
    // alert("Redirecionando para checkout: PACOTE ORIGINAL (R$47,00)");
  };

  return (
    <Layout>
      {showPopup && (
        <Popup 
          title={showPopup.title} 
          message={showPopup.message} 
          onClose={closePopup}
          autoClose={showPopup.autoClose}
        />
      )}

      {showUpsell && (
        <UpsellPopup 
          onAccept={handleUpsellAccept}
          onDecline={handleUpsellDecline}
        />
      )}

      {step === 'HOME' && <HomeStep user={user} setUser={setUser} onNext={() => handleNext('CONNECTING')} />}
      
      {step === 'CONNECTING' && <ConnectingStep onNext={() => handleNext('QUIZ_1')} />}
      
      {step === 'QUIZ_1' && (
        <QuizStep 
          discount={0}
          userName={user.name}
          question="Qual é o seu objetivo principal?"
          options={['Liberar link na bio', 'Ativar TikTok Shop', 'Monetizar em dólar', 'Autoridade e Crescimento']}
          onSelect={() => handleQuizSelection(10, 'QUIZ_2', 'Excelente!', 'Você desbloqueou +10% de desconto extra.')}
        />
      )}
      
      {step === 'QUIZ_2' && (
        <QuizStep 
          discount={10}
          question="Em que nível o seu perfil está hoje?"
          options={['Estou começando agora', 'Menos de 1.000 seguidores', 'Entre 1.000 e 5.000', 'Acima de 5.000']}
          onSelect={() => handleQuizSelection(15, 'QUIZ_3', 'Excelente!', 'Mais 15% de desconto adicionado.')}
        />
      )}
      
      {step === 'QUIZ_3' && (
        <QuizStep 
          discount={25}
          question="O que você mais posta no TikTok?"
          options={['Conteúdo próprio', 'Produtos / Vendas', 'Trends / Cortes', 'Ainda não comecei']}
          onSelect={() => handleQuizSelection(20, 'QUIZ_4', 'Quase lá!', 'Você garantiu +20% de desconto.')}
        />
      )}
      
      {step === 'QUIZ_4' && (
        <QuizStep 
          discount={45}
          question="Qual é seu foco principal agora?"
          options={['Crescer seguidores rápido', 'Aumentar alcance', 'Dar autoridade ao perfil', 'Preparar para monetizar']}
          onSelect={() => handleQuizSelection(25, 'SOCIAL_PROOF', 'Parabéns!', 'Você alcançou 70% de desconto no seu plano JVL!')}
        />
      )}
      
      {step === 'SOCIAL_PROOF' && <SocialProofStep onNext={() => handleNext('SIMULATE_SELECT')} />}
      
      {step === 'SIMULATE_SELECT' && <SimulateSelectStep user={user} setUser={setUser} onNext={() => handleNext('SIMULATION_RUN')} />}
      
      {step === 'SIMULATION_RUN' && <SimulationRunStep user={user} onNext={() => handleNext('ROULETTE')} />}
      
      {step === 'ROULETTE' && <RouletteStep onNext={() => handleNext('OFFERS')} />}
      
      {step === 'OFFERS' && <OffersStep onSelectPackage={handlePackageSelection} />}
    </Layout>
  );
};

export default App;