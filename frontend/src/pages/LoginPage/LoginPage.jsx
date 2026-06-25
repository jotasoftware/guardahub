import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import LoginForm from '../../components/loginForm/LoginForm';

function LoginPage() {
    const {login, register, recover} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('login');

    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [recoverEmail, setRecoverEmail] = useState('');


    const handleChangeEmail = (value) => {
        setEmail(value);
    }

    const handleChangePass = (value) => {
        setPassword(value);
    }

    const handleChangeName = (value) => {
        setName(value);
    }

    // const handleChangeRecoverEmail = (event) => {
    //     setRecoverEmail(event.target.value);
    // }

    const validateForm = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if(!regexEmail.test(email)){
            toast.error(`Email invalido`);
            return false;
        }
        if(!regexPass.test(password) && (type === 'signup')){
            toast.warn("Senha deve ter 8+ caracteres, com maiúscula, minúscula, número e símbolo.");
            return false;
        }
        return true;
    };

    // const validateRecoverEmail = () => {
    //     const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if(!regexEmail.test(recoverEmail)){
    //         toast.error(`Email inválido`);
    //         return false;
    //     }
    //     return true;
    // };

    const handleSubmitLogin = async () => {
        setIsLoading(true);
        try{
            await login({ email, password });
            setEmail("");
            setPassword("");
            setName("")
            navigate('/', { replace: true});
        } catch (err){
            toast.error('Email ou senha invalida, tente novamente.');
            setPassword("");
            console.error("Falha no login:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitCreate = async () => {
        setIsLoading(true);
        try{
            await register({email, password, name});
            toast.success('Usuário criado com sucesso.');
            setPassword("");
            setName("")
            setType('login')
        } catch (err){
            toast.error('Usuário não foi criado.');
            console.error("Falha no login:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleContinueRecover = async () => {
    //     if (!validateRecoverEmail()) {
    //         return;
    //     }
    //     setIsLoading(true)
    //     try{
    //         const response = await recover({ recoverEmail});
    //         toast.success(response);
    //         setShowEmailPopup(false)
    //     } catch (err){
    //         toast.error('Email não enviado.');
    //         console.error("Falha na recuperação:", err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const handleClosePopup = () => {
    //     setShowEmailPopup(false);
    //     setRecoverEmail('');
    // };
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (type === 'signup' && !name) {
            toast.warn("Por favor, preencha o nome.");
            return;
        }
        if (!email) {
            toast.warn("Por favor, preencha o e-mail.");
            return;
        }
        if (!password) {
            toast.warn("Por favor, preencha a senha.");
            return;
        }
        
        if(!validateForm()){
            return;
        }
        if (type === 'login') {
            handleSubmitLogin();
        } else {
            handleSubmitCreate();
        }
    };

    return (
        <div className="white w-screen h-screen flex justify-center items-center p-4">
            <div className="relative flex flex-col justify-around bg-zinc-100 shadow-xl shadow-zinc-200/60 text-sm rounded-2xl outline-none text-gray-700 min-w-[300px] w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:w-[40%] h-[80%]">
                <div className="flex-[2] flex justify-center items-center">
                {isLoading ? (
                    <div className="">
                    <Loading />
                    </div>
                ) : (
                    <div className="text-center mb-4 px-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">GUARDA HUB</h1>
                    <h2 className="text-lg sm:text-xl text-gray-500 font-light">Acesse o sistema agora</h2>
                    </div>
                )}
                </div>

                <div className="flex flex-col flex-[5]">
                <form onSubmit={handleFormSubmit} className="flex flex-col p-4 gap-4">
                    
                    {type === "signup" && (
                        
                    <LoginForm
                        label={`Nome: `}
                        value={name || ""}
                        onChange={(v) => handleChangeName(v)}
                        placeholder="Digite o nome"
                    />
                    )}

                    <LoginForm
                    label={`Email: `}
                    value={email || ""}
                    onChange={(v) => handleChangeEmail(v)}
                    placeholder="Digite o email"
                    />
                    <LoginForm
                    label={`Senha: `}
                    value={password || ""}
                    onChange={(v) => handleChangePass(v)}
                    placeholder="Digite a senha"
                    type="password"
                    />

                    {type === "login" ? (
                    <button
                        type="submit"
                        className="mt-4 border border-[#CFCFCF] text-white bg-zinc-700 hover:bg-zinc-900 cursor-pointer outline-none rounded-lg h-[46px] w-full transition-colors duration-200 ease-in-out disabled:bg-[#cccccc] disabled:text-[#666666] disabled:cursor-not-allowe"
                    >
                        Entrar
                    </button>
                    ) : (
                    <button
                        type="submit"
                        className="mt-4 border border-[#CFCFCF] text-white bg-zinc-700 hover:bg-zinc-900 
                        cursor-pointer outline-none rounded-lg h-[46px] w-full transition-colors duration-200 ease-in-out disabled:bg-[#cccccc] disabled:text-[#666666] disabled:cursor-not-allowed"
                    >
                        Criar conta
                    </button>
                    )}
                </form>

                <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-sm">
                    {type === "login" ? (
                    <>
                        <p>Não tem uma conta?</p>
                        <span
                        onClick={() => {
                            setType("signup");
                            setEmail("");
                            setName("");
                            setPassword("");
                        }}
                        className="border-none bg-transparent p-0 outline-none cursor-pointer 
                         hover:text-bg-zinc-900"
                        >
                        Criar conta
                        </span>
                    </>
                    ) : (
                    <>
                        <p>Já tem uma conta?</p>
                        <span
                        onClick={() => {
                            setType("login");
                            setEmail("");
                            setName("");
                            setPassword("");
                        }}
                        className="border-none bg-transparent p-0 outline-none cursor-pointer 
                        hover:text-bg-zinc-900"
                        >
                        Entrar
                        </span>
                    </>
                    )}
                </div>
                </div>
            </div>
            {/* <div className="flex-[5] flex items-center justify-center h-full p-10">
                <div className="flex flex-col items-center justify-center h-[80%] w-full">
                    <div className="text-center mb-4">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            GERAPETI
                        </h1>
                        <h2 className="text-xl text-gray-500 font-light">
                            Petições em instantes
                        </h2>
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                    <img
                        src="GeraPetiLogin.png"
                        alt="Login"
                        className="max-h-full max-w-full object-contain"
                    />
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default LoginPage;