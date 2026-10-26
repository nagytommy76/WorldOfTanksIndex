import { render, screen, fireEvent } from '@testing-library/react'

import AboutPage from '@/app/about/page'
import { FEATURES, HOW_TO_STEPS } from '@/componentsAbout/Data/features'
import { FAQ_ITEMS } from '@/componentsAbout/Data/faq'
import { ROADMAP_ITEMS } from '@/componentsAbout/Data/roadmap'

beforeEach(() => {
   render(<AboutPage />)
})

describe('Test About page', () => {
   it('should render the hero heading and CTA buttons', () => {
      expect(screen.getByRole('heading', { level: 1, name: /About the World of Tanks Index/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Browse Tech Tree/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Explore Premium/i })).toBeInTheDocument()
   })
   it('should render every section title', () => {
      const titles = [
         /What you can do/i,
         /How to use it/i,
         /Where the data comes from/i,
         /Frequently asked questions/i,
         /About the creator/i,
         /Future plans/i,
      ]
      titles.forEach((title) => expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument())
   })
   it('should render all features and steps', () => {
      FEATURES.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument())
      HOW_TO_STEPS.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument())
   })
   it('should expand a FAQ item on click', () => {
      const { question } = FAQ_ITEMS[0]
      const summary = screen.getByRole('button', { name: question })
      expect(summary).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(summary)
      expect(summary).toHaveAttribute('aria-expanded', 'true')
   })
   it('should render roadmap items with their status chip', () => {
      ROADMAP_ITEMS.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument())
      expect(screen.getAllByText(/Planned|In progress|Done/).length).toBe(ROADMAP_ITEMS.length)
   })
})
