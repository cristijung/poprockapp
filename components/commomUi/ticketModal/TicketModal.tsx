'use client';

import styles from './TicketModal.module.scss';
import { FaTimes } from 'react-icons/fa';
import TicketForm from './TicketForm';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
    if (!isOpen) return null;

    return (
        <>
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <FaTimes />
                </button>

                <h2>Garanta seu Ingresso!</h2>

                <TicketForm />

            </div>
        </div>
        </>
    );
} 