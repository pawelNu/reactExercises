import "./App.css";
import FormSimpleFormik from "./components/formik/FormSimpleFormik";
import FormSimpleFormikYupValidation from "./components/formik/FormSimpleFormikYupValidation";
import FormAdvancedRHF from "./components/react-hook-form/FormAdvancedRHF";
import FormSimpleRHF from "./components/react-hook-form/FormSimpleRHF";

function App() {
    return (
        <>
            {/* <FormSimpleRHF /> */}
            {/* <FormAdvancedRHF /> */}
            {/* <FormSimpleFormik /> */}
            <FormSimpleFormikYupValidation />
        </>
    );
}

export default App;
