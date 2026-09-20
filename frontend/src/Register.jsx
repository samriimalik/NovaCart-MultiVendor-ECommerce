import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './services/api';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'customer'
      });

      setMessage('Account created successfully!');

      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0 p-4">

            <h2 className="text-center mb-2">
              Create Account
            </h2>

            <p className="text-center text-muted mb-4">
              Create your NovaCart buyer account
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your real email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

            </form>

            {message && (
              <div className="alert alert-info mt-3 mb-0">
                {message}
              </div>
            )}

            <div className="text-center mt-3">
              Already have an account?{' '}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}