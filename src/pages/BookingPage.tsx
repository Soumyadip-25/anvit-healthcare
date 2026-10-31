import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  Phone,
  Building,
  ShieldCheck,
  CreditCard,
  QrCode,
  Tag,
  ArrowRight,
  User,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConsultationType, Appointment } from '../types';

export const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { doctors, currentUser, bookAppointment } = useApp();

  const doctor = doctors.find(d => d.id === id || d.slug === id);

  // Booking details from query params or defaults
  const [consultType, setConsultType] = useState<ConsultationType>(
    (searchParams.get('type') as ConsultationType) || 'video'
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    searchParams.get('date') || doctor?.availability[0]?.date || '2026-10-31'
  );
  const [selectedSlot, setSelectedSlot] = useState<string>(
    searchParams.get('slot') || doctor?.availability[0]?.slots.find(s => s.available)?.time || '04:30 PM'
  );

  // Wizard step: 1 = Details, 2 = Patient Info, 3 = Payment Review, 4 = Success
  const [step, setStep] = useState<number>(1);

  // Patient Info Form State
  const [patientName, setPatientName] = useState(currentUser?.name || '');
  const [patientEmail, setPatientEmail] = useState(currentUser?.email || '');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [symptoms, setSymptoms] = useState('');
  const [patientAge, setPatientAge] = useState('32');
  const [patientGender, setPatientGender] = useState('Male');

  // Payment states
  const [couponCode, setCouponCode] = useState('ANVITHEALTH');
  const [couponApplied, setCouponApplied] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (currentUser) {
      if (!patientName) setPatientName(currentUser.name);
      if (!patientEmail) setPatientEmail(currentUser.email);
      if (!patientPhone) setPatientPhone(currentUser.phone);
    }
  }, [currentUser]);

  if (!doctor) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="font-serif text-2xl font-bold text-[#14284B]">Doctor Not Found</h2>
        <Link to="/doctors" className="mt-4 px-5 py-2.5 rounded-xl bg-[#14284B] text-[#FAF6EC] text-xs font-bold">
          Browse Doctors
        </Link>
      </div>
    );
  }

  // Cost calculations
  const doctorFee = doctor.consultationFee;
  const platformFee = 0; // Free promotion
  const discount = couponApplied ? 150 : 0;
  const totalAmount = Math.max(0, doctorFee - discount);

  const handleConfirmAndPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const apt = bookAppointment({
        doctorId: doctor.id,
        patientName: patientName || 'Patient',
        patientEmail: patientEmail || 'patient@example.com',
        patientPhone: patientPhone || '+91 98765 43210',
        consultationType: consultType,
        date: selectedDate,
        timeSlot: selectedSlot,
        symptoms: symptoms || 'Routine medical checkup and health evaluation.',
      });
      setConfirmedAppointment(apt);
      setIsProcessing(false);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step indicator header (if not step 4) */}
        {step < 4 && (
          <div className="mb-10 text-center">
            <h1 className="font-serif text-3xl font-bold text-[#14284B]">
              Book Consultation with {doctor.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6475] mt-1">
              Follow 3 quick steps to secure your clinical consultation slot.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              {[
                { num: 1, label: 'Mode & Slot' },
                { num: 2, label: 'Patient Info' },
                { num: 3, label: 'Review & Pay' },
              ].map(s => (
                <div key={s.num} className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      step >= s.num
                        ? 'bg-[#14284B] text-[#FAF6EC]'
                        : 'bg-[#FAF6EC] text-[#5B6475] border border-[#E3DAC4]'
                    }`}
                  >
                    {s.num}
                  </span>
                  <span className={`text-xs font-semibold ${step >= s.num ? 'text-[#14284B]' : 'text-[#5B6475]'}`}>
                    {s.label}
                  </span>
                  {s.num < 3 && <span className="w-8 h-[1px] bg-[#E3DAC4] hidden sm:block"></span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Slot and Consultation Type Confirmation */}
        {step === 1 && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            {/* Doctor mini recap */}
            <div className="flex items-center gap-4 pb-6 border-b border-[#E3DAC4]">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-16 h-16 rounded-2xl object-cover border border-[#E3DAC4]"
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#14284B]">{doctor.name}</h3>
                <p className="text-xs text-[#5B6475]">{doctor.title} • {doctor.hospitalAffiliation}</p>
                <p className="text-xs font-semibold text-[#2E6B4F] mt-0.5">
                  Fee: ₹{doctor.consultationFee}
                </p>
              </div>
            </div>

            {/* Mode selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#14284B] block mb-2">
                Consultation Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'video', label: 'Video Call', icon: Video, desc: 'Secure HD room, screen share' },
                  { id: 'audio', label: 'Audio Call', icon: Phone, desc: 'Encrypted voice consult' },
                  { id: 'in-person', label: 'In-Clinic', icon: Building, desc: 'In-person hospital appointment' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setConsultType(item.id as ConsultationType)}
                      className={`p-4 rounded-2xl border text-left transition ${
                        consultType === item.id
                          ? 'bg-[#FAF6EC] border-[#14284B] shadow-sm'
                          : 'bg-[#FFFDF7] border-[#E3DAC4] hover:bg-[#FAF6EC]'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#14284B] mb-2" />
                      <strong className="text-xs font-bold text-[#14284B] block">{item.label}</strong>
                      <span className="text-[11px] text-[#5B6475]">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#14284B] block mb-2">
                Choose Date & Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                {doctor.availability.map(avail => (
                  <button
                    key={avail.date}
                    onClick={() => setSelectedDate(avail.date)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                      selectedDate === avail.date
                        ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                        : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4] hover:bg-white'
                    }`}
                  >
                    {avail.displayDate}
                  </button>
                ))}
              </div>

              {/* Time slot pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {doctor.availability.find(a => a.date === selectedDate)?.slots.map(s => (
                  <button
                    key={s.time}
                    disabled={!s.available}
                    onClick={() => setSelectedSlot(s.time)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${
                      selectedSlot === s.time
                        ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                        : s.available
                        ? 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4] hover:bg-white'
                        : 'bg-[#F2ECDD]/40 text-[#5B6475]/40 border-transparent cursor-not-allowed'
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E3DAC4] flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2"
              >
                <span>Continue to Patient Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Patient Information & Symptoms */}
        {step === 2 && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <h3 className="font-serif text-lg font-bold text-[#14284B]">
              Patient Contact & Clinical Symptoms
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-[#14284B] block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433] focus:outline-none focus:border-[#14284B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#14284B] block mb-1">Phone Number (with WhatsApp)</label>
                <input
                  type="text"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433] focus:outline-none focus:border-[#14284B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#14284B] block mb-1">Email Address for Prescription</label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="rahul.sharma@example.com"
                  className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433] focus:outline-none focus:border-[#14284B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Symptoms Description */}
            <div>
              <label className="font-semibold text-[#14284B] text-xs block mb-1">
                Describe Symptoms / Health Concerns
              </label>
              <textarea
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Mention what you are experiencing (e.g., headache for 3 days, severity, previous treatments tried)..."
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-3 text-xs text-[#1B2433] focus:outline-none focus:border-[#14284B]"
              />
            </div>

            <div className="pt-6 border-t border-[#E3DAC4] flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-[#E3DAC4] text-xs font-semibold rounded-xl text-[#5B6475] hover:bg-[#FAF6EC]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2"
              >
                <span>Proceed to Review & Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Payment Simulation */}
        {step === 3 && (
          <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <h3 className="font-serif text-lg font-bold text-[#14284B]">
              Appointment Review & Payment
            </h3>

            {/* Summary card */}
            <div className="p-4 bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5B6475]">Doctor:</span>
                <strong className="text-[#14284B]">{doctor.name} ({doctor.specialtyName})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6475]">Date & Slot:</span>
                <strong className="text-[#14284B]">{selectedDate} at {selectedSlot}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6475]">Consultation Type:</span>
                <strong className="text-[#14284B] uppercase font-semibold">{consultType} Consultation</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6475]">Patient:</span>
                <strong className="text-[#14284B]">{patientName}</strong>
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-[#5B6475] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Promo Code"
                  className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl pl-9 pr-3 py-2 text-xs font-mono font-bold uppercase text-[#14284B]"
                />
              </div>
              <button
                type="button"
                onClick={() => setCouponApplied(couponCode === 'ANVITHEALTH')}
                className="px-4 py-2 bg-[#14284B] text-[#FAF6EC] rounded-xl text-xs font-semibold"
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="text-[11px] text-[#2E6B4F] font-semibold">
                ✓ Coupon code ANVITHEALTH applied: ₹150 off first consultation!
              </p>
            )}

            {/* Fee Breakdown */}
            <div className="space-y-2 text-xs pt-2 border-t border-[#E3DAC4]">
              <div className="flex justify-between text-[#5B6475]">
                <span>Doctor Consultation Fee</span>
                <span>₹{doctorFee}</span>
              </div>
              <div className="flex justify-between text-[#5B6475]">
                <span>Platform & Encrypted Telehealth Charge</span>
                <span className="text-[#2E6B4F] font-semibold">₹0 (Waived)</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-[#2E6B4F] font-semibold">
                  <span>Welcome Health Discount</span>
                  <span>-₹150</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#14284B] pt-2 border-t border-[#E3DAC4]">
                <span>Total Amount Payable</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* Payment Mode Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#14284B] block mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'upi', label: 'UPI / GPay / QR', icon: QrCode },
                  { id: 'card', label: 'Cards (Visa/MC)', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking', icon: Building },
                ].map(pm => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                        paymentMethod === pm.id
                          ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                          : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4] hover:bg-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-semibold">{pm.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E3DAC4] flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-[#E3DAC4] text-xs font-semibold rounded-xl text-[#5B6475] hover:bg-[#FAF6EC]"
              >
                Back
              </button>
              <button
                disabled={isProcessing}
                onClick={handleConfirmAndPay}
                className="px-8 py-3.5 bg-[#2E6B4F] hover:bg-[#23533D] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>Securing slot & verifying payment...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ₹{totalAmount}</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirmed Success State */}
        {step === 4 && confirmedAppointment && (
          <div className="bg-[#FFFDF7] rounded-3xl border-2 border-[#2E6B4F]/40 p-8 sm:p-12 shadow-xl text-center space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#2E6B4F]/10 border-2 border-[#2E6B4F] text-[#2E6B4F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B4F] bg-[#2E6B4F]/10 px-3 py-1 rounded-full">
                Appointment Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#14284B] mt-2">
                You're all set for consultation!
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6475] mt-1">
                A confirmation SMS and calendar invite have been sent to <strong>{confirmedAppointment.patientPhone}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4] p-5 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-[#E3DAC4] pb-2">
                <span className="text-[#5B6475]">Appointment Reference:</span>
                <strong className="text-[#14284B] font-mono">{confirmedAppointment.id.toUpperCase()}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6475]">Doctor:</span>
                <strong className="text-[#14284B]">{confirmedAppointment.doctorName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6475]">Date & Time:</span>
                <strong className="text-[#14284B]">{confirmedAppointment.date} at {confirmedAppointment.timeSlot}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6475]">Mode:</span>
                <strong className="text-[#2E6B4F] uppercase">{confirmedAppointment.consultationType} Consultation</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5B6475]">Invoice / Amount Paid:</span>
                <strong className="text-[#14284B]">{confirmedAppointment.invoiceNumber} (₹{confirmedAppointment.amountPaid})</strong>
              </div>
            </div>

            {/* Direct Telehealth Room & Dashboard Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to={`/consult/${confirmedAppointment.id}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#14284B] hover:bg-[#0E1D38] text-[#FAF6EC] rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Enter Live Consult Room Preview</span>
              </Link>
              <Link
                to="/patient/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FAF6EC] hover:bg-[#F2ECDD] text-[#14284B] border border-[#E3DAC4] rounded-xl text-xs sm:text-sm font-semibold transition"
              >
                Go to Patient Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

