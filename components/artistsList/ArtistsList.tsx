"use client";
import { useApi } from "@/hooks/useApi";
import { fetchArtists } from "@/services/api";
import styles from "./List.module.scss";

// 1. Interfaces específicas para os nomes de campos da AudioDB
interface Artist {
  idArtist: string;
  strArtist: string;
  strGenre: string;
}

interface AudioDBResponse {
  artists: Artist[] | null;
}

export default function ArtistList() {
  // call a API tipada com a resposta da AudioDB
  const { data, loading, error } = useApi<AudioDBResponse>(() => fetchArtists('rock'));

  if (loading) return <p className={styles.loading}>Carregando...</p>;
  if (error) return <p className={styles.error}>Erro ao carregar dados.</p>;

  // extraindo 'artists' de dentro de 'data'
  // SE 'data' for null ou 'artists' for null, usamos uma array vazia []
  const artists = data?.artists || [];

  if (artists.length === 0) {
    return <p className={styles.empty}>Nenhum artista encontrado para este termo.</p>;
  }

  return (
    <ul className={styles.list}>
      {artists.map((artist) => (
        <li key={artist.idArtist} className={styles.item}>
          {artist.strArtist} - <small>{artist.strGenre}</small>
        </li>
      ))}
    </ul>
  );
}