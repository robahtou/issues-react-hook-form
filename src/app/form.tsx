'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';

import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

import ServerAction from './actions';
import formSchema from './schema';
import type { FormSchema } from './schema';

import SubmitButton from '../components/SubmitButton';


const ajv = new Ajv({
  allErrors: true,
  allowUnionTypes: true,
  coerceTypes: true
});
ajvErrors(ajv, {
  singleError: true,
  keepErrors: false,
});
const validate = ajv.compile(formSchema);


function Form() {
  const {
    register,
    clearErrors,
    getValues,
    setError,
    formState: { isValid, errors }
  } = useForm<FormSchema>({
      mode: 'onSubmit'
  });

  const initialState = { success: false, errors: [] };
  const [serverReply, formAction] = useFormState(ServerAction, initialState);

  async function handleAction(FormData: FormData) {
    clearErrors();

    console.log('FormData', FormData);
    console.log('RHFData', getValues());

    // pre-processing optional field values by removing empty strings &
    // prevent sending `undefined` to the server
    const title = FormData.get('title');
    if (title === '') FormData.delete('title');

    const _Formdata = {};
    for (const pair of FormData.entries()) {
      _Formdata[pair[0]] = pair[1];
    }

    console.log('_Formdata', _Formdata);

    // AJV validation
    try {
      const data = await validate(_Formdata);

      console.log('AJV data', data);
      return formAction(_Formdata);

    } catch (error) {
      if (!(error instanceof Ajv.ValidationError)) throw error;

      error.errors.forEach(err => {
        const { instancePath, message } = err;
        // Errors are set on RHF fields
        console.log(err)
        setError(instancePath.replace('/', ''), {
          message
        });
      });

      return;
    }
  };

  // handle responses from the server
  useEffect(() => {
    if (!serverReply.success) {
      serverReply.errors.forEach(err => {
        const { instancePath, message } = err;
        setError(instancePath.replace('/', ''), {
          message
        });
      });
    }

  }, [serverReply]);

  console.log('useForm isValid', isValid);
  console.log('useForm errors', errors);
  console.log(serverReply);

  return (
    <form action={handleAction}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title"
          type="text"
          placeholder="Title"
          {...register('title', { required: false })}
        />
        <span>
          {errors && errors.title && errors.title.message}
        </span>
      </div>

      <div>
        <label htmlFor="first_name">First name</label>
        <input id="first_name"
          type="text"
          placeholder="First name"
          {...register('firstName', { required: true })}
        />
        <span>
          {errors && errors.firstName && errors.firstName.message}
        </span>
      </div>

      <div>
        <label htmlFor="last_name">Last name</label>
        <input id="last_name"
          type="text"
          placeholder="Last name"
          {...register('lastName', { required: true })}
        />
        <span>
          {errors && errors.lastName && errors.lastName.message}
        </span>
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input id="age"
          type="text"
          placeholder="Age"
          {...register('age', { required: true })}
        />
        <span>
          {errors && errors.age && errors.age.message}
        </span>
      </div>

      <SubmitButton />
    </form>
  );
}


export default Form;
