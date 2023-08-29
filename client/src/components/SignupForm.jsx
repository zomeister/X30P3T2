import { useState, useContext } from "react"
import { Formik, Field, ErrorMessage, Form } from "formik"
import * as yup from "yup"
// import 
export default function SignupForm () {
    const initialValues = {
        username: "",
        password: "",
        email: ""
    }
    const validationSchema = yup.object().shape({
        username: yup.string().required("Username required"),
        email: yup.string().required("Email required"),
        password: yup.string().required("Password required"),
    })
    const handleSubmit = (values) => {
        console.log(values)
        const userData = { ...values, }
        fetch("/api/signup", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err) 
        )
    }

    return (
        <div>
            <h1>Signup Form</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                <Form>
                    <div className="form-group">
                        <label>Username</label>
                        <Field type="text" name="username" className="form-control" />
                        <ErrorMessage name="username" component="div" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Field type="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <Field type="password" name="password" className="form-control" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}