import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import logo from '../assets/images/logo14.png'
import OAuth from '../components/OAuth'

const schema = z
  .object({
    username: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5, { message: 'phone number invalid' }).max(15),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  })

type FormFields = z.infer<typeof schema>

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    axios
      .post('/api/auth/register', {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })
      .then((msg: any) => {
        toast.success(msg.data || 'Account Created Successfully')
        navigate('/login')
      })
      .catch((error) => {
        setError('root', { message: error.response.data })
      })
  }
  return (
    <>
      <section className="authsec">
        <div className="section">
          <div className="signin">
            <div className="content">
              <div className="img">
                <img src={logo} alt="" />
              </div>
              <h2>Sign Up</h2>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                {errors.root && (
                  <div className="alert alert-danger" role="alert">
                    {errors.root.message}
                  </div>
                )}

                <div className="inputBox">
                  <input
                    {...register('username')}
                    type="text"
                    placeholder="username"
                  />
                  {errors.username && (
                    <div style={{ color: 'tomato' }}>
                      {errors.username.message}
                    </div>
                  )}
                </div>

                {/* autocomplete try set it to off using zod of default form */}
                <div className="inputBox">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <div style={{ color: 'tomato' }}>
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="inputBox">
                  <input
                    {...register('phone')}
                    type="number"
                    placeholder="Phone"
                  />
                  {errors.phone && (
                    <div style={{ color: 'tomato' }}>
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                <div className="inputBox">
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                  />

                  {errors.password && (
                    <div style={{ color: 'tomato' }}>
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className="inputBox">
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <div style={{ color: 'tomato' }}>
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                <div className="links">
                  <a href="#">Already have an account?</a>
                  <a href="/login">Login</a>
                </div>
                <div className="inputBox">
                  <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Loading...' : 'Submit'}
                  </button>
                </div>
                <OAuth />
                <div className="tandc">
                  <span>By signing up you accept our </span>
                  <a href="/content/terms-and-conditions" target="_blank">
                    terms and conditions
                  </a>
                  <div>
                    <a href="/content/privacy-policy" target="_blank">
                      &amp; privacy policy
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
