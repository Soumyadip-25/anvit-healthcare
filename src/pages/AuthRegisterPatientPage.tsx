import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, Phone, ArrowRight, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthRegisterPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('O+ Positive');
  const [consent, setConsent] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setCurrentUser({
      id: `patient-${Date.now()}`,
      name,
      email,
      phone,
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      bloodGroup,
      age: Number(age),
      gender,
      emergencyContact: '+91 98765 00000 (Family)',
      allergies: ['None recorded'],
    });

    navigate('/patient/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-16 flex items-center justify-center px-4">
      <div className="bg-[#FFFDF7] w-full max-w-lg rounded-3xl border border-[#E3DAC4] shadow-xl p-8 sm:p-10 space-y-6 animate-fade-in">
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center justify-center group" aria-label="Anvit Home">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-[2.5px] border-[#14284B] shadow-md bg-[#FAF6EC] flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Anvit Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14284B] pt-2">
            Create Patient Account
          </h2>
          <p className="text-xs text-[#5B6475]">
            Access top specialists, instant e-prescriptions, and lifetime medical records.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-[#14284B] block mb-1">Full Legal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Meera Raman"
              className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433] focus:outline-none focus:border-[#14284B]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#14284B] block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="meera@example.com"
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433] focus:outline-none focus:border-[#14284B]"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-[#14284B] block mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433] focus:outline-none focus:border-[#14284B]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-[#14284B] block mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
              />
            </div>
            <div>
              <label className="font-semibold text-[#14284B] block mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[#14284B] block mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
              >
                <option value="O+ Positive">O+ Positive</option>
                <option value="A+ Positive">A+ Positive</option>
                <option value="B+ Positive">B+ Positive</option>
                <option value="AB+ Positive">AB+ Positive</option>
                <option value="O- Negative">O- Negative</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-[#14284B] block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-[#1B2433]"
              required
            />
          </div>

          <div className="p-3 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4]">
            <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#5B6475]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="accent-[#14284B] mt-0.5"
                required
              />
              <span>
                I agree to the <strong>Terms of Clinical Service</strong> and authorize Anvit to store my digital consultation records encrypted under Telemedicine Practice Guidelines (2020).
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Create Patient Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#E3DAC4] text-center text-xs text-[#5B6475]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#14284B] hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

