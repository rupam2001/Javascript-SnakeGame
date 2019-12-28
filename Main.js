// import theBox from '/CAnvas/Box';

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
const width = 510;
const height = 510;
class theBox{
	constructor(window_width,window_height)
	{
      this.window_width=window_width;
      this.window_height=window_height;
      this.width=30;
      this.height=30;
      this.position={x:0,y:0};
      this.xdir=1;
      this.ydir=0;
      this.speed=30;
      this.grid=30;
      this.body=[[this.position.x,this.position.y]];
	}
	draw(ctx)
	{
	   if(!this.lost)
		   for(var i=0;i<this.body.length;i++)
		   {
		   	ctx.fillStyle="#0ff";
		   	ctx.fillRect(this.body[i][0],this.body[i][1],this.width,this.height);
		   	ctx.fillStyle="	#002699";
		   	ctx.fillRect(this.body[i][0]+10,this.body[i][1]+10,this.width-20,this.height-20);
		   }
       
	}

	update()
	{   
    	this.position.x+=this.speed*this.xdir;
    	this.position.y+=this.speed*this.ydir;
        
        if (this.position.x<0)
        	// this.position.x=0;
        	return false;
        if(this.body[0][0] + this.width==this.window_width)
        	// this.position.x=this.window_width-this.width;
        	return false;	
        if(this.position.y<0)
        	// this.position.y=0;
        	return false;
        if(this.body[0][1]+this.height==this.window_height)
        	// this.position.y=this.window_height-this.height;
        	return false;
        
        for(var i=0;i<this.body.length;i++)
        {
        	if(this.position.x==this.body[i][0] && this.position.y==this.body[i][1])
        		   return false;
        }   
        let tempbody=[[this.position.x,this.position.y]]
        for(var  i =0;i<this.body.length-1;i++)
        {
        	tempbody.push(this.body[i]);
        }
        this.body=tempbody;
        console.log(this.body)
        return true;
	}
	moveleft()
	{
		this.xdir=-1;
		this.ydir=0;
	}
	moveright()
	{
		this.xdir=1;
		this.ydir=0;
	}
	moveup()
	{
		this.xdir=0;
		this.ydir=-1;
	}
	movedown()
	{
		this.xdir=0;
		this.ydir=1;
	}
    size()
    {
    	this.body.push([this.position.x,this.position.y]);
    }

    initialize_again()
    {

      this.position={x:0,y:0};
      this.xdir=1;
      this.ydir=0;
      this.body=[[this.position.x,this.position.y]];
    }

}

class Food
{
	constructor(window_width,window_height)
	{
      this.window_width=window_width;
      this.window_height=window_height;
      this.dim=30;
      this.grid=30;
      this.position={x:Math.floor(this.grid*(Math.floor(Math.random()*(Math.floor(this.window_width/this.grid)-1)))),
      				 y:Math.floor(this.grid*(Math.floor(Math.random()*(Math.floor(this.window_height/this.grid)-1))))
      				};
      
	}

	draw(ctx)
	{
      ctx.fillStyle='#009900';
      

      ctx.fillRect(this.position.x,this.position.y,this.dim,this.dim);
      ctx.fillStyle="#999900";
      ctx.fillRect(this.position.x+20,this.position.y+20,this.dim-40,this.dim-40);
	}
	isEaten(box){
     
       if(box.body[0][0]==this.position.x && box.body[0][1]==this.position.y)
       	 {
       	 	this.position.x=Math.floor(this.grid*(Math.floor(Math.random()*(Math.floor(this.window_width/this.grid)-1))));
       	 	this.position.y=Math.floor(this.grid*(Math.floor(Math.random()*(Math.floor(this.window_height/this.grid)-1))));
       	 	box.size();
       	 }
	}
}

class InputHandaler
{
	constructor(box)
	{
       document.addEventListener('keydown', event=>
       {
          switch (event.keyCode)
          {
          	case 39: //right arrow key
          	    box.moveright();
          	    break;
          	case 37://left 
          		box.moveleft();
          		break;
          	case 38: //up
 				box.moveup();
 				break;
          	case 40: //down
          		box.movedown();
          		break;
          	break;
          }

       });
       document.addEventListener('keyup',event=>
       {
         
       });
	}

}
let box = new theBox(width,height);
new InputHandaler(box);
let food=new Food(width,height);
box.draw(ctx);
function gameloop()
{
	ctx.clearRect(0,0,width,height);
	if(!box.update())
		{
			alert('Game over');
			box.initialize_again();
			
		}
	box.draw(ctx);
    food.draw(ctx);
    food.isEaten(box);

}
let fps=2;
var t=setInterval(gameloop,200);



