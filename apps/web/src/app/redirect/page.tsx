"use client";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    const url = window.location.href.split("#").join("?");
    console.log({
      url,
    });

    const { searchParams } = new URL(url);

    const id_token = searchParams.get("id_token");
    id_token && setJwtToken(id_token);

    console.log({ id_token });
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/getSuiAddress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: id_token }),
        });

        const address = await res.json();
        localStorage.setItem("userAddress", address.zkLoginUserAddress);
        console.log({ address });
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return <div>Wait while we logging you in.....</div>;
};

export default Page;
