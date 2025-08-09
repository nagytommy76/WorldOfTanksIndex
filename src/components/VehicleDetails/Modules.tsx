import React from 'react'

export default async function Modules({
   modulesTree,
   tank_id,
}: {
   tank_id: string
   modulesTree: {
      [tank_id: number]: {
         description: string
         modules_tree: {
            [module_id: number]: any
         }
      }
   }
}) {
   const moduleTree: { [stage: string]: any } = {}

   Object.values(modulesTree[Number(tank_id)].modules_tree).map((module) => {
      moduleTree[module.type] ||= []
      moduleTree[module.type].push(module)
      if (module.next_modules !== null) {
         const nextModule = modulesTree[Number(tank_id)].modules_tree[module.next_modules[0]]
         console.log(nextModule)
      }

      if (Object.keys(modulesTree[Number(tank_id)].modules_tree).includes(module.module_id.toString())) {
      }
      // console.log(module)
   })

   // console.log(modulesTree[Number(tank_id)].modules_tree)
   return (
      <div>
         <h1>Modules</h1>
      </div>
   )
}
