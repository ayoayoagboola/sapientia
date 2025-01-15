import { trpc } from "@/app/_trpc/client";
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import Image from "next/image";

// TODO: add dropdown

export default async function UserAvatar() {
  const user = await currentUser(); 

  if (!user) return null

  return (
    <div>
      <Image
        className="rounded-full"
        src={user.image as string}
        width={32}
        height={32}
        alt="User Avatar"
      />
    </div>
  );
}
