import { LuUser2 } from "react-icons/lu";
import { fetchProfileImage } from "@/utils/actions";
import Image from "next/image";

export default async function UserIcon() {
  const profileImage = await fetchProfileImage();

  if (profileImage)
    return (
      <Image
        priority={false}
        height={24}
        width={24}
        src={profileImage}
        alt="image profile"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}
