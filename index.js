var plateau = document.getElementById("plateau");
var table = document.createElement("table")
plateau.appendChild(table); 
//Definition du tableau 8x8 en js
var tab = new Array(8);
for(let i=0; i<tab.length; i++){
  tab[i] = new Array(8);
}
//Variables du jeu
var data_play = {
  number_active: 0
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
  //Définir le joueur possedant la piece
  if(couleur == "noir"){
    this.joueur = 2
  }else if(couleur == "blanc"){
    this.joueur = 1
  }else{
    this.joueur = 0
  };
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
        if(checkLimites(this.y_position + 2 * facteur_joueur) == 0 && checkLimites(this.x_position) == 0 && this.number_move == 0) {
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
        return checkCase(possible_tab_temp, this);

      case("fou"):
          let i = 0;
          possible_tab_temp.push(`${this.y_position}${this.x_position}`);
          let x_fou = this.x_position + 1;
          let y_fou = this.y_position + 1;
          while(checkLimites(x_fou) == 0 && checkLimites(y_fou) == 0 && tab[y_fou][x_fou].piece.valeur == 0){
            possible_tab_temp.push(`${y_fou}${x_fou}`);
            x_fou++;
            y_fou++;
          }
          y_fou = this.y_position + 1;
          x_fou = this.x_position - 1;
          while(checkLimites(x_fou) == 0 && checkLimites(y_fou) == 0 && tab[y_fou][x_fou].piece.valeur == 0){
            possible_tab_temp.push(`${y_fou}${x_fou}`);
            x_fou--;
            y_fou++;
          }
          x_fou = this.x_position - 1
          y_fou = this.y_position - 1;
          while(checkLimites(x_fou) == 0 && checkLimites(y_fou) == 0 && tab[y_fou][x_fou].piece.valeur == 0){
            possible_tab_temp.push(`${y_fou}${x_fou}`);
            x_fou--;
            y_fou--;
          }
          y_fou = this.y_position - 1;
          x_fou = this.x_position + 1;
          while(checkLimites(x_fou) == 0 && checkLimites(y_fou) == 0 && tab[y_fou][x_fou].piece.valeur == 0){
            possible_tab_temp.push(`${y_fou}${x_fou}`);
            x_fou++;
            y_fou--;
          }

        return checkCase(possible_tab_temp, this);
      }
  }
};
//Définir le PROTOTYPE d'une cellule de tab
function Tab_cel(cellule, piece){
  this.html_cel = cellule;
  this.piece = piece;
}
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
   
    //Valeurs initiales
     //Pions noirs et blancs
     if(i == 1){
      tab[i][j].piece = new Piece("pion", 1, "noir", j, i);
     }else if(i == 6){
      tab[i][j].piece = new Piece("pion", 1, "blanc", j, i);
     }else if(i<7 && i>1){
      tab[i][j].piece = new Piece("undefine", 0, "", j, i);
      var empty_piece = new Piece("undefine", 0, "", 100, 100);
    
     }
    
    //Définition des fonctions
    tab[i][j].html_cel.addEventListener("click",() => cliquer(tab[i][j]));
    //Définir la valeur en image de chaque case
    tab[i][j].html_cel.image = document.createElement("img");
    tab[i][j].html_cel.appendChild(tab[i][j].html_cel.image)
  } 
}
//Valeurs initiales
//Tours blanches et noires 
tab[0][0].piece = new Piece("tour", 4, "noir", 0, 0);
tab[0][7].piece = new Piece("tour", 4, "noir", 7, 0);
tab[7][0].piece = new Piece("tour", 4, "blanc", 1, 0);
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
  if(data_play.number_active == 0 && el.piece.valeur != 0 ){
    //Aficher les deplacements possibles de la piece sur laquelle on clique
    disPossible(el)
    el.html_cel.style.background = "rgba(224, 185, 8, 0.85)";
    data_play.first_active = el;
    data_play.number_active = 1;
  }else if(data_play.number_active == 1){
    //remmetre tout à son état initial
    disPossible_refresh(data_play.first_active)
    let src = data_play.first_active;
    let des = el;
    if(src != des && find_el(src.piece.possible_moves(), des.html_cel.id) == 1){
      deplacer(src, des);
    }
    src.html_cel.style.background = src.html_cel.defaut_color;
    data_play.number_active = 0;
  }
}
//Fonction pour PERMUTTER deux OBJETS
function deplacer(x,y){
  if(x.piece.joueur != y.piece.joueur ){
    if(!y.piece.valeur){
      x.piece.number_move++;
      let temp = {...x.piece};
      Object.assign(x.piece, y.piece);
      Object.assign(y.piece, temp) 
      x.html_cel.image.src = x.piece.image_src;
      y.html_cel.image.src = y.piece.image_src;
      [x.piece.x_position, x.piece.y_position] = [parseInt(x.html_cel.id[1]), parseInt(x.html_cel.id[0])];
      [y.piece.x_position, y.piece.y_position] = [parseInt(y.html_cel.id[1]), parseInt(y.html_cel.id[0])];
    }else{
      capture(x, y)
    }
  }else{
    console.log("Déplacement impossible");
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

//Fonction pour retouver un élément dans un tableau
const find_el = (tableau, searched) => {
  let l  = tableau.length; 
  for(let i = 0 ; i< l; i++){
    if(tableau[i] == searched)
      return 1
  }
  return -1
};
//Fonction pour retrouver si une case est vide 
function checkCase(possiblechecking, piece_ref){
  let return_tab = new Array(0);
  //je fais le check des cases voisinnes
  
  possiblechecking.forEach(cases => {
    let y = parseInt(cases[0]);
    let x = parseInt(cases[1])
      //si c'est un pion, on check les diagonales
      if(piece_ref.nom =="pion" && x != piece_ref.x_position && tab[y][x].piece.valeur != 0 && tab[y][x].piece.joueur != piece_ref.joueur ){
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
        if(piece_ref.nom == "fou"){
          if(x>px){ i = 1;
          }else{i = -1;
          }if(y>py){j = 1;
          }else{j = -1;
          } 
        }
        if(piece_ref.nom != "pion" && piece_ref.nom != "roi" && checkLimites(y+j)==0 && checkLimites(x+i) == 0 && tab[y+j][x+i].piece.valeur != 0 && tab[y+j][x+i].piece.joueur != piece_ref.joueur)
          return_tab.push(`${y+j}${x+i}`);     
    //Si la case pointée n'est pas vide et contient une pièce de l,adversaire
      }else if(tab[y][x].piece == piece_ref){
        //On vérifie si la case suivante est non vide, si c'est la cas, on l'ajoute c'est le cas pour les fous, la dame et la tour
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
        }else if(piece_ref.nom == "tour" || piece_ref.nom == "dame"){
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
//Function display_possible moves
function disPossible(el){
  el.piece.possible_moves().forEach(move => {
    tab[parseInt(move[0])][parseInt(move[1])].html_cel.style.border = "solid rgba(226, 218, 223, 0.99)";
  });
}
//Fonction pour revenir de display_posible_move
function disPossible_refresh(el){
  el.piece.possible_moves().forEach(move => {
    tab[parseInt(move[0])][parseInt(move[1])].html_cel.style.border = "none";
  });
}
//Fonction pour vérifier si les 4 variables sont dans les limites
function checkLimites(x1){
  if(x1 >= 0 && x1 < 8)
    return 0;
  return 1;
}

//Fonction pour ajouter les deplacement du fou 


deplacer(tab[0][2], tab[4][6])

