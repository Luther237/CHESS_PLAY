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
  first_active : Object,
  second_active : Object,
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
  //Définir le joueur possedant la piece
  if(couleur == "noir"){
    this.joueur = 2
  }else if(couleur == "blanc"){
    this.joueur = 1
  }else{
    this.joueur = 0
  };
  //Définir les déplacements possibles
  
  //Fonction de deplacement
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
      tab[i][j].html_cel.style.background = "green";
      tab[i][j].html_cel.defaut_color = "green"
    }else{
      tab[i][j].html_cel.style.background = "red";
      tab[i][j].html_cel.defaut_color = "red"
     }
   
    //Valeurs initiales
     //Pions noirs et blancs
     if(i == 1){
      tab[i][j].piece = new Piece("pion", 1, "noir", j, i);
     }else if(i == 6){
      tab[i][j].piece = new Piece("pion", 1, "blanc", j, i);
     }else if(i<7 && i>1){
      tab[i][j].piece = new Piece("undefine", 0, "", j, i);
     }
    
    //Définition des fonctions
    tab[i][j].html_cel.addEventListener("click", () => cliquer(tab[i][j]));
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
//Cavaliert
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
function refresh(){
  for(let i = 0; i<tab.length; i++){
    for(let j = 0; j<tab.length; j++){
    tab[i][j].html_cel.image.src = tab[i][j].piece.image_src;
    }
  }
}
refresh();
//L'ENVIRONNEMENT DU JEU A FINIT D'ETRE CODÉ
//JE PASSE AU DEPLACEMENT

//Fonction evennement cliquer
function cliquer(el){
  if(data_play.number_active == 0){
    data_play.first_active = el; 
    data_play.number_active++; 
    el.html_cel.style.background = "yellow";
  }else{
    data_play.second_active = el;
    data_play.number_active = 0;
    data_play.first_active.html_cel.style.background = data_play.first_active.html_cel.defaut_color;
    permutter_var(data_play.first_active.piece.y_position, data_play.second_active.piece.y_position)
    permutter_var(data_play.first_active.piece.x_position, data_play.second_active.piece.xm_position)
    permutter(data_play.first_active, data_play.second_active)
  };
}
//Fonction pour PERMUTTER deux OBJETS
function permutter(x,y){
  let temp = {...x.piece};
  Object.assign(x.piece, y.piece);
  Object.assign(y.piece, temp) 
  x.html_cel.image.src = x.piece.image_src;
  y.html_cel.image.src = y.piece.image_src;
  x.piece.x_position = 5;
}
function permutter_var(x,y){
  console.log(`init xinit = ${x}  xinit = ${y}`)
  let temp = x;
  console.log(`temp = ${temp}`)
  x = y;
  console.log(`x = ${x}`)
  y = temp;
  console.log(`y = ${y}`)
}