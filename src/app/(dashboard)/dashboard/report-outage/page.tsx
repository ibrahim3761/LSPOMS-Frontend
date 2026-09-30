import ReportOutageForm from "@/components/form/report-outage-form";

export default function ReportOutagePage() {
  return (
    <div className="p-6 w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Report Outage</h1>
        <p className="text-muted-foreground text-sm">
          Report an unexpected power outage in your area
        </p>
      </div>
      <ReportOutageForm />
    </div>
  );
}