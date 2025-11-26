"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { HeroEmptyState } from "@/components/hero-empty-state";
import { TableTopbar, StatusTab, TopbarTab } from "@/components/table-topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, FileText, Mail, Video, ClipboardCheck, Clock, CheckCircle2, X } from "lucide-react";

type SubmissionStatus = "Pending" | "Completed";
type SubmissionType = "Resume" | "Cover Letter" | "Interview";

interface ReviewItem {
  id: string;
  studentName: string;
  studentEmail: string;
  submissionType: SubmissionType;
  assignedReviewer: string;
  reviewerWorkload: number;
  cohort: string;
  status: SubmissionStatus;
  submittedAt: string;
}

const mockData: ReviewItem[] = [
  { id: "1", studentName: "Alice Johnson", studentEmail: "alice.j@university.edu", submissionType: "Resume", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-19" },
  { id: "2", studentName: "Bob Smith", studentEmail: "bob.s@university.edu", submissionType: "Cover Letter", assignedReviewer: "Prof. Michael Lee", reviewerWorkload: 8, cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-18" },
  { id: "3", studentName: "Carol Williams", studentEmail: "carol.w@university.edu", submissionType: "Interview", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Spring 2025 - Engineering", status: "Completed", submittedAt: "2024-11-17" },
  { id: "4", studentName: "David Brown", studentEmail: "david.b@university.edu", submissionType: "Resume", assignedReviewer: "Ms. Emily Davis", reviewerWorkload: 15, cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-16" },
  { id: "5", studentName: "Emma Davis", studentEmail: "emma.d@university.edu", submissionType: "Resume", assignedReviewer: "Prof. Michael Lee", reviewerWorkload: 8, cohort: "Fall 2024 - Business", status: "Completed", submittedAt: "2024-11-15" },
  { id: "6", studentName: "Frank Miller", studentEmail: "frank.m@university.edu", submissionType: "Cover Letter", assignedReviewer: "Dr. James Wilson", reviewerWorkload: 10, cohort: "Spring 2025 - Engineering", status: "Pending", submittedAt: "2024-11-14" },
  { id: "7", studentName: "Grace Wilson", studentEmail: "grace.w@university.edu", submissionType: "Interview", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-13" },
  { id: "8", studentName: "Henry Moore", studentEmail: "henry.m@university.edu", submissionType: "Resume", assignedReviewer: "Ms. Emily Davis", reviewerWorkload: 15, cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-12" },
  { id: "9", studentName: "Iris Taylor", studentEmail: "iris.t@university.edu", submissionType: "Cover Letter", assignedReviewer: "Prof. Michael Lee", reviewerWorkload: 8, cohort: "Spring 2025 - Engineering", status: "Completed", submittedAt: "2024-11-11" },
  { id: "10", studentName: "Jack Anderson", studentEmail: "jack.a@university.edu", submissionType: "Resume", assignedReviewer: "Dr. James Wilson", reviewerWorkload: 10, cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-10" },
  { id: "11", studentName: "Kate Thomas", studentEmail: "kate.t@university.edu", submissionType: "Interview", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-09" },
  { id: "12", studentName: "Leo Jackson", studentEmail: "leo.j@university.edu", submissionType: "Resume", assignedReviewer: "Ms. Emily Davis", reviewerWorkload: 15, cohort: "Spring 2025 - Engineering", status: "Pending", submittedAt: "2024-11-08" },
  { id: "13", studentName: "Mia Martinez", studentEmail: "mia.m@university.edu", submissionType: "Cover Letter", assignedReviewer: "Prof. Michael Lee", reviewerWorkload: 8, cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-07" },
  { id: "14", studentName: "Noah Garcia", studentEmail: "noah.g@university.edu", submissionType: "Interview", assignedReviewer: "Dr. James Wilson", reviewerWorkload: 10, cohort: "Fall 2024 - Business", status: "Completed", submittedAt: "2024-11-06" },
  { id: "15", studentName: "Olivia Rodriguez", studentEmail: "olivia.r@university.edu", submissionType: "Resume", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Spring 2025 - Engineering", status: "Pending", submittedAt: "2024-11-05" },
];

const statusVariants: Record<SubmissionStatus, "success" | "warning"> = {
  Pending: "warning",
  Completed: "success",
};

const submissionTypeIcons: Record<SubmissionType, React.ElementType> = {
  Resume: FileText,
  "Cover Letter": Mail,
  Interview: Video,
};

const reviewers = ["Dr. Sarah Chen", "Prof. Michael Lee", "Ms. Emily Davis", "Dr. James Wilson"];

export default function ReviewCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<SubmissionType>("Resume");
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus>("Pending");
  const [cohortFilter, setCohortFilter] = useState<string>("all");
  const [reviewerFilter, setReviewerFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ReviewItem; direction: "asc" | "desc" } | null>(null);
  const [sampleDataLoaded, setSampleDataLoaded] = useState(false);

  // Compute type counts for tabs
  const typeCounts = useMemo(() => ({
    resume: sampleDataLoaded ? mockData.filter(s => s.submissionType === "Resume").length : 0,
    coverLetter: sampleDataLoaded ? mockData.filter(s => s.submissionType === "Cover Letter").length : 0,
    interview: sampleDataLoaded ? mockData.filter(s => s.submissionType === "Interview").length : 0,
  }), [sampleDataLoaded]);

  // Compute status counts based on selected type
  const statusCounts = useMemo(() => {
    if (!sampleDataLoaded) return { pending: 0, completed: 0 };
    
    const typeFiltered = mockData.filter(s => s.submissionType === typeFilter);
    
    return {
      pending: typeFiltered.filter(s => s.status === "Pending").length,
      completed: typeFiltered.filter(s => s.status === "Completed").length,
    };
  }, [sampleDataLoaded, typeFilter]);

  // Configure tabs for TableTopbar
  const typeTabs: TopbarTab[] = [
    { id: "Resume", label: "Resumes", icon: FileText, count: typeCounts.resume },
    { id: "Cover Letter", label: "Cover Letters", icon: Mail, count: typeCounts.coverLetter },
    { id: "Interview", label: "Interviews", icon: Video, count: typeCounts.interview },
  ];

  const statusTabs: StatusTab[] = [
    { id: "Pending", label: "Pending", icon: Clock, count: statusCounts.pending },
    { id: "Completed", label: "Completed", icon: CheckCircle2, count: statusCounts.completed },
  ];

  const filteredAndSortedData = useMemo(() => {
    if (!sampleDataLoaded) {
      return [];
    }

    const filtered = mockData.filter((item) => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = item.submissionType === typeFilter;
      const matchesStatus = item.status === statusFilter;
      const matchesCohort = cohortFilter === "all" || item.cohort === cohortFilter;
      const matchesReviewer = reviewerFilter === "all" || item.assignedReviewer === reviewerFilter;
      return matchesSearch && matchesType && matchesStatus && matchesCohort && matchesReviewer;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, typeFilter, statusFilter, cohortFilter, reviewerFilter, sortConfig, sampleDataLoaded]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  const handleSort = (key: keyof ReviewItem) => {
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

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const handleTypeChange = (type: string) => {
    setTypeFilter(type as SubmissionType);
    setStatusFilter("Pending");
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status as SubmissionStatus);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="Review Center" description="Manage and distribute submissions across all reviewers" />
      
      <main className="p-6 w-full">
        {/* Topbar */}
        {sampleDataLoaded && (
          <TableTopbar
            tabs={typeTabs}
            activeTab={typeFilter}
            onTabChange={handleTypeChange}
            statusTabs={statusTabs}
            activeStatus={statusFilter}
            onStatusChange={handleStatusChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search by student name or email..."
            filtersContent={
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Assigned Reviewer</Label>
                  <Select
                    value={reviewerFilter}
                    onValueChange={(value) => {
                      setReviewerFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reviewers</SelectItem>
                      {reviewers.map((reviewer) => (
                        <SelectItem key={reviewer} value={reviewer}>
                          {reviewer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cohort</Label>
                  <Select
                    value={cohortFilter}
                    onValueChange={(value) => {
                      setCohortFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cohorts</SelectItem>
                      <SelectItem value="Fall 2024 - CS">Fall 2024 - CS</SelectItem>
                      <SelectItem value="Fall 2024 - Business">Fall 2024 - Business</SelectItem>
                      <SelectItem value="Spring 2025 - Engineering">Spring 2025 - Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(cohortFilter !== "all" || reviewerFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setCohortFilter("all");
                      setReviewerFilter("all");
                      setCurrentPage(1);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            }
            activeFiltersCount={
              (cohortFilter !== "all" ? 1 : 0) + (reviewerFilter !== "all" ? 1 : 0)
            }
          />
        )}

        {/* Active Filters Pills */}
        {(cohortFilter !== "all" || reviewerFilter !== "all") && (
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {reviewerFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Reviewer: {reviewerFilter}
                <button
                  onClick={() => {
                    setReviewerFilter("all");
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
          </div>
        )}

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-x-auto mt-6">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer min-w-[200px]" onClick={() => handleSort("studentName")}>
                  Student {sortConfig?.key === "studentName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="cursor-pointer min-w-[140px]" onClick={() => handleSort("submissionType")}>
                  Type {sortConfig?.key === "submissionType" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="cursor-pointer min-w-[200px]" onClick={() => handleSort("assignedReviewer")}>
                  Assigned Reviewer {sortConfig?.key === "assignedReviewer" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="cursor-pointer min-w-[180px]" onClick={() => handleSort("cohort")}>
                  Cohort {sortConfig?.key === "cohort" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort("status")}>
                  Status {sortConfig?.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="cursor-pointer min-w-[120px]" onClick={() => handleSort("submittedAt")}>
                  Submitted {sortConfig?.key === "submittedAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-right min-w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {!sampleDataLoaded || filteredAndSortedData.length === 0 ? (
              <tbody>
                <TableRow className="hover:bg-transparent! pointer-events-none">
                  <TableCell colSpan={7} className="h-[400px] p-0 pointer-events-auto">
                    <HeroEmptyState
                      headline={!sampleDataLoaded ? "No active reviews" : "No reviews found"}
                      subtext={!sampleDataLoaded 
                        ? "When students submit resumes or interviews, you'll be able to review, rate, and provide feedback here."
                        : "Try adjusting your filters to find what you're looking for."}
                      icon={ClipboardCheck}
                      primaryAction={{
                        label: !sampleDataLoaded ? "Start a Review" : "Clear All Filters",
                        onClick: () => {
                          if (!sampleDataLoaded) {
                            setSampleDataLoaded(true);
                          }
                          setSearchTerm("");
                          setTypeFilter("Resume");
                          setStatusFilter("Pending");
                          setCohortFilter("all");
                          setCurrentPage(1);
                        }
                      }}
                      secondaryAction={{
                        label: !sampleDataLoaded ? "Load Sample Review" : "Reset View",
                        tooltip: !sampleDataLoaded ? "Explore a pre-filled review to experience the scoring and feedback workflow." : undefined,
                        onClick: () => {
                          if (!sampleDataLoaded) {
                            setSampleDataLoaded(true);
                          } else {
                            setSampleDataLoaded(false);
                          }
                          setSearchTerm("");
                          setTypeFilter("Resume");
                          setStatusFilter("Pending");
                          setCohortFilter("all");
                          setCurrentPage(1);
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              </tbody>
            ) : (
              <StaggerContainer key={`${currentPage}-${typeFilter}-${statusFilter}-${cohortFilter}-${searchTerm}`} as="tbody">
                {paginatedData.map((item) => {
                  const TypeIcon = submissionTypeIcons[item.submissionType];
                  return (
                    <StaggerItem key={item.id} as="tr" className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                              {getInitials(item.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{item.studentName}</div>
                            <div className="text-xs text-muted-foreground">{item.studentEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.submissionType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.assignedReviewer}</span>
                      </TableCell>
                      <TableCell className="text-xs">{item.cohort}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[item.status]}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(item.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Reassign
                        </Button>
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
          <div className="flex items-center justify-between mt-4">
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
