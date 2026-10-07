import FeaturesSection from "@/components/modules/homepage/features-section";
import HeroSection from "@/components/modules/homepage/Hero";
import PackagesSection from "@/components/modules/homepage/packages-section";
import { createMetadata } from "@/utils";

export const metadata = createMetadata({
  title: "Home",
  description: "Stay informed about power outages in your area.",
  path: "/",
});

export default function HomePage() {
    return (
        <div>
            <HeroSection/>
            <FeaturesSection/>
            <PackagesSection/>
        </div>
    );
}