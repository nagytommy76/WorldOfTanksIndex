export type Order = 'asc' | 'desc'

export interface Data {
   id: number
   nation: string
   type: string
   tier: number
   name: string
   price: number
}

export interface EnhancedTableProps {
   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
   order: Order
   orderBy: string
   rowCount: number
}

export interface HeadCell {
   disablePadding: boolean
   id: keyof Data
   label: string
   numeric: boolean
}
