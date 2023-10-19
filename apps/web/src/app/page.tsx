"use client";

import Table from "@/components/Table/Table";
// import { useSession } from "next-auth/react";

function Home() {
  //   const { data: session, status } = useSession();

  //   if (status === "loading") return <div>Loading...</div>;

  return (
    <section className="  text-black max-w-7xl  mx-auto py-10">
      <div>
        <div className="text-heading  text-center text-3xl">Season:1</div>
        <div className=" text-black text-center mt-3 font-raleway font-semibold tracking-wide">
          Season 1 is just the beginning. There's a lot more coming...
        </div>

        <div className=" my-5 border-2  border-custom-2 rounded-lg flex items-center">
          <div className="p-4  flex items-center justify-center w-1/2 bg-orange-400 text-black">
            1
          </div>
          <div className="p-4 border-l  border-custom-2 flex items-center justify-center w-1/2">
            2
          </div>
          <div className="p-4 border-l  border-custom-2 flex items-center justify-center w-1/2">
            3
          </div>
          <div className="p-4 border-l  border-custom-2 flex items-center justify-center w-1/2">
            4
          </div>
        </div>

        <div className="uppercase text-heading text-center text-xl">
          Rolling 24H Leaderboard
        </div>
        <Table />
      </div>
    </section>
  );
}

export default Home;
