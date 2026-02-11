"use client";
import { useApi } from "@/hooks/useApi";
import Link from "next/link";
import { fetchUsers } from "@/services/api";
import styles from "./List.module.scss";

interface User {
  id: number;
  name: string;
}

export default function ArtistList() {
  // passando a fn fetchUsers como argumento
  const { data: users, loading, error } = useApi<User[]>(fetchUsers);

  if (loading) return <p className={styles.loading}>Carregando ...</p>;
  if (error) return <p className={styles.error}>{error.message}</p>;

  return (
    <>
      <nav className={styles.container}>
        <ul className={styles.list}>
          {users?.map((user) => {
            //criação do slug amigável - ex: "Ana Banana -> ana-banana"
            const slug = user.name.toLowerCase().replace(/ /g, "-");

            return (
              <li key={user.id} className={styles.item}>
                <Link href={`/artistas/${slug}`} className={styles.item}>
                  {user.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
