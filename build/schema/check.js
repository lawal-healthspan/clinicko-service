"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBodySchema = void 0;
const zod_1 = require("zod");
exports.eventBodySchema = zod_1.z.object({
    userId: zod_1.z.string().min(10, "userId must be at least 10 characters"),
    apiKey: zod_1.z.string().min(10, "API key must be at least 76 characters"),
});
