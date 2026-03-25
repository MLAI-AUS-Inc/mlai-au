// MedHack: Frontiers 2026 — Information Pack Data

export interface MedhackSection {
  id: string;
  title: string;
  level: number;
}

export interface MedhackSubtopic {
  name: string;
  type: "pitching" | "coding";
  description: string;
}

export interface MedhackScheduleDay {
  title: string;
  date: string;
  dateTime: string;
  summary: string;
  location?: string;
  timeSlots: Array<{
    name: string;
    start: string;
    end?: string;
  }>;
}

export interface MedhackJudgingCriterion {
  name: string;
  description: string;
  questions: string[];
  high: string;
  medium: string;
  low: string;
  maxScore: number;
}

export interface MedhackPerson {
  name: string;
  role: string;
  org?: string;
  bio: string;
}

export interface MedhackMentorScheduleDay {
  title: string;
  date: string;
  timeBlocks: string[];
  mentors: Array<{
    name: string;
    available: boolean[];
  }>;
}

export interface MedhackPolicy {
  title: string;
  description: string;
}

export interface MedhackContact {
  platform: string;
  url: string;
  label: string;
}

export interface MedhackConductRule {
  title: string;
  description: string;
}

// --- Table of Contents ---

export const MEDHACK_SECTIONS: MedhackSection[] = [
  { id: "hero", title: "Overview", level: 2 },
  { id: "about", title: "About Us", level: 2 },
  { id: "event", title: "The Event", level: 2 },
  { id: "subtopics", title: "Subtopics", level: 2 },
  { id: "venue", title: "Venue", level: 2 },
  { id: "schedule", title: "Schedule", level: 2 },
  { id: "how-it-works", title: "How It Works", level: 2 },
  { id: "judging", title: "Judging", level: 2 },
  { id: "mentor-schedules", title: "Mentor Schedules", level: 2 },
  { id: "code-of-conduct", title: "Code of Conduct", level: 2 },
  { id: "policies", title: "Policies & Info", level: 2 },
  { id: "contact", title: "Contact & Socials", level: 2 },
];

// --- About ---

export const MEDHACK_ABOUT = {
  mlai: "MLAI is a not-for-profit organization fostering a vibrant community passionate about AI. With over 10,000 members from diverse backgrounds\u2014data scientists, AI developers, healthcare professionals, and students\u2014MLAI\u2019s mission is to make AI accessible, fun, and impactful. From monthly lightning talks to large-scale hackathons, MLAI\u2019s events are always oversubscribed, reflecting the community\u2019s strong demand for practical AI applications, real-world challenges, and meaningful professional connections. By consistently delivering value to participants and sponsors, MLAI nurtures innovation and drives forward the future of AI in Australia and beyond.",
  mymi: "MYMI is a student-led organization affiliated with Monash University, dedicated to bridging the gap between medicine, technology, and entrepreneurship. Our mission is to cultivate the next generation of medtech innovators by providing opportunities for students and professionals to collaborate on cutting-edge projects, gain industry insights, and develop essential skills for the future of healthcare. Through events, workshops, and networking sessions, MYMI empowers students to become proactive contributors to the medtech ecosystem.",
};

// --- Event Overview ---

export const MEDHACK_EVENT_OVERVIEW = {
  tagline: "Clinicians, builders and optimists in the same room for one intense weekend of problem-solving. Prototype real solutions to real healthcare bottlenecks.",
  description: "MedHack: Frontiers brings clinicians, builders and optimists into the same room for one intense weekend of problem-solving at the cutting edge of medical innovation. With professionals from medicine, data science, and AI development all under one roof, we\u2019re pushing the boundaries of what\u2019s possible in healthcare.",
  goal: "The goal is simple yet ambitious: leverage cutting-edge technology to solve pressing real-world healthcare challenges.",
  participation: "By working closely with doctors, nurses, pharmacists, and industry mentors, participants will create AI-driven solutions that tackle high-impact healthcare challenges. We encourage everyone to participate in both tracts\u2014code your solution in the Small Tract and pitch your ideas in the Big Tract for the complete experience. Whether you\u2019re new to AI or a seasoned expert, this hackathon is your chance to contribute to the future of healthcare innovation.",
};

// --- Subtopics ---

export const MEDHACK_SUBTOPICS: MedhackSubtopic[] = [
  {
    name: "Aging Populations",
    type: "pitching",
    description: "As populations age, healthcare systems face rising multi-morbidity, frailty and demand for long-term support. This stream focuses on improving quality of life for older adults in areas around falls, dementia and mobility.",
  },
  {
    name: "Ward",
    type: "pitching",
    description: "Inpatient wards are where most hospital care actually happens, and where small failures can quietly escalate. This stream targets monitoring, communication and coordination to improve outcomes during hospital stays.",
  },
  {
    name: "Workforce Load",
    type: "pitching",
    description: "Healthcare workers are under sustained pressure from increasing demand and limited resources. This stream targets systems that reduce cognitive load and support safe, sustainable care delivery so clinicians can spend more time with patients.",
  },
  {
    name: "Emergency Department",
    type: "pitching",
    description: "Emergency departments operate under constant uncertainty and time pressure. This stream focuses on triage, early decision-making and patient flow to improve safety and responsiveness in acute care settings.",
  },
  {
    name: "Rural",
    type: "pitching",
    description: "Geography remains a major determinant of health outcomes. This stream focuses on delivering timely, high-quality care to rural and remote communities despite distance, workforce shortages and limited infrastructure.",
  },
  {
    name: "Preventative Medicine",
    type: "coding",
    description: "Earlier insight can change outcomes. This stream explores how data, modelling, and clinical indicators can be used to anticipate risk, personalise care, and support better decision-making before deterioration occurs.",
  },
];

// --- Venue ---

export const MEDHACK_VENUE = {
  hackathon: {
    name: "Monash University Clayton Campus",
    address: "Clayton, Victoria",
    dates: "Saturday 21 \u2013 Sunday 22 February 2026",
    notes: "Day 1 (Saturday) is mandatory for registration and orientation. Day 2 (Sunday) is optional but highly recommended\u2014we\u2019ve reserved a space for your team with extra guidance, food, drinks, and activities.",
  },
  teamFormation: {
    name: "Stone & Chalk",
    address: "Melbourne CBD",
    date: "Sunday 15 February 2026, 5:00 PM \u2013 8:00 PM",
  },
  pitchNight: {
    name: "Monash College City Campus",
    address: "Docklands, Victoria",
    date: "Wednesday 4 March 2026, doors open 5:30 PM",
  },
};

// --- Schedule ---

export const MEDHACK_SCHEDULE: MedhackScheduleDay[] = [
  {
    title: "Team Formation",
    date: "Sunday Feb 15",
    dateTime: "2026-02-15",
    summary: "Meet potential teammates and form your team before the hack.",
    location: "Stone & Chalk, Melbourne CBD",
    timeSlots: [
      { name: "Team Formation / Ice Breakers / Social Activity", start: "5:00 PM" },
      { name: "Event wraps up", start: "8:00 PM" },
    ],
  },
  {
    title: "Hackathon Day 1",
    date: "Saturday Feb 21",
    dateTime: "2026-02-21",
    summary: "Mandatory registration, orientation and the main hack day.",
    location: "Monash University Clayton Campus",
    timeSlots: [
      { name: "Event start / Student sign-ins", start: "10:30 AM" },
      { name: "Welcome / Introduction speech", start: "11:00 AM" },
      { name: "Sponsor speeches", start: "11:30 AM" },
      { name: "Social Activity (Optional) / Hacking & Brainstorming", start: "12:30 PM" },
      { name: "Lunch and/or refreshments provided", start: "1:30 PM" },
      { name: "Mentors & Co-designers available / Hacking", start: "2:30 PM" },
      { name: "Workshop 1 - Technical", start: "3:00 PM" },
      { name: "Mentors & Co-designers available", start: "4:00 PM" },
      { name: "Workshop 2 - Technical", start: "5:45 PM" },
      { name: "Dinner and/or refreshments provided", start: "6:45 PM" },
      { name: "Mentors & Co-designers available / Hacking", start: "7:45 PM" },
      { name: "Day 1 wraps up", start: "8:45 PM" },
    ],
  },
  {
    title: "Hackathon Day 2",
    date: "Sunday Feb 22",
    dateTime: "2026-02-22",
    summary: "Optional second day for teams to continue building and get extra support.",
    location: "Monash University Clayton Campus",
    timeSlots: [
      { name: "Breakfast", start: "8:30 AM" },
      { name: "Morning Briefing / Hacking", start: "9:00 AM" },
      { name: "Mentors & Co-designers available", start: "9:30 AM" },
      { name: "Workshop 3 - Pitching", start: "10:30 AM" },
      { name: "Mentors & Co-designers available", start: "11:15 AM" },
      { name: "Lunch and/or refreshments provided", start: "12:15 PM" },
      { name: "Social Activity (Optional) / Hacking", start: "1:30 PM" },
      { name: "Mentors & Co-designers available", start: "2:30 PM" },
      { name: "Day 2 wraps up", start: "5:30 PM" },
    ],
  },
  {
    title: "Pitch Night",
    date: "Wednesday Mar 4",
    dateTime: "2026-03-04",
    summary: "Finalists pitch their solutions to judges, investors and a live audience.",
    location: "Monash College City Campus, Docklands",
    timeSlots: [
      { name: "Networking", start: "5:30 PM" },
      { name: "Acknowledgment of Country & Intro to Councillor", start: "6:00 PM" },
      { name: "Councillor opening remarks", start: "6:05 PM" },
      { name: "Sponsor introductions", start: "6:10 PM" },
      { name: "Overview of the event & introduction of judges", start: "6:20 PM" },
      { name: "Pitches (x4)", start: "6:30 PM" },
      { name: "Break", start: "7:10 PM" },
      { name: "Pitches (x4)", start: "7:30 PM" },
      { name: "Judges deliberate / Startup programs", start: "8:10 PM" },
      { name: "Winners announced", start: "8:30 PM" },
      { name: "Networking & after drinks", start: "8:40 PM" },
    ],
  },
];

// --- How It Works ---

export const MEDHACK_HOW_IT_WORKS = {
  intro: "MedHack: Frontiers has two tracts. We encourage all participants to take on both for the full experience\u2014code a solution and pitch your ideas.",
  tracts: [
    {
      name: "Small Tract (Coding)",
      description: "Perfect for those who want to dive into hands-on AI development. You\u2019ll receive continuous patient vitals data\u2014such as heart rate, blood pressure, and oxygen saturation\u2014from simulated patients. Your task? Build an AI model that can monitor these vitals in real-time and alert healthcare staff when something looks abnormal. Whether you\u2019re new to AI or experienced in data science, our workshops and mentors will support you in creating a working solution.",
    },
    {
      name: "Big Tract (Pitching)",
      description: "Ready to tackle real-world healthcare challenges? You\u2019ll get access to real, de-identified Electronic Medical Record (EMR) data and work closely with healthcare mentors. Through interviews and guided discussions, you\u2019ll identify critical bottlenecks in the healthcare system and develop an AI-driven solution. Your mission: understand the problem, build a compelling demo, and pitch your innovative idea to a panel of expert judges.",
    },
  ],
  steps: [
    "Interview mentors to understand pain points and gather feedback on your idea.",
    "Identify & define the problem using a design thinking approach.",
    "Ideate & prototype\u2014brainstorm broadly, then pick the most promising concept.",
    "Test & iterate by gathering feedback from mentors and potential end-users.",
    "Pitch your solution with a compelling story: the problem, who benefits, how it works, and why it\u2019s better.",
  ],
};

// --- Judging Criteria ---

export const MEDHACK_JUDGING_OVERVIEW = "For the Big Tract (Pitching), teams submit a short video pitch which is assessed by our judges. The most promising teams are selected to pitch at Pitch Night on 4th March 2026, where the final winners are selected. For the Small Tract (Coding), the team with the highest score on the leaderboard wins.";

export const MEDHACK_JUDGING_CRITERIA: MedhackJudgingCriterion[] = [
  {
    name: "Innovation",
    description: "Does the solution provide a new or significantly improved approach to what's currently available?",
    maxScore: 5,
    questions: [
      "Is this a novel approach to the problem?",
      "Does it improve significantly on existing solutions?",
      "Is there a creative use of technology or methodology?",
    ],
    high: "Highly original solution that introduces a genuinely new approach or significant breakthrough in the healthcare space.",
    medium: "Solution shows some creative elements but builds on well-known approaches with moderate improvements.",
    low: "Solution closely resembles existing products or approaches with minimal differentiation.",
  },
  {
    name: "Usefulness (User Needs)",
    description: "Does it truly address the needs of the user? Does it solve a large problem?",
    maxScore: 10,
    questions: [
      "Have you validated the problem with real users?",
      "Does the solution directly address an identified pain point?",
      "Would the target user actually adopt this?",
    ],
    high: "Clear evidence of deep user research; solution directly addresses a validated, high-impact pain point.",
    medium: "Some user validation; addresses a real problem but user fit could be stronger.",
    low: "Limited evidence of user research; unclear whether users would adopt the solution.",
  },
  {
    name: "Viability",
    description: "Is it scalable, cost-effective, and easy to adopt?",
    maxScore: 10,
    questions: [
      "Can this scale beyond a prototype?",
      "Is the cost structure sustainable?",
      "Would healthcare systems realistically adopt this?",
    ],
    high: "Clear path to scale with realistic cost structure and adoption plan within existing healthcare workflows.",
    medium: "Potentially scalable but with some unresolved questions about cost or adoption.",
    low: "Significant barriers to scaling, cost, or adoption that are not addressed.",
  },
  {
    name: "Technical Feasibility",
    description: "Is what the team built technically complex? Is their future vision technically feasible?",
    maxScore: 10,
    questions: [
      "Is the technology stack realistic and well-chosen?",
      "Has a working demo or proof of concept been built?",
      "Are the technical claims supported by evidence?",
    ],
    high: "Working prototype demonstrated with sound technical architecture and realistic implementation plan.",
    medium: "Partial prototype or strong technical plan with some unresolved implementation details.",
    low: "No working demo; technical claims are speculative or rely on unproven technology.",
  },
  {
    name: "Business Readiness",
    description: "Does it have the potential to be implemented and possibly funded?",
    maxScore: 10,
    questions: [
      "Is there a clear value proposition?",
      "Could this attract investment or institutional support?",
      "Is the go-to-market strategy realistic?",
    ],
    high: "Compelling value proposition with a realistic go-to-market strategy and clear funding pathway.",
    medium: "Good value proposition but go-to-market or funding strategy needs more work.",
    low: "Unclear value proposition or unrealistic path to market and funding.",
  },
  {
    name: "Sustainability",
    description: "Will it minimise long-term environmental impact and stand the test of time?",
    maxScore: 5,
    questions: [
      "Does the solution consider its environmental footprint?",
      "Is the approach designed to remain relevant and maintainable over time?",
      "Does it avoid creating unsustainable dependencies or waste?",
    ],
    high: "Solution is designed with long-term sustainability in mind, minimising environmental impact and built to last.",
    medium: "Some consideration of sustainability, but certain aspects could create long-term challenges.",
    low: "Little to no consideration of environmental impact or long-term sustainability.",
  },
];

// --- Judges ---

export const MEDHACK_JUDGES: MedhackPerson[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Emergency Medicine Physician",
    org: "Alfred Health",
    bio: "Dr. Chen is an emergency medicine physician with over 15 years of clinical experience. She has been at the forefront of integrating AI tools into emergency department workflows and is passionate about using technology to improve patient outcomes.",
  },
  {
    name: "Prof. Michael Torres",
    role: "Professor of Health Informatics",
    org: "Monash University",
    bio: "Prof. Torres leads the health informatics research group at Monash University, focusing on clinical decision support systems and electronic health record optimization. He has published over 100 peer-reviewed papers on health AI.",
  },
  {
    name: "Priya Ramanathan",
    role: "Partner, Health & Life Sciences",
    org: "MedTech Actuator",
    bio: "Priya brings deep expertise in medtech commercialization and venture investment. She has helped launch over 20 health startups and serves as a mentor to founders building at the intersection of healthcare and technology.",
  },
  {
    name: "Dr. James Liu",
    role: "Chief Medical Officer",
    org: "Heidi Health",
    bio: "Dr. Liu oversees clinical AI product development at Heidi Health, one of Australia\u2019s fastest-growing health tech companies. His work focuses on ensuring AI tools meet the rigorous standards required for clinical use.",
  },
];

// --- Mentors ---
// Removed: mentor bios were hallucinated. Real mentor names are listed in the schedule data only.

// --- Mentor Schedules ---

export const MEDHACK_MENTOR_SCHEDULE_DAY1: MedhackMentorScheduleDay = {
  title: "Day 1 \u2014 Saturday Feb 21",
  date: "2026-02-21",
  timeBlocks: ["11am\u20133pm", "3pm\u20137:15pm", "6:45pm\u20139pm"],
  mentors: [
    { name: "Eddie Chen", available: [true, true, false] },
    { name: "Andrew Carey", available: [true, false, false] },
    { name: "Makenzie Thomas", available: [false, false, false] },
    { name: "Matthew Jones", available: [true, true, false] },
    { name: "Wenjing Sun", available: [true, true, true] },
    { name: "Tyler Tranquille", available: [false, true, false] },
    { name: "John Forsythe", available: [false, true, false] },
    { name: "Ellie McBain", available: [true, true, false] },
    { name: "Peter McKenna", available: [false, true, false] },
    { name: "Vera Ignjatovic", available: [false, false, false] },
    { name: "Bora Ith", available: [true, true, false] },
    { name: "Jaber Jaber", available: [true, false, false] },
    { name: "Harjas Gill", available: [false, true, false] },
    { name: "Kailash Kumar Vinu", available: [true, true, false] },
    { name: "Darren Rajit", available: [false, true, false] },
    { name: "Johnny Pham", available: [false, true, false] },
    { name: "Som Sangu", available: [true, false, false] },
    { name: "Vlada Rozova", available: [true, true, false] },
    { name: "Dinasha Wimalasiri", available: [false, true, false] },
    { name: "Rachel Zhao", available: [true, true, false] },
    { name: "Yilin Wu", available: [true, true, false] },
    { name: "Jordan Moshcovitis", available: [true, false, false] },
    { name: "Jessica Attenborough", available: [false, false, false] },
    { name: "Brandon Glasser", available: [false, true, false] },
    { name: "Anish Calpakam", available: [false, true, false] },
  ],
};

export const MEDHACK_MENTOR_SCHEDULE_DAY2: MedhackMentorScheduleDay = {
  title: "Day 2 \u2014 Sunday Feb 22",
  date: "2026-02-22",
  timeBlocks: ["8:30am\u201312:30pm", "12:30pm\u20135:30pm"],
  mentors: [
    { name: "Eddie Chen", available: [true, true] },
    { name: "Andrew Carey", available: [true, false] },
    { name: "Makenzie Thomas", available: [true, false] },
    { name: "Matthew Jones", available: [false, false] },
    { name: "Wenjing Sun", available: [false, false] },
    { name: "Tyler Tranquille", available: [false, false] },
    { name: "John Forsythe", available: [false, true] },
    { name: "Peter McKenna", available: [true, true] },
    { name: "Vera Ignjatovic", available: [false, true] },
    { name: "Bora Ith", available: [true, true] },
    { name: "Jaber Jaber", available: [true, true] },
    { name: "Harjas Gill", available: [true, true] },
    { name: "Kailash Kumar Vinu", available: [false, true] },
    { name: "Darren Rajit", available: [false, false] },
    { name: "Johnny Pham", available: [false, false] },
    { name: "Som Sangu", available: [false, false] },
    { name: "Vlada Rozova", available: [false, false] },
    { name: "Dinasha Wimalasiri", available: [false, false] },
    { name: "Rachel Zhao", available: [true, true] },
    { name: "Yilin Wu", available: [false, true] },
    { name: "Jordan Moshcovitis", available: [false, false] },
    { name: "Jessica Attenborough", available: [false, false] },
    { name: "Brandon Glasser", available: [false, true] },
    { name: "Ellie McBain", available: [true, false] },
    { name: "Anish Calpakam", available: [true, false] },
  ],
};

// --- Code of Ethical Conduct ---

export const MEDHACK_CODE_OF_CONDUCT: MedhackConductRule[] = [
  {
    title: "Respect & Inclusivity",
    description: "Treat all participants, mentors, judges, and organizers with respect. Harassment, discrimination, or intimidation of any kind will not be tolerated. We celebrate diversity in background, experience, and perspective.",
  },
  {
    title: "Patient Data Privacy",
    description: "All data provided is either fully simulated or de-identified in compliance with strict privacy regulations. Do not attempt to re-identify patients, link datasets to real individuals, or share data outside the hackathon environment.",
  },
  {
    title: "Honest Representation",
    description: "Present your work truthfully. Do not fabricate results, plagiarize others\u2019 work, or misrepresent your team\u2019s contributions. Cite any external tools, code libraries, or resources you use.",
  },
  {
    title: "Responsible AI Development",
    description: "Consider the ethical implications of your solution. Think about bias, fairness, transparency, and the potential for unintended consequences. AI in healthcare carries real responsibility\u2014design with care.",
  },
  {
    title: "Collaborative Spirit",
    description: "This is a learning event, not a zero-sum competition. Share knowledge, help other teams when you can, and contribute to a positive and supportive atmosphere. Everyone benefits when we lift each other up.",
  },
  {
    title: "Safety & Wellbeing",
    description: "Take care of yourself and look out for others. Take breaks, stay hydrated, and ask for help if you need it. Report any concerns about safety or conduct to the organizing team immediately.",
  },
];

// --- Policies ---

export const MEDHACK_POLICIES: MedhackPolicy[] = [
  {
    title: "Intellectual Property",
    description: "All intellectual property created during the hackathon remains the property of the team that created it. MLAI and MYMI do not claim any ownership over your solutions, code, or ideas. You are free to continue developing your project after the event.",
  },
  {
    title: "Confidentiality",
    description: "Any proprietary information shared by mentors, sponsors, or partner organizations during the hackathon must be treated as confidential. Do not share, publish, or distribute such information without explicit written permission.",
  },
  {
    title: "Project Continuation",
    description: "We encourage teams to continue developing their solutions after the hackathon. MLAI and MYMI may offer follow-up support, introductions to investors, or incubator opportunities for promising projects. Winners may be invited to present at future MLAI events.",
  },
  {
    title: "Media & Photography",
    description: "By attending the event, you consent to being photographed or recorded for promotional purposes. If you prefer not to be photographed, please inform the organizing team at registration.",
  },
  {
    title: "Liability",
    description: "Participants attend the event at their own risk. MLAI and MYMI are not liable for any loss, damage, or injury sustained during the hackathon. Please follow all venue safety guidelines and instructions from event staff.",
  },
];

// --- Contact & Socials ---

export const MEDHACK_CONTACTS: MedhackContact[] = [
  { platform: "Email", url: "mailto:hi@mlai.au", label: "hi@mlai.au" },
  { platform: "Instagram", url: "https://www.instagram.com/mlai_aus/", label: "@mlai_aus" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/company/mlai-aus/", label: "MLAI on LinkedIn" },
  { platform: "Website", url: "https://mlai.au", label: "mlai.au" },
];
