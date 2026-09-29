const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Overview",
    items: [
      { title: "Analytics", url: `${prefix}` },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Users", url: `${prefix}/users` },
      { title: "Areas", url: `${prefix}/areas` },
      { title: "Technicians", url: `${prefix}/technicians` },
      { title: "Packages", url: `${prefix}/packages` },
    ],
  },
  {
    title: "Outages",
    items: [
      { title: "Scheduled Outages", url: `${prefix}/scheduled-outages` },
      { title: "Unexpected Outages", url: `${prefix}/unexpected-outages` },
    ],
  },
];