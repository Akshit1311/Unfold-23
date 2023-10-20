"use client";

import Table from "@/components/Table/Table";
import { useSession } from "next-auth/react";

function Home() {
  const { data: session, status } = useSession();

  // if (status === "loading") return <div>Loading...</div>;

  return (
    <section className="  text-black max-w-7xl mx-auto pt-28">
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
