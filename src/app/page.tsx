import { SignUpButton } from "@/components/SignupButton";

export default function Home() {
  return (
    <div className="paddingX flex h-screen flex-wrap items-center justify-around gap-14 md:w-[80vw]">
      <div className="space-y-4">
        <h1 className="title">.Welcome!</h1>
        <div>
          <p className="subtitle">Here is you can</p>
          <ul>
            <li className="paragraph">.Collect trading history in one place</li>
            <li className="paragraph">.Track your progress</li>
          </ul>
        </div>
      </div>
      <div className="mt-20">
        <SignUpButton />
      </div>
    </div>
  );
}
