'use server';

import formSchema from './schema';
import { ZodError, z } from 'zod';


type Result = {
  success: boolean,
  errors?: Array<{
    path: string;
    message: string;
  }> | null | ZodError
};

type RHFData = {
  firstName: string,
  lastName: string,
  age: number | null,
  title?: string | undefined
};

async function ServerAction(prevState: Result, rhfData: RHFData): Promise<Result> {
  console.log('ServerAction:prevState', prevState);
  console.log('ServerAction:rhfData', rhfData);

  const isValid = formSchema.safeParse(rhfData);

  console.log('ServerAction:isValid', isValid);
  console.log('ServerAction:error', isValid.error);

  if (!isValid.success) {
    return {
      success: false,
      errors: isValid.error.issues
    };
  }

  return {
    success: true,
    errors: null
  };
}



export default ServerAction;
