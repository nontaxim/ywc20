import {getCandidates} from '@/services/candidates';
import {useQuery} from '@tanstack/react-query';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {userSearchSchema} from '@/schemas/user';
import {z} from 'zod';
import type {Candidates} from '@/types/candidates.types';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {getRandomCommitteeComment, getRandomFeedback} from '@/utils/comments';
import {AnnouncementSkeleton} from '@/components/AnnouncementSkeleton';

type UserSearch = z.infer<typeof userSearchSchema>;

export const Route = createFileRoute('/announcement')({
    component: Announcement,
    validateSearch: (search: Record<string, unknown>): UserSearch => {
        const result = userSearchSchema.safeParse(search);
        if (!result.success) {
            return {firstName: '', lastName: '', major: ''};
        }
        return result.data;
    },
});

function Announcement() {
    const navigate = useNavigate(); // Initialize navigate hook
    const {firstName, lastName, major} = Route.useSearch();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['candidates'],
        queryFn: getCandidates,
        refetchOnWindowFocus: false,
    });
    const defaultMajor = 'design';
    if (isLoading) return <AnnouncementSkeleton />;
    if (isError)
        return (
            <div className="text-center text-red-500">
                Error: {(error as Error).message}
            </div>
        );
    if (!data)
        return (
            <div className="text-center text-white">no candidates found</div>
        );

    const candidates: Candidates[] =
        major !== '' ? data[major] || [] : Object.values(data).flat();

    const matched = candidates.find(
        (c) =>
            c.firstName.toLowerCase() === firstName.toLowerCase() &&
            c.lastName.toLowerCase() === lastName.toLowerCase(),
    );

    let result = '';
    if (matched) {
        result = matched.major
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 sm:gap-4 sm:px-8">
            <Card className="h-auto w-full rounded-lg bg-gradient-to-b from-black via-black to-[#190200] shadow-lg sm:w-3/4 lg:w-2/3">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-white">
                        {matched
                            ? 'Congratulations!'
                            : 'Regarding your Application to Young Webmaster Camp 20'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0 text-center text-white">
                    <div className="text-xl font-semibold">
                        {firstName} {lastName}
                    </div>

                    {matched ? (
                        <>
                            <div className="flex flex-col items-center justify-center text-center text-green-400">
                                <div className="mb-2 animate-bounce text-4xl">
                                    🎉
                                </div>
                                <div className="text-lg font-semibold sm:text-xl">
                                    You've been{' '}
                                    <span className="text-green-300">
                                        selected
                                    </span>{' '}
                                    in
                                </div>
                                <div className="mt-1 text-xl font-bold text-white drop-shadow-md sm:text-2xl">
                                    {result}
                                </div>
                                <div className="mt-1 text-xl font-bold text-white drop-shadow-md sm:text-2xl">
                                    Young Webmaster Camp 20
                                </div>
                            </div>
                            <div className="mt-4 space-y-3 rounded-md border border-green-500/30 bg-white/5 p-4 text-center text-sm text-white sm:text-base">
                                <p>
                                    <span className="font-semibold">
                                        Interview ID:
                                    </span>
                                    <br className="sm:hidden" />{' '}
                                    {matched.interviewRefNo}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Session:
                                    </span>
                                    <br className="sm:hidden" /> 1:00 PM – 5:00
                                    PM
                                </p>
                                <p className="mt-2 font-medium text-green-300">
                                    You're moving forward to the interview
                                    round! 🌟
                                </p>
                            </div>

                            <div className="mt-6 text-sm text-gray-300">
                                Please check the interview details at{' '}
                                <a
                                    href={`https://ywc20.ywc.in.th/interview/${matched.major.slice(4)}`} // <-- Replace with actual link
                                    className="underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Interview Details
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-center gap-2 text-lg font-medium text-[#F52222]">
                                😔 Unfortunately, you were not in major{' '}
                                {major ? major : defaultMajor}.
                            </div>
                            <p className="mt-4 text-lg text-gray-300 italic">
                                {getRandomFeedback()}
                            </p>
                            <div className="mt-4 text-sm text-gray-400">
                                <span className="font-semibold text-white">
                                    Committee's feedback:
                                </span>
                                <br />
                                <span className="italic">
                                    "
                                    {getRandomCommitteeComment(
                                        major || defaultMajor,
                                    )}
                                    "
                                </span>
                            </div>
                            <div className="mt-8 text-center text-lg font-semibold text-white">
                                <p>
                                    Please stay tuned for next year's
                                    application for the Young Webmaster Camp.
                                </p>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
            <Button
                onClick={() =>
                    navigate({
                        to: '/',
                        search: {
                            firstName: firstName,
                            lastName: lastName,
                            major: major,
                        }, // Reset the search parameters
                    })
                } // Use navigate to go back
                className="bg-[linear-gradient(90deg,_#f81a64_0%,_#f52222_50%,_#ff691d_86%,_#ffb623)] hover:opacity-70"
            >
                Go Back
            </Button>
        </div>
    );
}
