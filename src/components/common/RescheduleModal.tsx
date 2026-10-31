import React, { useState } from 'react';
import { X, Calendar, Clock, Check } from 'lucide-react';
import { Appointment } from '../../types';
import { useApp } from '../../context/AppContext';

interface RescheduleModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({ appointment, onClose }) => {
  const { rescheduleAppointment, doctors } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-11-01');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!appointment) return null;

  const doctor = doctors.find(d => d.id === appointment.doctorId);

  const availableDates = doctor?.availability || [
    {
      date: '2026-11-01',
      dayOfWeek: 'Sun',
      displayDate: 'Tomorrow, Nov 1',
      slots: [
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: true },
        { time: '03:00 PM', available: true },
        { time: '04:30 PM', available: true },
      ]
    },
    {
      date: '2026-11-02',
      dayOfWeek: 'Mon',
      displayDate: 'Mon, Nov 2',
      slots: [
        { time: '09:30 AM', available: true },
        { time: '11:30 AM', available: true },
        { time: '02:00 PM', available: true },
      ]
    }
  ];

  const currentDaySlots = availableDates.find(d => d.date === selectedDate)?.slots || availableDates[0].slots;

  const handleConfirm = () => {
    rescheduleAppointment(appointment.id, selectedDate, selectedSlot);
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFDF7] w-full max-w-lg rounded-2xl border border-[#E3DAC4] shadow-2xl overflow-hidden animate-fade-in p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E3DAC4]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#14284B]" />
            <h3 className="font-serif text-lg font-bold text-[#14284B]">
              Reschedule Appointment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#5B6475] hover:text-[#1B2433] hover:bg-[#F2ECDD] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMessage ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#2E6B4F]/10 text-[#2E6B4F] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#14284B]">
              Appointment Rescheduled!
            </h4>
            <p className="text-xs text-[#5B6475]">
              New slot confirmed for {selectedDate} at {selectedSlot}.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="p-3 bg-[#FAF6EC] rounded-xl border border-[#E3DAC4] text-xs">
              <span className="text-[#5B6475] block">Current Slot:</span>
              <strong className="text-[#14284B] font-semibold">{appointment.date} at {appointment.timeSlot}</strong>
              <span className="text-[#5B6475] block mt-0.5">with {appointment.doctorName}</span>
            </div>

            {/* Select Day */}
            <div>
              <label className="text-xs font-bold text-[#14284B] block mb-2">
                1. Select New Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableDates.map(avail => (
                  <button
                    key={avail.date}
                    onClick={() => setSelectedDate(avail.date)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition text-center ${
                      selectedDate === avail.date
                        ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                        : 'bg-[#FFFDF7] text-[#1B2433] border-[#E3DAC4] hover:bg-[#FAF6EC]'
                    }`}
                  >
                    {avail.displayDate}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Slot */}
            <div>
              <label className="text-xs font-bold text-[#14284B] block mb-2">
                2. Select Available Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {currentDaySlots.map(slot => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-medium transition text-center flex items-center justify-center gap-1 ${
                      selectedSlot === slot.time
                        ? 'bg-[#14284B] text-[#FAF6EC] border-[#14284B]'
                        : slot.available
                        ? 'bg-[#FFFDF7] text-[#1B2433] border-[#E3DAC4] hover:bg-[#FAF6EC]'
                        : 'bg-[#F2ECDD]/50 text-[#5B6475]/40 border-transparent cursor-not-allowed'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{slot.time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3DAC4] flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#5B6475] hover:bg-[#FAF6EC] rounded-xl border border-[#E3DAC4] transition"
              >
                Keep Current Slot
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 text-xs font-semibold bg-[#14284B] text-[#FAF6EC] hover:bg-[#0E1D38] rounded-xl shadow-sm transition"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

