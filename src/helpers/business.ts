import { clinikoApi } from '../utils/cliniko';
import { HttpMethod } from '../schema/api'
import { BusinessType } from '../interface/business'
import { Practitioner } from '../interface/practitioners'
import { Patient } from '../interface/patient'


const clinics = () => {

    const businesses = async (clinikoApiKey: string) => {

        const requestData = {
            endpoint: 'businesses',
            method:HttpMethod.enum.GET,
            clinikoApiKey,
        }
        const { businesses } = await clinikoApi<void,{businesses:BusinessType[]}>(requestData);
        const locations = businesses.length; 
        // appointment types
        const appointment_types = await getAllAppointmentTypes(businesses);


        const practitioners = await clinicPractitioners(clinikoApiKey);

        const patients = await clinicPatients(clinikoApiKey);

        return {patients,locations, appointment_types,practitioners}
    };

    const clinicPatients = async (clinikoApiKey:string) => {

        const requestData = {
            endpoint: 'patients',
            method:HttpMethod.enum.GET,
            clinikoApiKey,
        }
        const { patients } = await clinikoApi<void,{patients:Patient[]}>(requestData);

        return patients.length; 
    };
    const clinicPractitioners = async (clinikoApiKey:string) => {

        const requestData = {
            endpoint: 'practitioners',
            method:HttpMethod.enum.GET,
            clinikoApiKey,
        }
        const { practitioners } = await clinikoApi<void,{practitioners:Practitioner[]}>(requestData);

        const activePractitioners = practitioners.filter(practitioners => practitioners.show_in_online_bookings); 

        return activePractitioners.length; 
    };

    const getAllAppointmentTypes = async (
        businesses: BusinessType[]
      ): Promise<number> => {
        const appointmentTypesArray = businesses.map((business) => business.appointment_type_ids.length); 
        const appointmentTypes = Math.max(...appointmentTypesArray.flat());
        return appointmentTypes; 
    };

    return {
      businesses
    };
};

export default clinics;
