'use client';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Checkbox } from '../ui';
import { useFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { error } from 'console';

type Query = 'General Enquiry' | 'Support Request' | '';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  query: Query;
  message: string;
  consent: boolean;
};

const Forms: React.FC = () => {
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      query: '',
      message: '',
      consent: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('This field is required'),
      lastName: Yup.string().required('This field is required'),
      email: Yup.string()
        .required('Email is required')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
      // query: Yup.string()
      //   .oneOf(
      //     ['General Enquiry', 'Support Request', ''],
      //     'Please select a query type.'
      //   )
      //   .required('Please select a query type.'),
      message: Yup.string().required('This field is required'),
      // consent: Yup.boolean()
      //   .oneOf([true], 'You must consent to continue')
      //   .required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleSuccess();
    },
  });

  // const initialValues: FormValues = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   query: '',
  //   message: '',
  //   consent: false,
  // };

  const handleSuccess = () => {
    toast({
      title: 'Message Sent!',
      description: "Thanks for completing the form. We'll be in touch soon!",
    });
    console.log('success');
  };

  // const handleSubmit = (values: FormikValues, { setSubmitting }: any) => {
  //   setSubmitting(false);
  //   console.log(values);
  //   handleSuccess();
  // };

  return (
    <form onSubmit={formik.handleSubmit} className=' w-full my-10 sm:my-0'>
      <div className=' rounded-xl bg-white px-6 py-3 '>
        <h2 className='my-1 text-2xl font-bold text-grey-900'>Contact Us</h2>
        <div className='w-full gap-5 sm:flex lg:min-w-full'>
          <div className='my-2 flex-1'>
            <label htmlFor='firstName' className='text-xs text-grey-900'>
              First Name <span className='text-green-600'>*</span>
            </label>
            <input
              id='firstName'
              type='text'
              {...formik.getFieldProps('firstName')}
              className={`block border focus:border-1 mt-2 h-10 w-full rounded-lg  px-3 py-1 focus:border-green-600 focus:outline-none ${
                formik.errors.message ? 'border-red' : 'border-grey-500'
              }`}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <span className='text-xs text-red'>
                {formik.errors.firstName}
              </span>
            ) : null}
          </div>
          <div className='my-2 flex-1'>
            <label htmlFor='lastName' className='text-xs text-grey-900'>
              Last Name <span className='text-green-600'>*</span>
            </label>
            <input
              id='lastName'
              type='text'
              {...formik.getFieldProps('lastName')}
              className={`block border mt-2 h-10 w-full rounded-lg  px-3 py-1 focus:border-green-600 focus:outline-none ${
                formik.errors.message ? 'border-red' : 'border-grey-500'
              }`}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <span className='text-xs text-red'>{formik.errors.lastName}</span>
            ) : null}
          </div>
        </div>
        <div className='my-2'>
          <label htmlFor='email' className='text-xs text-grey-900'>
            Email Address <span>*</span>
          </label>
          <input
            type='text'
            id='email'
            {...formik.getFieldProps('email')}
            className={`block border  mt-2 h-10 w-full rounded-lg px-3 py-1 focus:border-green-600 focus:outline-none ${
              formik.errors.message ? 'border-red' : 'border-grey-500'
            }`}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className='text-xs text-red'>{formik.errors.email}</span>
          ) : null}
        </div>
        <div className=''>
          <p className='text-xs text-grey-900'>
            Query type <span>*</span>
          </p>
          <RadioGroup
            className='mt-2'
            value={formik.values.query} // Control the value from Formik
            onValueChange={(value) => formik.setFieldValue('query', value)}
          >
            <label
              className={`inline-flex w-full  h-11 items-center rounded-lg border border-grey-500  px-4 py-1`}
              htmlFor='general'
            >
              <RadioGroupItem
                className='mx-1'
                id='general'
                value='General Enquiry'
              />
              <span className='text-[13px] text-grey-900 '>
                General Enquiry
              </span>
            </label>
            <label
              className={`inline-flex w-full  h-11 items-center rounded-lg border border-grey-500  px-4 py-1`}
              htmlFor='support'
            >
              <RadioGroupItem
                className='mx-1'
                id='support'
                value='Support Request'
              />
              <span className='text-[13px] text-grey-900'>Support Request</span>
            </label>
          </RadioGroup>
          {formik.touched.query && formik.errors.query ? (
            <span className='text-xs text-red'>{formik.errors.query}</span>
          ) : null}
        </div>
        <div className='my-2'>
          <label htmlFor='message' className='text-xs text-grey-900'>
            Message <span>*</span>
          </label>
          <textarea
            rows={4}
            id='message'
            {...formik.getFieldProps('message')}
            className={`block w-full rounded-lg border  mt-2 p-3 focus:border-green-600 focus:outline-none ${
              formik.errors.message ? 'border-red' : 'border-grey-500'
            }`}
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <span className='text-xs text-red'>{formik.errors.message}</span>
          ) : null}
        </div>
        <div className=' items-center inline-flex gap-3'>
          <Checkbox
            id='consent'
            checked={formik.values.consent}
            onCheckedChange={(checked) =>
              formik.setFieldValue('consent', checked === true)
            }
          />
          <div className='flex flex-col gap-1'>
            <label className='text-[13px] text-grey-900' htmlFor='consent'>
              I consent to being contacted by the team<span>*</span>
            </label>
            {/* <ErrorMessage
              name='consent'
              component='span'
              className='text-xs text-red'
            /> */}
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

export default Forms;
