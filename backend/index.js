"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../backend/config/connection"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("hello world");
});
const PORT = process.env.PORT || 3000;
(0, connection_1.default)();
app.listen(PORT, () => {
    console.log("port is running at port number 3000");
});
