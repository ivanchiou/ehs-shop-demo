import React from 'react'
import styles from './Header.scss'
const Header = ({ disableBackBtn = false, disableCartBtn = false, handleBackClick }) => {
    const handleClick = e => {
        if (handleBackClick) {
            handleBackClick()
        } else {
            window.history.back()
        }
    }
    return (
        <header className={styles.header}>
            {!disableBackBtn && <div className={styles.iconBack} onClick={handleClick} data-testid="backBtn" />}
            <h1 className={styles.logo} data-testid="logo">
                <a href="/">
                    <strong>EHS</strong>
                    <span>hop</span>
                </a>
            </h1>
            {!disableCartBtn && (
                <a href="/cart" className={`icon-shopping-cart ${styles.shoppingCart}`} data-testid="cartBtn" />
            )}
        </header>
    )
}
export default Header
