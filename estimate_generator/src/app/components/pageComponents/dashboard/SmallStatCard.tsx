import { SmallStatCardProps } from "@/types/types"

export default function SmallStatCard({ heading, data }: SmallStatCardProps) {
  return (
    <div className=''>
        <h2 className=''>{heading}</h2>
        <h1 className=''>{data}</h1>
    </div>
  )
}
