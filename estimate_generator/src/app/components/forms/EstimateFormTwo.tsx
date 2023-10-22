'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { EstimateFormTwoValues } from '../../../types/estimates'
import EstimateFormTable from '../tables/shadcn_ui_tables/estimateFormTable/EstimateFormTable'

const EstimateFormTwo = () => {

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },  } = useForm<EstimateFormTwoValues>({
        defaultValues: {
            lineItems: [{
                item: '',
                description: '',
                quantity: 0,
                rateType: 0,
                price: 0,
                amount: 0
            }]
        }
    })  
    
  const onSubmit: SubmitHandler<EstimateFormTwoValues> = (data) => {
    console.log(data)
  }

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'lineItems', // unique name for your Field Array
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            {}
            <label>Estimate Name</label>
            <input {...register("estimateName")}></input>
        </div>
        <div>
            <div>
                <p></p>
                <p></p>
                <p></p>
            </div>
            <div>
                <div>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                />
            </div>
            <div>
                <Button
                    type='button'
                    onClick={() => append({
                        item: '',
                        description: '',
                        quantity: 0,
                        rateType: 0,
                        price: 0,
                        amount: 0
                    })}
                >
                    New Line Item
                </Button>
                <EstimateFormTable 
                    fields={fields}
                    register={register}
                />
            </div>
            <div>
                <div>
                    <label></label>
                    <textarea {...register("message")}></textarea>
                </div>
                <div>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </div>
            <div>
                <Button
                    type='button'
                    className=''
                >
                    <FaPlus />
                    Preview Estimate
                </Button>
                <Button
                    type='submit'
                    className=''
                >
                    <FaPlus />
                    Save
                </Button>
                <Button
                    type='button'
                    className=''
                >
                    <FaPlus />
                    Save & Send
                </Button>
            </div>
        </div>
    </form>
  )
}

export default EstimateFormTwo