import SplashScreen from "./splash/SplashScreen";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SplashScreen />
            {children}
        </>
    );
}