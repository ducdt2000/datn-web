import { UploadIcon } from '@components/icons/upload-icon';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloseIcon } from '@components/icons/close-icon';
import Loader from '@components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { useUploadMutation } from '@data/uploader/use-upload.mutation';

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value) ? value : [value];
  }
  return images;
};
export default function Uploader({ onChange, value, multiple }: any) {
  const { t } = useTranslation();

  const initValue = getPreviewImage(value);

  const [files, setFiles] = useState<any[]>(initValue);

  const { mutate: upload, isLoading: loading } = useUploadMutation();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        upload(
          acceptedFiles, // it will be an array of uploaded attachments
          {
            onSuccess: (data) => {
              let mergedData;
              if (multiple) {
                mergedData = files.concat(data?.data);
                setFiles(files.concat(data?.data));
              } else {
                mergedData = data?.data[0];
                setFiles(data?.data);
              }
              if (onChange) {
                onChange(mergedData);
              }
            },
          }
        );
      }
    },
  });

  const handleDelete = (image: string) => {
    const images = files.filter((file) => file?.data[0].url !== image);

    setFiles(images);
    // if (onChange) {
    //   onChange(images);
    // }
  };

  const thumbs = files?.map((file: any, idx) => {
    if (file) {
      return (
        <div
          className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
          key={idx}
        >
          <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
            <img src={file?.url ?? file} />
          </div>
          {multiple ? (
            <button
              className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute top-1 end-1 shadow-xl outline-none"
              onClick={() => handleDelete(file.url)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          ) : null}
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file?.url));
    },
    [files]
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="text-muted-light" />
        <p className="text-body text-sm mt-4 text-center">
          <span className="text-accent font-semibold">
            {t('text-upload-highlight')}
          </span>{' '}
          {t('text-upload-message')} <br />
          <span className="text-xs text-body">{t('text-img-format')}</span>
        </p>
      </div>

      {(!!thumbs.length || loading) && (
        <aside className="flex flex-wrap mt-2">
          {!!thumbs.length && thumbs}
          {loading && (
            <div className="h-16 flex items-center mt-2 ms-2">
              <Loader simple={false} className="w-6 h-6" />
            </div>
          )}
        </aside>
      )}
    </section>
  );
}
