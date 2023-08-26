import Button from '../../../components/buttonComponents/Button'
import FeatureCard from '../../../components/FeatureCard'
import { features } from '../../../../utils/content'

export default function HeroSection() {
  return (
    <section id='hero' className='w-full'>

        {/**
         *  Hero Top
         */}
        <div id='hero top' className='flex flex-col justify-center items-center tablet:items-start h-[32rem]'>
          
          {/**
           *  Hero Content
           */}
          <div id='hero content' className='flex flex-col gap-2 tablet:mx-16 tablet:max-w-[35rem] desktop:ml-32 desktop:max-w-[40rem]'>
            <h1 className='text-secondary500 text-[24px] font-bold text-center tablet:text-[54px] tablet:text-left'>Welcome to Estimate Generator</h1>
            <div className='w-full flex gap-4 my-8'>
              <Button
                  className='w-[50%] bg-primary500 text-primary100 p-2 text-[14px] font-semibold max-w-[248px]'
              >
                Sign Up
              </Button>
              <Button
                  className='w-[50%] bg-primar100 border-2 border-primary500 text-primary500 p-2 font-medium text-[14px] max-w-[248px] font text-base tablet:hidden'
              >
                  Log In
              </Button>
            </div>
          </div>

          <div id='hero img'>

          </div>

        </div>

        {/**
         *  Hero Bottom
         */}
        <div id='hero bottom' className='w-full flex flex-col gap-2 items-center my-4 desktop:flex-row desktop:items-start'>

          <div className='w-full flex flex-col justify-start items-start'>
            <h3 className='font-bold text-[36px] text-center w-full my-4 desktop:pl-32 desktop:text-left text-secondary500'>Check out Estimate Generators features</h3>
          </div>

          <div className='flex flex-col mx-[64px] my-4 gap-8 tablet:flex-row'>
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

      </section>
  )
}
