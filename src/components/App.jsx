import { useState, useEffect } from 'react';
import s from '../components/App.module.css';

import Searchbar from '../../src/components/Searchbar/Searchbar';
import ImageGallery from '../../src/components/ImageGallery/ImageGallery';
import Button from '../../src/components/Button/Button';
import Modal from '../components/Modal/Modal';
import Loader from './Loader/Loader';

import { fetchImages } from '../services/api';

export default function App() {
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageRequest, setImageRequest] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, [hits]);

  useEffect(() => {
    if (searchQuery.trim() === '') return;
    const getImages = async () => {
      try {
        setIsLoading(true);
        const totalHits = await fetchImages(searchQuery, page);
        if (totalHits.length === 0) {
          setError(error);
          return;
        }
        setHits(prev => [...prev, ...totalHits.hits]);
        setTotalHits(...totalHits);
        setTotalHits(totalHits.length >= 12);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [searchQuery, page]);

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setHits([]);
    setImageRequest(imageRequest);
  };

  const toggleModal = largeImageURL => {
    setIsShowModal(!isShowModal);
    setLargeImageURL(largeImageURL);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery hits={hits} openModal={toggleModal} />
      {isLoading && <Loader />}
      {Boolean(hits.length) && !isLoading && hits.length !== totalHits && (
        <Button
          changePage={() => {
            setPage(page + 1);
          }}
        />
      )}
      {isShowModal && (
        <Modal
          largeImageURL={largeImageURL}
          alt={imageRequest}
          closeModal={toggleModal}
        />
      )}
    </div>
  );
}
