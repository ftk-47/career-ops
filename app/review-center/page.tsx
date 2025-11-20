"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight, ListChecks, FileText, Mail, Video, Filter, X } from "lucide-react";

type SubmissionStatus = "Pending" | "In Review" | "Completed" | "Rejected";
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
  { id: "2", studentName: "Bob Smith", studentEmail: "bob.s@university.edu", submissionType: "Cover Letter", assignedReviewer: "Prof. Michael Lee", reviewerWorkload: 8, cohort: "Fall 2024 - Business", status: "In Review", submittedAt: "2024-11-18" },
  { id: "3", studentName: "Carol Williams", studentEmail: "carol.w@university.edu", submissionType: "Interview", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Spring 2025 - Engineering", status: "Completed", submittedAt: "2024-11-17" },
  { id: "4", studentName: "David Brown", studentEmail: "david.b@university.edu", submissionType: "Resume", assignedReviewer: "Ms. Emily Davis", reviewerWorkload: 15, cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-16" },
  { id: "5", studentName: "Emma Davis", studentEmail: "emma.d@university.edu", submissionType: "Resume", assignedReviewer: "Prof. Michael Lee", reviewerWorkload: 8, cohort: "Fall 2024 - Business", status: "Rejected", submittedAt: "2024-11-15" },
  { id: "6", studentName: "Frank Miller", studentEmail: "frank.m@university.edu", submissionType: "Cover Letter", assignedReviewer: "Dr. James Wilson", reviewerWorkload: 10, cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-14" },
  { id: "7", studentName: "Grace Wilson", studentEmail: "grace.w@university.edu", submissionType: "Interview", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-13" },
  { id: "8", studentName: "Henry Moore", studentEmail: "henry.m@university.edu", submissionType: "Resume", assignedReviewer: "Ms. Emily Davis", reviewerWorkload: 15, cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-12" },
  { id: "9", studentName: "Iris Taylor", studentEmail: "iris.t@university.edu", submissionType: "Cover Letter", assignedReviewer: "Prof. Michael Lee", reviewerWorkload: 8, cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-11" },
  { id: "10", studentName: "Jack Anderson", studentEmail: "jack.a@university.edu", submissionType: "Resume", assignedReviewer: "Dr. James Wilson", reviewerWorkload: 10, cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-10" },
  { id: "11", studentName: "Kate Thomas", studentEmail: "kate.t@university.edu", submissionType: "Interview", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-09" },
  { id: "12", studentName: "Leo Jackson", studentEmail: "leo.j@university.edu", submissionType: "Resume", assignedReviewer: "Ms. Emily Davis", reviewerWorkload: 15, cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-08" },
  { id: "13", studentName: "Mia Martinez", studentEmail: "mia.m@university.edu", submissionType: "Cover Letter", assignedReviewer: "Prof. Michael Lee", reviewerWorkload: 8, cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-07" },
  { id: "14", studentName: "Noah Garcia", studentEmail: "noah.g@university.edu", submissionType: "Interview", assignedReviewer: "Dr. James Wilson", reviewerWorkload: 10, cohort: "Fall 2024 - Business", status: "Completed", submittedAt: "2024-11-06" },
  { id: "15", studentName: "Olivia Rodriguez", studentEmail: "olivia.r@university.edu", submissionType: "Resume", assignedReviewer: "Dr. Sarah Chen", reviewerWorkload: 12, cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-05" },
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
};

const reviewers = ["Dr. Sarah Chen", "Prof. Michael Lee", "Ms. Emily Davis", "Dr. James Wilson"];

export default function ReviewCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewerFilter, setReviewerFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | "all">("all");
  const [cohortFilter, setCohortFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ReviewItem; direction: "asc" | "desc" } | null>(null);

  const statuses: SubmissionStatus[] = ["Pending", "In Review", "Completed", "Rejected"];

  const filteredAndSortedData = useMemo(() => {
    const filtered = mockData.filter((item) => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesReviewer = reviewerFilter === "all" || item.assignedReviewer === reviewerFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCohort = cohortFilter === "all" || item.cohort === cohortFilter;
      return matchesSearch && matchesReviewer && matchesStatus && matchesCohort;
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
  }, [searchTerm, reviewerFilter, statusFilter, cohortFilter, sortConfig]);

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

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="Review Center" description="Manage and distribute submissions across all reviewers" />
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
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Reviewer</DropdownMenuLabel>
              <DropdownMenuRadioGroup 
                value={reviewerFilter} 
                onValueChange={(value) => {
                  setReviewerFilter(value);
                  setCurrentPage(1);
                }}
              >
                <DropdownMenuRadioItem value="all">All Reviewers</DropdownMenuRadioItem>
                {reviewers.map((reviewer) => (
                  <DropdownMenuRadioItem key={reviewer} value={reviewer}>
                    {reviewer}
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters Pills */}
        {(reviewerFilter !== "all" || statusFilter !== "all") && (
          <div className="flex items-center gap-2 flex-wrap">
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setReviewerFilter("all");
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className="h-7 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Table */}
        {filteredAndSortedData.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            title="No reviews found"
            description="Try adjusting your filters to find what you're looking for."
            action={{ label: "Clear filters", onClick: () => { setSearchTerm(""); setReviewerFilter("all"); setStatusFilter("all"); setCohortFilter("all"); } }}
          />
        ) : (
          <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
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
              <StaggerContainer key={`${currentPage}-${reviewerFilter}-${statusFilter}-${cohortFilter}-${searchTerm}`} as="tbody">
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
            </Table>
          </div>
        )}

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
