import express from 'express';
import { usuarioController } from '../controllers/usuario.controller';
import { produtoController } from '../controllers/produto.controller';

const app = express();

app.use(express.json());

// Rotas para Usuário
app.post('/usuarios', usuarioController.create);
app.get('/usuarios', usuarioController.readAll);
app.get('/usuarios/:id', usuarioController.readById);
app.put('/usuarios/:id', usuarioController.update);
app.delete('/usuarios/:id', usuarioController.delete);

// Rotas para Produto
app.post('/produtos', produtoController.create);
app.get('/produtos', produtoController.readAll);
app.get('/produtos/:id', produtoController.readById);
app.put('/produtos/:id', produtoController.update);
app.delete('/produtos/:id', produtoController.delete);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
export default app;