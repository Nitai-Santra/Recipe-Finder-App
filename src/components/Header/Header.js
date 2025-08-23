import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          🍳 Recipe Finder
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/favorites" className={styles.navLink}>
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;