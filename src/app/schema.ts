import type { JSONSchemaType } from 'ajv';


interface FormSchema {
  title?: string,
  firstName: string,
  lastName: string,
  age: number
};

const formSchema: JSONSchemaType<FormSchema> = {
  $async: true,
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 2,
      maxLength: 32,
      nullable: true,
      errorMessage: {
        type: 'Must be a string',
        minLength: 'Title must be at least 2 characters long',
        maxLength: 'Title must be at least 2 characters long'
      }
    },
    firstName: {
      type: 'string',
      minLength: 2,
      maxLength: 32,
      errorMessage: {
        type: 'First name must be a string type',
        minLength: 'First name must be at least 2 characters long',
        maxLength: 'First name must be at most 32 characters long'
      }
    },
    lastName: {
      type: 'string',
      minLength: 2,
      maxLength: 32,
      errorMessage: {
        type: 'Last name must be a string type',
        minLength: 'Last name must be at least 2 characters long',
        maxLength: 'Last name must be at most 32 characters long'
      }
    },
    age: {
      type: ['number'],
      minimum: 18,
      errorMessage: {
        type: 'Age must be an integer type',
        minimum: 'Age must be greater than 18'
      }
    }
  },
  required: ['firstName', 'lastName', 'age'],
  additionalProperties: false
};


export type { FormSchema };
export default formSchema;
