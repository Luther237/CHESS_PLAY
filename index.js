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
    tab[i][j].piece = {
      image: null,
      type: null,
    };
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
    
    define_position(5, 5, "./img/dame_noir.png", "dame")
    define_position(5, 5, null, "dame")

  //FONCTION ON CLICK
  function clique(x, y){
    if(data_play.number_active == 0){
      data_play.first_active = tab[x][y];
      data_play.number_active++;
      data_play.first_active.x_position = x;
      data_play.first_active.y_position = y; 
      tab[x][y].style.background =" rgb(73, 6, 1)";
      tab[x][y].is_clicked = false;
      console.log(tab[x][y].piece)
    }else{
      data_play.second_active = tab[x][y];
      data_play.second_active.x_position = x;
      data_play.second_active.y_position = y;
      data_play.number_active = 0
      tab[x][y].is_clicked = true;
      tab[x][y].style.background = tab[x][y].defaut_color;
      data_play.first_active.style.background = data_play.first_active.defaut_color;
      console.log(tab[x][y].piece) 
      permutter(data_play.first_active, data_play.second_active);
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