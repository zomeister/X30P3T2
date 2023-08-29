import { useState, useContext } from "react"
import { Formik, Field, ErrorMessage, Form } from "formik"
import * as yup from "yup"
export default function OwnerForm () {
    const initialValues = {
        firstName: "",
        lastName: "",
        photo: "",
        location: "",
        bio: "",
    }
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        photo: yup.string().required("Photo is required"),
        location: yup.string().required("Location is required"),
        bio: yup.string().required("Bio is required"),
    })
    const handleSubmit = (values) => {
        console.log(values)
        const userData = { ...values, }
        fetch('/api/owners', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>Owner Form</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                <Form>
                    <div className="form-group">
                        <label>First Name</label>
                        <Field type="text" name="firstName" className="form-control" />
                        <ErrorMessage name="firstName" component="div" />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <Field type="text" name="lastName" className="form-control" />
                        <ErrorMessage name="lastName" component="div" />
                    </div>
                    <div className="form-group">
                        <label>Photo</label>
                        <Field type="text" name="photo" className="form-control" />
                        <ErrorMessage name="photo" component="div" />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <Field type="text" name="location" className="form-control" />
                        <ErrorMessage name="location" component="div" />
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <Field type="text" name="bio" className="form-control" />
                        <ErrorMessage name="bio" component="div" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}