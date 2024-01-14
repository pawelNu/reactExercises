import "./App.css";
import FormFormikAdvanced from "./components/formik/FormFormikAdvanced";
import FormFormikSimple from "./components/formik/FormSimpleFormik";
import FormFormikSimpleYupValidation from "./components/formik/FormSimpleFormikYupValidation";
import FormRFFSimple from "./components/react-final-form/FormRFFSimple";
import FormRHFAdvanced from "./components/react-hook-form/FormRHFAdvanced";
import FormRFHSimple from "./components/react-hook-form/FormRHFSimple";

function App() {
    return (
        <>
            {/* <FormSimpleRHF /> */}
            {/* <FormAdvancedRHF /> */}
            {/* <FormSimpleFormik /> */}
            {/* <FormSimpleFormikYupValidation /> */}
            {/* <FormFormikAdvanced /> */}
            <FormRFFSimple />
        </>
    );
}

export default App;
