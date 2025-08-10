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

   for (const [key, module] of Object.entries(modulesTree[Number(tank_id)].modules_tree)) {
      // moduleTree.push(module)
      // console.log('Key: ', key, 'Module: ', module)
      if (module.is_default) {
         moduleTree[module.type] ||= []
         moduleTree[module.type].push(module)
         console.log(module)
      }

      // console.log(moduleTree)
   }

   // console.log(modulesTree[Number(tank_id)].modules_tree)
   return (
      <div>
         <h1>Modules</h1>
      </div>
   )
}
