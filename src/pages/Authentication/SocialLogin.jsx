import React from 'react';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const { signInGoogle } = useAuth();

    const handleGoogleSign = () => {
        signInGoogle()
            .then(async (res) => {
                console.log(res.user);

               

                // upload user information in database
               

            }).catch(err => {
                console.log(err);

            })
    }

    return (
        <div>
            {/* Google Sign In */}
            <button onClick={handleGoogleSign}
                type="button"
                className="btn btn-outline w-full flex items-center gap-2"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                Sign Up with Google
            </button>
        </div>
    );
};

export default SocialLogin;