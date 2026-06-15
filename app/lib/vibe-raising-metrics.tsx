import React from "react";
import {
    ArrowPathIcon,
    ArrowRightIcon,
    BanknotesIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    FireIcon,
    LightBulbIcon,
    SparklesIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

// Single source of truth for the vibe-raising metric catalog. Keys mirror
// the backend catalog in mlai-backend startup_updates/metric_catalog.py.
export interface MetricOption {
    key: string;
    label: string;
    placeholder: string;
    prefix?: string;
    icon: React.ReactNode;
    info?: string;
}

export const VIBE_METRIC_OPTIONS: MetricOption[] = [
    { key: "revenue", label: "Revenue (AUD)", placeholder: "50,000", prefix: "$", icon: <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />, info: "Your total income this month." },
    { key: "activeUsers", label: "Active Users", placeholder: "1,500", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "Unique users who engaged with your product this month." },
    { key: "mrr", label: "MRR (AUD)", placeholder: "10,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Monthly recurring revenue from active subscriptions." },
    { key: "burnRate", label: "Burn Rate (AUD)", placeholder: "20,000", prefix: "$", icon: <FireIcon className="w-4 h-4 text-gray-400" />, info: "How much capital the company is spending per month." },
    { key: "runway", label: "Runway", placeholder: "18 months", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Estimated time before the company needs more funding." },
    { key: "monthlyCosts", label: "Costs (AUD)", placeholder: "25,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Total monthly costs from Xero Profit and Loss expense rows." },
    { key: "invoiceRevenue", label: "Invoice Revenue", placeholder: "45,000", prefix: "$", icon: <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />, info: "Sales invoice revenue from accounting data." },
    { key: "cashCollected", label: "Cash Collected", placeholder: "42,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Cash received from accounting payments." },
    { key: "revenueGrowthRate", label: "Revenue Growth", placeholder: "12%", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Month-on-month revenue or MRR growth when source data supports it." },
    { key: "customerCount", label: "Customers", placeholder: "24", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "Number of active or paying customers when source data supports it." },
    { key: "churn", label: "Churn", placeholder: "2%", icon: <ArrowPathIcon className="w-4 h-4 text-gray-400" />, info: "Customer or revenue churn when source data supports it." },
    { key: "invoiceCount", label: "Invoices", placeholder: "12", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Sales invoice count or invoices sent this month." },
    { key: "recurringInvoiceCount", label: "Recurring Invoices", placeholder: "6", icon: <ArrowPathIcon className="w-4 h-4 text-gray-400" />, info: "Active recurring invoice count from accounting data." },
    { key: "websiteVisitors", label: "Website Visitors", placeholder: "1,200", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Visitors to the company website this month." },
    { key: "waitlistSignups", label: "Waitlist Signups", placeholder: "85", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "People who joined the waitlist this month." },
    { key: "demoRequests", label: "Demo Requests", placeholder: "14", icon: <ArrowRightIcon className="w-4 h-4 text-gray-400" />, info: "Inbound requests to see or try the product." },
    { key: "customerInterviews", label: "Customer Interviews", placeholder: "10", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "Potential or current customers interviewed this month." },
    { key: "experimentsRun", label: "Experiments Run", placeholder: "4", icon: <LightBulbIcon className="w-4 h-4 text-gray-400" />, info: "Validation, growth, product, or pricing experiments completed." },
    { key: "pilotCount", label: "Pilots", placeholder: "3", icon: <SparklesIcon className="w-4 h-4 text-gray-400" />, info: "Active pilots, design partners, or trials." },
    { key: "qualifiedPipeline", label: "Qualified Pipeline", placeholder: "250,000", prefix: "$", icon: <BanknotesIcon className="w-4 h-4 text-gray-400" />, info: "Qualified sales pipeline with customer intent." },
    { key: "eventsRun", label: "Events Run", placeholder: "8", icon: <CalendarDaysIcon className="w-4 h-4 text-gray-400" />, info: "Events you ran through Luma this month." },
    { key: "eventRegistrations", label: "Event Registrations", placeholder: "350", icon: <UsersIcon className="w-4 h-4 text-gray-400" />, info: "Total registrations across your Luma events this month." },
    { key: "eventAttendees", label: "Checked-in Attendees", placeholder: "280", icon: <CheckCircleIcon className="w-4 h-4 text-gray-400" />, info: "People who checked in to your Luma events this month." },
    { key: "eventCheckInRate", label: "Check-in Rate", placeholder: "80%", icon: <ChartBarIcon className="w-4 h-4 text-gray-400" />, info: "Share of registrations who checked in to your Luma events." },
];

export const VIBE_METRIC_OPTION_MAP = new Map(
    VIBE_METRIC_OPTIONS.map((option) => [option.key, option]),
);

export const VIBE_METRIC_KEYS = VIBE_METRIC_OPTIONS.map((option) => option.key);

// Compact label for metric cards ("Revenue (AUD)" -> "Revenue").
export function metricCardLabel(option: MetricOption): string {
    return option.label.replace(/\s*\(AUD\)\s*$/i, "");
}

export function hasDisplayableMetricValue(value: unknown): boolean {
    if (value === null || value === undefined) return false;

    const rawValue = String(value).trim();
    if (!rawValue) return false;

    const lowerValue = rawValue.toLowerCase();
    return !["null", "undefined", "-", "—"].includes(lowerValue);
}
