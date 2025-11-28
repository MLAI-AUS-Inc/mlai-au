import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { axiosInstance } from "~/lib/api";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Verifying...");
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            setStatus("Error: No token provided");
            return;
        }

        const verify = async () => {
            console.log("Starting verification for token:", token);
            try {
                const response = await axiosInstance.get("/api/v1/auth/verify-magic-link/", {
                    params: { token },
                });

                console.log("Verification success:", response.data);
                setStatus("Success! Redirecting...");

                // Wait a moment before redirecting to ensure cookies are set
                const next = searchParams.get("next") || "/esafety/dashboard";
                setTimeout(() => navigate(next), 1000);

            } catch (error) {
                console.error("Verification failed:", error);
                setStatus("Verification failed. Please try again.");
            }
        };

        verify();
    }, [token, navigate]);

    return <div>{status}</div>;
}
