import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  User,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  FileText,
  DollarSign,
  Plus,
  Settings,
  AlertCircle,
  PhoneCall,
  Activity,
  Edit3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrescriptionModal } from '../components/common/PrescriptionModal';
import { Prescription } from '../types';

export const DoctorDashboardPage: React.FC = () => {
  const { currentUser, appointments, prescriptions, doctors, createPrescription } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'queue' | 'schedule' | 'earnings' | 'prescribe'>('queue');
  const [isInstantOnline, setIsInstantOnline] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  // New Prescription Form State
  const [prescribePatientName, setPrescribePatientName] = useState('Rahul Sharma');
  const [prescribeDiagnosis, setPrescribeDiagnosis] = useState('');
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medFrequency, setMedFrequency] = useState('1-0-1 (After meals)');
  const [medDuration, setMedDuration] = useState('5 days');
  const [medNotes, setMedNotes] = useState('Take with warm water');
  const [lifestyleNotes, setLifestyleNotes] = useState('');
  const [prescriptionSuccess, setPrescriptionSuccess] = useState(false);

  // Filter appointments for this doctor (or all demo appointments)
  const doctorAppointments = appointments;
  const todaysAppointments = doctorAppointments.filter(a => a.date === '2026-10-31');

  const handleIssuePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prescribeDiagnosis || !medName) return;

    const newRx = createPrescription({
      appointmentId: 'apt-101',
      patientId: 'patient-1',
      patientName: prescribePatientName,
      patientAge: 32,
      patientGender: 'Male',
      doctorId: currentUser?.id || 'doc-1',
      doctorName: currentUser?.name || 'Dr. Priya Sharma',
      doctorSpecialty: currentUser?.specialtyName || 'Cardiology',
      doctorRegNo: currentUser?.registrationNumber || 'MCI-2008-49281',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      diagnosis: prescribeDiagnosis,
      vitals: {
        bp: '124/82 mmHg',
        pulse: '76 bpm',
        temp: '98.6 F',
        spo2: '99%',
      },
      medications: [
        {
          id: `med-${Date.now()}`,
          name: medName,
          dosage: medDosage || '1 tablet',
          frequency: medFrequency,
          duration: medDuration,
          notes: medNotes,
        }
      ],
      lifestyleAdvice: lifestyleNotes || 'Rest well, monitor blood pressure twice weekly.',
      followUpDate: 'In 2 weeks',
    });

    setPrescriptionSuccess(true);
    setSelectedPrescription(newRx);
    setPrescribeDiagnosis('');
    setMedName('');
    setTimeout(() => setPrescriptionSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Header Banner */}
        <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'}
                alt={currentUser?.name || 'Doctor'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E3DAC4] shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#14284B]">
                    {currentUser?.name || 'Dr. Priya Sharma'}
                  </h1>
                  <span className="text-xs font-semibold text-[#2E6B4F] bg-[#2E6B4F]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified Clinician
                  </span>
                </div>
                <p className="text-xs text-[#5B6475] mt-1">
                  Reg No: <strong className="font-mono text-[#14284B]">{currentUser?.registrationNumber || 'MCI-2008-49281'}</strong> • {currentUser?.hospitalAffiliation || 'Fortis Escorts Heart Institute'}
                </p>
                <p className="text-xs text-[#5B6475]">
                  Specialty: <strong className="text-[#14284B]">{currentUser?.specialtyName || 'Cardiology'}</strong> • Standard Consultation Fee: ₹{currentUser?.consultationFee || 1200}
                </p>
              </div>
            </div>

            {/* Instant availability toggle */}
            <div className="flex items-center gap-3 bg-[#FAF6EC] p-3 rounded-2xl border border-[#E3DAC4]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#14284B]">Instant Consultation Status</span>
                <span className="text-[11px] text-[#5B6475]">
                  {isInstantOnline ? '🟢 Available for immediate requests' : '⚪ Offline / By appointment only'}
                </span>
              </div>
              <button
                onClick={() => setIsInstantOnline(!isInstantOnline)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  isInstantOnline
                    ? 'bg-[#2E6B4F] text-white shadow-sm'
                    : 'bg-[#FFFDF7] border border-[#E3DAC4] text-[#5B6475]'
                }`}
              >
                {isInstantOnline ? 'Online' : 'Go Online'}
              </button>
            </div>
          </div>

          {/* KPI Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E3DAC4] text-xs">
            <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E3DAC4]">
              <span className="text-[#5B6475] block">Today's Patients</span>
              <strong className="text-lg font-serif font-bold text-[#14284B]">
                {todaysAppointments.length} Booked
              </strong>
            </div>
            <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E3DAC4]">
              <span className="text-[#5B6475] block">Monthly Earnings</span>
              <strong className="text-lg font-serif font-bold text-[#2E6B4F]">
                ₹98,400
              </strong>
            </div>
            <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E3DAC4]">
              <span className="text-[#5B6475] block">Patient Satisfaction</span>
              <strong className="text-lg font-serif font-bold text-[#14284B]">
                4.94 ★ (328)
              </strong>
            </div>
            <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E3DAC4]">
              <span className="text-[#5B6475] block">Average Consult Duration</span>
              <strong className="text-lg font-serif font-bold text-[#14284B]">
                18 Mins
              </strong>
            </div>
          </div>
        </div>

        {/* Doctor Portal Tabs */}
        <div className="flex border-b border-[#E3DAC4] overflow-x-auto gap-4 mb-6">
          {[
            { id: 'queue', label: `Today's Patient Queue (${todaysAppointments.length})` },
            { id: 'prescribe', label: 'Write & Issue Prescription' },
            { id: 'schedule', label: 'Availability & Slot Rules' },
            { id: 'earnings', label: 'Earnings & Settlements' },
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

        {/* TAB 1: PATIENT QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-4 animate-fade-in">
            {doctorAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF6EC] border border-[#E3DAC4] flex items-center justify-center text-[#14284B] font-serif text-lg font-bold">
                    {apt.patientName.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#14284B]">
                        {apt.patientName}
                      </h3>
                      <span className="text-xs font-semibold text-[#2E6B4F] bg-[#2E6B4F]/10 px-2.5 py-0.5 rounded-full">
                        {apt.status === 'confirmed' ? 'Scheduled' : 'Completed'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6475]">
                      Phone: <strong className="text-[#14284B]">{apt.patientPhone}</strong> • Mode: <span className="capitalize">{apt.consultationType}</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#14284B] font-medium pt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#2E6B4F]" />
                      <span>{apt.date} at <strong>{apt.timeSlot}</strong></span>
                    </div>
                    <div className="bg-[#FAF6EC] p-2.5 rounded-xl border border-[#E3DAC4] text-xs text-[#1B2433] mt-2">
                      <strong>Patient Note:</strong> {apt.symptoms}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-[#E3DAC4]">
                  <button
                    onClick={() => {
                      setPrescribePatientName(apt.patientName);
                      setActiveTab('prescribe');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#14284B] text-[#14284B] hover:bg-[#FAF6EC] text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Issue Rx</span>
                  </button>
                  <Link
                    to={`/consult/${apt.id}`}
                    className="px-5 py-2.5 bg-[#14284B] hover:bg-[#0E1D38] text-[#FAF6EC] rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Start Consultation</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: WRITE & ISSUE PRESCRIPTION */}
        {activeTab === 'prescribe' && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 max-w-3xl mx-auto shadow-sm space-y-6 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#14284B]">
                Write & Sign Clinical E-Prescription
              </h3>
              <p className="text-xs text-[#5B6475] mt-1">
                Draft prescription for your patient. Upon signing, it will be securely encrypted and issued to the patient's record.
              </p>
            </div>

            {prescriptionSuccess && (
              <div className="p-4 bg-[#2E6B4F]/10 border border-[#2E6B4F]/30 text-[#2E6B4F] rounded-2xl text-xs font-bold flex items-center justify-between">
                <span>✓ Prescription successfully issued and digitally signed!</span>
                <button
                  onClick={() => setSelectedPrescription(prescriptions[0])}
                  className="underline text-xs"
                >
                  View Issued Document
                </button>
              </div>
            )}

            <form onSubmit={handleIssuePrescription} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={prescribePatientName}
                    onChange={(e) => setPrescribePatientName(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433] font-semibold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Clinical Diagnosis</label>
                  <input
                    type="text"
                    value={prescribeDiagnosis}
                    onChange={(e) => setPrescribeDiagnosis(e.target.value)}
                    placeholder="e.g. Mild Essential Hypertension, Stage 1"
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                    required
                  />
                </div>
              </div>

              {/* Medication Entry */}
              <div className="p-4 bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4] space-y-3">
                <span className="font-bold text-[#14284B] block">Prescription Drug Details</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#5B6475] block mb-1">Medication Name & Strength</label>
                    <input
                      type="text"
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}
                      placeholder="e.g. Telmisartan 40mg"
                      className="w-full bg-white border border-[#E3DAC4] rounded-xl p-2 text-[#1B2433]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[#5B6475] block mb-1">Dosage</label>
                    <input
                      type="text"
                      value={medDosage}
                      onChange={(e) => setMedDosage(e.target.value)}
                      placeholder="e.g. 1 tablet"
                      className="w-full bg-white border border-[#E3DAC4] rounded-xl p-2 text-[#1B2433]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[#5B6475] block mb-1">Frequency</label>
                    <select
                      value={medFrequency}
                      onChange={(e) => setMedFrequency(e.target.value)}
                      className="w-full bg-white border border-[#E3DAC4] rounded-xl p-2 text-[#1B2433]"
                    >
                      <option value="1-0-0 (Morning)">1-0-0 (Morning)</option>
                      <option value="1-0-1 (After meals)">1-0-1 (After meals)</option>
                      <option value="0-0-1 (Night)">0-0-1 (Night)</option>
                      <option value="SOS / As needed">SOS / As needed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#5B6475] block mb-1">Duration</label>
                    <input
                      type="text"
                      value={medDuration}
                      onChange={(e) => setMedDuration(e.target.value)}
                      placeholder="e.g. 14 days"
                      className="w-full bg-white border border-[#E3DAC4] rounded-xl p-2 text-[#1B2433]"
                    />
                  </div>
                  <div>
                    <label className="text-[#5B6475] block mb-1">Patient Instructions</label>
                    <input
                      type="text"
                      value={medNotes}
                      onChange={(e) => setMedNotes(e.target.value)}
                      placeholder="e.g. Take after breakfast"
                      className="w-full bg-white border border-[#E3DAC4] rounded-xl p-2 text-[#1B2433]"
                    />
                  </div>
                </div>
              </div>

              {/* Lifestyle Guidance */}
              <div>
                <label className="font-semibold text-[#14284B] block mb-1">
                  Lifestyle Guidance / Dietary Restrictions
                </label>
                <textarea
                  rows={2}
                  value={lifestyleNotes}
                  onChange={(e) => setLifestyleNotes(e.target.value)}
                  placeholder="e.g. Low sodium diet, 30 min brisk walk, maintain hydration..."
                  className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#14284B] hover:bg-[#0E1D38] text-[#FAF6EC] rounded-xl font-bold transition flex items-center gap-2 shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#2E6B4F]" />
                  <span>Digitally Sign & Issue Prescription</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: SCHEDULE RULES */}
        {activeTab === 'schedule' && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 max-w-3xl mx-auto shadow-sm space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-[#14284B]">
              Weekly Consultation Slot Rules
            </h3>
            <p className="text-xs text-[#5B6475]">
              Configure your clinical hours. Slots are automatically converted into patient local time zones.
            </p>

            <div className="space-y-3 text-xs">
              {[
                { day: 'Monday to Friday', slots: '04:00 PM - 08:30 PM (30 min slots)', status: 'Active' },
                { day: 'Saturday', slots: '10:00 AM - 02:00 PM (30 min slots)', status: 'Active' },
                { day: 'Sunday', slots: 'By Special Request / Telehealth Emergency', status: 'Paused' },
              ].map((sch, i) => (
                <div key={i} className="p-4 bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4] flex items-center justify-between">
                  <div>
                    <strong className="text-[#14284B] text-sm block">{sch.day}</strong>
                    <span className="text-[#5B6475]">{sch.slots}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    sch.status === 'Active' ? 'bg-[#2E6B4F]/10 text-[#2E6B4F]' : 'bg-[#5B6475]/10 text-[#5B6475]'
                  }`}>
                    {sch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EARNINGS & SETTLEMENTS */}
        {activeTab === 'earnings' && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 max-w-3xl mx-auto shadow-sm space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#14284B]">
                Earnings & Commission Breakdown
              </h3>
              <span className="text-xs text-[#2E6B4F] font-bold bg-[#2E6B4F]/10 px-3 py-1 rounded-full">
                Next Settlement: Nov 05, 2026
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4]">
                <span className="text-[#5B6475] block">Gross Consultations (Oct)</span>
                <strong className="text-xl font-serif font-bold text-[#14284B]">₹1,12,000</strong>
              </div>
              <div className="p-4 bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4]">
                <span className="text-[#5B6475] block">Platform Fee (10%)</span>
                <strong className="text-xl font-serif font-bold text-[#A3382F]">-₹11,200</strong>
              </div>
              <div className="p-4 bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4]">
                <span className="text-[#5B6475] block">Net Payable to Bank</span>
                <strong className="text-xl font-serif font-bold text-[#2E6B4F]">₹1,00,800</strong>
              </div>
            </div>
          </div>
        )}

        {/* Prescription Modal */}
        <PrescriptionModal
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
        />
      </div>
    </div>
  );
};

