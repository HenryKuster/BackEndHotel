"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarReserva = exports.editarReserva = exports.listarReservas = exports.criarReserva = void 0;
const node_localstorage_1 = require("node-localstorage");
const uuid_1 = require("uuid");
const reserva_1 = require("../classes/reserva");
const localStorage = new node_localstorage_1.LocalStorage("./scratch");
const STORAGE_KEY = "reservasHotel";
const CLIENTE_KEY = "clientes";
const QUARTO_KEY = "quartos";
const obterReservasSalvas = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};
const armazenarReserva = (reservas) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
};
const obterClientesSalvos = () => {
    const data = localStorage.getItem(CLIENTE_KEY);
    return data ? JSON.parse(data) : [];
};
const obterQuartosSalvos = () => {
    const data = localStorage.getItem(QUARTO_KEY);
    return data ? JSON.parse(data) : [];
};
const criarReserva = (req, res) => {
    const { clienteId, quartoId, dataEntrada, dataSaida } = req.body;
    const clientes = obterClientesSalvos();
    const quartos = obterQuartosSalvos();
    const clienteEncontrado = clientes.find((c) => c.id === clienteId);
    const quartoEncontrado = quartos.find((q) => q.id === quartoId);
    if (!clienteEncontrado || !quartoEncontrado) {
        return res
            .status(404)
            .json({ message: "Cliente ou quarto não encontrado" });
    }
    const reservas = obterReservasSalvas();
    const novaReserva = new reserva_1.Reserva((0, uuid_1.v4)(), clienteId, quartoId, dataEntrada, dataSaida);
    reservas.push(novaReserva);
    armazenarReserva(reservas);
    res.status(201).json(novaReserva);
};
exports.criarReserva = criarReserva;
const listarReservas = (req, res) => {
    const reservas = obterReservasSalvas();
    res.json(reservas);
};
exports.listarReservas = listarReservas;
const editarReserva = (req, res) => {
    const { id } = req.params;
    const { clienteId, quartoId, dataEntrada, dataSaida } = req.body;
    const clientes = obterClientesSalvos();
    const quartos = obterQuartosSalvos();
    const clienteEncontrado = clientes.find((c) => c.id === clienteId);
    const quartoEncontrado = quartos.find((q) => q.id === quartoId);
    if (!clienteEncontrado || !quartoEncontrado) {
        return res
            .status(404)
            .json({ message: "Cliente ou quarto não encontrado" });
    }
    const reservas = obterReservasSalvas();
    const index = reservas.findIndex((r) => r.id === id);
    if (index !== -1) {
        const reservaAtualizada = new reserva_1.Reserva(id, clienteId, quartoId, dataEntrada, dataSaida);
        reservas[index] = reservaAtualizada;
        armazenarReserva(reservas);
        res.json(reservaAtualizada);
    }
    else {
        res.status(404).json({ message: "Reserva não encontrada" });
    }
};
exports.editarReserva = editarReserva;
const deletarReserva = (req, res) => {
    const { id } = req.params;
    const reservas = obterReservasSalvas();
    const reservasFiltradas = reservas.filter((r) => r.id !== id);
    armazenarReserva(reservasFiltradas);
    res.status(204).send();
};
exports.deletarReserva = deletarReserva;
