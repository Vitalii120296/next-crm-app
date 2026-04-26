import { Suspense } from "react";
import BusinessPage from "./PropertiesPage";
import { Progress } from "@/components/Progress";

const BusinessPageWrapper = () => {
  return (
    <Suspense fallback={<Progress />}>
      <BusinessPage />
    </Suspense>
  );
};

export default BusinessPageWrapper;
