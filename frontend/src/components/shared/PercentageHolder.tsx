export default function PercentageHolder({ text }: { text: string | number }) {
  return (
    <span className="bg-placeholder-background w-fit rounded-full py-1 px-2">
      {text}
    </span>
  )
}