import { useState, useContext } from "react"
import * as yup from "yup"
import { Formik, Field, ErrorMessage, Form } from "formik"
import { Button, Form as FormBS } from "react-bootstrap"

export default function PetForm () {
    const initialValues = {
        name: "",
        species: "",
        photo: "",
    }
    const validationSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        species: yup.string().required("Species is required"),
        photo: yup.string().required("Photo is required"),
    })
    const handleSubmit = (values) => {
        console.log(values)
        const userData = {...values, }
        fetch("/api/pets", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userData)
        })
        .then( (res) => {res.json()} )
        .then( (data) => {console.log(data)} )
        .catch( (err) => {console.error(err)} )
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
            <Form>
                <h1>Pet Form</h1>
                <div className="form-group">
                    <label>Name</label>
                    <Field type="text" name="name" as={FormBS.Control} />
                    <ErrorMessage name="name" component={FormBS.Text} />
                </div>
                <div className="form-group">
                    <label>Species</label>
                    <Field type="text" name="species" as={FormBS.Control} />
                    <ErrorMessage name="species" component={FormBS.Text} />
                </div>
                <div className="form-group">
                    <label>Photo</label>
                    <Field type="text" name="photo" as={FormBS.Control} />
                    <ErrorMessage name="photo" component={FormBS.Text} />
                </div>
                <Button type="submit" className="btn btn-primary">Submit</Button>
                <Button type='reset'>Reset</Button>
            </Form>
        </Formik>
    )
}