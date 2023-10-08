import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  // {
  //   id: 1,
  //   label: "MENUITEMS.DASHBOARDS.TEXT",
  //   icon: "bx-home-circle",
  //   link: "/user/dashboard",
  //   badge: {
  //     variant: "info",
  //     text: "MENUITEMS.DASHBOARDS.BADGE",
  //   },
  // },
  {
    id: 2,
    label: "MENUITEMS.APPS.TEXT",
    isTitle: true,
  },
  {
    id: 3,
    label: "Manage Profile",
    icon: "bx-user",
    link: "/user/profile",
    subItems: [
      {
        id: 4,
        label:  "Change Password",
        link: "/user/profile",
        parentId: 3,
      },
    ],
  },
  {
    id: 6,
    label: "Order History",
    icon: "bx-store",
    link: "/user/orderhistory",
    // subItems: [
    //   {
    //     id: 7,
    //     label: "Orders History",
    //     link: "/user/orderhistory",
    //     parentId: 6,
    //   },
    //   {
    //     id: 8,
    //     label: "Orders Help",
    //     link: "/user/orderhelp",
    //     parentId: 6,
    //   },
    // ],
  },
  {
    id: 9,
    label: "Menu",
    icon: "bx-food-menu",
    link: "/user/menu",
    // subItems: [
    //   {
    //     id: 10,
    //     label: "Menu",
    //     link: "/menu",
    //     parentId: 9,
    //   },
    // ],
  },
  {
    id: 12,
    label: "Table Reservation",
    icon: "bx-table",
    link: "/user/tables",
    // subItems: [
    //   {
    //     id: 13,
    //     label: "Find Table",
    //     link: "/tables",
    //     parentId: 12,
    //   },
    // ],
  },
  {
    id: 15,
    label: "Delivery Tracking",
    icon: "bx-package",
    link: "/user/delivery",
    // subItems: [
    //   {
    //     id: 16,
    //     label: "Delivery Tracking",
    //     link: "/user/delivery/tracking",
    //     parentId: 15,
    //   },
    // ],
  },
  {
    id: 18,
    label: "Settings",
    isTitle: true,
  },
  {
    id: 19,
    label: "Settings",
    icon: "bx-cog",
    link: "/user/settings",
  },
];
