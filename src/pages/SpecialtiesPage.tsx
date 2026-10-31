import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Brain,
  Sparkles,
  Baby,
  Activity,
  Bone,
  ShieldPlus,
  Pill,
  Microscope,
  Flame,
  Eye,
  HelpCircle
} from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';

const getSpecialtyIcon = (iconName: string) => {
  const iconProps = { className: "w-7 h-7 text-[#14284B]" };
  switch (iconName) {
    case 'HeartPulse': return <HeartPulse {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Stethoscope': return <Stethoscope {...iconProps} />;
    case 'Brain': return <Brain {...iconProps} />;
    case 'Baby': return <Baby {...iconProps} />;
    case 'Activity': return <Activity {...iconProps} />;
    case 'Bone': return <Bone {...iconProps} />;
    case 'ShieldPlus': return <ShieldPlus {...iconProps} />;
    case 'Pill': return <Pill {...iconProps} />;
    case 'Microscope': return <Microscope {...iconProps} />;
    case 'Flame': return <Flame {...iconProps} />;
    case 'Eye': return <Eye {...iconProps} />;
    default: return <Stethoscope {...iconProps} />;
  }
};

export const SpecialtiesPage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredSpecialties = SPECIALTIES.filter(spec => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      spec.name.toLowerCase().includes(q) ||
      spec.shortDescription.toLowerCase().includes(q) ||
      spec.popularConditions.some(c => c.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF6EC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF7] border border-[#E3DAC4] text-xs font-semibold text-[#14284B] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B4F]" />
            <span>12 Comprehensive Clinical Disciplines</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14284B]">
            Medical Specialties & Departments
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#5B6475]">
            Explore our clinical departments. Every specialty is staffed by accredited post-graduate medical practitioners with extensive clinical hospital experience.
          </p>

          {/* Search/Filter by condition */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#5B6475] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search by condition (e.g. Thyroid, Asthma, Migraine)..."
              className="w-full bg-[#FFFDF7] border border-[#E3DAC4] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#1B2433] placeholder:text-[#5B6475]/70 focus:outline-none focus:border-[#14284B] shadow-sm"
            />
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecialties.map((spec) => (
            <div
              key={spec.id}
              className="bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF6EC] border border-[#E3DAC4] flex items-center justify-center">
                    {getSpecialtyIcon(spec.iconName)}
                  </div>
                  <span className="text-xs font-semibold text-[#14284B] bg-[#FAF6EC] px-3 py-1 rounded-full border border-[#E3DAC4]">
                    {spec.doctorCount} Doctors
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#14284B] mb-2">
                  {spec.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed mb-4">
                  {spec.fullDescription}
                </p>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#14284B] block mb-2">
                    Common Conditions Treated:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {spec.popularConditions.map((cond, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-[#FAF6EC] border border-[#E3DAC4] text-[#1B2433] px-2.5 py-1 rounded-lg"
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E3DAC4] flex items-center justify-between">
                <Link
                  to={`/doctors?specialty=${spec.slug}`}
                  className="w-full py-2.5 rounded-xl bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>View Doctors ({spec.doctorCount})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Triage Advice Card */}
        <div className="mt-16 bg-[#FFFDF7] rounded-3xl border border-[#E3DAC4] p-8 max-w-4xl mx-auto shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF6EC] border border-[#E3DAC4] flex items-center justify-center text-[#14284B] flex-shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#14284B]">
                Unsure which specialist to consult?
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6475] mt-1.5 leading-relaxed">
                When symptoms are general (such as unprovoked fatigue, fever, weight loss, or generalized discomfort), we recommend booking an initial evaluation with a <strong>General Internal Medicine</strong> physician. They will review your history, order baseline investigations, and refer you to the precise sub-specialist if required.
              </p>
              <div className="mt-4">
                <Link
                  to="/doctors?specialty=general-medicine"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14284B] hover:underline"
                >
                  <span>Consult Internal Medicine Physicians →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

