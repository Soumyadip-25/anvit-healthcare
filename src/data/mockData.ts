import { Specialty, Doctor, Appointment, Prescription, UserProfile } from '../types';

export const SPECIALTIES: Specialty[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    slug: 'cardiology',
    iconName: 'HeartPulse',
    shortDescription: 'Heart health, cardiovascular diseases, hypertension & chest pain management.',
    fullDescription: 'Comprehensive care for congenital and acquired heart conditions, arrhythmia, coronary artery disease, high blood pressure, and preventive cardiac wellness.',
    doctorCount: 14,
    popularConditions: ['Hypertension', 'Arrhythmia', 'Chest Pain', 'High Cholesterol', 'Palpitations', 'Heart Failure'],
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Cosmetology',
    slug: 'dermatology',
    iconName: 'Sparkles',
    shortDescription: 'Skin conditions, acne, eczema, psoriasis, hair loss and clinical cosmetology.',
    fullDescription: 'Expert evaluation for medical dermatology, inflammatory skin disorders, mole screening, allergic reactions, and aesthetic skin health.',
    doctorCount: 22,
    popularConditions: ['Severe Acne', 'Eczema', 'Alopecia / Hair Loss', 'Psoriasis', 'Fungal Infections', 'Skin Allergies'],
  },
  {
    id: 'general-medicine',
    name: 'General Internal Medicine',
    slug: 'general-medicine',
    iconName: 'Stethoscope',
    shortDescription: 'Fever, chronic disease management, infections, lifestyle conditions & checkups.',
    fullDescription: 'Primary clinical consultation for multi-system illnesses, diagnostic workups, seasonal infections, fatigue, metabolic syndrome, and routine health evaluations.',
    doctorCount: 31,
    popularConditions: ['Viral Fever', 'Uncontrolled Diabetes', 'Fatigue & Weakness', 'Thyroid Imbalance', 'Respiratory Infections'],
  },
  {
    id: 'neurology',
    name: 'Neurology',
    slug: 'neurology',
    iconName: 'Brain',
    shortDescription: 'Migraines, neuropathy, vertigo, seizure disorders and neurological care.',
    fullDescription: 'Specialized clinical assessment for headaches, neuromuscular conditions, nerve pain, movement disorders, and cerebrovascular evaluations.',
    doctorCount: 9,
    popularConditions: ['Chronic Migraine', 'Peripheral Neuropathy', 'Vertigo & Dizziness', 'Seizures', 'Tremors', 'Sleep Disorders'],
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Child Care',
    slug: 'pediatrics',
    iconName: 'Baby',
    shortDescription: 'Infant care, vaccination, growth monitoring and childhood illnesses.',
    fullDescription: 'Gentle, attentive pediatric healthcare covering newborn care, developmental milestones, adolescent health, asthma, and common childhood infections.',
    doctorCount: 18,
    popularConditions: ['Childhood Asthma', 'Colic & Reflux', 'Vaccination Queries', 'Growth Delay', 'Allergic Cough', 'Skin Rashes'],
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Mental Health',
    slug: 'psychiatry',
    iconName: 'Activity',
    shortDescription: 'Anxiety, depression, ADHD, stress management and psychotherapy.',
    fullDescription: 'Compassionate, confidential psychiatric consultation, psychopharmacology, clinical psychotherapy, cognitive evaluations, and work-life burnout support.',
    doctorCount: 16,
    popularConditions: ['Generalized Anxiety', 'Major Depression', 'Insomnia / Sleep Issues', 'ADHD', 'Panic Attacks', 'Panic Episodes'],
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Care',
    slug: 'orthopedics',
    iconName: 'Bone',
    shortDescription: 'Joint pain, arthritis, sports injuries, fractures and spine wellness.',
    fullDescription: 'Expert care for bone health, cartilage preservation, knee & hip osteoarthritic management, ligament strains, and postural spine corrections.',
    doctorCount: 12,
    popularConditions: ['Knee Osteoarthritis', 'Lower Back Pain', 'Frozen Shoulder', 'Sports Injury', 'Cervical Spondylosis'],
  },
  {
    id: 'gynecology',
    name: 'Obstetrics & Gynecology',
    slug: 'gynecology',
    iconName: 'ShieldPlus',
    shortDescription: 'Women health, PCOS/PCOD, prenatal consultation and hormonal balance.',
    fullDescription: 'Holistic reproductive and gynecological medicine, menstrual irregularity treatment, PCOS management, preconception planning, and menopausal care.',
    doctorCount: 20,
    popularConditions: ['PCOS / PCOD', 'Irregular Periods', 'Pelvic Pain', 'Pre-conception Care', 'UTI', 'Hormonal Imbalance'],
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    slug: 'gastroenterology',
    iconName: 'Pill',
    shortDescription: 'Digestive tract, acid reflux, IBS, liver health and abdominal disorders.',
    fullDescription: 'Focused medical care for gastrointestinal disorders, acid peptic disease, fatty liver, inflammatory bowel disease, and chronic constipation.',
    doctorCount: 11,
    popularConditions: ['Acid Reflux / GERD', 'Irritable Bowel (IBS)', 'Fatty Liver Disease', 'Chronic Acidity', 'Food Intolerances'],
  },
  {
    id: 'ent',
    name: 'ENT (Ear, Nose & Throat)',
    slug: 'ent',
    iconName: 'Microscope',
    shortDescription: 'Sinusitis, hearing issues, throat infections, tonsillitis and snoring.',
    fullDescription: 'Specialist otolaryngology care for persistent sinusitis, allergic rhinitis, tinnitus, voice fatigue, and tonsillar inflammation.',
    doctorCount: 13,
    popularConditions: ['Sinusitis', 'Tonsillitis', 'Tinnitus / Ringing', 'Deviated Septum', 'Allergic Rhinitis', 'Ear Infection'],
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology & Diabetology',
    slug: 'endocrinology',
    iconName: 'Flame',
    shortDescription: 'Type 1 & 2 diabetes, Hashimoto thyroiditis, adrenal and metabolic health.',
    fullDescription: 'In-depth hormonal medicine, continuous glucose monitoring guidance, thyroid nodules, obesity medicine, and bone density management.',
    doctorCount: 10,
    popularConditions: ['Type 2 Diabetes', 'Hypothyroidism', 'Hyperthyroidism', 'Obesity Management', 'Metabolic Syndrome'],
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology (Eye Care)',
    slug: 'ophthalmology',
    iconName: 'Eye',
    shortDescription: 'Digital eye strain, dry eyes, glaucoma, cataract check and visual health.',
    fullDescription: 'Comprehensive optical and medical eye consultations, screen-induced ocular fatigue, allergic conjunctivitis, and routine visual screening.',
    doctorCount: 8,
    popularConditions: ['Digital Eye Strain', 'Dry Eye Syndrome', 'Conjunctivitis', 'Blurry Vision', 'Stye & Eye Irritation'],
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    title: 'Senior Interventional Cardiologist',
    slug: 'dr-priya-sharma',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    specialtyId: 'cardiology',
    specialtyName: 'Cardiology',
    subSpecialties: ['Preventive Cardiology', 'Heart Failure Management', 'Women Heart Health'],
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology) - AIIMS New Delhi',
    experienceYears: 16,
    registrationNumber: 'MCI-2008-49281',
    hospitalAffiliation: 'Fortis Escorts Heart Institute, New Delhi',
    consultationFee: 1200,
    rating: 4.94,
    totalReviews: 328,
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Renowned cardiologist with over 16 years of academic and clinical excellence. Specializes in preventive cardiac care, hypertension control, and holistic cardiovascular longevity.',
    about: 'Dr. Priya Sharma completed her advanced cardiology residency at the All India Institute of Medical Sciences (AIIMS). She is dedicated to evidence-based medicine that combines cutting-edge diagnostics with lifestyle modifications. She has published over 25 papers in indexed international cardiology journals and consults patients across India and Southeast Asia.',
    isVerified: true,
    isOnlineNow: true,
    nextAvailableSlot: 'Today, 04:30 PM',
    location: 'New Delhi, India',
    reviews: [
      {
        id: 'rev-1',
        patientName: 'Vikas Malhotra',
        rating: 5,
        date: '24 Oct 2026',
        comment: 'Dr. Priya is exceptionally patient and clear. She reviewed my ECG and lipid panel during the video consult and provided a reassuring step-by-step medication adjustment.',
        consultationType: 'video',
        verified: true,
      },
      {
        id: 'rev-2',
        patientName: 'Meera Iyer',
        rating: 5,
        date: '18 Oct 2026',
        comment: 'Very thorough explanation regarding my mother high blood pressure. Prescription was uploaded within minutes with detailed dietary guidance.',
        consultationType: 'video',
        verified: true,
      },
      {
        id: 'rev-3',
        patientName: 'Anil Sengupta',
        rating: 4.8,
        date: '02 Oct 2026',
        comment: 'Compassionate, highly professional, no unnecessary medicines prescribed. Highly recommend Dr. Sharma!',
        consultationType: 'audio',
        verified: true,
      }
    ],
    availability: [
      {
        date: '2026-10-31',
        dayOfWeek: 'Today',
        displayDate: 'Today, Oct 31',
        slots: [
          { time: '04:30 PM', available: true },
          { time: '05:00 PM', available: true },
          { time: '05:30 PM', available: false },
          { time: '06:00 PM', available: true },
          { time: '06:30 PM', available: true },
        ],
      },
      {
        date: '2026-11-01',
        dayOfWeek: 'Sun',
        displayDate: 'Tomorrow, Nov 1',
        slots: [
          { time: '10:00 AM', available: true },
          { time: '10:30 AM', available: true },
          { time: '11:00 AM', available: true },
          { time: '11:30 AM', available: false },
          { time: '12:00 PM', available: true },
          { time: '04:00 PM', available: true },
        ],
      },
      {
        date: '2026-11-02',
        dayOfWeek: 'Mon',
        displayDate: 'Mon, Nov 2',
        slots: [
          { time: '09:00 AM', available: true },
          { time: '09:30 AM', available: true },
          { time: '10:30 AM', available: true },
          { time: '02:00 PM', available: true },
          { time: '03:00 PM', available: true },
        ],
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Menon',
    title: 'Senior Consultant Neurologist',
    slug: 'dr-rajesh-menon',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    specialtyId: 'neurology',
    specialtyName: 'Neurology',
    subSpecialties: ['Headache Disorders', 'Epileptology', 'Neuro-rehabilitation'],
    qualifications: 'MBBS, MD, DM (Neurology) - NIMHANS, Bengaluru',
    experienceYears: 19,
    registrationNumber: 'KMC-2005-77319',
    hospitalAffiliation: 'Manipal Hospitals, Bengaluru',
    consultationFee: 1500,
    rating: 4.96,
    totalReviews: 412,
    languages: ['English', 'Malayalam', 'Kannada', 'Hindi'],
    bio: 'Distinguished neurologist trained at NIMHANS. Globally recognized for migraine prevention protocols and complex neuropathy diagnostics.',
    about: 'Dr. Rajesh Menon brings nearly two decades of clinical expertise in central and peripheral nervous system disorders. He believes in minimal effective drug therapy supported by sleep hygiene, nutrition, and ergonomic adjustments.',
    isVerified: true,
    isOnlineNow: false,
    nextAvailableSlot: 'Tomorrow, 10:30 AM',
    location: 'Bengaluru, India',
    reviews: [
      {
        id: 'rev-4',
        patientName: 'Sunil Nair',
        rating: 5,
        date: '26 Oct 2026',
        comment: 'Suffered from debilitating migraines for 4 years. Dr. Menon diagnosed the trigger in one visit and customized a preventative therapy that changed my life.',
        consultationType: 'video',
        verified: true,
      },
      {
        id: 'rev-5',
        patientName: 'Rashmi Patel',
        rating: 5,
        date: '14 Oct 2026',
        comment: 'Calm, patient listener who explained MRI results in crystal-clear English without medical jargon.',
        consultationType: 'video',
        verified: true,
      }
    ],
    availability: [
      {
        date: '2026-11-01',
        dayOfWeek: 'Sun',
        displayDate: 'Tomorrow, Nov 1',
        slots: [
          { time: '10:30 AM', available: true },
          { time: '11:15 AM', available: true },
          { time: '12:00 PM', available: true },
          { time: '03:30 PM', available: true },
        ],
      },
      {
        date: '2026-11-02',
        dayOfWeek: 'Mon',
        displayDate: 'Mon, Nov 2',
        slots: [
          { time: '10:00 AM', available: true },
          { time: '10:45 AM', available: true },
          { time: '04:00 PM', available: true },
        ],
      }
    ]
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Sen',
    title: 'Consultant Dermatologist & Trichologist',
    slug: 'dr-ananya-sen',
    avatar: 'https://images.unsplash.com/photo-1594824813568-193498801d0d?auto=format&fit=crop&q=80&w=600',
    specialtyId: 'dermatology',
    specialtyName: 'Dermatology & Cosmetology',
    subSpecialties: ['Clinical Trichology', 'Acne & Pigmentation', 'Atopic Eczema'],
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy) - CMC Vellore',
    experienceYears: 11,
    registrationNumber: 'WBMC-2013-62184',
    hospitalAffiliation: 'Apollo Multispeciality Hospitals, Kolkata',
    consultationFee: 950,
    rating: 4.89,
    totalReviews: 289,
    languages: ['English', 'Bengali', 'Hindi'],
    bio: 'Specialist in medical dermatology, stubborn hormonal acne, and evidence-based hair loss protocols with a patient-first approach.',
    about: 'Dr. Ananya Sen trained at the prestigious Christian Medical College (CMC), Vellore. She advocates safe, barrier-repair skincare routines and targeted medical therapeutics, avoiding predatory cosmetic procedures.',
    isVerified: true,
    isOnlineNow: true,
    nextAvailableSlot: 'Today, 06:00 PM',
    location: 'Kolkata, India',
    reviews: [
      {
        id: 'rev-6',
        patientName: 'Debolina Bose',
        rating: 5,
        date: '28 Oct 2026',
        comment: 'Dr. Sen identified my fungal acne in 5 minutes after other doctors gave me standard steroid creams. Skin has completely cleared up!',
        consultationType: 'video',
        verified: true,
      },
      {
        id: 'rev-7',
        patientName: 'Karan Mehra',
        rating: 4.8,
        date: '20 Oct 2026',
        comment: 'Very practical advice. She asked me to upload close-up photos prior to the consult which saved a lot of time.',
        consultationType: 'video',
        verified: true,
      }
    ],
    availability: [
      {
        date: '2026-10-31',
        dayOfWeek: 'Today',
        displayDate: 'Today, Oct 31',
        slots: [
          { time: '06:00 PM', available: true },
          { time: '06:30 PM', available: true },
          { time: '07:00 PM', available: true },
        ],
      },
      {
        date: '2026-11-01',
        dayOfWeek: 'Sun',
        displayDate: 'Tomorrow, Nov 1',
        slots: [
          { time: '02:00 PM', available: true },
          { time: '02:30 PM', available: true },
          { time: '03:00 PM', available: false },
          { time: '03:30 PM', available: true },
        ],
      }
    ]
  },
  {
    id: 'doc-4',
    name: 'Dr. Siddharth Verma',
    title: 'Lead Physician - Internal Medicine',
    slug: 'dr-siddharth-verma',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    specialtyId: 'general-medicine',
    specialtyName: 'General Internal Medicine',
    subSpecialties: ['Infectious Diseases', 'Metabolic Syndrome', 'Geriatric Care'],
    qualifications: 'MBBS, MD (General Medicine) - KGMU Lucknow, MRCP (UK)',
    experienceYears: 14,
    registrationNumber: 'UPMC-2010-39182',
    hospitalAffiliation: 'Medanta - The Medicity, Gurugram',
    consultationFee: 850,
    rating: 4.92,
    totalReviews: 540,
    languages: ['English', 'Hindi', 'Urdu'],
    bio: 'Dedicated primary care consultant focused on accurate differential diagnostics, rational antibiotic use, and chronic disease stewardship.',
    about: 'Dr. Verma serves as a clinical leader in internal medicine. His clinical acumen spans complex fevers of unknown origin, hypertension, metabolic liver conditions, and preventive geriatric care.',
    isVerified: true,
    isOnlineNow: true,
    nextAvailableSlot: 'Today, 05:15 PM',
    location: 'Gurugram / NCR, India',
    reviews: [
      {
        id: 'rev-8',
        patientName: 'Alok Gupta',
        rating: 5,
        date: '27 Oct 2026',
        comment: 'Most sensible doctor I have consulted in NCR. Did not push for endless tests, only ordered relevant CBC and dengue serology.',
        consultationType: 'video',
        verified: true,
      }
    ],
    availability: [
      {
        date: '2026-10-31',
        dayOfWeek: 'Today',
        displayDate: 'Today, Oct 31',
        slots: [
          { time: '05:15 PM', available: true },
          { time: '05:45 PM', available: true },
          { time: '06:15 PM', available: true },
          { time: '07:00 PM', available: true },
        ],
      },
      {
        date: '2026-11-01',
        dayOfWeek: 'Sun',
        displayDate: 'Tomorrow, Nov 1',
        slots: [
          { time: '09:00 AM', available: true },
          { time: '09:30 AM', available: true },
          { time: '10:00 AM', available: true },
        ],
      }
    ]
  },
  {
    id: 'doc-5',
    name: 'Dr. Kavita Nambiar',
    title: 'Consultant Pediatrician & Neonatologist',
    slug: 'dr-kavita-nambiar',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
    specialtyId: 'pediatrics',
    specialtyName: 'Pediatrics & Child Care',
    subSpecialties: ['Pediatric Allergy', 'Child Nutrition', 'Infant Growth & Development'],
    qualifications: 'MBBS, DCH, DNB (Pediatrics), Fellowship in Neonatology (Sydney)',
    experienceYears: 13,
    registrationNumber: 'TMC-2011-88402',
    hospitalAffiliation: 'Aster Medcity, Kochi',
    consultationFee: 900,
    rating: 4.97,
    totalReviews: 367,
    languages: ['English', 'Malayalam', 'Tamil', 'Hindi'],
    bio: 'Compassionate pediatrician loved by parents for her gentle demeanor and clear guidance on infant nutrition, allergies, and vaccination.',
    about: 'Dr. Kavita Nambiar provides holistic pediatric care with a focus on preventative immunity, child development milestones, and calming parental anxiety through responsive digital consultations.',
    isVerified: true,
    isOnlineNow: false,
    nextAvailableSlot: 'Tomorrow, 09:30 AM',
    location: 'Kochi, India',
    reviews: [
      {
        id: 'rev-9',
        patientName: 'Aishwarya Raman',
        rating: 5,
        date: '25 Oct 2026',
        comment: 'She put our anxious minds at ease regarding our 6-month-old persistent reflux. The dietary tweaks worked wonders.',
        consultationType: 'video',
        verified: true,
      }
    ],
    availability: [
      {
        date: '2026-11-01',
        dayOfWeek: 'Sun',
        displayDate: 'Tomorrow, Nov 1',
        slots: [
          { time: '09:30 AM', available: true },
          { time: '10:00 AM', available: true },
          { time: '10:30 AM', available: true },
          { time: '11:30 AM', available: true },
        ],
      }
    ]
  },
  {
    id: 'doc-6',
    name: 'Dr. Farhan Qureshi',
    title: 'Consultant Psychiatrist & Neuropsychiatrist',
    slug: 'dr-farhan-qureshi',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    specialtyId: 'psychiatry',
    specialtyName: 'Psychiatry & Mental Health',
    subSpecialties: ['Anxiety & Panic Disorders', 'Adult ADHD', 'Depression & Burnout'],
    qualifications: 'MBBS, MD (Psychiatry) - PGIMER Chandigarh',
    experienceYears: 12,
    registrationNumber: 'DMC-2012-51980',
    hospitalAffiliation: 'Max Super Speciality Hospital, Saket, New Delhi',
    consultationFee: 1400,
    rating: 4.91,
    totalReviews: 245,
    languages: ['English', 'Hindi', 'Urdu'],
    bio: 'Empathetic psychiatric clinician specializing in stress, adult neurodivergence, sleep disorders, and integrated cognitive-behavioral strategies.',
    about: 'Dr. Farhan Qureshi creates a non-judgmental, psychologically safe virtual space for individuals facing anxiety, emotional exhaustion, panic triggers, and mood imbalances.',
    isVerified: true,
    isOnlineNow: true,
    nextAvailableSlot: 'Today, 07:30 PM',
    location: 'New Delhi, India',
    reviews: [
      {
        id: 'rev-10',
        patientName: 'Aditya Swaminathan',
        rating: 5,
        date: '22 Oct 2026',
        comment: 'The most empathetic doctor I have ever spoken to. He listened without any rushing, validated my struggles, and explained the medication plan transparently.',
        consultationType: 'video',
        verified: true,
      }
    ],
    availability: [
      {
        date: '2026-10-31',
        dayOfWeek: 'Today',
        displayDate: 'Today, Oct 31',
        slots: [
          { time: '07:30 PM', available: true },
          { time: '08:15 PM', available: true },
        ],
      },
      {
        date: '2026-11-01',
        dayOfWeek: 'Sun',
        displayDate: 'Tomorrow, Nov 1',
        slots: [
          { time: '04:00 PM', available: true },
          { time: '04:45 PM', available: true },
          { time: '05:30 PM', available: true },
        ],
      }
    ]
  },
  {
    id: 'doc-7',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Senior Obstetrician & Gynecologist',
    slug: 'dr-meenakshi-sundaram',
    avatar: 'https://images.unsplash.com/photo-1594824813568-193498801d0d?auto=format&fit=crop&q=80&w=600',
    specialtyId: 'gynecology',
    specialtyName: 'Obstetrics & Gynecology',
    subSpecialties: ['PCOS Management', 'High-Risk Pregnancy Guidance', 'Perimenopause'],
    qualifications: 'MBBS, MS (OBGYN) - Madras Medical College, FRCOG (London)',
    experienceYears: 21,
    registrationNumber: 'TNMC-2003-34821',
    hospitalAffiliation: 'Apollo Women Hospital, Chennai',
    consultationFee: 1300,
    rating: 4.98,
    totalReviews: 610,
    languages: ['English', 'Tamil', 'Telugu', 'Hindi'],
    bio: 'Distinguished women health specialist with two decades of clinical experience in PCOS reversal, fertility counseling, and hormone balancing.',
    about: 'Dr. Meenakshi Sundaram has guided thousands of women through adolescence, reproductive planning, and healthy menopause with warmth, scientific rigor, and patient empowerment.',
    isVerified: true,
    isOnlineNow: false,
    nextAvailableSlot: 'Mon, 11:00 AM',
    location: 'Chennai, India',
    reviews: [
      {
        id: 'rev-11',
        patientName: 'Shruti Venkat',
        rating: 5,
        date: '26 Oct 2026',
        comment: 'Dr. Meenakshi is a blessing. Her advice on PCOS management through lifestyle and low-dose metformin helped regularize my cycles in 3 months.',
        consultationType: 'video',
        verified: true,
      }
    ],
    availability: [
      {
        date: '2026-11-02',
        dayOfWeek: 'Mon',
        displayDate: 'Mon, Nov 2',
        slots: [
          { time: '11:00 AM', available: true },
          { time: '11:45 AM', available: true },
          { time: '12:30 PM', available: true },
          { time: '03:00 PM', available: true },
        ],
      }
    ]
  },
  {
    id: 'doc-8',
    name: 'Dr. Arindam Mukherjee',
    title: 'Orthopedic Surgeon & Sports Medicine',
    slug: 'dr-arindam-mukherjee',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600',
    specialtyId: 'orthopedics',
    specialtyName: 'Orthopedics & Joint Care',
    subSpecialties: ['Knee & Shoulder Arthroscopy', 'Spine Biomechanics', 'Cartilage Repair'],
    qualifications: 'MBBS, MS (Ortho) - Calcutta National Medical College, MCh Orth (UK)',
    experienceYears: 17,
    registrationNumber: 'WBMC-2007-42890',
    hospitalAffiliation: 'AMRI Hospitals, Kolkata',
    consultationFee: 1100,
    rating: 4.93,
    totalReviews: 310,
    languages: ['English', 'Bengali', 'Hindi'],
    bio: 'Orthopedic specialist focused on non-surgical joint rehabilitation, ergonomic spine recovery, and active athletic restoration.',
    about: 'Dr. Mukherjee advises conservative, physical therapy-focused solutions whenever possible, helping patients regain painless mobility without rushing into invasive surgeries.',
    isVerified: true,
    isOnlineNow: true,
    nextAvailableSlot: 'Today, 08:00 PM',
    location: 'Kolkata, India',
    reviews: [
      {
        id: 'rev-12',
        patientName: 'Pradeep Chatterjee',
        rating: 5,
        date: '23 Oct 2026',
        comment: 'Great diagnosis for my runner knee problem. Gave me a targeted quad-strengthening routine that eliminated the pain.',
        consultationType: 'video',
        verified: true,
      }
    ],
    availability: [
      {
        date: '2026-10-31',
        dayOfWeek: 'Today',
        displayDate: 'Today, Oct 31',
        slots: [
          { time: '08:00 PM', available: true },
          { time: '08:30 PM', available: true },
        ],
      },
      {
        date: '2026-11-01',
        dayOfWeek: 'Sun',
        displayDate: 'Tomorrow, Nov 1',
        slots: [
          { time: '11:00 AM', available: true },
          { time: '11:30 AM', available: true },
          { time: '12:00 PM', available: true },
        ],
      }
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'patient-1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  role: 'patient',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  phone: '+91 98765 43210',
  bloodGroup: 'B+ Positive',
  age: 32,
  gender: 'Male',
  emergencyContact: '+91 98765 11223 (Pooja Sharma - Spouse)',
  allergies: ['Penicillin', 'Sulfa drugs']
};

export const INITIAL_DOCTOR_USER: UserProfile = {
  id: 'doc-1',
  name: 'Dr. Priya Sharma',
  email: 'priya.sharma@anvithealth.org',
  role: 'doctor',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  phone: '+91 98111 22334',
  specialtyId: 'cardiology',
  specialtyName: 'Cardiology',
  registrationNumber: 'MCI-2008-49281',
  experienceYears: 16,
  hospitalAffiliation: 'Fortis Escorts Heart Institute, New Delhi',
  consultationFee: 1200,
  isVerified: true
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    doctorId: 'doc-1',
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialty: 'Cardiology',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    doctorHospital: 'Fortis Escorts, New Delhi',
    patientId: 'patient-1',
    patientName: 'Rahul Sharma',
    patientEmail: 'rahul.sharma@example.com',
    patientPhone: '+91 98765 43210',
    consultationType: 'video',
    date: '2026-10-31',
    timeSlot: '04:30 PM',
    status: 'confirmed',
    symptoms: 'Occasional chest tightness after evening stairs and elevated home BP readings (142/92).',
    amountPaid: 1200,
    invoiceNumber: 'INV-ANV-2026-9041',
    notes: 'Please keep previous lipid profile and recent home blood pressure log handy for the screen share.',
    prescriptionId: undefined,
    createdAt: '2026-10-30T10:15:00Z'
  },
  {
    id: 'apt-102',
    doctorId: 'doc-3',
    doctorName: 'Dr. Ananya Sen',
    doctorSpecialty: 'Dermatology & Cosmetology',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813568-193498801d0d?auto=format&fit=crop&q=80&w=200',
    doctorHospital: 'Apollo Multispeciality, Kolkata',
    patientId: 'patient-1',
    patientName: 'Rahul Sharma',
    patientEmail: 'rahul.sharma@example.com',
    patientPhone: '+91 98765 43210',
    consultationType: 'video',
    date: '2026-10-15',
    timeSlot: '06:00 PM',
    status: 'completed',
    symptoms: 'Scalp itching, seasonal dandruff, and mild redness around hair borders.',
    amountPaid: 950,
    invoiceNumber: 'INV-ANV-2026-8712',
    prescriptionId: 'rx-201',
    createdAt: '2026-10-14T14:30:00Z'
  },
  {
    id: 'apt-103',
    doctorId: 'doc-4',
    doctorName: 'Dr. Siddharth Verma',
    doctorSpecialty: 'General Internal Medicine',
    doctorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    doctorHospital: 'Medanta, Gurugram',
    patientId: 'patient-1',
    patientName: 'Rahul Sharma',
    patientEmail: 'rahul.sharma@example.com',
    patientPhone: '+91 98765 43210',
    consultationType: 'audio',
    date: '2026-09-20',
    timeSlot: '05:30 PM',
    status: 'completed',
    symptoms: 'Post-viral fatigue and persistent dry cough for 2 weeks.',
    amountPaid: 850,
    invoiceNumber: 'INV-ANV-2026-7910',
    prescriptionId: 'rx-202',
    createdAt: '2026-09-19T09:00:00Z'
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-201',
    appointmentId: 'apt-102',
    patientId: 'patient-1',
    patientName: 'Rahul Sharma',
    patientAge: 32,
    patientGender: 'Male',
    doctorId: 'doc-3',
    doctorName: 'Dr. Ananya Sen',
    doctorSpecialty: 'Dermatology & Cosmetology',
    doctorRegNo: 'WBMC-2013-62184',
    date: '15 Oct 2026',
    diagnosis: 'Seborrheic Dermatitis of the Scalp with Secondary Erythema',
    vitals: {
      bp: '124/80 mmHg',
      pulse: '74 bpm',
      temp: '98.4 F',
      spo2: '99%'
    },
    medications: [
      {
        id: 'med-1',
        name: 'Ketoconazole 2% + Zinc Pyrithione Anti-dandruff Shampoo',
        dosage: 'Apply to damp scalp, leave for 5 mins before rinsing',
        frequency: 'Twice weekly',
        duration: '4 weeks',
        notes: 'Do not use excessively hot water; avoid mineral hair oils.'
      },
      {
        id: 'med-2',
        name: 'Desonide 0.05% Scalp Lotion',
        dosage: 'Few drops on inflamed scalp patches only',
        frequency: 'Once daily at bedtime',
        duration: '7 days only',
        notes: 'Stop immediately once redness subsides.'
      }
    ],
    lifestyleAdvice: 'Wash hair after gym or heavy perspiration. Switch to silk or microfiber pillowcases.',
    followUpDate: '15 Nov 2026 if scaling persists'
  },
  {
    id: 'rx-202',
    appointmentId: 'apt-103',
    patientId: 'patient-1',
    patientName: 'Rahul Sharma',
    patientAge: 32,
    patientGender: 'Male',
    doctorId: 'doc-4',
    doctorName: 'Dr. Siddharth Verma',
    doctorSpecialty: 'General Internal Medicine',
    doctorRegNo: 'UPMC-2010-39182',
    date: '20 Sep 2026',
    diagnosis: 'Post-Viral Bronchial Hyperresponsiveness & Mild Dehydration',
    vitals: {
      bp: '128/82 mmHg',
      pulse: '80 bpm',
      temp: '98.6 F',
      spo2: '98%'
    },
    medications: [
      {
        id: 'med-3',
        name: 'Levocetirizine 5mg + Montelukast 10mg Tablets',
        dosage: '1 tablet',
        frequency: 'Once daily (Night)',
        duration: '10 days',
        notes: 'May cause mild drowsiness; take after dinner.'
      },
      {
        id: 'med-4',
        name: 'Steam Inhalation with Saline Respules',
        dosage: 'Inhale steam',
        frequency: 'Twice daily',
        duration: '5 days',
        notes: 'Keep well hydrated with warm water.'
      }
    ],
    labTestsRecommended: ['Complete Blood Count (CBC) with ESR', 'Serum Ferritin'],
    lifestyleAdvice: 'Drink 2.5 to 3 liters of warm water daily. Rest vocal cords; avoid chilled drinks.',
    followUpDate: 'As needed if fever recurs'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    author: 'Sunita Ray',
    location: 'Kolkata, India',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    quote: 'Anvit made consulting top specialists from Delhi and Bengaluru effortless. My father cardiologist consultation was timely, deeply thorough, and the prescription was sent straight to our phone.',
    rating: 5,
    tag: 'Cardiac Consultation'
  },
  {
    id: 't-2',
    author: 'Dr. Tushar Kanti',
    location: 'Mumbai, India',
    role: 'Practicing Pulmonologist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    quote: 'As a doctor, the platform interface is remarkably clinical and respectful of our workflow. No gimmicks, secure patient records, and smooth telehealth video with instantaneous prescription sign-off.',
    rating: 5,
    tag: 'Doctor Experience'
  },
  {
    id: 't-3',
    author: 'Aakash Singhania',
    location: 'Gurugram, India',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    quote: 'Booking an evening consultation took literally under 60 seconds. The transparent fee breakdown and emergency safety guidance gave me immense peace of mind.',
    rating: 5,
    tag: 'Emergency & Urgent Care'
  }
];

export const FAQS = [
  {
    question: 'How do online consultations on Anvit work?',
    answer: 'Select a verified doctor by specialty, view their credentials, experience, and fee, then pick an open time slot that suits you. After completing the simple confirmation, you will receive a secure video/audio consultation link. You can test your camera/mic beforehand and join the encrypted room with one click.'
  },
  {
    question: 'Are the doctors on Anvit verified and licensed?',
    answer: 'Yes, absolutely. Every doctor on Anvit undergoes a stringent credential verification process where their medical degree, State/National Medical Council registration number, and clinical background are verified before they can accept appointments.'
  },
  {
    question: 'How do I receive my medical prescription and clinical notes?',
    answer: 'During or immediately after your consultation, your doctor drafts and digitally signs your official prescription. It becomes instantly accessible in your Patient Dashboard under "Prescriptions & Records" as a high-resolution, printable document.'
  },
  {
    question: 'Can I reschedule or cancel my appointment?',
    answer: 'Yes. You can reschedule or cancel directly from your Patient Dashboard up to 2 hours before the scheduled time slot for a full instant refund or immediate slot transfer without any cancellation penalties.'
  },
  {
    question: 'What if I am experiencing an urgent medical emergency?',
    answer: 'Anvit is designed for scheduled and non-life-threatening telemedicine consultations. If you are experiencing severe chest pain, shortness of breath, sudden numbness, or heavy bleeding, please immediately call your local emergency medical service (112 in India, 911 in the US) or visit the nearest emergency room.'
  }
];

