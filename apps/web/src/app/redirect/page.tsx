"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const url = window.location.href.split("#").join("?");
    console.log({
      url,
    });

    const { searchParams } = new URL(url);

    const id_token = searchParams.get("id_token");

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

        router.push("/marketplace");
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return <div>Wait while we logging you in.....</div>;
};

export default Page;
