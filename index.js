var plateau = document.getElementById("plateau");
var table = document.createElement("table")
plateau.appendChild(table); 
var dame_index = 0;
//Definition du tableau 8x8 en js
var tab = new Array(8);
for(let i=0; i<tab.length; i++){
  tab[i] = new Array(8);
}
//Variables du jeu
var data_play = {
  number_active: 0,
  last_active: null,
  legal_move: 0,
  player: 1,
  get moves_jeu(){
    let move_tab = new Array(0);
    for(let i = 0; i<tab.length; i++){
      let j =0;
        while(j < tab.length && tab[i][j].piece.valeur != 0){
            move_tab.push([tab[i][j].piece.nom, `${i}${j}`,tab[i][j].piece.possible_moves()]);
            j++;
        }
    }
    return move_tab;
  },
  set moves_jeu_auth(data){
    this.moves_jeu_auth = [...data];
  }
};
//Définir prototype de pièce
function Piece(nom, valeur, couleur, x_position, y_position){
  this.nom = nom; 
  this.image_src = `./img/${nom}_${couleur}.png`;
  this.valeur = valeur;
  this.couleur = couleur;
  this.x_position = x_position;
  this.y_position = y_position;
  this.number_move = 0;
  this.en_passant = 0;
  //Définir le joueur possedant la piece
  this.joueur = couleur=="noir"?2:couleur=="blanc"?1:0;
  //Définir les déplacements possibles
  this.possible_moves = function(){
    let possible_tab_temp = new Array(0);
    let facteur_joueur = Math.pow(-1, this.joueur);
    switch(this.nom){
      case("pion"):
        //Définition du premier coup
        if(checkLimites(this.y_position + facteur_joueur) == 0 && checkLimites(this.x_position) == 0) {
          possible_tab_temp.push(`${this.y_position + facteur_joueur}${this.x_position}`);
        }
        if(checkLimites(this.y_position + 2 * facteur_joueur) == 0 && tab[y_position + facteur_joueur][x_position].piece.valeur == 0 && checkLimites(this.x_position) == 0 && this.number_move == 0) {
              possible_tab_temp.push(`${this.y_position + 2 * facteur_joueur}${this.x_position}`);
        }
          //Vérification des diagonales
            if(checkLimites(this.x_position - 1) == 0 && checkLimites(this.y_position + facteur_joueur) == 0 && (tab[this.y_position + facteur_joueur][this.x_position - 1].piece.valeur != 0) && (tab[this.y_position + facteur_joueur][this.x_position - 1].piece.joueur != this.joueur)) {
              possible_tab_temp.push(`${this.y_position + facteur_joueur}${this.x_position - 1}`)
            }
            if(checkLimites(this.x_position + 1) == 0 && checkLimites(this.y_position + facteur_joueur) == 0 && (tab[this.y_position + facteur_joueur][this.x_position + 1].piece.valeur != 0) && (tab[this.y_position + facteur_joueur][this.x_position + 1].piece.joueur != this.joueur)){
              possible_tab_temp.push(`${this.y_position + facteur_joueur}${this.x_position + 1}`) 
            }
          //LE COUP EN PASSANT
            if(checkLimites(this.x_position - 1) == 0 && checkLimites(this.y_position + facteur_joueur) == 0 && (tab[this.y_position + facteur_joueur][this.x_position - 1].piece.valeur == 0) && (tab[this.y_position][this.x_position - 1].piece.joueur != this.joueur) && (tab[this.y_position][this.x_position - 1].piece.en_passant == 1) && (this.x_position - 1) == data_play.last_active.piece.x_position && this.y_position == data_play.last_active.piece.y_position ) {
              possible_tab_temp.push(`${this.y_position + facteur_joueur}${this.x_position - 1}`)
            }
            if(checkLimites(this.x_position + 1) == 0 && checkLimites(this.y_position + facteur_joueur) == 0 && (tab[this.y_position + facteur_joueur][this.x_position + 1].piece.valeur == 0) && (tab[this.y_position][this.x_position + 1].piece.joueur != this.joueur) && (tab[this.y_position][this.x_position + 1].piece.en_passant == 1) && (this.x_position + 1) == data_play.last_active.piece.x_position && this.y_position == data_play.last_active.piece.y_position){
              possible_tab_temp.push(`${this.y_position + facteur_joueur}${this.x_position + 1}`) 
            }
        return [...new Set(checkCase(possible_tab_temp, this))];

      case("fou"):
          let i = 0;
          possible_tab_temp.push(`${this.y_position}${this.x_position}`);
          let x_fou = this.x_position + 1;  let y_fou = this.y_position + 1;
          while(checkLimites(x_fou) == 0 && checkLimites(y_fou) == 0 && tab[y_fou][x_fou].piece.valeur == 0){
            possible_tab_temp.push(`${y_fou}${x_fou}`);
            x_fou++;  y_fou++;
          }
          y_fou = this.y_position + 1;  x_fou = this.x_position - 1;
          while(checkLimites(x_fou) == 0 && checkLimites(y_fou) == 0 && tab[y_fou][x_fou].piece.valeur == 0){
            possible_tab_temp.push(`${y_fou}${x_fou}`);
            x_fou--;  y_fou++;
          }
          x_fou = this.x_position - 1;  y_fou = this.y_position - 1;
          while(checkLimites(x_fou) == 0 && checkLimites(y_fou) == 0 && tab[y_fou][x_fou].piece.valeur == 0){
            possible_tab_temp.push(`${y_fou}${x_fou}`);
            x_fou--;  y_fou--;
          }
          y_fou = this.y_position - 1;  x_fou = this.x_position + 1;
          while(checkLimites(x_fou) == 0 && checkLimites(y_fou) == 0 && tab[y_fou][x_fou].piece.valeur == 0){
            possible_tab_temp.push(`${y_fou}${x_fou}`);
            x_fou++;  y_fou--;
          }

      return [...new Set(checkCase(possible_tab_temp, this))];

      case("tour"):
          possible_tab_temp.push(`${this.y_position}${this.x_position}`);
          let x_tour = this.x_position + 1; let y_tour = this.y_position;
          while(checkLimites(x_tour) == 0 && checkLimites(y_tour) == 0 && tab[y_tour][x_tour].piece.valeur == 0){
            possible_tab_temp.push(`${y_tour}${x_tour}`); x_tour++;
          }
          x_tour = this.x_position - 1; y_tour = this.y_position;
          while(checkLimites(x_tour) == 0 && checkLimites(y_tour) == 0 && tab[y_tour][x_tour].piece.valeur == 0){
            possible_tab_temp.push(`${y_tour}${x_tour}`); 
            x_tour--;
          }
          x_tour = this.x_position;  y_tour = this.y_position - 1;
          while(checkLimites(x_tour) == 0 && checkLimites(y_tour) == 0 && tab[y_tour][x_tour].piece.valeur == 0){
            possible_tab_temp.push(`${y_tour}${x_tour}`); 
            y_tour--;
          }
          x_tour = this.x_position ;  y_tour = this.y_position + 1;
          while(checkLimites(x_tour) == 0 && checkLimites(y_tour) == 0 && tab[y_tour][x_tour].piece.valeur == 0){
            possible_tab_temp.push(`${y_tour}${x_tour}`);
            y_tour++;
          }
      return [...new Set(checkCase(possible_tab_temp, this))];

      case("dame"):
        let possible_tab_temp1 = new Array(0);  let possible_tab_temp2 = new Array(0);
        possible_tab_temp2.push(`${this.y_position}${this.x_position}`);
        let x_dame_t = this.x_position + 1; let y_dame_t = this.y_position;
        while(checkLimites(x_dame_t) == 0 && checkLimites(y_dame_t) == 0 && tab[y_dame_t][x_dame_t].piece.valeur == 0){
          possible_tab_temp1.push(`${y_dame_t}${x_dame_t}`);
          x_dame_t++;
        }
        x_dame_t = this.x_position - 1; y_dame_t = this.y_position;
        while(checkLimites(x_dame_t) == 0 && checkLimites(y_dame_t) == 0 && tab[y_dame_t][x_dame_t].piece.valeur == 0){
          possible_tab_temp1.push(`${y_dame_t}${x_dame_t}`);
          x_dame_t--;
        }
        x_dame_t = this.x_position; y_dame_t = this.y_position - 1;
        while(checkLimites(x_dame_t) == 0 && checkLimites(y_dame_t) == 0 && tab[y_dame_t][x_dame_t].piece.valeur == 0){
          possible_tab_temp1.push(`${y_dame_t}${x_dame_t}`);
          y_dame_t--;
        }
        x_dame_t = this.x_position;  y_dame_t = this.y_position + 1;
        while(checkLimites(x_dame_t) == 0 && checkLimites(y_dame_t) == 0 && tab[y_dame_t][x_dame_t].piece.valeur == 0){
          possible_tab_temp1.push(`${y_dame_t}${x_dame_t}`);
          y_dame_t++;
        }
        //diagonales moves
        possible_tab_temp2.push(`${this.y_position}${this.x_position}`);
        let x_dame_f = this.x_position + 1; let y_dame_f = this.y_position +1;
        while(checkLimites(x_dame_f) == 0 && checkLimites(y_dame_f) == 0 && tab[y_dame_f][x_dame_f].piece.valeur == 0){
          possible_tab_temp2.push(`${y_dame_f}${x_dame_f}`);
          x_dame_f++; y_dame_f++;
        }
        x_dame_f = this.x_position - 1; y_dame_f = this.y_position - 1;
        while(checkLimites(x_dame_f) == 0 && checkLimites(y_dame_f) == 0 && tab[y_dame_f][x_dame_f].piece.valeur == 0){
          possible_tab_temp2.push(`${y_dame_f}${x_dame_f}`);
          x_dame_f--; y_dame_f--;
        }
        x_dame_f = this.x_position+1; y_dame_f = this.y_position - 1;
        while(checkLimites(x_dame_f) == 0 && checkLimites(y_dame_f) == 0 && tab[y_dame_f][x_dame_f].piece.valeur == 0){
          possible_tab_temp2.push(`${y_dame_f}${x_dame_f}`);
          x_dame_f++; y_dame_f--;
        }
        x_dame_f = this.x_position - 1; y_dame_f = this.y_position + 1;
        while(checkLimites(x_dame_f) == 0 && checkLimites(y_dame_f) == 0 && tab[y_dame_f][x_dame_f].piece.valeur == 0){
          possible_tab_temp2.push(`${y_dame_f}${x_dame_f}`);
          x_dame_f--; y_dame_f++;
        }
        let check1 = checkCase(possible_tab_temp1, this, "transversale")
        let check2 = checkCase(possible_tab_temp2, this, "diagonale")
      return [...new Set(check1.concat(check2))];
      
      case("cavalier"):
        cava_set(this.x_position -2, this.y_position + 1, this, possible_tab_temp);
        cava_set(this.x_position -2, this.y_position - 1, this, possible_tab_temp);
        cava_set(this.x_position -1, this.y_position - 2, this, possible_tab_temp);
        cava_set(this.x_position -1, this.y_position + 2, this, possible_tab_temp);
        cava_set(this.x_position +2, this.y_position + 1, this, possible_tab_temp);
        cava_set(this.x_position +2, this.y_position - 1, this, possible_tab_temp);
        cava_set(this.x_position +1, this.y_position - 2, this, possible_tab_temp);
        cava_set(this.x_position +1, this.y_position + 2, this, possible_tab_temp);
      return [...new Set(possible_tab_temp)];
      
      case("roi"):
        cava_set(this.x_position + 1, this.y_position + 0, this, possible_tab_temp);
        cava_set(this.x_position + 1, this.y_position + 1, this, possible_tab_temp);
        cava_set(this.x_position + 1, this.y_position - 1, this, possible_tab_temp);
        cava_set(this.x_position - 1, this.y_position + 0, this, possible_tab_temp);
        cava_set(this.x_position - 1, this.y_position + 1, this, possible_tab_temp);
        cava_set(this.x_position - 1, this.y_position - 1, this, possible_tab_temp);
        cava_set(this.x_position, this.y_position + 1, this, possible_tab_temp);
        cava_set(this.x_position, this.y_position - 1, this, possible_tab_temp);
      return [...new Set(possible_tab_temp)];
      case("undefine"):
      return [];
    }
  }
};
//REMPLISSAGE  DU TABLEAU
for(let i=0; i<tab.length; i++){
  //Parcours des lignes
  tab[i] = document.createElement("tr");
  tab[i].classList = "row_table";
  tab[i].id = `row ${i}`
  table.appendChild(tab[i]);
  //Parcour des cellules
  for(let j=0; j<tab.length; j++){
    //Les elements de tab ont des obj {cellule_correspondante, piece_contenue...}
    //Définition de l'objet tab[i][j]
    var cellule = document.createElement("td");
    tab[i][j] = new Tab_cel(cellule);
    tab[i][j].html_cel.classList = "cellule";
    tab[i].appendChild(tab[i][j].html_cel);
    tab[i][j].html_cel.id = `${i}${j}`;
    //Alterne les couleurs des cases
    if((i+j)%2 == 0){
      tab[i][j].html_cel.style.background = "rgba(248, 203, 163, 0.53)";
      tab[i][j].html_cel.defaut_color = "rgba(248, 203, 163, 0.53)"
    }else{
      tab[i][j].html_cel.style.background = "rgba(111, 0, 155, 0.85)";
      tab[i][j].html_cel.defaut_color = "rgba(111, 0, 155, 0.85)";
    }
   
     //Pions noirs et blancs
     
    var empty_piece = new Piece("undefine", 0, "", 100, 100);
    tab[i][j].piece = i==1?new Piece("pion", 1, "noir", j, i):i==6?new Piece("pion", 1, "blanc", j, i):new Piece("undefine", 0, "", j, i);
    
    //Définition des fonctions
    tab[i][j].html_cel.addEventListener("click",() => cliquer(tab[i][j]));
    //Définir la valeur en image de chaque case
    tab[i][j].html_cel.image = document.createElement("img");
    tab[i][j].html_cel.appendChild(tab[i][j].html_cel.image)
  } 
}

//Définir le PROTOTYPE d'une cellule de tab
function Tab_cel(cellule, piece){
  this.html_cel = cellule;
  this.piece = piece;
}
//Valeurs initiales
//Tours blanches et noires 
tab[0][0].piece = new Piece("tour", 4, "noir", 0, 0);
tab[0][7].piece = new Piece("tour", 4, "noir", 7, 0);
tab[7][0].piece = new Piece("tour", 4, "blanc", 0, 7);
tab[7][7].piece = new Piece("tour", 4, "blanc", 7, 7);
//Cavalier
tab[0][1].piece = new Piece("cavalier", 3, "noir", 1, 0);
tab[0][6].piece = new Piece("cavalier", 3, "noir", 6, 0);
tab[7][1].piece = new Piece("cavalier", 3, "blanc", 1, 7);
tab[7][6].piece = new Piece("cavalier", 3, "blanc", 6, 7);
//Fou3

tab[0][2].piece = new Piece("fou", 3, "noir", 2, 0);
tab[0][5].piece = new Piece("fou", 3, "noir", 5, 0);
tab[7][2].piece = new Piece("fou", 3, "blanc", 2, 7);
tab[7][5].piece = new Piece("fou", 3, "blanc", 5, 7);
//Dames
tab[0][3].piece = new Piece("dame", 7, "noir", 3, 0);
tab[7][3].piece = new Piece("dame", 7, "blanc", 3, 7);
//Rois
tab[0][4].piece = new Piece("roi", 100, "noir", 4, 0);
tab[7][4].piece = new Piece("roi", 100, "blanc", 4, 7);

//Fonction pour raffraichir le jeu au cas où ce n'est pas automatique
var refresh = (
  function(){
    return function(){
      for(let i = 0; i<tab.length; i++){
        for(let j = 0; j<tab.length; j++){
        tab[i][j].html_cel.image.src = tab[i][j].piece.image_src;
        }
      }
    };
})();
refresh();
//L'ENVIRONNEMENT DU JEU A FINIT D'ETRE CODÉ
//JE PASSE AU DEPLACEMENT
//Fonction evennement cliquer
function cliquer(el){
  display_piece(el);
  if(data_play.number_active == 0 && el.piece.valeur != 0  && el.piece.joueur == data_play.player){
    //Aficher les deplacements possibles de la piece sur laquelle on clique
    el.piece.possible_moves().forEach(move => {
      if(tab[parseInt(move[0])][parseInt(move[1])].piece.valeur == 0){
        tab[parseInt(move[0])][parseInt(move[1])].html_cel.style.boxShadow = "inset 0px 0px 20px rgba(226, 218, 223, 0.99)";
      }else{
        tab[parseInt(move[0])][parseInt(move[1])].html_cel.style.boxShadow = "inset 0px 0px 20px rgba(235, 15, 15, 0.99)";
      }
    });
    //CHANGE LE FOND de la pièce
    el.html_cel.style.background = "rgba(224, 185, 8, 0.85)";
    //mET A JOUR LES DONNEES DU JEU
    data_play.first_active = el;
    data_play.number_active = 1;
    highlightEchecRois();
  }else if(data_play.number_active == 1){
    //remmetre tout à son état initial
    disPossible_refresh(data_play.first_active);
    let src = data_play.first_active;
    let des = el;
    if(src != des && src.piece.possible_moves().includes(`${des.piece.y_position}${des.piece.x_position}`)  != 0){
      deplacer(src, des);
      //Vérifier si le roi est en échec
      if(isEchec(data_play.player) == true){
        //Si le roi est en échec, on remet la piece à sa place initiale
        deplacer(des, src);
        disPossible_refresh(src);
        let roiPos = findRoi(data_play.player); 
        tab[roiPos.y][roiPos.x].html_cel.style.background = "rgba(255, 0, 0, 0.5)";
        data_play.player = data_play.player == 1?2:1;
        alert("Le roi est en échec, vous ne pouvez pas faire ce coup");
        highlightEchecRois();
      }
      //change le joueur autorisé
      highlightEchecRois()
      data_play.player = data_play.player == 1?2:1; 
    }
    src.html_cel.style.background = src.html_cel.defaut_color;
    checkMatOuPat(el.piece.joueur==1?2:1);
    data_play.number_active = 0;
    highlightEchecRois();

    //J'ajoute le coup roque si les conditions sont remplies
    let p_src = src.piece;
    let p_des = des.piece;
    let p_roi = findRoi(data_play.player);
    if(src != des && p_des.number_move==0 && p_src.number_move == 0 && p_src.nom == "roi" && p_des.nom == "tour"){
      if(InterCase_isAtacked(p_src, p_des)==false && (p_src.possible_moves().includes(`${p_roi.y + 1}${p_roi.x + 1}`)==0 
        || p_src.possible_moves().includes(`${p_roi.y - 1}${p_roi.x - 1}`) == 0)){
        if(p_src.x_position < p_des.x_position){
          deplacer(src, tab[p_roi.y][p_roi.x + 2]);
          deplacer(des, tab[p_roi.y][p_roi.x + 1]);
          data_play.player = data_play.player == 1?2:1;
        }else{
          deplacer(src, tab[p_roi.y][p_roi.x - 2]);
          deplacer(des, tab[p_roi.y][p_roi.x - 1]);
          data_play.player = data_play.player == 1?2:1;
        }  
      }
      
    }
  }
}
//Fonction pour PERMUTTER deux OBJETS
function deplacer(x,y){
  if(x.piece.joueur != y.piece.joueur ){
    if(!y.piece.valeur){
      x.piece.number_move++;
      //etat en passant d'un pion
        let facteur_joueur = Math.pow(-1, x.piece.joueur);
        if(x.piece.nom == "pion" && x.piece.number_move == 1 && y.piece.y_position == x.piece.y_position + (2*facteur_joueur)){
          x.piece.en_passant = 1;
        }else{
          x.piece.en_passant = 0;
        }
      //capture en passant
        if(x.piece.nom == "pion" && x.piece.x_position != y.piece.x_position){
          Object.assign(tab[x.piece.y_position][y.piece.x_position].piece, empty_piece); 
          tab[x.piece.y_position][y.piece.x_position].html_cel.image.src = tab[x.piece.y_position][y.piece.x_position].piece.image_src;
        }
      let temp = {...x.piece};
      Object.assign(x.piece, y.piece);
      Object.assign(y.piece, temp) 
      x.html_cel.image.src = x.piece.image_src;
      y.html_cel.image.src = y.piece.image_src;
      [x.piece.x_position, x.piece.y_position] = [parseInt(x.html_cel.id[1]), parseInt(x.html_cel.id[0])];
      [y.piece.x_position, y.piece.y_position] = [parseInt(y.html_cel.id[1]), parseInt(y.html_cel.id[0])];
      data_play.last_active = y;
    }else{
      capture(x, y);
      highlightEchecRois() 
    }
  }
}
//Fonction capture piece 
function capture(x, y){
  x.piece.number_move++;
  Object.assign(y.piece, x.piece)
  Object.assign(x.piece, empty_piece); 
  x.html_cel.image.src = x.piece.image_src;
  y.html_cel.image.src = y.piece.image_src;
  [x.piece.x_position, x.piece.y_position] = [parseInt(x.html_cel.id[1]), parseInt(x.html_cel.id[0])];
  [y.piece.x_position, y.piece.y_position] = [parseInt(y.html_cel.id[1]), parseInt(y.html_cel.id[0])];  
}

//Fonction pour afficher la piece sur laquelle on clique
function display_piece(element){
  document.getElementById("id_image").src = element.piece.image_src;
  document.getElementById("nom").innerHTML = `nom: ${element.piece.nom}`;
  document.getElementById("joueur").innerHTML = `joueur: ${element.piece.joueur}`
  document.getElementById("valeur").innerHTML = `valeur ${element.piece.valeur}`
  document.getElementById("nombre_move").innerHTML = `nombre move: ${element.piece.number_move}`
  document.getElementById("x").innerHTML = `x: ${element.piece.x_position}`
  document.getElementById("y").innerHTML = `y: ${element.piece.y_position}`
  document.getElementById("pm").innerHTML = `pm: ${element.piece.possible_moves()}`
};
//Fonction pour retrouver si une case est vide 
function checkCase(possiblechecking, piece_ref, type_move){
  let return_tab = new Array(0);
  //je fais le check des cases voisinnes
  
  possiblechecking.forEach(cases => {
    let y = parseInt(cases[0]);
    let x = parseInt(cases[1])
      //si c'est un pion, on check les diagonales
      if(piece_ref.nom =="pion" && x != piece_ref.x_position){
        return_tab.push(`${y}${x}`)
      }
      let a;
      //on teste si la case pointée est vide
      let i,j;  
      let px = piece_ref.x_position;
      let py = piece_ref.y_position; 
      if(!tab[y][x].piece.valeur){
        return_tab.push(`${y}${x}`)
        //si la case suivante pointée n'est pas vide
        //On vérifie si la case suivante est non vide, si c'est la cas, on l'ajoute c'est le cas pour les fous, la dame et la tour
        if(piece_ref.nom == "fou" || type_move == "diagonale"){
          
            if(x>px){ i = 1;
            }else{i = -1;
            }if(y>py){j = 1;
            }else{j = -1;
            }
            if(piece_ref.nom != "pion" && piece_ref.nom != "roi" && checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
              return_tab.push(`${y+j}${x+i}`); 
          
          dame_index = 0;
      }
        if(piece_ref.nom == "tour" || type_move == "transversale"){
          dame_index = 0 
          if(x>px){ i = 1; j = 0
          }else if(x< px){i = -1; j = 0
          }else if(y>py){j = 1; i=0 
          }else{j = -1; i=0
          } 
          if(piece_ref.nom != "pion" && piece_ref.nom != "roi" && checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`);
        }
        if(piece_ref.nom != "pion" && piece_ref.nom != "roi" && checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
          return_tab.push(`${y+j}${x+i}`);     
    //Si la case pointée n'est pas vide et contient une pièce de l'adversaire
      }else if(tab[y][x].piece == piece_ref){
        if(piece_ref.nom == "fou" || piece_ref.nom == "dame"){  
          let i =1; let j= 1
          if(checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`);
          i = 1; j = -1; 
          if(checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`); 
          i = -1; j = -1;
          if(checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`); 
          i = -1; j = 1;
          if(checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`);  
        };
        if(piece_ref.nom == "tour" || piece_ref.nom == "dame"){
          let i =0; let j= 1
          if(checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`);
          i = 0; j = -1;
          if(checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`); 
          i = -1; j = 0;
          if(checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`); 
          i = 1; j = 0;
          if(checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
            return_tab.push(`${y+j}${x+i}`);
        }
      }
  });
  return return_tab;
};
//Fonction pour revenir de display_posible_move
function disPossible_refresh(el){
  el.piece.possible_moves().forEach(move => {
    tab[parseInt(move[0])][parseInt(move[1])].html_cel.style.boxShadow = "none";
  });
}
//Fonction pour vérifier si les 4 variables sont dans les limites
function checkLimites(x1){
  if(x1 >= 0 && x1 < 8)
    return 0;
  return 1;
}

//Fonction pour ajouter les deplacement du cavalier
function cava_set(cava_x, cava_y, cavalier_el, tableau_concerné){

  if(checkLimites(cava_x)== 0 && checkLimites(cava_y) == 0){
    if(tab[cava_y][cava_x].piece.valeur == 0){
      tableau_concerné.push(`${cava_y}${cava_x}`);
    }else{
      if((tab[cava_y][cava_x].piece.joueur != cavalier_el.joueur))
      tableau_concerné.push(`${cava_y}${cava_x}`);
    }
  }
}

//Je cherche la positin du roi
function findRoi(joueur) {
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      if (tab[i][j].piece.nom === "roi" && tab[i][j].piece.joueur === joueur) {
        return { x: j, y: i };
      }
    }
  }
  return null;
}
//Fonction pour recalculer les déplacements de toutes les pièces
function fresh_possible_moves(){
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      if (tab[i][j].piece.valeur != 0) {
        tab[i][j].piece.possible_moves();
      }
    }
  }
}
//Fonction pour vérifier si le roi est en échec
function isEchec(joueur) {
  const roiPos = findRoi(joueur);
  if (!roiPos) return false;
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      const piece = tab[i][j].piece;
      if (piece.valeur != 0) {
        const moves = piece.possible_moves();
        if (moves.includes(`${roiPos.y}${roiPos.x}`)) {
          return true;
        }
      }
    }
  }
  tab[roiPos.y][roiPos.x].html_cel.style.background = tab[roiPos.y][roiPos.x].html_cel.defaut_color;
  return false;
}
function highlightEchecRois() {
  [1, 2].forEach(joueur => {
    const roiPos = findRoi(joueur);
    if (!roiPos) return;
    let enEchec = false;
    for (let i = 0; i < tab.length; i++) {
      for (let j = 0; j < tab.length; j++) {
        const piece = tab[i][j].piece;
        if (piece.valeur != 0 && piece.joueur != joueur) {
          const moves = piece.possible_moves();
          if (moves.includes(`${roiPos.y}${roiPos.x}`)) {
            enEchec = true;
            break;
          }
        }
      }
      if (enEchec) break;
    }
    if (enEchec) {
      tab[roiPos.y][roiPos.x].html_cel.style.background = "rgba(255, 0, 0, 0.5)";
    } else {
      tab[roiPos.y][roiPos.x].html_cel.style.background = tab[roiPos.y][roiPos.x].html_cel.defaut_color;
    }
  });
}
//Je vérifie si il exixte des coups légaux
function joueurACoupLegal(joueur) {
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab.length; j++) {
      const piece = tab[i][j].piece;
      if (piece.valeur != 0 && piece.joueur == joueur) {
        const moves = piece.possible_moves();
        for (let move of moves) {
          // Simule le coup
          const y = parseInt(move[0]);
          const x = parseInt(move[1]);
          const src = tab[i][j];
          const des = tab[y][x];
          // Je Sauvegarde l'état
          const tempSrc = Object.assign({}, src.piece);
          const tempDes = Object.assign({}, des.piece);
          const move_src = src.piece.number_move;
          const move_des = des.piece.number_move;
          //redefinition de la fonction deplacer
          // deplacer(src, des);
          let piece_EP = {...src.piece};
            if(src.piece.joueur != des.piece.joueur ){
                
                // capture en passant
                  if(src.piece.nom == "pion" && !des.piece.valeur && src.piece.x_position != des.piece.x_position){
                    Object.assign(piece_EP,tab[src.piece.y_position][des.piece.x_position].piece);
                    Object.assign(tab[src.piece.y_position][des.piece.x_position].piece, empty_piece); 
                    tab[src.piece.y_position][des.piece.x_position].html_cel.image.src = tab[src.piece.y_position][des.piece.x_position].piece.image_src;
                  }
                
                Object.assign(des.piece, src.piece)
                Object.assign(src.piece, empty_piece); 
                src.html_cel.image.src = src.piece.image_src;
                des.html_cel.image.src = des.piece.image_src;
                [src.piece.x_position, src.piece.y_position] = [parseInt(src.html_cel.id[1]), parseInt(src.html_cel.id[0])];
                [des.piece.x_position, des.piece.y_position] = [parseInt(des.html_cel.id[1]), parseInt(des.html_cel.id[0])];  
                
            }else{
              console.log("Déplacement impossible");
            }
          const echec = isEchec(joueur);
          // j'Annule le coup
          src.piece = new Piece(tempSrc.nom, tempSrc.valeur, tempSrc.couleur, tempSrc.x_position, tempSrc.y_position);
          des.piece = new Piece(tempDes.nom, tempDes.valeur, tempDes.couleur, tempDes.x_position, tempDes.y_position);
          des.piece.number_move = tempDes.number_move;
          src.piece.number_move = tempSrc.number_move;
          src.html_cel.image.src = src.piece.image_src;
          des.html_cel.image.src = des.piece.image_src;
          src.piece.number_move = move_src;
          des.piece.number_move = move_des;
          
          // annuler le coup en passant
          if(src.piece.joueur != des.piece.joueur && src.piece.nom == "pion" && !des.piece.valeur && src.piece.x_position != des.piece.x_position){
            Object.assign(tab[src.piece.y_position][des.piece.x_position].piece, piece_EP); 
            tab[src.piece.y_position][des.piece.x_position].html_cel.image.src = tab[src.piece.y_position][des.piece.x_position].piece.image_src;
          }
          
          if (!echec) return true;
        }
      }
    }
  }
  return false; // Aucun coup légal
}
//Fonction pour vérifier s'il y'a mat ou pat
function checkMatOuPat(joueur) {
  if (isEchec(joueur)) {
    if (!joueurACoupLegal(joueur)) {
      alert("Échec et mat ! Joueur " + (joueur==1?"blanc":"noir") + " a perdu.");
    }
  } else {
    if (!joueurACoupLegal(joueur)) {
      alert("Pat ! Match nul.");
    }
  }
}
//Fonction pour vérifier si les cases entre le roi et les tours sont attaquées
const InterCase_isAtacked = (p1, p2) => {
  let x1 = p1.x_position;
  let x2 = p2.x_position;
  //Fonction pour vérifier une case
  const verifier = (cas) => {
    for(let i=0; i< tab.length; i++){
      for(let j = 0; j < tab.length; j++){
        let piece_ref = tab[i][j].piece;
        if(piece_ref.joueur != p1.joueur && piece_ref.possible_moves().includes(`${p1.y_position}${cas}`))
          return true; 
      }
    }
    return false;
  }
  //On vérifie donc case par case
  if((x1 < x2 && verifier(x1 + 1)==false && verifier(x1 + 2)==false)){
    return false
    
  }else if(x1 > x2 && verifier(x1 - 1)==false && verifier(x1 - 2)==false && verifier(x1 - 3) == false){
    return false
  }
  return true;
}
//Je déplace manuellement les pièces pour faire les tests
