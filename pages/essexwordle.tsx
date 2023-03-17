import React from "react";

import {getAnswerByDate, setAnswerDate} from "@/service/query/wordle/essexQuery";
import Game from "@/components/Wordle/Game";

interface WordleProps {
    answer: string;
}

export async function getServerSideProps({ params }: any) {
    var dt = new Date();
    var offset = -300; //Timezone offset for EST in minutes.
    var easternDate = new Date(dt.getTime() + offset*60*1000);
    const today = easternDate.toISOString().slice(0, 10).replace('T', ' ');
    let answer: string;


    answer = await getAnswerByDate(today);
    if (!answer) {
        await setAnswerDate(today);
        answer = await getAnswerByDate(today);
    }

    return {
        props: {
            answer: answer
        }
    }
}

export default function EssexWordle({answer}: WordleProps) {
    return (
        <Game answer={answer}/>
    );
}