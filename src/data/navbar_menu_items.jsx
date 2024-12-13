import allNewsArticles from "./articles";


const newsCategories = Object.values(allNewsArticles).map((categoryData) => ({
  label: categoryData.category,
  urlSlug: categoryData.urlSlug,
}));

const newsCategoryItems = newsCategories.map((category) => ({
  label: category.label,
  path: `/news/${category.urlSlug}`,
  items: []
}));



const menuItems = [
  {
    label: "Home",
    path: "/",
    items: [] // No dropdown
  },
  {
    label: "News",
    path: "/news",
    items: newsCategoryItems // Assume this is already consistent with `items`
  },
  {
    label: "Articles",
    path: "/articles",
    items: [
      {
        label: "Interviews",
        path: "/articles/interviews",
        items: []
      },
      {
        label: "Points of View",
        path: "/articles/points-of-view",
        items: []
      },
      {
        label: "Profiles",
        path: "/articles/profiles",
        items: []
      },
      {
        label: "Guest Articles",
        path: "/articles/guest-articles",
        items: []
      },
      {
        label: "Marketing Initiative",
        path: "/articles/marketing-initiative",
        items: [
          {
            label: "Advertorial",
            path: "/articles/marketing-initiative/advertorial",
            items: []
          }
        ]
      }
    ]
  },
  {
    label: "Media",
    path: "/media",
    items: [
      { label: "Television", path: "/media/television", items: [] },
      { label: "Digital", path: "/media/digital", items: [] },
      { label: "OTT Streaming", path: "/media/ott-streaming", items: [] },
      { label: "Social Media", path: "/media/social-media", items: [] },
      { label: "Print", path: "/media/print", items: [] },
      { label: "OOH", path: "/media/ooh", items: [] },
      { label: "Radio", path: "/media/radio", items: [] },
      { label: "Cinema", path: "/media/cinema", items: [] }
    ]
  },
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
        path: "/events/roundtable",
        items: [
          { label: "Future Finance", path: "/events/roundtable/future-finance", items: [] },
          { label: "MGID Roundtable", path: "/events/roundtable/mgid-roundtable", items: [] },
          { label: "Adobe Creative Minds", path: "/events/roundtable/adobe-creative-minds", items: [] }
        ]
      },
      {
        label: "Webinar",
        path: "/events/webinar",
        items: [
          { label: "Gen AI-Masterclass", path: "/events/webinar/gen-ai-masterclass", items: [] },
          { label: "Communicon", path: "/events/webinar/communicon", items: [] },
          { label: "Marketing Through Leaders", path: "/events/webinar/marketing-through-leaders", items: [] }
        ]
      }
    ]
  },
  {
    label: "More",
    path: "/more",
    items: [
      {
        label: "Creative Showcase",
        path: "/more/creative-showcase",
        items: [
          { label: "Television", path: "/more/creative-showcase/television", items: [] },
          { label: "Digital", path: "/more/creative-showcase/digital", items: [] },
          { label: "OOH", path: "/more/creative-showcase/ooh", items: [] },
          { label: "Print", path: "/more/creative-showcase/print", items: [] },
          { label: "Radio", path: "/more/creative-showcase/radio", items: [] },
          { label: "International", path: "/more/creative-showcase/international", items: [] }
        ]
      },
      { label: "Authors", path: "/authors", items: [] },
      { label: "Contact Us", path: "/contact-us", items: [] }
    ]
  }
];


 
export default menuItems