export type WattScheduleItem = {
  time: string;
  title: string;
  detail?: string;
  people?: string[];
};

export type WattScheduleDay = {
  id: "friday" | "saturday";
  weekday: string;
  date: string;
  shortLabel: string;
  theme: string;
  items: WattScheduleItem[];
};

export const wattTheHackSchedule: WattScheduleDay[] = [
  {
    id: "friday",
    weekday: "Friday",
    date: "5 Jun 2026",
    shortLabel: "Fri · 5 Jun",
    theme: "Welcome, trivia and networking",
    items: [
      {
        time: "5:30 PM",
        title: "Doors open & registration",
        detail: "Check in and settle in.",
      },
      {
        time: "6:00 PM",
        title: "Welcome from MC and sponsor notes",
        detail: "MC will call each sponsor/speaker up one by one.",
        people: ["Doron Bahar (base44)", "Graham McCorkill (S&C)"],
      },
      {
        time: "6:15 PM",
        title: "Keynote & welcome",
        detail: "Opening keynote for attendees.",
        people: ["John Allsop (AIE, Webdirections)"],
      },
      {
        time: "6:25 PM",
        title: "Event overview from Dr Sam Donegan",
        detail: "Format, expectations and what happens next.",
      },
      {
        time: "6:40 PM",
        title: "First round of trivia",
        detail: "Directed by Dr Sam Donegan.",
      },
      {
        time: "7:00 PM",
        title: "Break for dinner & drinks",
        detail: "Dinner and refreshments.",
      },
      {
        time: "7:25 PM",
        title: "Second round of trivia",
        detail: "Directed by Dr Sam Donegan.",
      },
      {
        time: "7:45 PM",
        title: "Third round of trivia",
        detail: "Directed by Dr Sam Donegan.",
      },
      {
        time: "8:15 PM",
        title: "Networking",
        detail: "Meet sponsors, mentors and other builders.",
      },
      {
        time: "9:30 PM",
        title: "Event close",
        detail: "Venue closes.",
      },
    ],
  },
  {
    id: "saturday",
    weekday: "Saturday",
    date: "6 Jun 2026",
    shortLabel: "Sat · 6 Jun",
    theme: "Hack day, pitches and awards",
    items: [
      {
        time: "9:00 AM",
        title: "Bump in",
        detail: "MLAI and Monash DeepNeuron only.",
      },
      {
        time: "10:30 AM",
        title: "Doors open & registration",
        detail: "Check in and set up.",
      },
      {
        time: "11:00 AM",
        title: "Welcome from MC and sponsor notes",
        detail: "MC will call each sponsor/speaker up one by one for a quick 2-3 minute talk.",
        people: [
          "Scott Falkner (OpenAI)",
          "Doron Bahar (base44)",
          "Graham McCorkill (S&C)",
          "Mat Brennan (Amber Electric)",
        ],
      },
      {
        time: "11:25 AM",
        title: "Keynote speakers",
        detail: "Explaining some of the big challenges in the Australian energy sector and grid.",
        people: ["Bill Lilley (RaceFor2030)", "Julian Featherston (HAL Systems)"],
      },
      {
        time: "11:40 AM",
        title: "Event overview from MC",
        detail: "Track overview by MC and Monash DeepNeuron.",
      },
      {
        time: "12:00 PM",
        title: "Hacking begins",
        detail: "Lunch arrives. Mentors to answer questions.",
        people: ["All mentors"],
      },
      {
        time: "1:00 PM",
        title: "Speaker session",
        detail: "Boardroom Lv1.",
        people: ["Hao Wang (Monash)"],
      },
      {
        time: "2:00 PM",
        title: "Speaker session",
        detail: "Boardroom Lv1.",
        people: ["Mat Brennan (Amber Electric)"],
      },
      {
        time: "3:00 PM",
        title: "Speaker session",
        detail: "Boardroom Lv1.",
        people: ["David Gilmore (MLAI)"],
      },
      {
        time: "4:30 PM",
        title: "Snacks and coffee",
        detail: "Recharge break.",
      },
      {
        time: "5:00 PM",
        title: "Submissions for pitching track",
        detail: "Semifinals.",
      },
      {
        time: "6:30 PM",
        title: "Dinner",
        detail: "Food served.",
      },
      {
        time: "7:30 PM",
        title: "Closing ceremony",
        detail: "Led by Dr Sam Donegan.",
      },
      {
        time: "7:45 PM",
        title: "Finalist teams pitching to judges",
        detail: "Directed by MC.",
        people: [
          "David Gilmore (MLAI)",
          "Mat Brennan (Amber Electric)",
          "Doron Bahar (Base44)",
          "Julian Featherston (HAL Systems)",
        ],
      },
      {
        time: "8:20 PM",
        title: "Final scores calculated",
        detail: "For all streams.",
      },
      {
        time: "8:30 PM",
        title: "Winners announced",
        detail: "Networking follows.",
      },
      {
        time: "9:30 PM",
        title: "Event closes",
        detail: "Venue closes.",
      },
    ],
  },
];
