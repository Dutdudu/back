import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class ProdutoController {
  
  public async create(request: Request, response: Response): Promise<Response> {
    const { preco, taxa, nome, validade, origem, fk_Usuario_codigo } = request.body;

    try {
      const newProduto = await prisma.produto.create({
        data: {
          preco,
          taxa,
          nome,
          validade,
          origem,
          fk_Usuario_codigo,
        },
      });

      return response.status(201).json({
        message: "Produto criado com sucesso",
        produto: newProduto,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }

 
  public async readAll(request: Request, response: Response): Promise<Response> {
    try {
      const produtos = await prisma.produto.findMany();
      return response.status(200).json(produtos);
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }


  public async readById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const produto = await prisma.produto.findUnique({
        where: { codigo: parseInt(id) },
      });

      if (!produto) {
        return response.status(404).json({ error: 'Produto não encontrado' });
      }

      return response.status(200).json(produto);
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { preco, taxa, nome, validade, origem, fk_Usuario_codigo } = request.body;

    try {
      const updatedProduto = await prisma.produto.update({
        where: { codigo: parseInt(id) },
        data: {
          preco,
          taxa,
          nome,
          validade,
          origem,
          fk_Usuario_codigo,
        },
      });

      return response.status(200).json({
        message: "Produto atualizado com sucesso",
        produto: updatedProduto,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      await prisma.produto.delete({
        where: { codigo: parseInt(id) },
      });

      return response.status(204).end();
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }
}

export const produtoController = new ProdutoController();