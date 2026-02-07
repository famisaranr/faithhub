import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock Data
const rsvps = [
    { id: "1", name: "Juan Dela Cruz", email: "juan@example.com", status: "GOING", guests: 4, event: "Centennial Celebration" },
    { id: "2", name: "Maria Santos", email: "maria@example.com", status: "MAYBE", guests: 1, event: "Centennial Celebration" },
    { id: "3", name: "Pedro Penduko", email: "pedro@example.com", status: "NOT_GOING", guests: 0, event: "Centennial Celebration" },
];

export default function RsvpsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">RSVPs</h2>
                    <p className="text-muted-foreground">Manage guest list and registrations.</p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Search className="h-4 w-4 text-gray-500" />
                <Input placeholder="Search guests..." />
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Group Size</TableHead>
                            <TableHead>Event</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rsvps.map((rsvp) => (
                            <TableRow key={rsvp.id}>
                                <TableCell className="font-medium">{rsvp.name}</TableCell>
                                <TableCell>{rsvp.email}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${rsvp.status === "GOING" ? "bg-green-100 text-green-700" :
                                            rsvp.status === "MAYBE" ? "bg-yellow-100 text-yellow-700" :
                                                "bg-red-100 text-red-700"
                                        }`}>
                                        {rsvp.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">{rsvp.guests}</TableCell>
                                <TableCell>{rsvp.event}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
