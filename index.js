  function cellule(x, y, i, c){
    this.x_position = x,
    this.y_position = y,
    this.id = document.getElementById(x + "" + y);
    this.color = function(){
      document.getElementById(id).color = c;
    },
    this.background = function(){
      document.getElementById(id).style.background = i;
    }
  }

  let plateau = new Array(3);
  for(let i=0; i<plateau.length; i++){
    plateau[i] = new Array(3)
  }
  console.log(plateau)

  for(let i=0; i<plateau.length; i++){
    for(let j=0; j<plateau.length; j++){
      plateau[i][j] = new cellule(j, i, "red", "red");  
    } 
  }

