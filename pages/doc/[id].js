import React from "react";
import {getSession, useSession} from "next-auth/client";
import Login from "../../components/Login";
import Icon from "@material-tailwind/react/Icon";
import {useRouter} from "next/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Button from "@material-tailwind/react/Button";
import {buttonCommonProps} from "../../components/utils";
import TextEditor from "../../components/TextEditor";

const Doc = () => {
    const [session] = useSession();
    if(!session) return <Login />;

    const router = useRouter(),
        {id} = router.query

    const [snapshot, loading] = useDocumentOnce(
            db.collection('userDocs')
                .doc(session?.user.email)
                .collection('docs')
                .doc(id)
        );

    if(loading) return null

    if(!snapshot.data().fileName) {
        router.replace('/');
    }
    return (
        <div>
            <header className='flex justify-between items-center p-3 pb-1'>
                <span onClick={() => router.push('/')} className='cursor-pointer'>
                    <Icon name='description' size='5xl' color='blue'/>
                </span>
                <div className={'flex-grow px-2 '}>
                    <h2>{snapshot?.data()?.fileName}</h2>
                    <div className='flex items-center text-sm space-x-1 -ml-1 text-gray-600'>
                        <p className='option'>File</p>
                        <p className='option'>Edit</p>
                        <p className='option'>View</p>
                        <p className='option'>Insert</p>
                        <p className='option'>Format</p>
                        <p className='option'>Tools</p>
                    </div>
                </div>
                <Button
                    size='regular'
                    block={false}
                    rounded={false}
                    iconOnly={false}
                    ripple='light'
                    className='hidden md:inline-flex h-10 border-0'
                >
                    <Icon name='people' size='md' /> Share
                </Button>
                <img src={session.user.image} className='cursor-pointer rounded-full h-10 w-10 ml-2'  alt={''}/>
            </header>
            <TextEditor />
        </div>
    )
}

export default Doc;

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context)
        }
    }
}