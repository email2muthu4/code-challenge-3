import React, { Component } from "react";
import "../styles/_discover.scss";
import { urls } from "../Utils/urls";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";

const token = "Bearer BQB_FE51maEtogsFJvtz8ZCcU2eSlH_Fnz2bOrYhCt-jEq_GMhoWP_d1RqbkqF2RfFA4UwlyzAWCV6Y2W9FDHAkeN-ed3BM_f2qw3ka8GODWnz4fHNtPdHK-EPJjv63kqcUEUoeVtSTckdPE2_4n-OEHsiHBj7DB-vgnLOZ2FWLASrhAJC6HIW9q4C_3ag6tp8TG0Kjpa_6_yD5zjdBvfKfs1rLHAdWPH9K07R5YoBcpU-dqCGa6lwFeMnWkkaOXEYWYfkYfKPH39GGk_fVhyywRurbbHvC_h4-PbNeb"

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      playlists: [],
      categories: []
    };
  }

 getSongList(urlKey) { 
  fetch(urls()[urlKey], {
    headers: {
      "Content-Type": "application/json",
      Authorization:token
    }
  }).then(r =>
    r.json().then(data => { 
      if (data && data[urlKey] && data[urlKey].items) {
        const obj = {}
        obj[urlKey] = data[urlKey].items;
        this.setState(obj);
      }
    })
  );
  }

   componentDidMount() {
    
      this.getSongList("albums");
      this.getSongList("playlists");
      this.getSongList("categories");
  }

  render() {
    const { albums, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={albums}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
