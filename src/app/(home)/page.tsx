import HeroSection from "@/components/home/HeroSection";
import ExecutiveSummary from "@/components/home/ExecutiveSummary";
import KeyObjectives from "@/components/home/KeyObjectives";
import SystemOverview from "@/components/home/SystemOverview";
import FunctionalHighlights from "@/components/home/FunctionalHighlights";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import AIFeatures from "@/components/home/AIFeatures";
import WorkflowDiagrams from "@/components/home/WorkflowDiagrams"
import UserRoles from "@/components/home/UserRoles";

export default function Home() {
  return (
    <div className="w-full md:w-11/12 mx-auto space-y-20">
      <HeroSection />
      <ExecutiveSummary />
      <KeyObjectives />
      <SystemOverview />
      <UserRoles />
      <FunctionalHighlights />
      <ServiceHighlights />
      <AIFeatures />
      <WorkflowDiagrams />
    </div>
  );
}