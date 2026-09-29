const prefix = "/dashboard";

export const customerRoutes = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: `${prefix}` },
    ],
  },
  {
    title: "Outages",
    items: [
      { title: "Report Outage", url: `${prefix}/report-outage` },
      { title: "My Reports", url: `${prefix}/my-reports` },
    ],
  },
  {
    title: "Payments",
    items: [
      { title: "My Payments", url: `${prefix}/payments` },
    ],
  },
];