import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(authError);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values.email, values.password);
        navigate('/'); // Redirect to dashboard on successful login
      } catch (err) {
        setError(err.message || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            className={`w-full px-3 py-2 border rounded-md ${
              formik.touched.email && formik.errors.email 
                ? 'border-red-500' 
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            className={`w-full px-3 py-2 border rounded-md ${
              formik.touched.password && formik.errors.password 
                ? 'border-red-500' 
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
        
        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 ${
            formik.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
