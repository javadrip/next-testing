interface Props {
  label: string;
  href: string;
  external?: boolean;
  submenu?: {
    submenuLabel: string;
    submenuHref: string;
    sublinks?: {
      sublinkLabel: string;
      sublinkPath: string;
    }[];
  }[];
}

export const Links: Props[] = [
  {
    label: "Travel",
    href: "/travel",
  },
  {
    label: "Lifestyle",
    href: "/lifestyle",
    external: false,
  },
  {
    label: "Technology",
    href: "/technology",
    external: false,
  },
  {
    label: "Design",
    href: "/design",
    external: false,
  },
  {
    label: "Personal Growth",
    href: "/personal-growth",
    external: false,
  },
  {
    label: "Contact",
    href: "/contact",
    external: false,
  },
  // Example of a full menu with submenus
  // {
  //   label: "Men",
  //   href: "/men",
  //   external: false,
  //   submenu: [
  //     {
  //       submenuLabel: "Topwear",
  //       submenuHref: "/",
  //       sublinks: [
  //         { sublinkLabel: "T-shirt", sublinkPath: "/" },
  //         { sublinkLabel: "Casual shirts", sublinkPath: "/" },
  //         { sublinkLabel: "formal shirts", sublinkPath: "/" },
  //         { sublinkLabel: "formal shirts", sublinkPath: "/" },
  //         { sublinkLabel: "formal shirts", sublinkPath: "/" },
  //       ],
  //     },
  //     {
  //       submenuLabel: "Bottomwear",
  //       submenuHref: "/",
  //       sublinks: [
  //         { sublinkLabel: "T-shirt", sublinkPath: "/" },
  //         { sublinkLabel: "Casual shirts", sublinkPath: "/" },
  //         { sublinkLabel: "formal shirts", sublinkPath: "/" },
  //         { sublinkLabel: "formal shirts", sublinkPath: "/" },
  //         { sublinkLabel: "formal shirts", sublinkPath: "/" },
  //       ],
  //     },
  //     {
  //       submenuLabel: "Innerwear",
  //       submenuHref: "/",
  //     },
  //   ],
  // },
];

// ============================= ORIGINAL LINKS ============================= //

// export const Links = [
//   {
//     label: "Home",
//     href: "#",
//     children: [
//       { title: "Home Default", path: "/" },
//       { title: "Home Alternate", path: "/home/alt" },
//       { title: "Home Minimal", path: "/home/minimal" },
//       { title: "Home Lifestyle", path: "/home/lifestyle" },
//       { title: "Home Two Column", path: "/home/2-col" },
//     ],
//   },
//   {
//     label: "About",
//     href: "/about",
//   },
//   {
//     label: "Contact",
//     href: "/contact",
//   },
//   {
//     label: "Pages",
//     href: "#",
//     children: [
//       {
//         title: "Category Page",
//         path: "/category/personal-growth",
//       },
//       {
//         title: "Author Page",
//         path: "/author/mario-sanchez",
//       },
//       {
//         title: "Search Page",
//         path: "/search?q=life",
//       },
//       { title: "Archive - Pagination", path: "/archive" },
//       {
//         title: "Single Post - Default",
//         path: "/post/10-simple-practices-that-will-help-you-get-1-better-every-day",
//       },
//       {
//         title: "Single Post - Minimal",
//         path: "/post/minimal/architectural-engineering-wonders-of-the-modern-era-for-your-inspiration",
//       },
//       {
//         title: "Single Post - Lifestyle",
//         path: "/post/lifestyle/there-s-nothing-new-about-undermining-women-s-autonomy",
//       },
//       {
//         title: "Single Post - Sidebar",
//         path: "/post/sidebar/lessons-of-happiness-i-learned-from-a-mountain-village",
//       },
//     ],
//   },
//   {
//     label: "Purchase",
//     href: "https://web3templates.com/templates/stablo-minimal-blog-website-template",
//     external: true,
//   },
// ];
