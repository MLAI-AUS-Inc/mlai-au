import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";

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
                // CRITICAL: Ensure this URL matches your backend
                // Note: Using port 80 (default) as per your docker config
                const backendUrl = "http://esafety.localhost/api/v1/auth/verify-magic-link/";
                console.log("Calling backend:", backendUrl);

                const response = await axios.get(backendUrl, {
                    params: { token },
                    withCredentials: true, // IMPORTANT: Allows setting cookies
                });

                console.log("Verification success:", response.data);
                setStatus("Success! Redirecting...");

                // Wait a moment before redirecting to ensure cookies are set
                setTimeout(() => navigate("/platform/dashboard"), 1000);

            } catch (error) {
                console.error("Verification failed:", error);
                setStatus("Verification failed. Please try again.");
            }
        };

        verify();
    }, [token, navigate]);

    return <div>{status}</div>;
}
