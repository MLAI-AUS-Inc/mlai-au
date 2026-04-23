import { redirect } from "react-router";

export function loader() {
    return redirect("/articles/featured/how-to-pitch-your-idea", 301);
}

export default function () { return null; }
