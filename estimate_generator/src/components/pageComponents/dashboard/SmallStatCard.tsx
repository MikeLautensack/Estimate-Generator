import { SmallStatCardProps } from "@/types/types"

export default function SmallStatCard({ heading, data }: SmallStatCardProps) {
  return (
    <div className='border border-primary500 p-2'>
        <h2 className=''>{heading}</h2>
        <h1 className=''>{data}</h1>
    </div>
  )
}
