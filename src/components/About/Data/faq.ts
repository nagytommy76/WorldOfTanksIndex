import type { FaqItem } from '@/types/About/aboutTypes'

export const FAQ_ITEMS: FaqItem[] = [
   {
      question: 'Is this an official Wargaming website?',
      answer:
         'No. World of Tanks Index is a fan-made project and is not endorsed by Wargaming.net in any way. World of Tanks, Wargaming.net and all associated properties are trademarks or registered trademarks of their respective owners.',
   },
   {
      question: 'What are Marks of Excellence?',
      answer:
         'Marks of Excellence (gun marks) are awarded for your average combined damage (dealt + assisted) on a vehicle compared to other players. Reaching the top 65%, 85% and 95% earns 1, 2 and 3 marks, displayed on your gun barrel in battle.',
   },
   {
      question: 'Why might the stats differ from other websites?',
      answer:
         'Vehicle data is read directly from the game client files, so it reflects the current client version. Derived values (for example crew-affected stats) are calculated with the in-game formulas, and small rounding differences can occur.',
   },
   {
      question: 'Which server’s data is shown?',
      answer:
         'Marks of Excellence and Mastery Badge requirements are currently shown for the EU server. Vehicle characteristics are the same on every server.',
   },
   // {
   //    question: 'Is it free?',
   //    answer:
   //       'Yes, completely free and without ads. The source code is available on GitHub.',
   // },
]
