import React from 'react'
import ServicesHomeSection from "./ServicesHomeSection";
import ServicesSection from "./ServicesSection";
import ServicesMethodologySection from "./ServicesMethodologySection";
import ServicesTeamSection from "./ServicesTeamSection";
import ServicesClientSection from "./ServicesClientsSection";
import ServicesContactSection from "./ServicesContactSection";
import { ThemeProvider } from "../../providers/ThemeContext";
import ServicesNavbar from "./ServicesNavbar";

  // Stacked Sections for /products
  const MainPage = () => (
    <div>
      <ThemeProvider>
        <ServicesNavbar />
        <ServicesHomeSection />
        <ServicesSection />
        <ServicesMethodologySection />
        {/* Team amd client */}
        {/* <ServicesTeamSection />
        <ServicesClientSection /> */}
     
      </ThemeProvider>
    </div>
  );


export default MainPage
