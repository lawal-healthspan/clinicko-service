"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const zod_1 = require("zod");
const business_1 = __importDefault(require("../helpers/business"));
const eventBodySchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "userId must be at least 26 characters" }),
    apiKey: zod_1.z.string().min(16, { message: "API key must be at least 76 characters" }),
});
const handler = async (event, _context) => {
    try {
        const clinic = (0, business_1.default)();
        const requestBody = JSON.parse(event.body || "{}");
        const validatedData = eventBodySchema.parse(requestBody);
        const { apiKey } = validatedData;
        const response = await clinic.businesses(apiKey);
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            statusCode: 200,
            body: JSON.stringify(response),
        };
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({
                    error: error.errors, // Validation errors
                }),
            };
        }
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                error: "Internal server error",
            }),
        };
    }
};
exports.handler = handler;
exports.default = exports.handler;
