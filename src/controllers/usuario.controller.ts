import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsuarioController {
  // Cria um novo usuário
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, endereco, idade, email, telefone } = request.body;

    try {
      const newUser = await prisma.usuario.create({
        data: {
          nome,
          endereco,
          idade,
          email,
          telefone,
        },
      });

      return response.status(201).json({
        message: "Usuário criado com sucesso",
        usuario: newUser,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }

  // Lê todos os usuários
  public async readAll(request: Request, response: Response): Promise<Response> {
    try {
      const usuarios = await prisma.usuario.findMany();
      return response.status(200).json(usuarios);
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }

  // Lê um usuário pelo ID
  public async readById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const usuario = await prisma.usuario.findUnique({
        where: { codigo: parseInt(id) },
      });

      if (!usuario) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      return response.status(200).json(usuario);
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }

  // Atualiza um usuário pelo ID
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, endereco, idade, email, telefone } = request.body;

    try {
      const updatedUsuario = await prisma.usuario.update({
        where: { codigo: parseInt(id) },
        data: {
          nome,
          endereco,
          idade,
          email,
          telefone,
        },
      });

      return response.status(200).json({
        message: "Usuário atualizado com sucesso",
        usuario: updatedUsuario,
      });
    } catch (error) {
      return response.status(500).json({
        messageError: "Erro interno no servidor",
        error,
      });
    }
  }

  // Deleta um usuário pelo ID
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      await prisma.usuario.delete({
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

export const usuarioController = new UsuarioController();