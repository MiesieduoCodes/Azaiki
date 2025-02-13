import React, { Suspense } from "react";
import ArtistsListPage from "@/app/artisans/page";

export default function ArtistsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading Artists...</div>}>
      <ArtistsListPage />
    </Suspense>
  );
}
