import React from 'react';
import { X, Printer, Download, ShieldCheck, Stethoscope, FileText } from 'lucide-react';
import { Prescription } from '../../types';

interface PrescriptionModalProps {
  prescription: Prescription | null;
  onClose: () => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ prescription, onClose }) => {
  if (!prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#FFFDF7] w-full max-w-2xl rounded-2xl border border-[#E3DAC4] shadow-2xl overflow-hidden animate-fade-in my-8">
        {/* Modal Top Bar (Non-printed) */}
        <div className="bg-[#FAF6EC] px-6 py-4 border-b border-[#E3DAC4] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#14284B]">
            <FileText className="w-4 h-4 text-[#14284B]" />
            <span>Digital Telemedicine Prescription</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#14284B] text-[#14284B] hover:bg-[#F2ECDD] text-xs font-semibold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#5B6475] hover:text-[#1B2433] hover:bg-[#F2ECDD] transition"
              aria-label="Close Prescription"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prescription Paper Content */}
        <div className="p-8 sm:p-10 text-[#1B2433] bg-[#FFFDF7]">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-[#14284B] pb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#14284B] shadow-sm bg-[#FAF6EC] flex items-center justify-center flex-shrink-0">
                <img src="/logo.png" alt="Anvit Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#14284B] leading-none">
                  Anvit Health Clinic
                </h2>
                <p className="text-[11px] text-[#5B6475] mt-1">
                  National Telemedicine Council Standard Format
                </p>
                <p className="text-[10px] text-[#5B6475]">
                  E-Prescription Ref: {prescription.id.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="text-right">
              <h3 className="font-serif text-base font-bold text-[#14284B]">
                {prescription.doctorName}
              </h3>
              <p className="text-xs text-[#5B6475] font-medium">
                {prescription.doctorSpecialty}
              </p>
              <p className="text-[11px] text-[#2E6B4F] font-semibold">
                Reg No: {prescription.doctorRegNo}
              </p>
            </div>
          </div>

          {/* Patient Details & Date */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-[#E3DAC4] text-xs">
            <div>
              <span className="text-[#5B6475] block">Patient Name:</span>
              <span className="font-semibold text-[#1B2433]">{prescription.patientName}</span>
            </div>
            <div>
              <span className="text-[#5B6475] block">Age / Gender:</span>
              <span className="font-semibold text-[#1B2433]">{prescription.patientAge} Yrs / {prescription.patientGender}</span>
            </div>
            <div>
              <span className="text-[#5B6475] block">Consultation Date:</span>
              <span className="font-semibold text-[#1B2433]">{prescription.date}</span>
            </div>
            <div>
              <span className="text-[#5B6475] block">Mode:</span>
              <span className="font-semibold text-[#2E6B4F]">Verified Telehealth</span>
            </div>
          </div>

          {/* Vitals if present */}
          {prescription.vitals && (
            <div className="my-4 p-3 rounded-xl bg-[#FAF6EC] border border-[#E3DAC4] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div><span className="text-[#5B6475]">Blood Pressure:</span> <strong className="text-[#14284B]">{prescription.vitals.bp || '120/80'}</strong></div>
              <div><span className="text-[#5B6475]">Pulse:</span> <strong className="text-[#14284B]">{prescription.vitals.pulse || '72 bpm'}</strong></div>
              <div><span className="text-[#5B6475]">Temperature:</span> <strong className="text-[#14284B]">{prescription.vitals.temp || '98.6 F'}</strong></div>
              <div><span className="text-[#5B6475]">SpO2:</span> <strong className="text-[#14284B]">{prescription.vitals.spo2 || '99%'}</strong></div>
            </div>
          )}

          {/* Diagnosis */}
          <div className="my-4">
            <span className="text-xs uppercase tracking-wider font-bold text-[#5B6475] block">
              Clinical Assessment / Diagnosis:
            </span>
            <p className="text-sm font-semibold text-[#14284B] mt-0.5">
              {prescription.diagnosis}
            </p>
          </div>

          {/* Rx Medications Table */}
          <div className="my-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-lg font-bold text-[#14284B]">℞</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B6475]">Prescribed Medications</span>
            </div>

            <div className="border border-[#E3DAC4] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF6EC] border-b border-[#E3DAC4] text-[#14284B] font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Medicine & Strength</th>
                    <th className="py-2.5 px-3">Dosage / Frequency</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-3">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DAC4]/60">
                  {prescription.medications.map((med, index) => (
                    <tr key={index} className="hover:bg-[#FAF6EC]/40">
                      <td className="py-2.5 px-3 font-semibold text-[#14284B]">{med.name}</td>
                      <td className="py-2.5 px-3">{med.dosage} ({med.frequency})</td>
                      <td className="py-2.5 px-3 font-medium">{med.duration}</td>
                      <td className="py-2.5 px-3 text-[#5B6475]">{med.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Tests & Lifestyle Advice */}
          {(prescription.labTestsRecommended?.length || prescription.lifestyleAdvice) && (
            <div className="my-4 space-y-3 text-xs bg-[#FAF6EC]/70 p-4 rounded-xl border border-[#E3DAC4]">
              {prescription.labTestsRecommended && prescription.labTestsRecommended.length > 0 && (
                <div>
                  <span className="font-semibold text-[#14284B] block">Recommended Laboratory Workup:</span>
                  <p className="text-[#5B6475]">{prescription.labTestsRecommended.join(' • ')}</p>
                </div>
              )}
              {prescription.lifestyleAdvice && (
                <div>
                  <span className="font-semibold text-[#14284B] block">General Lifestyle & Dietary Guidance:</span>
                  <p className="text-[#5B6475]">{prescription.lifestyleAdvice}</p>
                </div>
              )}
            </div>
          )}

          {/* Follow-up & Doctor Digital Signature */}
          <div className="mt-8 pt-6 border-t border-[#E3DAC4] flex items-end justify-between">
            <div className="text-xs text-[#5B6475] space-y-1">
              <p>Follow-up scheduled: <strong>{prescription.followUpDate || 'As advised'}</strong></p>
              <div className="flex items-center gap-1.5 text-[#2E6B4F] font-semibold text-[11px] pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Digitally Signed Telemedicine Prescription</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-base text-[#14284B] font-semibold tracking-wide border-b border-[#14284B] pb-1 inline-block">
                {prescription.doctorName}
              </div>
              <p className="text-[10px] text-[#5B6475] mt-1">Authorized Digital Signature</p>
              <p className="text-[9px] text-[#5B6475]">Timestamp: {prescription.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

