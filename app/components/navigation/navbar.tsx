"use client";

import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";

import { menu } from "./menu";
import { DropdownMenu } from "./dropdownmenu";
import Container from "../container";

import Search from "../ui/search";

export interface Props {
  logo: {
    asset: {
      _ref: string;
    };
  };
  logoalt: {
    asset: {
      _ref: string;
    };
  };
  mobile: boolean;
}

export default function NavbarAlt(props: Props) {
  return (
    <Container className="!py-0">
      <nav className="my-4">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 lg:flex-nowrap">
                <div className="flex w-full items-center justify-between lg:w-auto">
                  <Link href="/" className="w-28 dark:hidden">
                    {/* {props.logo ? (
                      <Image
                        src={urlForImage(props.logo)?.src || ""}
                        alt="Logo"
                        priority={true}
                        sizes="(max-width: 640px) 100vw, 200px"
                      />
                    ) : (
                      <span className="block text-center">Stablo</span>
                    )} */}
                  </Link>
                  <Link href="/" className="hidden w-28 dark:block">
                    {/* {props.logoalt ? (
                      <Image
                        src={urlForImage(props.logoalt)?.src || ""}
                        alt="Logo"
                        priority={true}
                        sizes="(max-width: 640px) 100vw, 200px"
                      />
                    ) : (
                      <span className="block text-center">Stablo</span>
                    )} */}
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:outline-none dark:text-gray-300 lg:hidden "
                  >
                    <svg
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden w-full flex-col items-center lg:flex lg:w-auto lg:flex-row ">
                    {menu.map((item, index) => (
                      <>
                        {item.children && item.children.length > 0 ? (
                          <DropdownMenu
                            menu={item}
                            key={index + item.label}
                            items={item.children}
                            mobile={props.mobile}
                          />
                        ) : (
                          <Link
                            href={item.href}
                            key={index + item.label}
                            className="rounded-full px-5 py-2 font-medium text-gray-600 outline-none ring-blue-100 hover:text-blue-500 focus-visible:text-blue-500 focus-visible:ring-2 dark:text-gray-400"
                            target={item.external ? "_blank" : ""}
                            rel={item.external ? "noopener" : ""}
                          >
                            {item.label}
                          </Link>
                        )}
                      </>
                    ))}
                  </div>
                  <div className="hidden lg:block">
                    <form action="/search" method="GET">
                      <Search placeholder="Search" />
                    </form>
                  </div>
                </div>
              </div>
              <Disclosure.Panel>
                <div className="order-2 -ml-5 mt-5 flex w-full flex-col items-start justify-start lg:hidden">
                  {menu.map((item, index) => (
                    <>
                      {item.children && item.children.length > 0 ? (
                        <DropdownMenu
                          menu={item}
                          key={index + item.label}
                          items={item.children}
                          mobile={true}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          key={index + item.label}
                          className="rounded-full px-5 py-2 text-sm font-medium text-gray-600 outline-none ring-blue-100 hover:text-blue-500 focus-visible:text-blue-500 focus-visible:ring-2 dark:text-gray-400"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}
                        >
                          {item.label}
                        </Link>
                      )}
                    </>
                  ))}
                  <div className="mt-2 px-5">
                    <form action="/search" method="GET">
                      <Search placeholder="Search" />
                    </form>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}
