import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    worker.start();
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
