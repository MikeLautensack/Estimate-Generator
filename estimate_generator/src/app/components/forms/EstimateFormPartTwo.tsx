'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa'
import { useFieldArray, useFormContext } from 'react-hook-form'
import EstimateFormTable from '../tables/shadcn_ui_tables/estimateFormTable/EstimateFormTable'
import TaxSelector from '../TaxSelector'
import { formatPriceString } from '@/utils/formatingFunctions'

const EstimateFormPartTwo = () => {

  const [ customerName, setCustomerName ] = useState('')
  const [ customerEmail, setCustomerEmail ] = useState('')
  const [ projectAddress, setProjectAddress ] = useState('')
  const [ subtotal, setSubtotal ] = useState(0)
  const [ taxRate, setTaxRate ] = useState(.07)
  const [ tax, setTax ] = useState(0)
  const [ total, setTotal ] = useState(0)

  const { register, watch, setValue, getValues, control } = useFormContext()  

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'lineItems'
  })

  const calculateTotal = (): number => {
    let num = 0
    for(let i = 0; i < fields.length; i++) {
        num += getValues(`lineItems.${i}.amount`)
    }
    return num
  }

  const applyTotal = () => {
    const calculatedTotal = calculateTotal()
    setSubtotal(calculatedTotal)
    setValue('subtotal', calculatedTotal)
  }

  useEffect(() => {
    applyTotal()
  }, [fields])

  useEffect(() => {
    const currentTax = subtotal * taxRate
    setTax(currentTax)
    setValue('tax', currentTax)
    setValue('taxRate', taxRate)
    const total = subtotal + currentTax
    setTotal(total)
    setValue('total', total)
  }, [subtotal, taxRate])

  return (
    <div>
        <div>
            {}
            <label>Estimate Name</label>
            <input {...register("estimateName")}></input>
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
                    <textarea {...register("message")}></textarea>
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
    </div>
  )
}

export default EstimateFormPartTwo