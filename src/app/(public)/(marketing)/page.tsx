import { createMetadata } from "@/utils";

export const metadata = createMetadata({
  title: "Home",
  description: "Stay informed about power outages in your area.",
  path: "/",
});

export default function HomePage() {
    return (
        <div>
            <h1>This is Homepage</h1>
        </div>
    );
}