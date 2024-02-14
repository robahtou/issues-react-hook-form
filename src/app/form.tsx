'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';

import ServerAction from './actions';
import formSchema from './schema';
import type { FormSchema } from './schema';

import SubmitButton from '../components/SubmitButton';


function Form() {
  const {
    register,
    trigger,
    clearErrors,
    getValues,
    setValue,
    formState: { isValid, errors }
  } = useForm<FormSchema>({
      resolver:  ajvResolver(formSchema, { allErrors: true, allowUnionTypes: true }),
      mode: 'onSubmit',
      defaultValues: {
        title: '',
        firstName: '',
        lastName: '',
        age: ''
      }
  });

  const initialState = { success: false, errors: [] };
  const [serverReply, formAction] = useFormState(ServerAction, initialState);

  async function handleAction(FormData: FormData) {
    clearErrors();

    console.log('FormData', FormData);
    console.log('RHFData', getValues());

    // pre-processing
    const title = FormData.get('title');
    if (title === '') setValue('title', undefined);

    // trigger validation
    const isValid = await trigger();

    // if form is not valid, RHF will automatically set the errors
    console.log('isValid', isValid)
    if (!isValid) return;

    // post-processing
    setValue('age', Number(FormData.get('age')));

    // RHF data to pass to server action
    console.log('RHFData', getValues());

    return formAction(getValues());
  };

  console.log('useForm isValid', isValid);
  console.log('useForm errors', errors);

  return (
    <form action={handleAction}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title"
          type="text"
          placeholder="Title"
          {...register('title', { required: false })}
        />
      </div>

      <div>
        <label htmlFor="first_name">First name</label>
        <input id="first_name"
          type="text"
          placeholder="First name"
          {...register('firstName', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="last_name">Last name</label>
        <input id="last_name"
          type="text"
          placeholder="Last name"
          {...register('lastName', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input id="age"
          // type="number"
          type="string"
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
