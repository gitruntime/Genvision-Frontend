import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";

const dummySubjects = [
    {
        id: 1,
        name: "Mathematics",
        description: "Learn about algebra, geometry, and calculus.",
        teacherName: "John Doe",
        credits: 4,
    },
    {
        id: 2,
        name: "Science",
        description: "Explore physics, chemistry, and biology.",
        teacherName: "Jane Smith",
        credits: 3,
    },
    {
        id: 3,
        name: "History",
        description: "Study ancient civilizations and historical events.",
        teacherName: "Michael Brown",
        credits: 2,
    },
    {
        id: 4,
        name: "English Literature",
        description: "Dive into classic and modern literary works.",
        teacherName: "Emily Wilson",
        credits: 3,
    },
    {
        id: 5,
        name: "Computer Science",
        description: "Introduction to programming, algorithms, and data structures.",
        teacherName: "Chris Johnson",
        credits: 4,
    },
    {
        id: 6,
        name: "Physical Education",
        description: "Improve physical fitness and learn team sports.",
        teacherName: "Sophia Davis",
        credits: 1,
    },
];

export const Subjects: FC = () => {

    // const [subjects, setSubjects] = useState<any[]>([]); // State for storing subjects
    // const [loading, setLoading] = useState<boolean>(true); // Loading state
    // const [error, setError] = useState<string | null>(null); // Error state

    // // Fetch subjects from the API
    // useEffect(() => {
    //     const fetchSubjects = async () => {
    //         try {
    //             const response = await api.get("/teacher/subjects"); // Update endpoint as needed
    //             setSubjects(response.data?.data || []);
    //             setError(null);
    //         } catch (err) {
    //             console.error("Failed to fetch subjects:", err);
    //             setError("Failed to load subjects. Please try again.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchSubjects();
    // }, []);

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    // if (error) {
    //     return <p className="text-red-500">{error}</p>;
    // }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummySubjects.map((subject) => (
                <Card key={subject.id}>
                    <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                            <CardTitle>{subject.name}</CardTitle>
                            <CardDescription>{subject.description || "No description available"}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Teacher: {subject.teacherName || "N/A"}</p>
                        <p>Credits: {subject.credits || "N/A"}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
