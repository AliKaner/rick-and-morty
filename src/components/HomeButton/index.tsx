import { useRouter } from "next/router";

export default function HomeButton() {
  const router = useRouter();
  const onClickHome = () => {
    router.push("/");
  };

  return (
    <div
      onClick={onClickHome}
      className="bg-primary border-b-2 border-green-600 text-green-600 text-3xl"
    >
      Home
    </div>
  );
}
