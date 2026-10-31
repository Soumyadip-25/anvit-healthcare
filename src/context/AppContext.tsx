import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Doctor,
  Appointment,
  Prescription,
  DoctorReview,
  ConsultationType
} from '../types';
import {
  DOCTORS,
  INITIAL_USER,
  INITIAL_DOCTOR_USER,
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  switchUserRole: (role: 'patient' | 'doctor' | 'guest') => void;
  doctors: Doctor[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  savedDoctorIds: string[];
  toggleSaveDoctor: (doctorId: string) => void;
  bookAppointment: (data: {
    doctorId: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    consultationType: ConsultationType;
    date: string;
    timeSlot: string;
    symptoms: string;
    notes?: string;
  }) => Appointment;
  cancelAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, date: string, timeSlot: string) => void;
  addDoctorReview: (doctorId: string, review: { rating: number; comment: string; consultationType: ConsultationType }) => void;
  createPrescription: (prescriptionData: Omit<Prescription, 'id'>) => Prescription;
  updateDoctorSchedule: (doctorId: string, availability: Doctor['availability']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_APPOINTMENTS = 'anvit_appointments_v1';
const LOCAL_STORAGE_KEY_PRESCRIPTIONS = 'anvit_prescriptions_v1';
const LOCAL_STORAGE_KEY_SAVED_DOCS = 'anvit_saved_doctors_v1';
const LOCAL_STORAGE_KEY_ROLE = 'anvit_user_role_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const savedRole = localStorage.getItem(LOCAL_STORAGE_KEY_ROLE);
    if (savedRole === 'doctor') return INITIAL_DOCTOR_USER;
    if (savedRole === 'guest') return null;
    return INITIAL_USER;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(DOCTORS);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PRESCRIPTIONS);
      return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
    } catch {
      return INITIAL_PRESCRIPTIONS;
    }
  });

  const [savedDoctorIds, setSavedDoctorIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SAVED_DOCS);
      return saved ? JSON.parse(saved) : ['doc-1', 'doc-3'];
    } catch {
      return ['doc-1', 'doc-3'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
    } catch (e) {
      console.warn('Failed to save appointments', e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PRESCRIPTIONS, JSON.stringify(prescriptions));
    } catch (e) {
      console.warn('Failed to save prescriptions', e);
    }
  }, [prescriptions]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SAVED_DOCS, JSON.stringify(savedDoctorIds));
    } catch (e) {
      console.warn('Failed to save favorites', e);
    }
  }, [savedDoctorIds]);

  const switchUserRole = (role: 'patient' | 'doctor' | 'guest') => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ROLE, role);
    if (role === 'patient') {
      setCurrentUser(INITIAL_USER);
    } else if (role === 'doctor') {
      setCurrentUser(INITIAL_DOCTOR_USER);
    } else {
      setCurrentUser(null);
    }
  };

  const toggleSaveDoctor = (doctorId: string) => {
    setSavedDoctorIds(prev =>
      prev.includes(doctorId) ? prev.filter(id => id !== doctorId) : [...prev, doctorId]
    );
  };

  const bookAppointment = (data: {
    doctorId: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    consultationType: ConsultationType;
    date: string;
    timeSlot: string;
    symptoms: string;
    notes?: string;
  }): Appointment => {
    const doctor = doctors.find(d => d.id === data.doctorId);
    const amount = doctor ? doctor.consultationFee : 1000;
    const invNumber = `INV-ANV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      doctorId: data.doctorId,
      doctorName: doctor ? doctor.name : 'Consulting Doctor',
      doctorSpecialty: doctor ? doctor.specialtyName : 'Specialist',
      doctorAvatar: doctor ? doctor.avatar : '',
      doctorHospital: doctor ? doctor.hospitalAffiliation : 'Anvit Telehealth Clinic',
      patientId: currentUser ? currentUser.id : `guest-${Date.now()}`,
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      patientPhone: data.patientPhone,
      consultationType: data.consultationType,
      date: data.date,
      timeSlot: data.timeSlot,
      status: 'confirmed',
      symptoms: data.symptoms,
      amountPaid: amount,
      invoiceNumber: invNumber,
      notes: data.notes,
      createdAt: new Date().toISOString(),
    };

    setAppointments(prev => [newAppointment, ...prev]);

    // Update doctor's slot as booked
    setDoctors(prev =>
      prev.map(doc => {
        if (doc.id !== data.doctorId) return doc;
        const updatedAvailability = doc.availability.map(avail => {
          if (avail.date !== data.date) return avail;
          return {
            ...avail,
            slots: avail.slots.map(s => s.time === data.timeSlot ? { ...s, available: false } : s)
          };
        });
        return { ...doc, availability: updatedAvailability };
      })
    );

    return newAppointment;
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: 'cancelled' } : apt)
    );
  };

  const rescheduleAppointment = (id: string, date: string, timeSlot: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, date, timeSlot, status: 'confirmed' } : apt)
    );
  };

  const addDoctorReview = (
    doctorId: string,
    review: { rating: number; comment: string; consultationType: ConsultationType }
  ) => {
    const newReview: DoctorReview = {
      id: `rev-${Date.now()}`,
      patientName: currentUser ? currentUser.name : 'Anonymous Patient',
      rating: review.rating,
      date: 'Today',
      comment: review.comment,
      consultationType: review.consultationType,
      verified: true,
    };

    setDoctors(prev =>
      prev.map(doc => {
        if (doc.id !== doctorId) return doc;
        const newReviews = [newReview, ...doc.reviews];
        const newAvg = Number(
          (newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length).toFixed(2)
        );
        return {
          ...doc,
          reviews: newReviews,
          rating: newAvg,
          totalReviews: doc.totalReviews + 1,
        };
      })
    );
  };

  const createPrescription = (prescriptionData: Omit<Prescription, 'id'>): Prescription => {
    const newPrescription: Prescription = {
      id: `rx-${Date.now()}`,
      ...prescriptionData,
    };

    setPrescriptions(prev => [newPrescription, ...prev]);

    // Link prescription to appointment
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === prescriptionData.appointmentId
          ? { ...apt, status: 'completed', prescriptionId: newPrescription.id }
          : apt
      )
    );

    return newPrescription;
  };

  const updateDoctorSchedule = (doctorId: string, availability: Doctor['availability']) => {
    setDoctors(prev =>
      prev.map(doc => doc.id === doctorId ? { ...doc, availability } : doc)
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        doctors,
        appointments,
        prescriptions,
        savedDoctorIds,
        toggleSaveDoctor,
        bookAppointment,
        cancelAppointment,
        rescheduleAppointment,
        addDoctorReview,
        createPrescription,
        updateDoctorSchedule,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

