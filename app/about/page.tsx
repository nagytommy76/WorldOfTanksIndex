import type { Metadata } from 'next'

import Divider from '@mui/material/Divider'

import AboutHero from '@/componentsAbout/AboutHero'
import FeatureCards from '@/componentsAbout/FeatureCards'
import HowToUse from '@/componentsAbout/HowToUse'
import DataSource from '@/componentsAbout/DataSource'
import Faq from '@/componentsAbout/Faq'
import Creator from '@/componentsAbout/Creator'
import Roadmap from '@/componentsAbout/Roadmap'

export const metadata: Metadata = {
   title: 'About | World of Tanks Index',
   description:
      'What is the World of Tanks Index? Vehicle stats straight from the game files, module and crew configurator, Marks of Excellence and Mastery Badge requirements.',
}

export default function page() {
   return (
      <section className='min-h-screen'>
         <AboutHero />
         <div className='max-w-[1650px] mx-auto px-4 xl:px-0 my-16 flex flex-col gap-16'>
            <FeatureCards />
            <Divider />
            <HowToUse />
            <Divider />
            <DataSource />
            <Divider />
            <Faq />
            <Divider />
            <Creator />
            <Divider />
            <Roadmap />
         </div>
      </section>
   )
}
