const prefix = "/dashboard";

export const customerRoutes = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: `${prefix}` },
      { title: "My Subscriptions", url: `${prefix}/subscriptions` },
    ],
  },
  {
    title: "Outages",
    items: [
      { title: "Report Outage", url: `${prefix}/report-outage` },
    ],
  },
];