import { useState, useRef } from 'react';
import { Upload, X, AlertTriangle, CheckCircle, FileText, Loader2 } from 'lucide-react'; // Assuming icons exist
import { GlassPanel } from "../components/Shared";
import { ingestServicePlans } from '@/app/actions/officer';

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const ImportModal = ({ isOpen, onClose, onSuccess }: ImportModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any[]>([]);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [stage, setStage] = useState<'upload' | 'preview' | 'ingesting' | 'complete'>('upload');
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            parseCsv(selectedFile);
        }
    };

    const parseCsv = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n').filter(line => line.trim() !== '');
            const headers = lines[0].split(',').map(h => h.trim());

            const data = lines.slice(1).map(line => {
                const values = line.split(',');
                // Simple CSV parsing (doesn't handle commas in quotes)
                const row: any = {};
                headers.forEach((header, index) => {
                    row[header] = values[index]?.trim();
                });
                return row;
            });

            setPreview(data.slice(0, 5)); // Show first 5
            setStage('preview');
        };
        reader.readAsText(file);
    };

    const handleIngest = async () => {
        if (!file) return;
        setStage('ingesting');

        // Re-read full file to send
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n').filter(line => line.trim() !== '');
            const headers = lines[0].split(',').map(h => h.trim());

            const rows = lines.slice(1).map(line => {
                const values = line.split(',');
                const row: any = {};
                headers.forEach((header, index) => {
                    row[header] = values[index]?.trim();
                });
                return row;
            });

            try {
                // Pass parsed rows to server action
                const result = await ingestServicePlans(rows, file.name, false);

                if (result.success) {
                    setStage('complete');
                    setWarnings(result.warnings || []);
                } else {
                    setWarnings([result.message, ...(result.warnings || [])]);
                    setStage('preview'); // Go back to preview on failure?
                }
            } catch (err) {
                console.error(err);
                setWarnings(["An unexpected error occurred."]);
                setStage('preview');
            }
        };
        reader.readAsText(file);
    };

    const downloadTemplate = () => {
        const headers = "service_date,service_type,segment_order,segment_name,leader,hymn_number,notes";
        const example = "2026-02-07,Sabbath,1,Opening Prayer,John Doe,,";
        const content = `${headers}\n${example}`;
        const blob = new Blob([content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "programming_template.csv";
        a.click();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <GlassPanel className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col p-0">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Upload className="w-5 h-5 text-amber-500" />
                        Import Schedule
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {stage === 'upload' && (
                        <div className="space-y-4">
                            <div
                                className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center hover:bg-white/5 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="w-10 h-10 text-slate-500 mx-auto mb-4" />
                                <p className="text-lg text-slate-300 font-medium">Click to upload CSV</p>
                                <p className="text-sm text-slate-500 mt-2">or drag and drop here</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="text-center">
                                <button onClick={downloadTemplate} className="text-amber-500 text-sm hover:underline">
                                    Download Template
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 'preview' && (
                        <div className="space-y-4 animate-in fade-in">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">File: <span className="text-white">{file?.name}</span></span>
                                <button onClick={() => setStage('upload')} className="text-xs text-amber-500 hover:underline">Change File</button>
                            </div>

                            <div className="border border-white/10 rounded-lg overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-slate-400 font-medium">
                                        <tr>
                                            <th className="p-3">Date</th>
                                            <th className="p-3">Type</th>
                                            <th className="p-3">Segment</th>
                                            <th className="p-3">Leader</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {preview.map((row, i) => (
                                            <tr key={i} className="hover:bg-white/5 text-slate-300">
                                                <td className="p-3">{row.service_date}</td>
                                                <td className="p-3">{row.service_type}</td>
                                                <td className="p-3">{row.segment_name}</td>
                                                <td className="p-3">{row.leader}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-2 text-center text-xs text-slate-500 bg-white/5">
                                    Showing first 5 rows
                                </div>
                            </div>

                            {warnings.length > 0 && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-200">
                                    <div className="flex items-center gap-2 font-bold mb-1">
                                        <AlertTriangle className="w-4 h-4" /> Import Issues
                                    </div>
                                    <ul className="list-disc list-inside opacity-80">
                                        {warnings.map((w, i) => <li key={i}>{w}</li>)}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button onClick={onClose} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-white/10">Cancel</button>
                                <button
                                    onClick={handleIngest}
                                    className="px-6 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                                >
                                    Confirm Import
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 'ingesting' && (
                        <div className="py-12 text-center space-y-4">
                            <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
                            <p className="text-slate-300">Processing schedule...</p>
                        </div>
                    )}

                    {stage === 'complete' && (
                        <div className="py-8 text-center space-y-6 animate-in zoom-in-95">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Import Successful</h3>
                                <p className="text-slate-400">The schedule has been updated.</p>
                            </div>
                            {warnings.length > 0 && (
                                <div className="max-w-md mx-auto text-left bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-sm text-amber-200">
                                    <p className="font-bold mb-2">Warnings:</p>
                                    <ul className="list-disc list-inside">
                                        {warnings.map((w, i) => <li key={i}>{w}</li>)}
                                    </ul>
                                </div>
                            )}
                            <button
                                onClick={() => { onSuccess(); onClose(); }}
                                className="px-8 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </GlassPanel>
        </div>
    );
};
