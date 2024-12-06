type Links = {
    self: string;
    [key: string]: string;
  };
  
  type AppointmentLinks = {
    links: Links;
  };
  
  type ConcessionType = {
    links: Links;
  };
  
  type CustomField = {
    value: any;
    archived: boolean | null;
    name: string | null;
    token: string | null;
    type: string | null;
  };
  
  type CustomFieldSection = {
    name: string;
    token: string;
    archived: boolean;
    fields: CustomField[];
  };
  
  type PatientPhoneNumber = {
    normalized_number: string;
    number: string;
    phone_type: string;
  };
  
  type ReferringDoctor = {
    links: Links;
  };
  
  export type Patient = {
    accepted_email_marketing: boolean;
    accepted_privacy_policy: boolean;
    accepted_sms_marketing: boolean;
    address_1: string;
    address_2: string;
    address_3: string;
    appointment_notes: string;
    appointments: AppointmentLinks;
    archived_at: string;
    attendees: AppointmentLinks;
    city: string;
    concession_type: ConcessionType;
    country: string;
    country_code: string;
    created_at: string;  // Could be a Date object if you want to parse it
    custom_fields: {
      sections: CustomFieldSection[];
    };
    date_of_birth: string;
    deleted_at: string;
    dva_card_number: string;
    email: string;
    emergency_contact: string;
    first_name: string;
    gender: string;
    gender_identity: string;
    id: string;
    invoice_default_to: string;
    invoice_email: string;
    invoice_extra_information: string;
    invoices: AppointmentLinks;
    label: string;
    last_name: string;
    latest_booking: AppointmentLinks;
    links: Links;
    medical_alerts: AppointmentLinks;
    medicare: string;
    medicare_reference_number: string;
    merged_at: string;
    merged_with_patient: AppointmentLinks;
    notes: string;
    occupation: string;
    old_reference_id: string;
    patient_attachments: AppointmentLinks;
    patient_phone_numbers: PatientPhoneNumber[];
    post_code: string;
    preferred_first_name: string;
    pronouns: {
      accusative: string;
      nominative: string;
      predicative_possessive: string;
      pronominal_possessive: string;
      reflexive: string;
    };
    receives_cancellation_emails: boolean;
    receives_confirmation_emails: boolean;
    referral_source: string;
    referring_doctor: ReferringDoctor;
    relationships: AppointmentLinks;
    reminder_type: string;
    sex: string;
    state: string;
    time_zone: string;
    title: string;
    updated_at: string;  // Could be a Date object if you want to parse it
  };
  
  type PatientsResponse = {
    patients: Patient[];
    total_entries: number;
    links: Links;
  };
  