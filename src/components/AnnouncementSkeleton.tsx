import {Skeleton} from '@/components/ui/skeleton';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';

export function AnnouncementSkeleton() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 sm:gap-4 sm:px-8">
            <Card className="h-auto w-full rounded-lg bg-gradient-to-b from-black via-black to-[#190200] shadow-lg sm:w-3/4 lg:w-2/3">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-white">
                        <Skeleton className="mx-auto h-6 w-3/4" />
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 p-6 pt-0 text-center">
                    <Skeleton className="mx-auto h-6 w-1/2" /> {/* Name */}
                    {/* Result box */}
                    <div className="flex flex-col items-center justify-center text-center">
                        <Skeleton className="h-10 w-10 animate-pulse rounded-full" />{' '}
                        {/* 🎉 Emoji */}
                        <Skeleton className="mt-2 h-5 w-2/3" />{' '}
                        {/* "You've been selected" */}
                        <Skeleton className="mt-2 h-6 w-1/2" /> {/* {result} */}
                        <Skeleton className="mt-2 h-6 w-2/3" />{' '}
                        {/* Camp name */}
                    </div>
                    {/* Interview details */}
                    <div className="mt-4 space-y-3 rounded-md border border-white/20 bg-white/5 p-4 text-center">
                        <Skeleton className="mx-auto h-5 w-2/3" />{' '}
                        {/* Interview ID */}
                        <Skeleton className="mx-auto h-5 w-1/2" />{' '}
                        {/* Session */}
                        <Skeleton className="mx-auto h-5 w-3/4" />{' '}
                        {/* "You're moving forward" */}
                    </div>
                    {/* Interview link */}
                    <div className="mt-6 text-sm text-gray-300">
                        <Skeleton className="mx-auto h-4 w-2/3" />
                    </div>
                </CardContent>
            </Card>
            <Skeleton className="mt-4 h-10 w-32 rounded-md" />{' '}
            {/* Go Back button */}
        </div>
    );
}
