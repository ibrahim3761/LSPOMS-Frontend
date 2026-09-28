/** biome-ignore-all lint/performance/noImgElement: <explanation> */
import Logo from "@/assets/svg/Logo";
import TechnicianApplyForm from "@/components/form/technician-apply-form";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col col-span-2 gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <Logo />
              <span>LSPOMS</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <TechnicianApplyForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
<img
          src="/login.jpg"
          // biome-ignore lint/a11y/noRedundantAlt: <explanation>
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}