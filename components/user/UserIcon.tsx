import { auth } from "@/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <Image
      className="rounded-full"
        src={session.user.image as string}
        width={30}
        height={30}
        alt="User Avatar"
      />
    </div>
  );
}
