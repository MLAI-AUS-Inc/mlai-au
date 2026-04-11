import React, { useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { DocumentPlusIcon, FilmIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { submitInnovateConnectAllianceVideo } from "~/lib/innovate-connect-alliance";

interface VideoSubmissionFormProps {
    onSubmissionSuccess?: () => void;
}

export default function VideoSubmissionForm({
    onSubmissionSuccess,
}: VideoSubmissionFormProps): React.ReactElement {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setVideoFile(event.target.files[0]);
            setErrorMsg("");
        }
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("video/")) {
            setErrorMsg("Please upload a video file.");
            return;
        }

        setVideoFile(file);
        setErrorMsg("");
    };

    const removeFile = () => {
        setVideoFile(null);
        setSuccessMsg("");
        setErrorMsg("");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!title.trim()) {
            setErrorMsg("Please enter a submission title.");
            return;
        }

        if (!videoFile) {
            setErrorMsg("Please upload a video file.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title.trim());
        if (notes.trim()) formData.append("notes", notes.trim());
        formData.append("video", videoFile);

        try {
            setIsSubmitting(true);
            const response = await submitInnovateConnectAllianceVideo(formData);
            setSuccessMsg(`Uploaded "${response.data.title}" successfully.`);
            setTitle("");
            setNotes("");
            setVideoFile(null);
            onSubmissionSuccess?.();
        } catch (error: any) {
            setErrorMsg(
                error.response?.data?.detail ||
                    error.response?.data?.error ||
                    error.message ||
                    "Upload failed."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6 shadow-[0_0_24px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-3">
                <FilmIcon className="h-6 w-6 text-[#8ef4d4]" />
                <div>
                    <h2 className="text-lg font-semibold text-white">Video Submission</h2>
                    <p className="text-sm text-white/50">
                        Upload the latest version of your team pitch or demo walkthrough.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                    <label htmlFor="submission-title" className="block text-sm font-medium text-white">
                        Submission Title
                    </label>
                    <input
                        id="submission-title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#8ef4d4] focus:outline-none"
                        placeholder="e.g. ICA Final Pitch v2"
                    />
                </div>

                <div>
                    <label htmlFor="submission-notes" className="block text-sm font-medium text-white">
                        Notes
                    </label>
                    <textarea
                        id="submission-notes"
                        rows={4}
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#8ef4d4] focus:outline-none"
                        placeholder="Add reviewer notes, setup info, or supporting links."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white">Video File</label>
                    <div
                        className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 ${
                            isDragging ? "border-[#8ef4d4] bg-[#8ef4d4]/10" : "border-white/20 bg-white/[0.02]"
                        }`}
                        onDragEnter={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={(event) => {
                            event.preventDefault();
                            setIsDragging(false);
                        }}
                        onDragOver={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                        }}
                        onDrop={handleDrop}
                    >
                        {!videoFile ? (
                            <div className="text-center">
                                <DocumentPlusIcon className="mx-auto h-12 w-12 text-white/30" />
                                <div className="mt-4 flex items-center justify-center gap-1 text-sm text-white/50">
                                    <label
                                        htmlFor="video-upload"
                                        className="cursor-pointer font-semibold text-[#8ef4d4] hover:text-[#8ef4d4]/80"
                                    >
                                        Upload a video
                                    </label>
                                    <span>or drag and drop</span>
                                </div>
                                <input
                                    id="video-upload"
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                    className="sr-only"
                                />
                                <p className="mt-2 text-xs text-white/35">
                                    MP4, MOV, or other standard video formats up to 250 MB
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-[#8ef4d4]/10 p-2">
                                    <FilmIcon className="h-5 w-5 text-[#8ef4d4]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{videoFile.name}</p>
                                    <p className="text-xs text-white/40">
                                        {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="ml-auto rounded-full p-1 text-white/40 hover:bg-white/5 hover:text-white/70"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {errorMsg && <p className="text-sm text-red-300">{errorMsg}</p>}
                {successMsg && <p className="text-sm text-[#8ef4d4]">{successMsg}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[#8ef4d4] px-4 py-2.5 text-sm font-semibold text-[#110822] transition hover:bg-[#75e1c0] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Uploading..." : "Upload Submission"}
                </button>
            </form>
        </div>
    );
}
