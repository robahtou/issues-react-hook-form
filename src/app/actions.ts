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

type ZodData = {
  title?: string | undefined,
  firstName: string,
  lastName: string,
  age: string | null
};

async function ServerAction(prevState: Result, zodData: ZodData): Promise<Result> {
  console.log('ServerAction:prevState', prevState);
  console.log('ServerAction:rhfData', zodData);

  const isValid = formSchema.safeParse(zodData);

  console.log('ServerAction:isValid', isValid);
  console.log('ServerAction:error.issues', isValid?.error?.issues);

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
