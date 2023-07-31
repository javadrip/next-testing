"use client";

import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Links } from "./Links";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const NavbarMenu = () => {
  // Using strings (such as link labels and sublink names) instead of boolean to control each individual menu's open/close state.
  // If boolean was used instead, then clicking on one menu would open or close all other menus on the same level.
  const [parentMenu, setParentMenu] = useState("");
  const [childMenu, setChildMenu] = useState("");

  return (
    <>
      {Links.map((link, index) => (
        <div
          className="navbar-link hover:bg-gradient-to-r from-cyan-500 to-blue-500 group md:cursor-pointer"
          key={index}
        >
          {link.sublinks && link.sublinks.length > 0 ? (
            // Displays when there are submenu
            <Fragment>
              {/* <div className="bg-yellow-300 w-[0%] hover:w-[100%] duration-300"> */}
              <h1
                // Make sure the classNames are consistent with Link in the false part of this ternary operator.
                className="text-gray-600 hover:text-current flex justify-between items-center"
                onClick={() => {
                  parentMenu !== link.name
                    ? setParentMenu(link.name)
                    : setParentMenu("");
                  setChildMenu("");
                }}
              >
                {link.name}
                <span className="text-xl md:hidden inline">
                  {parentMenu === link.name ? (
                    <ChevronUpIcon className="h-8" />
                  ) : (
                    <ChevronDownIcon className="h-8" />
                  )}
                </span>
                <span className="md:ml-1 md:block hidden">
                  <ChevronDownIcon className="h-4" />
                  {/* <ion-icon name="chevron-down"></ion-icon> */}
                </span>
              </h1>
              {/* </div> */}

              {/* ================================= DESKTOP SUBMENU ================================= */}
              <div className="absolute top-14 hidden group-hover:md:block hover:md:block">
                <div className="bg-purple-300 py-2 px-6">
                  {/* ============================= DESKTOP SUBMENU ITEMS ============================= */}
                  {link.sublinks.map((mysublinks, index) => (
                    <div key={index}>
                      <h1 className="text-lg font-semibold">
                        {mysublinks.Head}
                      </h1>
                      {/* ============================= DESKTOP SUBLINKS ============================= */}
                      {mysublinks.sublink.map((slink, index) => (
                        <li className="text-sm text-gray-600 my-2" key={index}>
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
              <div
                className={` ${
                  parentMenu === link.name ? "md:hidden" : "hidden"
                }`}
              >
                {/* ================================= MOBILE SUBMENU ================================= */}
                {link.sublinks.map((slinks, index) => (
                  <div key={index}>
                    <div>
                      <h1
                        onClick={() =>
                          childMenu !== slinks.Head
                            ? setChildMenu(slinks.Head)
                            : setChildMenu("")
                        }
                        className="px-8 py-2 flex justify-between items-center"
                      >
                        {slinks.Head}
                        <span className="text-xl inline">
                          {childMenu === link.name ? (
                            <ChevronUpIcon className="h-8" />
                          ) : (
                            <ChevronDownIcon className="h-8" />
                          )}
                        </span>
                      </h1>
                      <div
                        className={`${
                          childMenu === slinks.Head ? "md:hidden" : "hidden"
                        }`}
                      >
                        {/* ============================= MOBILE SUBLINKS ============================= */}
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
            </Fragment>
          ) : (
            // Displays when there are no submenu
            <Link
              href={link.href}
              key={index + link.name}
              className="text-gray-600 hover:text-current flex"
              target={link.external ? "_blank" : ""}
              rel={link.external ? "noopener" : ""}
            >
              {link.name}
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default NavbarMenu;

// =========================== V2 NAVBAR ==============================

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { Links } from "./Links";
// import {
//   Bars3Icon,
//   ChevronUpIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/outline";

// const NavbarMenu = () => {
//   const [heading, setHeading] = useState("");
//   const [subHeading, setSubHeading] = useState("");

//   return (
//     <>
//       <li>
//         <Link href="/" className="inline-block py-4 md:py-0">
//           Home
//         </Link>
//       </li>
//       {Links.map((link, index) => (
//         <div key={index}>
//           <div className="text-left md:cursor-pointer group">
//             <h1
//               className="py-4 md:py-0 flex justify-between items-center group"
//               onClick={() => {
//                 heading !== link.name ? setHeading(link.name) : setHeading("");
//                 setSubHeading("");
//               }}
//             >
//               {link.name}
//               <span className="text-xl md:hidden inline">
//                 {heading === link.name ? (
//                   <ChevronUpIcon className="h-8" />
//                 ) : (
//                   <ChevronDownIcon className="h-8" />
//                 )}
//                 {/* <ion-icon
//                   name={`${
//                     heading === link.name ? "chevron-up" : "chevron-down"
//                   }`}
//                 ></ion-icon> */}
//               </span>
//               <span className="md:ml-1 md:block hidden">
//                 <ChevronDownIcon className="h-4" />
//                 {/* <ion-icon name="chevron-down"></ion-icon> */}
//               </span>
//             </h1>

//             {/* ============================= SUBMENU ============================= */}
//             {link.submenu && (
//               <div>
//                 <div className="absolute top-10 hidden group-hover:md:block hover:md:block">
//                   <div className="py-3"></div>
//                   <div className="bg-purple-100 p-4 gap-8">
//                     {/* ============================= SUBMENU ============================= */}
//                     {link.sublinks.map((mysublinks, index) => (
//                       <div key={index}>
//                         <h1 className="text-lg font-semibold">
//                           {mysublinks.Head}
//                         </h1>
//                         {mysublinks.sublink.map((slink, index) => (
//                           <li
//                             className="text-sm text-gray-600 my-2.5"
//                             key={index}
//                           >
//                             <Link
//                               href={slink.link}
//                               className="hover:text-primary"
//                             >
//                               {slink.name}
//                             </Link>
//                           </li>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* Mobile menus */}
//           <div
//             className={`
//             ${heading === link.name ? "md:hidden" : "hidden"}
//           `}
//           >
//             {/* sublinks */}
//             {link.sublinks.map((slinks, index) => (
//               <div key={index}>
//                 <div>
//                   <h1
//                     onClick={() =>
//                       subHeading !== slinks.Head
//                         ? setSubHeading(slinks.Head)
//                         : setSubHeading("")
//                     }
//                     className="px-8 py-2 flex justify-between items-center"
//                   >
//                     {slinks.Head}

//                     <span className="text-xl inline">
//                       {subHeading === link.name ? (
//                         <ChevronUpIcon className="h-8" />
//                       ) : (
//                         <ChevronDownIcon className="h-8" />
//                       )}
//                       {/* <ion-icon
//                         name={`${
//                           subHeading === slinks.Head
//                             ? "chevron-up"
//                             : "chevron-down"
//                         }`}
//                       ></ion-icon> */}
//                     </span>
//                   </h1>
//                   <div
//                     className={`${
//                       subHeading === slinks.Head ? "md:hidden" : "hidden"
//                     }`}
//                   >
//                     {slinks.sublink.map((slink, index) => (
//                       <li className="py-3 pl-14" key={index}>
//                         <Link href={slink.link}>{slink.name}</Link>
//                       </li>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default NavbarMenu;

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
