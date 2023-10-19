import { Secp256k1Keypair } from "@mysten/sui.js/keypairs/secp256k1";
import { SuiClient } from "@mysten/sui.js/client";
import { generateNonce, generateRandomness } from "@mysten/zklogin";
const REDIRECT_URI = "https://sui.io/";

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
