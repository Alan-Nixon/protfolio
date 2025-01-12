"use client";

import React, { useEffect, useState } from "react";
import { layoutProps } from "../../interfaces_types/interfaces_types";
import { useSession } from "next-auth/react";
import LoadingPage from "../(components)/LoadingPage";

function PrivateComponent({ children }: layoutProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
      if (!session) {
        window.location.href = "/admin/login";
      }
    }
  }, [session, status]);
  return <>{!loading ? children : <LoadingPage />}</>;
}

export default PrivateComponent;
