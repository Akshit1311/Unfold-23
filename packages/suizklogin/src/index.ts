import { Secp256k1Keypair } from "@mysten/sui.js/keypairs/secp256k1";
import { SuiClient } from "@mysten/sui.js/client";
import { generateNonce, generateRandomness } from "@mysten/zklogin";

const REDIRECT_URI =
  "https://unfold-23-web-git-suizklogin-akshit1311.vercel.app/";

const FULLNODE_URL = "https://fullnode.devnet.sui.io";
const suiClient = new SuiClient({ url: FULLNODE_URL });
export const getEpoch = async () => {
  const { epoch, epochDurationMs, epochStartTimestampMs } =
    await suiClient.getLatestSuiSystemState();
  const maxEpoch = Number(epoch) + 2;
  const ephemeralKeyPair = new Secp256k1Keypair();
  const randomness = generateRandomness();
  const nonce = generateNonce(
    ephemeralKeyPair.getPublicKey(),
    maxEpoch,
    randomness
  );

  console.log({ GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID });

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: REDIRECT_URI,
    response_type: "id_token",
    scope: "openid",
    nonce: nonce,
  });
  return params;
};
const params = getEpoch();

// http://localhost:3000/redirect?#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkMzM0NDk3NTA2YWNiNzRjZGVlZGFhNjYxODRkMTU1NDdmODM2OTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxOTQ4MTMwNjA1OTktZTA1bWJtdTU3N2Rwc3FydW5rOHVlMnBtdGx1c2RxNW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxOTQ4MTMwNjA1OTktZTA1bWJtdTU3N2Rwc3FydW5rOHVlMnBtdGx1c2RxNW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDcyMzg3NjQwMjQ0MTU0MTM5MDQiLCJub25jZSI6IjFWejRHX3hWQjJmN01DbXF5VmNpV3pza0JVMCIsIm5iZiI6MTY5NzcyNzM5NywiaWF0IjoxNjk3NzI3Njk3LCJleHAiOjE2OTc3MzEyOTcsImp0aSI6IjQyZjQ5MDQ5YWI0ZjQ0ZTg2NjQ2YzUzMDRjZTcyNmRiMmI3MzcyYzkifQ.LbBRsWY3uJI677xUUhMDIBn1dibEJ3Co5-ugz0m1otxhGXty5perY5nh6j6TZ6XtQu0HOV9eRXzjkOlN2uScQ3nQD4WG6JrMak3O7cCsOHSSguWwEHRJ6ezwev_45f04yaQzkLP2CimjBFvRcLxD0DWwV0WmHATuc0hMIMmg_ockjwKTHWzatDNskqnEBrhVjGbc50kGpKYon2BjJj67JAQ2SWJgiymAkPfbX2eNDcnrC7FUlspbkggPleo-S6tOpSUyE_Z9rdmLkjAazIWRZD1pvBCgUFDNzYqyMYXHz4LEbj4O1GjQMdEDxCkD31lczYfdVL-t7DnJ3sLMXCzolw&authuser=0&prompt=none
