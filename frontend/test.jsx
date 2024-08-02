import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 접근성을 위해 필요한 설정입니다.

const App = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded">
                Open Modal
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full m-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-2xl font-semibold mb-4">Modal Title</h2>
                <p className="text-gray-700 mb-4">This is the modal content.</p>
                <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded">
                    Close Modal
                </button>
            </Modal>
        </div>
    );
}

export default App;
