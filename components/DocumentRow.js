import React from "react";
import {useRouter} from "next/dist/client/router";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {buttonCommonProps} from "./utils";

const DocumentRow = ({timestamp, id, fileName}) => {
    const router = useRouter();
    return (
        <div onClick={() => router.push('/doc/'+id)} className='flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer max-w-3xl mx-auto text-sm '>
            <Icon name={'article'} size={'3xl'} color='blue' />
            <p className='flex-grow pl-5 w-10 pr-10 truncate'>{fileName}</p>
            <p className='pr-5 text-sm'>{timestamp?.toDate().toLocaleDateString()}</p>
            <Button {...buttonCommonProps} className='border-0'>
                <Icon name='more_vert' size='3xl' />
            </Button>
        </div>
    )
}

export default DocumentRow;