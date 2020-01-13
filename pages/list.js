import React, { useState } from 'react'
import 'isomorphic-fetch'
import Layout from '@components/Layout/Layout'
import Swiper from 'react-id-swiper'
import ProductList from '@components/ProductList/ProductList'
import Image from '@components/Image/Image'
import styles from './list.scss'

const Index = ({ productList = [], ...props }) => {
    const [cateIndex, setCateIndex] = useState(0)
    const handleClick = goodId => {
        location.href = `/detail/${goodId}`
    }
    return (
        <Layout disableBackBtn={true}>
            <Swiper
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                }}
            >
                <div>
                    <img src="/static/images/banner-01.jpg" />
                </div>
                <div>
                    <img src="/static/images/banner-02.jpg" />
                </div>
                <div>
                    <img src="/static/images/banner-03.jpg" />
                </div>
            </Swiper>
            <ul className={styles.categoryList}>
                {productList.map((item, i) => (
                    <li className={cateIndex === i ? 'active' : ''} onClick={e => setCateIndex(i)} key={item.cateId}>
                        {item.category}
                    </li>
                ))}
            </ul>
            <div className={styles.productList}>
                {productList[cateIndex]['data'].length > 0 &&
                    productList[cateIndex]['data'].map(product => (
                        <div
                            className={styles.productItem}
                            onClick={() => handleClick(product.goodId)}
                            key={product.goodId}
                        >
                            <div className={styles.promoWrap}>
                                <Image src={product.image} className={styles.productImg} />
                                {product.promoMsg && <div className={styles.tag}>{product.promoMsg}</div>}
                            </div>
                            <ul className={styles.productInfo}>
                                <li className={styles.productName}>{product.name}</li>
                                <li className={`ehsPrice ${styles.productPrice}`}>{product.price}</li>
                            </ul>
                        </div>
                    ))}
            </div>
        </Layout>
    )
}

Index.getInitialProps = async context => {
    //https://liveserverpy.herokuapp.com/api/v1/products/
}
export default Index
