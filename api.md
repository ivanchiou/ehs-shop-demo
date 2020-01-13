# API

## List 列表頁

productList: [
{
title: '3C',
data: [
{
name: 'IPHONE',
price: 19999,
promoMsg: '30% OFF',
image: '/abc.jpg',
url: '/detail/12345'
}
...
]
},
{
title: '服飾',
data: [
{
name: '純棉短Ｔ恤',
price: 999,
promoMsg: '30% OFF',
image: '/abc.jpg',
url: '/detail/12345'
}
...
]
}
...
]

## Detail 商品頁

product: {
name: '純棉短Ｔ恤',
promoMsg: '30% OFF',
description: 'Our regular tee is an everyday staple. This pre-shrunk classic features zero side',
price: 999,
image: ['/abc.jpg', '/xyz.jpg'],
styleInfo: [
{
value: 'a0015',
title: '黑色',
quantity: 10
},
{
value: 'a0016',
title: '白色',
quantity: 6
}
]
}

### 商品頁下方有推薦商品區塊，同列表頁 API

## Cart 購物車第一步

### 購物車如果直接用前端的資料，應該會有庫存量的問題，所以應該還是接後端資料才對吧？

cartList: [
{
name: '純棉短Ｔ恤',
promoMsg: '30% OFF',
price: 999,
image: '/abc.jpg',
quantity: 7
}
...
]

## Checkout 購物車第二步

### 跟後端確認總金額？

{
cartList: [
{
goodId: 6,
quantity: 1
},
{
goodId: 3,
quantity: 2
}
],
payment.id: 'ATM',
invoice.id: 1,
receiver.name: 'TYSON',
receiver.phone: '0900000000',
receiver.addr1: '新北市中和區',
receiver.addr2: '景平路 258 號'
}

## Complete 購物車第三步

{
orderDetail: {
orderId: 'ehs673143',
orderTime: '', //訂購時間
},
paymentDetail: {
amount: 1999,
bank: 'ＸＸ銀行',
account: '4321-6543543654'
}
note: ''
}

### 商品頁下方有推薦商品區塊，同列表頁 API
