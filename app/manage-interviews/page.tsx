"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, ChevronLeft, ChevronRight, Plus, Calendar, Edit, Pause, Play } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type AssignmentType = "Cohort" | "Individual";
type InterviewStatus = "Active" | "Paused";

interface Interview {
  id: string;
  interviewName: string;
  assignedTo: string;
  assignmentType: AssignmentType;
  createdBy: string;
  createdAt: string;
  status: InterviewStatus;
}

const mockData: Interview[] = [
  { id: "1", interviewName: "Technical Interview - Software Engineering", assignedTo: "Fall 2024 - CS (45 students)", assignmentType: "Cohort", createdBy: "Dr. Sarah Chen", createdAt: "2024-11-01", status: "Active" },
  { id: "2", interviewName: "Behavioral Interview - Leadership", assignedTo: "8 students", assignmentType: "Individual", createdBy: "Prof. Michael Lee", createdAt: "2024-11-02", status: "Active" },
  { id: "3", interviewName: "Case Study - Management Consulting", assignedTo: "Fall 2024 - Business (38 students)", assignmentType: "Cohort", createdBy: "Ms. Emily Davis", createdAt: "2024-11-03", status: "Active" },
  { id: "4", interviewName: "System Design Interview", assignedTo: "12 students", assignmentType: "Individual", createdBy: "Dr. James Wilson", createdAt: "2024-11-04", status: "Paused" },
  { id: "5", interviewName: "Marketing Strategy Interview", assignedTo: "Fall 2024 - Marketing (28 students)", assignmentType: "Cohort", createdBy: "Jennifer Martinez", createdAt: "2024-11-05", status: "Active" },
  { id: "6", interviewName: "Data Structures & Algorithms", assignedTo: "Spring 2025 - CS (52 students)", assignmentType: "Cohort", createdBy: "Dr. Sarah Chen", createdAt: "2024-11-06", status: "Active" },
  { id: "7", interviewName: "Finance Industry Interview Prep", assignedTo: "15 students", assignmentType: "Individual", createdBy: "Robert Taylor", createdAt: "2024-11-07", status: "Active" },
  { id: "8", interviewName: "Product Management Interview", assignedTo: "Spring 2025 - MBA (25 students)", assignmentType: "Cohort", createdBy: "Lisa Anderson", createdAt: "2024-11-08", status: "Active" },
  { id: "9", interviewName: "UX Design Portfolio Review", assignedTo: "Spring 2025 - Design (40 students)", assignmentType: "Cohort", createdBy: "David Thompson", createdAt: "2024-11-09", status: "Active" },
  { id: "10", interviewName: "Investment Banking Mock Interview", assignedTo: "6 students", assignmentType: "Individual", createdBy: "Prof. Michael Lee", createdAt: "2024-11-10", status: "Paused" },
  { id: "11", interviewName: "Research Position Interview", assignedTo: "Fall 2024 - Psychology (22 students)", assignmentType: "Cohort", createdBy: "Dr. James Wilson", createdAt: "2024-11-11", status: "Active" },
  { id: "12", interviewName: "Startup Founder Interview Prep", assignedTo: "10 students", assignmentType: "Individual", createdBy: "Dr. Sarah Chen", createdAt: "2024-11-12", status: "Active" },
];

const assignmentTypeVariants: Record<AssignmentType, "default" | "info"> = {
  Cohort: "default",
  Individual: "info",
};

const statusVariants: Record<InterviewStatus, "success" | "warning"> = {
  Active: "success",
  Paused: "warning",
};

export default function ManageInterviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [assignmentTypeFilter, setAssignmentTypeFilter] = useState<AssignmentType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<InterviewStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = useState<{ key: keyof Interview; direction: "asc" | "desc" } | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newInterviewName, setNewInterviewName] = useState("");
  const [newInterviewDescription, setNewInterviewDescription] = useState("");

  const assignmentTypes: AssignmentType[] = ["Cohort", "Individual"];
  const statuses: InterviewStatus[] = ["Active", "Paused"];

  const filteredAndSortedData = useMemo(() => {
    const filtered = mockData.filter((item) => {
      const matchesSearch = item.interviewName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = assignmentTypeFilter === "all" || item.assignmentType === assignmentTypeFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });

    if (sortConfig) {
      return [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, assignmentTypeFilter, statusFilter, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  const handleSort = (key: keyof Interview) => {
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

  const handleCreate = () => {
    console.log("Creating interview:", { newInterviewName, newInterviewDescription });
    setNewInterviewName("");
    setNewInterviewDescription("");
    setCreateDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Manage Interviews" 
        description="Create and manage interview templates and assignments"
        actions={
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Interview
          </Button>
        }
      />
      <main className="flex-1 p-6 space-y-6 w-full">
        {/* Filters Bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2">
              <Button
                variant={assignmentTypeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => { setAssignmentTypeFilter("all"); setCurrentPage(1); }}
              >
                All Types
              </Button>
              {assignmentTypes.map((type) => (
                <Button
                  key={type}
                  variant={assignmentTypeFilter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setAssignmentTypeFilter(type); setCurrentPage(1); }}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
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

        {/* Table */}
        {filteredAndSortedData.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No interviews found"
            description="Create your first interview template to get started."
            action={{ label: "Create Interview", onClick: () => setCreateDialogOpen(true) }}
          />
        ) : (
          <div className="rounded-xl border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer w-[200px]" onClick={() => handleSort("interviewName")}>
                    Interview Name {sortConfig?.key === "interviewName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer w-[200px]" onClick={() => handleSort("assignedTo")}>
                    Assigned To {sortConfig?.key === "assignedTo" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer w-[100px]" onClick={() => handleSort("assignmentType")}>
                    Type {sortConfig?.key === "assignmentType" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer w-[100px]" onClick={() => handleSort("status")}>
                    Status {sortConfig?.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer w-[150px]" onClick={() => handleSort("createdBy")}>
                    Created {sortConfig?.key === "createdBy" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-right w-[130px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell className="font-medium truncate" title={interview.interviewName}>{interview.interviewName}</TableCell>
                    <TableCell className="text-sm truncate" title={interview.assignedTo}>{interview.assignedTo}</TableCell>
                    <TableCell>
                      <Badge variant={assignmentTypeVariants[interview.assignmentType]}>
                        {interview.assignmentType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[interview.status]}>
                        {interview.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm truncate" title={interview.createdBy}>{interview.createdBy}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(interview.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon-sm">
                          {interview.status === "Active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-3 w-3" />
                          Assign
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {filteredAndSortedData.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {paginatedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, filteredAndSortedData.length)} of{" "}
              {filteredAndSortedData.length} results
            </p>
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

      {/* Create Interview Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Interview</DialogTitle>
            <DialogDescription>
              Set up a new interview template. You can assign it to cohorts or individual students after creation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="interview-name">Interview Name</Label>
              <Input
                id="interview-name"
                placeholder="e.g., Technical Interview - Software Engineering"
                value={newInterviewName}
                onChange={(e) => setNewInterviewName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview-description">Description (Optional)</Label>
              <Textarea
                id="interview-description"
                placeholder="Describe the interview template..."
                value={newInterviewDescription}
                onChange={(e) => setNewInterviewDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newInterviewName}>
              Create Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
