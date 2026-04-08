const WelcomeFold = () => (
    <div className="bg-accent text-gray-900 text-center py-8 shadow-md">
        <div className="flex items-center justify-center">
            <span className="text-7xl hidden sm:block text-right">{'{'}</span>
            <div className="mx-8">
                <h1 className="font-bold">Matt Schwartz</h1>
                <hr className="border-t-2 border-gray-900 max-w-[350px] mx-auto my-2" />
                <div className="mb-1">Amazon Prime Video, SDE</div>
            </div>
            <span className="text-7xl hidden sm:block text-left">{'}'}</span>
        </div>
    </div>
);

export default WelcomeFold;
