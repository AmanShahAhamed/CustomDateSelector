import "./App.css";
import { DateProvider } from "./providers/dateProvider";
import { Page } from "./page";

function App() {
  return (
    <DateProvider>
      <Page />
    </DateProvider>
  );
}

export default App;
