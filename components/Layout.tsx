import React, { useState, useEffect } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { RiExchangeFundsFill } from "react-icons/ri";
import {
  BsCurrencyExchange,
  BsReverseListColumnsReverse,
} from "react-icons/bs";

import { IconType } from "react-icons";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

type navLink = {
  label: string;
  Icon: IconType;
  href: string;
};

const navLinks: navLink[] = [
  { label: "Converter", Icon: CgArrowsExchangeAltV, href: "/converter" },
  {
    label: "Your currencies",
    Icon: BsCurrencyExchange,
    href: "/your_currencies",
  },
  { label: "Transactions", Icon: RiExchangeFundsFill, href: "/transactions" },
  {
    label: "Currencies",
    Icon: BsReverseListColumnsReverse,
    href: "/currencies",
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<navLink>(navLinks[0]);

  const router = useRouter();

  useEffect(() => {
    router.push(activeTab.href);
  }, [activeTab]);

  return (
    <div className="bg-[#705adf] w-full h-screen flex items-center justify-center text-black">
      <div className="bg-white rounded-lg flex overflow-hidden">
        <section className="border-r-[1px] border-[#cecdcd] flex-1">
          {navLinks.map((link: navLink) => {
            return (
              <div
                key={link.label}
                onClick={() => setActiveTab(link)}
                className={`py-4 pr-5 pl-2 text-left font-semibold relative flex gap-2`}
              >
                <link.Icon
                  size={25}
                  color={activeTab.label == link.label ? "#423683" : "#000"}
                />
                <span
                  className={`font-bold ${
                    activeTab.label == link.label ? "text-[#423683]" : "text-[#000]"
                  }`}
                >
                  {link.label}
                </span>
                {activeTab.label == link.label && (
                  <div className="absolute left-0 top-0 w-[3px] h-full bg-[#423683]"></div>
                )}
              </div>
            );
          })}
        </section>
        <div className="flex flex-col pt-2">
          <nav className="flex flex-col items-end justify-end w-[700px] pr-4 font-semibold border-b-[1px] border-[#cecdcd]">
            <p className="text-lg font-[400]">
              Hello, <span className="font-bold">User</span>
            </p>
            <h2 className="text-sm">
              Balance: 100 <span className="font-bold">EUR</span>
            </h2>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
