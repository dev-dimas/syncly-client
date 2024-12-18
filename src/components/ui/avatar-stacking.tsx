import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn, getInitials } from "@/lib/utils";

type Props = {
  users: {
    name: string;
    avatar: string | null;
  }[];
  totalUsers: number;
};

export default function AvatarStacking({ users, totalUsers }: Props) {
  return (
    <div className="flex">
      {users.map((user, index) => (
        <Avatar className={cn("border-2 border-white", index !== 0 && "-ml-4")}>
          {user.avatar !== null && <AvatarImage src={user.avatar} />}
          <AvatarFallback className="bg-blue-100 text-blue-500 font-bold text-xs w-full flex items-center justify-center">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      ))}
      {users.length < totalUsers && (
        <Avatar className="border-2 border-white -ml-4">
          <AvatarFallback className="bg-blue-100 text-blue-500 font-bold text-xs w-full flex items-center justify-center">
            +{totalUsers - users.length}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
