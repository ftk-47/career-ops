"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, ChevronLeft, ChevronRight, UserPlus, Users, Mail, Shield, Trash2 } from "lucide-react";

type TeamRole = "Reviewer" | "Admin" | "Super Admin";
type TeamStatus = "Active" | "Invited";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: TeamStatus;
  lastActive: string;
}

const mockData: TeamMember[] = [
  { id: "1", name: "Dr. Sarah Chen", email: "sarah.chen@university.edu", role: "Admin", status: "Active", lastActive: "2024-11-20" },
  { id: "2", name: "Prof. Michael Lee", email: "michael.lee@university.edu", role: "Reviewer", status: "Active", lastActive: "2024-11-19" },
  { id: "3", name: "Ms. Emily Davis", email: "emily.davis@university.edu", role: "Reviewer", status: "Active", lastActive: "2024-11-20" },
  { id: "4", name: "Dr. James Wilson", email: "james.wilson@university.edu", role: "Super Admin", status: "Active", lastActive: "2024-11-20" },
  { id: "5", name: "Jennifer Martinez", email: "jennifer.m@university.edu", role: "Reviewer", status: "Invited", lastActive: "-" },
  { id: "6", name: "Robert Taylor", email: "robert.t@university.edu", role: "Admin", status: "Active", lastActive: "2024-11-18" },
  { id: "7", name: "Lisa Anderson", email: "lisa.a@university.edu", role: "Reviewer", status: "Active", lastActive: "2024-11-19" },
  { id: "8", name: "David Thompson", email: "david.t@university.edu", role: "Reviewer", status: "Invited", lastActive: "-" },
];

const roleVariants: Record<TeamRole, "default" | "secondary" | "destructive"> = {
  Reviewer: "secondary",
  Admin: "default",
  "Super Admin": "destructive",
};

const statusVariants: Record<TeamStatus, "success" | "warning"> = {
  Active: "success",
  Invited: "warning",
};

export default function ManageTeam() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<TeamRole | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = useState<{ key: keyof TeamMember; direction: "asc" | "desc" } | null>(null);
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  
  // Invite form state
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamRole>("Reviewer");

  const roles: TeamRole[] = ["Reviewer", "Admin", "Super Admin"];

  const filteredAndSortedData = useMemo(() => {
    const filtered = mockData.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || item.role === roleFilter;
      return matchesSearch && matchesRole;
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
  }, [searchTerm, roleFilter, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  const handleSort = (key: keyof TeamMember) => {
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

  const handleInvite = () => {
    console.log("Inviting:", { inviteName, inviteEmail, inviteRole });
    // Reset form
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Reviewer");
    setInviteSheetOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Manage Team" 
        description="Invite and manage your team of reviewers and administrators"
        actions={
          <Button onClick={() => setInviteSheetOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        }
      />
      <main className="flex-1 p-6 space-y-6 w-full">
        {/* Filters Bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={roleFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => { setRoleFilter("all"); setCurrentPage(1); }}
            >
              All Roles
            </Button>
            {roles.map((role) => (
              <Button
                key={role}
                variant={roleFilter === role ? "default" : "outline"}
                size="sm"
                onClick={() => { setRoleFilter(role); setCurrentPage(1); }}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        {filteredAndSortedData.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No team members found"
            description="Try adjusting your search or invite your first team member."
            action={{ label: "Invite Member", onClick: () => setInviteSheetOpen(true) }}
          />
        ) : (
          <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    Member {sortConfig?.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                    Email {sortConfig?.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>
                    Role {sortConfig?.key === "role" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    Status {sortConfig?.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("lastActive")}>
                    Last Active {sortConfig?.key === "lastActive" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <StaggerContainer as="tbody">
                {paginatedData.map((member) => (
                  <StaggerItem key={member.id} as="tr" className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{member.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <Badge variant={roleVariants[member.role]}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[member.status]}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {member.lastActive === "-" ? "-" : new Date(member.lastActive).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
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
                            <Shield className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Resend Invitation
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </StaggerItem>
                ))}
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

      {/* Invite Member Sheet */}
      <Sheet open={inviteSheetOpen} onOpenChange={setInviteSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Invite Team Member</SheetTitle>
            <SheetDescription>
              Send an invitation to a new team member. They&apos;ll receive an email with instructions to join.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as TeamRole)}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {inviteRole === "Reviewer" && "Can review submissions and provide feedback"}
                {inviteRole === "Admin" && "Can manage team members and cohorts"}
                {inviteRole === "Super Admin" && "Full access to all features"}
              </p>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setInviteSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite} disabled={!inviteName || !inviteEmail}>
              <Mail className="mr-2 h-4 w-4" />
              Send Invite
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
