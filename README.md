# React Hook Form Issues

This repo is to track issues that I run up against when using RHF & Validation, specifically with AJV & Zod.

See branches.

# React Hook Form with AJV Validation

Inconsistent implementation of `getValues` between validation libraries.
For AJV, if coerce is set on the schema, then calling `getValues` returns the coerced type value. This is not the case with Zod.

# React Hook Form with Zod Validation
WIP

## References

* https://react-hook-form.com
* https://ajv.js.org
* https://zod.dev

* [empty string to null coercion](https://ajv.js.org/coercion.html#to-null-type)
