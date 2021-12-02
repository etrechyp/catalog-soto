import AuthContextProvider from '../context/AuthContext';
import SignUpForm from '../components/Register/SignUpForm';
import LoginSignupLayout from '../layouts/LoginSignupLayout';

export default function IndexContainer() {
  return (
    <AuthContextProvider>
      <LoginSignupLayout>
        <SignUpForm />
      </LoginSignupLayout>
    </AuthContextProvider>
  );
}
