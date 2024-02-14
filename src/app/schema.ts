import type { JSONSchemaType } from 'ajv';


interface FormSchema {
  title?: string,
  firstName: string,
  lastName: string,
  age: string | number
};

const formSchema: JSONSchemaType<FormSchema> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 2,
      maxLength: 32,
      nullable: true
    },
    firstName: {
      type: 'string',
      minLength: 2,
      maxLength: 32
    },
    lastName: {
      type: 'string',
      minLength: 2,
      maxLength: 32
    },
    age: {
      type: ['string', 'integer'],
      // minimum: 18
    }
  },
  required: ['firstName', 'lastName', 'age'],
  additionalProperties: false
};


export type { FormSchema };
export default formSchema;
