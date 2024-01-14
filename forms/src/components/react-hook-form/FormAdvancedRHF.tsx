import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const sendFakeRequest = (value: string) =>
    new Promise<boolean>((resolve) => {
        setTimeout(() => {
            resolve(value === "first");
        }, 5000);
    });

interface FormData {
    customCheck: string;
}

export default function FormAdvancedRHF() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data) =>
        alert(JSON.stringify(data));

    useEffect(() => {
        const validate = async (value: string) => {
            const isValid = await sendFakeRequest(value);
            return isValid;
        };
        register("customCheck", { validate });
    }, [register]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button
                type="button"
                onClick={() => setValue("customCheck", "first")}
            >
                Check first
            </button>
            <button
                type="button"
                onClick={() => setValue("customCheck", "second")}
            >
                Check second
            </button>
            <p>{errors.customCheck && '"First" is the only allowed value'}</p>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}
