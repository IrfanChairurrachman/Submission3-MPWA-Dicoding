const base_url = "https://api.football-data.org/v2/";
const API = '2d5761d8ac3d4b3fb3ef00eb22d5c42e';
const id_liga = 2021;
const standing = `${base_url}competitions/${id_liga}/standings`;
const match = `${base_url}competitions/${id_liga}/matches`;
const teams = `${base_url}competitions/${id_liga}/teams`;
const teamd = `${base_url}teams/`;
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getStandings() {
  if ("caches" in window){
    caches.match(standing).then(function(response){
      if (response){
        response.json().then(function(data){
          var standingsType = '';
          data.standings.forEach(function(std){
            var standingDetail = '';
            std.table.forEach(function(pos){
              standingDetail += `
                <tr>
                  <td class="center">${pos.position}</td>
                  <td>${pos.team.name}</td>
                  <td>${pos.playedGames}</td>
                  <td>${pos.won}</td>
                  <td>${pos.draw}</td>
                  <td>${pos.lost}</td>
                  <td>${pos.goalsFor}</td>
                  <td>${pos.goalsAgainst}</td>
                  <td>${pos.goalDifference}</td>
                  <td>${pos.points}</td>
                <tr>
              `;
            })
            standingsType += `
              <table class = "highlight responsive-table">
                <thead>
                  <tr>
                    <th class="center">Position</th>
                    <th>Team</th>
                    <th>MP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                ` + standingDetail + `
                </tbody>
              </table>
            `;
          });
          document.getElementById("body-content").innerHTML = standingsType;
        })
      }
    })
  }
  

  fetch(standing,{headers : {'X-Auth-Token' : API}})
    .then(status)
    .then(json)
    .then(function(data) {
        console.log(data);
        var standingsType = '';
        data.standings.forEach(function(std){
            var standingDetail = '';
            std.table.forEach(function(pos){
                standingDetail += `
                    <tr>
                        <td class="center">${pos.position}</td>
                        <td>${pos.team.name}</td>
                        <td>${pos.playedGames}</td>
                        <td>${pos.won}</td>
                        <td>${pos.draw}</td>
                        <td>${pos.lost}</td>
                        <td>${pos.goalsFor}</td>
                        <td>${pos.goalsAgainst}</td>
                        <td>${pos.goalDifference}</td>
                        <td>${pos.points}</td>
                    <tr>
                `;
            })
            standingsType += `
            <table class = "highlight responsive-table">
              <thead>
                <tr>
                  <th class="center">Position</th>
                  <th>Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
              ` + standingDetail + `
              </tbody>
            </table>
          `;
        });
        document.getElementById("body-content").innerHTML = standingsType;
    })
    .catch(error);
}

function getMatches() {
  if ("caches" in window){
    caches.match(match).then(function(response){
      if (response){
        response.json().then(function(data){
          var matchDetail = '';
      data.matches.forEach(function(mtch){
        matchDetail += `
        <div class="col s12 m6">
          <div class="card">
            <div class="card-content">
              <p><b>Matchday ${mtch.matchday} of 38</b></p>
              <table class="responsive-table">
                  <tbody>
                    <tr>
                      <td>${mtch.homeTeam.name}</td>  
                      <td>${mtch.score.fullTime.homeTeam}</td>
                      <td rowspan="2" class="center">${dmy(new Date(mtch.utcDate))}</td> 
                    </tr>
                    <tr>
                      <td>${mtch.awayTeam.name}</td>
                      <td>${mtch.score.fullTime.awayTeam}</td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
        `;
      });
      matchHTML = `
        <div class="row">
                ` + matchDetail + `
        </div>
      `;
      document.getElementById("body-content").innerHTML = matchHTML;
        })
      }
    })
  }
  fetch(match,{headers : {'X-Auth-Token' : API}})
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      var matchDetail = '';
      data.matches.forEach(function(mtch){
        matchDetail += `
        <div class="col s12 m6">
          <div class="card">
            <div class="card-content">
              <p><b>Matchday ${mtch.matchday} of 38</b></p>
              <table class="responsive-table">
                  <tbody>
                    <tr>
                      <td>${mtch.homeTeam.name}</td>  
                      <td>${mtch.score.fullTime.homeTeam}</td>
                      <td rowspan="2" class="center">${dmy(new Date(mtch.utcDate))}</td> 
                    </tr>
                    <tr>
                      <td>${mtch.awayTeam.name}</td>
                      <td>${mtch.score.fullTime.awayTeam}</td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
        `;
      });
      matchHTML = `
        <div class="row">
                ` + matchDetail + `
        </div>
      `;
      document.getElementById("body-content").innerHTML = matchHTML;
    })
    .catch(error);
}
function dmy (date){
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

function getTeams() {
  
  if ("caches" in window){
    caches.match(teams).then(function(response){
      if (response){
        response.json().then(function(data){
          var teamsDetail = '';
          data.teams.forEach(function(team){
            teamsDetail += `
            <li class="collection-item avatar">
              <a href="./teamdetails.html?id=${team.id}">
              <img src="${team.crestUrl}" class="teamimg" alt="Universe">
              <span class="title"><h6><b>${team.name}</b></h6></span>
              <p>${team.venue}</p>
              </a>
            </li>
            `;
          });
          teamsHTML = `
            <ul class="collection">
                    ` + teamsDetail + `
            </ul>
          `;
          document.getElementById("body-content").innerHTML = teamsHTML;
        })
      }
    })
  }
  fetch(teams,{headers : {'X-Auth-Token' : API}})
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      
      var teamsDetail = '';
      data.teams.forEach(function(team){
        teamsDetail += `
        <li class="collection-item avatar">
          <a href="./teamdetails.html?id=${team.id}">
          <img src="${team.crestUrl}" class="teamimg" alt="Universe">
          <span class="title"><h6><b>${team.name}</b></h6></span>
          <p>${team.venue}</p>
          </a>
        </li>
        `;
      });
      teamsHTML = `
        <ul class="collection">
                ` + teamsDetail + `
        </ul>
      `;
      document.getElementById("body-content").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getteamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    if ("caches" in window) {
      caches.match(teamd + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var teamDetails = `
            <h3>${data.name} Details</h3>
            <br>
            <img src="${data.crestUrl}" class="responsive-img" alt="${data.crestUrl} logo">
            <ul class="collection">
                <li class="collection-item">
                    <span class="title"><h6><b>Team Name:</b></h6></span>
                    <p>${data.name}</p>
                </li>
                <li class="collection-item">
                    <span class="title"><h6><b>Team Short Name:</b></h6></span>
                    <p>${data.shortName}</p>
                </li>
                <li class="collection-item">
                    <span class="title"><h6><b>Team Venue:</b></h6></span>
                    <p>${data.venue}</p>
                </li>
                <li class="collection-item">
                    <span class="title"><h6><b>Founded:</b></h6></span>
                    <p>${data.founded}</p>
                </li>
                <li class="collection-item">
                    <span class="title"><h6><b>Founded:</b></h6></span>
                    <p>${data.founded}</p>
                </li>
                <li class="collection-item">
                    <span class="title"><h6><b>Phone:</b></h6></span>
                    <p>${data.phone}</p>
                </li>
                <li class="collection-item">
                    <span class="title"><h6><b>website:</b></h6></span>
                    <a href="${data.website}">${data.website}</a>
                </li>
            </ul>
            `;
            document.getElementById("content").innerHTML = teamDetails;
            resolve(data);
          });
        }
      });
    }
    
    fetch(teamd + idParam, {headers : {'X-Auth-Token' : API}})
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        
        var teamDetails = `
        <h3>${data.name} Details</h3>
        <br>
        <img src="${data.crestUrl}" class="responsive-img" alt="${data.crestUrl} logo">
        <ul class="collection">
            <li class="collection-item">
                <span class="title"><h6><b>Team Name:</b></h6></span>
                <p>${data.name}</p>
            </li>
            <li class="collection-item">
                <span class="title"><h6><b>Team Short Name:</b></h6></span>
                <p>${data.shortName}</p>
            </li>
            <li class="collection-item">
                <span class="title"><h6><b>Team Venue:</b></h6></span>
                <p>${data.venue}</p>
            </li>
            <li class="collection-item">
                <span class="title"><h6><b>Founded:</b></h6></span>
                <p>${data.founded}</p>
            </li>
            <li class="collection-item">
                <span class="title"><h6><b>Founded:</b></h6></span>
                <p>${data.founded}</p>
            </li>
            <li class="collection-item">
                <span class="title"><h6><b>Phone:</b></h6></span>
                <p>${data.phone}</p>
            </li>
            <li class="collection-item">
                <span class="title"><h6><b>website:</b></h6></span>
                <a href="${data.website}">${data.website}</a>
            </li>
        </ul>
        `;
        
        document.getElementById("content").innerHTML = teamDetails;
        
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function(data) {
    console.log(data);
    // Menyusun komponen card artikel secara dinamis
    var teamsDetail = '';
      data.forEach(function(team){
        teamsDetail += `
        <li class="collection-item avatar">
          <a href="./teamdetails.html?id=${team.id}&saved=true">
          <img src="${team.crestUrl}" class="teamimg" alt="Universe">
          <span class="title"><h6><b>${team.name}</b></h6></span>
          <p>${team.venue}</p>
          </a>
        </li>
        `;
      });
      teamsHTML = `
        <ul class="collection">
                ` + teamsDetail + `
        </ul>
      `;
      document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getSavedById(idParam).then(function(datat) {
    console.log(datat);
    var teamSavedDetails = `
    <h3>${datat.name} Details</h3>
    <br>
    <img src="${datat.crestUrl}" class="responsive-img" alt="${datat.crestUrl} logo">
    <ul class="collection">
        <li class="collection-item">
            <span class="title"><h6><b>datat Name:</b></h6></span>
            <p>${datat.name}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>datat Short Name:</b></h6></span>
            <p>${datat.shortName}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>datat Venue:</b></h6></span>
            <p>${datat.venue}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>Founded:</b></h6></span>
            <p>${datat.founded}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>Phone:</b></h6></span>
            <p>${datat.phone}</p>
        </li>
        <li class="collection-item">
            <span class="title"><h6><b>website:</b></h6></span>
            <a href="${datat.website}">${datat.website}</a>
        </li>
    </ul>
    `;
    document.getElementById("content").innerHTML = teamSavedDetails;
  });
}