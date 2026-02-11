// page da área restrita - /admin/page.tsx
// usa o PortectRoute
// somente users autenticados e logados vejam o conteúdo

"use client";
import ProtectRoute from "@/components/protectRoute/ProtectRoute";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const fazerLogout = () => {
    localStorage.removeItem("user_token");
    router.push("/login");
  };

  return (
    // ele é um wrapper --> BsEnvelopeArrowDown, envolve o componente e/ou o elemento dentro
    // do JSX

    <ProtectRoute>
      <main
        style={{
          padding: "2rem",
          backgroundColor: "#121212",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #333",
            paddingBottom: "1rem",
          }}
        >
          <h1>Painel Administrativo</h1>
          <button
            onClick={fazerLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#444",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </header>

        <section style={{ marginTop: "2rem" }}>
          <h2>Bem-vindo ao Controle das Bandas</h2>
          <p>
            Esta área é totalmente protegida. Se você está vendo isso, o token
            no LocalStorage está ativo.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                background: "#1e1e1e",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #e21d1d",
              }}
            >
              <h3>Artistas</h3>
              <p>Gerenciar lista de artistas</p>
            </div>
            <div
              style={{
                background: "#1e1e1e",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #e21d1d",
              }}
            >
              <h3>Configurações</h3>
              <p>Ajustes do sistema PopRock</p>
            </div>
          </div>
        </section>
      </main>
    </ProtectRoute>
  );
}
