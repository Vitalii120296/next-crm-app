import { Suspense } from "react";
import { BusinessContent } from "./BusinessContent";
import { Progress } from "@/components/Progress";

export default function BusinessPageWrapper() {
  return (
    <Suspense fallback={<Progress />}>
      <BusinessContent />
    </Suspense>
  );
}
