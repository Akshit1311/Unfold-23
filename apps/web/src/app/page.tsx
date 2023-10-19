"use client";

import CarouselContainer from "@/components/Carousel/Carousel";
import Table from "@/components/Table/Table";
import Tabs from "@/components/common/Tabs";
import { useState } from "react";

// import { useSession } from "next-auth/react";

export type TActiveTab = "24" | "season" | "all";

function Home() {
  //   const { data: session, status } = useSession();

  const [activeTab, setActiveTab] = useState<TActiveTab>("24");

  const activeTabMap = {
    "24": <div>24</div>,
    season: <div>season</div>,
    all: <div>all</div>,
  } as const;

  //   if (status === "loading") return <div>Loading...</div>;

  return (
    <section className=" text-black max-w-7xl  mx-auto py-10">
      <CarouselContainer />

      <div className="mt-16">
        <div className="text-heading uppercase font-semibold  text-center text-3xl">
          Leaderboards
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* <Table /> */}

        <div className=" mt-4">{activeTabMap[activeTab]}</div>
      </div>
    </section>
  );
}

export default Home;
