import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CharactersPage from "./components/characters/CharactersPage";
import CharacterAbout from "./components/characters/CharacterAbout";
import LocationsPage from "./components/locations/LocationsPage";
import LocationAbout from "./components/locations/LocationAbout";
import EpisodesPage from "./components/episodes/EpisodesPage";
import EpisodeAbout from "./components/episodes/EpisodeAbout";

function App() {

  return (
    <>
      <Header/>

      <main>

        <center>
          <Routes>
              <Route path="/" element={<CharactersPage/>}/>
              <Route path="/character/:id" element={<CharacterAbout/>}></Route>

              <Route path="/locations" element={<LocationsPage/>}/>
              <Route path="/location/:id" element={<LocationAbout/>}/>

              <Route path="/episodes" element={<EpisodesPage/>}/>
              <Route path="/episode/:id" element={<EpisodeAbout/>}/>
              
          </Routes>
          </center>

      </main>

      <Footer/>
    </>
  );
}

export default App;
