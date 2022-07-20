import * as yup from 'yup';

export const warehouseCreateValidationSchema = yup.object().shape({
  managerUserId: yup.string().required('form:error-user-required'),
  name: yup.string().required('form:error-name-required'),
  city: yup.string().required('form:error-city-required'),
  district: yup.string().required('form:error-district-required'),
  address: yup.string().required('form:error-address-required'),
});

export const warehouseUpdateValidationSchema = yup.object().shape({
  managerUserId: yup.string(),
  name: yup.string(),
  city: yup.string(),
  district: yup.string(),
  address: yup.string(),
});
