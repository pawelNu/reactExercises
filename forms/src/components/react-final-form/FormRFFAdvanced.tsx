import { Form, Field, FieldRenderProps, FormRenderProps } from 'react-final-form';

const sendFakeRequest = (value: string) =>
  new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(value === 'first');
    }, 1);
  });

interface FormValues {
  checkbox: string;
}

interface CustomFieldProps {
  input: FieldRenderProps<string, HTMLElement>['input'];
  meta: FieldRenderProps<string, HTMLElement>['meta'];
}

function FormRFFAdvanced() {
  return (
    <Form
      validate={async (values: FormValues) => {
        const errors: Partial<FormValues> = {};
        const isValid = await sendFakeRequest(values.checkbox);
        if (!isValid) {
          errors.checkbox = '"First" is the only allowed value';
        }
        return errors;
      }}
      onSubmit={(values: FormValues) => alert(JSON.stringify(values))}
      render={({ handleSubmit }: FormRenderProps<FormValues>) => (
        <form onSubmit={handleSubmit}>
          <Field name="checkbox">
            {({ input, meta }: CustomFieldProps) => (
              <>
                <button type="button" onClick={() => input.onChange('first')}>
                  First
                </button>
                <button type="button" onClick={() => input.onChange('second')}>
                  Second
                </button>
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </>
            )}
          </Field>
          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
}

export default FormRFFAdvanced;
