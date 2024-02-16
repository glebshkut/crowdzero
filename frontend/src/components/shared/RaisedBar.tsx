import PercentageHolder from "./PercentageHolder";
import stylePrice from "./calculations/stylePrice";

export default function RaisedBar({
  raised,
  goal,
  noInfo = false
}: {
  raised: number;
  goal: number;
    noInfo?: boolean;
}) {
  const percentage = Math.round((raised / goal) * 100);
  return (
    <div className="flex justify-between items-center gap-6">
      <div className="flex flex-col w-full gap-2">
        {!noInfo && <PercentageHolder text={`${percentage}%`} />}
        <div className="bg-dark w-full h-[15px] rounded-full">
          <div className='bg-[#1A83CF] h-full rounded-full' style={{
            width: `${percentage}%`
          }} />
        </div>
      </div>
      {!noInfo && <div className="flex flex-col gap-1">
        <span>Raised:</span>
        <span className="bg-primary-gradient-reverted bg-clip-text text-transparent font-bold">{stylePrice(raised)}</span>
      </div>}
    </div>
  )
}