export const SOUNDS = {
  CLICK: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Som de clique tecnológico
  POP: 'https://applig.site/wp-content/uploads/2025/05/success-1-6297.mp3', // Pop positivo curto (Atualizado para som de sucesso)
  WHOOSH: 'https://applig.site/wp-content/uploads/2025/05/success-1-6297.mp3', // Som de entrada na oferta (Atualizado)
  SPIN: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3', // Tic-tac rápido (usado para roleta e contagem)
  WIN: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3', // Carrilhão de vitória
  LOSS: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3', // Som de falha leve
  PURCHASE: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3', // Confirmação positiva
};

export const playSound = (key: keyof typeof SOUNDS, volume = 0.5, loop = false) => {
  try {
    const audio = new Audio(SOUNDS[key]);
    audio.volume = volume;
    audio.loop = loop;
    audio.play().catch((e) => console.warn('Reprodução de áudio bloqueada pelo navegador:', e));
    return audio;
  } catch (e) {
    console.error('Erro ao tocar áudio:', e);
    return null;
  }
};