import type {MajorKey} from '@/types/candidates.types';

export const getRandomCommitteeComment = (major: MajorKey) => {
    const commentsByMajor = {
        design: [
            'Your design work shows great promise! For next time, focus on improving user experience and ensuring visual consistency across projects.',
            'Your creative skills are impressive, but working on user-centric design principles could elevate your work even further.',
            'Consider exploring more advanced design tools and principles to push your creativity to the next level.',
            'Strong design skills! Focusing on interaction design and usability will make your projects stand out even more.',
            'Your portfolio reflects a good understanding of design, but next time, focus on balancing aesthetics with functionality.',
        ],
        content: [
            'Your content is engaging! For next time, work on making it more concise and ensuring it aligns with current trends in digital content.',
            "You've created some solid content! Consider focusing on structuring your pieces for better flow and clarity.",
            'Great storytelling! For improvement, think about making your content more actionable and interactive for your audience.',
            'Your content ideas are strong! Next time, aim to make your writing even more concise while keeping it impactful and informative.',
            'Solid content overall! To stand out more, try experimenting with different media formats to enrich your messages.',
        ],
        programming: [
            'Your programming skills are impressive! For next time, focus on improving code efficiency and mastering more complex algorithms.',
            "You've got great technical ability! Consider diving deeper into frameworks and best practices to streamline your coding process.",
            'Solid understanding of programming concepts! To level up, spend time improving your debugging and optimization skills.',
            'Great effort with the coding! Try to focus more on system design and architecture to strengthen your future applications.',
            'Your code is clean, but next time, challenge yourself with more complex data structures and algorithms to enhance your problem-solving skills.',
        ],
        marketing: [
            'Your marketing approach is solid! For next time, try to focus more on targeted audience segmentation and use data-driven strategies.',
            'Good effort with your marketing plan! For future improvement, consider enhancing your understanding of consumer psychology and trends.',
            'Solid marketing strategies! To stand out, dive deeper into analytics and experiment with various channels for a broader reach.',
            'Your marketing strategy is well thought out. Next time, focus on refining your messaging and targeting specific demographics more effectively.',
            'Great approach to marketing! For improvement, enhance your social media strategies and track the performance of your campaigns.',
        ],
    };

    // Return a random comment based on the major
    const comments = commentsByMajor[major] || [];
    return (
        comments[Math.floor(Math.random() * comments.length)] ||
        'Great work! Keep improving and stay creative!'
    );
};

export const getRandomFeedback = () => {
    const feedbackMessages = [
        "Don't give up! The next opportunity is just around the corner!",
        "Keep pushing! You're closer than you think!",
        "Great try! You'll nail it next time!",
        'Almost there! Just a little more effort!',
        'Success is a journey, not a destination. Keep going!',
    ];
    return feedbackMessages[
        Math.floor(Math.random() * feedbackMessages.length)
    ];
};
