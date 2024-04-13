import { Input, Button, Container } from "..";
import { useState, useRef } from "react";
import { login } from "../../features/authSlice";
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState('')
  const onSubmit = async (data) => {
    setError('')
    try {
      const session = await authService.registerUser(data)
      console.log(session)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login(userData))
        navigate('/')
      }
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  return (
    <Container flexBox bgColor="bg-neutral-300 dark:bg-neutral-700" className="flex-1 py-2">
      <Container className="max-w-lg rounded-2xl p-5 my-auto" bgColor="bg-white dark:bg-neutral-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container flexBox flexProp="!gap-1">
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-300">Register</h2>
            <p className="text-neutral-700 dark:text-neutral-400">
              Already have a account? <Link to="/login" className="text-fuchsia-500">Login</Link>
            </p>
          </Container>
          <Input label="Name" name="name" {...register('name', {
            required: 'name is required'
          })} />
          {errors?.name &&
            <p className="w-full text-red-500 text-center flex justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
              {errors.name.message}</p>}
          <Input label="Email" name="email" type="email" {...register('email', {
            required: 'email is required',
            pattern: {
              value: /^[a-z0-9._]+@[a-z]+\.[a-z]+$/,
              message: 'enter a valid email address'
            }
          })} />
          {errors?.email &&
            <p className="w-full text-red-500 text-center flex justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
              {errors.email.message}</p>}
          <Input label="Password" name="password" type="password" {...register('password', {
            required: 'password is required',
            minLength: { value: 8, message: 'password must contain atleast 8 characters' },
            maxLength: { value: 16, message: 'password must contain atmost 16 characters' },
            pattern: {
              value: /^[a-zA-Z0-9@%&-_]+$/,
              message: 'password can only contain lowercase, uppercase, number, special chars[@, %, &, -, _]'
            }
          })} />
          {errors?.password &&
            <p className="w-full text-red-500 text-center flex justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
              {errors.password.message}</p>}
          <Container flexBox className="py-5">
            <Button label={'Register'} />
          </Container>
        </form>
      </Container>
    </Container >
  );
}

export default Register;