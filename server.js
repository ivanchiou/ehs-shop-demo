'use strict'

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const fetch = require('node-fetch')
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    server.use(bodyParser())

    // 商品列表 (首頁)
    router.get(`/`, async ctx => {
        ctx.status = 200
        await app.render(ctx.req, ctx.res, '/list', ctx.request.body)
        ctx.respond = false
    })
    // 商品頁
    router.get(`/detail/:goodId`, async ctx => {
        ctx.status = 200
        const { goodId } = ctx.params
        const query = { ...ctx.query, goodId }
        await app.render(ctx.req, ctx.res, '/detail', query)
        ctx.respond = false
    })

    // 加入購物車
    router.post(`/addToCart`, async ctx => {
        try {
            const res = await fetch('https://liveserverpy.herokuapp.com/api/v1/basket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access_token: ctx.cookies.get('access_token'),
                    ...ctx.request.body
                })
            })
            const { access_token, isSuccess } = await res.json()
            if (isSuccess && access_token) {
                // set cookie
                ctx.cookies.set('access_token', access_token, {
                    maxAge: 10 * 60 * 1000,
                    httpOnly: false
                })
            }
            ctx.status = 200
            ctx.body = {
                isSuccess,
                errorMsg: isSuccess ? '' : '系統異常，無法加入購物車！'
            }
        } catch (err) {
            console.log('error=', err)
        }
    })
    // 移除購物車
    router.delete(`/removeCart`, async ctx => {
        try {
            const res = await fetch(
                `https://liveserverpy.herokuapp.com/api/v1/basket/${
                    ctx.request.body.goodId
                }?access_token=${ctx.cookies.get('access_token')}`,
                {
                    method: 'DELETE'
                }
            )
            const { isSuccess, message } = await res.json()
            ctx.status = 200
            ctx.body = {
                isSuccess,
                message
            }
        } catch (err) {
            console.log('error=', err)
        }
    })

    // 購物車 Step1
    router.get(`/cart`, async ctx => {
        try {
            const res = await fetch(
                `https://liveserverpy.herokuapp.com/api/v1/basket?access_token=${ctx.cookies.get('access_token')}`
            )
            const cartList = await res.json()
            // console.log('cartList==>', cartList)
            const query = { ...ctx.query, cartList: Array.isArray(cartList) ? cartList : [] }
            ctx.status = 200
            await app.render(ctx.req, ctx.res, '/cart', query)
        } catch (err) {
            console.log('error=', err)
        }
    })

    // 送出結帳
    router.post(`/checkout`, async ctx => {
        try {
            const res = await fetch(
                `https://liveserverpy.herokuapp.com/api/v1/checkout?access_token=${ctx.cookies.get('access_token')}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ctx.request.body)
                }
            )
            const { orderId, isSuccess, message } = await res.json()
            ctx.status = 200
            ctx.body = {
                orderId,
                isSuccess,
                errorMsg: isSuccess ? '' : '無法結帳，請稍後再試'
            }
        } catch (err) {
            console.log('error=', err)
        }
    })

    // 購物車 Step3
    router.get(`/complete`, async ctx => {
        try {
            const res = await fetch(
                `https://liveserverpy.herokuapp.com/api/v1/complete?access_token=${ctx.cookies.get(
                    'access_token'
                )}&orderId=${ctx.query.orderId}`
            )
            const orderDetail = await res.json()
            const query = { ...ctx.query, orderDetail }
            ctx.status = 200
            await app.render(ctx.req, ctx.res, '/complete', query)
        } catch (err) {
            console.log('error=', err)
        }
    })

    router.all('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(router.routes())
    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
