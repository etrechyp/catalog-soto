import AuthContextProvider from "../context/AuthContext"
import LogInForm from "../components/Index/LogInForm"

export default function IndexContainer() {
    return (
        <AuthContextProvider>
            <LogInForm />
        </AuthContextProvider>
    )
}
