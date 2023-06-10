import TestClient from "@/components/TestClient";
import { revalidatePath } from 'next/cache';
import { prisma } from "@/utils";

const index = async () => {
  const setValue = async () => {
    "use server"
    console.log("Hellooo")
    revalidatePath('/test')
  }

  const data = await prisma.user.findMany()
  console.log(data)
  return (
    <div>
      <h1 className="text-3xl text-blue-500">Hai</h1>
      <pre>{JSON.stringify(data)}</pre>
      <form action={setValue}>
        <button type="submit">Change</button>
      </form>
      <TestClient />
    </div>
  );
};

export default index;
