import {createFileRoute} from '@tanstack/react-router';
import Form from '@/components/form';
import {Card} from '@/components/ui/card';
import {userSearchSchema} from '@/schemas/user';
import {z} from 'zod';

type UserSearch = z.infer<typeof userSearchSchema>;

export const Route = createFileRoute('/')({
    component: Index,
    validateSearch: (search: Record<string, unknown>): UserSearch => {
        const result = userSearchSchema.safeParse(search);
        if (!result.success) {
            return {firstName: '', lastName: '', major: ''};
        }
        return result.data;
    },
});

function Index() {
    const {firstName, lastName} = Route.useSearch();
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
            <div className="text-center text-4xl font-bold text-white">
                Candidate Announcement
            </div>
            <Card className="w-2/3 bg-[linear-gradient(rgb(0,0,0)_0%,rgb(0,0,0)_50%,rgb(25,2,0)_100%)] bg-[length:contain] bg-[position:0%_0%] p-8">
                <Form
                    firstName={firstName}
                    lastName={lastName}
                />
            </Card>
        </div>
    );
}
