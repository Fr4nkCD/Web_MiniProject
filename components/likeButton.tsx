"use client";

import thumbup from "@/resources/thumbsUp.svg";
import thumbupOn from "@/resources/thumbsUpOn.svg";
import Image from "next/image";
import { useState } from "react";

export default function LikeButton({
    initialCount,
    initialLiked,
    postId,
    replyId,
}: {
    initialCount: number;
    initialLiked: boolean;
    postId?: number;
    replyId?: number;
}) {
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);

    const handleClick = async () => {
        try {
            const res = await fetch("/api/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, replyId }),
            });

            if (!res.ok) {
                const errorText = await res.text(); // Capture the error response for debugging
                console.error("Error response:", errorText);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Parse JSON response
            const data = await res.json();
            console.log("Parsed response:", data);

            setLiked(data.action === "liked");
            setCount((prevCount) => (data.action === "liked" ? prevCount + 1 : prevCount - 1));
        } catch (error) {
            console.error("Error in handleClick:", error);
        }
    };

    return (
        <button
            className={`px-3 py-2 flex items-center gap-2 mr-2 rounded-full transition duration-100 hover:bg-gray-100`}
            onClick={handleClick}
        >
            <Image src={liked ? thumbupOn : thumbup} width={25} alt="Likes" />
            <span className={`text-[${liked ? "#64acff" : "rgb(150,150,150)"}] font-semibold`}>{count}</span>
        </button>
    );
}
