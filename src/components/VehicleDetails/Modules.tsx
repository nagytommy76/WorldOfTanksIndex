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
   let stage = 0
   const moduleTree: { [stage: string]: any } = {}
   // const moduleTree: any = []

   function recursion(module: any) {
      moduleTree[module.type] ||= []
      moduleTree[module.type].push(module)
      if (module.next_modules !== null) {
         if (module.next_modules.length > 1) {
            module.next_modules.map((moduleId: number) => {
               console.log(moduleId)
            })
         } else {
            recursion(modulesTree[Number(tank_id)].modules_tree[module.next_modules[0]])
         }
      } else stage++
   }

   for (const [key, module] of Object.entries(modulesTree[Number(tank_id)].modules_tree)) {
      if (module.is_default) {
         recursion(module)
      }
   }
   console.log(moduleTree)

   return (
      <div>
         <h1>Modules</h1>
      </div>
   )
}
