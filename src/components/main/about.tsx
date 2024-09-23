"use client";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "~/components/ui/tooltip";
import dayjs from "dayjs";
import * as React from "react";

export function About() {
    return (
        <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">
                About
            </h2>
            <div className="flex flex-col space-y-2">
                <p>
                    i'm qiko, a <Age />
                    -year-old interested in software engineering,
                    artificial intelligence, and back-end development.
                    currently, i’m doing my engineering preparatory year 
                    at the Royal Institute of Technology, Stockholm.
                </p>
                <p>
			  outside of computer science, i'm interested in philosophy, 
			  and dabble in making my own music from time to time.
                </p>
                <p>
                    if you're looking to work with me on something, 
                    feel free to contact me by using any of the methods above.
                </p>
            </div>
        </div>
    );
}

const birthTimestamp = 1070486400000; // December 4, 2003
const initialAge = 20;

export function Age() {
    const [age, setAge] = React.useState<number>(initialAge);
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setAge(dayjs().diff(birthTimestamp, "year", true));
        }, 50);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer">
                        {age.toFixed(4)}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="text-center max-w-[250px]">
                    <p>{age.toFixed(12)}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
