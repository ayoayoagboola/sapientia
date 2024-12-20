import { trpc } from "@/app/_trpc/client";
import { auth } from "@/auth";
import Image from "next/image";
import { UserIcon as Icon } from "lucide-react";

// TODO: add actions 

interface UserIconProps {
  userId?: string;
  withName?: boolean;
}

const UserIcon = ({ userId, withName }: UserIconProps) => {
  if (!userId)
    return (
      <div>
        <Icon />
      </div>
    );

  const {
    data: user,
    isLoading,
    error,
  } = trpc.users.getUserById.useQuery({ id: userId });

  if (!user)
    return (
      <div>
        <Icon />
      </div>
    );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle errors
  if (error) {
    console.error("Error:", error.message);
    return <div>Error: {error.message}</div>;
  }

  if ("error" in user) {
    return <div>Error: {user.error}</div>;
  }

  return (
    <div>
      {user && (
        <div className="flex items-center justify-center gap-2">
          <Image
            className="rounded-full"
            src={user.image as string}
            width={24}
            height={24}
            alt="User Avatar"
          />
          {withName && <p>{user.name}</p>}
        </div>
      )}
    </div>
  );
};

export default UserIcon;
