import AuthContextProvider from '../context/AuthContext';
import LogInForm from '../components/Index/LogInForm';
import LoginSignupLayout from '../layouts/LoginSignupLayout';

export default function IndexContainer() {
  return (
    <AuthContextProvider>
      <LoginSignupLayout>
        <LogInForm />
      </LoginSignupLayout>
    </AuthContextProvider>
  );
}
