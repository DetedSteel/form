import express from 'express';
import path, { resolve } from 'path';
import {fileURLToPath} from 'url'
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 3000;

const app = express();

const ROOT = resolve('dist');

app.use(cors(), express.json());

app.post('/register', function (request, response) {
  let res = '';
  Object.values(request.body).forEach(e => {
    res += `${e};`
  })
  res += '\n'
  fs.writeFileSync(resolve(__dirname, 'test.csv'), res, {
    encoding: 'utf8',
    flag: 'a',
  });
  response.json(request.body);
});

app.get('/martinfo24', (req, res) => {
  res.sendFile(resolve(__dirname, 'test.csv'))
})

app.use(express.static(ROOT));

app.listen(PORT, () => {
  console.log('express server on port 3000');
});
