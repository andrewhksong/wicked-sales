require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/products', (req, res, next) => {
  const sql = `
      select "productId",
             "name",
             "price",
             "image",
             "shortDescription"
        from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const values = [`${req.params.productId}`];
  const sql = `
      select *
        from "products"
       where "productId" = $1
  `;
  if (parseInt(req.params.productId) < 0 ||
      isNaN(parseInt(req.params.productId))) {
    return next(new ClientError('Bad Request', 400));
  }
  db.query(sql, values)
    .then(result => {
      if (!(result.rows[0])) {
        return next(new ClientError('Not Found', 404));
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  const sql = `
    select *
      from "cartItems"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/cart/:productId', (req, res, next) => {
  const id = req.params.productId;
  const values = [`${id}`];
  const sql = `
    select "price" 
      from "products" 
     where "productId" = $1;
  `;
  if (parseInt(id) < 0 || isNaN(parseInt(id))) {
    return next(new ClientError('Bad request', 400));
  }

  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError('Not found', 404);
      } else {
        return db.query(`
          insert into "carts" ("cartId", "createdAt")
               values (default, default)
            returning "cartId";
        `)
          .then(cartResult => {
            return {
              price: result.rows[0].price,
              cartId: cartResult.rows[0].cartId
            };
          });
      }
    })
    .then(cartObject => {
      req.session.cartId = cartObject.cartId;
      return db.query(`
        insert into "cartItems" ("cartId", "productId", "price")
             values ($1, $2, $3)
          returning "cartItemId";
      `, [cartObject.cartId, `${id}`, cartObject.price])
        .then(result => {
          return {
            cartItemId: result.rows[0].cartItemId
          };
        });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
