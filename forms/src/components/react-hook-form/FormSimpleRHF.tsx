import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
    userName: string;
}

export default function FormSimpleRHF() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) =>
        alert(JSON.stringify(data));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("userName", {
                    required: true,
                    minLength: 5,
                    maxLength: 10,
                })}
            />
            <p>
                {errors?.userName?.type === "required" && "Name is required"}
                {errors?.userName?.type === "minLength" &&
                    "At least 5 characters"}
                {errors?.userName?.type === "maxLength" &&
                    "At most 10 characters"}
            </p>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}
