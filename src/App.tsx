import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { LandingPage } from './pages/LandingPage';
import { DoctorDiscoveryPage } from './pages/DoctorDiscoveryPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { DoctorProfilePage } from './pages/DoctorProfilePage';
import { BookingPage } from './pages/BookingPage';
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { DoctorDashboardPage } from './pages/DoctorDashboardPage';
import { ConsultationRoomPage } from './pages/ConsultationRoomPage';
import { AuthLoginPage } from './pages/AuthLoginPage';
import { AuthRegisterPatientPage } from './pages/AuthRegisterPatientPage';
import { AuthRegisterDoctorPage } from './pages/AuthRegisterDoctorPage';

export const App: React.FC = () => {
  const location = useLocation();
  const isConsultRoom = location.pathname.startsWith('/consult');

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6EC] text-[#1B2433]">
      <ScrollToTop />
      {!isConsultRoom && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctors" element={<DoctorDiscoveryPage />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />
          <Route path="/doctors/:slug" element={<DoctorProfilePage />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
          <Route path="/consult/:id" element={<ConsultationRoomPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/register" element={<AuthRegisterPatientPage />} />
          <Route path="/doctor/register" element={<AuthRegisterDoctorPage />} />
        </Routes>
      </div>

      {!isConsultRoom && <Footer />}
    </div>
  );
};

