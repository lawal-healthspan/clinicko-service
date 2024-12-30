"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliniko_1 = require("../utils/cliniko");
const api_1 = require("../schema/api");
const clinics = () => {
    const businesses = async (clinikoApiKey) => {
        const requestData = {
            endpoint: 'businesses',
            method: api_1.HttpMethod.enum.GET,
            clinikoApiKey,
        };
        const { businesses } = await (0, cliniko_1.clinikoApi)(requestData);
        const locations = businesses.length;
        // appointment types
        const appointment_types = await getAllAppointmentTypes(businesses);
        const practitioners = await clinicPractitioners(clinikoApiKey);
        const patients = await clinicPatients(clinikoApiKey);
        const address = refineBusinessInformation(businesses);
        console.log(address);
        return { patients, locations, appointment_types, practitioners, address };
    };
    const clinicPatients = async (clinikoApiKey) => {
        const requestData = {
            endpoint: 'patients',
            method: api_1.HttpMethod.enum.GET,
            clinikoApiKey,
        };
        const { patients } = await (0, cliniko_1.clinikoApi)(requestData);
        return patients.length;
    };
    const clinicPractitioners = async (clinikoApiKey) => {
        const requestData = {
            endpoint: 'practitioners',
            method: api_1.HttpMethod.enum.GET,
            clinikoApiKey,
        };
        const { practitioners } = await (0, cliniko_1.clinikoApi)(requestData);
        const activePractitioners = practitioners.filter(practitioners => practitioners.show_in_online_bookings);
        return activePractitioners.length;
    };
    const getAllAppointmentTypes = async (businesses) => {
        const appointmentTypesArray = businesses.map((business) => business.appointment_type_ids.length);
        const appointmentTypes = Math.max(...appointmentTypesArray.flat());
        return appointmentTypes;
    };
    const refineBusinessInformation = (businesses) => {
        const { address_1, city, country_code, post_code, state, } = businesses[0];
        return {
            line1: address_1,
            city,
            state,
            postal_code: post_code,
            country: country_code,
        };
    };
    return {
        businesses
    };
};
exports.default = clinics;
