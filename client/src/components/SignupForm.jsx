'use client'
import { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import UserContext from "../contexts/UserContext"

export default function SignupForm () {
    // const {user, setUser} = useContext(UserContext)

	const initialValues = {
		email : "",
		username: "",
		password: ""
	}
	const validationSchema = Yup.object({
		email: Yup.string()
			.email()
			.required("Email is required"),
		username: Yup.string()
			.required("Username is required")
			.min(5, "Username must be at least 5 characters")
			.max(40, "Username must be less than 40 characters"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters")
			.max(40, "Password must be less than 40 characters")
	})

	return (
		<Formik 
			initialValues={initialValues} 
			validationSchema={validationSchema}
			onSubmit={(values) => {console.log(values)}}>
			{(formik) => {
				const { errors, touched, isValid, dirty } = formik
				return (
					<div className='container'>
						<h2>Create an account!</h2>
						<Form>
							<div className='form-row'>
								<label htmlFor='email'>Email</label>
								<Field type='email' name='email' id='email' 
									className={errors.email && touched.email ? 'input-error' : null}
								/>
								<ErrorMessage name='email' component='span' className='error' />
							</div>
							
							<div className='form-row'>
								<label htmlFor='username'>Username</label>
								<Field type='username' name='username' id='username' 
									className={errors.username && touched.username ? 'input-error' : null}
								/>
								<ErrorMessage name='username' component='span' className='error' />
							</div>
							<div className='form-row'>
								<label htmlFor='password'>Password</label>
								<Field type='password' name='password' id='password' 
									className={errors.password && touched.password ? 'input-error' : null}
								/>
								<ErrorMessage name='password' component='span' className='error' />
							</div>
							<button type='submit' className={!(dirty && isValid) ? 'disabled-btn': ''} disabled={!(dirty && isValid)}>Sign Up</button>
						</Form>
					</div>
				)
			}
		}</Formik>
	)}