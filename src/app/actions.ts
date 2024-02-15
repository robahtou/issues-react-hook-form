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
  errors: null | Partial<ErrorObject<string, Record<string, any>, unknown>>[]
};

async function ServerAction(prevState: Result, ajvData: any): Promise<Result> {
  console.log('ServerAction:formData', ajvData);

  try {
    const data = await validate(ajvData);
    console.log('ServerAction:AJVdata', data);

    return {
      success: true,
      errors: null
    }
  } catch (error) {
    if (!(error instanceof Ajv.ValidationError)) throw error;

    console.log('ServerAction:AJVerror', error.errors)

    return {
      success: false,
      errors: error.errors
    }
  }
}



export default ServerAction;
