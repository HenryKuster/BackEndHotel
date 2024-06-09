"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removerQuarto = exports.modificarQuarto = exports.listarQuartos = exports.adicionarQuarto = void 0;
const node_localstorage_1 = require("node-localstorage");
const uuid_1 = require("uuid");
const quartos_1 = require("../classes/quartos");
const localStorage = new node_localstorage_1.LocalStorage("./scratch");
const STORAGE_KEY = "quartos";
const obterQuartosArmazenados = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};
const armazenarQuarto = (quartos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quartos));
};
const adicionarQuarto = (req, res) => {
    const quartos = obterQuartosArmazenados();
    const novoQuarto = new quartos_1.Quarto((0, uuid_1.v4)(), req.body.numero, req.body.tipo, req.body.preco);
    quartos.push(novoQuarto);
    armazenarQuarto(quartos);
    res.status(201).json(novoQuarto);
};
exports.adicionarQuarto = adicionarQuarto;
const listarQuartos = (req, res) => {
    const quartos = obterQuartosArmazenados();
    res.json(quartos);
};
exports.listarQuartos = listarQuartos;
const modificarQuarto = (req, res) => {
    const { id } = req.params;
    const quartoAtualizado = new quartos_1.Quarto(id, req.body.numero, req.body.tipo, req.body.preco);
    const quartos = obterQuartosArmazenados();
    const index = quartos.findIndex((q) => q.id === id);
    if (index !== -1) {
        quartos[index] = quartoAtualizado;
        armazenarQuarto(quartos);
        res.json(quartoAtualizado);
    }
    else {
        res.status(404).json({ message: "Quarto não encontrado" });
    }
};
exports.modificarQuarto = modificarQuarto;
const removerQuarto = (req, res) => {
    const { id } = req.params;
    const quartos = obterQuartosArmazenados();
    const quartosFiltrados = quartos.filter((q) => q.id !== id);
    armazenarQuarto(quartosFiltrados);
    res.status(204).send();
};
exports.removerQuarto = removerQuarto;
