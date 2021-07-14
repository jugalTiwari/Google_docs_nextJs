import React, {useState, useEffect, useRef} from "react";
import {useRouter} from "next/dist/client/router";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {buttonCommonProps} from "./utils";
import {db} from "../firebase";
import {useSession} from "next-auth/client";

/**
 * custom hook that handles clicks outside of the passed ref
 */
const useOutsideHandler = (ref, onOutsideClick) => {
    useEffect(() => {
        const onClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick(false);
            }
        };

        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [ref]);
};

const DocumentRow = ({timestamp, id, fileName}) => {
    const router = useRouter();
    const ref = useRef(null)
    const [session] = useSession()
    const [showMenu, setShowMenu] = useState(false)

    const deleteFile = () => {
        db.collection("userDocs").doc(session.user.email).collection('docs').doc(id).delete().then(r => {
            location.reload();
        })
    }
    useOutsideHandler(ref, setShowMenu);

    return (
        <div className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 max-w-3xl mx-auto text-sm '>
            <Icon name={'article'} size={'3xl'} color='blue' />
            <p className='flex-grow pl-5 w-10 pr-10 truncate hover:underline cursor-pointer' onClick={() => router.push('/doc/'+id)} >{fileName}</p>
            <p className='pr-5 text-sm'>{timestamp?.toDate().toLocaleDateString()}</p>
            <div className='relative'>
                <Button {...buttonCommonProps} className='border-0'>
                    <Icon name='more_vert' size='3xl' onClick={() => setShowMenu(true)} />
                </Button>
                {showMenu && <div ref={ref} onClick={deleteFile} className='absolute z-10 rounded-lg shadow-md w-20 h-10 cursor-pointer bg-white flex items-center justify-center hover:bg-gray-50'>
                    Delete
                </div>}
            </div>
        </div>
    )
}

export default DocumentRow;