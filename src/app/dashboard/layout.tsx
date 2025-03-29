import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <div className="flex flex-col min-h-screen">
      <header className=" p-4">
        <h1>Welcome back, {session?.user.email}!</h1>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
