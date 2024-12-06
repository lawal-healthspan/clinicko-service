"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethod = void 0;
const zod_1 = require("zod");
exports.HttpMethod = zod_1.z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]);
