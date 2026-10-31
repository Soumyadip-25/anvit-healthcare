# Anvit — Modern Healthcare Consultation Platform

Anvit is a premium, modern, and fully responsive digital healthcare consultation platform connecting patients with accredited medical specialists across India and worldwide.

## Live Demo & Dev Server
The Vite frontend development server runs on:
```bash
http://127.0.0.1:5173/
```

To run manually:
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

---

## Key Features Implemented

### 1. Warm Editorial Design System
- **Colors**: Warm Ivory (`#FAF6EC`), Deep Editorial Blue (`#14284B`, `#0E1D38`), Muted Cream (`#FFFDF7`, `#F2ECDD`), Hairline Gold/Ivory Border (`#E3DAC4`), Clinical Green (`#2E6B4F`), Emergency Red (`#A3382F`).
- **Typography**: Fraunces (refined serif for editorial headlines) and Inter (clean, geometric sans for clinical UI and data).
- **Logomark**: Organic A Emblem integrated across header, hero, footer, and e-prescriptions.

### 2. Comprehensive Navigation & Instant Role Switcher
- Floating top banner with real-time NMC verification notice and emergency hotlines (112 / 108).
- **1-Click Persona Switcher** in header:
  - **Patient Mode**: Pre-configured as Rahul Sharma with existing medical appointments and prescriptions.
  - **Doctor Mode**: Pre-configured as Dr. Priya Sharma (Senior Interventional Cardiologist) with queue and clinical prescription writer.
  - **Guest Mode**: Clean visitor view.

### 3. Landing Page (`/`)
- Editorial Hero with trust badge and comprehensive search bar (doctor name, specialty, condition, symptom).
- Popular condition shortcut chips (Cardiology, Skin & Hair, Migraine, PCOS, Anxiety, Fever).
- Online-now real-time urgent consultation callout.
- Featured specialties grid with condition tags.
- Top-rated doctor showcase with verified badges, hospital credentials, and immediate booking.
- 3-step consultation walkthrough ("How it Works").
- Clinical quality and medical council verification pledge.
- Real patient and doctor testimonials.
- Interactive FAQ accordion.

### 4. Doctor Discovery & Search (`/doctors`)
- Multi-faceted sidebar and mobile drawer filters:
  - Search query (doctor name, condition, symptom, hospital).
  - Medical specialty dropdown.
  - Availability toggles: All, Online Now (instant), Available Today, Available Tomorrow.
  - Consultation fee range slider (₹500 to ₹2000).
  - Minimum clinical experience filter (10+, 15+, 20+ years).
  - Spoken languages filter (English, Hindi, Bengali, Tamil, etc.).
  - Sort by: Recommended, Highest Rating, Fee: Low to High, Fee: High to Low, Experience: High to Low.
- Dynamic result counts, active filter badges with 1-click removal, and reset buttons.

### 5. Specialist Categories Directory (`/specialties`)
- 12 comprehensive clinical departments (Cardiology, Dermatology, General Medicine, Neurology, Pediatrics, Psychiatry, Orthopedics, Gynecology, Gastroenterology, ENT, Endocrinology, Ophthalmology).
- Detailed clinical descriptions, condition checklist tags, and doctor counts with 1-click filter links.
- Clinical triage advice card for patients uncertain which specialist to choose.

### 6. Doctor Profile Page (`/doctors/:slug`)
- Verified badge, qualifications, hospital affiliations, registration number, rating & reviews breakdown.
- Multi-tab layout:
  - Overview & Clinical Approach
  - Academic Credentials & Council Registration
  - Patient Feedback & interactive "Write a Verified Review" form
  - Affiliated Hospital & Clinic Location
- Sticky Booking Card with mode selection (Video, Audio, In-Person), date selector, time slot picker, and cancellation policy.

### 7. Multi-Step Appointment Booking Flow (`/book/:id`)
- **Step 1**: Mode & Slot confirmation.
- **Step 2**: Patient contact details & clinical symptoms description.
- **Step 3**: Transparent fee breakdown (doctor fee, waived platform fee, GST, welcome coupon discount code `ANVITHEALTH`), and payment method selection (UPI, Card, NetBanking).
- **Step 4**: Confirmed appointment receipt with unique appointment reference, invoice number, and direct link to enter the consultation room.

### 8. Patient Dashboard (`/patient/dashboard`)
- Upcoming appointments with live countdown and "Join Video Call" button.
- Reschedule modal with real-time date/slot selection and cancellation capabilities.
- "My Prescriptions" repository with authentic PDF/printable digital e-prescriptions.
- Past consultation history with invoice references.
- Saved favorite doctors with quick booking access.
- Health profile & baseline vitals (blood group, emergency contact, known drug allergies).

### 9. Doctor Clinic Portal (`/doctor/dashboard`)
- Practice KPIs: Today's queue, monthly earnings (₹98,400), rating (4.94 ★), average consult duration.
- Today's live patient queue with direct "Start Consultation" action.
- "Write & Issue Clinical Prescription" form with medication strength, dosage, frequency, duration, and lifestyle advice.
- Weekly consultation schedule rule manager.
- Monthly earnings and settlement ledger.

### 10. Live Teleconsultation Room Preview (`/consult/:id`)
- Fullscreen encrypted consultation room interface.
- Doctor HD video stream + picture-in-picture patient self-view.
- Audio waveform visualizer and consultation elapsed timer.
- Device toggles: Microphone mute/unmute, Camera on/off, Screen share.
- In-call encrypted chat drawer between doctor and patient.
- Live clinical Rx notes drawer.
- Emergency guidance callout.

### 11. Authentication & Onboarding (`/login`, `/register`, `/doctor/register`)
- Dual-role login tab with **instant 1-click demo login buttons**.
- Patient registration form with health vitals.
- Doctor onboarding wizard with Medical Council Registration Number verification, state council selection, and document upload simulation.
