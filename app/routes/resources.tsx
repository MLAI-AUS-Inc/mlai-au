import { redirect } from "react-router";

export function loader() {
    return redirect("/articles", 301);
}
