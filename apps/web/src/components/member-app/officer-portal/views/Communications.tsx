import { useState, useEffect } from 'react';
import { GlassPanel } from "../components/Shared";
import { Loader2, Plus, Trash2, Calendar, FileText, Upload } from 'lucide-react';
import { toast } from "sonner";
import { getBulletins, createBulletin, deleteBulletin, getEvents, createEvent, deleteEvent } from "@/app/actions/officer";

// Types matching DB/Actions
interface Bulletin {
    id: string;
    title: string;
    date: Date;
    fileUrl: string;
}

interface Event {
    id: string;
    title: string;
    startDate: Date;
    location?: string | null;
    description?: string | null;
    status: string;
}

export const Communications = () => {
    const [activeTab, setActiveTab] = useState<'bulletins' | 'events'>('bulletins');
    const [loading, setLoading] = useState(true);
    const [bulletins, setBulletins] = useState<Bulletin[]>([]);
    const [events, setEvents] = useState<Event[]>([]);

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [newBulletin, setNewBulletin] = useState({ title: '', date: new Date().toISOString().split('T')[0], fileUrl: '' });
    const [newEvent, setNewEvent] = useState({
        title: '',
        startDate: new Date().toISOString().slice(0, 16),
        location: '',
        description: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [bData, eData] = await Promise.all([getBulletins(), getEvents()]);
            setBulletins(bData);
            setEvents(eData);
        } catch (error) {
            toast.error("Failed to load communications data");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBulletin = async () => {
        if (!newBulletin.title || !newBulletin.fileUrl) return toast.error("Title and File URL are required");

        try {
            const res = await createBulletin({
                title: newBulletin.title,
                date: new Date(newBulletin.date),
                fileUrl: newBulletin.fileUrl
            });
            if (res.success) {
                toast.success("Bulletin created");
                setIsCreating(false);
                setNewBulletin({ title: '', date: new Date().toISOString().split('T')[0], fileUrl: '' });
                loadData();
            } else {
                toast.error(res.message);
            }
        } catch (e) {
            toast.error("Error creating bulletin");
        }
    };

    const handleDeleteBulletin = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const res = await deleteBulletin(id);
        if (res.success) {
            toast.success("Bulletin deleted");
            loadData();
        } else {
            toast.error(res.message);
        }
    };

    const handleCreateEvent = async () => {
        if (!newEvent.title || !newEvent.startDate) return toast.error("Title and Date are required");

        try {
            const res = await createEvent({
                title: newEvent.title,
                startDate: new Date(newEvent.startDate),
                location: newEvent.location,
                description: newEvent.description,
                slug: newEvent.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now().toString().slice(-4)
            });
            if (res.success) {
                toast.success("Event created");
                setIsCreating(false);
                setNewEvent({
                    title: '',
                    startDate: new Date().toISOString().slice(0, 16),
                    location: '',
                    description: ''
                });
                loadData();
            } else {
                toast.error(res.message);
            }
        } catch (e) {
            toast.error("Error creating event");
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const res = await deleteEvent(id);
        if (res.success) {
            toast.success("Event deleted");
            loadData();
        } else {
            toast.error(res.message);
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-amber-500" /></div>;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-serif text-white tracking-tight">Communications</h2>
                    <p className="text-slate-400">Manage church bulletins and events</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New {activeTab === 'bulletins' ? 'Bulletin' : 'Event'}
                </button>
            </header>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 mb-6">
                <button
                    onClick={() => { setActiveTab('bulletins'); setIsCreating(false); }}
                    className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'bulletins'
                        ? 'border-amber-500 text-white'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                >
                    Weekly Bulletins
                </button>
                <button
                    onClick={() => { setActiveTab('events'); setIsCreating(false); }}
                    className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'events'
                        ? 'border-amber-500 text-white'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                >
                    Upcoming Events
                </button>
            </div>

            {/* Creation Form */}
            {isCreating && (
                <GlassPanel className="p-6 mb-8 border-amber-500/20 bg-amber-900/10">
                    <h3 className="text-lg font-medium text-white mb-4">Create New {activeTab === 'bulletins' ? 'Bulletin' : 'Event'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeTab === 'bulletins' ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Bulletin Title"
                                    className="bg-black/40 border border-white/10 rounded-lg p-3 text-white"
                                    value={newBulletin.title}
                                    onChange={e => setNewBulletin({ ...newBulletin, title: e.target.value })}
                                />
                                <input
                                    type="date"
                                    className="bg-black/40 border border-white/10 rounded-lg p-3 text-white"
                                    value={newBulletin.date}
                                    onChange={e => setNewBulletin({ ...newBulletin, date: e.target.value })}
                                />
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="File URL (PDF or Image Link)"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white"
                                        value={newBulletin.fileUrl}
                                        onChange={e => setNewBulletin({ ...newBulletin, fileUrl: e.target.value })}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">For demo purposes, paste a public URL.</p>
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                                    <button onClick={() => setIsCreating(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg text-slate-300">Cancel</button>
                                    <button onClick={handleCreateBulletin} className="px-6 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400">Create Bulletin</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="Event Title"
                                    className="bg-black/40 border border-white/10 rounded-lg p-3 text-white"
                                    value={newEvent.title}
                                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                                <input
                                    type="datetime-local"
                                    className="bg-black/40 border border-white/10 rounded-lg p-3 text-white"
                                    value={newEvent.startDate}
                                    onChange={e => setNewEvent({ ...newEvent, startDate: e.target.value })}
                                />
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Location (Optional)"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white mb-4"
                                        value={newEvent.location}
                                        onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Description (Optional)"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white h-24"
                                        value={newEvent.description}
                                        onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                                    <button onClick={() => setIsCreating(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg text-slate-300">Cancel</button>
                                    <button onClick={handleCreateEvent} className="px-6 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400">Create Event</button>
                                </div>
                            </>
                        )}
                    </div>
                </GlassPanel>
            )}

            {/* List */}
            <div className="grid gap-4">
                {activeTab === 'bulletins' ? (
                    bulletins.length === 0 ? (
                        <div className="text-center p-12 text-slate-500 bg-white/5 rounded-xl border border-white/5">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No bulletins found.</p>
                        </div>
                    ) : (
                        bulletins.map(bulletin => (
                            <GlassPanel key={bulletin.id} className="p-4 flex items-center justify-between group hover:border-amber-500/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{bulletin.title}</h4>
                                        <p className="text-sm text-slate-400">{new Date(bulletin.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <a href={bulletin.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline">View File</a>
                                    <button onClick={() => handleDeleteBulletin(bulletin.id)} className="p-2 hover:bg-red-500/20 text-slate-500 hover:text-red-400 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </GlassPanel>
                        ))
                    )
                ) : (
                    events.length === 0 ? (
                        <div className="text-center p-12 text-slate-500 bg-white/5 rounded-xl border border-white/5">
                            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No upcoming events.</p>
                        </div>
                    ) : (
                        events.map(event => (
                            <GlassPanel key={event.id} className="p-4 flex items-center justify-between group hover:border-amber-500/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{event.title}</h4>
                                        <p className="text-sm text-slate-400">
                                            {new Date(event.startDate).toLocaleDateString()} at {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        {event.location && <p className="text-xs text-slate-500">{event.location}</p>}
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteEvent(event.id)} className="p-2 hover:bg-red-500/20 text-slate-500 hover:text-red-400 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </GlassPanel>
                        ))
                    )
                )}
            </div>
        </div>
    );
};
