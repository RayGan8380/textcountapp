import React from 'react'

const Header = () => {
    return (
        <header className="text-gray-600 bg-gray-100 mt-20 bg-opacity-75 body-font ">
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Text Counter</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Upload chat log files(.txt) to count how many words a user has chatted.</p>
                </div>
            </div>
        </header>
    )
};

export default Header;