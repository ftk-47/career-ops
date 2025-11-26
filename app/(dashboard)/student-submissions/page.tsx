"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { HeroEmptyState } from "@/components/hero-empty-state";
import { TableTopbar, StatusTab, TopbarTab } from "@/components/table-topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import { motion } from "framer-motion";
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
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MoreVertical, ChevronLeft, ChevronRight, Eye, FileEdit, FileText, Mail, Video, X, Clock, CheckCircle2 } from "lucide-react";

type SubmissionStatus = "Pending" | "Completed";
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
  { id: "2", studentName: "Bob Smith", studentEmail: "bob.s@university.edu", submissionType: "Cover Letter", cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-18" },
  { id: "3", studentName: "Carol Williams", studentEmail: "carol.w@university.edu", submissionType: "Interview", cohort: "Spring 2025 - Engineering", status: "Completed", submittedAt: "2024-11-17" },
  { id: "4", studentName: "David Brown", studentEmail: "david.b@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Pending", submittedAt: "2024-11-16" },
  { id: "5", studentName: "Emma Davis", studentEmail: "emma.d@university.edu", submissionType: "Resume", cohort: "Fall 2024 - Business", status: "Completed", submittedAt: "2024-11-15" },
  { id: "6", studentName: "Frank Miller", studentEmail: "frank.m@university.edu", submissionType: "Cover Letter", cohort: "Spring 2025 - Engineering", status: "Pending", submittedAt: "2024-11-14" },
  { id: "7", studentName: "Grace Wilson", studentEmail: "grace.w@university.edu", submissionType: "Interview", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-13" },
  { id: "8", studentName: "Henry Moore", studentEmail: "henry.m@university.edu", submissionType: "Resume", cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-12" },
  { id: "9", studentName: "Iris Taylor", studentEmail: "iris.t@university.edu", submissionType: "Cover Letter", cohort: "Spring 2025 - Engineering", status: "Completed", submittedAt: "2024-11-11" },
  { id: "10", studentName: "Jack Anderson", studentEmail: "jack.a@university.edu", submissionType: "Resume", cohort: "Fall 2024 - CS", status: "Completed", submittedAt: "2024-11-10" },
  { id: "11", studentName: "Kate Thomas", studentEmail: "kate.t@university.edu", submissionType: "Interview", cohort: "Fall 2024 - Business", status: "Pending", submittedAt: "2024-11-09" },
  { id: "12", studentName: "Leo Jackson", studentEmail: "leo.j@university.edu", submissionType: "Resume", cohort: "Spring 2025 - Engineering", status: "Pending", submittedAt: "2024-11-08" },
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

export default function StudentSubmissions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<SubmissionType>("Resume");
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus>("Pending");
  const [cohortFilter, setCohortFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Submission; direction: "asc" | "desc" } | null>(null);
  const [sampleDataLoaded, setSampleDataLoaded] = useState(false);

  // Compute type counts for the type tabs
  const typeCounts = useMemo(() => ({
    resume: sampleDataLoaded ? mockData.filter(s => s.submissionType === "Resume").length : 0,
    coverLetter: sampleDataLoaded ? mockData.filter(s => s.submissionType === "Cover Letter").length : 0,
    interview: sampleDataLoaded ? mockData.filter(s => s.submissionType === "Interview").length : 0,
  }), [sampleDataLoaded]);

  // Compute status counts based on selected type (for the stats bar)
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
  }, [searchTerm, typeFilter, statusFilter, cohortFilter, sortConfig, sampleDataLoaded]);

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
      <PageHeader title="Student Submissions" description="Review and manage student submissions assigned to you" />
      
      <main className="p-6 w-full">
        {/* Topbar: Tabs + Controls */}
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
                {cohortFilter !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setCohortFilter("all");
                      setCurrentPage(1);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            }
            activeFiltersCount={cohortFilter !== "all" ? 1 : 0}
          />
        )}

        {/* Active Filters Pills */}
        {cohortFilter !== "all" && (
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <span className="text-sm text-muted-foreground">Active filters:</span>
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
          </div>
        )}

        {/* Bulk Actions Bar */}
        {selectedIds.size > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-4 rounded-lg border bg-accent/50 px-4 py-3 mt-4"
          >
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
          </motion.div>
        )}

        {/* Table - 24px spacing from controls */}
        <div className="rounded-xl border bg-card shadow-sm overflow-x-auto mt-6">
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
                <TableHead className="cursor-pointer" onClick={() => handleSort("submittedAt")}>
                  Submitted {sortConfig?.key === "submittedAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {!sampleDataLoaded || filteredAndSortedData.length === 0 ? (
              <tbody>
                <TableRow className="hover:bg-transparent! pointer-events-none">
                  <TableCell colSpan={7} className="h-[400px] p-0 pointer-events-auto">
                    <HeroEmptyState
                      headline={!sampleDataLoaded ? "No submissions yet" : "No submissions found"}
                      subtext={!sampleDataLoaded 
                        ? "As students submit resumes, cover letters, and mock interviews, they'll appear here for review."
                        : "Try adjusting your filters or search criteria."}
                      icon={FileText}
                      primaryAction={{
                        label: !sampleDataLoaded ? "Start Review" : "Clear All Filters",
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
                        label: !sampleDataLoaded ? "Add Sample Submissions" : "Reset View",
                        tooltip: !sampleDataLoaded ? "Load a few example submissions to explore how the review process works." : undefined,
                        onClick: () => {
                          if (!sampleDataLoaded) {
                            console.log("Invite students");
                          } else {
                            setSampleDataLoaded(false);
                            setSearchTerm("");
                            setTypeFilter("Resume");
                            setStatusFilter("Pending");
                            setCohortFilter("all");
                            setCurrentPage(1);
                          }
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              </tbody>
            ) : (
              <StaggerContainer key={`${currentPage}-${typeFilter}-${statusFilter}-${cohortFilter}-${searchTerm}`} as="tbody">
                {paginatedData.map((submission) => {
                  const TypeIcon = submissionTypeIcons[submission.submissionType];
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
