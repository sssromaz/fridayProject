import React from 'react'
import Input from '../../../common/components/Input/Input'
import { Link, Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../../common/hook/hook'
import { setIsRegister, signUpTC } from './registerReducer'

import Button from '../../../common/components/Button/Button'
import { InputPass } from '../../../common/components/InputPass/InputPass'

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export function Register() {
  const isRegister = useAppSelector((state) => state.register.isRegister)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: (values) => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Empty field!'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address!'
      }

      if (!values.password) {
        errors.password = 'Empty field!'
      } else if (!/^[A-Z0-9._%+-]{8,32}$/i.test(values.password)) {
        errors.password = 'Password must be more than 7 characters!'
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Empty field!'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Invalid password'
      }
      return errors
    },

    onSubmit: (values) => {
      dispatch(signUpTC(values.email, values.password))
      formik.resetForm()
    },
  })

  if (isRegister) {
    dispatch(setIsRegister(false))
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>Sign Up</h2>
        <div>
          <Input type={'email'} placeholder={'Email'} {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}
        </div>

        <div>
          <InputPass
            autoComplete="off"
            placeholder={'Password'}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
        </div>

        <div>
          <InputPass
            autoComplete="off"
            placeholder={'confirm Password'}
            {...formik.getFieldProps('confirmPassword')}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
          )}
        </div>

        <div>
          <Button type={'submit'}>Sign Up</Button>
        </div>

        <p>Already have an account?</p>
        <div>
          <Link to={'/login'}>Sign In</Link>
        </div>
      </form>
    </div>
  )
}
