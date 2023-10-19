import { getEpoch } from "suizklogin";
// import { redirect } from "next/navigation";

export async function GET() {
  const params = await getEpoch();

  const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  //   redirect(loginURL);
  return Response.json(loginURL);
}
