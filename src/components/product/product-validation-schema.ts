import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  code: yup.string().required('form:error-code-required'),
  productTypeId: yup.string().required('form:error-productType-required'),
  brandId: yup.string().required('form:error-brand-required'),
  price: yup
    .number()
    .min(0, 'form:error-price-min')
    .required('form:error-price-required'),
  imageLinks: yup
    .array()
    .min(1, 'form:error-imageLinks-min')
    .of(yup.string())
    .required('form:error-imageLinks-required'),
  // properties: yup
  //   .array()
  //   .min(1, 'form:error-properties-min')
  //   .of(
  //     yup.object({
  //       name: yup.string().required('form:error-name-required'),
  //       values: yup.array().min(1, 'form:error-values-min').of(yup.string()),
  //     })
  //   ),
});
