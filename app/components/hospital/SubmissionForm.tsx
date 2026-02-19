import React, { useState, type ChangeEvent, type FormEvent, type DragEvent } from "react";
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { hospitalSubmission } from "~/lib/auth";
import type { User } from "~/types/user";
import { generateAvatarUrl } from "~/lib/avatar";

interface SubmissionFormProps {
    onSubmissionSuccess?: () => void;
    user: User;
}

export default function SubmissionForm({
    onSubmissionSuccess,
    user,
}: SubmissionFormProps): React.ReactElement {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files[0]) {
            setCsvFile(e.target.files[0]);
        }
    };

    const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            if (files[0].name.endsWith('.csv')) {
                setCsvFile(files[0]);
            } else {
                setErrorMsg("Please upload a CSV file");
            }
        }
    };

    const removeFile = (): void => {
        setCsvFile(null);
        setErrorMsg("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setScore(null);
        setErrorMsg("");
        setIsSubmitting(true);

        if (!csvFile) {
            setErrorMsg("Please upload your CSV file.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", csvFile);

        if (user.full_name) formData.append("user_name", user.full_name);
        if (user.avatar_url) {
            formData.append("user_avatar", user.avatar_url);
        } else if (user.full_name) {
            formData.append("user_avatar", generateAvatarUrl(user.full_name));
        }

        const team = user.hospital_team || user.team;
        if (team) {
            formData.append("team_name", team.team_name);
            formData.append("team_avatar", generateAvatarUrl(team.team_name));
        }

        try {
            const response = await hospitalSubmission(formData);
            if (response && response.data) {
                setScore(response.data.score ?? 0);
            } else {
                setErrorMsg("An error occurred, please refresh the page and try again");
            }
            setIsSubmitting(false);
            if (onSubmissionSuccess) {
                onSubmissionSuccess();
            }
        } catch (err: unknown) {
            const error = err as {
                response?: {
                    data?: {
                        detail?: string;
                        error?: string;
                    };
                };
                message?: string;
            };

            setErrorMsg(
                error.response?.data?.detail ||
                error.response?.data?.error ||
                error.message ||
                "An unknown error occurred"
            );
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl px-8 py-8">
            <div>
                <h2 className="text-base/7 font-semibold text-gray-900">Predictions Submission</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                    Please upload your predictions CSV file.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label htmlFor="csv-upload" className="block text-sm/6 font-medium text-gray-900">
                            Predictions CSV
                        </label>
                        <div
                            className={`mt-2 flex justify-center rounded-lg border border-dashed ${isDragging ? 'border-[#783f8e] bg-[#e2a9f1]/10' : 'border-gray-900/25'} px-6 py-10`}
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="text-center">
                                {!csvFile ? (
                                    <>
                                        <DocumentPlusIcon className="mx-auto size-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="csv-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-[#783f8e] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#783f8e] focus-within:ring-offset-2 hover:text-[#8f52a5]"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="csv-upload"
                                                    name="csv-upload"
                                                    type="file"
                                                    accept=".csv"
                                                    onChange={handleFileChange}
                                                    className="sr-only"
                                                    required
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">CSV files only</p>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span className="text-sm text-gray-600">Selected: {csvFile.name}</span>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="rounded-md bg-white p-1 text-gray-400 hover:text-gray-500"
                                        >
                                            <XMarkIcon className="size-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {errorMsg && (
                        <div className="col-span-full">
                            <p className="text-sm text-red-600">{errorMsg}</p>
                        </div>
                    )}

                    {score !== null && (
                        <div className="col-span-full rounded-lg bg-[#e2a9f1]/10 border border-[#e2a9f1]/30 p-4">
                            <p className="text-sm font-medium text-[#783f8e]">
                                Submission successful! Your score: <span className="text-lg font-bold">{score}</span>
                            </p>
                        </div>
                    )}

                    <div className="col-span-full">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#783f8e] hover:bg-[#8f52a5]"} focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#783f8e]`}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Predictions"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
