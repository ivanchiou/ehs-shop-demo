import React from 'react'
import Layout from '@components/Layout/Layout'
import CartStep from '@components/CartStep/CartStep'
import { toCurrency, getOrderTime } from '@utils/tool'
import styles from './complete.scss'
const Complete = ({ orderDetail: { order, payment }, ...props }) => {
    return (
        <Layout disableBackBtn={true} disableCartBtn={true} hasFooter={false}>
            <CartStep currentStep={2} />
            <div className={`${styles.orderComplete}`}>
                <img src="/static/svg/icon-checked.svg" alt="訂購完成" />
                <strong>訂購完成！感謝您的購買</strong>
            </div>
            <h2 className={styles.sectionTitle}>Order Detail</h2>
            <ul className={styles.sectionBox}>
                <li className={styles.sectionContent}>
                    <div className={styles.sectionName}>訂購時間</div>
                    <div className={styles.sectionText}>{getOrderTime(order.time)}</div>
                </li>
                <li className={styles.sectionContent}>
                    <div className={styles.sectionName}>訂單編號</div>
                    <div className={styles.sectionText}>{order.id}</div>
                </li>
            </ul>
            <h2 className={styles.sectionTitle}>Payment Detail</h2>
            <ul className={styles.sectionBox}>
                <li className={styles.sectionContent}>
                    <div className={styles.sectionName}>消費金額</div>
                    <div className={styles.sectionText}>{toCurrency(payment.amount)}</div>
                </li>
                {payment.bank && (
                    <li className={styles.sectionContent}>
                        <div className={styles.sectionName}>銀行</div>
                        <div className={styles.sectionText}>{payment.bank}</div>
                    </li>
                )}
                {payment.account && (
                    <li className={styles.sectionContent}>
                        <div className={styles.sectionName}>匯款帳號</div>
                        <div className={styles.sectionText}>{payment.account}</div>
                    </li>
                )}
            </ul>
            <p className={`${styles.note} ${styles.sectionBox}`}>
                提醒您！收到商品請保留原來配送的箱子和箱外的配送單，以保障您的退貨權益。
            </p>
            <a href="/" className={styles.completeBtn}>
                繼續購物
            </a>
        </Layout>
    )
}
Complete.getInitialProps = async ({ query: { orderDetail } }) => {
    return { orderDetail }
}
export default Complete
