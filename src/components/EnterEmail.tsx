import { Modal } from "flowbite-react";

interface EnterEmailProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export const EnterEmailModal: React.FC<EnterEmailProps> = ({
  openModal,
  setOpenModal,
}) => {
  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className="flex flex-col gap-4 mx-auto w-[50%]">
            <button
              type="button"
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              Enter your email
            </button>
            <button
              type="button"
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-red-800 shadow-sm hover:bg-red-100"
            >
              Connect your wallet
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
