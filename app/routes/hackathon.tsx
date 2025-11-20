import { ExtendedInfo } from "~/components/hackathon/ExtendedInfo";
import { FAQ } from "~/components/hackathon/FAQ";
import { GbhPeople } from "~/components/hackathon/gbhPeople";
import { Hero } from "~/components/hackathon/Hero";
import { InfoForHackers } from "~/components/hackathon/InfoForHackers";
import { MentorsVolunteers } from "~/components/hackathon/MentorsVolunteers";
import { Schedule } from "~/components/hackathon/Schedule";
import { SilverSponsors } from "~/components/hackathon/SilverSponsors";
import { Speakers } from "~/components/hackathon/Speakers";
import { Sponsors } from "~/components/hackathon/Sponsors";

const HackathonPage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Hero />
        <Sponsors />
        <SilverSponsors />
        <ExtendedInfo />
        <Speakers />
        <Schedule />
        <MentorsVolunteers />
        <GbhPeople />
        <FAQ />

        {/* <InfoForHackers /> */}
      </div>
    </div>
  );
};

export default HackathonPage;
