import React from "react";
import Image from "next/image";
import Button from "@material-tailwind/react/Button";
import {signIn} from "next-auth/client";

const Login = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen py-2'>
            <Image height={300} width={550} src={'https://links.papareact.com/1ui'} objectFit='contain'/>
            <Button
                className='w-44 mt-10'
                color='blue'
                buttonType='filled'
                ripple='light'
                onClick={signIn}
            >Login</Button>
        </div>
    )
}

export default Login;