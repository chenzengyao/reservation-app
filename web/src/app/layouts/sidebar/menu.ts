import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.DASHBOARDS.TEXT",
    icon: "bx-home-circle",
    link: "/admin/dashboard",
    badge: {
      variant: "info",
      text: "MENUITEMS.DASHBOARDS.BADGE",
    },
  },
  {
    id: 2,
    label: "MENUITEMS.APPS.TEXT",
    isTitle: true,
  },
  {
    id: 3,
    label: "Users",
    icon: "bx-user",
    subItems: [
      {
        id: 4,
        label: "Users Listing",
        link: "/admin/users/listing",
        parentId: 3,
      },
      {
        id: 5,
        label: "Add New",
        link: "/admin/users/add",
        parentId: 3,
      },
    ],
  },
  {
    id: 6,
    label: "Reservation",
    icon: "bx-store",
    subItems: [
      {
        id: 7,
        label: "Reservation Listing",
        link: "/admin/reservation/listing",
        parentId: 6,
      },
      {
        id: 8,
        label: "Add New",
        link: "/admin/reservation/add",
        parentId: 6,
      },
    ],
  },
  {
    id: 9,
    label: "Menu",
    icon: "bx-food-menu",
    subItems: [
      {
        id: 10,
        label: "Menu Listing",
        link: "/admin/menu/listing",
        parentId: 9,
      },
      {
        id: 11,
        label: "Add New",
        link: "/admin/menu/add",
        parentId: 9,
      },
    ],
  },
  {
    id: 12,
    label: "Tables",
    icon: "bx-table",
    subItems: [
      {
        id: 13,
        label: "Tables Listing",
        link: "/admin/tables/listing",
        parentId: 12,
      },
      {
        id: 14,
        label: "Add New",
        link: "/admin/tables/add",
        parentId: 12,
      },
    ],
  },
  {
    id: 15,
    label: "MENUITEMS.ECOMMERCE.TEXT",
    icon: "bx-store",
    subItems: [
      {
        id: 16,
        label: "MENUITEMS.ECOMMERCE.LIST.PRODUCTS",
        link: "/admin/ecommerce/products",
        parentId: 15,
      },
      {
        id: 17,
        label: "MENUITEMS.ECOMMERCE.LIST.PRODUCTDETAIL",
        link: "/admin/ecommerce/product-detail/1",
        parentId: 15,
      },
    ],
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
    link: "/admin/settings",
  },
];
