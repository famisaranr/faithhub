export default function DashboardPage() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900">Total RSVPs</h3>
                <p className="text-3xl font-bold text-primary mt-2">1,248</p>
                <p className="text-sm text-gray-500 mt-1">+12% from last week</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900">Active Events</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">3</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
            </div>
        </div>
    );
}
