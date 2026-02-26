"use client";

import { useEffect, useRef } from "react";

interface PostViewTrackerProps {
    postId: number;
}

export function PostViewTracker({ postId }: PostViewTrackerProps) {
    const hasTracked = useRef(false);

    useEffect(() => {
        // Only track once per page load to avoid double counting in React Strict Mode
        if (hasTracked.current) return;
        hasTracked.current = true;

        // Call the proxy Next.js API endpoint to increment the view
        fetch(`/api/views/${postId}`, {
            method: "POST",
            // Setting keepalive so the request finishes even if the user navigates away quickly
            keepalive: true,
        }).catch((err) => {
            console.error("Failed to track post view:", err);
        });
    }, [postId]);

    return null;
}
