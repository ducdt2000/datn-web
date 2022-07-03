import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from '@components/ui/link';
import { allowedRoles, hasAccess, setAuthCredentials } from '@utils/auth-utils';
import { useRegisterMutation } from '@data/user/use-register.mutation';
import { GENDER, ROLE } from '@ts-types/custom.types';
// import * as yupphone from 'yup-phone';

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
  gender: yup.number().required('form:error-gender-required'),
  birthday: yup.date().required('form:error-birthday-required'),
  role: yup.string().required('form: error-role-required').default(ROLE.USER),
  inviteCode: yup.string().notRequired(),
});

// const registrationFormSchema = yup.object().shape({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(registrationFormSchema),
    defaultValues: {
      role: ROLE.USER,
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
        onSuccess: ({ data }) => {
          if (data?.token) {
            if (hasAccess(allowedRoles, data?.permissions)) {
              setAuthCredentials(data?.token, data?.permissions);
              router.push(ROUTES.DASHBOARD);
              return;
            }
            setErrorMessage('form:error-enough-permission');
          } else {
            setErrorMessage('form:error-credential-wrong');
          }
        },
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field],
            });
          });
        },
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
          label={t('form:input-label-district')}
          {...register('district')}
          variant="outline"
          className="mb-4"
          error={t(errors?.district?.message!)}
        />
        <Input
          label={t('form:input-label-address')}
          {...register('address')}
          variant="outline"
          className="mb-4"
          error={t(errors?.address?.message!)}
        />
        <Input
          label={t('form:input-label-gender')}
          {...register('gender')}
          variant="outline"
          className="mb-4"
          error={t(errors?.gender?.message!)}
        />
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
