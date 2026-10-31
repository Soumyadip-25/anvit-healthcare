import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Star,
  Building,
  Languages,
  Clock,
  Video,
  Phone,
  MapPin,
  Calendar,
  Share2,
  Heart,
  ShieldCheck,
  Award,
  MessageSquare,
  FileText,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConsultationType } from '../types';

export const DoctorProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { doctors, savedDoctorIds, toggleSaveDoctor, addDoctorReview, currentUser } = useApp();

  const doctor = doctors.find(d => d.slug === slug || d.id === slug);

  // Booking widget states
  const [consultType, setConsultType] = useState<ConsultationType>('video');
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('');

  // Active tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'credentials' | 'reviews' | 'location'>('overview');

  // Review submission state
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  if (!doctor) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="font-serif text-2xl font-bold text-[#14284B]">Doctor Profile Not Found</h2>
        <p className="text-sm text-[#5B6475] mt-2">The requested physician profile could not be located.</p>
        <Link to="/doctors" className="mt-4 px-5 py-2.5 rounded-xl bg-[#14284B] text-[#FAF6EC] text-xs font-bold">
          Back to Doctors Directory
        </Link>
      </div>
    );
  }

  const isSaved = savedDoctorIds.includes(doctor.id);
  const currentDayAvailability = doctor.availability[selectedDateIndex] || doctor.availability[0];

  const handleProceedToBooking = () => {
    const slot = selectedSlotTime || currentDayAvailability?.slots.find(s => s.available)?.time || '10:00 AM';
    navigate(`/book/${doctor.id}?date=${currentDayAvailability.date}&slot=${encodeURIComponent(slot)}&type=${consultType}`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addDoctorReview(doctor.id, {
      rating: reviewRating,
      comment: reviewComment.trim(),
      consultationType: 'video',
    });
    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#5B6475] mb-6">
          <Link to="/" className="hover:text-[#14284B]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/doctors" className="hover:text-[#14284B]">Doctors</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#14284B] font-semibold">{doctor.name}</span>
        </nav>

        {/* Doctor Header Profile Banner */}
        <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 border-[#E3DAC4] shadow-sm"
                />
                {doctor.isOnlineNow && (
                  <span
                    title="Online Now"
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2E6B4F] border-2 border-[#FFFDF7] rounded-full"
                  />
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#14284B]">
                    {doctor.name}
                  </h1>
                  {doctor.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E6B4F] bg-[#2E6B4F]/10 px-2.5 py-0.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" />
                      NMC Verified
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-[#14284B]/80">{doctor.title}</p>
                <p className="text-xs text-[#5B6475]">{doctor.qualifications}</p>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#5B6475]">
                  <div className="flex items-center gap-1 font-semibold text-[#1B2433]">
                    <Star className="w-4 h-4 fill-[#8A5A0B] text-[#8A5A0B]" />
                    <span>{doctor.rating}</span>
                    <span className="text-[#5B6475] font-normal">({doctor.totalReviews} verified patient reviews)</span>
                  </div>
                  <span>•</span>
                  <span className="font-medium text-[#14284B]">{doctor.experienceYears} Years Clinical Practice</span>
                  <span>•</span>
                  <span>Reg: <strong className="text-[#14284B] font-mono">{doctor.registrationNumber}</strong></span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#5B6475] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#14284B]" />
                    <span>{doctor.hospitalAffiliation}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-[#14284B]" />
                    <span>{doctor.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions (Save & Share) */}
            <div className="flex items-center gap-2 self-start">
              <button
                onClick={() => toggleSaveDoctor(doctor.id)}
                className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold ${
                  isSaved
                    ? 'bg-[#FAF6EC] border-[#A3382F] text-[#A3382F]'
                    : 'bg-[#FAF6EC] border-[#E3DAC4] text-[#5B6475] hover:text-[#1B2433]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#A3382F]' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout: Left Tabs & Info + Right Sticky Booking Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Clinical Details Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Navigation */}
            <div className="flex border-b border-[#E3DAC4] overflow-x-auto gap-4">
              {[
                { id: 'overview', label: 'Overview & Approach' },
                { id: 'credentials', label: 'Credentials & Hospital' },
                { id: 'reviews', label: `Reviews (${doctor.reviews.length})` },
                { id: 'location', label: 'Clinic Location' },
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

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 space-y-6 animate-fade-in shadow-sm">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#14284B] mb-2">
                    About {doctor.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">
                    {doctor.about}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#14284B] mb-3">
                    Specialized Clinical Focus
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.subSpecialties.map((sub, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-[#FAF6EC] border border-[#E3DAC4] text-xs font-semibold text-[#14284B]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FAF6EC] p-4 rounded-2xl border border-[#E3DAC4] text-xs text-[#5B6475] leading-relaxed flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#2E6B4F] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14284B] block font-semibold">Consultation Protocol:</strong>
                    Every consultation with {doctor.name} includes dedicated symptom review, previous investigation analysis, lifestyle counsel, and an authentic digital prescription signed upon call conclusion.
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Credentials */}
            {activeTab === 'credentials' && (
              <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 space-y-6 animate-fade-in shadow-sm">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#14284B] mb-3">
                    Academic Degrees & Qualifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4]">
                      <Award className="w-5 h-5 text-[#14284B] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-[#14284B] block">Medical Degrees</span>
                        <p className="text-xs text-[#5B6475]">{doctor.qualifications}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#14284B] mb-3">
                    Licensing & Council Registration
                  </h3>
                  <div className="p-4 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4] text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#5B6475]">Registration Number:</span>
                      <strong className="text-[#14284B] font-mono">{doctor.registrationNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5B6475]">Verification Status:</span>
                      <strong className="text-[#2E6B4F]">Verified by Anvit Clinical Standards Board</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 space-y-6 animate-fade-in shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#14284B]">
                    Patient Feedback ({doctor.reviews.length})
                  </h3>
                  <div className="flex items-center gap-1 font-bold text-sm text-[#14284B]">
                    <Star className="w-4 h-4 fill-[#8A5A0B] text-[#8A5A0B]" />
                    <span>{doctor.rating} Overall Rating</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {doctor.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E3DAC4] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <strong className="text-[#14284B]">{rev.patientName}</strong>
                          {rev.verified && (
                            <span className="text-[10px] bg-[#2E6B4F]/10 text-[#2E6B4F] font-semibold px-2 py-0.5 rounded-full">
                              Verified Patient
                            </span>
                          )}
                        </div>
                        <span className="text-[#5B6475]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(rev.rating)
                                ? 'fill-[#8A5A0B] text-[#8A5A0B]'
                                : 'text-[#E3DAC4]'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[#1B2433] leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Write Review Form */}
                <div className="pt-6 border-t border-[#E3DAC4]">
                  <h4 className="font-serif text-base font-bold text-[#14284B] mb-2">
                    Leave a Verified Review
                  </h4>
                  {reviewSubmitted ? (
                    <div className="p-3 bg-[#2E6B4F]/10 text-[#2E6B4F] rounded-xl text-xs font-semibold">
                      Thank you! Your feedback has been verified and posted.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#5B6475]">Rating:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= reviewRating
                                    ? 'fill-[#8A5A0B] text-[#8A5A0B]'
                                    : 'text-[#E3DAC4]'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience regarding communication, clarity, and care quality..."
                        className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-3 text-xs text-[#1B2433] focus:outline-none focus:border-[#14284B]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#14284B] text-[#FAF6EC] text-xs font-bold rounded-xl hover:bg-[#0E1D38]"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Location */}
            {activeTab === 'location' && (
              <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-6 sm:p-8 space-y-4 animate-fade-in shadow-sm">
                <h3 className="font-serif text-lg font-bold text-[#14284B]">
                  Affiliated Clinical Center
                </h3>
                <div className="flex items-start gap-3 p-4 bg-[#FAF6EC] rounded-2xl border border-[#E3DAC4]">
                  <MapPin className="w-5 h-5 text-[#14284B] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-[#5B6475] space-y-1">
                    <strong className="text-[#14284B] text-sm block">{doctor.hospitalAffiliation}</strong>
                    <p>{doctor.location}</p>
                    <p className="text-[11px] text-[#2E6B4F] font-semibold pt-1">
                      Available for In-Person Outpatient Consultations by Prior Appointment
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Slot Booking Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#FFFDF7] rounded-3xl border-2 border-[#14284B]/20 p-6 shadow-lg space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3DAC4]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#5B6475] font-semibold">
                    Consultation Fee
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#14284B]">
                    ₹{doctor.consultationFee}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#2E6B4F] font-semibold">
                  <span>100% Refundable</span>
                  <p className="text-[10px] text-[#5B6475]">Up to 2h prior</p>
                </div>
              </div>

              {/* Consultation Type Selector */}
              <div>
                <label className="text-xs font-bold text-[#14284B] block mb-2">
                  1. Select Consultation Mode
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    onClick={() => setConsultType('video')}
                    className={`py-2 px-1 rounded-xl border font-semibold flex flex-col items-center gap-1 transition ${
                      consultType === 'video'
                        ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                        : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4] hover:bg-white'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Video Call</span>
                  </button>
                  <button
                    onClick={() => setConsultType('audio')}
                    className={`py-2 px-1 rounded-xl border font-semibold flex flex-col items-center gap-1 transition ${
                      consultType === 'audio'
                        ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                        : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4] hover:bg-white'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Audio Call</span>
                  </button>
                  <button
                    onClick={() => setConsultType('in-person')}
                    className={`py-2 px-1 rounded-xl border font-semibold flex flex-col items-center gap-1 transition ${
                      consultType === 'in-person'
                        ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                        : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4] hover:bg-white'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>In-Clinic</span>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="text-xs font-bold text-[#14284B] block mb-2">
                  2. Select Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {doctor.availability.map((avail, index) => (
                    <button
                      key={avail.date}
                      onClick={() => {
                        setSelectedDateIndex(index);
                        setSelectedSlotTime('');
                      }}
                      className={`p-2 rounded-xl border text-center transition ${
                        selectedDateIndex === index
                          ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                          : 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4] hover:bg-white'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold block opacity-80">
                        {avail.dayOfWeek}
                      </span>
                      <span className="text-xs font-bold block">
                        {avail.displayDate.split(',')[1] || avail.displayDate}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="text-xs font-bold text-[#14284B] block mb-2">
                  3. Select Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {currentDayAvailability.slots.map((slot) => {
                    const isSelected = selectedSlotTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlotTime(slot.time)}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B] shadow-sm'
                            : slot.available
                            ? 'bg-[#FAF6EC] text-[#1B2433] border-[#E3DAC4] hover:bg-white'
                            : 'bg-[#F2ECDD]/40 text-[#5B6475]/40 border-transparent cursor-not-allowed'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{slot.time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProceedToBooking}
                className="w-full py-3.5 bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Book Slot</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-[#5B6475] text-center">
                Instant confirmation • No credit card fee charged during cancellation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

