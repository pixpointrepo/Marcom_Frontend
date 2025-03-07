import allNewsArticles from "./articles";





const menuItems = [
  {
    label: "Home",
    path: "/",
    items: [] // No dropdown
  },
  {
    label: "Categories",
    path: "/categories",
    items: [{
      label: "",
      path: "/",
      items: [""],
    },],
  },

  {
    label: "Tags",
    path: "/tags",
    items: [{
      label: "",
      path: "/",
      items: [""],
    },],
  },

  // {
  //   label: "Articles",
  //   path: "/articles",
  //   items: [
  //     {
  //       label: "Interviews",
  //       path: "/articles/interviews",
  //       items: []
  //     },
  //     {
  //       label: "Points of View",
  //       path: "/articles/points-of-view",
  //       items: []
  //     },
  //     {
  //       label: "Profiles",
  //       path: "/articles/profiles",
  //       items: []
  //     },
  //     {
  //       label: "Guest Articles",
  //       path: "/articles/guest-articles",
  //       items: []
  //     },
  //     {
  //       label: "Marketing Initiative",
  //       path: "/articles/marketing-initiative",
  //       items: [
  //         // {
  //         //   label: "Advertorial",
  //         //   path: "/articles/marketing-initiative/advertorial",
  //         //   items: []
  //         // }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   label: "Media",
  //   path: "/media",
  //   items: [
  //     { label: "Television", path: "/media/television", items: [] },
  //     { label: "Digital", path: "/media/digital", items: [] },
  //     { label: "OTT Streaming", path: "/media/ott-streaming", items: [] },
  //     { label: "Social Media", path: "/media/social-media", items: [] },
  //     { label: "Print", path: "/media/print", items: [] },
  //     { label: "OOH", path: "/media/ooh", items: [] },
  //     { label: "Radio", path: "/media/radio", items: [] },
  //     { label: "Cinema", path: "/media/cinema", items: [] }
  //   ]
  // },
  {
    label: "Events",
    path: "/events",
    items: [
      {
        label: "Dashboard",
        path: "/events/dashboard",
        items: []
      },
      {
        label: "Roundtable",
        path: "/events/roundtable/pixpoint",
        items: [
          // { label: "Pixpoint Roundtable", path: "/events/roundtable/pixpoint", items: [] },
         
        ]
      },
      {
        label: "Webinar",
        path: "/events/webinar",
        items: [
          
        ]
      }
    ]
  },
  // {
  //   label: "More",
  //   path: "/more",
  //   items: [
  //     {
  //       label: "Creative Showcase",
  //       path: "/more/creative-showcase",
  //       items: [
  //         // { label: "Television", path: "/more/creative-showcase/television", items: [] },
  //         // { label: "Digital", path: "/more/creative-showcase/digital", items: [] },
  //         // { label: "OOH", path: "/more/creative-showcase/ooh", items: [] },
  //         // { label: "Print", path: "/more/creative-showcase/print", items: [] },
  //         // { label: "Radio", path: "/more/creative-showcase/radio", items: [] },
  //         // { label: "International", path: "/more/creative-showcase/international", items: [] }
  //       ]
  //     },
  //     { label: "Authors", path: "/authors", items: [] },
  //     // { label: "Contact Us", path: "/contact-us", items: [] }
  //   ]
  // }
];


 
export default menuItems