export type Major =
    | 'web_design'
    | 'web_content'
    | 'web_programming'
    | 'web_marketing';

export type MajorKey = 'design' | 'content' | 'programming' | 'marketing';

export interface Candidates {
    firstName: string;
    lastName: string;
    interviewRefNo: string;
    major: Major;
}

export interface AllCandidates {
    design: Candidates[];
    content: Candidates[];
    programming: Candidates[];
    marketing: Candidates[];
}
