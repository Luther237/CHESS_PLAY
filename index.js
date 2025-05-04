var plateau = document.getElementById("plateau");
var table = document.createElement("table")
plateau.appendChild(table);
//Definition du tableau 8x8 en js
var tab = new Array(8);
for(let i=0; i<tab.length; i++){
  tab[i] = new Array(8);
}
//Variable administrateur
var data_play = {
  number_active: 0
};
//remplissage et définition des méthodes des cellules
for(let i=0; i<tab.length; i++){
  tab[i] = document.createElement("tr");
  tab[i].classList = "row_table";
  table.appendChild(tab[i]);
  for(let j=0; j<tab.length; j++){
    tab[i][j] = document.createElement("td");
    tab[i][j].classList = "cellule";
    tab[i].appendChild(tab[i][j]);
    tab[i][j].id = `${i}${j}`;
    tab[i][j].is_clicked = true;
    //Ajout de la propriété pièce dans le tableau
    tab[i][j].piece = {};
    //Alterne les couleurs des cases
      if((i+j)%2 == 0){
        tab[i][j].style.background = "green";
        tab[i][j].defaut_color = "green"
      }else{
        tab[i][j].style.background = "red";
        tab[i][j].defaut_color = "red"
       }
    //Définition des fonctions
    tab[i][j].onclick = () => clique(i,j);

  }
}
  //DEFINIR LES POSITIONS INITIALES DES PIÈCES
    //pions noirs
    for(let i = 0; i<tab.length; i++){
      define_position(1, i, "./img/pion_noir.png", "paw")
    }
    //Pions blancs
    for(let i = 0; i<tab.length; i++){
      define_position(6, i, "./img/pion_blanc.png", "paw")
    }
    //Tours noires
    define_position(0, 0, "./img/tour_noire.png", "rock");
    define_position(0, 7, "./img/tour_noire.png", "rock");
    //Fou noir
    define_position(0, 2, "./img/fou_noir.png", "bishop");
    define_position(0, 5, "./img/fou_noir.png", "bishop");
    //Cavalier noir
    define_position(0, 1, "./img/cavalier_noir.png", "knight");
    define_position(0, 6, "./img/cavalier_noir.png", "knight");
    //Dame noire
    define_position(0, 3, "./img/dame_noir.png", "queen");
    //Rois
    define_position(0, 4, "./img/roi_noir.png", "king");
    

    //fONCTION POUR DEFINIR UNE POSITION INITIALE
    function define_position(x, y, s, t){
      tab[x][y].piece.image = document.createElement("img");
      tab[x][y].piece.image.src = s;
      tab[x][y].appendChild(tab[x][y].piece.image);
      tab[x][y].piece.type = t;
      tab[x][y].piece.x_position = x;
      tab[x][y].piece.y_position = y;
    }
      
  //FONCTION ON CLICK
  function clique(x, y){
    
    var cellule = tab[x][y];
    if(tab[x][y].is_clicked == true){
      tab[x][y].style.background =" rgb(73, 6, 1)";
      tab[x][y].is_clicked = false;
    }else{
      tab[x][y].is_clicked = true;
      tab[x][y].style.background = tab[x][y].defaut_color;
    }
  }

console.log(tab[1][1].piece)