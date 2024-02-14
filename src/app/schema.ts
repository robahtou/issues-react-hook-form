import * as z from 'zod';


const formSchema = z.object({
  title: z.string()
    .min(2, { message: 'Title must be at least 2 characters long' })
    .max(32, { message: 'Title must be at most 32 characters long' })
    .or( // not really necessary but here for posterity in regards to removing the form field or in this case an empty string
        z.string()
          .length(0)
          .transform((val) => undefined)
      )
    .optional(),

  firstName: z.string({
      required_error: "First name is required by zod",
      invalid_type_error: "First name must be a string by zod",
    })
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(32, { message: 'First name must be at most 32 characters long' }),

  lastName: z.string({
      required_error: "Last name is required by zod",
      invalid_type_error: "Last name must be a string by zod",
    })
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(32, { message: 'Last name must be at most 32 characters long' }),

  age: z.coerce.number({
      required_error: "Age is required by zod",
      invalid_type_error: "Age must be a number by zod",
    })
    .int()
    .gte(18, { message: 'Age must be greater than 18' })
    .or(z.string()) // TS for default values which FormData always passes as string
  })
  .strict();

type FormSchema = z.infer<typeof formSchema>;


export type { FormSchema }
export default formSchema;
