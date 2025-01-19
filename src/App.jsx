import React, { useState } from "react";
import './App.css';
import MenuBar from './components/MenuBar/MenuBar'
import Card from './components/Card/Card'


function App() {
  const [currentView, setCurrentView] = useState("Agenda");

  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <MenuBar setCurrentView={setCurrentView} />
        </div>
        <div className="col-10">
          <Card currentView={currentView}/>
        </div>
      </div>
    </div>
  );
};

export default App
