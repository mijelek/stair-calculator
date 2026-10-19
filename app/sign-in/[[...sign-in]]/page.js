// app/sign-in/[[...sign-in]]/page.js
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <SignIn />
      </Suspense>
    </div>
  );
}