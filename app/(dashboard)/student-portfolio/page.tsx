"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { HeroEmptyState } from "@/components/hero-empty-state";
import { useBookingModal } from "@/contexts/booking-modal-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import { Combobox } from "@/components/ui/combobox";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Eye,
    FileEdit,
    FileText,
    Mail,
    Video,
    Filter,
    X,
    Linkedin,
    ExternalLink,
    User,
    Briefcase,
    ArrowLeft,
    Award,
    Calendar,
    TrendingUp,
} from "lucide-react";

type SubmissionStatus = "Pending" | "In Review" | "Completed" | "Rejected";
type SubmissionType = "Resume" | "Cover Letter" | "Interview" | "LinkedIn Profile";

interface Submission {
    id: string;
    studentName: string;
    studentEmail: string;
    submissionType: SubmissionType;
    cohort: string;
    status: SubmissionStatus;
    submittedAt: string;
    assignedReviewer: string;
    // LinkedIn specific fields
    linkedinProfileUrl?: string;
    reviewDate?: string;
    feedback?: string;
}

const mockData: Submission[] = [
    { id: "1", studentName: "Alice Johnson", studentEmail: "alice.j@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-19", assignedReviewer: "Dr. Sarah Chen" },
    { id: "2", studentName: "Alice Johnson", studentEmail: "alice.j@university.edu", submissionType: "LinkedIn Profile", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-18", assignedReviewer: "Prof. Michael Lee", linkedinProfileUrl: "https://linkedin.com/in/alicejohnson", reviewDate: "2024-11-19", feedback: "Excellent profile structure. Consider adding more specific achievements in your headline and about section." },
    { id: "3", studentName: "Bob Smith", studentEmail: "bob.s@university.edu", submissionType: "Cover Letter", cohort: "Fall 2024 - Business", status: "In Review", submittedAt: "2024-11-18", assignedReviewer: "Prof. Michael Lee" },
    { id: "4", studentName: "Bob Smith", studentEmail: "bob.s@university.edu", submissionType: "Resume", cohort: "Fall 2024 - Business", status: "Completed", submittedAt: "2024-11-15", assignedReviewer: "Dr. Sarah Chen" },
    { id: "5", studentName: "Carol Williams", studentEmail: "carol.w@university.edu", submissionType: "Interview", cohort: "Spring 2025 - Engineering", status: "Completed", submittedAt: "2024-11-17", assignedReviewer: "Dr. Sarah Chen" },
    { id: "6", studentName: "Carol Williams", studentEmail: "carol.w@university.edu", submissionType: "LinkedIn Profile", cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-16", assignedReviewer: "Ms. Emily Davis", linkedinProfileUrl: "https://linkedin.com/in/carolwilliams", reviewDate: "2024-11-17", feedback: "Good start! Expand your experience descriptions with quantifiable results." },
    { id: "7", studentName: "David Brown", studentEmail: "david.b@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-16", assignedReviewer: "Ms. Emily Davis" },
    { id: "8", studentName: "Emma Davis", studentEmail: "emma.d@university.edu", submissionType: "Resume", cohort: "Fall 2024 - Business", status: "Rejected", submittedAt: "2024-11-15", assignedReviewer: "Prof. Michael Lee" },
    { id: "9", studentName: "Emma Davis", studentEmail: "emma.d@university.edu", submissionType: "Cover Letter", cohort: "Fall 2024 - Business", status: "Completed", submittedAt: "2024-11-12", assignedReviewer: "Dr. James Wilson" },
    { id: "10", studentName: "Frank Miller", studentEmail: "frank.m@university.edu", submissionType: "Cover Letter", cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-14", assignedReviewer: "Dr. James Wilson" },
    { id: "11", studentName: "Frank Miller", studentEmail: "frank.m@university.edu", submissionType: "LinkedIn Profile", cohort: "Spring 2025 - Engineering", status: "Completed", submittedAt: "2024-11-10", assignedReviewer: "Prof. Michael Lee", linkedinProfileUrl: "https://linkedin.com/in/frankmiller", reviewDate: "2024-11-11", feedback: "Strong engineering profile. Add more technical skills and certifications to increase visibility." },
    { id: "12", studentName: "Grace Wilson", studentEmail: "grace.w@university.edu", submissionType: "Interview", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-13", assignedReviewer: "Dr. Sarah Chen" },
    { id: "13", studentName: "Grace Wilson", studentEmail: "grace.w@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-08", assignedReviewer: "Prof. Michael Lee" },
    { id: "14", studentName: "Henry Moore", studentEmail: "henry.m@university.edu", submissionType: "Resume", cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-12", assignedReviewer: "Ms. Emily Davis" },
    { id: "15", studentName: "Iris Taylor", studentEmail: "iris.t@university.edu", submissionType: "Cover Letter", cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-11", assignedReviewer: "Prof. Michael Lee" },
    { id: "16", studentName: "Jack Anderson", studentEmail: "jack.a@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-10", assignedReviewer: "Dr. James Wilson" },
    { id: "17", studentName: "Jack Anderson", studentEmail: "jack.a@university.edu", submissionType: "LinkedIn Profile", cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-09", assignedReviewer: "Dr. Sarah Chen", linkedinProfileUrl: "https://linkedin.com/in/jackanderson" },
    { id: "18", studentName: "Kate Thomas", studentEmail: "kate.t@university.edu", submissionType: "Interview", cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-09", assignedReviewer: "Dr. Sarah Chen" },
    { id: "19", studentName: "Leo Jackson", studentEmail: "leo.j@university.edu", submissionType: "Resume", cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-08", assignedReviewer: "Ms. Emily Davis" },
    { id: "20", studentName: "Mia Martinez", studentEmail: "mia.m@university.edu", submissionType: "Cover Letter", cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-07", assignedReviewer: "Prof. Michael Lee" },
    { id: "21", studentName: "Mia Martinez", studentEmail: "mia.m@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-05", assignedReviewer: "Dr. James Wilson" },
    { id: "22", studentName: "Noah Garcia", studentEmail: "noah.g@university.edu", submissionType: "Interview", cohort: "Fall 2024 - Business", status: "Completed", submittedAt: "2024-11-06", assignedReviewer: "Dr. James Wilson" },
    { id: "23", studentName: "Olivia Rodriguez", studentEmail: "olivia.r@university.edu", submissionType: "Resume", cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-05", assignedReviewer: "Dr. Sarah Chen" },
    { id: "24", studentName: "Paul White", studentEmail: "paul.w@university.edu", submissionType: "LinkedIn Profile", cohort: "Fall 2024 - Business", status: "Completed", submittedAt: "2024-11-04", assignedReviewer: "Ms. Emily Davis", linkedinProfileUrl: "https://linkedin.com/in/paulwhite", reviewDate: "2024-11-05", feedback: "Nice professional summary. Work on getting more recommendations from colleagues and supervisors." },
    { id: "25", studentName: "Quinn Lee", studentEmail: "quinn.l@university.edu", submissionType: "Cover Letter", cohort: "Spring 2025 - Engineering", status: "Pending", submittedAt: "2024-11-03", assignedReviewer: "Prof. Michael Lee" },
];

const statusVariants: Record<SubmissionStatus, "success" | "warning" | "error" | "info"> = {
    Pending: "warning",
    "In Review": "info",
    Completed: "success",
    Rejected: "error",
};

const submissionTypeIcons: Record<SubmissionType, React.ElementType> = {
    Resume: FileText,
    "Cover Letter": Mail,
    Interview: Video,
    "LinkedIn Profile": Linkedin,
};

// Generate consistent mock scores based on submission ID and status
const generateMockScore = (submissionId: string, status: SubmissionStatus): number | null => {
    // Only completed and rejected submissions have scores
    if (status === "Pending" || status === "In Review") return null;
    
    // Use submission ID to generate consistent scores
    const seed = parseInt(submissionId) || 1;
    const baseScore = (seed * 17) % 30; // Generate a number between 0-29
    
    if (status === "Completed") {
        return 80 + baseScore % 16; // 80-95
    } else if (status === "Rejected") {
        return 50 + baseScore % 21; // 50-70
    }
    
    return null;
};

// Calculate overall score from all completed submissions
const calculateOverallScore = (submissions: Submission[]): number => {
    const scoredSubmissions = submissions
        .map(s => generateMockScore(s.id, s.status))
        .filter((score): score is number => score !== null);
    
    if (scoredSubmissions.length === 0) return 0;
    
    const sum = scoredSubmissions.reduce((acc, score) => acc + score, 0);
    return Math.round(sum / scoredSubmissions.length);
};

export default function StudentPortfolio() {
    const { openBookingModal } = useBookingModal();
    const searchParams = useSearchParams();
    
    // Get student param from URL
    const studentParam = searchParams.get('student');
    
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<SubmissionType | "all">("all");
    const [statusFilter, setStatusFilter] = useState<SubmissionStatus | "all">("all");
    const [cohortFilter, setCohortFilter] = useState<string>("all");
    const [studentFilter, setStudentFilter] = useState<string>("all");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Submission; direction: "asc" | "desc" } | null>(null);
    const [sampleDataLoaded, setSampleDataLoaded] = useState(!!studentParam);
    const [selectedStudentEmail, setSelectedStudentEmail] = useState<string | null>(studentParam);

    const submissionTypes: SubmissionType[] = ["Resume", "Cover Letter", "Interview", "LinkedIn Profile"];
    const statuses: SubmissionStatus[] = ["Pending", "In Review", "Completed", "Rejected"];

    // Get unique cohorts and students for filters
    const uniqueCohorts = useMemo(() => {
        return Array.from(new Set(mockData.map(item => item.cohort))).sort();
    }, []);

    const uniqueStudents = useMemo(() => {
        return Array.from(new Set(mockData.map(item => ({ name: item.studentName, email: item.studentEmail }))
            .map(s => JSON.stringify(s))))
            .map(s => JSON.parse(s))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredAndSortedData = useMemo(() => {
        // If sample data hasn't been loaded, return empty array
        if (!sampleDataLoaded) {
            return [];
        }

        const filtered = mockData.filter((item) => {
            const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === "all" || item.submissionType === typeFilter;
            const matchesStatus = statusFilter === "all" || item.status === statusFilter;
            const matchesCohort = cohortFilter === "all" || item.cohort === cohortFilter;
            const matchesStudent = studentFilter === "all" || item.studentEmail === studentFilter;
            return matchesSearch && matchesType && matchesStatus && matchesCohort && matchesStudent;
        });

        if (sortConfig) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key] ?? "";
                const bValue = b[sortConfig.key] ?? "";
                if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [searchTerm, typeFilter, statusFilter, cohortFilter, studentFilter, sortConfig, sampleDataLoaded]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
    }, [filteredAndSortedData, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

    const handleSort = (key: keyof Submission) => {
        setSortConfig((current) => {
            if (!current || current.key !== key) {
                return { key, direction: "asc" };
            }
            if (current.direction === "asc") {
                return { key, direction: "desc" };
            }
            return null;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === paginatedData.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(paginatedData.map((item) => item.id)));
        }
    };

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const getInitials = (name: string) => {
        return name.split(" ").map((n) => n[0]).join("").toUpperCase();
    };

    const handleStudentClick = (email: string) => {
        setSelectedStudentEmail(email);
    };

    const clearAllFilters = () => {
        setSearchTerm("");
        setTypeFilter("all");
        setStatusFilter("all");
        setCohortFilter("all");
        setStudentFilter("all");
        setCurrentPage(1);
    };

    const activeFiltersCount = [
        typeFilter !== "all",
        statusFilter !== "all",
        cohortFilter !== "all",
        studentFilter !== "all",
    ].filter(Boolean).length;

    // Student Profile View Component
    if (selectedStudentEmail) {
        const studentSubmissions = mockData.filter(s => s.studentEmail === selectedStudentEmail);
        const studentInfo = studentSubmissions[0];
        
        if (!studentInfo) {
            setSelectedStudentEmail(null);
            return null;
        }

        const overallScore = calculateOverallScore(studentSubmissions);
        
        // Group submissions by type with their scores
        const submissionsByType = submissionTypes.reduce((acc, type) => {
            const submissions = studentSubmissions.filter(s => s.submissionType === type);
            if (submissions.length > 0) {
                const scores = submissions
                    .map(s => generateMockScore(s.id, s.status))
                    .filter((score): score is number => score !== null);
                const avgScore = scores.length > 0 
                    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
                    : null;
                acc[type] = { submissions, avgScore };
            }
            return acc;
        }, {} as Record<string, { submissions: Submission[]; avgScore: number | null }>);

        // Sort submissions chronologically (most recent first)
        const sortedSubmissions = [...studentSubmissions].sort((a, b) => 
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );

        const getScoreColor = (score: number | null) => {
            if (score === null) return "text-muted-foreground";
            if (score >= 90) return "text-green-600 dark:text-green-500";
            if (score >= 75) return "text-blue-600 dark:text-blue-500";
            if (score >= 60) return "text-yellow-600 dark:text-yellow-500";
            return "text-red-600 dark:text-red-500";
        };

        const getScoreBgColor = (score: number | null) => {
            if (score === null) return "bg-muted";
            if (score >= 90) return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800";
            if (score >= 75) return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800";
            if (score >= 60) return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800";
            return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
        };

        return (
            <div className="flex flex-col min-h-screen">
                <PageHeader
                    title="Student Portfolio"
                    description="Comprehensive database of all student submissions and career materials across all reviewers"
                />
                <main className="p-4 space-y-4 w-full max-w-7xl mx-auto">
                    {/* Breadcrumb Navigation */}
                    <div className="space-y-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink 
                                        onClick={() => setSelectedStudentEmail(null)}
                                        className="cursor-pointer hover:text-primary text-sm"
                                    >
                                        Student Portfolio
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-sm">{studentInfo.studentName}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedStudentEmail(null)}
                            className="h-8 px-2 text-xs"
                        >
                            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                            Back to All Students
                        </Button>
                    </div>

                    {/* Profile Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border bg-card shadow-sm"
                    >
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                {/* Student Info */}
                                <div className="flex gap-4 items-center flex-1">
                                    <Avatar className="h-16 w-16">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                                            {getInitials(studentInfo.studentName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold mb-1">{studentInfo.studentName}</h2>
                                        <p className="text-sm text-muted-foreground mb-2">{studentInfo.studentEmail}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {studentInfo.cohort}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                                <span>Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Overall Score */}
                                <div className={`rounded-lg border p-4 ${getScoreBgColor(overallScore)} md:min-w-[200px]`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="h-4 w-4 text-primary" />
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Overall Score</p>
                                    </div>
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                                            {overallScore}
                                        </span>
                                        <span className="text-lg text-muted-foreground">/100</span>
                                    </div>
                                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${overallScore}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className={`h-full ${
                                                overallScore >= 90 ? "bg-green-600" :
                                                overallScore >= 75 ? "bg-blue-600" :
                                                overallScore >= 60 ? "bg-yellow-600" :
                                                "bg-red-600"
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Score Dashboard - Individual Submission Type Scores */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {submissionTypes.map((type, index) => {
                            const data = submissionsByType[type];
                            const TypeIcon = submissionTypeIcons[type];
                            const score = data?.avgScore ?? null;
                            const count = data?.submissions.length ?? 0;
                            const hasLink = score !== null && count > 0;
                            
                            // Get appropriate view text based on type
                            const getViewText = () => {
                                if (type === "Resume") return "View Resume";
                                if (type === "Cover Letter") return "View Cover Letter";
                                if (type === "Interview") return "View Interview";
                                if (type === "LinkedIn Profile") return "View LinkedIn";
                                return "View";
                            };

                            return (
                                <motion.div
                                    key={type}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                    className={`rounded-lg border p-4 ${
                                        score !== null ? getScoreBgColor(score) : "bg-card"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <TypeIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                            <p className="text-xs font-medium text-muted-foreground">{type}</p>
                                        </div>
                                        {hasLink && (
                                            <button 
                                                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-background/80 transition-colors text-xs text-muted-foreground"
                                                disabled
                                            >
                                                <span>{getViewText()}</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </button>
                                        )}
                                    </div>
                                    {score !== null ? (
                                        <>
                                            <div className="flex items-end gap-1">
                                                <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                                                    {score}
                                                </span>
                                                <span className="text-sm text-muted-foreground mb-0.5">/100</span>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground mt-1.5">
                                                {count} submission{count !== 1 ? 's' : ''}
                                            </p>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-start">
                                            <span className="text-xl font-bold text-muted-foreground">—</span>
                                            <p className="text-[10px] text-muted-foreground mt-1.5">
                                                {count > 0 ? `${count} pending` : 'No submissions'}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Timeline Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-lg border bg-card shadow-sm p-4"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <h3 className="text-base font-semibold">Submission Timeline</h3>
                        </div>

                        <div className="space-y-4">
                            {sortedSubmissions.map((submission, index) => {
                                const TypeIcon = submissionTypeIcons[submission.submissionType];
                                const score = generateMockScore(submission.id, submission.status);
                                const isLinkedIn = submission.submissionType === "LinkedIn Profile";
                                const isResume = submission.submissionType === "Resume";
                                const isInterview = submission.submissionType === "Interview";

                                return (
                                    <motion.div
                                        key={submission.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.05 }}
                                        className="relative pl-6 pb-4 border-l-2 border-muted last:pb-0"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                                        
                                        <div className="rounded-lg border bg-card/50 p-3 hover:bg-accent/50 transition-colors">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                                <div className="flex items-start gap-2.5 flex-1">
                                                    <div className="p-1.5 rounded-md bg-primary/10">
                                                        <TypeIcon className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="text-sm font-semibold">{submission.submissionType}</h4>
                                                            <Badge variant={statusVariants[submission.status]} className="text-[10px] h-5">
                                                                {submission.status}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Calendar className="h-3 w-3" />
                                                            {new Date(submission.submittedAt).toLocaleDateString("en-US", { 
                                                                month: "short", 
                                                                day: "numeric", 
                                                                year: "numeric" 
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {score !== null && (
                                                    <div className={`px-3 py-1.5 rounded-md border ${getScoreBgColor(score)}`}>
                                                        <p className="text-[10px] text-muted-foreground mb-0.5">Score</p>
                                                        <p className={`text-lg font-bold ${getScoreColor(score)}`}>
                                                            {score}
                                                            <span className="text-xs text-muted-foreground">/100</span>
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center gap-1.5 text-xs">
                                                    <User className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-muted-foreground">Reviewed by:</span>
                                                    <span className="font-medium">{submission.assignedReviewer}</span>
                                                </div>

                                                {submission.feedback && (
                                                    <div className="p-2 rounded-md bg-muted/50 text-xs">
                                                        <p className="font-medium mb-0.5">Feedback:</p>
                                                        <p className="text-muted-foreground">{submission.feedback}</p>
                                                    </div>
                                                )}

                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {isResume && (
                                                        <Button variant="outline" size="sm" disabled className="h-7 text-xs">
                                                            <FileText className="mr-1.5 h-3 w-3" />
                                                            View Resume
                                                        </Button>
                                                    )}
                                                    {isInterview && (
                                                        <Button variant="outline" size="sm" disabled className="h-7 text-xs">
                                                            <Video className="mr-1.5 h-3 w-3" />
                                                            View Interview
                                                        </Button>
                                                    )}
                                                    {isLinkedIn && submission.linkedinProfileUrl && (
                                                        <Button variant="outline" size="sm" disabled className="h-7 text-xs">
                                                            <Linkedin className="mr-1.5 h-3 w-3" />
                                                            View LinkedIn
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="Student Portfolio"
                description="Comprehensive database of all student submissions and career materials across all reviewers"
            />
            <main className="p-6 space-y-6 w-full">
                {/* Filters Bar */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by student name or email..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 text-base"
                        />
                    </div>
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="text-sm">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filters
                                    {activeFiltersCount > 0 && (
                                        <Badge variant="secondary" className="ml-2 rounded-full px-2 py-0 text-xs">
                                            {activeFiltersCount}
                                        </Badge>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Submission Type</DropdownMenuLabel>
                                <DropdownMenuRadioGroup
                                    value={typeFilter}
                                    onValueChange={(value) => {
                                        setTypeFilter(value as SubmissionType | "all");
                                        setCurrentPage(1);
                                    }}
                                >
                                    <DropdownMenuRadioItem value="all">All Types</DropdownMenuRadioItem>
                                    {submissionTypes.map((type) => (
                                        <DropdownMenuRadioItem key={type} value={type}>
                                            {type}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuLabel>Status</DropdownMenuLabel>
                                <DropdownMenuRadioGroup
                                    value={statusFilter}
                                    onValueChange={(value) => {
                                        setStatusFilter(value as SubmissionStatus | "all");
                                        setCurrentPage(1);
                                    }}
                                >
                                    <DropdownMenuRadioItem value="all">All Status</DropdownMenuRadioItem>
                                    {statuses.map((status) => (
                                        <DropdownMenuRadioItem key={status} value={status}>
                                            {status}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuLabel>Cohort</DropdownMenuLabel>
                                <div className="px-2 py-1">
                                    <Combobox
                                        options={[
                                            { value: "all", label: "All Cohorts" },
                                            ...uniqueCohorts.map((cohort) => ({
                                                value: cohort,
                                                label: cohort,
                                            }))
                                        ]}
                                        value={cohortFilter}
                                        onValueChange={(value) => {
                                            setCohortFilter(value);
                                            setCurrentPage(1);
                                        }}
                                        placeholder="Select cohort..."
                                        searchPlaceholder="Search cohorts..."
                                        emptyText="No cohort found."
                                        triggerClassName="w-full"
                                        className="w-full"
                                    />
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {studentFilter !== "all" && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setStudentFilter("all");
                                    setCurrentPage(1);
                                }}
                            >
                                <User className="mr-2 h-4 w-4" />
                                Clear Student Filter
                            </Button>
                        )}
                    </div>
                </div>

                {/* Active Filters Pills */}
                {activeFiltersCount > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground">Active filters:</span>
                        {typeFilter !== "all" && (
                            <Badge variant="secondary" className="gap-1">
                                Type: {typeFilter}
                                <button
                                    onClick={() => {
                                        setTypeFilter("all");
                                        setCurrentPage(1);
                                    }}
                                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {statusFilter !== "all" && (
                            <Badge variant="secondary" className="gap-1">
                                Status: {statusFilter}
                                <button
                                    onClick={() => {
                                        setStatusFilter("all");
                                        setCurrentPage(1);
                                    }}
                                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {cohortFilter !== "all" && (
                            <Badge variant="secondary" className="gap-1">
                                Cohort: {cohortFilter}
                                <button
                                    onClick={() => {
                                        setCohortFilter("all");
                                        setCurrentPage(1);
                                    }}
                                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        {studentFilter !== "all" && (
                            <Badge variant="secondary" className="gap-1">
                                Student: {uniqueStudents.find(s => s.email === studentFilter)?.name}
                                <button
                                    onClick={() => {
                                        setStudentFilter("all");
                                        setCurrentPage(1);
                                    }}
                                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="h-7 text-xs"
                        >
                            Clear all
                        </Button>
                    </div>
                )}

                {/* Bulk Actions Bar */}
                {selectedIds.size > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-4 rounded-lg border bg-accent/50 px-4 py-3">
                        <span className="text-sm font-medium">
                            {selectedIds.size} selected
                        </span>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline">Export</Button>
                            <Button size="sm" variant="outline">Assign Reviewer</Button>
                            <Button size="sm" variant="outline" onClick={() => setSelectedIds(new Set())}>
                                Clear
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Table */}
                <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedIds.size === paginatedData.length && paginatedData.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                        disabled={!sampleDataLoaded}
                                    />
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("studentName")}>
                                    Student {sortConfig?.key === "studentName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("submissionType")}>
                                    Type {sortConfig?.key === "submissionType" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("cohort")}>
                                    Cohort {sortConfig?.key === "cohort" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                                    Status {sortConfig?.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("assignedReviewer")}>
                                    Reviewer {sortConfig?.key === "assignedReviewer" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("submittedAt")}>
                                    Submitted {sortConfig?.key === "submittedAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        {!sampleDataLoaded || filteredAndSortedData.length === 0 ? (
                            <tbody>
                                <TableRow className="hover:bg-transparent! pointer-events-none">
                                    <TableCell colSpan={8} className="h-[400px] p-0 pointer-events-auto">
                                        <HeroEmptyState
                                            headline={!sampleDataLoaded ? "No student portfolios yet" : "No submissions found"}
                                            subtext={!sampleDataLoaded 
                                                ? "Student portfolios capture each learner's journey — resume versions, interview progress, and feedback history."
                                                : "Try adjusting your filters or search criteria."}
                                            icon={Briefcase}
                                            primaryAction={{
                                                label: !sampleDataLoaded ? "Add Student" : "Clear All Filters",
                                                onClick: () => {
                                                    if (!sampleDataLoaded) {
                                                        openBookingModal("add-student");
                                                    } else {
                                                        clearAllFilters();
                                                    }
                                                }
                                            }}
                                            secondaryAction={{
                                                label: !sampleDataLoaded ? "Load Sample Data" : "Reset View",
                                                tooltip: !sampleDataLoaded ? "Load a sample student to preview portfolio insights and progress tracking." : undefined,
                                                onClick: () => {
                                                    if (!sampleDataLoaded) {
                                                        setSampleDataLoaded(true);
                                                    } else {
                                                        setSampleDataLoaded(false);
                                                    }
                                                    clearAllFilters();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </tbody>
                        ) : (
                            <StaggerContainer key={`${currentPage}-${typeFilter}-${statusFilter}-${cohortFilter}-${studentFilter}-${searchTerm}`} as="tbody">
                                {paginatedData.map((submission) => {
                                    const TypeIcon = submissionTypeIcons[submission.submissionType];
                                    const isLinkedIn = submission.submissionType === "LinkedIn Profile";

                                    return (
                                        <StaggerItem key={submission.id} as="tr" className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedIds.has(submission.id)}
                                                    onCheckedChange={() => toggleSelect(submission.id)}
                                                    aria-label={`Select ${submission.studentName}`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => handleStudentClick(submission.studentEmail)}
                                                    className="flex items-center gap-3 hover:opacity-70 transition-opacity text-left"
                                                >
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                                                            {getInitials(submission.studentName)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{submission.studentName}</div>
                                                        <div className="text-xs text-muted-foreground">{submission.studentEmail}</div>
                                                    </div>
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <TypeIcon className={`h-4 w-4 ${isLinkedIn ? "text-blue-600" : "text-muted-foreground"}`} />
                                                    <span className="text-sm">{submission.submissionType}</span>
                                                    {isLinkedIn && submission.linkedinProfileUrl && (
                                                        <a
                                                            href={submission.linkedinProfileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">{submission.cohort}</TableCell>
                                            <TableCell>
                                                <Badge variant={statusVariants[submission.status]}>
                                                    {submission.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">{submission.assignedReviewer}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(submission.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon-sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <FileEdit className="mr-2 h-4 w-4" />
                                                            Review
                                                        </DropdownMenuItem>
                                                        {isLinkedIn && submission.linkedinProfileUrl && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem asChild>
                                                                    <a
                                                                        href={submission.linkedinProfileUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <Linkedin className="mr-2 h-4 w-4" />
                                                                        View LinkedIn Profile
                                                                    </a>
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </StaggerItem>
                                    );
                                })}
                            </StaggerContainer>
                        )}
                    </Table>
                </div>

                {/* Pagination */}
                {filteredAndSortedData.length > 0 && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">
                                Showing {paginatedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
                                {Math.min(currentPage * pageSize, filteredAndSortedData.length)} of{" "}
                                {filteredAndSortedData.length} results
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="icon-sm"
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
