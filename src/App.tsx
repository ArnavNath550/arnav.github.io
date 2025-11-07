import * as React from "react";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router";
import BottomBarComponent from "./components/ShowComponents/BottomBarComponent";
import Index from "./pages/Index";
import MinimapComponent from "./components/ShowComponents/MinimapComponent";
import Craft from "./pages/Craft";
import ReaderViewComponent from "./components/ShowComponents/ReaderViewComponent";
import TimeMachineComponent from "./components/ShowComponents/TimeMachineComponent";
import TodoComponent from "./components/ShowComponents/TodoComponent";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/craft/" element={<Craft />} />
        <Route path="/craft/bottom-bar" element={<BottomBarComponent />} />
        <Route path="/craft/thought-minimap" element={<MinimapComponent />} />
        <Route path="/craft/reader-view" element={<ReaderViewComponent />} />
        <Route path="/craft/time-machine" element={<TimeMachineComponent />} />
        <Route path="/craft/smooth-todo" element={<TodoComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
