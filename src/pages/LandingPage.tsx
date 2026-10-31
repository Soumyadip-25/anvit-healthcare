import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Video,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileText,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SPECIALTIES, TESTIMONIALS, FAQS } from '../data/mockData';
import { DoctorCard } from '../components/common/DoctorCard';
import { SpecialtyCard } from '../components/common/SpecialtyCard';

export const LandingPage: React.FC = () => {
  const { doctors } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/doctors');
    }
  };

  const featuredDoctors = doctors.slice(0, 4);
  const featuredSpecialties = SPECIALTIES.slice(0, 6);

  const quickSearchTags = [
    { label: 'Cardiologist', query: 'Cardiology' },
    { label: 'Skin & Hair', query: 'Dermatology' },
    { label: 'Fever & Cough', query: 'General Medicine' },
    { label: 'Migraine / Vertigo', query: 'Neurology' },
    { label: 'PCOS / Periods', query: 'Gynecology' },
    { label: 'Anxiety / Sleep', query: 'Psychiatry' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EC] text-[#1B2433]">
      {/* Editorial Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-[#E3DAC4]">
        {/* Soft background subtle radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#DCE4F2]/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF7] border border-[#E3DAC4] shadow-sm text-xs font-semibold text-[#14284B] mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#2E6B4F] animate-pulse"></span>
            <span>National Telemedicine Guidelines Compliant • 100% Verified Clinicians</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#14284B] max-w-4xl mx-auto leading-[1.12]">
            Exceptional clinical care, from the comfort of your sanctuary.
          </h1>

          {/* Reassuring Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-[#5B6475] max-w-2xl mx-auto leading-relaxed">
            Consult India's and the world's most distinguished medical specialists via secure video, audio, or in-person visits. Transparent pricing, verified credentials, and instant digital prescriptions.
          </p>

          {/* Search Box */}
          <div className="mt-10 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-[#FFFDF7] rounded-2xl border-2 border-[#14284B]/20 focus-within:border-[#14284B] p-2 shadow-lg transition-all"
            >
              <div className="pl-3 pr-2 text-[#5B6475]">
                <Search className="w-5 h-5 text-[#14284B]" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by doctor name, medical specialty, or symptom (e.g. Migraine)..."
                className="w-full bg-transparent text-sm sm:text-base text-[#1B2433] placeholder:text-[#5B6475]/70 focus:outline-none py-2"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] px-5 sm:px-7 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
              >
                <span>Find Doctors</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </form>

            {/* Quick Suggestions Chips */}
            <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-xs">
              <span className="text-[#5B6475] font-medium mr-1">Popular:</span>
              {quickSearchTags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/doctors?search=${encodeURIComponent(tag.query)}`)}
                  className="px-2.5 py-1 rounded-lg bg-[#FFFDF7] border border-[#E3DAC4] text-[#14284B] hover:bg-[#DCE4F2] hover:border-[#14284B]/30 font-medium transition"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Quantitative Credibility Stats */}
          <div className="mt-16 pt-10 border-t border-[#E3DAC4]/60 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-3">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B]">
                150k+
              </div>
              <p className="text-xs text-[#5B6475] font-medium mt-1">Consultations Completed</p>
            </div>
            <div className="p-3">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B]">
                4.94 ★
              </div>
              <p className="text-xs text-[#5B6475] font-medium mt-1">Average Patient Rating</p>
            </div>
            <div className="p-3">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B]">
                100%
              </div>
              <p className="text-xs text-[#5B6475] font-medium mt-1">Verified Medical Licenses</p>
            </div>
            <div className="p-3">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B]">
                &lt; 15m
              </div>
              <p className="text-xs text-[#5B6475] font-medium mt-1">Instant Consult Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Now / Instant Consultation Micro Banner */}
      <section className="bg-[#FFFDF7] border-b border-[#E3DAC4] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2E6B4F]/10 border border-[#2E6B4F]/30 flex items-center justify-center flex-shrink-0 text-[#2E6B4F]">
                <PhoneCall className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E6B4F]"></span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#14284B]">
                    Specialists Online Right Now
                  </h4>
                </div>
                <p className="text-xs text-[#5B6475] mt-0.5">
                  General Physicians, Pediatricians & Dermatologists available for immediate teleconsultation.
                </p>
              </div>
            </div>

            <Link
              to="/doctors?online=true"
              className="px-5 py-2.5 rounded-xl bg-[#2E6B4F] text-white hover:bg-[#23533D] text-xs sm:text-sm font-semibold transition shadow-sm flex items-center gap-2 flex-shrink-0"
            >
              <Video className="w-4 h-4" />
              <span>Connect with Online Doctor</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Clinical Specialties */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6475]">
              Comprehensive Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B] mt-1">
              Consult by Specialist Discipline
            </h2>
            <p className="text-sm text-[#5B6475] mt-1.5 max-w-xl">
              From preventative cardiovascular care to delicate pediatric health, find vetted clinicians with proven clinical pedigree.
            </p>
          </div>

          <Link
            to="/specialties"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#14284B] hover:text-[#0E1D38] transition underline underline-offset-4"
          >
            <span>Explore All 12 Specialties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSpecialties.map((specialty) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} />
          ))}
        </div>
      </section>

      {/* Featured Specialists */}
      <section className="py-20 bg-[#FFFDF7] border-y border-[#E3DAC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2E6B4F]">
                Verified Excellence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B] mt-1">
                Distinguished Medical Specialists
              </h2>
              <p className="text-sm text-[#5B6475] mt-1.5 max-w-xl">
                Alumni from AIIMS, CMC Vellore, NIMHANS, and leading global institutes ready to consult you.
              </p>
            </div>

            <Link
              to="/doctors"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#14284B] hover:text-[#0E1D38] transition underline underline-offset-4"
            >
              <span>View All Doctors ({doctors.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6475]">
            Seamless Telehealth Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B] mt-1">
            Care Designed Around Your Schedule
          </h2>
          <p className="text-sm text-[#5B6475] mt-2">
            No endless waiting rooms, no traffic stress. Three clear steps to verified clinical consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-[#FFFDF7] rounded-2xl border border-[#E3DAC4] p-8 shadow-sm relative">
            <div className="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-serif text-xl font-bold flex items-center justify-center mb-6">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14284B] mb-2">
              Select Specialist & Slot
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">
              Explore profiles with transparent doctor fees, hospital credentials, and real patient reviews. Pick a convenient morning or evening time slot.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FFFDF7] rounded-2xl border border-[#E3DAC4] p-8 shadow-sm relative">
            <div className="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-serif text-xl font-bold flex items-center justify-center mb-6">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14284B] mb-2">
              Private Telehealth Consult
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">
              Join the encrypted, browser-based consultation room. Discuss symptoms, share previous lab reports, and receive attentive medical attention.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FFFDF7] rounded-2xl border border-[#E3DAC4] p-8 shadow-sm relative">
            <div className="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-serif text-xl font-bold flex items-center justify-center mb-6">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14284B] mb-2">
              Official Digital Prescription
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">
              Receive your digitally signed e-prescription instantly. Download as PDF, order medicines, or present it at any pharmacy or diagnostic lab.
            </p>
          </div>
        </div>
      </section>

      {/* Clinical Quality & Security Standards */}
      <section id="safety" className="py-20 bg-[#F2ECDD] border-y border-[#E3DAC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2E6B4F]">
                Our Clinical Pledge
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B] mt-1 leading-tight">
                Rigorous Medical Verification & Patient Data Sovereignty
              </h2>
              <p className="text-sm text-[#5B6475] mt-4 leading-relaxed">
                Healthcare requires uncompromised ethics. Anvit adheres strictly to the Ministry of Health and National Medical Commission Telemedicine Guidelines (2020).
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#2E6B4F]/10 border border-[#2E6B4F]/30 flex items-center justify-center text-[#2E6B4F] flex-shrink-0 mt-0.5">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#14284B]">
                      100% Medical Council Verified
                    </h4>
                    <p className="text-xs text-[#5B6475] mt-0.5">
                      Every doctor credentials and active medical registration are manually vetted against state and national council registries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#14284B]/10 border border-[#14284B]/30 flex items-center justify-center text-[#14284B] flex-shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#14284B]">
                      Zero Commercial Ad Targeting / Strict Privacy
                    </h4>
                    <p className="text-xs text-[#5B6475] mt-0.5">
                      Your consultation details, uploaded reports, and prescriptions are strictly private and never shared with advertisers or third parties.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#8A5A0B]/10 border border-[#8A5A0B]/30 flex items-center justify-center text-[#8A5A0B] flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#14284B]">
                      Transparent, Fair Pricing
                    </h4>
                    <p className="text-xs text-[#5B6475] mt-0.5">
                      Direct consultation fees set openly by practitioners with no hidden hospital overheads or unexpected surcharges.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Credibility Card */}
            <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-8 shadow-md">
              <div className="flex items-center gap-3 border-b border-[#E3DAC4] pb-6 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#14284B] shadow-sm bg-[#FAF6EC] flex items-center justify-center flex-shrink-0">
                  <img src="/logo.png" alt="Anvit emblem" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#14284B]">
                    Anvit Clinical Advisory Board
                  </h3>
                  <p className="text-xs text-[#5B6475]">Ensuring gold-standard patient safety protocols</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#5B6475] leading-relaxed">
                <blockquote className="italic border-l-2 border-[#14284B] pl-4 text-[#1B2433]">
                  "Telemedicine on Anvit bridges the geographic barrier between world-class tertiary hospital specialists and families in tier-2/3 cities without compromising diagnostic depth."
                </blockquote>
                <div className="pt-2">
                  <p className="font-semibold text-[#14284B]">Prof. Dr. Rajesh Menon</p>
                  <p className="text-[11px] text-[#5B6475]">Senior Consultant Neurologist • NIMHANS Alumnus</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E3DAC4] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2E6B4F] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Accredited Telehealth Platform
                </span>
                <Link to="/doctors" className="font-bold text-[#14284B] hover:underline">
                  Consult Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient & Doctor Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6475]">
            Real Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B] mt-1">
            Trusted by Thousands of Patients & Clinicians
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FFFDF7] rounded-2xl border border-[#E3DAC4] p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#8A5A0B] mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#8A5A0B]" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#2E6B4F] bg-[#2E6B4F]/10 px-2 py-0.5 rounded-full mb-3 inline-block">
                  {t.tag}
                </span>
                <p className="text-xs sm:text-sm text-[#1B2433] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E3DAC4]/60 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#E3DAC4]"
                />
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#14284B]">{t.author}</h4>
                  <p className="text-[11px] text-[#5B6475]">{t.role} • {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-20 bg-[#FFFDF7] border-t border-[#E3DAC4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6475]">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#E3DAC4] rounded-2xl bg-[#FAF6EC] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-[#14284B] hover:text-[#0E1D38]"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#14284B] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#5B6475] flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5B6475] leading-relaxed border-t border-[#E3DAC4]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ready to Begin Consultation Banner */}
      <section className="py-16 bg-[#14284B] text-[#FAF6EC] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Consult a specialist today with complete peace of mind.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#DCE4F2] max-w-xl mx-auto">
            Book in less than two minutes. No app installation required for video consultations.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/doctors"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FAF6EC] text-[#14284B] hover:bg-white text-sm font-bold shadow-md transition"
            >
              Find a Doctor Now
            </Link>
            <Link
              to="/doctor/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#FAF6EC] text-[#FAF6EC] hover:bg-[#FAF6EC]/10 text-sm font-semibold transition"
            >
              Are You a Doctor? Join Anvit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

