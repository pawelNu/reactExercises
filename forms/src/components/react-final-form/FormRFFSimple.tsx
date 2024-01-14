import { Form, Field } from "react-final-form";
function FormRFFSimple() {
    return (
        <Form
            validate={(values) => {
                const errors = {};
                if (!values.userName) {
                    errors.userName = "Name is required";
                } else if (values.userName.length < 5) {
                    errors.userName = "At least 5 characters";
                } else if (values.userName.length > 10) {
                    errors.userName = "At most 10 characters";
                }
                return errors;
            }}
            onSubmit={(values) => alert(JSON.stringify(values))}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="userName">
                        {({ input, meta }) => (
                            <>
                                <input {...input} type="text" />
                                {meta.touched && meta.error && (
                                    <span>{meta.error}</span>
                                )}
                            </>
                        )}
                    </Field>
                    <button type="submit">Submit</button>
                </form>
            )}
        />
    );
}
export default FormRFFSimple;
