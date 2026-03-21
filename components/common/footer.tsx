export default function Footer() {
    return (
        <footer className="py-10">
            <div className="container mx-auto px-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} WHERE. All rights reserved.</p>
            </div>
        </footer>
    )
}