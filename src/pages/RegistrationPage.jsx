import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import {
  validateName,
  validateUsername,
  validateEmail,
  validateMobile,
  validateRegistrationForm,
  isFormValid,
} from '../utils/validators';
import { ROUTES } from '../utils/constants';

const initialValues = { name: '', username: '', email: '', mobile: '' };

const RegistrationPage = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const validators = {
    name: validateName,
    username: validateUsername,
    email: validateEmail,
    mobile: validateMobile,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateRegistrationForm(values);
    setErrors(formErrors);
    setTouched({ name: true, username: true, email: true, mobile: true });

    if (!isFormValid(formErrors)) return;

    setUser(values);
    navigate(ROUTES.CATEGORIES, { replace: true });
  };

  const canSubmit =
    values.name.trim() &&
    values.username.trim() &&
    values.email.trim() &&
    values.mobile.trim();

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-line bg-panel p-8 shadow-card animate-fadeIn">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent font-display text-lg font-bold text-white">
            SA
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Step 1 of 2 &mdash; tell us about yourself
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? errors.name : ''}
            placeholder="Jane Doe"
          />
          <Input
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username ? errors.username : ''}
            placeholder="janedoe"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            placeholder="jane@example.com"
          />
          <Input
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobile ? errors.mobile : ''}
            placeholder="9876543210"
          />

          <Button type="submit" disabled={!canSubmit} fullWidth className="mt-2">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
