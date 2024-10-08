"use client";

// IMPORTANT:
// this was not made by me but based from @vaunblu's work on X/Twitter with a few modifications
// if you are using this code, please credit them and not me
// https://x.com/vaunblu

import {
    AnimatePresence,
    motion,
    MotionConfig,
    Variants,
    type Transition,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const transition: Transition = { type: "spring", bounce: 0.3, duration: 0.3 };

type ContextType = {
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Context = React.createContext<ContextType>({
    status: "",
    setStatus: () => null,
});

function SocialsContent() {
    const ctx = React.useContext<ContextType>(Context);

    const icon: Variants = {
        hidden: {
            opacity: 0,
            y: 15,
            translateX: "-50%",
            filter: "blur(3px)",
            rotate: "0deg",
        },
        show: (custom: { rotateRight: boolean }) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            rotate: custom?.rotateRight ? "6deg" : "-3deg",
        }),
        exit: {
            opacity: 0,
            y: 15,
            filter: "blur(3px)",
            rotate: "0deg",
            transition: { ...transition, duration: 0.5 },
        },
    };

    return (
        <div className="group flex items-center gap-4 text-primary">
            <Link
                href="https://discord.com/users/911576576662077481"
                onMouseOver={() => ctx.setStatus("discord")}
                onMouseOut={() => ctx.setStatus("idle")}
                className="relative transition-colors duration-300 ease-out hover:!text-muted group-hover:text-primary"
            >
                <AnimatePresence>
                    {ctx.status === "discord" && (
                        <motion.div
                            variants={icon}
                            custom={{ rotateRight: true }}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="size-8 absolute -top-10 left-1/2 -translate-x-1/2 rotate-3 overflow-hidden rounded-lg bg-black shadow-mixed"
                        >
                            <Image
                                src={"./socials/discord.png"}
                                width={32}
                                height={32}
                                alt="discord"
                                className="size-full"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <span>discord</span>
            </Link>
            <Link
                href="mailto:pontusenordstrom@gmail.com"
                onMouseOver={() => ctx.setStatus("email")}
                onMouseOut={() => ctx.setStatus("idle")}
                className="relative transition-colors duration-300 ease-out hover:!text-muted group-hover:text-primary"
            >
                <AnimatePresence>
                    {ctx.status === "email" && (
                        <motion.div
                            variants={icon}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="size-8 absolute -top-10 left-1/2 -translate-x-1/2 -rotate-3 overflow-hidden rounded-lg bg-black shadow-mixed"
                        >
                            <Image
                                src={"./socials/protonmail.png"}
                                width={32}
                                height={32}
                                alt="email"
                                className="size-full"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <span>email</span>
            </Link>
        </div>
    );
}

export function ContactContainer() {
    const [status, setStatus] = React.useState("idle");

    React.useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setStatus("idle");
            }
        }
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [setStatus]);

    return (
        <Context.Provider value={{ status, setStatus }}>
            <MotionConfig transition={transition}>
                <SocialsContent />
            </MotionConfig>
        </Context.Provider>
    );
}
