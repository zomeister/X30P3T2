import { useState, useContext } from "react"
import { Formik, Field, ErrorMessage, Form } from "formik"
// import AuthContext from "../context/AuthContext"
import * as yup from "yup"
export default function LoginForm () {
    // const { user, setUser } = useContext(AuthContext)
    const initialValues = {
        username: "",
        password: ""
    }
    const validationSchema = yup.object().shape({
        username: yup.string().required("Email/username required"),
        password: yup.string().required("password required")
    })
    const handleSubmit = (values) => {
        console.log(values)
        const userData = { ...values, }
        fetch('/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
    return (
        <div>
            <h1>Login</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="username">Email/Username</label>
                        <Field type="username" name="username" id="username" className="form-control" />
                        <ErrorMessage name="username" component="div" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" id="password" className="form-control" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}