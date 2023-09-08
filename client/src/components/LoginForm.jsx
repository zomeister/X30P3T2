import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Field, ErrorMessage, Form } from "formik"
import * as yup from "yup"
import AuthContext from "./../context/AuthContext"
export default function LoginForm ({userId, setUserId}) {
    // const { user, setUser } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
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
        .then(res => {
            if (res.ok) {
                return res.json()
            } else if (res.status === 404) {
                throw new Error('User not found')
            } else if (res.status === 401) {
                throw new Error('Incorrect username or password')
            } else {
                throw new Error('Error logging in')
            }
        })
        .then(data => {
            setUser(data)
            navigate('/profile')
            console.log(data)
        })
        .catch(err => console.error(err))
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <h1>Login</h1>
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
    )
}