import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
    userName: string;
}

function FormFormikSimpleYupValidation() {
    return (
        <Formik
            initialValues={{ userName: "" }}
            validationSchema={Yup.object({
                userName: Yup.string()
                    .max(10, "At most 10 characters")
                    .min(5, "At least 5 characters")
                    .required("Name is required"),
            })}
            onSubmit={(values: FormValues) => alert(JSON.stringify(values))}
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

export default FormFormikSimpleYupValidation;
