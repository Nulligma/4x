// create Game function in Game5x
Game5x.Game = function (game) {
    
    this.logo;
    this.gridArray;
    this.defaultX; this.defaultY;
    this.gap;
    
    this.mode = 5;
    this.gameType = 1;
    
    this.checkGridIndices;
    this.deleteGridSp = new Array();
    
    this.rn1,this.rn2,this.rn3;
    
    this.bottomMiddleY;
};

// set Game function prototype
Game5x.Game.prototype = {

    init: function () {
        

    },

    preload: function () {

        // Here we load the assets required for our preloader (in this case a 
        // background and a loading bar)
        //this.load.image('logo', 'asset/phaser.png');
        
        this.load.image('gameName', 'asset/'+canvasHeight+'/gameName.png');
        this.load.image('gridBG', 'asset/'+canvasHeight+'/gridBG.png');
        
        this.load.atlasJSONHash('playBtn', 'asset/'+canvasHeight+'/buttons/playBtn.png', 'asset/'+canvasHeight+'/buttons/playBtn.json');
        
        this.load.atlasJSONHash('5xstrip', 'asset/'+canvasHeight+'/buttons/5xstrip.png', 'asset/'+canvasHeight+'/buttons/5xstrip.json');
        
    },

    create: function () 
    {
        // Add logo to the center of the stage
        //this.logo = this.add.sprite(this.world.centerX,this.world.centerY/2,'gameName');
        // Set the anchor to the center of the sprite
        //this.logo.anchor.setTo(0.5, 0.5);
        
        gridArray = [];
        
        var gridBG;
        var gridObj;
        var gridBGWidth = 45 * screenMultiplier;
        gap = canvasWidth/(5);
        var leftX = (this.world.centerX) - (2*gap) + ((gap-gridBGWidth)/2);
        var topY = this.world.centerY - 2*(gap) + ((gap-gridBGWidth)/2);
        for(var i = 0;i<16;i++)
            {
                gridBG = this.add.sprite(0,0,'gridBG');
                //gridBG.anchor.setTo(0.5,0.5);
                
                gridBG.x = leftX + (gap)*(i%4);
                gridBG.y = topY + (gap)*Math.floor(i/4);
                
                gridObj = new Object();
                gridObj.x = gridBG.x; gridObj.y = gridBG.y;
                gridObj.value = 0;
                gridObj.sprite = gridBG;
                gridArray.push(gridObj);
            }
        
        bottomMiddleY = gridBG.y + gridBG.height + (this.world.height - (gridBG.y + gridBG.height))/2;
        
        this.generateNumbers();

    },
    
    generateNumbers:function()
    {
        if(!this.rn1)
            {
                this.rn1 = this.add.sprite(this.world.centerX-gap, bottomMiddleY,String(this.mode)+'xstrip');
                this.rn2 = this.add.sprite(this.world.centerX, bottomMiddleY,String(this.mode)+'xstrip');
                this.rn3 = this.add.sprite(this.world.centerX+gap, bottomMiddleY,String(this.mode)+'xstrip');

                this.rn1.anchor.setTo(0.5,0.5);this.rn2.anchor.setTo(0.5,0.5);this.rn3.anchor.setTo(0.5,0.5);

                this.rn1.frame = Math.round(Math.random()*(100/this.mode));
                this.rn2.frame = Math.round(Math.random()*(100/this.mode));
                this.rn3.frame = Math.round(Math.random()*(100/this.mode));

                this.rn1.inputEnabled = true;
                this.rn1.input.enableDrag();
                this.rn1.events.onDragStart.add(this.startDrag,this);
                this.rn1.events.onDragStop.add(this.stopDrag,this);

                this.rn2.inputEnabled = true;
                this.rn2.input.enableDrag();
                this.rn2.events.onDragStart.add(this.startDrag,this);
                this.rn2.events.onDragStop.add(this.stopDrag,this);

                this.rn3.inputEnabled = true;
                this.rn3.input.enableDrag();
                this.rn3.events.onDragStart.add(this.startDrag,this);
                this.rn3.events.onDragStop.add(this.stopDrag,this);
            }
        else
            {
                this.rn1.frame = Math.round(Math.random()*(100/this.mode));
                this.rn2.frame = Math.round(Math.random()*(100/this.mode));
                this.rn3.frame = Math.round(Math.random()*(100/this.mode));
            }
        
        this.rn1.visible = true;    this.rn1.alpha = 1;
        this.rn2.visible = true;    this.rn2.alpha = 1;
        this.rn3.visible = true;    this.rn3.alpha = 1;
        
        this.add.tween(this.rn1).from( { alpha: 0, y: this.game.height }, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.rn2).from( { alpha: 0, y: this.game.height }, 600, Phaser.Easing.Linear.None, true);
        this.add.tween(this.rn3).from( { alpha: 0, y: this.game.height }, 700, Phaser.Easing.Linear.None, true);
      
    },
    
    startDrag:function(rnSprite)
    {
        defaultX = rnSprite.x;
        defaultY = rnSprite.y;
        
        rnSprite.scale.x = rnSprite.scale.y = 1.1;
        
        //TODO: decrese sprite.y by -sprite.height
    },
    
    stopDrag:function(rnSprite)
    {
        var rnX = rnSprite.x;
        var rnY = rnSprite.y;
        
        var gridObj;
        var gapDiffBy2 = ((gap-rnSprite.width)/2);
        var snapped = false;
        for(var i = 0;i<16;i++)
            {
                gridObj = gridArray[i];
                
                if(rnX >= (gridObj.x - gapDiffBy2) && rnX < (gridObj.x + gapDiffBy2 + rnSprite.width))
                    {
                        if(rnY >= (gridObj.y - gapDiffBy2) && rnY < (gridObj.y + gapDiffBy2 + rnSprite.height))
                            {
                                rnSprite.scale.x = rnSprite.scale.y = 1;
                                rnSprite.x = gridObj.x + rnSprite.width/2; rnSprite.y = gridObj.y + rnSprite.height/2;
                                
                                this.tweenToAdd(gridObj,rnSprite);
                                snapped = true;
                            }
                    }
            }
        
        if(!snapped)
            {
                rnSprite.scale.x = rnSprite.scale.y = 1;
                rnSprite.x = defaultX; rnSprite.y = defaultY;
            }
    },
    
    tweenToAdd:function(gridObj,rnSprite)
    {
        var randomNumber = (rnSprite.frame + 1) * this.mode;
        
        if(gridObj.value + randomNumber <= 100)
            {
                if(gridObj.value == 0)
                    {
                        gridObj.sprite.loadTexture(String(this.mode)+'xstrip');
                        gridObj.sprite.frame = rnSprite.frame;
                        gridObj.value += randomNumber;
                
                        this.onAddTweenComplete(rnSprite);
                    }
                else
                    {
                        gridObj.value += randomNumber;
                        gridObj.sprite.frame = (gridObj.value/this.mode)-1;
                        
                        var addTween = this.add.tween(rnSprite).to( { alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
                        addTween.onComplete.add(this.onAddTweenComplete,this);
                    }
                
            }
        else
            {
                rnSprite.scale.x = rnSprite.scale.y = 1;
                rnSprite.x = defaultX; rnSprite.y = defaultY;
            }
    },
    
    onAddTweenComplete:function(rnSprite)
    {
        var index;
        for(var i = 0;i<16;i++)
            {
                if(rnSprite.x == gridArray[i].x && rnSprite.y == gridArray[i].y) index = i;
            }
        
        if(this.gameType == 1)
            {
                this.checkForMinusOn(index);
            }
        else
            {
                if(this.checkGridIndices.indexOf(index)==-1)
                    this.checkGridIndices.push(index);
            }
        
        rnSprite.x = defaultX; rnSprite.y = defaultY;
        rnSprite.visible = false;
        
        if(!this.rn1.visible && !this.rn2.visible && !this.rn3.visible)
        {
            if(this.gameType == 2 && this.deleteGridSp.length > 0)
                {
                    this.checkForMinusOn(this.deleteGridSp.pop());
                    this.deleteGridSp[];
                }
            this.generateNumbers();
        }
    },
    
    checkForMinusOn:function(index)
    {
        var gridObj = gridArray[index];
        var delCurrent = false;
        
        if(this.gameType == 2) this.deleteGridSp = [];
        
        if(index!=0 && gridArray[index-1].value == gridObj.value)
		{
			delCurrent = true;
			this.deleteGridSp.push(index-1);	
		}
		if(index!=15 && gridArray[index+1].value == gridObj.value)
		{
			delCurrent = true;
			this.deleteGridSp.push(index+1);	
		}
		if(index-4>0 && gridArray[index-4].value == gridObj.value)
		{
			delCurrent = true;
			this.deleteGridSp.push(index-4);	
		}
		if(index+4 < 16 && gridArray[index+4].value == gridObj.value)
		{
			delCurrent = true;
			this.deleteGridSp.push(index+4);	
        }
        
		if(delCurrent) this.deleteGridSp.push(index);
        
        if(this.gameType == 2 && this.checkGridIndices.length != 0)
            {
                this.checkForMinusOn(this.checkGridIndices.pop());
            }
        else
            {
                this.performMinus();
            }
        
    },
    
    performMinus:function()
    {
        for each(var index in this.deleteGridSp)
        {
            gridArray[index].loadTexture('gridBG');
        }
    },
    
    render:function()
    {
        //game.debug.text( w, 0, game.world.centerY ,{ font: "Bold 86px Arial", fill: '#000000' });
        //game.debug.text( canvasWidth, 50, game.world.centerY,{ font: "Bold 86px Arial", fill: '#000000' });
        //game.debug.text( leftX, 100, game.world.centerY,{ font: "Bold 86px Arial", fill: '#000000' });
        //game.debug.text( topY, 150, game.world.centerY+100,{ font: "Bold 86px Arial", fill: '#000000' });
    },
    
    playGame:function()
    {
        
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    },

};