"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removerServico = exports.modificarServico = exports.listarServicos = exports.adicionarServico = void 0;
const node_localstorage_1 = require("node-localstorage");
const uuid_1 = require("uuid");
const servicos_1 = require("../classes/servicos");
const localStorage = new node_localstorage_1.LocalStorage("./scratch");
const STORAGE_KEY = "servicos";
const obterServicosArmazenados = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};
const armazenarServicos = (servicos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
};
const adicionarServico = (req, res) => {
    const servicos = obterServicosArmazenados();
    const novoServico = new servicos_1.Servicos((0, uuid_1.v4)(), req.body.nome, req.body.descricao, req.body.preco);
    servicos.push(novoServico);
    armazenarServicos(servicos);
    res.status(201).json(novoServico);
};
exports.adicionarServico = adicionarServico;
const listarServicos = (req, res) => {
    const servicos = obterServicosArmazenados();
    res.json(servicos);
};
exports.listarServicos = listarServicos;
const modificarServico = (req, res) => {
    const { id } = req.params;
    const servicoAtualizado = new servicos_1.Servicos(id, req.body.nome, req.body.descricao, req.body.preco);
    const servicos = obterServicosArmazenados();
    const index = servicos.findIndex((s) => s.id === id);
    if (index !== -1) {
        servicos[index] = servicoAtualizado;
        armazenarServicos(servicos);
        res.json(servicoAtualizado);
    }
    else {
        res.status(404).json({ message: "Serviço não encontrado" });
    }
};
exports.modificarServico = modificarServico;
const removerServico = (req, res) => {
    const { id } = req.params;
    const servicos = obterServicosArmazenados();
    const servicosFiltrados = servicos.filter((s) => s.id !== id);
    armazenarServicos(servicosFiltrados);
    res.status(204).send();
};
exports.removerServico = removerServico;
