# React Hook Form Issues

This repo is to track issues that I run up against when using [RHF](https://react-hook-form.com) with Server Actions and Validation, specifically with [AJV](https://ajv.js.org) & [Zod](https://ajv.js.org)

See branches:

```
`rhf-data-zod` -- RHF is the source of truth for form data
`rhf-zod-data` -- Zod is the source of truth for form data
`rhf-data-ajv` -- RHF is the source of truth for form data
`rhf-ajv-data` -- AJV is the source of truth for form data
```

## Summary

The following are the business requirements:
1. validate form data on the Client & Server side
2. no unnecessary data in the form submission to the server (this means, if `<input>` is optional and user did not insert a value, do not send the form field over the wire)

The following are development requirements:
1. determine where to strip out empty string from optional form fields
2. the validator output will server as the source of truth of form data that will be sent to the server (this means, if the validator transforms data, the result of the validation is to return the transformed data and send it to the server)
3. parse/validate once on the client and once on the server

### Branches

`rhf-ajv-data`

Implement `ajv` as the validator and source of truth of the form data sent to the server

`rhf-zod-data`

Implement `zod` as the validator and source of truth of the form data sent to the server

## Inconsistency (not sure if a bug)

Upon using `ajv` type coercion from `string` to `number` there is an inconsistency implementation of the RHF method `getValues` between validation libraries.

For AJV, if coerce is set on the schema, then calling `getValues` returns the coerced type value. This is not the case with Zod.

See branches `rhf-data-ajv` & `rhf-data-zod`

## References

* https://react-hook-form.com
* https://ajv.js.org
* https://zod.dev
* [empty string to null coercion](https://ajv.js.org/coercion.html#to-null-type)
