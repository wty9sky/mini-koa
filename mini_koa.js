const http = require('http')
const context = require("./utils/context");
const request = require("./utils/request");
const response = require("./utils/response");

class MiniKoa {
    constructor() {
        //  存放中间件
        this.middleWares = []
    }

    listen(...args) {
        // 创建原生服务
        const server = http.createServer(async (req, res) => {
            // 创建上下⽂
            let ctx = this.createContext(req, res);
            // 合成函数，形成洋葱圈
            const fn = this.compose(this.middleWares)
            await fn(ctx)
            // 响应
            res.end(ctx.body);
        })
        server.listen(...args)
    }

    use(middleWare) {
        // 把中间件函数存起来
        this.middleWares.push(middleWare)
    }

    // 构建上下⽂, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
    createContext(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }

    // 合成函数
    compose(middleWares) {
        return function (ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middleWares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    // 在这里传入上下文 ctx
                    fn(ctx, function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }
}

module.exports = MiniKoa