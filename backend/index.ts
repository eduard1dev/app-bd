import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
class Server {
  private app: express.Application;
  private pool: Pool;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }

  public async configuration() {
    this.app.set('port', 3001);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  public async routes() {
    this.app.get('/', (_, res) => {
      res.send('hello world');
    });

    // GET REQUESTS
    this.app.get('/cliente', (_, res) => {
      try {
        this.pool.query('SELECT * FROM cliente').then((result) => {
          console.log(result.rows);
          res.send(result.rows);
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.app.get('/cliente/:cpf', (req, res) => {
      try {
        this.pool
          .query(`SELECT * FROM cliente WHERE cpf = '${req.params.cpf}'`)
          .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
          });
      } catch (err) {
        console.log(err);
      }
    });

    this.app.get('/venda', (_, res) => {
      try {
        this.pool.query(`SELECT * FROM venda`).then((result) => {
          res.send(result.rows);
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.app.get('/venda/:id', (req, res) => {
      try {
        this.pool
          .query(`SELECT * FROM venda WHERE venda_id = ${req.params.id}`)
          .then((result) => {
            res.send(result.rows);
          });
      } catch (err) {
        console.log(err);
      }
    });

    // POST REQUESTS
    this.app.post('/venda', (req, res) => {
      this.pool
        .query(
          `INSERT INTO venda VALUES (DEFAULT, '${req.body.tipo_pagamento}',${req.body.valor}, '${req.body.data}', '${req.body.veiculo_id}', '${req.body.vendedor_cpf}','${req.body.pagamento_id}','${req.body.avaliacao_id}','${req.body.cliente_cpf}')`,
        )
        .then((result) => {
          res.send(result.rows);
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    });

    this.app.post('/cliente', (req, res) => {
      this.pool
        .query(
          `INSERT INTO cliente VALUES ('${req.body.cpf}','${req.body.nome}', '${req.body.data_nascimento}'`,
        )
        .then((result) => {
          res.send(result.rows);
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    });

    // PUT REQUESTS
    this.app.put('/cliente/:cpf', (req, res) => {
      this.pool
        .query(
          `UPDATE cliente SET nome = 'Saul Goodman'  WHERE cpf = '${req.params.cpf}'`,
        )
        .then((result) => {
          res.send(result.rows);
        })
        .catch((err) => {
          console.log(err);
          res.send(500);
        });
    });

    // DELETE REQUESTS
    this.app.delete('/cliente/:cpf', (req, res) => {
      //this.pool.query(``);
    });
  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });

    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'appdb',
      password: 'ed1tap22',
      port: 5432,
    });

    this.pool.connect();

    this.pool.on('connect', () => {
      console.log('Base de Dados conectado com sucesso!');
    });
  }
}

const server = new Server();

server.start();
