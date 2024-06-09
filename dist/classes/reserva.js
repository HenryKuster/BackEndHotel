"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
class Reserva {
    constructor(id, clienteId, quartoId, dataEntrada, dataSaida) {
        this.id = id;
        this.clienteId = clienteId;
        this.quartoId = quartoId;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }
}
exports.Reserva = Reserva;
