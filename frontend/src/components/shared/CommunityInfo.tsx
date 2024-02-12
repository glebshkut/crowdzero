export default function CommunityInfo() {
  return (
    <div className="bg-secondary-background rounded-2xl p-4 gap-4 flex flex-col">
      <div>
        <span className="text-md font-bold">
          Community
        </span>
        <h3 className="text-2xl">
          Group/DAO Name
        </h3>
      </div>
      <span className="text-sm text-secondary">
        Funders must be a part of the community to vote and be part of the fundraise. Verify to continue
      </span>
    </div>
  )
}