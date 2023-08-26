'use client'
import { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import UserContext from '../contexts/UserContext'
import * as Yup from "yup"

export default function LoginForm () {
    // const {user, setUser} = useContext(UserContext)
    const [error, setError] = useState(null)

	// INITIAL VALUES
	const initialValues = {
		username: "",
		password: ""
	}
	// VALIDATION SCHEMA
	const validationSchema = Yup.object({
		username: Yup.string()
			.required("Username is required")    
			.min(5, "Username must be at least 5 characters")
			.max(40, "Username must be less than 40 characters"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters")
			.max(40, "Password must be less than 40 characters")
	})
	
	const handleSubmit = (values) => {
		console.log(values)
		fetch('/login', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(values)
		}).then(r=>{
			if (r.ok){
				r.json().then(user=>{
					console.log(user)
					setUser(user)
					// navigate('/dashboard')	
				})
			} else {
				r.json().then(err=>{
					console.log(err)
					setError(err)
				})
			}
		})
	}
	
return (
<Formik
	initialValues={initialValues}
	validationSchema={validationSchema}
	onSubmit={(values) => { handleSubmit(values) }}
>{(formik) => {
	const { errors, touched, isValid, dirty } = formik
	return (<div className='container'>
		<h2>Log In</h2>
		<Form> {/* <-------- LOGIN -------->  */}
			<div className='form-row'> {/* <-------- username --------> */}
				<label htmlFor='username'>Username</label>
				<Field type='username' name='username' id='username' className={errors.username && touched.username ? 'input-error' : null} />
				<ErrorMessage name='username' component='span' className='error' />
			</div>
			<div className='form-row'> {/* <-------- password --------> */}
				<label htmlFor='password'>Password</label>
				<Field type='password' name='password' id='password' className={errors.password && touched.password ? 'input-error' : null} />
				<ErrorMessage name='password' component='span' className='error' />
			</div>
			{/* <-------- SUBMIT --------> */}
			<button type='submit' className={!(dirty && isValid) ? 'disabled-btn' : ''} disabled={!(dirty && isValid)}>Log In</button>
		</Form>
	</div>)}
}</Formik>
)}