// Importar as funções do Model
const clienteModel = require("../models/clienteModels");

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /clientes
// DESCRIÇÃO: Lista todos os clientes do banco de dados
// ============================================================
async function listarTodos(req, res) {
  try {
    const clientes = await clienteModel.listarTodos();
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar clientes",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /clientes/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    const cliente = await clienteModel.buscarPorId(id);

    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({
        mensagem: `cliente ${id} não encontrado`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar cliente",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: criar (ASSÍNCRONA)
// ROTA: POST /clientes
// ============================================================
async function criar(req, res) {
  try {
    const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } =
      req.body;

    // Validações
    if (
      !nome ||
      !cpf ||
      !telefone ||
      !email ||
      !datanasc ||
      !rua ||
      !numeroCasa ||
      !bairro
    ) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    const novocliente = await clienteModel.criar({
      nome,
      cpf,
      telefone,
      email,
      datanasc,
      rua,
      numeroCasa,
      bairro,
    });

    res.status(201).json(novocliente);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao criar cliente",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar (ASSÍNCRONA)
// ROTA: PUT /clientes/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } =
      req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    if (
      !nome ||
      !cpf ||
      !telefone ||
      !email ||
      !datanasc ||
      !rua ||
      !numeroCasa ||
      !bairro
    ) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    const clienteAtualizado = await clienteModel.atualizar(id, {
      nome,
      cpf,
      telefone,
      email,
      datanasc,
      rua,
      numeroCasa,
      bairro,
    });

    if (clienteAtualizado) {
      res.status(200).json(clienteAtualizado);
    } else {
      res.status(404).json({
        mensagem: `cliente ${id} não encontrado`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar cliente",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: deletar (ASSÍNCRONA)
// ROTA: DELETE /clientes/:id
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    const deletado = await clienteModel.deletar(id);

    if (deletado) {
      res.status(200).json({
        mensagem: `cliente ${id} removido com sucesso`,
      });
    } else {
      res.status(404).json({
        mensagem: `cliente ${id} não encontrado`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar cliente",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorCategoria (ASSÍNCRONA)
// ROTA: GET /clientes/categoria/:categoria
// ============================================================
async function buscarPorCategoria(req, res) {
  try {
    const { categoria } = req.params;
    const clientes = await clienteModel.buscarPorCategoria(categoria);
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar clientes por categoria",
      erro: erro.message,
    });
  }
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorCategoria,
};
