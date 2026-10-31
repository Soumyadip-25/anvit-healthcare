export type ConsultationType = 'video' | 'audio' | 'in-person';

export type AppointmentStatus = 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  doctorCount: number;
  popularConditions: string[];
}

export interface DoctorReview {
  id: string;
  patientName: string;
  rating: number;
  date: string;
  comment: string;
  consultationType: ConsultationType;
  verified: boolean;
}

export interface DoctorTimeSlot {
  time: string; // e.g. "09:30 AM"
  available: boolean;
}

export interface DoctorDayAvailability {
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // Mon, Tue, etc.
  displayDate: string; // "Today, Oct 31", "Tomorrow, Nov 1"
  slots: DoctorTimeSlot[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  slug: string;
  avatar: string;
  specialtyId: string;
  specialtyName: string;
  subSpecialties: string[];
  qualifications: string;
  experienceYears: number;
  registrationNumber: string;
  hospitalAffiliation: string;
  consultationFee: number;
  rating: number;
  totalReviews: number;
  languages: string[];
  bio: string;
  about: string;
  isVerified: boolean;
  isOnlineNow: boolean;
  nextAvailableSlot: string;
  location: string;
  reviews: DoctorReview[];
  availability: DoctorDayAvailability[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  doctorHospital: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  consultationType: ConsultationType;
  date: string; // YYYY-MM-DD
  timeSlot: string; // "10:30 AM"
  status: AppointmentStatus;
  symptoms: string;
  amountPaid: number;
  invoiceNumber: string;
  notes?: string;
  prescriptionId?: string;
  createdAt: string;
}

export interface PrescriptionMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string; // e.g. "1-0-1 (After meals)"
  duration: string; // e.g. "5 days"
  notes: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorRegNo: string;
  date: string;
  diagnosis: string;
  vitals?: {
    bp?: string;
    pulse?: string;
    temp?: string;
    spo2?: string;
  };
  medications: PrescriptionMedication[];
  labTestsRecommended?: string[];
  lifestyleAdvice?: string;
  followUpDate?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  avatar: string;
  phone: string;
  // Patient fields
  bloodGroup?: string;
  age?: number;
  gender?: string;
  emergencyContact?: string;
  allergies?: string[];
  // Doctor fields
  specialtyId?: string;
  specialtyName?: string;
  registrationNumber?: string;
  experienceYears?: number;
  hospitalAffiliation?: string;
  consultationFee?: number;
  isVerified?: boolean;
}

