import { Formik, Form, Field, ErrorMessage } from "formik";

const sendFakeRequest = (value: string) =>
    new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(value === "first");
        }, 100);
    });

interface FormValues {
    checkbox: string;
}

function FormFormikAdvanced() {
    return (
        <Formik
            initialValues={{ checkbox: "" }}
            validate={async (values) => {
                const errors: Partial<FormValues> = {};
                const isValid = await sendFakeRequest(values.checkbox);
                if (!isValid) {
                    errors.checkbox = '"First" is the only allowed value';
                }
                return errors;
            }}
            onSubmit={(values: FormValues) => alert(JSON.stringify(values))}
            validateOnChange={false}
        >
            {() => (
                <Form>
                    <Field name="checkbox">
                        {({ form: { setFieldValue } }) => (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFieldValue("checkbox", "first")
                                    }
                                >
                                    Check first
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFieldValue("checkbox", "second")
                                    }
                                >
                                    Check second
                                </button>
                            </>
                        )}
                    </Field>
                    <ErrorMessage name="checkbox" component="div" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}

export default FormFormikAdvanced;
