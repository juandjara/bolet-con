import { redirect } from "react-router";

export async function loader() {
  const year = new Date().getFullYear();
  return redirect(`/${year}`);
}

export default function Index() {
  return null
}
