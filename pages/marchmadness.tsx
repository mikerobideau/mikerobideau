import MarchMadness from "@/components/MarchMadness";
import {getTeams} from "@/service/query/marchMadness/teamQuery";
import {getTeam} from "@/components/MarchMadness/marchMadness.util";

export async function getStaticProps() {
    const teams = await getTeams();
    const defaultTeam1 = getTeam('Duke', teams);
    const defaultTeam2 = getTeam('North Carolina', teams);

    return {
        props: {
            defaultTeam1,
            defaultTeam2,
            teams
        }
    }
}

// @ts-ignore
export default function MarchMadnessPage({defaultTeam1, defaultTeam2, teams}) {
    return <MarchMadness defaultTeam1={defaultTeam1} defaultTeam2={defaultTeam2} teams={teams}/>
}