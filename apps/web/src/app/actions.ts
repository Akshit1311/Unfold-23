"use server";

import { redirect } from "next/navigation";
import { getEpoch } from "suizklogin";

export async function googleSignIn() {
  const params = await getEpoch();

  return redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
