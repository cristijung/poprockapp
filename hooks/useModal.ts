// hook personalizado

import { useState } from "react";

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // retornamos o estado e as fn p q  Header possa usar
    return { isOpen, openModal, closeModal };
}