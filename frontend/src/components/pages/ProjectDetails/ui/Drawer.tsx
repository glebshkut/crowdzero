import stylePrice from "@/components/shared/calculations/stylePrice";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

export default function Drawer({
  amount,
  handleInputChange,
  project
}: {
  amount: number;
  handleInputChange: (e: { target: { value: string; }; }) => void;
  project: {
    raised: number;
    goal: number;
  };
}) {
  const { raised, goal } = project;

  return (
    <div className="drawer-side overflow-x-hidden">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay blur-3xl"></label>
      <div className="sm:w-[330px] w-1/3 h-[90%] my-auto">
        <div className="relative flex flex-col justify-center items-start gap-8 sm:w-[317px] w-[95%] bg-dark h-full p-5 rounded-2xl">
          <label htmlFor="my-drawer" className="absolute top-5 right-5">
            <XCircle size={32} color="#1790FF" />
          </label>

          <div className="flex flex-col justify-start gap-4">
            <span className="rounded-full bg-blue px-4 py-2 w-fit">You are Verified!</span>
            <span className="text-info">Choose how much you want to fund this project</span>
          </div>
          <div className="flex flex-col items-center gap-10">
            <div className="min-h-[105px] bg-placeholder-background p-3 flex gap-2 flex-col justify-center items-center rounded-lg">
              <img src="/assets/eth-token.png" alt="eth token icon" />
              <span className="text-info">
                {(amount / 2528.44).toFixed(4)} ETH
              </span>
              <span className="text-primary">
                {stylePrice(amount, true, true)} USD
              </span>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-secondary">$10</span>
                <span className="text-secondary">{stylePrice(goal - raised, false, true)}</span>
              </div>
              <input type="range" min={0} max={`${2528.44 * (goal - raised)}`} value={amount} onChange={handleInputChange} className="range range-primary range-sm bg-placeholder-background" />
              <span className="text-secondary">Amount in USD</span>
              <input type="text" value={amount} onChange={handleInputChange} className="input input-bordered bg-secondary-background rounded-lg mt-1 w-4/5" />
            </div>
          </div>

          <div className="flex flex-col items-end w-full">
            <span>Estimated Fees: {stylePrice(amount * 0.01, true)}</span>
            <span>Total</span>
            <span className="text-5xl bg-primary-gradient-reverted text-transparent bg-clip-text font-black">
              {stylePrice(amount + amount * 0.01, true)}
            </span>
            <button className="mt-2 btn bg-primary-gradient text-info text-md font-bold rounded-lg w-fit drawer-button">
              <CheckCircle color="#222222" size={20} />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}