import React from 'react'

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary)]/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary)] rounded-full animate-spin border-t-transparent"></div>
            </div>
        </div> 
    )
}
