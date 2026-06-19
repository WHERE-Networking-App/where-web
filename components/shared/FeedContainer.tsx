"use client"
export function FeedContainer({children}: {children: React.ReactNode}) {
    return (
        <div className="mx-auto w-full max-w-2xl px-4 py-6 space-y-6">
            {children}
        </div>
    )
}