import React from 'react';
import useAuth from '../../hooks/useAuth';
import { savedUserInDb } from '../../api/utils';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const handleGoogleSign = () => {
        signInGoogle()
            .then(async (res) => {
                console.log(res.user);
                const user = res.user;
                const userData = {
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL
                }
                console.log('usrData', userData);

                // update and Save user from db
                await savedUserInDb(userData)
                navigate(from);


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