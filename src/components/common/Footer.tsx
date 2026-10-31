import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Heart, Phone, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#14284B] text-[#FAF6EC] border-t border-[#0E1D38] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2F4C86]/50">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#DCE4F2] shadow-sm bg-[#FAF6EC] flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Anvit"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF6EC]">
                Anvit
              </span>
            </div>
            <p className="text-sm text-[#DCE4F2] leading-relaxed max-w-sm">
              Anvit connects patients with verified clinical specialists across India and worldwide.
              Elevated, thoughtful healthcare with transparent pricing, instant digital prescriptions, and compassionate bedside manner.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-[#DCE4F2]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2E6B4F]" />
                <span>NMC Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#DCE4F2]" />
                <span>256-Bit Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#8A5A0B]" />
                <span>ISO 27001</span>
              </div>
            </div>
          </div>

          {/* Quick clinical links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FAF6EC] mb-4">
              Specialist Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DCE4F2]">
              <li>
                <Link to="/doctors?specialty=cardiology" className="hover:text-white transition">
                  Cardiology & Heart Care
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialty=dermatology" className="hover:text-white transition">
                  Dermatology & Skin
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialty=neurology" className="hover:text-white transition">
                  Neurology & Headache
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialty=pediatrics" className="hover:text-white transition">
                  Pediatrics & Child Care
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialty=psychiatry" className="hover:text-white transition">
                  Psychiatry & Mind
                </Link>
              </li>
              <li>
                <Link to="/specialties" className="text-white underline underline-offset-4 font-medium hover:text-[#DCE4F2] transition">
                  View All 12+ Specialties →
                </Link>
              </li>
            </ul>
          </div>

          {/* Patients & Telehealth */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FAF6EC] mb-4">
              Patient Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DCE4F2]">
              <li>
                <Link to="/doctors" className="hover:text-white transition">
                  Book Video Consultation
                </Link>
              </li>
              <li>
                <Link to="/patient/dashboard" className="hover:text-white transition">
                  Patient Records & Rx
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-white transition">
                  How Telehealth Works
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-white transition">
                  Consultation FAQs
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Patient Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinicians & Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FAF6EC] mb-4">
              For Medical Practitioners
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DCE4F2]">
              <li>
                <Link to="/doctor/register" className="hover:text-white transition">
                  Apply as Doctor / Clinician
                </Link>
              </li>
              <li>
                <Link to="/doctor/dashboard" className="hover:text-white transition">
                  Doctor Clinic Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Practitioner Sign In
                </Link>
              </li>
              <li className="pt-2">
                <div className="bg-[#0E1D38] p-3 rounded-xl border border-[#2F4C86]/60">
                  <span className="text-xs text-[#DCE4F2] block font-medium">Need Support?</span>
                  <div className="flex items-center gap-1.5 mt-1 text-sm font-semibold text-white">
                    <Phone className="w-3.5 h-3.5" />
                    <span>care@anvithealth.org</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency clinical disclaimer */}
        <div className="mt-8 bg-[#0E1D38]/80 border border-[#A3382F]/40 rounded-2xl p-4 text-xs text-[#DCE4F2] leading-relaxed">
          <p className="font-semibold text-[#FAF6EC] mb-1 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#A3382F]"></span>
            Important Emergency Care Notice:
          </p>
          <p>
            Anvit is a digital consultation platform for non-emergency medical evaluations and planned outpatient care.
            If you or someone near you is experiencing severe trauma, chest pain, stroke symptoms, uncontrolled bleeding,
            or acute respiratory distress, do not wait for an online consult. <strong>Please immediately dial 112 (India) or your local emergency response service, or proceed to the nearest emergency trauma center.</strong>
          </p>
        </div>

        {/* Copyright & bottom bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE4F2]">
          <p>© {new Date().getFullYear()} Anvit Healthcare Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Clinical Service</a>
            <a href="#telemedicine" className="hover:text-white transition">Telemedicine Practice Guidelines (2020)</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

