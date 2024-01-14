https://frontcave.pl/biblioteki-do-formularzy-1-sprawdz-porownanie-3-najpopularniejszych-bibliotek-do-formularzy-w-react/

# Biblioteki do formularzy w React #1 – sprawdź wprowadzenie do 3 najpopularniejszych bibliotek

-   [Biblioteki do formularzy w React #1 – sprawdź wprowadzenie do 3 najpopularniejszych bibliotek](#biblioteki-do-formularzy-w-react-1--sprawdź-wprowadzenie-do-3-najpopularniejszych-bibliotek)
    -   [Wprowadzenie](#wprowadzenie)
    -   [react-hook-form](#react-hook-form)
        -   [Prosty przykład](#prosty-przykład)
        -   [Przykład zaawansowany](#przykład-zaawansowany)
    -   [formik](#formik)
        -   [Prosty przykład](#prosty-przykład-1)
        -   [Walidacja za pomocą Yup](#walidacja-za-pomocą-yup)
        -   [Przykład zaawansowany](#przykład-zaawansowany-1)
    -   [react-final-form](#react-final-form)
        -   [Prosty przykład](#prosty-przykład-2)
        -   [Przykład zaawansowany](#przykład-zaawansowany-2)
    -   [Podsumowanie](#podsumowanie)

## Wprowadzenie

Zarządzanie formularzami nie jest proste – należy pilnować walidacji danych, pokazywać użytkownikowi błędy, ukrywać te błędy w odpowiednim momencie. React jako biblioteka nie dostarcza zaawansowanych sposobów obsługi formularzy – możesz uznać to jako zaletę, ponieważ łatwiej dostosować rozwiązanie pod Twój konkretny przypadek. Z drugiej strony musisz jednak napisać sporo kodu – tutaj z pomocą biblioteki, które pozwolą również obsłużyć edge-case’y.

Ręczna obsługa formularzy potrafi napsuć krwi i zająć sporo czasu – biblioteki które zostaną opisane zdejmują z programisty ogrom odpowiedzialności związanej z obsługą walidacji, edge-case’ów, dzięki nim nie trzeba ręcznie przetrzymywać stanu formularza. Upraszczają zaawansowane przypadki takie jak bardzo customowe kontrolki, które nawet nie muszą być elementami formularza by móc je pod formularz podpiąć.

Stąd zdecydowanie warto zaznajomić się z podstawami korzystania z tych bibliotek – ten wpis jako pierwszy z serii pokrótce każdą z nich przedstawi, a kolejne wpisy z serii będą dedykowane już konkretnym bibliotekom – by pokazać pełnię ich zaawansowanych możliwości.

W tym wpisie zobaczysz więc wprowadzenie do najpopularniejszych bibliotek do obsługi formularzy w React.

## react-hook-form

Bibliotekę zainstalować należy poleceniem

`npm install react-hook-formCopy`

### Prosty przykład

Stwórzmy formularz z jednym polem, które będzie wymagane. Ma mieć długość co najmniej 5 znaków ale nie więcej niż 10:

```javascript
import React from "react";
import { useForm } from "react-hook-form";
export default function App() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => alert(JSON.stringify(data));
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="userName"
                ref={register({ required: true, minLength: 5, maxLength: 10 })}
            />
            <p>
                {errors.userName?.type === "required" && "Name is required"}
                {errors.userName?.type === "minLength" &&
                    "At least 5 characters"}
                {errors.userName?.type === "maxLength" &&
                    "At most 10 characters"}
            </p>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}
```

Biblioteka react-hook-form zapewnia nam to, że nie musimy nigdzie przetrzymywać wartości w formularzu ani ręcznie ich aktualizować analogicznie z błędami walidacji, których obsługa przysparza niekiedy o ból głowy.
Pole by zostało zarejestrowane musi posiadać nazwę (możemy ją również zamiast tego podać w funkcji register, co zobaczysz w zaawansowanym przykładzie). Do funkcji register przekazujemy obiekt zawierający walidację – możemy również sami napisać funkcję walidującą, może ona być asynchroniczna.
Hook useForm zwraca obiekt zawierający błędy który aktualizowany jest jeżeli walidacje nie są spełnione.
Przejdźmy teraz do przykładu zaawansowanego:

### Przykład zaawansowany

Załóżmy, że potrzebujemy zrobić coś a’la checkbox ale na potrzeby przykładu nie możemy wprost checkboxa użyć- mamy 2 przyciski i klikając na nie ustawiamy wartość. Dodatkowo, chcemy mieć asynchroniczną walidację, np do wysłania zapytania na serwer. Zapytanie można zasymulować poprzez użycie `Promise` i `setTimeout`, a customowe pole zarejestrować można podając w funkcji `register` nazwę oraz obiekt opcji:

```javascript
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
const sendFakeRequest = (value) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(value === "first");
        }, 5000);
    });
export default function App() {
    const { register, setValue, handleSubmit, errors } = useForm();
    const onSubmit = (data) => alert(JSON.stringify(data));
    useEffect(() => {
        const validate = async (value) => {
            const isValid = await sendFakeRequest(value);
            return isValid;
        };
        register("customCheck", { validate });
    }, []);
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
```

Customowa walidacja może zwrócić bezpośrednio `boolean` albo `Promise` resolvujące sie do `boolean`, stąd możliwość pisania kodu asynchronicznego. Jeżeli składnia `async / await` nie jest dla Ciebie czytelna, oto ten sam przykład ale z użyciem `Promise`:

```javascript
const validate = (value) => {
    return sendFakeRequest(value);
};
```

Oba kody są do siebie równoważne, ale składnię `async / await` uważam za czytelniejszą i z bardziej widoczną intencją niż zwracanie `Promise`.
Warto zwrócić uwagę, że w stosunku do poprzedniego przykładu, używamy dodatkowo funkcji `setValue` dostarczanej przez hook `useForm`. Ponieważ nie rejestrujemy wprost pola formularza, musimy ręcznie ustawiać wartość dla biblioteki.

Przykład na pierwszy rzut oka może wydawać się nieco zawiły, jednak nadal kod jest prostszy niż musiałbyś go pisać ręcznie, a dodatkowo dzięki sprytnemu API dostarczanemu przez bibliotekę customowy checkbox zachowuje się w pełni jak element formularza.

## formik

Bibliotekę zainstalujemy poleceniem:

`npm install formik`

### Prosty przykład

Napiszmy ten sam przykład co w react-hook-form:

```javascript
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function App() {
    return (
        <Formik
            initialValues={{ userName: "" }}
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
        >
            {() => (
                <Form>
                    <Field name="userName" />
                    <ErrorMessage name="userName" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}

export default App;
```

Formik używa wzorca FACC (Function as a Child Component) do renderowania formularza – dzięki temu, co zobaczysz w zaawansowanym przykładzie, w łatwy sposób możemy przyjmować parametry od biblioteki.
Walidację pisać musimy samemu, twórcy Formika zachęcają by użyć biblioteki Yup.

[https://formik.org/docs/overview#complementary-packages](https://formik.org/docs/overview#complementary-packages)

### Walidacja za pomocą Yup

Po zainstalowaniu biblioteki:

`npm install yupCopy`

Możemy usunąć funkcję walidującą i zbudować schemat z pomocą Yup:

```javascript
Yup.object({
    userName: Yup.string()
        .max(10, "At most 10 characters")
        .min(5, "At least 5 characters")
        .required("Name is required"),
});
```

Fragment kodu (by nie powtarzać wszystkiego):

```javascript
//...
<Formik
  initialValues={{userName: ''}}
  validationSchema={Yup.object({
    userName: Yup.string()
      .max(10, 'At most 10 characters')
      .min(5, 'At least 5 characters')
      .required('Name is required'),
  })}
  onSubmit={values => alert(JSON.stringify(values))}
>
//...
```

> Działanie jest dokładnie takie samo jak wersji z napisaną przez nas walidacją – kod jest jednak dużo bardziej deklaratywny.

### Przykład zaawansowany

Przykład zaawansowany z hook-form zaimplementowany przy użyciu formik może wyglądać następująco:

```javascript
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const sendFakeRequest = (value) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(value === "first");
        }, 5000);
    });

function App() {
    return (
        <Formik
            initialValues={{ checkbox: "" }}
            validate={async (values) => {
                const errors = {};
                const isValid = await sendFakeRequest(values.checkbox);
                if (!isValid) {
                    errors.checkbox = '"First" is only allowed value';
                }
                return errors;
            }}
            onSubmit={(values) => alert(JSON.stringify(values))}
            validateOnChange={false}
        >
            {() => (
                <Form>
                    <Field name="checkbox">
                        {({ form: { setFieldValue } }) => {
                            return (
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
                            );
                        }}
                    </Field>
                    <ErrorMessage name="checkbox" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}

export default App;
```

Formik również umożliwia asynchroniczną walidację danych. Jednym ze sposobów na wyrenderowanie customowego komponentu jest wzorzec FACC który już poznałeś. Biblioteka przekazuje sporą ilość parametrów – nas w przykładzie interesuje tylko obiekt form, udostępniający metodę setFieldValue. Jako pierwszy parametr przyjmuje ona nazwę pola, jako drugi wartość.

## react-final-form

Zainstalujmy bibliotekę final-form oraz reactowy wrapper:

`npm install --save final-form react-final-formCopy`

### Prosty przykład

```javascript
import React from "react";
import { Form, Field } from "react-final-form";
function App() {
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
export default App;
```

Przykład wygląda bardzo podobnie jak Formik.

### Przykład zaawansowany

```javascript
import React from "react";
import { Form, Field } from "react-final-form";

const sendFakeRequest = (value) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(value === "first");
        }, 5000);
    });

function App() {
    return (
        <Form
            validate={async (values) => {
                const errors = {};
                const isValid = await sendFakeRequest(values.checkbox);
                if (!isValid) {
                    errors.checkbox = '"First" is only allowed value';
                }
                return errors;
            }}
            onSubmit={(values) => alert(JSON.stringify(values))}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="checkbox">
                        {({ input, meta }) => (
                            <>
                                <button
                                    type="button"
                                    onClick={() => input.onChange("first")}
                                >
                                    First
                                </button>
                                <button
                                    type="button"
                                    onClick={() => input.onChange("second")}
                                >
                                    Second
                                </button>
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

export default App;
```

Tak jak w przypadku przykładu prostego, w bardzo podobny sposób wygląda przykład zaawansowany, walidacja zresztą dla obu bibliotek jest taka sama.

## Podsumowanie

Każda z omówionych bibliotek: react-hook-form, formik oraz react-final-form upraszcza zarządzanie stanem formularza czy walidacją. Wszystkie umożliwiają skorzystanie z hooków – hook-form działa tylko w taki sposób. Znając podstawy każdej z nich można wgryźć się w nie głębiej – co stanie się w kolejnych postach.
