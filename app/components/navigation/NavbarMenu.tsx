"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Links } from "./Links";
import { Bars3Icon } from "@heroicons/react/24/outline";

const NavbarMenu = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {Links.map((link, index) => (
        <div key={index}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-4 flex justify-between items-center md:pr-0 pr-5 group"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-xl md:hidden inline">
                {/* <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon> */}
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                {/* <ion-icon name="chevron-down"></ion-icon> */}
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-3 absolute
                    mt-1 bg-white rotate-45"
                    ></div>
                  </div>
                  <div className="bg-white p-5 grid grid-cols-3 gap-10">
                    {link.sublinks.map((mysublinks, index) => (
                      <div key={index}>
                        <h1 className="text-lg font-semibold">
                          {mysublinks.Head}
                        </h1>
                        {mysublinks.sublink.map((slink, index) => (
                          <li
                            className="text-sm text-gray-600 my-2.5"
                            key={index}
                          >
                            <Link
                              href={slink.link}
                              className="hover:text-primary"
                            >
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks, index) => (
              <div key={index}>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center"
                  >
                    {slinks.Head}

                    {/* <span className="text-xl md:mt-1 md:ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeading === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span> */}
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {slinks.sublink.map((slink, index) => (
                      <li className="py-3 pl-14" key={index}>
                        <Link href={slink.link}>{slink.name}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavbarMenu;

// ================================ ORIGINAL NAVBAR ================================ //

// import { Fragment } from "react";
// import Link from "next/link";

// import { Menu, Transition } from "@headlessui/react";
// import clsx from "clsx";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";

// interface Props {
//   menu: {
//     label: string;
//   };
//   items: {
//     title: string;
//     path: string;
//   }[];
//   mobile: boolean;
// }

// export const DropdownMenu = ({ menu, items, mobile }: Props) => {
//   return (
//     <Menu as="div" className="relative text-left">
//       {({ open }) => (
//         <>
//           <Menu.Button
//             className={clsx(
//               "flex items-center gap-x-1 rounded-full px-5 py-2  font-medium outline-none ring-blue-100 transition-all focus-visible:text-blue-500 focus-visible:ring-2",
//               open
//                 ? "text-blue-500 hover:text-blue-500"
//                 : " text-gray-600 dark:text-gray-400 ",
//               mobile ? "w-full px-4 py-2 text-sm" : "inline-block px-4 py-2"
//             )}
//           >
//             <span>{menu.label}</span>
//             <ChevronDownIcon className="mt-0.5 h-4 w-4" />
//           </Menu.Button>
//           <Transition
//             as={Fragment}
//             enter="lg:transition lg:ease-out lg:duration-100"
//             enterFrom="lg:transform lg:opacity-0 lg:scale-95"
//             enterTo="lg:transform lg:opacity-100 lg:scale-100"
//             leave="lg:transition lg:ease-in lg:duration-75"
//             leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
//             leaveTo="lg:transform lg:opacity-0 lg:scale-95"
//           >
//             <Menu.Items
//               className={clsx(
//                 "z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0  lg:w-56",
//                 !mobile && "bg-white shadow-lg  dark:bg-gray-800"
//               )}
//             >
//               <div className={clsx(!mobile && "py-3")}>
//                 {items.map((item, index) => (
//                   <Menu.Item as="div" key={index}>
//                     {({ active }) => (
//                       <Link
//                         href={item?.path ? item.path : "#"}
//                         className={clsx(
//                           "flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4",
//                           active
//                             ? "text-blue-500"
//                             : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
//                         )}
//                       >
//                         <span> {item.title}</span>
//                       </Link>
//                     )}
//                   </Menu.Item>
//                 ))}
//               </div>
//             </Menu.Items>
//           </Transition>
//         </>
//       )}
//     </Menu>
//   );
// };
