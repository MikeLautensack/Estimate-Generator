'use client'

import React from 'react'
import Button from '../Button'
import { useForm, SubmitHandler } from "react-hook-form"
import { profileFormProps } from '../../types/formTypes'

const ProfileForm = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<profileFormProps>()

  const onSubmit: SubmitHandler<profileFormProps> = async (data) => {
    const res = await fetch('http://localhost:3000/api/users/profile/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
  }

  return (
    <form
        className='bg-primary50 p-4 w-4/5 rounded tablet:w-3/5 desktop:w-1/2 max-w-xl'
        onSubmit={handleSubmit(onSubmit)}
    >
        <h1 className='text-[32px] font-bold font-sans text-secondary500 text-center'>Complete Profle</h1>
        <div className='flex flex-col items-center tablet:flex-row'>
            <div className='flex flex-col w-1/2 p-2'>
                <h2 className='text-[18px] font-bold font-sans text-secondary500 text-center'>Profile Photo</h2>
                <div className='flex flex-col gap-2 tablet:flex-row my-2 items-center'>
                    <div className='w-1/2'>
                        <div className='aspect-square rounded-full border-2 border-primary700 object-cover'>
                            {/*<Image />*/}
                        </div>
                    </div>
                    <div className='flex flex-col tablet:w-1/2 justify-center gap-2'>
                        <Button
                            className='text-base font-medium font-sans text-primary500 border-2 border-primary500 rounded p-1'                         >
                            Upload Photo
                        </Button>
                        <Button
                            className='text-base font-normal font-sans text-primary300'
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
            <div className='p-2'>
                <h2 className='text-[18px] font-normal font-sans text-secondary500'>Image requirments:</h2>
                <ol className=''>
                    <li className='text-[14px] font-normal font-sans text-secondary500'>1. Min. 400 x 400px</li>
                    <li className='text-[14px] font-normal font-sans text-secondary500'>2. Max. 2MB</li>
                    <li className='text-[14px] font-normal font-sans text-secondary500'>3. Your face or company logo</li>
                </ol>
            </div>
        </div>
        <div className=''>
            <h3 className='text-[18px] font-bold font-sans text-secondary500'>Profile Details</h3>
            <div className=''>
                <label className=''>Business or Contractor Name</label>
                <input
                    className='w-full rounded p-1'
                    {...register("businessName")}
                ></input>
            </div>
            <div className=''>
                <label className=''>Business Address</label>
                <input
                    className='w-full rounded p-1'
                    {...register("businessAddress")}
                ></input>
            </div>
            <div className=''>
                <label className=''>Business Email</label>
                <input
                    className='w-full rounded p-1'
                    {...register("businessEmail")}
                ></input>
            </div>
            <div className=''>
                <label className=''>Business Phone</label>
                <input
                    className='w-full rounded p-1'
                    {...register("businessPhone")}
                ></input>
            </div>
            <div className='w-full flex justify-end'>
                <Button
                    className='bg-primary500 text-primary100 p-2 my-2 rounded'
                >
                    Save
                </Button>
            </div>
        </div>
    </form>
  )
}

export default ProfileForm