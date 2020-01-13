import React from 'react'
import styles from './ProductItem.scss'
import Image from '@components/Image/Image'
import withPromoTag from '@hocs/withPromoTag/withPromoTag'
const ImageWithPromoTag = withPromoTag(Image)
const ProductItem = ({ product }) => {
    const handleClick = goodId => {
        location.href = `/detail/${goodId}`
    }
    return (
        <div className={styles.productItem} onClick={() => handleClick(product.goodId)} key={product.goodId}>
            <div className={styles.promoWrap}>
                <Image src={product.image} className={styles.productImg} promoMsg={product.promoMsg} />
            </div>
            <ul className={styles.productInfo}>
                <li className={styles.productName}>{product.name}</li>
                <li className={`ehsPrice ${styles.productPrice}`}>{product.price}</li>
            </ul>
        </div>
    )
}
export default ProductItem
