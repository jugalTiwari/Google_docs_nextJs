import {useRef} from "react";
import Button from '@material-tailwind/react/Button'
import Icon from "@material-tailwind/react/Icon";
import {signOut, useSession} from "next-auth/client";

import {buttonCommonProps} from "./utils";

const Header = () => {
    const [session] = useSession()

    return (
        <header className='flex items-center sticky top-0 z-50 px-5 py-2 bg-white shadow-md'>
            <Button
                {...buttonCommonProps}
                className='md:inline-flex h-20 w-20 border-0'
            >
                <Icon name={'menu'} size='3xl' />
            </Button>
            <Icon name='description' size='5xl' color='blue' />
            <h1 className='md:inline-flex ml-2 text-gray-700 text-2xl'>Docs</h1>
            <div className='flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg mx-5 md:mx-20 focus-within:text-gray-600 focus-within:shadow-md'>
                <Icon name='search' size='3xl' color='gray'/>
                <input type='text' placeholder='Search' className='outline-none flex-grow px-5 text-base bg-transparent'/>
            </div>
            <Button
                {...buttonCommonProps}
                className='md:inline-flex ml-2 md:ml-20 h-20 w-20 border-0'
            >
                <Icon name={'apps'} size={'3xl'} />
            </Button>
            <img
                loading='lazy'
                className={'cursor-pointer h-12 w-12 rounded-full ml-2'}
                src={session?.user?.image}
                alt={session?.user?.name}
                title={'Click to logout'}
                onClick={signOut}
            />
        </header>
    )
}

export default Header