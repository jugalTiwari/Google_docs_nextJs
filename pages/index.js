import React, {useState,useEffect} from "react";
import firebase from "firebase";
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
import Head from 'next/head'
import Header from "../components/Header";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import Image from "next/image";
import Modal from "@material-tailwind/react/Modal";
import { getSession, useSession } from 'next-auth/client';
import Login from "../components/Login";

import {buttonCommonProps} from "../components/utils";
import {db} from '../firebase'
import DocumentRow from "../components/DocumentRow";
import {useRouter} from "next/router";

function getData(session) {
    return useCollectionOnce(
        db.collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .orderBy('timestamp', 'desc')
    )
}

export default function Home() {
    const [session] = useSession();

    if(!session) {
        return <Login />
    }

    const [showModal, setModal] = useState(false),
        router = useRouter(),
        [input, setInput] = useState(''),
        [snapshot] = useCollectionOnce(
            db.collection('userDocs')
                .doc(session.user.email)
                .collection('docs')
                .orderBy('timestamp', 'desc')
        )

    function createDocument() {
        if(!input) return;

        db.collection('userDocs').doc(session.user.email)
            .collection('docs')
            .add({
                fileName: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(res => {
                const {id = ''} = res || {};
                if (id){
                    setInput('')
                    setModal(false)
                    router.push('/doc/'+ id)
                }
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

    }

    const modal = (
        <Modal size='sm' active={showModal} toggler={() => setModal(false)}>
            <ModalBody>
                <input className='outline-none w-full' value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Enter name of document' onKeyDown={e=> e.key === 'Enter' && createDocument()}/>
            </ModalBody>
            <ModalFooter>
                <Button color='blue' buttonType='link' onClick={e=> setModal(false)}>Cancel</Button>
                <Button color='blue' ripple='light' onClick={createDocument}>Create</Button>
            </ModalFooter>
        </Modal>
    )

  return (
    <div className="">
      <Head>
        <title>Google Docs Clone using NextJs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Header />

        <section className='bg-[#F8F9FA] pb-10 px-10'>
            <div className='max-w-3xl mx-auto'>
                <div className='py-6 flex flex-center justify-between'>
                    <h2 className='text-gray-700 text-lg'>Start a new document</h2>
                    <Button {...buttonCommonProps} className='border-0 h-10 w-10'>
                        <Icon name='more_vert' />
                    </Button>
                </div>
                <div onClick={() => setModal(true)}>
                    <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'>
                        <Image src='https://links.papareact.com/pju' layout='fill'/>

                    </div>
                    <p className='ml-2 mt-2 font-semibold text-sm'>Blank</p>
                </div>
            </div>
        </section>
        {modal}

        <section className='bg-white px-10 md:px-0'>
            <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
                <div className='flex items-center justify-between pb-5'>
                    <h2 className='font-medium flex-grow'>My Documents</h2>
                    <p className='mr-12'>Date Created</p>
                    <Icon name='folder' size='3xl' color='gray'/>
                </div>
            </div>
            {snapshot?.docs?.map((doc) => {
                return <DocumentRow
                    key={doc.id}
                    id={doc.id}
                    fileName={doc.data().fileName}
                    timestamp={doc.data().timestamp}
                />
            })}
        </section>
    </div>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: { session }
    }
}
