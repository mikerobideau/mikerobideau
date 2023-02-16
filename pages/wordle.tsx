import React from "react";

import Game from "@/components/Wordle/Game";
import {getRandomWord} from "@/service/query/wordle/randomWord";

interface WordleProps {
    answer: string;
}

export async function getServerSideProps({ params }: any) {
    return {
        props: {
            answer: getRandomWord()
        }
    }
}

export default function Wordle({answer}: WordleProps) {
    return (
        <Game answer={answer}/>
    );
}