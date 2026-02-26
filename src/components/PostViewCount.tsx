"use client";

import { useEffect, useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";

interface PostViewCountProps {
    postId: number;
}

export function PostViewCount({ postId }: PostViewCountProps) {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchViews = async () => {
            try {
                const response = await fetch(
                    `/api/views/${postId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    if (isMounted) {
                        setViews(typeof data === "number" ? data : parseInt(data, 10) || 0);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch views for post:", postId, err);
            }
        };

        fetchViews();

        return () => {
            isMounted = false;
        };
    }, [postId]);

    if (views === null) return null;

    return (
        <HStack spacing={1}>
            <FaEye size={10} />
            <Text>{views}</Text>
        </HStack>
    );
}
