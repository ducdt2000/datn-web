import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from '@components/ui/link';
import { saveAuthCredentials } from '@utils/auth-utils';
import { useRegisterMutation } from '@data/user/use-register.mutation';
import { GENDER, ROLE } from '@ts-types/custom.types';
import { DatePicker } from '@components/ui/date-picker';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import moment from 'moment';
// import * as yupphone from 'yup-phone';
import ValidationError from '@components/ui/form-validation-error';
import { useLoginMutation } from '@data/user/use-login.mutation';
const genderOptions = [
  { value: +GENDER.MALE, name: 'option:male-name' },
  { value: +GENDER.FEMALE, name: 'option:female-name' },
  { value: +GENDER.OTHER, name: 'option:other-name' },
];

const roleOptions = [
  { value: ROLE.USER, name: 'option:user-name' },
  { value: ROLE.STAFF, name: 'option:staff-name' },
  { value: ROLE.ADMIN, name: 'option:admin-name' },
];

type FormValues = {
  fullname: string;
  username: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  gender: GENDER;
  birthday: Date;
  email: string;
  password: string;
  role: ROLE;
};

const registrationFormSchema = yup.object().shape({
  fullname: yup.string().required('form:error-fullname-required'),
  username: yup.string().required('form:error-username-required'),
  password: yup.string().required('form:error-password-required'),
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  phone: yup
    .string()
    // .phone(undefined, undefined, 'form:error-phone-format')
    .required('form:error-phone-required'),
  address: yup.string().required('form:error-address-required'),
  city: yup.string().required('form:error-city-required'),
  district: yup.string().required('form:error-district-required'),
  gender: yup.mixed().required('form:error-gender-required'),
  birthday: yup.date().required('form:error-birthday-required'),
  role: yup.mixed().required('form: error-role-required').default(ROLE.USER),
  inviteCode: yup.string().notRequired(),
});

// const registrationFormScheBadRequestExceptionma = yup.object().shape({
//   name: yup.string().required('form:error-name-required'),
//   email: yup
//     .string()
//     .email('form:error-email-format')
//     .required('form:error-email-required'),
//   password: yup.string().required('form:error-password-required'),
//   permission: yup.string().default('store_owner').oneOf(['store_owner']),
// });
const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation();
  const { mutate: login, isLoading: loginLoading } = useLoginMutation();

  // const {
  //   state: locationState,
  //   onCitySelect,
  //   onDistrictSelect,
  // } = useLocationForm(true);

  // const { cityOptions, districtOptions, selectedCity, selectedDistrict } =
  //   locationState;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: {
      role: ROLE.USER,
      birthday: moment().toDate(),
    },
  });
  const router = useRouter();
  const { t } = useTranslation();

  async function onSubmit(input: FormValues) {
    registerUser(
      {
        variables: input,
      },
      {
        onSuccess: () => {
          const loginInput = {
            account: input.username,
            password: input.password,
          };

          login(
            { variables: loginInput },
            {
              onSuccess: ({ data: loginData }) => {
                if (loginData?.data) {
                  saveAuthCredentials(
                    loginData?.data?.token,
                    loginData?.data?.detail.role
                  );
                  router.push(ROUTES.DASHBOARD);
                  return;
                } else {
                  setErrorMessage('form:error-credential-wrong');
                }
              },
              onError: (err: any) => {
                setErrorMessage(err);
              },
            }
          );
        },
        // onError: (error: any) => {
        //   console.log(error);

        //   Object.keys(error?.response?.data).forEach((field: any) => {
        //     setError(field, {
        //       type: 'manual',
        //       message: error?.response?.data[field],
        //     });
        //   });
        // },
      }
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('form:input-label-fullname')}
          {...register('fullname')}
          variant="outline"
          className="mb-4"
          error={t(errors?.fullname?.message!)}
        />
        <Input
          label={t('form:input-label-email')}
          {...register('email')}
          type="email"
          variant="outline"
          className="mb-4"
          error={t(errors?.email?.message!)}
        />
        <Input
          label={t('form:input-label-phone')}
          {...register('phone')}
          variant="outline"
          className="mb-4"
          error={t(errors?.phone?.message!)}
        />
        <Input
          label={t('form:input-label-username')}
          {...register('username')}
          variant="outline"
          className="mb-4"
          error={t(errors?.username?.message!)}
        />
        <PasswordInput
          label={t('form:input-label-password')}
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
        />
        <Input
          label={t('form:input-label-city')}
          {...register('city')}
          variant="outline"
          className="mb-4"
          error={t(errors?.city?.message!)}
        />
        <Input
          label={t('form:input-label-disctrict')}
          {...register('district')}
          variant="outline"
          className="mb-4"
          error={t(errors?.district?.message!)}
        />

        {/*
        //TODO: react hook
        <div className="mb-4">
          <Label>{t('form:input-label-city')}</Label>
          <SelectInput
            name="city"
            defaultValue={selectedCity}
            control={control}
            onChange={(option: any) => onCitySelect(option)}
            getOptionLabel={(option: any) => t(option.name)}
            getOptionVale={(option: any) => option.value}
            options={cityOptions}
          />
          <ValidationError message={t(errors?.city?.message!)} />
        </div>
        <div className="mb-4">
          <Label>{t('form:input-label-district')}</Label>
          <SelectInput
            name="district"
            control={control}
            onChange={(options: any) => onDistrictSelect(options)}
            defaultValue={selectedDistrict}
            getOptionLabel={(option: any) => t(option.name)}
            getOptionVale={(option: any) => option.value}
            options={districtOptions}
          />
          <ValidationError message={t(errors?.district?.message!)} />
        </div>
         */}
        <Input
          label={t('form:input-label-address')}
          {...register('address')}
          variant="outline"
          className="mb-4"
          error={t(errors?.address?.message!)}
        />
        <div className="mb-4">
          <Label>{t('form:input-label-gender')}</Label>
          <SelectInput
            name="gender"
            control={control}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.value}
            options={genderOptions}
          />
          <ValidationError message={t(errors?.gender?.message!)} />
        </div>
        <div className="mb-4">
          <Label>{t('form:input-label-role')}</Label>
          <SelectInput
            name="role"
            control={control}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.value}
            options={roleOptions}
          />
          <ValidationError message={t(errors?.role?.message!)} />
        </div>
        <div className="mb-4">
          <Label>{t('form:input-label-birthday')}</Label>
          <Controller
            control={control}
            {...register('birthday')}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value ?? new Date()}
                selectsStart
                className="border border-border-base"
                placeholderText={new Date().toLocaleDateString()}
              />
            )}
          />
          <ValidationError message={t(errors?.birthday?.message!)} />
        </div>
        <Button className="w-full" loading={loading} disabled={loading}>
          {t('form:text-register')}
        </Button>

        {errorMessage ? (
          <Alert
            message={t(errorMessage)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setErrorMessage(null)}
          />
        ) : null}
      </form>
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
          {t('common:text-or')}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {t('form:text-already-account')}{' '}
        <Link
          href={ROUTES.LOGIN}
          className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
        >
          {t('form:button-label-login')}
        </Link>
      </div>
    </>
  );
};

export default RegistrationForm;
