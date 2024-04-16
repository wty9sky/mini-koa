const MiniKoa = require('./mini_koa')
const MiniRouter = require('./middlewares/router')
const koaStatic = require('./middlewares/static')
const koaCors = require('./middlewares/cors')


// 创建 MiniKoa 实例 
const app = new MiniKoa()

const router = new MiniRouter()


// 模拟异步操作
// const delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await delay();
//   await next();
//   ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "3";
// });

router.get('/index', async ctx => {
  ctx.body = 'index page';
});
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });
app.use(koaStatic());
app.use(router.routes());
app.use(koaCors());


app.listen(3000, () => {
  console.log('sever at 3000');
})