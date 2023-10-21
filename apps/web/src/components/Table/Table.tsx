import { cn } from "@/utils/helpers";
import { getUsers } from "evm";
import React, { useEffect, useState } from "react";
import { useAccount, useEnsName, useNetwork } from "wagmi";

const Table: React.FC = () => {
  const TableHeading = ["Rank #", "ENS", "Address", "XP"];
  const { address } = useAccount();
  const { chain } = useNetwork();

  const dataArr = [
    ["axit.sui", "0x__46", "100xp"],
    ["harsh.sui", "0x__24", "90xp"],
    ["anjana.sui", "0x__12", "80xp"],
    ["sidhya.sui", "0x__46", "70xp  "],
    ["pretham.sui", "0x__98", "60xp"],
    ["guava.sui", "0x__55", "50xp"],
    ["gupta.sui", "0x__89", "40xp"],
    ["haridas.sui", "0x__16", "30xp  "],
  ];

  const [users, setUsers] = useState<Awaited<ReturnType<typeof getUsers>>>([]);
  useEffect(() => {
    (async () => {
      const _users = await getUsers();
      console.log({ _users });

      setUsers(_users);
    })();
  }, [chain]);

  return (
    <div className="mt-4 mx-auto  text-center">
      <Thead headingArr={TableHeading} />
      <br />
      {dataArr.map((data, i) => (
        <TBody DataArr={data} index={i} />
      ))}
    </div>
  );
};
export default Table;

interface Props {
  headingArr: string[];
}

const Thead: React.FC<Props> = ({ headingArr }) => (
  <div className="border  border-heading    mt-5 font-bold flex items-center">
    {headingArr.map((heading) => (
      <div
        className="md:p-4 p-2 border-l border-heading  flex items-center justify-center w-1/2 text-xs md:text-base"
        key={heading}
      >
        {heading}
      </div>
    ))}
  </div>
);

interface TBodyProps {
  index: number;
  isYou?: boolean;
  DataArr: string[];
}

const TBody: React.FC<TBodyProps> = ({ index, DataArr, isYou }) => {
  const { data } = useEnsName({ address: DataArr[0] as `0x${string}` });

  return (
    <div className="border  border-heading flex items-center">
      <div
        className={cn(
          "md:p-4 p-2 border-l  border-heading flex items-center justify-center w-1/2 text-xs md:text-base",
          isYou && " bg-black/10"
        )}
      >
        {index + 1}
      </div>

      {DataArr.map((data) => (
        <div
          className={cn(
            "md:p-4 p-2 border-l  border-heading  flex items-center justify-center w-1/2 text-xs md:text-base",
            isYou && " bg-black/10"
          )}
          key={data}
        >
          {data}
        </div>
      ))}
    </div>
  );
};
