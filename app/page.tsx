"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon, Bell } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectItem } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" relative lg:w-[75vw]">
      <div className="flex justify-end mt-10 px-20">
        <Link href="/add-wallet">
          <Button className="w-28 h-7 p-4 text-xs font-semibold  rounded-3xl bg-[#0A3C43] text-white">
            Add Wallet +
          </Button>
        </Link>
      </div>
      <div className="">
        <div className="border-b-[1px] border-gray-400 mb-5">
          <div className="px-20 py-10">
            <p className="font-medium text-sm mb-10"> Quick Actions</p>
            <div className="flex justify-between">
              {" "}
              <div className="w-40 h-14 flex gap-2 bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  src={"/fundwallet.svg"}
                  alt="fund wallet logo"
                  height={17}
                  width={17}
                  className=""
                  priority
                />
                <p className="text-sm font-medium">Fund Wallet</p>
              </div>{" "}
              <div className="w-40 h-14 flex gap-2 bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  src={"/sendmoney.svg"}
                  alt="send money logo"
                  height={17}
                  width={17}
                  className=""
                  priority
                />
                <p className="text-sm font-medium">Send Money</p>
              </div>{" "}
              <div className="w-40 h-14 flex gap-2 bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  src={"/swap.svg"}
                  alt="swap logo"
                  height={17}
                  width={17}
                  className=""
                  priority
                />
                <p className="text-sm font-medium">Currency Swap</p>
              </div>{" "}
              <div className="w-40 h-14 flex gap-2 bg-gray-200 rounded-lg items-center justify-center">
                <Image
                  src={"/exchange.svg"}
                  alt="exchange rate logo"
                  height={17}
                  width={17}
                  className=""
                  priority
                />
                <p className="text-sm font-medium">Exchange rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-col flex px-20 gap-10">
          <div className="flex justify-between">
            {" "}
            <div className="flex flex-col gap-1">
              {" "}
              <p className="text-sm font-medium">Transactions</p>{" "}
              <p className="font-normal text-xs">
                All your transactions are shown here{" "}
              </p>
            </div>
            <div>
              <Select
                disableSelectorIconRotation
                className="w-40"
                color="default"
                defaultSelectedKeys={[`debit`]}
                selectorIcon={<ArrowUpDownIcon />}
              >
                <SelectItem key="debit">Debit</SelectItem>
                <SelectItem key="credit">Credit</SelectItem>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-gray-600">
                <TableHead>S/N</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead className="">Amount</TableHead>
                <TableHead>Charges</TableHead> <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {new Array(4).fill(null).map((_, i) => (
                <TableRow className="border-b-2 border-black" key={i}>
                  <TableCell className="font-medium border-b-2 border-gray-400">
                    01
                  </TableCell>
                  <TableCell className="border-b-2 border-gray-400">
                    {" "}
                    Withdraw from wallet
                  </TableCell>
                  <TableCell className="border-b-2 border-gray-400">
                    {" "}
                    Naira{" "}
                  </TableCell>
                  <TableCell className="border-b-2 border-gray-400">
                    -20,000
                  </TableCell>
                  <TableCell className="border-b-2 border-gray-400">
                    100
                  </TableCell>
                  <TableCell className="border-b-2 border-gray-400">
                    18-01-2025
                  </TableCell>
                  <TableCell className="border-b-2 border-gray-400">
                    Successful
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
