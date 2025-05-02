  function cellule(x, y, i, c){
    this.x_position = x,
    this.y_position = y,
    this.background = i,
    this.color = c;
  }
  let plateau = new Array(3);
  for(let i=0; i<plateau.length; i++){
    tab[i] = new Array(3)
  }

  for(let i=0; i<plateau.length; i++){
    for(let j=0; j<plateau.length; j++){
      id = i + "" + j;
      plateau[i][j] = document.getElementById(id);
    } 
  }
  plateau[0][0].innerHtml = "B";
  console.log(id);

