'use server';

import Ajv from 'ajv';
import type { ErrorObject } from 'ajv';
import ajvErrors from 'ajv-errors';

import formSchema from './schema';


const ajv = new Ajv({ allErrors: true, allowUnionTypes: true, strict: 'log' });
ajvErrors(ajv, {
  singleError: true,
  keepErrors: false,
});
const validate = ajv.compile(formSchema);


type Result = {
  success: boolean,
  errors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined
};

async function ServerAction(prevState: Result, ajvData: any): Promise<Result> {
  console.log('ServerAction:formData', ajvData);

  const isValid = validate(ajvData);

  console.log('ServerAction:isValid', isValid);
  console.log('ServerAction:errors', validate.errors);

  if (!isValid) {
    return {
      success: false,
      errors: validate.errors
    };
  }

  return {
    success: true,
    errors: null
  };
}



export default ServerAction;
