import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Star,
  CheckCircle,
  Clock,
  Languages,
  Building,
  Heart,
  Video,
  ChevronRight
} from 'lucide-react';
import { Doctor } from '../../types';
import { useApp } from '../../context/AppContext';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { savedDoctorIds, toggleSaveDoctor } = useApp();
  const navigate = useNavigate();
  const isSaved = savedDoctorIds.includes(doctor.id);

  return (
    <div className="group bg-[#FFFDF7] rounded-2xl border border-[#E3DAC4] p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative hover:border-[#14284B]/40">
      {/* Top action: Favorite toggle */}
      <button
        onClick={() => toggleSaveDoctor(doctor.id)}
        aria-label={isSaved ? 'Remove from saved' : 'Save doctor'}
        className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF6EC] border border-[#E3DAC4] text-[#5B6475] hover:text-[#A3382F] hover:bg-white transition"
      >
        <Heart
          className={`w-4 h-4 ${isSaved ? 'fill-[#A3382F] text-[#A3382F]' : ''}`}
        />
      </button>

      <div>
        {/* Doctor Header: Avatar, Name, Title, Verified Badge */}
        <div className="flex items-start gap-4 pr-10">
          <div className="relative flex-shrink-0">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E3DAC4] shadow-sm"
            />
            {doctor.isOnlineNow && (
              <span
                title="Online & Accepting Consultations"
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2E6B4F] border-2 border-[#FFFDF7] rounded-full"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-serif text-lg font-bold text-[#14284B] truncate group-hover:text-[#0E1D38]">
                {doctor.name}
              </h3>
              {doctor.isVerified && (
                <span
                  title="Verified National Medical Council Practitioner"
                  className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#2E6B4F] bg-[#2E6B4F]/10 px-2 py-0.5 rounded-full"
                >
                  <CheckCircle className="w-3 h-3 text-[#2E6B4F]" />
                  Verified
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-[#14284B]/80 mt-0.5">
              {doctor.title}
            </p>
            <p className="text-xs text-[#5B6475] line-clamp-1 mt-0.5">
              {doctor.qualifications}
            </p>

            {/* Rating and Experience stats */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1 font-semibold text-[#1B2433]">
                <Star className="w-3.5 h-3.5 fill-[#8A5A0B] text-[#8A5A0B]" />
                <span>{doctor.rating}</span>
                <span className="text-[#5B6475] font-normal">({doctor.totalReviews})</span>
              </div>
              <span className="text-[#E3DAC4]">|</span>
              <span className="text-[#5B6475] font-medium">
                {doctor.experienceYears} Years Exp
              </span>
            </div>
          </div>
        </div>

        {/* Hospital & Location */}
        <div className="mt-4 pt-3 border-t border-[#E3DAC4]/60 space-y-1.5 text-xs text-[#5B6475]">
          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-[#14284B]/70 flex-shrink-0" />
            <span className="truncate">{doctor.hospitalAffiliation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="w-3.5 h-3.5 text-[#14284B]/70 flex-shrink-0" />
            <span className="truncate">{doctor.languages.join(', ')}</span>
          </div>
        </div>

        {/* Sub-specialties tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {doctor.subSpecialties.slice(0, 2).map((sub, i) => (
            <span
              key={i}
              className="text-[11px] bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-medium px-2 py-0.5 rounded-md"
            >
              {sub}
            </span>
          ))}
          {doctor.subSpecialties.length > 2 && (
            <span className="text-[11px] text-[#5B6475] self-center">
              +{doctor.subSpecialties.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer / Booking Bar */}
      <div className="mt-5 pt-4 border-t border-[#E3DAC4] flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-[#5B6475] uppercase tracking-wider block font-medium">
            Consultation Fee
          </span>
          <span className="text-base font-bold text-[#14284B]">
            ₹{doctor.consultationFee}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/doctors/${doctor.slug}`}
            className="px-3 py-2 text-xs font-semibold text-[#14284B] hover:bg-[#FAF6EC] rounded-xl border border-[#E3DAC4] transition"
          >
            Profile
          </Link>
          <button
            onClick={() => navigate(`/book/${doctor.id}`)}
            className="px-3.5 py-2 text-xs font-semibold bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Book Slot</span>
          </button>
        </div>
      </div>

      {/* Next slot micro pill */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#2E6B4F] bg-[#2E6B4F]/10 px-2.5 py-1 rounded-lg">
        <Clock className="w-3 h-3 text-[#2E6B4F]" />
        <span>Next available: <strong>{doctor.nextAvailableSlot}</strong></span>
      </div>
    </div>
  );
};

