import { createMetadata } from "@/utils";
import OutagesClient from "./outages-client";

export const metadata = createMetadata({
  title: "Outages",
  description: "View scheduled power outages in your area.",
  path: "/outages",
});

export default function OutagesPage() {
  return <OutagesClient />;
}