import SelectLanguage from '../components/shared/SelectLanguage';

export default function LoginSignupLayout({ children }) {
  return (
    <>
      <SelectLanguage />
      {children}
    </>
  );
}
