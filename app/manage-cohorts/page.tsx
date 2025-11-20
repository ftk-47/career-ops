"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, ChevronLeft, ChevronRight, Plus, GraduationCap, Users, UserCheck, Edit, Filter, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Cohort {
  id: string;
  cohortName: string;
  students: number;
  reviewers: number;
  createdAt: string;
  isActive: boolean;
}

const mockData: Cohort[] = [
  { id: "1", cohortName: "Fall 2024 - CS", students: 45, reviewers: 3, createdAt: "2024-08-15", isActive: true },
  { id: "2", cohortName: "Fall 2024 - Business", students: 38, reviewers: 2, createdAt: "2024-08-16", isActive: true },
  { id: "3", cohortName: "Spring 2025 - Engineering", students: 52, reviewers: 4, createdAt: "2024-08-20", isActive: true },
  { id: "4", cohortName: "Fall 2024 - Data Science", students: 30, reviewers: 2, createdAt: "2024-08-22", isActive: true },
  { id: "5", cohortName: "Spring 2025 - MBA", students: 25, reviewers: 2, createdAt: "2024-09-01", isActive: true },
  { id: "6", cohortName: "Fall 2024 - Marketing", students: 28, reviewers: 1, createdAt: "2024-09-05", isActive: false },
  { id: "7", cohortName: "Spring 2025 - Finance", students: 35, reviewers: 2, createdAt: "2024-09-10", isActive: true },
  { id: "8", cohortName: "Fall 2024 - Psychology", students: 22, reviewers: 1, createdAt: "2024-09-12", isActive: true },
  { id: "9", cohortName: "Spring 2025 - Design", students: 40, reviewers: 3, createdAt: "2024-09-15", isActive: true },
  { id: "10", cohortName: "Fall 2024 - Economics", students: 33, reviewers: 2, createdAt: "2024-09-18", isActive: true },
];

export default function ManageCohorts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = useState<{ key: keyof Cohort; direction: "asc" | "desc" } | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newCohortName, setNewCohortName] = useState("");

  const filteredAndSortedData = useMemo(() => {
    const filtered = mockData.filter((item) => {
      const matchesSearch = item.cohortName.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesSize = true;
      if (sizeFilter === "small") matchesSize = item.students < 30;
      else if (sizeFilter === "medium") matchesSize = item.students >= 30 && item.students < 45;
      else if (sizeFilter === "large") matchesSize = item.students >= 45;
      
      let matchesActive = true;
      if (activeFilter === "active") matchesActive = item.isActive;
      else if (activeFilter === "inactive") matchesActive = !item.isActive;
      
      return matchesSearch && matchesSize && matchesActive;
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
  }, [searchTerm, sizeFilter, activeFilter, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  const handleSort = (key: keyof Cohort) => {
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
    console.log("Creating cohort:", newCohortName);
    setNewCohortName("");
    setCreateDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Manage Cohorts" 
        description="Organize and track your student cohorts"
        actions={
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Cohort
          </Button>
        }
      />
      <main className="p-6 space-y-6 w-full">
        {/* Filters Bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cohorts..."
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
              <DropdownMenuLabel>Cohort Size</DropdownMenuLabel>
              <DropdownMenuRadioGroup 
                value={sizeFilter} 
                onValueChange={(value) => {
                  setSizeFilter(value);
                  setCurrentPage(1);
                }}
              >
                <DropdownMenuRadioItem value="all">All Sizes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="small">Small (&lt; 30)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">Medium (30-44)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="large">Large (45+)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuRadioGroup 
                value={activeFilter} 
                onValueChange={(value) => {
                  setActiveFilter(value);
                  setCurrentPage(1);
                }}
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="inactive">Inactive</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters Pills */}
        {(sizeFilter !== "all" || activeFilter !== "all") && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {sizeFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Size: {sizeFilter === "small" ? "Small (< 30)" : sizeFilter === "medium" ? "Medium (30-44)" : "Large (45+)"}
                <button
                  onClick={() => {
                    setSizeFilter("all");
                    setCurrentPage(1);
                  }}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {activeFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Status: {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
                <button
                  onClick={() => {
                    setActiveFilter("all");
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
                setSizeFilter("all");
                setActiveFilter("all");
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
            icon={GraduationCap}
            title="No cohorts found"
            description="Create your first cohort to start organizing students."
            action={{ label: "Create Cohort", onClick: () => setCreateDialogOpen(true) }}
          />
        ) : (
          <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("cohortName")}>
                    Cohort Name {sortConfig?.key === "cohortName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("students")}>
                    Students {sortConfig?.key === "students" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("reviewers")}>
                    Reviewers {sortConfig?.key === "reviewers" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
                    Created {sortConfig?.key === "createdAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <StaggerContainer key={`${currentPage}-${sizeFilter}-${activeFilter}-${searchTerm}`} as="tbody">
                {paginatedData.map((cohort) => {
                  return (
                    <StaggerItem key={cohort.id} as="tr" className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <TableCell className="font-medium">{cohort.cohortName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{cohort.students}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span>{cohort.reviewers}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(cohort.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TableCell>
                      <TableCell>
                        <Badge variant={cohort.isActive ? "success" : "secondary"}>
                          {cohort.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
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

      {/* Create Cohort Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Cohort</DialogTitle>
            <DialogDescription>
              Enter a name for your new cohort. You can add students and reviewers after creation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cohort-name">Cohort Name</Label>
              <Input
                id="cohort-name"
                placeholder="e.g., Spring 2025 - Computer Science"
                value={newCohortName}
                onChange={(e) => setNewCohortName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newCohortName}>
              Create Cohort
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
