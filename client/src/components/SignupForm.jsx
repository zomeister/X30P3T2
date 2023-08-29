import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Field, ErrorMessage, Form } from "formik"
import * as yup from "yup"
import AuthContext from "./../context/AuthContext"
// import 
export default function SignupForm () {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

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
        .then(res => {
            if (res.ok) {
                return res.json()
                
            } else {
                throw new Error("Username or email already exists")
            }
        })
        .then(data => {
            setUser(data)
            navigate("/create_profile")
            console.log(user)
        })
        .catch(err => console.error(err) 
        )
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
            <Form>
                <h1>Signup Form</h1>
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
    )
}