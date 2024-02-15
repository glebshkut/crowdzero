import { CheckCircle, Wallet } from "@phosphor-icons/react";
import { ModalStage } from "../lib/modal";
import { Link } from "react-router-dom";
import { Routes } from "@/constants/routes";

export default function ProcessingModal({
  stage
}: {
  stage: ModalStage | null;
}) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-dark py-10 flex flex-col gap-6 justify-between items-center">
        {
          stage === ModalStage.Approve ? (
            <>
              <Wallet size={40} />
              <span className="font-bold text-3xl text-action">Approve</span>
              <p className="text-center">Confirm transaction in your wallet</p>
            </>
          ) : stage === ModalStage.Processing ? (
            <>
              <span className="loading loading-spinner" />
              <span className="font-bold text-3xl text-action/70">Processing</span>
              <p className="text-center">Wait for transaction to complete</p>
            </>
          ) : (
            <>
              <CheckCircle size={40} />
              <span className="font-bold text-3xl text-blue">Complete</span>
              <p className="text-center">You have funded this project! Your funds are held in escrow until this project meets its target.</p>
              <Link to={Routes.MY_PROJECTS} className="btn btn-primary">Go to Funded Projects</Link>
            </>
          )
        }
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}