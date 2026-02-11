'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectRouteProps {
    children: React.ReactNode;
}

type AuthStatus = 'loading' | 'authorized' | 'unauthorized';

export default function ProtectRoute( { children }: ProtectRouteProps) {
    const router = useRouter();
    const [status, setStatus] = useState<AuthStatus>("loading");

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("user_token");

            if (!token) {
                setStatus("unauthorized");
                router.replace('/login');
            } else {
                setStatus('authorized');
            }
        };

        // recurso para evitar o erro de renderização em cascata 
        // é um erro q pode ocorrer no React 19
        const frameId = requestAnimationFrame(checkAuth); // rAF
        return () => cancelAnimationFrame(frameId);
    }, [router]);

    // enquanto verifica o status, nada é renderizado p evitar a cascata
    // e renderizar o conteúdo privado
    if (status ! == 'authorized') {
        return null;
    }

    return <>{children}</>;
}