"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removerCliente = exports.atualizarCliente = exports.listarClientes = exports.adicionarCliente = void 0;
const node_localstorage_1 = require("node-localstorage");
const uuid_1 = require("uuid");
const clientes_1 = require("../classes/clientes");
const localStorage = new node_localstorage_1.LocalStorage("./scratch");
const STORAGE_KEY = "clientes";
const obterClientesArmazenados = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};
const armazenarClientes = (clientes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
};
const adicionarCliente = (req, res) => {
    const clientes = obterClientesArmazenados();
    const novoCliente = new clientes_1.Cliente((0, uuid_1.v4)(), req.body.nome, req.body.cpf, req.body.telefone);
    clientes.push(novoCliente);
    armazenarClientes(clientes);
    res.status(201).json(novoCliente);
};
exports.adicionarCliente = adicionarCliente;
const listarClientes = (req, res) => {
    const clientes = obterClientesArmazenados();
    res.json(clientes);
};
exports.listarClientes = listarClientes;
const atualizarCliente = (req, res) => {
    const { id } = req.params;
    const clienteAtualizado = new clientes_1.Cliente(id, req.body.nome, req.body.cpf, req.body.telefone);
    const clientes = obterClientesArmazenados();
    const index = clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
        clientes[index] = clienteAtualizado;
        armazenarClientes(clientes);
        res.json(clienteAtualizado);
    }
    else {
        res.status(404).json({ message: "Cliente não encontrado" });
    }
};
exports.atualizarCliente = atualizarCliente;
const removerCliente = (req, res) => {
    const { id } = req.params;
    const clientes = obterClientesArmazenados();
    const clientesFiltrados = clientes.filter((c) => c.id !== id);
    armazenarClientes(clientesFiltrados);
    res.status(204).send();
};
exports.removerCliente = removerCliente;
