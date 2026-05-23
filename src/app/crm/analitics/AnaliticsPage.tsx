"use client";

import dynamic from "next/dynamic";
import { Progress } from "@/components/Progress";

const MainGrid = dynamic(() => import("@/components/MainGrid"), {
  loading: () => <Progress />,
});

export const AnaliticsPage = () => {
  return <MainGrid />;
};
