"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });

    router.push("/signin");
  };

  return (
    <Button
      variant={"outline"}
      className="border-red-700"
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  );
}
