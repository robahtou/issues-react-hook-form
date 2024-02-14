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
    clearErrors,
    getValues,
    setError,
    formState: { isValid, errors }
  } = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
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

  const handleFormAction = async (FormData: FormData) => {
    clearErrors();

    console.log('FormData', FormData);
    console.log('RHFData', getValues());

    // pre-process FormData to remove empty strings from form fields &
    // prevent sending `undefined` to the server
    const title = FormData.get('title');
    if (title === '') FormData.delete('title');

    const _Formdata = {};
    for (const pair of FormData.entries()) {
      _Formdata[pair[0]] = pair[1];
    }

    console.log('_Formdata', _Formdata);
    // Zod validation: returns an object with either:
    // { success: true, data: T}
    // { success: false, error: ZodError }
    const isValid = formSchema.safeParse(_Formdata);

    // if form is not valid, iterate over the errors and set them
    console.log('isValid', isValid)
    if (!isValid.success) {
      isValid.error.issues.forEach(issue => {
        // Errors are set on RHF fields
        setError(issue.path[0], {
          message: issue.message
        });
      });

      return;
    }

    console.log('ZodData', isValid.data);
    return formAction(isValid.data);
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
