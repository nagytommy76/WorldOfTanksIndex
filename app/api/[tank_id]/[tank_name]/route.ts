import { NextResponse } from 'next/server'

export async function GET(
   req: Request,
   { params }: { params: Promise<{ tank_id: string; tank_name: string }> }
) {
   const { tank_id, tank_name } = await params
   const url = `https://tomato.gg/_next/data/MibomUS6JqK7jWsXG9--J/en/tanks/${tank_id}/${tank_name}/EU.json`
   console.log(await params)
   try {
      if (tank_id && tank_name) {
         //  console.log(tankId, tankName)
         //  console.log('CSASÉÁLÉSDSDGÉSDG')
      }
      const res = await fetch(url, {
         headers: {
            'User-Agent': 'Mozilla/5.0', // optional, helps avoid being blocked
         },
      })

      if (!res.ok) {
         return NextResponse.json({ error: 'Failed to fetch data' }, { status: res.status })
      }

      const data = await res.json()
      return NextResponse.json(data)
   } catch (err) {
      return NextResponse.json({ error: 'Fetch error', details: (err as Error).message }, { status: 500 })
   }
}
