import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Stethoscope, UploadCloud, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SPECIALTIES } from '../data/mockData';

export const AuthRegisterDoctorPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [stateCouncil, setStateCouncil] = useState('Delhi Medical Council');
  const [specialtyId, setSpecialtyId] = useState('cardiology');
  const [qualifications, setQualifications] = useState('');
  const [experienceYears, setExperienceYears] = useState('12');
  const [hospital, setHospital] = useState('');
  const [fee, setFee] = useState('1200');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specialty = SPECIALTIES.find(s => s.id === specialtyId);

    setCurrentUser({
      id: `doc-${Date.now()}`,
      name: name.startsWith('Dr.') ? name : `Dr. ${name}`,
      email,
      phone,
      role: 'doctor',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
      specialtyId,
      specialtyName: specialty?.name || 'General Medicine',
      registrationNumber: regNumber,
      experienceYears: Number(experienceYears),
      hospitalAffiliation: hospital || 'Independent Clinical Practice',
      consultationFee: Number(fee),
      isVerified: true,
    });

    navigate('/doctor/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-16 flex items-center justify-center px-4">
      <div className="bg-[#FFFDF7] w-full max-w-xl rounded-3xl border border-[#E3DAC4] shadow-xl p-8 sm:p-10 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src="/logo.png" alt="Anvit Logo" className="w-10 h-10 object-contain" />
            <span className="font-serif text-2xl font-bold text-[#14284B]">Anvit</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E6B4F]/10 text-[#2E6B4F] text-xs font-bold mt-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinician Network Onboarding</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14284B]">
            Practitioner Registration
          </h2>
          <p className="text-xs text-[#5B6475]">
            Join India's premier digital clinical network. Set your own fees and consult verified patients.
          </p>
        </div>

        {/* Multi-step progress pill */}
        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[#5B6475] pb-2 border-b border-[#E3DAC4]">
          <span className={step >= 1 ? 'text-[#14284B] font-bold' : ''}>1. Credentials</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-[#14284B] font-bold' : ''}>2. Specialization</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-[#14284B] font-bold' : ''}>3. Document Verification</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="font-semibold text-[#14284B] block mb-1">Full Legal Medical Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Raghav Deshmukh"
                  className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Official Professional Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="raghav@hospital.org"
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Mobile Contact</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98111 22334"
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Medical Registration Number (MRN)</label>
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="e.g. DMC-2012-98412"
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433] font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">State / National Medical Council</label>
                  <select
                    value={stateCouncil}
                    onChange={(e) => setStateCouncil(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  >
                    <option value="Delhi Medical Council">Delhi Medical Council</option>
                    <option value="Karnataka Medical Council">Karnataka Medical Council</option>
                    <option value="Maharashtra Medical Council">Maharashtra Medical Council</option>
                    <option value="Tamil Nadu Medical Council">Tamil Nadu Medical Council</option>
                    <option value="West Bengal Medical Council">West Bengal Medical Council</option>
                    <option value="National Medical Commission">National Medical Commission (Direct)</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl font-bold transition flex items-center justify-center gap-2 mt-4"
              >
                <span>Continue to Practice Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Clinical Specialty</label>
                  <select
                    value={specialtyId}
                    onChange={(e) => setSpecialtyId(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  >
                    {SPECIALTIES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Clinical Experience (Years)</label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#14284B] block mb-1">Academic Qualifications & Institute</label>
                <input
                  type="text"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  placeholder="e.g. MBBS, MD (Medicine), DM (Cardiology) - AIIMS"
                  className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Hospital / Clinic Affiliation</label>
                  <input
                    type="text"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    placeholder="e.g. Max Super Speciality Hospital"
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14284B] block mb-1">Standard Telehealth Fee (₹)</label>
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 border border-[#E3DAC4] rounded-xl text-[#5B6475] font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <span>Continue to Verification Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-6 bg-[#FAF6EC] rounded-2xl border-2 border-dashed border-[#E3DAC4] text-center space-y-3">
                <UploadCloud className="w-10 h-10 text-[#14284B] mx-auto" />
                <div>
                  <strong className="text-sm text-[#14284B] block font-semibold">
                    Upload State / National Registration Certificate
                  </strong>
                  <span className="text-[11px] text-[#5B6475]">PDF, JPG or PNG up to 10MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFileUploaded(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    fileUploaded
                      ? 'bg-[#2E6B4F] text-white'
                      : 'bg-[#FFFDF7] border border-[#14284B] text-[#14284B]'
                  }`}
                >
                  {fileUploaded ? '✓ Medical_Reg_Certificate.pdf Uploaded' : 'Browse Files to Upload'}
                </button>
              </div>

              <div className="p-3 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4] text-[11px] text-[#5B6475] leading-relaxed">
                By clicking Submit Application, I declare that I am a registered medical practitioner authorized to practice modern medicine and agree to abide by the Telemedicine Practice Guidelines issued by the Ministry of Health & Family Welfare.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 border border-[#E3DAC4] rounded-xl text-[#5B6475] font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#2E6B4F] hover:bg-[#23533D] text-white rounded-xl font-bold shadow-md transition flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit & Launch Doctor Clinic</span>
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="pt-4 border-t border-[#E3DAC4] text-center text-xs text-[#5B6475]">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#14284B] hover:underline">
            Doctor Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

