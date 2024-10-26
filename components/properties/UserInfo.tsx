import Image from "next/image";

type UserInfoProps = {
  profile: {
    profileImage: string;
    username: string;
  };
};

export default function UserInfo({
  profile: { profileImage, username },
}: UserInfoProps) {
  return (
    <article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        src={profileImage}
        alt={username}
        width={50}
        height={50}
        className="rounded-md w-12 h-12 object-cover"
        priority={false}
      />
      <div>
        <p>
          Hosted by &nbsp;
          <span className="font-bold">@{username}</span>
        </p>
        <p className="text-muted-foreground font-light">
          Superhost &middot; 2 years hosting
        </p>
      </div>
    </article>
  );
}
