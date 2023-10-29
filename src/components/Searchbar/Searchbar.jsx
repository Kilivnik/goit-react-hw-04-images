import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      alert('Enter search query');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <FcSearch className={s.SearchFormButtonLabel} />
        </button>

        <input
          className={s.SearchFormInput}
          value={searchQuery}
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
