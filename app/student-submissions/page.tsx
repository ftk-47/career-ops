"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
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
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, ChevronLeft, ChevronRight, Eye, FileEdit, FileText, Mail, Video } from "lucide-react";

type SubmissionStatus = "Pending" | "In Review" | "Completed" | "Rejected";
type SubmissionType = "Resume" | "Cover Letter" | "Interview";

interface Submission {
  id: string;
  studentName: string;
  studentEmail: string;
  submissionType: SubmissionType;
  cohort: string;
  status: SubmissionStatus;
  submittedAt: string;
}

const mockData: Submission[] = [
  { id: "1", studentName: "Alice Johnson", studentEmail: "alice.j@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-19" },
  { id: "2", studentName: "Bob Smith", studentEmail: "bob.s@university.edu", submissionType: "Cover Letter", cohort: "Fall 2024 - Business", status: "In Review", submittedAt: "2024-11-18" },
  { id: "3", studentName: "Carol Williams", studentEmail: "carol.w@university.edu", submissionType: "Interview", cohort: "Spring 2025 - Engineering", status: "Completed", submittedAt: "2024-11-17" },
  { id: "4", studentName: "David Brown", studentEmail: "david.b@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-16" },
  { id: "5", studentName: "Emma Davis", studentEmail: "emma.d@university.edu", submissionType: "Resume", cohort: "Fall 2024 - Business", status: "Rejected", submittedAt: "2024-11-15" },
  { id: "6", studentName: "Frank Miller", studentEmail: "frank.m@university.edu", submissionType: "Cover Letter", cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-14" },
  { id: "7", studentName: "Grace Wilson", studentEmail: "grace.w@university.edu", submissionType: "Interview", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-13" },
  { id: "8", studentName: "Henry Moore", studentEmail: "henry.m@university.edu", submissionType: "Resume", cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-12" },
  { id: "9", studentName: "Iris Taylor", studentEmail: "iris.t@university.edu", submissionType: "Cover Letter", cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-11" },
  { id: "10", studentName: "Jack Anderson", studentEmail: "jack.a@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-10" },
  { id: "11", studentName: "Kate Thomas", studentEmail: "kate.t@university.edu", submissionType: "Interview", cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-09" },
  { id: "12", studentName: "Leo Jackson", studentEmail: "leo.j@university.edu", submissionType: "Resume", cohort: "Spring 2025 - Engineering", status: "In Review", submittedAt: "2024-11-08" },
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

export default function StudentSubmissions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<SubmissionType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | "all">("all");
  const [cohortFilter, setCohortFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Submission; direction: "asc" | "desc" } | null>(null);

  const submissionTypes: SubmissionType[] = ["Resume", "Cover Letter", "Interview"];
  const statuses: SubmissionStatus[] = ["Pending", "In Review", "Completed", "Rejected"];

  const filteredAndSortedData = useMemo(() => {
    const filtered = mockData.filter((item) => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || item.submissionType === typeFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCohort = cohortFilter === "all" || item.cohort === cohortFilter;
      return matchesSearch && matchesType && matchesStatus && matchesCohort;
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
  }, [searchTerm, typeFilter, statusFilter, cohortFilter, sortConfig]);

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

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="Student Submissions" description="Review and manage student submissions assigned to you" />
      <main className="flex-1 p-6 space-y-6 w-full">
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
          <div className="flex flex-wrap gap-2">
            {/* Filter Chips */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={typeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => { setTypeFilter("all"); setCurrentPage(1); }}
              >
                All Types
              </Button>
              {submissionTypes.map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setTypeFilter(type); setCurrentPage(1); }}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => { setStatusFilter("all"); setCurrentPage(1); }}
              >
                All Status
              </Button>
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-4 rounded-lg border bg-accent/50 px-4 py-3">
            <span className="text-sm font-medium">
              {selectedIds.size} selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Mark Complete</Button>
              <Button size="sm" variant="outline">Assign Reviewer</Button>
              <Button size="sm" variant="outline" onClick={() => setSelectedIds(new Set())}>
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        {filteredAndSortedData.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No submissions found"
            description="Try adjusting your filters or search criteria to find what you're looking for."
            action={{ label: "Clear filters", onClick: () => { setSearchTerm(""); setTypeFilter("all"); setStatusFilter("all"); setCohortFilter("all"); } }}
          />
        ) : (
          <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.size === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
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
                  <TableHead className="cursor-pointer" onClick={() => handleSort("submittedAt")}>
                    Submitted {sortConfig?.key === "submittedAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((submission) => {
                  const TypeIcon = submissionTypeIcons[submission.submissionType];
                  return (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.has(submission.id)}
                          onCheckedChange={() => toggleSelect(submission.id)}
                          aria-label={`Select ${submission.studentName}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                              {getInitials(submission.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{submission.studentName}</div>
                            <div className="text-xs text-muted-foreground">{submission.studentEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{submission.submissionType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{submission.cohort}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[submission.status]}>
                          {submission.status}
                        </Badge>
                      </TableCell>
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
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Review
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
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
