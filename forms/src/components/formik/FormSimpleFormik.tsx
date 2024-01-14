import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

interface FormValues {
    userName: string;
}

function FormFormikSimple() {
    return (
        <Formik
            initialValues={{ userName: "" }}
            validate={(values) => {
                const errors: Partial<FormValues> = {};
                if (!values.userName) {
                    errors.userName = "Name is required";
                } else if (values.userName.length < 5) {
                    errors.userName = "At least 5 characters";
                } else if (values.userName.length > 10) {
                    errors.userName = "At most 10 characters";
                }
                return errors;
            }}
            onSubmit={(
                values: FormValues,
                actions: FormikHelpers<FormValues>
            ) => {
                alert(JSON.stringify(values));
                actions.setSubmitting(false);
            }}
        >
            {() => (
                <Form>
                    <Field type="text" name="userName" />
                    <ErrorMessage name="userName" component="div" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}

export default FormFormikSimple;
