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
        <span className="flex items-center gap-1.5">
            <FaEye size={12} aria-hidden="true" />
            <span>{views}</span>
            <span className="sr-only">ครั้งที่อ่าน</span>
        </span>
    );
}
