import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  Calendar,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Stethoscope,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, switchUserRole } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleRoleChange = (role: 'patient' | 'doctor' | 'guest') => {
    switchUserRole(role);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    if (role === 'doctor') {
      navigate('/doctor/dashboard');
    } else if (role === 'patient') {
      navigate('/patient/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EC]/95 backdrop-blur-md border-b border-[#E3DAC4] transition-all">
      {/* Top micro banner for trust & emergency guidance */}
      <div className="bg-[#14284B] text-[#FAF6EC] px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#DCE4F2]" />
            <span>National Medical Council Verified Practitioners • End-to-End Encrypted Telehealth</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-[#DCE4F2]">
            <span>Urgent Emergency? Dial <strong>112 / 108</strong></span>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] opacity-80">Quick Demo Switch:</span>
              <button
                onClick={() => handleRoleChange('patient')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  currentUser?.role === 'patient'
                    ? 'bg-[#FAF6EC] text-[#14284B]'
                    : 'bg-[#14284B] text-[#DCE4F2] hover:bg-[#0E1D38] border border-[#2F4C86]'
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => handleRoleChange('doctor')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  currentUser?.role === 'doctor'
                    ? 'bg-[#FAF6EC] text-[#14284B]'
                    : 'bg-[#14284B] text-[#DCE4F2] hover:bg-[#0E1D38] border border-[#2F4C86]'
                }`}
              >
                Doctor
              </button>
              <button
                onClick={() => handleRoleChange('guest')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  !currentUser
                    ? 'bg-[#FAF6EC] text-[#14284B]'
                    : 'bg-[#14284B] text-[#DCE4F2] hover:bg-[#0E1D38] border border-[#2F4C86]'
                }`}
              >
                Guest
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#2F4C86] rounded-lg p-1">
            <img
              src="/logo.png"
              alt="Anvit Logo"
              className="w-10 h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#14284B] leading-none">
                Anvit
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#5B6475] font-semibold mt-1">
                Healthcare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/doctors"
              className={`text-sm font-medium transition-colors hover:text-[#14284B] ${
                isActive('/doctors')
                  ? 'text-[#14284B] font-semibold border-b-2 border-[#14284B] pb-1'
                  : 'text-[#5B6475]'
              }`}
            >
              Find Doctors
            </Link>
            <Link
              to="/specialties"
              className={`text-sm font-medium transition-colors hover:text-[#14284B] ${
                isActive('/specialties')
                  ? 'text-[#14284B] font-semibold border-b-2 border-[#14284B] pb-1'
                  : 'text-[#5B6475]'
              }`}
            >
              Specialties
            </Link>
            <Link
              to="/#how-it-works"
              className="text-sm font-medium text-[#5B6475] hover:text-[#14284B] transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/#safety"
              className="text-sm font-medium text-[#5B6475] hover:text-[#14284B] transition-colors"
            >
              Clinical Quality
            </Link>
          </nav>

          {/* Desktop Action & Profile Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-[#E3DAC4] bg-[#FFFDF7] hover:bg-[#F2ECDD] transition text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#E3DAC4]"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#1B2433] leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#2E6B4F] tracking-wide">
                      {currentUser.role === 'doctor' ? 'Clinician' : 'Patient'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#5B6475]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#FFFDF7] border border-[#E3DAC4] shadow-lg py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#E3DAC4]/60">
                      <p className="text-xs text-[#5B6475]">Signed in as</p>
                      <p className="text-sm font-semibold text-[#14284B] truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === 'patient' ? (
                      <>
                        <Link
                          to="/patient/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-[#1B2433] hover:bg-[#FAF6EC] transition"
                        >
                          <Calendar className="w-4 h-4 text-[#14284B]" />
                          Patient Dashboard & Records
                        </Link>
                        <Link
                          to="/doctors"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-[#1B2433] hover:bg-[#FAF6EC] transition"
                        >
                          <Stethoscope className="w-4 h-4 text-[#14284B]" />
                          Book New Consultation
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/doctor/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-[#1B2433] hover:bg-[#FAF6EC] transition"
                        >
                          <Calendar className="w-4 h-4 text-[#14284B]" />
                          Doctor Clinic & Schedule
                        </Link>
                        <Link
                          to="/doctor/dashboard?tab=queue"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-[#1B2433] hover:bg-[#FAF6EC] transition"
                        >
                          <PhoneCall className="w-4 h-4 text-[#2E6B4F]" />
                          Live Consultation Queue
                        </Link>
                      </>
                    )}

                    <div className="border-t border-[#E3DAC4]/60 my-1"></div>

                    {/* Quick Persona Switcher in dropdown */}
                    <div className="px-4 py-2">
                      <span className="text-[11px] font-semibold text-[#5B6475] uppercase tracking-wider block mb-1.5">
                        Switch Workspace Mode
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => handleRoleChange('patient')}
                          className={`text-xs py-1 px-2 rounded font-medium border ${
                            currentUser.role === 'patient'
                              ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                              : 'bg-white text-[#5B6475] border-[#E3DAC4] hover:bg-[#FAF6EC]'
                          }`}
                        >
                          Patient
                        </button>
                        <button
                          onClick={() => handleRoleChange('doctor')}
                          className={`text-xs py-1 px-2 rounded font-medium border ${
                            currentUser.role === 'doctor'
                              ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                              : 'bg-white text-[#5B6475] border-[#E3DAC4] hover:bg-[#FAF6EC]'
                          }`}
                        >
                          Doctor
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-[#E3DAC4]/60 my-1"></div>

                    <button
                      onClick={() => handleRoleChange('guest')}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#A3382F] hover:bg-[#FAF6EC] transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#14284B] hover:text-[#0E1D38] hover:bg-[#F2ECDD] rounded-xl transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-[#14284B] border border-[#14284B] hover:bg-[#FAF6EC] rounded-xl transition"
                >
                  Register
                </Link>
                <Link
                  to="/doctors"
                  className="px-5 py-2 text-sm font-semibold bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl shadow-sm hover:shadow transition flex items-center gap-2"
                >
                  <span>Book Consult</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#14284B] hover:bg-[#F2ECDD] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6EC] border-b border-[#E3DAC4] px-4 pt-3 pb-6 space-y-4 animate-fade-in">
          {/* Persona quick switch mobile */}
          <div className="bg-[#FFFDF7] p-3 rounded-xl border border-[#E3DAC4]">
            <span className="text-xs font-semibold text-[#5B6475] block mb-2">
              Viewing Mode
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleRoleChange('patient')}
                className={`py-1.5 text-xs font-semibold rounded-lg border text-center ${
                  currentUser?.role === 'patient'
                    ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                    : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4]'
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => handleRoleChange('doctor')}
                className={`py-1.5 text-xs font-semibold rounded-lg border text-center ${
                  currentUser?.role === 'doctor'
                    ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                    : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4]'
                }`}
              >
                Doctor
              </button>
              <button
                onClick={() => handleRoleChange('guest')}
                className={`py-1.5 text-xs font-semibold rounded-lg border text-center ${
                  !currentUser
                    ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                    : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4]'
                }`}
              >
                Guest
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              to="/doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#1B2433] hover:bg-[#F2ECDD]"
            >
              Find Doctors & Specialists
            </Link>
            <Link
              to="/specialties"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#1B2433] hover:bg-[#F2ECDD]"
            >
              Browse Specialties
            </Link>
            {currentUser?.role === 'patient' && (
              <Link
                to="/patient/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-[#14284B] bg-[#FFFDF7] border border-[#E3DAC4]"
              >
                Patient Dashboard & Records
              </Link>
            )}
            {currentUser?.role === 'doctor' && (
              <Link
                to="/doctor/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-[#14284B] bg-[#FFFDF7] border border-[#E3DAC4]"
              >
                Doctor Clinic & Appointments
              </Link>
            )}
          </div>

          <div className="pt-2 border-t border-[#E3DAC4] flex flex-col gap-2">
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-[#14284B] text-[#14284B] font-semibold text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-[#14284B] text-[#FAF6EC] font-semibold text-sm"
                >
                  Create Patient Account
                </Link>
                <Link
                  to="/doctor/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs text-[#5B6475] hover:text-[#14284B]"
                >
                  Are you a Doctor? Join Anvit Network
                </Link>
              </>
            ) : (
              <button
                onClick={() => handleRoleChange('guest')}
                className="w-full text-center py-2.5 rounded-xl bg-[#FFFDF7] border border-[#A3382F] text-[#A3382F] font-semibold text-sm"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

