import Image from "next/image";
import { getArtista } from "@/services/api";
import styles from "../Artistas.module.scss";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtistaDetalhes({ params }: PageProps) {
  const { slug } = await params;

  const nomeBusca = slug.replace(/-/g, " ");
  const artista = await getArtista(nomeBusca);

  if (!artista) {
    return (
      <main className={styles.container}>
        <div className={styles.error}>
          Artista não encontrado na base de dados
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.hero}>
          {artista.strArtistThumb && (
            <div className={styles.imageWrapper}>
              <Image
                src={artista.strArtistThumb}
                alt={`Foto de ${artista.strArtist}`}
                fill
                className={styles.image}
                priority
                sizes="(max-width: 768px) 100vw, 1000px"
              />
            </div>
          )}
          <div className={styles.titleOverlay}>
            <h1>{artista.strArtist}</h1>
          </div>
        </section>

        <article className={styles.content}>
          <p className={styles.bio}>
            {artista.strBiographyPT || artista.strBiographyEN}
          </p>

          <div className={styles.metaInfo}>
            <div>
              <span>Gênero</span>
              <span>{artista.strGenre}</span>
            </div>
            <div>
              <span>Origem</span>
              <span>{artista.strCountry}</span>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
