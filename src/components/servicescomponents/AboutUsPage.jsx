import React from 'react'
import { ThemeProvider } from '../../providers/ThemeContext'
import ServicesTeamSection from './ServicesTeamSection'
import ServicesClientSection from './ServicesClientsSection'

const AboutUsPage = () => {
  return (
    <div>
      <ThemeProvider>
          <ServicesTeamSection />
        <ServicesClientSection />
      </ThemeProvider>
    </div>
  )
}

export default AboutUsPage
