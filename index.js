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
  this.image = `./img/${nom}_${couleur}.png`;
  this.valeur = valeur;
  this.couleur = couleur;
  //Définir le joueur possedant la pièce
  if(couleur == "noir"){
    this.joueur = 2
  }else{
    this.joueur = 1
  }
  //Définir les variables de position
  this.x_position = x_position;
  this.y_position = y_position;
  //Définir les déplacements possibles

};
//Définir le prototype d'une cellule de tab
function Tab_cel(cellule, piece){
  this.html_cel = cellule;
  this.piece = piece;
}

var pion = new Piece("pion", 1, "noir") 

console.log(pion)                     

//Définir chaque type de pièce


//remplissage et définition des méthodes des cellules
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

    //Définition des images pour chaque case du tableau
    tab[i][j].html_cel.image = document.createElement("img");
    tab[i][j].html_cel.appendChild(tab[i][j].html_cel.image)
    
    
    //Définition des fonctions
    tab[i][j].html_cel.onclick = () => {
      console.log(tab[i][j].piece);
    };
  }
}
//Définir les positions initiales 
  //pions
  for(let i=0; i<tab.length; i++){
    tab[1][i].piece = new Piece("pion", 1, "noir")
    console.log("Ajour sucess")
  }

  /*
  //DEFINIR LES POSITIONS INITIALES DES PIÈCES

  //FONCTION ON CLICK
  function clique(x, y){
    if(data_play.number_active == 0){
      data_play.first_active = tab[x][y];
      data_play.number_active++;
      data_play.first_active.x_position = x;
      data_play.first_active.y_position = y; 
      tab[x][y].style.background =" rgb(73, 6, 1)";
      tab[x][y].is_clicked = false;
    }else{
      data_play.second_active = tab[x][y];
      data_play.second_active.x_position = x;
      data_play.second_active.y_position = y;
      data_play.number_active = 0
      tab[x][y].is_clicked = true;
      tab[x][y].style.background = tab[x][y].defaut_color;
      data_play.first_active.style.background = data_play.first_active.defaut_color;
      }
  }

  //Fonction pour PERMUTTER deux OBJETS
  function permutter(x,y){
    let temp = {...x.piece};
    Object.assign(x.piece, y.piece);
    Object.assign(y.piece, temp) 
  }
  //Fonction pour définir la position d'une piece
  function define_position(x, y, s, t){
    let pi = tab[x][y].piece;
    if(s == null){  
      let imag = document.getElementById(`image ${x}${y}`);
      tab[x][y].removeChild(imag); 
      tab[x][y].piece = {...{
        image: null,
        type: null
      }}
      console.log("source nulle")
    }else{
      if(pi.image == null){
          pi.image = document.createElement("img");
          pi.image.src = s;
          pi.image.id = `image ${x}${y}`;
          tab[x][y].appendChild(tab[x][y].piece.image);
          pi.type = t;
      }else{
          document.getElementById(`image ${x}${y}`).src = s;
      }
    }
  } 
//Variables obsolètes
//=Celllule.isclicked (1)
//-cellule.piece.x|y_position (3)
*/