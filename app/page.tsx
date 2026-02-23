import { readFileSync } from "fs";
import path from "path";
import FramerContent from "./FramerContent";

function getMainHtml(): string {
  const filePath = path.join(process.cwd(), "content", "main.html");
  return readFileSync(filePath, "utf-8");
}

export default function Home() {
  const mainHtml = getMainHtml();
  return <FramerContent html={mainHtml} />;
}
