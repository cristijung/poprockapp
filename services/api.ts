import { browser } from "process";


export const fetchArtists = async (name: string = 'rock') => {
  // call para a rota interna
  const response = await fetch(`/api/music?s=${encodeURIComponent(name)}`);
  if (!response.ok) throw new Error('Erro ao carregar artistas');
  return response.json();
};

// p não dar problema com o CORS e a API bloquear o browser
// - CORS: Ele evita o erro de bloqueio do navegador porque chama /api/music em vez de theaudiodb.com diretamente.
// - Encode: O encodeURIComponent(name) garante que nomes com espaços (ex: "The Beatles") não quebrem a URL.
// é gambiarra, né