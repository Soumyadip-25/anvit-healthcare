import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  Building,
  FileText,
  Heart,
  User,
  ShieldCheck,
  AlertCircle,
  Plus,
  ArrowRight,
  Printer,
  ChevronRight,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Appointment, Prescription } from '../types';
import { PrescriptionModal } from '../components/common/PrescriptionModal';
import { RescheduleModal } from '../components/common/RescheduleModal';
import { DoctorCard } from '../components/common/DoctorCard';

export const PatientDashboardPage: React.FC = () => {
  const {
    currentUser,
    appointments,
    prescriptions,
    doctors,
    savedDoctorIds,
    cancelAppointment
  } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'prescriptions' | 'saved' | 'profile'>('upcoming');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [rescheduleAppointmentData, setRescheduleAppointmentData] = useState<Appointment | null>(null);

  const upcomingAppointments = appointments.filter(a => a.status === 'confirmed');
  const pastAppointments = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');
  const savedDoctors = doctors.filter(d => savedDoctorIds.includes(d.id));

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Patient Banner */}
        <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                alt={currentUser?.name || 'Patient'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E3DAC4] shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#14284B]">
                    Welcome, {currentUser?.name || 'Patient'}
                  </h1>
                  <span className="text-xs font-semibold text-[#2E6B4F] bg-[#2E6B4F]/10 px-2.5 py-0.5 rounded-full">
                    Active Patient
                  </span>
                </div>
                <p className="text-xs text-[#5B6475] mt-1">
                  MRN: <strong className="font-mono text-[#14284B]">ANV-PT-98214</strong> • Blood Group: <strong className="text-[#14284B]">{currentUser?.bloodGroup || 'B+ Positive'}</strong>
                </p>
                <p className="text-xs text-[#5B6475]">
                  Emergency: {currentUser?.emergencyContact || '+91 98765 11223 (Pooja Sharma)'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/doctors"
                className="px-5 py-2.5 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl text-xs sm:text-sm font-bold shadow-sm transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Book New Consult</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E3DAC4] text-xs">
            <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E3DAC4]">
              <span className="text-[#5B6475] block">Upcoming Consultations</span>
              <strong className="text-lg font-serif font-bold text-[#14284B]">{upcomingAppointments.length}</strong>
            </div>
            <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E3DAC4]">
              <span className="text-[#5B6475] block">Digital Prescriptions</span>
              <strong className="text-lg font-serif font-bold text-[#14284B]">{prescriptions.length}</strong>
            </div>
            <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E3DAC4]">
              <span className="text-[#5B6475] block">Saved Specialists</span>
              <strong className="text-lg font-serif font-bold text-[#14284B]">{savedDoctors.length}</strong>
            </div>
            <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E3DAC4]">
              <span className="text-[#5B6475] block">Encrypted Records</span>
              <strong className="text-lg font-serif font-bold text-[#2E6B4F]">100% Secure</strong>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[#E3DAC4] overflow-x-auto gap-4 mb-6">
          {[
            { id: 'upcoming', label: `Upcoming Appointments (${upcomingAppointments.length})` },
            { id: 'prescriptions', label: `My Prescriptions (${prescriptions.length})` },
            { id: 'past', label: `Past Consultations (${pastAppointments.length})` },
            { id: 'saved', label: `Saved Specialists (${savedDoctors.length})` },
            { id: 'profile', label: 'Vitals & Profile' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#14284B] text-[#14284B]'
                  : 'border-transparent text-[#5B6475] hover:text-[#1B2433]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: UPCOMING APPOINTMENTS */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4 animate-fade-in">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={apt.doctorAvatar}
                      alt={apt.doctorName}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#E3DAC4]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-bold text-[#14284B]">
                          {apt.doctorName}
                        </h3>
                        <span className="text-xs font-semibold text-[#2E6B4F] bg-[#2E6B4F]/10 px-2 py-0.5 rounded-full">
                          Confirmed
                        </span>
                      </div>
                      <p className="text-xs text-[#5B6475]">{apt.doctorSpecialty} • {apt.doctorHospital}</p>
                      <div className="flex items-center gap-3 text-xs text-[#14284B] font-medium pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#14284B]" />
                          {apt.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-[#2E6B4F]">
                          <Clock className="w-3.5 h-3.5" />
                          {apt.timeSlot}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{apt.consultationType} Call</span>
                      </div>
                      <p className="text-[11px] text-[#5B6475] italic pt-0.5">
                        Symptoms note: {apt.symptoms}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-[#E3DAC4]">
                    <button
                      onClick={() => setRescheduleAppointmentData(apt)}
                      className="px-3.5 py-2 text-xs font-semibold border border-[#E3DAC4] text-[#14284B] hover:bg-[#FAF6EC] rounded-xl transition"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="px-3 py-2 text-xs font-semibold text-[#A3382F] hover:bg-[#A3382F]/10 rounded-xl transition"
                    >
                      Cancel
                    </button>
                    <Link
                      to={`/consult/${apt.id}`}
                      className="px-4 py-2.5 bg-[#14284B] hover:bg-[#0E1D38] text-[#FAF6EC] rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Call</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-12 text-center max-w-md mx-auto space-y-4">
                <Calendar className="w-10 h-10 text-[#5B6475] mx-auto opacity-50" />
                <h3 className="font-serif text-lg font-bold text-[#14284B]">
                  No upcoming appointments
                </h3>
                <p className="text-xs text-[#5B6475]">
                  You have no pending scheduled consultations right now. Book a session with our specialists.
                </p>
                <Link
                  to="/doctors"
                  className="inline-block px-5 py-2.5 rounded-xl bg-[#14284B] text-[#FAF6EC] text-xs font-bold"
                >
                  Browse Doctors Directory
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY PRESCRIPTIONS */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-4 animate-fade-in">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6EC] border border-[#E3DAC4] flex items-center justify-center text-[#14284B] flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base font-bold text-[#14284B]">
                        {rx.diagnosis}
                      </h4>
                      <span className="text-[10px] font-mono bg-[#2E6B4F]/10 text-[#2E6B4F] px-2 py-0.5 rounded-full font-bold">
                        {rx.id.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6475]">
                      Prescribed by <strong className="text-[#14284B]">{rx.doctorName}</strong> ({rx.doctorSpecialty}) on {rx.date}
                    </p>
                    <p className="text-xs text-[#5B6475] mt-1">
                      {rx.medications.length} Medications Prescribed: {rx.medications.map(m => m.name).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => setSelectedPrescription(rx)}
                    className="px-4 py-2 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View & Print Rx</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PAST CONSULTATIONS */}
        {activeTab === 'past' && (
          <div className="space-y-4 animate-fade-in">
            {pastAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={apt.doctorAvatar}
                    alt={apt.doctorName}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#E3DAC4]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base font-bold text-[#14284B]">
                        {apt.doctorName}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        apt.status === 'completed'
                          ? 'bg-[#2E6B4F]/10 text-[#2E6B4F]'
                          : 'bg-[#A3382F]/10 text-[#A3382F]'
                      }`}>
                        {apt.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6475]">{apt.doctorSpecialty} • {apt.date}</p>
                    <p className="text-xs text-[#5B6475] mt-1">Invoice: {apt.invoiceNumber} (₹{apt.amountPaid})</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/book/${apt.doctorId}`}
                    className="px-3.5 py-2 border border-[#14284B] text-[#14284B] hover:bg-[#FAF6EC] rounded-xl text-xs font-semibold"
                  >
                    Book Follow-up
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SAVED SPECIALISTS */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {savedDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        )}

        {/* TAB 5: VITALS & HEALTH PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-8 max-w-2xl mx-auto shadow-sm space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-[#14284B]">
              Personal Health Profile & Baseline Vitals
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4]">
                <span className="text-[#5B6475] block">Blood Group:</span>
                <strong className="text-sm text-[#14284B]">{currentUser?.bloodGroup || 'B+ Positive'}</strong>
              </div>
              <div className="p-3 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4]">
                <span className="text-[#5B6475] block">Age & Gender:</span>
                <strong className="text-sm text-[#14284B]">{currentUser?.age || 32} Yrs / {currentUser?.gender || 'Male'}</strong>
              </div>
              <div className="p-3 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4]">
                <span className="text-[#5B6475] block">Emergency Contact:</span>
                <strong className="text-sm text-[#14284B]">{currentUser?.emergencyContact || '+91 98765 11223 (Spouse)'}</strong>
              </div>
              <div className="p-3 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4]">
                <span className="text-[#5B6475] block">Known Drug Allergies:</span>
                <strong className="text-sm text-[#A3382F]">{currentUser?.allergies?.join(', ') || 'Penicillin, Sulfa drugs'}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#2E6B4F]/10 border border-[#2E6B4F]/30 text-xs text-[#2E6B4F] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>
                Health records and vitals are encrypted with AES-256 keys. Only doctors you explicitly consult are granted temporary read access for the duration of care.
              </span>
            </div>
          </div>
        )}

        {/* Prescription Modal */}
        <PrescriptionModal
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
        />

        {/* Reschedule Modal */}
        <RescheduleModal
          appointment={rescheduleAppointmentData}
          onClose={() => setRescheduleAppointmentData(null)}
        />
      </div>
    </div>
  );
};

