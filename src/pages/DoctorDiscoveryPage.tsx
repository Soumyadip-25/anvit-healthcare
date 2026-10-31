import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Video,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SPECIALTIES } from '../data/mockData';
import { DoctorCard } from '../components/common/DoctorCard';

export const DoctorDiscoveryPage: React.FC = () => {
  const { doctors } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get('specialty') || 'all');
  const [selectedAvailability, setSelectedAvailability] = useState(
    searchParams.get('online') === 'true' ? 'online' : 'all'
  );
  const [maxFee, setMaxFee] = useState<number>(2000);
  const [minExp, setMinExp] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL params change
  useEffect(() => {
    const specialtyParam = searchParams.get('specialty');
    const searchParam = searchParams.get('search');
    const onlineParam = searchParams.get('online');
    if (specialtyParam) setSelectedSpecialty(specialtyParam);
    if (searchParam) setSearchQuery(searchParam);
    if (onlineParam === 'true') setSelectedAvailability('online');
  }, [searchParams]);

  // Unique list of languages from doctors
  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    doctors.forEach(d => d.languages.forEach(l => langs.add(l)));
    return Array.from(langs);
  }, [doctors]);

  // Filtering logic
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      // Search term
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesSpecialty = doc.specialtyName.toLowerCase().includes(query);
        const matchesSubSpecialty = doc.subSpecialties.some(sub => sub.toLowerCase().includes(query));
        const matchesHospital = doc.hospitalAffiliation.toLowerCase().includes(query);
        const matchesBio = doc.bio.toLowerCase().includes(query);
        if (!matchesName && !matchesSpecialty && !matchesSubSpecialty && !matchesHospital && !matchesBio) {
          return false;
        }
      }

      // Specialty filter
      if (selectedSpecialty !== 'all' && doc.specialtyId !== selectedSpecialty) {
        return false;
      }

      // Availability filter
      if (selectedAvailability === 'online' && !doc.isOnlineNow) {
        return false;
      }
      if (selectedAvailability === 'today' && !doc.nextAvailableSlot.toLowerCase().includes('today')) {
        return false;
      }
      if (selectedAvailability === 'tomorrow' && !doc.nextAvailableSlot.toLowerCase().includes('tomorrow')) {
        return false;
      }

      // Fee filter
      if (doc.consultationFee > maxFee) {
        return false;
      }

      // Experience filter
      if (doc.experienceYears < minExp) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== 'all' && !doc.languages.includes(selectedLanguage)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fee-low') return a.consultationFee - b.consultationFee;
      if (sortBy === 'fee-high') return b.consultationFee - a.consultationFee;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0; // recommended
    });
  }, [doctors, searchQuery, selectedSpecialty, selectedAvailability, maxFee, minExp, selectedLanguage, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('all');
    setSelectedAvailability('all');
    setMaxFee(2000);
    setMinExp(0);
    setSelectedLanguage('all');
    setSortBy('recommended');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery ||
    selectedSpecialty !== 'all' ||
    selectedAvailability !== 'all' ||
    maxFee < 2000 ||
    minExp > 0 ||
    selectedLanguage !== 'all';

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#E3DAC4] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B6475] mb-1">
              <span>National Doctor Directory</span>
              <span>•</span>
              <span className="text-[#2E6B4F]">Verified Medical Practitioners</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#14284B]">
              Find & Consult Specialists
            </h1>
            <p className="text-sm text-[#5B6475] mt-1">
              Explore profiles, compare clinical experience, and book directly in your local time zone.
            </p>
          </div>

          {/* Quick search input */}
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 text-[#5B6475] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by doctor, symptom, clinic..."
              className="w-full bg-[#FFFDF7] border border-[#E3DAC4] focus:border-[#14284B] rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#1B2433] placeholder:text-[#5B6475]/70 focus:outline-none shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6475] hover:text-[#1B2433]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters (desktop) + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-[#FFFDF7] p-6 rounded-2xl border border-[#E3DAC4] h-fit sticky top-28 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DAC4]">
              <div className="flex items-center gap-2 font-serif text-base font-bold text-[#14284B]">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#A3382F] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset All
                </button>
              )}
            </div>

            {/* Specialty */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#14284B] block mb-2">
                Medical Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-xs text-[#1B2433] focus:outline-none focus:border-[#14284B]"
              >
                <option value="all">All Specialties ({SPECIALTIES.length})</option>
                {SPECIALTIES.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#14284B] block mb-2">
                Availability
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Doctors' },
                  { id: 'online', label: '🟢 Online Now (Instant)' },
                  { id: 'today', label: 'Available Today' },
                  { id: 'tomorrow', label: 'Available Tomorrow' },
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer text-[#1B2433] hover:text-[#14284B]">
                    <input
                      type="radio"
                      name="avail"
                      checked={selectedAvailability === item.id}
                      onChange={() => setSelectedAvailability(item.id)}
                      className="accent-[#14284B]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Fee Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#14284B] mb-2">
                <span>Max Fee</span>
                <span className="text-[#14284B] font-bold">₹{maxFee}</span>
              </div>
              <input
                type="range"
                min="500"
                max="2000"
                step="100"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-[#14284B]"
              />
              <div className="flex justify-between text-[10px] text-[#5B6475] mt-1">
                <span>₹500</span>
                <span>₹2000+</span>
              </div>
            </div>

            {/* Minimum Clinical Experience */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#14284B] block mb-2">
                Min. Experience
              </label>
              <select
                value={minExp}
                onChange={(e) => setMinExp(Number(e.target.value))}
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-xs text-[#1B2433] focus:outline-none focus:border-[#14284B]"
              >
                <option value={0}>Any Experience</option>
                <option value={10}>10+ Years Experience</option>
                <option value={15}>15+ Years Experience</option>
                <option value={20}>20+ Years Experience</option>
              </select>
            </div>

            {/* Language Spoken */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#14284B] block mb-2">
                Languages Spoken
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl p-2.5 text-xs text-[#1B2433] focus:outline-none focus:border-[#14284B]"
              >
                <option value="all">Any Language</option>
                {allLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* Main Results Column */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Mobile Filter Trigger & Sort By */}
            <div className="bg-[#FFFDF7] p-4 rounded-2xl border border-[#E3DAC4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF6EC] border border-[#E3DAC4] text-xs font-semibold text-[#14284B]"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters {hasActiveFilters && '•'}</span>
                </button>

                <p className="text-xs sm:text-sm font-semibold text-[#14284B]">
                  Showing <span className="font-serif text-base">{filteredDoctors.length}</span> Verified Specialists
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#5B6475] hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF6EC] border border-[#E3DAC4] rounded-xl px-3 py-1.5 text-xs text-[#14284B] font-semibold focus:outline-none"
                >
                  <option value="recommended">Recommended & Pedigree</option>
                  <option value="rating">Highest Rated (★)</option>
                  <option value="experience">Experience: High to Low</option>
                  <option value="fee-low">Fee: Low to High</option>
                  <option value="fee-high">Fee: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active filter badges */}
            {hasActiveFilters && (
              <div className="flex items-center flex-wrap gap-2 text-xs">
                <span className="text-[#5B6475] text-[11px] font-medium">Active filters:</span>
                {selectedSpecialty !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-medium">
                    Specialty: {SPECIALTIES.find(s => s.id === selectedSpecialty)?.name}
                    <button onClick={() => setSelectedSpecialty('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedAvailability !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-medium">
                    Availability: {selectedAvailability}
                    <button onClick={() => setSelectedAvailability('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {maxFee < 2000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-medium">
                    Max ₹{maxFee}
                    <button onClick={() => setMaxFee(2000)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {minExp > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-medium">
                    {minExp}+ Yrs Exp
                    <button onClick={() => setMinExp(0)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedLanguage !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF6EC] border border-[#E3DAC4] text-[#14284B] font-medium">
                    Language: {selectedLanguage}
                    <button onClick={() => setSelectedLanguage('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
              <div className="lg:hidden bg-[#FFFDF7] p-5 rounded-2xl border border-[#E3DAC4] space-y-4 animate-fade-in shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-[#E3DAC4]">
                  <h4 className="font-serif font-bold text-[#14284B]">Filter Consultations</h4>
                  <button onClick={() => setMobileFilterOpen(false)}><X className="w-4 h-4" /></button>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#14284B] block mb-1">Specialty</label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-lg p-2 text-xs"
                  >
                    <option value="all">All Specialties</option>
                    {SPECIALTIES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#14284B] block mb-1">Availability</label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full bg-[#FAF6EC] border border-[#E3DAC4] rounded-lg p-2 text-xs"
                  >
                    <option value="all">All Availability</option>
                    <option value="online">Online Now</option>
                    <option value="today">Available Today</option>
                    <option value="tomorrow">Available Tomorrow</option>
                  </select>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-2 bg-[#14284B] text-[#FAF6EC] rounded-xl text-xs font-bold"
                >
                  Apply Filters
                </button>
              </div>
            )}

            {/* Doctors Grid */}
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-12 text-center max-w-md mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF6EC] text-[#5B6475] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#14284B]">
                  No matching doctors found
                </h3>
                <p className="text-xs text-[#5B6475]">
                  We couldn't find any specialist matching your specific combination of filters. Try widening your criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#14284B] text-[#FAF6EC] text-xs font-bold shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

