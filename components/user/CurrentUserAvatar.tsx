import { trpc } from "@/app/_trpc/client";
import { auth } from "@/auth";
import Image from "next/image";

// TODO: add dropdown

export default async function CurrentUserAvatar() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <div>
      <Image
        className="rounded-full"
        src={session.user.image as string}
        width={32}
        height={32}
        alt="User Avatar"
      />
    </div>
  );
}
