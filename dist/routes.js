"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservaController_1 = require("./controllers/reservaController");
const clientesController_1 = require("./controllers/clientesController");
const quartosController_1 = require("./controllers/quartosController");
const servicosController_1 = require("./controllers/servicosController");
const router = (0, express_1.Router)();
// Rotas de reservas
router.post("/reservas", reservaController_1.criarReserva);
router.get("/reservas", reservaController_1.listarReservas);
router.put("/reservas/:id", reservaController_1.editarReserva);
router.delete("/reservas/:id", reservaController_1.deletarReserva);
// Rotas de clientes
router.post("/clientes", clientesController_1.adicionarCliente);
router.get("/clientes", clientesController_1.listarClientes);
router.put("/clientes/:id", clientesController_1.atualizarCliente);
router.delete("/clientes/:id", clientesController_1.removerCliente);
// Rotas de quartos
router.post("/quartos", quartosController_1.adicionarQuarto);
router.get("/quartos", quartosController_1.listarQuartos);
router.put("/quartos/:id", quartosController_1.modificarQuarto);
router.delete("/quartos/:id", quartosController_1.removerQuarto);
// Rotas de serviços
router.post("/servicos", servicosController_1.adicionarServico);
router.get("/servicos", servicosController_1.listarServicos);
router.put("/servicos/:id", servicosController_1.modificarServico);
router.delete("/servicos/:id", servicosController_1.removerServico);
exports.default = router;
