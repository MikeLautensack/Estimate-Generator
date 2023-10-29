'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa'
import { SubmitHandler, useFieldArray, useForm, FormProvider } from 'react-hook-form'
import { EstimateFormTwoValues } from '../../../types/estimates'
import EstimateFormTable from '../tables/shadcn_ui_tables/estimateFormTable/EstimateFormTable'
import TaxSelector from '../TaxSelector'
import { formatPriceString } from '@/utils/formatingFunctions'
import { EstimateFormTwoProps } from '../../../types/estimates'
import { Form } from '../ui/form'

const EstimateFormTwo = ({
    formOneData
}: EstimateFormTwoProps) => {

  const [ customerName, setCustomerName ] = useState('')
  const [ customerEmail, setCustomerEmail ] = useState('')
  const [ projectAddress, setProjectAddress ] = useState('')
  const [ subtotal, setSubtotal ] = useState(0)
  const [ taxRate, setTaxRate ] = useState(.07)
  const [ tax, setTax ] = useState(0)
  const [ total, setTotal ] = useState(0)
  const methods = useForm<EstimateFormTwoValues>({
        defaultValues: {
            lineItems: [{
                item: '',
                description: '',
                quantity: null,
                rateType: 'unit',
                price: null,
                amount: 0
            }],
            taxRate: taxRate
        }
  })  

  const control = methods.control
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'lineItems'
  })
    
  const onSubmit: SubmitHandler<EstimateFormTwoValues> = (data) => {
    console.log(data)
  }

  const calculateTotal = (): number => {
    let num = 0
    for(let i = 0; i < fields.length; i++) {
        num += methods.getValues(`lineItems.${i}.amount`)
    }
    return num
  }

  const applyTotal = () => {
    const calculatedTotal = calculateTotal()
    setSubtotal(calculatedTotal)
    methods.setValue('subtotal', calculatedTotal)
  }

  useEffect(() => {
    applyTotal()
  }, [fields])

  useEffect(() => {
    const currentTax = subtotal * taxRate
    setTax(currentTax)
    methods.setValue('tax', currentTax)
    methods.setValue('taxRate', taxRate)
    const total = subtotal + currentTax
    setTotal(total)
    methods.setValue('total', total)
  }, [subtotal, taxRate])

  useEffect(() => {
    if(formOneData.customer == null) {
        setCustomerName(formOneData.name as string)
        setCustomerEmail(formOneData.email as string)
        setProjectAddress(formOneData.address as string)
    } else {
        setCustomerName(formOneData.customer.name as string)
        setCustomerEmail(formOneData.customer.email as string)
        setProjectAddress(formOneData.customer.address as string)
    }
  }, [])

  return (
    <FormProvider {...methods}>
        <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div>
                    {}
                    <label>Estimate Name</label>
                    <input {...methods.register("estimateName")}></input>
                </div>
                <div>
                    <div>
                        <p>{customerName}</p>
                        <p>{customerEmail}</p>
                        <p>{projectAddress}</p>
                    </div>
                    <div>
                        <div>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>

                    </div>
                    <div>
                        <Button
                            type='button'
                            onClick={() => {
                                prepend({
                                    item: '',
                                    description: '',
                                    quantity: null,
                                    rateType: 'unit',
                                    price: null,
                                    amount: 0
                                })
                            }}
                        >
                            New Line Item
                        </Button>
                        <EstimateFormTable 
                            fields={fields}
                            applyTotal={applyTotal}
                            remove={remove}
                        />
                    </div>
                    <div>
                        <div>
                            <label></label>
                            <textarea {...methods.register("message")}></textarea>
                        </div>
                        <div>
                            <div>
                                <p>Subtotal</p>
                                <p>{formatPriceString(subtotal)}</p>
                            </div>
                            <div>
                                <p>Tax</p>
                                <div>
                                    <TaxSelector 
                                        taxRate={taxRate}
                                        setTaxRate={setTaxRate}
                                    />
                                    <p>{formatPriceString(tax)}</p>
                                </div>
                            </div>
                            <div>
                                <p>Total</p>
                                <p>{formatPriceString(total)}</p>
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
        </Form> 
    </FormProvider>
  )
}

export default EstimateFormTwo