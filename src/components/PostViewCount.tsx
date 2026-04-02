"use client";

import { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useBatchViewCount } from "./BatchViewCountProvider";

interface PostViewCountProps {
    postId: number;
}

export function PostViewCount({ postId }: PostViewCountProps) {
    const { getViewCount, registerPostId } = useBatchViewCount();

    useEffect(() => {
        registerPostId(postId);
    }, [postId, registerPostId]);

    const views = getViewCount(postId);

    if (views === null) return null;

    return (
        <div className="flex items-center gap-1">
            <FaEye size={10} />
            <span>{views}</span>
        </div>
    );
}
