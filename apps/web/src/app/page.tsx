"use client";

import Table from "@/components/Table/Table";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  useEffect(() => {
    const url = window.location.href.split("#").join("?");
    console.log({
      url,
    });

    const { searchParams } = new URL(url);

    const id_token = searchParams.get("id_token");

    console.log({ id_token });
    const validate = async () => {
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
    };

    if (id_token) {
      validate();
    }
  }, []);

  return (
    <section className="text-black max-w-7xl mx-auto pt-28">
      <div>
        <div className="text-heading  text-center text-3xl">Season: 1</div>
        <div className=" text-black text-center mt-3">
          Season 1 is just the beginning.There's a lot more coming...
        </div>

        <div className="uppercase text-heading text-center text-xl mt-2">
          Rolling 24H Leaderboard
        </div>
        <Table />
      </div>
    </section>
  );
}

export default Home;
