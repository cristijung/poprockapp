"use client";
import { useApi } from "@/hooks/useApi";
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
      <ul className={styles.list}>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
