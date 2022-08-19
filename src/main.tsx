import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

async function bootstrapApp() {
    if (process.env.NODE_ENV === "development") {
        const { worker } = await import("./mocks/browser");
        worker.start();
    }
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);
}
bootstrapApp();
