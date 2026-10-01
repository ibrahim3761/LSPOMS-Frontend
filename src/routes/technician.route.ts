const prefix = "/technician";

export const technicianRoutes = [
  {
    title: "Overview",
    items: [{ title: "Dashboard", url: `${prefix}` }],
  },
  {
    title: "Work",
    items: [{ title: "My Assignments", url: `${prefix}/assignments` }],
  },
];