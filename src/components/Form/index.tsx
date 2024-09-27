'use client';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Checkbox } from '../ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Query = 'General Enquiry' | 'Support Request' | '';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  query: Query;
  message: string;
  consent: boolean;
};

const Form: React.FC = () => {
  const { toast } = useToast();
  const schema = yup.object().shape({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
    query: yup
      .string()
      .oneOf(
        ['General Enquiry', 'Support Request', ''],
        'Please select a query type.'
      )
      .required('Please select a query type.'),

    message: yup.string().required('This field is required'),
    consent: yup
      .boolean()
      .oneOf([true], 'You must consent to continue')
      .required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      query: '',
      message: '',
      consent: false,
    },
  });

  const handleSuccess = () => {
    toast({
      title: 'Message Sent!',
      description: "Thanks for completing the form. We'll be in touch soon!",
    });
    console.log('success');
  };

  console.log(errors);
  // Form submit handler
  const onSubmit = (data: FormValues) => {
    console.log('yesss');
    console.log(data);
    handleSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=' w-full my-10 sm:my-0'>
      <div className=' rounded-xl bg-white px-6 py-3 '>
        <h2 className='my-1 text-2xl font-bold text-grey-900'>Contact Us</h2>
        <div className='w-full gap-5 sm:flex lg:min-w-full'>
          <div className='my-2 flex-1'>
            <label htmlFor='firstName' className='text-xs text-grey-900'>
              First Name <span className='text-green-600'>*</span>
            </label>
            <input
              type='text'
              id='firstName'
              {...register('firstName')}
              className={`block border-[1px] focus:border-1 mt-2 h-10 w-full rounded-lg  px-3 py-1 focus:border-green-600 focus:outline-none ${
                errors.firstName ? 'border-red' : 'border-grey-500'
              }`}
            />
            <span className='text-xs text-red'>
              {errors.firstName?.message}
            </span>
          </div>
          <div className='my-2 flex-1'>
            <label htmlFor='lastName' className='text-xs text-grey-900'>
              Last Name <span className='text-green-600'>*</span>
            </label>
            <input
              type='text'
              id='lastName'
              {...register('lastName')}
              className={`block border-[1px] mt-2 h-10 w-full rounded-lg  px-3 py-1 focus:border-green-600 focus:outline-none ${
                errors.lastName ? 'border-red' : 'border-grey-500'
              }`}
            />
            <span className='text-xs text-red'>{errors.lastName?.message}</span>
          </div>
        </div>
        <div className='my-2'>
          <label htmlFor='email' className='text-xs text-grey-900'>
            Email Address <span>*</span>
          </label>
          <input
            type='text'
            id='email'
            {...register('email')}
            className={`block border-[1px]   mt-2 h-10 w-full rounded-lg px-3 py-1 focus:border-green-600 focus:outline-none ${
              errors.email ? 'border-red' : 'border-grey-500'
            }`}
          />
          <span className='text-xs text-red'>{errors.email?.message}</span>
        </div>
        <div className=''>
          <p className='text-xs text-grey-900'>
            Query type <span>*</span>
          </p>
          <RadioGroup
            className='mt-2'
            onValueChange={(value) => {
              setValue('query', value as Query);
              trigger('query');
            }}
          >
            <label
              className={`inline-flex w-full  h-11 items-center rounded-lg border-[1px]  px-4 py-1 ${
                watch('query') === 'General Enquiry'
                  ? 'border-green-600 bg-green-200'
                  : 'border-grey-500'
              }`}
              htmlFor='general'
            >
              <RadioGroupItem
                className='mx-1'
                id='general'
                value='General Enquiry'
                {...register('query')}
              />
              <span className='text-[13px] text-grey-900'>General Enquiry</span>
            </label>
            <label
              className={`inline-flex w-full  h-11 items-center rounded-lg border-[1px]  px-4 py-1 ${
                watch('query') === 'Support Request'
                  ? 'border-green-600 bg-green-200'
                  : 'border-grey-500'
              }`}
              htmlFor='support'
            >
              <RadioGroupItem
                className='mx-1'
                id='support'
                value='Support Request'
                {...register('query')}
              />
              <span className='text-[13px] text-grey-900'>Support Request</span>
            </label>
          </RadioGroup>
          <span className='text-xs text-red'>{errors.query?.message}</span>
        </div>
        <div className='my-2'>
          <label htmlFor='message' className='text-xs text-grey-900'>
            Message <span>*</span>
          </label>
          <textarea
            rows={4}
            id='message'
            {...register('message')}
            className={`block w-full rounded-lg border-[1px]  mt-2 p-3 focus:border-green-600 focus:outline-none ${
              errors.message ? 'border-red' : 'border-grey-500'
            }`}
          ></textarea>
          <span className='text-xs text-red'>{errors.message?.message}</span>
        </div>
        <div className=' items-center inline-flex gap-3'>
          <Checkbox
            id='consent'
            onCheckedChange={(checked) => {
              setValue('consent', checked === true);
              trigger('consent');
            }}
          />
          <div className='flex flex-col gap-1'>
            <label className='text-[13px] text-grey-900' htmlFor='consent'>
              I consent to being contacted by the team<span>*</span>
            </label>
            <span className=' text-xs text-red'>{errors.consent?.message}</span>
          </div>
        </div>
        <button
          type='submit'
          className='my-4 w-full rounded-md bg-green-600 py-3 text-center font-semibold text-white'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
