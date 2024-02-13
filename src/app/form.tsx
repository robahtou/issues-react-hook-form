'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
      resolver: zodResolver(formSchema),
      mode: 'onSubmit',
      defaultValues: {
        title: '',
        firstName: '',
        lastName: ''
      }
  });

  const initialState = { success: false, errors: [] };
  const [serverReply, formAction] = useFormState(ServerAction, initialState);

  const handleFormAction = async (FormData: FormData) => {
    clearErrors();

    console.log('FormData', FormData);
    console.log('RHFData', getValues());

    // pre-processing
    // if you don't do this `title` we be an empty string and you'll have to `setValue` to `undefined`
    const title = FormData.get('title');
    if (title === '') FormData.delete('title');

    // trigger validation
    const isValid = await trigger()

    // if form is not valid, RHF will automatically set the errors
    console.log('isValid', isValid)
    if (!isValid) return;

    // post-processing
    setValue('age', Number(FormData.get('age')));

    // RHF should show the mutates values
    console.log('RHFData', getValues());

    return formAction(getValues());
  };

  console.log('useForm isValid', isValid);
  console.log('useForm errors', errors);

  return (
    <form action={handleFormAction}>
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
