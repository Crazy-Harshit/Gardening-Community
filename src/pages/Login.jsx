import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login, register: registerUser } = useAuth();
  const [userType, setUserType] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password, rememberMe, userType);
    if (!result.success) {
      alert(result.error);
    }
  };

  const onRegister = async (data) => {
    if (userType !== 'gardener') return;
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const res = await registerUser(data.name, data.email, data.password);
    if (res.success) {
      alert(res.message);
      setIsRegistering(false);
      reset();
    } else {
      alert(res.error || 'Registration failed');
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center p-6">
      <div className="login-card glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            🌱 Gardening Community
          </h1>
          {!userType ? (
            <>
              <p className="text-muted mb-6">Select your role to continue</p>
              <div className="space-y-4">
                <button
                  onClick={() => setUserType('admin')}
                  className="w-full btn-primary btn-accent-purple py-3 rounded-lg transition-transform transform hover:-translate-y-0.5 font-semibold flex items-center justify-center space-x-2"
                >
                  <span className="text-xl">👨‍💼</span>
                  <span>Login as Administrator</span>
                </button>
                <button
                  onClick={() => setUserType('gardener')}
                  className="w-full btn-primary btn-accent-green py-3 rounded-lg transition-transform transform hover:-translate-y-0.5 font-semibold flex items-center justify-center space-x-2"
                >
                  <span className="text-xl">🌿</span>
                  <span>Login as Gardener</span>
                </button>
              </div>
            </>
          ) : (
            <p className="text-muted">Sign in as {userType === 'admin' ? 'Administrator' : 'Gardener'}</p>
          )}
        </div>

        {userType && (
          <>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setUserType(null)}
                className="text-muted hover:text-foreground flex items-center gap-2"
              >
                <span>←</span>
                <span>Back</span>
              </button>
            </div>
            
            {userType === 'gardener' && (
              <div className="mb-4 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    reset();
                  }}
                  className="text-sm text-accent-green hover:underline"
                >
                  {isRegistering ? 'Back to Login' : 'Register as Gardener'}
                </button>
              </div>
            )}

            {!isRegistering ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="form-label">Email / Username</label>
                <input
                  type="text"
                  {...register('email', { required: 'Email is required' })}
                  className="form-input"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="form-input"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-accent-green rounded focus:ring-accent-green"
                />
                <label className="ml-2 text-sm text-muted">Remember me</label>
              </div>

              <button
                type="submit"
                className={`w-full btn-primary py-3 rounded-lg transition-transform font-semibold text-white ${
                  userType === 'admin' ? 'btn-accent-purple' : 'btn-accent-green'
                }`}
              >
                Sign In
              </button>
            </form>
            ) : (
              <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
                  <input
                    type="password"
                    {...register('password', { required: 'Password is required', minLength: 6 })}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Create a password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    {...register('confirmPassword', { required: 'Please confirm password' })}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Confirm your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Register
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
