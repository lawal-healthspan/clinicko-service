"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinikoApi = clinikoApi;
/**
 * Interface with Cliniko API
 * @param options Object containing endpoint, method, optional data, Cliniko API key, and optional user agent
 * @returns Promise resolving to the JSON response
 * @throws Error if the API call fails or returns a non-2xx status code
 */
async function clinikoApi({ endpoint, method, data, clinikoApiKey, userAgent = "clinicSpan app (info@healthspaninnovations.co.uk)", }) {
    const headers = new Headers({
        Authorization: `Basic ${Buffer.from(clinikoApiKey + ":").toString("base64")}`,
        Accept: "application/json",
        "User-Agent": userAgent,
        "Content-Type": "application/json",
    });
    const config = {
        method,
        headers,
        body: method !== "GET" && data ? JSON.stringify(data) : undefined,
    };
    const shardId = clinikoApiKey.split('-')[1];
    const CLINIKO_BASE_URL = `https://api.${shardId}.cliniko.com/v1/`;
    const response = await fetch(`${CLINIKO_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText} at ${endpoint} with data ${JSON.stringify(data)}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    else {
        return response;
    }
}
