import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    circle?: boolean;
}

export default function Skeleton({ className = '', width, height, circle }: SkeletonProps) {
    const style: React.CSSProperties = {
        width: width,
        height: height,
        borderRadius: circle ? '50%' : '0.5rem',
    };

    return (
        <div
            className={`animate-shimmer bg-gray-200 ${className}`}
            style={style}
        />
    );
}
