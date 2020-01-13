import 'isomorphic-fetch'
import React, { useState, useEffect, Fragment } from 'react'
import Layout from '@components/Layout/Layout'
import CartProductItem from '@components/CartProductItem/CartProductItem'
import CartStep from '@components/CartStep/CartStep'
import Modal from '@components/Modal/Modal'
import { toCurrency } from '@utils/tool'
import styles from './cart.scss'
const ENUM_STEP = {
    CART: 0,
    CHECKOUT: 1
}
const Cart = ({ cartList, ...props }) => {
    const { CART, CHECKOUT } = ENUM_STEP
    const totalPrice = cartList.reduce((total, currentItem) => {
        const { price, quantity } = currentItem
        return price * Number(quantity) + total
    }, 0)
    const [step, setStep] = useState(ENUM_STEP.CART)
    // Modal
    const [modalContent, setModalContent] = useState(null)
    const onClose = () => setModalContent(null)
    // Cart
    const [amount, setAmount] = useState(totalPrice)
    const [products, setProducts] = useState([...cartList])
    const handleItemChange = ({ styleInfo, totalAmount, count }) => {
        setProducts(
            products.map(prod => (styleInfo.value === prod.styleInfo.value ? { ...prod, quantity: count } : prod))
        )
        setAmount(totalAmount)
    }
    useEffect(() => {
        if (cartList.length === 0) {
            setModalContent({
                content: '購物車沒有商品',
                submitClick: () => (location.href = '/'),
                submitText: '返回首頁',
                cancelText: null,
                onClose
            })
        }
    }, [])
    return (
        <Layout
            disableCartBtn={true}
            hasFooter={false}
            handleBackClick={step === CHECKOUT ? () => setStep(ENUM_STEP.CART) : null}
        >
            <CartStep currentStep={step} />
            {/* Cart */}
            {step === CART &&
                cartList.length > 0 &&
                cartList.map(product => (
                    <CartProductItem
                        {...product}
                        amount={amount}
                        handleItemChange={handleItemChange}
                        key={product.goodId}
                    />
                ))}
            {step === CART && (
                <ul className={styles.sectionBox}>
                    <li className={styles.sectionContent}>
                        <div className={styles.sectionName}>Subtotal</div>
                        <div className={`ehsPrice ${styles.sectionText}`}>{toCurrency(amount)}</div>
                    </li>
                </ul>
            )}
            <button className={styles.checkoutBtn}>
                結帳
            </button>
            <Modal {...modalContent} />
        </Layout>
    )
}

Cart.getInitialProps = async ({ query: { cartList } }) => {
    return { cartList }
}

export default Cart
