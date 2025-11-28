import { AboutEvent } from "~/components/hackathon/AboutEvent";
import { AboutUnite } from "~/components/hackathon/AboutUnite";
import { ExtendedInfo } from "~/components/hackathon/ExtendedInfo";
import { EventOverview } from "~/components/hackathon/EventOverview";
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
        <AboutEvent />
        <AboutUnite />
        <Sponsors />
        <SilverSponsors />
        <EventOverview />
        <ExtendedInfo />
        <Speakers />
        <Schedule />
        <MentorsVolunteers />
        <GbhPeople />
        <FAQ />

        {/* <InfoForHackers x/> */}
      </div>
    </div>
  );
};

export default HackathonPage;
