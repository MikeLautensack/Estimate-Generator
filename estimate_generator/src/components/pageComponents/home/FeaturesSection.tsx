import FeatureCard from '../../misc/FeatureCard'
import { features } from '../../../utils/content'

export default function FeaturesSection() {
  return (
        <div id='hero bottom' className='w-full flex flex-col gap-2 items-center desktop:flex-row desktop:items-start py-4 bg-primary800'>

            <div className='w-full flex flex-col justify-start items-start'>
              <h3 className='font-bold text-[36px] text-center w-full my-4 desktop:pl-32 desktop:text-left text-primary100'>Check out Estimate Generators features</h3>
            </div>  
            
            <div className='flex flex-col mx-[64px] gap-8 tablet:flex-row'>
              {features.map((feature) => (
                <div className='basis-full' key={features.indexOf(feature)}>
                  <FeatureCard
                    icon={feature.icon}
                    heading={feature.heading}
                    paragraph={feature.paragraph}
                  />
                </div>
              ))}
            </div>

        </div>
  )
}
