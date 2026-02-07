// import { SignedIn, UserButton } from "@clerk/nextjs";
import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
                    <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                    {/* Mock User Button for Demo */}
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        A
                    </div>
                    {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
