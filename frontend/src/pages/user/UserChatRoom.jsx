import TrainerImg from '../../assets/static/img_TrainerKim.png'
import Camera from '../../assets/static/Property_Camera.png'
import React, { useState } from 'react';
import Modal from 'react-modal';
import OffCall from '../../assets/static/Property_OffCall.png'
import FatCat from '../../assets/static/img_FatCat.png'

Modal.setAppElement('#root')

const UserChatRoom = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex items-start gap-2.5 ml-[10px] mr-[80px] mb-[12px]">
                    <img className="w-[45px] h-[45px] rounded-full" src={TrainerImg} alt="TrainerImg" />
                    <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">김계란</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-white rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <p className="text-sm text-gray-900 dark:text-white font-bold">그렇게 드시면 10살까지 밖에 못살아요. 어? 왜 살아있지?</p>
                        </div>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">확인함</span>
                    </div>
                </div>
                <div className="flex items-start gap-2.5 ml-[80px] mr-[10px] mb-[12px]">
                    <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mr-[0px]">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-yellow-400 rounded-b-xl rounded-l-xl dark:bg-gray-700">
                            <p className="text-sm font-bold text-white dark:text-white">아직까지 살아있는 기념으로 마라탕먹어도 되죠?</p>
                        </div>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">확인함</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-row bg-white h-[48px]'>
                <div className='m-auto w-[45p] h-[39px]'>
                    <button onClick={openModal}>
                        <img src={Camera} alt="카메라" />
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="relative bg-white w-[360px] h-[800px]"
                        overlayClassName="fixed inset-0 bg-black flex items-center justify-center"
                    >
                        <img src={TrainerImg} alt="김계란" className='absolute w-full h-[750px] z-0'/>
                        <img src={FatCat} alt='회원님' className='absolute z-10 bottom-[56px]'/>
                        <div className='fixed bg-black w-[360px] h-[56px] bottom-0 flex items-center justify-center'>
                        <button onClick={closeModal} className="w-[61px] h-[50px] rounded-[12px] bg-red-500 text-white rounded">
                            <img src={OffCall} alt="전화끊기" className='m-auto'/>
                        </button>
                        </div>
                    </Modal>
                </div>
                <div className="w-[300px] m-auto pl-[4px]">
                    <input
                        type="text"
                        placeholder="메세지를 입력하세요"
                        className="w-full dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>

            {/* <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
            </button> */}
            {/* <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </li>
                </ul>
            </div> */}
        </div>
    );
}

export default UserChatRoom;
