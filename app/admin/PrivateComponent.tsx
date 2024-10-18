"use client";

import React, { useEffect, useState } from "react";
import { layoutProps } from "../../interfaces_types/interfaces_types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingPage from "../(componenets)/LoadinPage";

function PrivateComponent({ children }: layoutProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
      if (!session) {
        router.push("/admin/login");
      }
    }
  }, [session, status]);
  return <>{!loading ? children : <LoadingPage />}</>;
}

export default PrivateComponent;
