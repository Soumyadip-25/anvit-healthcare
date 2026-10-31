import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchUserRole } = useApp();

  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleQuickDemoPatient = () => {
    switchUserRole('patient');
    navigate('/patient/dashboard');
  };

  const handleQuickDemoDoctor = () => {
    switchUserRole('doctor');
    navigate('/doctor/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both your registered email and password.');
      return;
    }

    if (activeTab === 'patient') {
      switchUserRole('patient');
      navigate('/patient/dashboard');
    } else {
      switchUserRole('doctor');
      navigate('/doctor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-16 flex items-center justify-center px-4">
      <div className="bg-[#FFFDF7] w-full max-w-md rounded-3xl border border-[#E3DAC4] shadow-xl p-8 sm:p-10 space-y-6 animate-fade-in">
        {/* Brand header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center justify-center group" aria-label="Anvit Home">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-[2.5px] border-[#14284B] shadow-md bg-[#FAF6EC] flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Anvit Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <h2 className="font-serif text-2xl font-bold text-[#14284B] pt-2">
            Sign In to Your Portal
          </h2>
          <p className="text-xs text-[#5B6475]">
            Encrypted credentials • Medical data privacy strictly enforced
          </p>
        </div>

        {/* Portal Role Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#FAF6EC] p-1.5 rounded-2xl border border-[#E3DAC4] text-xs font-bold">
          <button
            onClick={() => setActiveTab('patient')}
            className={`py-2 rounded-xl transition ${
              activeTab === 'patient'
                ? 'bg-[#14284B] text-[#FAF6EC] shadow-sm'
                : 'text-[#5B6475] hover:text-[#14284B]'
            }`}
          >
            Patient Portal
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`py-2 rounded-xl transition ${
              activeTab === 'doctor'
                ? 'bg-[#14284B] text-[#FAF6EC] shadow-sm'
                : 'text-[#5B6475] hover:text-[#14284B]'
            }`}
          >
            Doctor Portal
          </button>
        </div>

        {/* Quick 1-Click Demo Buttons */}
        <div className="p-4 bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4] space-y-2 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#14284B] block">
            ⚡ Instant 1-Click Demo Test Drive
          </span>
          {activeTab === 'patient' ? (
            <button
              onClick={handleQuickDemoPatient}
              className="w-full py-2.5 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In as Demo Patient (Rahul Sharma)</span>
            </button>
          ) : (
            <button
              onClick={handleQuickDemoDoctor}
              className="w-full py-2.5 bg-[#2E6B4F] text-white hover:bg-[#23533D] rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Sign In as Demo Doctor (Dr. Priya Sharma)</span>
            </button>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <span className="w-full border-t border-[#E3DAC4]"></span>
          <span className="bg-[#FFFDF7] px-3 text-[11px] text-[#5B6475] uppercase font-semibold">Or with credentials</span>
          <span className="w-full border-t border-[#E3DAC4]"></span>
        </div>

        {error && (
          <div className="p-3 bg-[#A3382F]/10 text-[#A3382F] rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Standard Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-[#14284B] block mb-1">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5B6475] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activeTab === 'patient' ? 'rahul.sharma@example.com' : 'priya.sharma@anvithealth.org'}
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl pl-9 pr-3 py-2.5 text-[#1B2433] focus:outline-none focus:border-[#14284B]"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#14284B] block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5B6475] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl pl-9 pr-3 py-2.5 text-[#1B2433] focus:outline-none focus:border-[#14284B]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#5B6475]">
              <input type="checkbox" defaultChecked className="accent-[#14284B]" />
              <span>Remember session</span>
            </label>
            <a href="#reset" className="text-[#14284B] font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
          >
            Sign In to {activeTab === 'patient' ? 'Patient Portal' : 'Doctor Clinic'}
          </button>
        </form>

        {/* Footer link to register */}
        <div className="pt-4 border-t border-[#E3DAC4] text-center text-xs text-[#5B6475]">
          Don't have an account yet?{' '}
          {activeTab === 'patient' ? (
            <Link to="/register" className="font-bold text-[#14284B] hover:underline">
              Create Patient Account
            </Link>
          ) : (
            <Link to="/doctor/register" className="font-bold text-[#14284B] hover:underline">
              Apply as Verified Clinician
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

