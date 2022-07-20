import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  warehouseCreateValidationSchema,
  warehouseUpdateValidationSchema,
} from './warehouse-validation-schema';
import Image from 'next/image';
import Input from '@components/ui/input';
import Button from '@components/ui/button';
import SelectInput from '@components/ui/select-input';
import Label from '@components/ui/label';
import { Asterisk } from '@components/common/asterisk';
import ValidationError from '@components/ui/form-validation-error';
import { useState } from 'react';
import {
  UpdateWarehouse,
  User,
  Warehouse,
  WarehouseItem,
  WarehouseLog,
} from '@ts-types/generated';
import _ from 'lodash';
import { getDifferentValue } from '@utils/compare-object';
import NotificationCard from '@components/ui/notification-card';
import { toast } from 'react-toastify';
import Alert from '@components/ui/alert';
import { useManagersQuery } from '@data/user/user.query';
import { useUpdateWarehouseMutation } from '@data/warehouses/use-update-warehouse.mutation';
import { useCreateWarehouseMutation } from '@data/warehouses/use-create-warehouse.mutation';
import { siteSettings } from '@settings/site.settings';

type FormValues = {
  managerUserId?: string;
  name?: string;
  address?: string;
  city?: string;
  district?: string;
  items?: WarehouseItem[];
  warehouseLogs?: WarehouseLog[];
  manager?: User;
};

type IProps = {
  initialValues?: Warehouse | null;
};

function SelectManager({ control, errors }: { control: any; errors: any }) {
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>();

  const { data: dataManagers, isLoading: managerLoading } = useManagersQuery({
    search,
  });

  const managerOptions = dataManagers?.users?.data?.map((user: any) => {
    return {
      value: user.id,
      name: user.email,
      label: (
        <div className="grid grid-cols-12">
          <div className="col-span-1">
            <Image
              width={64}
              height={64}
              src={user.avatarLink ?? siteSettings?.avatar?.placeholder}
            />
          </div>
          <div className="col-span-5 flex flex-col">
            <h2>{user.fullname}</h2>
            <a>{user.email}</a>
          </div>
          <div className="col-span-3">
            <h1>{user.role}</h1>
          </div>
          <div className="col-span-3">
            <h1>{user.email}</h1>
          </div>
        </div>
      ),
    };
  });

  return (
    <>
      <Label>
        {t('form:input-label-manager')}
        <Asterisk />
      </Label>
      <SelectInput
        name="managerUserId"
        control={control}
        options={managerOptions}
        isLoading={managerLoading}
        onInputChange={(value: string, actionMeta: { action: string }) => {
          if (actionMeta.action === 'input-change') {
            setSearch(value);
          }
          if (actionMeta.action === 'menu-close') {
            setSearch(undefined);
          }
        }}
        formatOptionLabel={(option: any) => option.label}
      />
      <ValidationError message={t(errors?.managerUserId?.message!)} />
    </>
  );
}

export default function WarehouseForm({ initialValues }: IProps) {
  const router = useRouter();

  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: initialValues
      ? yupResolver(warehouseUpdateValidationSchema)
      : yupResolver(warehouseCreateValidationSchema),
    //@ts-ignore
    defaultValues: initialValues ?? {},
  });

  const { mutate: updateWarehouse, isLoading: updating } =
    useUpdateWarehouseMutation();

  const { mutate: createWarehouse, isLoading: creating } =
    useCreateWarehouseMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      managerUserId: values.managerUserId,
      name: values.name,
      address: values.address,
      city: values.city,
      district: values.district,
    };

    if (!initialValues) {
      createWarehouse(
        {
          // @ts-ignore
          variables: { input },
        },
        {
          onSuccess: (data) => {
            toast.success(t('common:successfully-created'));
          },
          onError: (error: any) => {
            toast.error(t(`${error?.response?.data?.error?.message}`));
          },
        }
      );
    } else {
      const updateInput = getDifferentValue(
        input,
        initialValues
      ) as UpdateWarehouse;
      // @ts-ignore
      updateWarehouse(
        {
          variables: { input: updateInput, id: initialValues.id },
        },
        {
          // @ts-ignore
          onSuccess: (data) => {
            router.back();
          },
          onError: (error: any, _variable, _options) => {
            setErrorMessage(error?.response?.data?.error?.message);
          },
        }
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
            required={true}
          />
          <SelectManager control={control} errors={errors} />
          <Input
            label={t('form:input-label-city')}
            {...register('city')}
            error={t(errors.city?.message!)}
            variant="outline"
            className="mb-5"
            required={true}
          />
          <Input
            label={t('form:input-label-district')}
            {...register('district')}
            error={t(errors.district?.message!)}
            variant="outline"
            className="mb-5"
            required={true}
          />
          <Input
            label={t('form:input-label-address')}
            {...register('address')}
            error={t(errors.address?.message!)}
            variant="outline"
            className="mb-5"
            required={true}
          />
        </div>
        <div className="mb-4 text-end">
          {
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {t('form:button-label-back')}
            </Button>
          }

          <Button loading={creating || updating}>
            {initialValues
              ? t('form:button-label-update-warehouse')
              : t('form:button-label-add-warehouse')}
          </Button>
        </div>
      </form>
      {errorMessage ? (
        <Alert
          message={t(`${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
    </>
  );
}
