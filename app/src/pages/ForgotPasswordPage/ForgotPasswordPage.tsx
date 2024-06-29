import React, { useState, useEffect } from 'react';
import { forgotPassword, resetPassword } from '../../services/authService';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    const handleSendCode = async (resendCode: Boolean) => {
        try {
            await forgotPassword(email);
            if (!resendCode)
                setStep(2);
            else {
                setIsButtonDisabled(true);
                setTimer(60); // Set timer to 60 seconds
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else {
            setIsButtonDisabled(false);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleResetPassword = async () => {
        try {
            if (newPassword !== confirmPassword) {
                setError("Passwords do not match")
                return;
            }
            await resetPassword(email, code, newPassword);
            navigate("/login");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8">
            <div className="font-sansLogo gradient-text text-2xl">OpenGlot</div>
            <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-4xl font-bold">You are almost there!</h1>
            </div>

            {step === 1 && (
                <>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Please enter your details to reset your password
                    </p>
                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button width='w-28' onClick={() => handleSendCode(false)} variant="filled">
                        Send Code
                    </Button>
                </>
            )}
            {step === 2 && (
                <>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Please enter code received on email and New password
                    </p>
                    <InputField
                        id="code"
                        label="Code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <InputField
                        id="newPassword"
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputField
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {message && <p className="text-green-500">{message}</p>}
                    <Button width='w-96' onClick={handleResetPassword} variant="filled">
                        Submit
                    </Button>
                    <div>
                        Didn't receive it?{" "}
                        <button className={`${isButtonDisabled ? 'disabled' : 'link '}`}
                            onClick={() => handleSendCode(true)} disabled={isButtonDisabled}>
                            Resend Code {isButtonDisabled && `(${timer}s)`}
                        </button>
                    </div>
                </>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ForgotPassword;
