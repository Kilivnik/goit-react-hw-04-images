import { useEffect } from 'react';
import s from './Modal.module.css';

export default function Modal({ closeModal, largeImageURL, imageRequest }) {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  });

  const handleCloseModal = event => {
    (event.key === 'Escape' || event.target === event.currentTarget) &&
      closeModal();
  };

  return (
    <div className={s.Overlay} onClick={handleCloseModal}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={imageRequest} />
      </div>
    </div>
  );
}
