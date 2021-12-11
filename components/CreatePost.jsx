import { useSession, signOut } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';

import { db, storage } from '../firebase';

const CreatePost = () => {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [input, setInput] = useState('');
  const [showEmojiis, setShowEmojiis] = useState(false);
  const filePickerRef = useRef(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const makePost = async () => {
    if (isloading) return;
    setIsloading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      try {
        await uploadString(imageRef, selectedFile, 'data_url').then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            const res = await updateDoc(doc(db, 'posts', docRef.id), {
              image: downloadURL,
            });
            console.log('RES: ', res);
          }
        );
      } catch (error) {
        console.log('ERROR: ', error);
      }
    }

    setIsloading(false);
    setInput('');
    setSelectedFile(null);
    setShowEmojiis(false);
  };
  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${
        isloading && 'opacity-60'
      }`}
    >
      <img
        className='h-11 w-11 rounded-full cursor-pointer'
        src={session.user.image}
        alt='user'
        onClick={signOut}
      />
      <div className='divide-y divide-gray-700 w-full'>
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='bg-transparent outline-none w-full text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide min-h-[50px]'
            placeholder="What's happening?"
            rows='2'
          />
          {selectedFile && (
            <div className='relative'>
              <div
                className='absolute w-8 h-8 hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className='text-white h-5' />
              </div>
              <img
                className='rounded-2xl max-h-80 object-contain'
                src={selectedFile}
                alt='post'
              />
            </div>
          )}
        </div>
        {!isloading && (
          <div className='flex items-center justify-between pt-2.5'>
            <div className='flex items-center'>
              <div
                className='icon'
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className='text-indigo-500 h-[22px]' />
                <input
                  type='file'
                  ref={filePickerRef}
                  hidden
                  onChange={addImageToPost}
                />
              </div>
              <div className='icon rotate-90'>
                <ChartBarIcon className='text-indigo-500 h-[22px]' />
              </div>
              <div className='icon'>
                <EmojiHappyIcon
                  className='text-indigo-500 h-[22px]'
                  onClick={() => setShowEmojiis(!showEmojiis)}
                />
              </div>
              <div className='icon'>
                <CalendarIcon className='text-indigo-500 h-[22px]' />
              </div>
              {showEmojiis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                  theme='dark'
                />
              )}
            </div>
            <button
              className='bg-indigo-400 text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-indigo-500 disabled:hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!input && !selectedFile}
              onClick={makePost}
            >
              Make a post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
