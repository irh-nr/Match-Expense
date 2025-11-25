import LogoutButton from "@/components/ui/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";

export default function Header({
  user,
  username,
}: {
  user: string | undefined;
  username: string;
}) {
  const initials = username
    ?.trim() // hilangkan spasi depan belakang
    ?.split(" ") // pisah berdasarkan spasi
    ?.map((n: string) => n[0]) // ambil huruf pertama setiap kata
    ?.join("") // gabungkan
    ?.slice(0, 2) // ambil maksimal 2 huruf
    ?.toUpperCase(); // kapital
  return (
    <header>
      <div className="flex items-center justify-between mb-8 p-2">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="space-y-1">
            <p className="font-semibold leading-none!">{username}</p>
            <p className="text-xs text-muted-foreground mt-0! leading-none!">
              {user}
            </p>
          </span>
        </div>
        <div className="flex space-x-4">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
