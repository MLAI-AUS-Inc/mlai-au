import { Form, Link, useActionData, useNavigate, useNavigation, useLoaderData, redirect } from "react-router";
import { useState, useCallback } from "react";
import type { Route } from "./+types/valley.create-update";
import { requireFounder } from "~/lib/valley-session";
import {
    XMarkIcon,
    EyeIcon,
    SparklesIcon,
    CloudArrowUpIcon,
    ChevronDownIcon,
    LightBulbIcon,
    QuestionMarkCircleIcon,
    ExclamationCircleIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";
import { useDropzone } from 'react-dropzone';
import { clsx } from "clsx";

export async function loader({ request }: Route.LoaderArgs) {
    const user = requireFounder(request);

    // Check for edit mode
    const url = new URL(request.url);
    const editId = url.searchParams.get("edit");

    let existingData = null;
    if (editId) {
        // Mock existing data (matching the Test update on dashboard)
        existingData = {
            projectIntro: "Valley - Connect founders with investors through monthly updates.",
            month: "January",
            year: 2026,
            revenue: "127500",
            growth: "18",
            activeUsers: "3420",
            highlights: "Closed 3 new enterprise deals with Fortune 500 companies totaling $75K ARR. Launched new dashboard feature which increased user engagement by 32%. Featured in TechCrunch - drove 1,200+ signups. Team grew to 8 people with new Head of Sales joining.",
            challenges: "Customer onboarding time is averaging 14 days vs target of 7 days. Need to streamline our implementation process. CAC increased to $850 this month due to increased competition in paid channels.",
            asks: "Looking for introductions to VP of Customer Success at B2B SaaS companies to help optimize our onboarding process. Would appreciate feedback on our pricing strategy as we move upmarket."
        };
    }

    return { user, existingData, isEdit: !!editId };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const updates = Object.fromEntries(formData);

    if (intent === "review") {
        // Mock AI analysis
        return {
            step: "feedback",
            data: updates,
            feedback: {
                grade: "A+",
                strengths: [
                    "Detailed highlights show clear progress",
                    "Includes quantifiable metrics and data",
                    "Transparent about challenges facing the business"
                ],
                improvements: [
                    "Consider adding comparison to previous month",
                    "Include customer testimonials or feedback"
                ],
                proTip: "Investors appreciate transparency. Don't hide challenges - instead, show how you're actively addressing them. Specific asks get better responses than vague requests."
            }
        };
    }

    if (intent === "publish") {
        console.log("Publishing update:", updates);
        // Mock success with a persistence cookie for the dashboard
        return redirect("/valley", {
            headers: {
                "Set-Cookie": "valley_submitted=true; Path=/; Max-Age=3600; SameSite=Lax"
            }
        });
    }

    return null;
}

// Collapsible Helper Component
interface SectionWithExampleProps {
    label: string;
    name: string;
    placeholder: string;
    rows?: number;
    icon: any;
    defaultValue?: string;
}

function SectionWithExample({
    label,
    name,
    placeholder,
    rows = 4,
    icon: Icon,
    defaultValue
}: SectionWithExampleProps) {
    const [showExample, setShowExample] = useState(false);

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            </div>
            <textarea
                name={name}
                rows={rows}
                defaultValue={defaultValue}
                className="block w-full px-4 py-3 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 border resize-none mb-2"
                placeholder={placeholder}
            />
            <button
                type="button"
                onClick={() => setShowExample(!showExample)}
                className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700"
            >
                <LightBulbIcon className="w-4 h-4" />
                {showExample ? "Hide Examples" : "Show Examples"}
                <ChevronDownIcon className={clsx("w-3 h-3 transition-transform", showExample && "rotate-180")} />
            </button>

            {showExample && (
                <div className="mt-2 p-3 bg-blue-50 text-sm text-blue-800 rounded-md border border-blue-100">
                    <strong>Example:</strong> "We grew revenue by 20% MoM thanks to the new enterprise tier launch..."
                </div>
            )}
        </div>
    );
}

export default function CreateUpdate() {
    const { existingData, isEdit } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    // Maintain form state if coming back from feedback? 
    // If we have actionData.data (from a "Revise" intent), prefer that over existingData 
    const defaultData = actionData?.step === "feedback" ? (actionData.data as any) : (existingData || {});

    // Dropzone setup
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: 20 * 1024 * 1024, // 20MB
        accept: {
            'image/*': [],
            'application/pdf': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
            'application/vnd.ms-excel': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
            'video/quicktime': ['.mov'],
            'video/mp4': [],
            'audio/*': []
        }
    });

    // 1. Success View
    if (actionData?.step === "success") {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 text-center">
                <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                    <SparklesIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Published! 🎉</h2>
                    <Link
                        to="/valley"
                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors mt-4"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    // 2. Feedback View
    if (actionData?.step === "feedback") {
        const { feedback, data } = actionData;
        return (
            <div className="max-w-3xl mx-auto pb-12">
                {/* Header */}
                <div className="flex items-center justify-between py-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Update Feedback</h1>
                    <button onClick={() => window.history.back()} className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Grade Section */}
                    <div className="p-8 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">AI Feedback & Rating</h2>
                        <p className="text-gray-500 text-sm mb-6">See how your monthly update scores</p>

                        <div className="bg-green-50 rounded-xl p-8 text-center border border-green-100">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Overall Grade</p>
                            <div className="text-8xl font-bold text-green-600 mb-2">{feedback?.grade}</div>
                            <div className="text-xl font-bold text-gray-700 uppercase tracking-wide">Excellent</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Strengths */}
                        <div className="p-8 border-r border-gray-200 bg-green-50/30">
                            <div className="flex items-center gap-2 mb-4 text-green-700 font-bold">
                                <CheckCircleIcon className="w-6 h-6" />
                                <h3>Strengths</h3>
                            </div>
                            <ul className="space-y-4">
                                {feedback?.strengths.map((str: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-green-800 text-sm">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                                        {str}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Improvements */}
                        <div className="p-8 bg-orange-50/30">
                            <div className="flex items-center gap-2 mb-4 text-orange-800 font-bold">
                                <ExclamationTriangleIcon className="w-6 h-6" />
                                <h3>Areas to Improve</h3>
                            </div>
                            <ul className="space-y-4">
                                {feedback?.improvements.map((imp: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-orange-900 text-sm">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                                        {imp}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-6 bg-blue-50 border-t border-blue-100">
                        <div className="flex items-start gap-3">
                            <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-blue-500 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-blue-900 flex items-center gap-2">
                                    <LightBulbIcon className="w-4 h-4 text-yellow-500" />
                                    Pro Tip
                                </h3>
                                <p className="text-blue-800 text-sm mt-1 leading-relaxed">
                                    {feedback?.proTip}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-4 mt-8">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="flex-1 px-6 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
                    >
                        ← Revise Update
                    </button>

                    {/* Publish Form */}
                    <Form method="POST" className="flex-1">
                        <input type="hidden" name="intent" value="publish" />
                        {Object.entries(data || {}).map(([key, value]) => (
                            <input key={key} type="hidden" name={key} value={value as any} />
                        ))}
                        <button
                            type="submit"
                            className="w-full px-6 py-3.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm font-semibold transition-colors"
                        >
                            Publish Update
                        </button>
                    </Form>
                </div>
            </div>
        );
    }

    // 3. Create/Edit Form View
    return (
        <div className="max-w-3xl mx-auto pb-12">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 py-4 border-b border-gray-100 mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                    {isEdit ? "Edit Monthly Update" : "Create Monthly Update"}
                </h1>
                <div className="flex items-center gap-3">
                    <button type="button" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        <EyeIcon className="w-4 h-4" />
                        Preview
                    </button>
                    <Link to="/valley" className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="w-6 h-6" />
                    </Link>
                </div>
            </div>

            <Form method="POST" className="space-y-6">
                <input type="hidden" name="intent" value="review" />

                {/* AI Gmail Banner */}
                <div className="bg-gradient-to-r from-purple-50 to-white p-1 rounded-xl shadow-sm border border-purple-100">
                    <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                                <SparklesIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Save Time with AI</h3>
                                <p className="text-sm text-gray-500">Let AI analyze your Gmail and draft this month's update for you</p>
                            </div>
                        </div>
                        <button type="button" className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2">
                            Draft from Gmail
                        </button>
                    </div>
                </div>

                {/* Project Intro Section */}
                <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-blue-600 rounded-full text-white mt-1">
                            <SparklesIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Welcome! Let's introduce your project</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Before your first monthly update, tell investors about your project so they understand your context.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Project Introduction</label>
                        <textarea
                            name="projectIntro"
                            rows={4}
                            defaultValue={defaultData?.projectIntro}
                            className="block w-full px-4 py-3 text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 border resize-none bg-white"
                            placeholder="Tell investors what your startup does, what problem you're solving, who your target market is..."
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <LightBulbIcon className="w-3 h-3" />
                            Tip: Include your mission, target market, and what makes you different. This will be saved with your first update.
                        </p>
                    </div>
                </div>

                {/* Month/Year Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                        <select
                            name="month"
                            defaultValue={defaultData?.month || "January"}
                            className="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md border bg-white"
                        >
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                            type="number"
                            name="year"
                            defaultValue={defaultData?.year || 2026}
                            className="block w-full px-3 py-2.5 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 border"
                        />
                    </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <span className="text-gray-400">$</span> Revenue
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="text"
                                name="revenue"
                                defaultValue={defaultData?.revenue}
                                placeholder="50,000"
                                className="block w-full pl-7 pr-3 py-2.5 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 border"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <ChartBarIcon className="w-4 h-4 text-gray-400" /> Growth
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="growth"
                                defaultValue={defaultData?.growth}
                                placeholder="25%"
                                className="block w-full px-3 py-2.5 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 border"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <UserGroupIcon className="w-4 h-4 text-gray-400" /> Active Users
                        </label>
                        <input
                            type="text"
                            name="activeUsers"
                            defaultValue={defaultData?.activeUsers}
                            placeholder="1,500"
                            className="block w-full px-3 py-2.5 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 border"
                        />
                    </div>
                </div>

                {/* Qualitative Sections */}
                <div className="space-y-6">
                    <SectionWithExample
                        label="Key Highlights"
                        name="highlights"
                        defaultValue={defaultData?.highlights}
                        placeholder="What went well this month? Major wins, product launches, partnerships..."
                        icon={SparklesIcon}
                    />

                    <SectionWithExample
                        label="Challenges"
                        name="challenges"
                        defaultValue={defaultData?.challenges}
                        placeholder="What obstacles are you facing? Where do you need help?"
                        icon={ExclamationCircleIcon}
                    />

                    <SectionWithExample
                        label="Ask from Investors"
                        name="asks"
                        defaultValue={defaultData?.asks}
                        placeholder="How can your investors help? Introductions, advice, specific expertise..."
                        icon={QuestionMarkCircleIcon}
                    />
                </div>

                {/* File Upload */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-gray-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></div>
                        <label className="block text-sm font-medium text-gray-700">Attachments (Optional)</label>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                        PDF, Docs, Excel, MOV, MP3 (Max 20MB per file)
                    </p>

                    <div
                        {...getRootProps()}
                        className={clsx(
                            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
                            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-gray-50"
                        )}
                    >
                        <input {...getInputProps()} />
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex-items-center justify-center mx-auto mb-3">
                            <CloudArrowUpIcon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                            Drop files here or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Max 20MB per file
                        </p>
                        <button type="button" className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                            Select Files
                        </button>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate("/valley")}
                        className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
                    >
                        {isSubmitting ? "Analysis..." : "Review & Rate Update"}
                    </button>
                </div>

            </Form>
        </div>
    );
}

// Missing Helper Icon Component 
function UserGroupIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" />
        </svg>
    )
}
