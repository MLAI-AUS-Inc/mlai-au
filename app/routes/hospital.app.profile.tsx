import type { Route } from "./+types/hospital.app.profile";
import { redirect } from "react-router";

export function loader() {
    return redirect("/hospital/app/team");
}

export default function HospitalAppProfile() {
    return null;
}
