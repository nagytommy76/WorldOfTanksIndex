import type { SvgIconComponent } from '@mui/icons-material'

export interface Feature {
   title: string
   description: string
   icon: SvgIconComponent
   href?: string
}

export interface HowToStep {
   label: string
   description: string
}

export interface FaqItem {
   question: string
   answer: string
}

export type RoadmapStatus = 'planned' | 'in-progress' | 'done'

export interface RoadmapItem {
   title: string
   description: string
   status: RoadmapStatus
}
