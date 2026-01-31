import http from 'http';
import db from './db/db.js';
import { string } from 'pg-format';

const HOST = 'localhost';
const PORT = 8080;

const stringify = json => JSON.stringify(json);

const server = http.createServer(async (req, res) => {
  const { method, url: path } = req;

  // ***************************************************************************
  // GET /api
  // ***************************************************************************

  if (method === 'GET' && path === '/api') {
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    const data = { message: 'Hello' };
    try {
      res.write(stringify(data));
    } catch (err) {
      res.statusCode = 500;
      const data = { error: err.message };
      res.write(stringify(data));
    }
    res.end();
  }

  // ***************************************************************************
  // GET /api/books
  // ***************************************************************************

  if (method === 'GET' && path === '/api/books') {
    try {
      const { rows: books } = await db.query(`select * from books;`);
      const json = stringify({ books });
      res.setHeader('content-type', 'application/json');
      res.statusCode = 200;
      res.write(json);
    } catch (err) {
      res.statusCode = 500;
      const data = { error: err.message };
      res.write(stringify(data));
    }
    res.end();
  }
});

server.listen(PORT, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`server listening on port: ${PORT}`);
});
