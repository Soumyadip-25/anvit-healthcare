import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Sparkles,
  Stethoscope,
  Brain,
  Baby,
  Activity,
  Bone,
  ShieldPlus,
  Pill,
  Microscope,
  Flame,
  Eye,
  ArrowRight
} from 'lucide-react';
import { Specialty } from '../../types';

interface SpecialtyCardProps {
  specialty: Specialty;
}

const getSpecialtyIcon = (iconName: string) => {
  const iconProps = { className: "w-6 h-6 text-[#14284B]" };
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

export const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty }) => {
  return (
    <Link
      to={`/doctors?specialty=${specialty.slug}`}
      className="group bg-[#FFFDF7] rounded-2xl border border-[#E3DAC4] p-5 shadow-sm hover:shadow-md hover:border-[#14284B]/50 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF6EC] border border-[#E3DAC4] flex items-center justify-center group-hover:bg-[#DCE4F2] group-hover:scale-105 transition-all">
            {getSpecialtyIcon(specialty.iconName)}
          </div>
          <span className="text-xs font-semibold text-[#5B6475] bg-[#FAF6EC] px-2.5 py-1 rounded-full border border-[#E3DAC4]">
            {specialty.doctorCount} Doctors
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold text-[#14284B] group-hover:text-[#0E1D38] transition-colors">
          {specialty.name}
        </h3>

        <p className="text-xs text-[#5B6475] leading-relaxed mt-2 line-clamp-2">
          {specialty.shortDescription}
        </p>

        {/* Condition chips */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {specialty.popularConditions.slice(0, 3).map((condition, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-[#FAF6EC] text-[#1B2433] px-2 py-0.5 rounded-md border border-[#E3DAC4]/70"
            >
              {condition}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#E3DAC4]/60 flex items-center justify-between text-xs font-semibold text-[#14284B] group-hover:text-[#0E1D38]">
        <span>Consult Specialists</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

