import React, { useState } from 'react';
import './Header.css';
import smallRight from '../../assets/icons/small-right.png';
import smallLeft from '../../assets/icons/small-left.png';
import search from '../../assets/icons/search.png';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPlaylistResultHidden, setIsPlaylistResultHidden] = useState(true);
  const [isArtistResultHidden, setIsArtistResultHidden] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setIsPlaylistResultHidden(true);
      setIsArtistResultHidden(false);
      return;
    }

    // Replace this with your actual API request logic
    fetch(`http://localhost:3010/artists?search=${value}`)
      .then(response => response.json())
      .then(data => {
        displayResults(data); // Assuming 'data' is an array of results
      })
      .catch(error => {
        console.error('Error in API request:', error);
      });
  };

  const displayResults = (result) => {
    setIsPlaylistResultHidden(true);

    // Assumindo que 'result' é um array de objetos com propriedades 'name' e 'urlImg'
    const { name, urlImg } = result[0];

    // Atualizando os estados do React
    setSearchResults(result);
    setIsArtistResultHidden(false);
  };

  return (
    <nav className="header__navigation">
      <div className="navigation">
        <button className="arrow-left">
          <img src={smallLeft} alt="Seta esquerda" />
        </button>
        <button className="arrow-right">
          <img src={smallRight} alt="Seta direita" />
        </button>
      </div>
      <div className="header__search">
        <img src={search} alt="Buscar"/>
        <input
          id="search-input"
          maxLength="800"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="O que você quer ouvir?"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className="header__login">
        <button className="subscribe">Inscreva-se</button>
        <button className="login">Entrar</button>
      </div>
    </nav>
  );
};

export default Header;
