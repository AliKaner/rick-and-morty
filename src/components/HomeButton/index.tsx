import { useRouter } from "next/router";

export default function HomeButton() {
  const router = useRouter();
  const onClickHome = () => {
    router.push("/");
  };

  return (
    <div
      onClick={onClickHome}
      className="bg-primary font-bold text-white text-3xl"
    >
      <div className="ml-4">Home</div>
    </div>
  );
}
