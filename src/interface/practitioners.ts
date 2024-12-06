type Links = {
    self?: string;
    [key: string]: any;  // Allow other properties to be added dynamically
  };
  
  type AppointmentTypes = {
    links: Links;
  };
  
  type Appointments = {
    links: Links;
  };
  
  type DefaultAppointmentType = {
    links: Links;
  };
  
  type Invoices = {
    links: Links;
  };
  
  type PractitionerReferenceNumbers = {
    links: Links;
  };
  
  type User = {
    links: Links;
  };
  
  export type Practitioner = {
    active: boolean;
    appointment_types: AppointmentTypes;
    appointments: Appointments;
    created_at: string;  // You can use Date if you plan to parse it into a Date object
    default_appointment_type: DefaultAppointmentType;
    description: string;
    designation: string;
    display_name: string;
    first_name: string;
    id: string;
    invoices: Invoices;
    label: string;
    last_name: string;
    links: Links;
    practitioner_reference_numbers: PractitionerReferenceNumbers;
    show_in_online_bookings: boolean;
    title: string;
    updated_at: string;  // You can use Date if you plan to parse it into a Date object
    user: User;
  };
  