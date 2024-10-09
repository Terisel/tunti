import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { PriceProvider } from "@/contexts/price-context.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PriceProvider>
      <App />
    </PriceProvider>
  </StrictMode>
)
