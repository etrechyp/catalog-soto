import AuthContextProvider from "../context/AuthContext"
import SignUpForm from "../components/Register/SignUpForm"

export default function IndexContainer() {
    return (
        <AuthContextProvider>
            <SignUpForm />
        </AuthContextProvider>
    )
}
