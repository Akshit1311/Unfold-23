import hkdf from "@panva/hkdf";

import jwt_decode from "jwt-decode";

import { jwtToAddress } from "@mysten/zklogin";

export interface JwtPayload {
  iss: string;
  sub?: string; //Subject ID
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export async function GET(request: Request) {
  const data = "helloworld";
  return Response.json({ data });
}

export async function POST(request: Request, res: Response) {
  const body: { token: string } = await request.json();

  if (!body?.token) {
    // console.log({ message: "Bad request" });
    return Response.json(
      {
        status: 400,
        message: "JWT not found",
      },
      { status: 400 }
    );
  }
  console.log({ jwt: body.token });

  const decoded: JwtPayload = jwt_decode(body.token);

  console.log({ decoded });

  if (!(decoded.iss || decoded.aud) && !decoded.sub) {
    return Response.json(
      { status: 400, message: "Bad request" },
      { status: 400 }
    );
  }

  try {
    const derivedSeed = await hkdf(
      "sha256",
      "some_key_seed",
      (decoded.iss || decoded.aud?.toString())!,
      decoded.sub!,
      64
    );

    console.log({ derivedSeed });

    const zkLoginUserAddress = jwtToAddress(
      body.token,
      "100681567828351849884072155819400689117" // Whitelisting to be done in the future
    );

    console.log({ zkLoginUserAddress });

    return Response.json({
      message: "Seed generated successfully",
      seed: derivedSeed.join(""),
      zkLoginUserAddress,
    });
  } catch (error) {
    console.log({ error });
    return Response.json(
      { status: 500, message: "Bad request" },
      { status: 500 }
    );
  }
}

// https://unfold-23-web-git-suizklogin-akshit1311.vercel.app/#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkMzM0NDk3NTA2YWNiNzRjZGVlZGFhNjYxODRkMTU1NDdmODM2OTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxOTQ4MTMwNjA1OTktZTA1bWJtdTU3N2Rwc3FydW5rOHVlMnBtdGx1c2RxNW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxOTQ4MTMwNjA1OTktZTA1bWJtdTU3N2Rwc3FydW5rOHVlMnBtdGx1c2RxNW0uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM3MTMxNjQwOTc4NDAwMzUyOTYiLCJub25jZSI6IjFwX2JrSUpOOVZhaEFwYWNEekp1VzFzUXVVbyIsIm5iZiI6MTY5NzgxMzM4OCwiaWF0IjoxNjk3ODEzNjg4LCJleHAiOjE2OTc4MTcyODgsImp0aSI6ImFhOGE2YWY5MTQxMjNhNDhmZDQ3ODVmZTQ4MzJmMDA2MWY5MjhjZjIifQ.ao6cWzxr0t8ed0cNgE74DeRvCOdIyG5WyZafIcZ2xyDTo3M5WchuNhoF7L_eKyxpdDO5L2YvtqT9dsnPgmfUshtRi9g5g8vpJ4-3cNXbLhRPLokETYjESP_oRR9TSxDL5U8W1LGwe8xliKbaaliEPwFXu9JKFNEX73nFRnSKDFo6eEmzlO5B1fLAuY4-L5qS7naLWMSztYNXq3NoNeY3uAIMxe9QSQztbfkLvrwED-FOjlgYc-GYxj4fEgihgSopP6xE0ydOlU5EiAcBe7xhIzU2EfwdQyIA-Zq_BgpC1ghr6Ix7v1m-5PE2LR1lqLIHfddqCuwfMDxV9wz4AJXtSQ&authuser=1&prompt=none
