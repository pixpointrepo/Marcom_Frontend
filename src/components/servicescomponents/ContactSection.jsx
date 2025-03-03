import React from 'react'
import ServicesContactSection from './ServicesContactSection'
import { ThemeProvider } from "../../providers/ThemeContext"

const ContactSection = () => {
  return (
      <ThemeProvider>
    <ServicesContactSection/>
    </ThemeProvider>
  )
}

export default ContactSection
