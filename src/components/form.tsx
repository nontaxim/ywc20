import {useForm} from '@tanstack/react-form';
import type {AnyFieldApi} from '@tanstack/react-form';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {Button} from './ui/button';
import {useNavigate} from '@tanstack/react-router';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import type {MajorKey} from '@/types/candidates.types';

function FieldInfo({field}: {field: AnyFieldApi}) {
    return (
        <>
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <em>{field.state.meta.errors.join(', ')}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    );
}

type FormValues = {
    firstName: string;
    lastName: string;
    major: MajorKey | '';
};

export default function Form({
    firstName,
    lastName,
    major,
}: {
    firstName?: string;
    lastName?: string;
    major?: MajorKey;
}) {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            firstName: firstName || '',
            lastName: lastName || '',
            major: major || '',
        } as FormValues,
        onSubmit: ({value}) => {
            navigate({to: '/announcement', search: value}); // simple and correct
        },
    });
    const majorOptions: {
        value: string;
        label: string;
    }[] = [
        {value: 'design', label: 'Web Design'},
        {value: 'content', label: 'Web Content'},
        {value: 'programming', label: 'Web Programming'},
        {value: 'marketing', label: 'Web Marketing'},
    ];

    return (
        <>
            {form.baseStore.state.isSubmitting && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                    <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-[#F52222]" />
                </div>
            )}
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <div>
                    {/* A type-safe field component*/}
                    <form.Field
                        name="firstName"
                        validators={{
                            onChange: ({value}) =>
                                !value ? 'A first name is required' : undefined,
                        }}
                        children={(field) => {
                            return (
                                <div className="flex flex-col gap-2">
                                    <Label
                                        className="text-white"
                                        htmlFor={field.name}
                                    >
                                        First Name
                                        <span className="text-[#F52222]">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        placeholder="somchai"
                                        className="text-white selection:bg-blue-500 selection:text-white"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        autoComplete="on"
                                    />
                                    <div className="text-sm text-[#F52222]">
                                        <FieldInfo field={field} />
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
                <div>
                    <form.Field
                        name="lastName"
                        validators={{
                            onChange: ({value}) =>
                                !value ? 'A last name is required' : undefined,
                        }}
                        children={(field) => (
                            <div className="flex flex-col gap-2">
                                <Label
                                    className="text-white"
                                    htmlFor={field.name}
                                >
                                    Last Name
                                    <span className="text-[#F52222]">*</span>
                                </Label>
                                <Input
                                    placeholder="lukna"
                                    className="text-white selection:bg-blue-500 selection:text-white"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    autoComplete="on"
                                />
                                <div className="text-sm text-[#F52222]">
                                    <FieldInfo field={field} />
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div>
                    <form.Field
                        name="major"
                        validators={{
                            onChange: ({value}) => {
                                const validMajors: MajorKey[] = [
                                    'design',
                                    'content',
                                    'programming',
                                    'marketing',
                                ];
                                return value && !validMajors.includes(value)
                                    ? 'Invalid major selected'
                                    : undefined;
                            },
                        }}
                        children={(field) => {
                            return (
                                <div className="flex flex-col gap-2">
                                    <Label
                                        className="text-white"
                                        htmlFor={field.name}
                                    >
                                        Major
                                    </Label>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(value: MajorKey) =>
                                            field.handleChange(value)
                                        }
                                    >
                                        <SelectTrigger className="w-full text-white">
                                            <SelectValue placeholder="major" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black text-white">
                                            {majorOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="text-sm text-[#F52222]">
                                        <FieldInfo field={field} />
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <form.Subscribe
                        selector={(state) => [
                            state.canSubmit,
                            state.isSubmitting,
                        ]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button
                                className="w-1/2 bg-[linear-gradient(90deg,_#f81a64_0%,_#f52222_50%,_#ff691d_86%,_#ffb623)] hover:opacity-70"
                                type="submit"
                                disabled={!canSubmit}
                            >
                                {isSubmitting ? '...' : 'Submit'}
                            </Button>
                        )}
                    />
                </div>
            </form>
        </>
    );
}
