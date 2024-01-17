'use client'
import Image from "next/image";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";

import Dropdown from "@/components/shared/Dropdown";
import { FileUploader } from "@/components/shared/FileUploader";

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage, } from '@/components/ui/form'
import { Checkbox } from "@/components/ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/event.actions";

type EventFormProps = {
  userId: string
  type: 'Create' | 'Update'
}

const EventForm = ({ userId, type }: EventFormProps) => {
  // const [startDate, setStartDate] = useState(new Date());
  const { startUpload } = useUploadThing('imageUploader');
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<{
    title: string;
    categoryId: string;
    description: string;
    imageUrl: string;
    price: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    isFree: boolean;
    url: string
  }>(eventDefaultValues);


  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values)
    // const eventData = values;

    let uploadImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadImages = await startUpload(files);
      if (!uploadImages) {
        return;
      }
      uploadImageUrl = uploadImages[0].url;
    }
    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadImageUrl },
          userId,
          path: '/profile'
        })
        if (newEvent) {
          // form.reset(eventDefaultValues)
          form.reset()
          router.push(`/events/${ newEvent._id }`)
        }
      } catch (e) {
        console.log(e)
        // handleError(e)
      }
    }
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="flex flex-col gap-5">
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={ form.control }
            name="title"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder="Event title" { ...field } className='input-field'/>
                </FormControl>
                {/*<FormDescription>*/ }
                {/*  This is your public display name.*/ }
                {/*</FormDescription>*/ }
                <FormMessage/>
              </FormItem>
            ) }
          />
          <FormField
            control={ form.control }
            name="categoryId"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Dropdown onChangeHandler={ field.onChange } value={ field.value }/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            ) }
          />
        </div>
        {/*-----*/ }
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={ form.control }
            name="description"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='h-72'>
                  <Textarea placeholder="Description" { ...field }
                            className='textarea rounded-2xl'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            ) }
          />
          <FormField
            control={ form.control }
            name="imageUrl"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='h-72'>
                  <FileUploader
                    onFieldChange={ field.onChange }
                    imageUrl={ field.value }
                    setFiles={ setFiles }
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            ) }
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={ form.control }
            name="location"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='flex-center h-[54px]'>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2'>
                    <Image src="/assets/icons/location-grey.svg" width={ 24 } height={ 24 } alt="calender"/>
                    <Input placeholder="Event Location or Online" { ...field } className='input-field'/>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            ) }
          />
        </div>
        {/*-----*/ }
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={ form.control }
            name="startDateTime"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='flex-center h-[54px]'>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2'>
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calender"
                      width={ 24 }
                      height={ 24 }
                      className='filter invert'
                    />
                    <p className='ml-3 whitespace-nowrap text-grey-600'>Start Date</p>
                    <DatePicker
                      selected={ field.value }
                      onChange={ (date: Date) => field.onChange(date) }
                      showTimeSelect
                      timeInputLabel='Time'
                      dateFormat="MMMM d, yyyy h:mm aa"
                      wrapperClassName='datePicker'
                    />
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            ) }
          />
          <FormField
            control={ form.control }
            name="endDateTime"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='flex-center h-[54px]'>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2'>
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calender"
                      width={ 24 }
                      height={ 24 }
                      className='filter invert'
                    />
                    <p className='ml-3 whitespace-nowrap text-grey-600'>End Date</p>
                    <DatePicker
                      selected={ field.value }
                      onChange={ (date: Date) => field.onChange(date) }
                      showTimeSelect
                      timeInputLabel='Time'
                      dateFormat="MMMM d, yyyy h:mm aa"
                      wrapperClassName='datePicker'
                    />
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            ) }
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={ form.control }
            name="price"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='flex-center h-[54px]'>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2'>
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="dollar"
                      width={ 24 }
                      height={ 24 }
                      className='filter invert'
                    />
                    <Input type='number'
                           placeholder="Price" { ...field }
                           className='p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0
                           focus-visible:ring-0 focus-visible:ring-offset-0'/>
                    <FormField
                      control={ form.control }
                      name="isFree"
                      render={ ({ field }) => (
                        <FormItem>
                          <FormControl className='flex flex-center'>
                            <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2'>
                              <label htmlFor="isFree" className='whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Free Ticket</label>
                              <Checkbox
                                onCheckedChange={ field.onChange }
                                checked={ field.value }
                                id='isFree'
                                className='mr-3 dark:border-white h-5 w-5 border-2 border-pink-500'/>
                            </div>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      ) }
                    />
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            ) }
          />

          <FormField
            control={ form.control }
            name="url"
            render={ ({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='flex-center h-[54px]'>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2'>
                    <Image src="/assets/icons/link.svg" width={ 24 } height={ 24 } alt="calender"/>
                    <Input placeholder="URL" { ...field } className='input-field'/>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            ) }
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={ form.formState.isSubmitting }
          className="button col-span-2 w-full"
        >
          { form.formState.isSubmitting ? ('Submitting...') : `${ type } Event ` }
        </Button>
      </form>
    </Form>
  )
}

export default EventForm
