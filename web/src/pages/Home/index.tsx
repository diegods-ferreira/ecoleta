/**
 * Imports de pacotes necessários.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
/**
 * Imports de arquivos necessários.
 */
import './styles.css';
import logo from '../../assets/logo.svg';

/**
 * Componente Home escrito em forma de função.
 */
const Home = () => {
  /**
   * Retorna o HTML da página.
   */
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>
        
        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

          <Link to="/create-point">
            <span><FiLogIn /></span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}

/**
 * Exporta o componente Home.
 */
export default Home;