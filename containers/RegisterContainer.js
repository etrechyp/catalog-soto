import LoginSignupLayout from '../layouts/LoginSignupLayout';
import SignUpForm from '../components/Register/SignUpForm';

export default function IndexContainer() {
  return (
    <LoginSignupLayout>
      <SignUpForm />
    </LoginSignupLayout>
  );
}
