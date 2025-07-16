import React from 'react'

export default function Footer() {
   return (
      <footer className='w-full h-36 flex flex-col justify-center items-center gap-1 opacity-30'>
         <h1>Made by Thomas Nagy ( nagytommy93 )</h1>
         <div>Social links</div>
         <small>
            This application is not endorsed by
            <a className='hover:underline' href='https://www.wargaming.net/en' target='_blank'>
               {' '}
               Wargaming.net{' '}
            </a>
            in any way.
         </small>
         <small>
            World of Tanks, Wargaming.net, and all associated properties are trademarks or registered
            trademarks of their respective owners.
         </small>
      </footer>
   )
}
