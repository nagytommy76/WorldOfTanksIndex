import { NextResponse } from 'next/server'

export async function GET(
   req: Request,
   { params }: { params: Promise<{ tank_id: string; tank_name: string }> }
) {
   const { tank_id, tank_name } = await params
   // const url = `https://tomato.gg/_next/data/MibomUS6JqK7jWsXG9--J/en/tanks/${tank_id}/${tank_name}/EU.json`
   // const url = `https://tomato.gg/_next/data/yxdJe2YiBXUm30Jk6B22f/en/tanks/${tank_id}/${tank_name}/EU.json`
   try {
      const result = await fetch(`https://tomato.gg/_next/data/en/tanks/${tank_id}/${tank_name}/EU.json`)
      const html = await result.text()
      const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/)

      if (match) {
         const json = JSON.parse(match[1])
         const res = await fetch(
            `https://tomato.gg/_next/data/${json.buildId}/en/tanks/${tank_id}/${tank_name}/EU.json`,
            {
               headers: {
                  'User-Agent': 'Mozilla/5.0', // optional, helps avoid being blocked
               },
            }
         )
         const data = await res.json()
         return NextResponse.json(data.pageProps)
      }
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
   } catch (err) {
      return NextResponse.json({ error: err, details: (err as Error).message }, { status: 500 })
   }
}
