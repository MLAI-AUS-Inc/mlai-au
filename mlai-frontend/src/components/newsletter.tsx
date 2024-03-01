import SubstackSignup from '../components/SubstackSignup';

export default function Newsletter() {
    return (
        < div className="bg-white py-16 sm:py-24 lg:py-32" >
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-4 lg:px-8">
                <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-5 lg:mt-6">
                    <h2 className="inline sm:block lg:inline xl:block">Want to stay in the loop?</h2>{' '}
                    <p className="inline sm:block lg:inline xl:block">Sign up for our newsletter.</p>
                </div>

                {/* Substack Signup Component */}
                <div className="w-full max-w-md mx-auto lg:mx-0 lg:col-span-7 lg:pt-2">
                    <SubstackSignup />
                </div>
            </div>
        </div >
    )
}