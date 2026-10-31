import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  FileText,
  ShieldCheck,
  Share2,
  Send,
  User,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ConsultationRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, currentUser, createPrescription } = useApp();

  const appointment = appointments.find(a => a.id === id) || appointments[0];

  // Device control states
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [activeSideTab, setActiveSideTab] = useState<'chat' | 'notes'>('chat');

  // Elapsed timer state
  const [secondsElapsed, setSecondsElapsed] = useState(420); // 7m 00s

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // In-call chat simulation
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isDoctor: boolean }>>([
    {
      sender: appointment.doctorName,
      text: 'Good afternoon, Rahul. I have reviewed your previous blood pressure readings and symptom note. How are you feeling today?',
      time: '04:31 PM',
      isDoctor: true,
    },
    {
      sender: 'Rahul Sharma',
      text: 'Hello Doctor. Yes, the chest tightness usually occurs after evening stairs. Otherwise normal during resting hours.',
      time: '04:32 PM',
      isDoctor: false,
    },
    {
      sender: appointment.doctorName,
      text: 'Understood. Let us do a brief clinical review and I will draft your updated dosage schedule.',
      time: '04:33 PM',
      isDoctor: true,
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      sender: currentUser?.role === 'doctor' ? appointment.doctorName : (currentUser?.name || 'Rahul Sharma'),
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDoctor: currentUser?.role === 'doctor',
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg('');
  };

  const handleEndCall = () => {
    if (currentUser?.role === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/patient/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1D38] text-[#FAF6EC] flex flex-col justify-between">
      {/* Consultation Room Top Bar */}
      <header className="bg-[#14284B] border-b border-[#2F4C86]/50 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Anvit" className="w-8 h-8 brightness-0 invert" />
            <span className="font-serif font-bold text-lg text-white">Anvit Telehealth</span>
          </Link>
          <span className="hidden sm:inline-block text-[#2F4C86]">|</span>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#DCE4F2]">
            <ShieldCheck className="w-4 h-4 text-[#2E6B4F]" />
            <span>256-Bit Encrypted Peer Session</span>
          </div>
        </div>

        {/* Call Timer & Participant Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#0E1D38] px-3 py-1.5 rounded-full border border-[#2F4C86] text-xs font-mono font-bold text-[#FAF6EC]">
            <Clock className="w-3.5 h-3.5 text-[#2E6B4F] animate-pulse" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>
          <span className="text-xs text-[#DCE4F2] hidden md:inline">
            With: <strong>{currentUser?.role === 'doctor' ? appointment.patientName : appointment.doctorName}</strong>
          </span>
        </div>
      </header>

      {/* Main Video & Interactive Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        {/* Left: Video Frames */}
        <div className="lg:col-span-3 flex flex-col justify-center h-full">
          <div className="relative w-full aspect-video bg-[#14284B]/80 rounded-3xl border-2 border-[#2F4C86] overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Primary Video Feed: Doctor or Patient */}
            {cameraActive ? (
              <img
                src={
                  currentUser?.role === 'doctor'
                    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200'
                    : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200'
                }
                alt="Main Video"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center space-y-2">
                <VideoOff className="w-12 h-12 text-[#5B6475] mx-auto" />
                <p className="text-xs text-[#DCE4F2]">Camera is currently paused</p>
              </div>
            )}

            {/* Overlaid Doctor Name Badge */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6B4F]"></span>
              <span>{currentUser?.role === 'doctor' ? appointment.patientName : appointment.doctorName} (HD Live)</span>
            </div>

            {/* Picture-in-Picture Self View */}
            <div className="absolute bottom-4 right-4 w-32 sm:w-44 aspect-video bg-black/70 rounded-2xl border-2 border-white/30 overflow-hidden shadow-lg">
              <img
                src={
                  currentUser?.role === 'doctor'
                    ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
                    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
                }
                alt="Self View"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-white">
                You
              </div>
            </div>

            {/* Audio Waveform Simulator */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-lg backdrop-blur-sm">
              <div className="w-1 h-3 bg-[#2E6B4F] animate-pulse"></div>
              <div className="w-1 h-5 bg-[#2E6B4F] animate-pulse delay-75"></div>
              <div className="w-1 h-2 bg-[#2E6B4F] animate-pulse delay-150"></div>
              <div className="w-1 h-4 bg-[#2E6B4F] animate-pulse delay-100"></div>
              <span className="text-[10px] text-white ml-1">Live Audio</span>
            </div>
          </div>
        </div>

        {/* Right: In-Call Drawer (Chat / Clinical Notes) */}
        <div className="lg:col-span-1 bg-[#14284B] rounded-3xl border border-[#2F4C86] h-[500px] flex flex-col justify-between overflow-hidden shadow-xl">
          {/* Drawer Top Tabs */}
          <div className="flex border-b border-[#2F4C86] bg-[#0E1D38]">
            <button
              onClick={() => setActiveSideTab('chat')}
              className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeSideTab === 'chat'
                  ? 'bg-[#14284B] text-[#FAF6EC] border-b-2 border-[#FAF6EC]'
                  : 'text-[#DCE4F2] hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>In-Call Chat</span>
            </button>
            <button
              onClick={() => setActiveSideTab('notes')}
              className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeSideTab === 'notes'
                  ? 'bg-[#14284B] text-[#FAF6EC] border-b-2 border-[#FAF6EC]'
                  : 'text-[#DCE4F2] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Clinical Rx Notes</span>
            </button>
          </div>

          {/* Tab 1: Chat Stream */}
          {activeSideTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-2xl max-w-[90%] space-y-1 ${
                      msg.isDoctor
                        ? 'bg-[#0E1D38] border border-[#2F4C86] mr-auto'
                        : 'bg-[#2F4C86] text-white ml-auto'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75">
                      <span className="font-bold">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type secure message..."
                  className="w-full bg-[#0E1D38] border border-[#2F4C86] rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#DCE4F2]/50 focus:outline-none focus:border-[#FAF6EC]"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#FAF6EC] text-[#14284B] hover:bg-white rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Clinical Rx Notes */}
          {activeSideTab === 'notes' && (
            <div className="flex-1 p-4 overflow-y-auto text-xs space-y-3 text-[#DCE4F2]">
              <div className="bg-[#0E1D38] p-3 rounded-2xl border border-[#2F4C86]">
                <strong className="text-white block font-semibold mb-1">Chief Complaint:</strong>
                <p>{appointment.symptoms}</p>
              </div>
              <div className="bg-[#0E1D38] p-3 rounded-2xl border border-[#2F4C86]">
                <strong className="text-white block font-semibold mb-1">Live Vitals Captured:</strong>
                <p>BP: 124/82 mmHg • SpO2: 99% • Pulse: 76 bpm</p>
              </div>
              <div className="bg-[#0E1D38] p-3 rounded-2xl border border-[#2E6B4F]/40 text-[#DCE4F2]">
                <span className="text-[#2E6B4F] font-bold block mb-1">✓ Digital Prescription In Progress</span>
                <p>Doctor is finalizing recommendations. The signed document will appear in your records upon session completion.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* In-Call Bottom Control Bar */}
      <footer className="bg-[#14284B] border-t border-[#2F4C86]/50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMicActive(!micActive)}
              className={`p-3 rounded-2xl transition ${
                micActive ? 'bg-[#0E1D38] text-white hover:bg-[#2F4C86]' : 'bg-[#A3382F] text-white'
              }`}
              title={micActive ? 'Mute Mic' : 'Unmute Mic'}
            >
              {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setCameraActive(!cameraActive)}
              className={`p-3 rounded-2xl transition ${
                cameraActive ? 'bg-[#0E1D38] text-white hover:bg-[#2F4C86]' : 'bg-[#A3382F] text-white'
              }`}
              title={cameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {cameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
          </div>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="px-6 py-3 bg-[#A3382F] hover:bg-[#852820] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition flex items-center gap-2"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Consultation</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

