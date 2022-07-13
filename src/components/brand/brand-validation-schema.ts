import * as yup from 'yup';

export const brandValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  slug: yup.string().required('form:error-slug-required'),
  type: yup.string().required('form:error-type-required'),
});
