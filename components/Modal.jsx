import { async } from '@firebase/util';
import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Picker } from 'emoji-mart';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Fragment, useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';

import { modalState, postIdState } from '../atoms/modalAtom';
import { db } from '../firebase';

const Modal = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [postId, setPostId] = useRecoilState(postIdState);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot) =>
        setPost(snapshot.data())
      ),
    [db]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'posts', postId, 'comments'), {
      comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setIsOpen(false);
    setComment('');
    setShowEmojis(false);

    router.push(`/${postId}`);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed z-50 inset-0 pt-8' onClose={setIsOpen}>
        <div className='flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-[#5b7083] bg-opacity-30 transition-opacity' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-slate-900 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full'>
              <div className='flex items-center px-1.5 py-2 border-b border-gray-700'>
                <div
                  className='w-9 h-9 hoverAnimation flex justify-center items-center xl:px-0'
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className='h-[22px] text-white' />
                </div>
              </div>
              <div className='flex px-4 pt-5 pb-2.5 sm:px-6'>
                <div className='w-full'>
                  <div className='flex gap-x-3 relative text-[#6e767d]'>
                    <span className='w-0.5 z-[-1] h-full absolute top-11 left-5 bg-gray-600' />
                    <img
                      className='rounded-full w-11 h-11'
                      src={post?.userImg}
                      alt={post?.text}
                    />
                    <div>
                      <div className='group inline'>
                        <h4 className='text-[#d9d9d9] text-[15px] inline-block sm:text-base'>
                          {post?.username}
                        </h4>
                        <span className='text-sm ml-1.5 sm:text-[15px]'>
                          @{post?.tag}{' '}
                        </span>
                      </div>{' '}
                      .{' '}
                      <span className='text-sm sm:text-[15px] hover:underline'>
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className='sm:text-base text-[15px] text-[#d9d9d9]'>
                        {post?.text}
                      </p>
                    </div>
                  </div>
                  <div className='flex space-x-3 mt-7 w-full'>
                    <img
                      src={session.user.image}
                      alt='user'
                      className='rounded-full w-11 h-11'
                    />
                    <div className='mt-2 flex-grow'>
                      <textarea
                        className='outline-none bg-transparent text-lg text-[#d9d9d9] placeholder-gray-500 w-full tracking-wide min-h-[80px]'
                        rows='2'
                        placeholder='Reply'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className='flex justify-between items-center pt-2.5'>
                        <div className='flex items-center'>
                          <di className='icon'>
                            <PhotographIcon className='h-[22px] text-[#1d9bf0]' />
                          </di>
                          <di className='icon rotate-90'>
                            <ChartBarIcon className='h-[22px] text-[#1d9bf0]' />
                          </di>
                          <di className='icon'>
                            <EmojiHappyIcon
                              className='h-[22px] text-[#1d9bf0]'
                              onClick={() => setShowEmojis(!showEmojis)}
                            />
                          </di>
                          <di className='icon'>
                            <CalendarIcon className='h-[22px] text-[#1d9bf0]' />
                          </di>
                        </div>
                        <button
                          type='submit'
                          disabled={!comment.trim()}
                          className='text-white bg-indigo-400 rounded-full px-4 py-1.5 shadow-md font-bold hover:bg-indigo-500 disabled:hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150'
                          onClick={sendComment}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
          {showEmojis && (
            <Picker
              onSelect={addEmoji}
              style={{
                position: 'absolute',
                marginTop: '330px',
                marginLeft: '-575px',
                maxWidth: '320px',
                borderRadius: '20px',
              }}
              theme='dark'
            />
          )}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
