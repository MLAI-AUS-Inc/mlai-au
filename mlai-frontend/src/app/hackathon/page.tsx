'use client'
import { Hero } from './components/Hero'
import { Schedule } from './components/Schedule'
import { Speakers } from './components/Speakers'
import { Sponsors } from './components/Sponsors'
import { InfoForHackers } from './components/InfoForHackers'
import { ExtendedInfo } from './components/ExtendedInfo'
import { GbhPeople } from './components/gbhPeople'
import { MentorsVolunteers } from './components/MentorsVolunteers'
import { Leaderboard } from './components/Leaderboard'
import { SubmissionViewer } from './components/SubmissionViewer'
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
    user: {
        name: string;
        imageUrl: string;
    };
    commit: string;
    branch: string;
    city: string;
    score: number;
    submitted: string;
    team_id: number;
    policy: string;
}

const HackathonPage = () => {
    const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);

    useEffect(() => {
        // fetchData function here (similar to what you have in Leaderboard)
        const fetchData = async () => {
            try {
                // console.log('Making a request to /api/getTopScores');
                const response = await fetch('/api/getTopScores');
                // console.log(`Response Status: ${response.status}`);
    
                if (!response.ok) {
                    console.error('Response not OK:', response.statusText);
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }
    
                const result = await response.json();
                const updatedActivityItems = result.data.map((item: any) => ({
                    user: {
                        name: `${item.team_name}`,
                        imageUrl: item && item.imageUrl 
                                    ? item.team.imageUrl 
                                    : '/MLAI-Logo-Teal.png'
                    },
                    team_id: `${item.team_id}`,
                    commit: `${item.git_commit_hash}`, // Placeholder or fetch from another source
                    branch: 'main', // Assuming default or fetch from another source
                    city: item.city,
                    score: `${item.score.toFixed(2)}`, // Placeholder or fetch from another source
                    submitted: formatDistanceToNow(new Date(item.submitted_at), { addSuffix: true }),
                    policy: item.class_name
                }));
                setActivityItems(updatedActivityItems);
                console.log('Data received:', result.data);
            } catch (error) {
                console.error('Error caught during fetch operation:', error);
            }

        };

            fetchData();
    }, []);
    return (
        <div className="relative min-h-screen">

            <div className="relative z-10">
                <Hero />
                {activityItems.length > 0 ? (
                    <>
                        <Leaderboard topScores={activityItems} />
                        <SubmissionViewer topScores={activityItems} />
                    </>
                ) : (
                    <div>Loading scores...</div>
                )}
                <Sponsors />
                <ExtendedInfo />
                <Speakers />
                <Schedule />
                <MentorsVolunteers />
                <GbhPeople />
                <InfoForHackers />
            </div>
        </div>
    )
}

export default HackathonPage;