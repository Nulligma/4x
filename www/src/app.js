var canvasWidth;
var canvasHeight;
var screenMultiplier;
var ratio,w,h;
var tempInstance;
var playerID = null;
var outsideInstruction = null;
var processFailGroup;
var purchaseIndex;
var imagesCreated = 0;
var globalScale;

var globalSaveObject;

var internet;

var admobid_interstitial = "ca-app-pub-7319949001215378/8153381440";
var admobid_banner = "ca-app-pub-7319949001215378/8728096519";
var admob_reward = 'ca-app-pub-7319949001215378/8242432231';


var leaderBoadIds = ["CgkI_vOTtLAKEAIQAQ","CgkI_vOTtLAKEAIQAg","CgkI_vOTtLAKEAIQAw","CgkI_vOTtLAKEAIQBA","CgkI_vOTtLAKEAIQBQ","CgkI_vOTtLAKEAIQBg"];

var _1kAchivemenID = "CgkI_vOTtLAKEAIQBw";
var _10kAchivemenID = "CgkI_vOTtLAKEAIQCA";
var _100kAchivemenID = "CgkI_vOTtLAKEAIQCQ";

var _match4AchivemenID = "CgkI_vOTtLAKEAIQCg";
var _match5AchivemenID = "CgkI_vOTtLAKEAIQCw";

//var appoDealKey = "a92094f347c27a808ee16a14ad0ee8b0697b8903df2a745d";

(function () {
    /* globals Phaser:false, BasicGame: false */
    //  Create your Phaser game and inject it into the game div.
    //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    //  We're using a game size of 480 x 640 here, but you can use whatever you feel makes sense for your game of course
    
    //FGLConnector.showInterstitialAd();
    
    document.addEventListener("deviceready", onDeviceReady, false);
})();

function onDeviceReady() 
{   
    //var network = navigator.connection.type;
    //console.log(network);
    initResize();
    //preloadSaves();
    
    NativeStorage.getItem('saves',
    function(obj)
    {
        if(!obj)
        {
            createLocalSave();
        }
        else
        {
            globalSaveObject = JSON.parse(obj);
        }
    },
    function(error)
    {
        console.log("error: "+error);
        createLocalSave();
    });
    
    
    //document.addEventListener("resume", onResume, false);
    //document.addEventListener("pause", onPause, false)
    
    //window.game.setUp();
    
    window.plugins.playGamesServices.auth();
    
    /*window.game.onLoginSucceeded = function(result)
    {
        var playerDetail = result;
        playerID = playerDetail['playerId'];
        if(outsideInstruction == "showLeaderBoard")
            {
                updateLeaderBoard();
                outsideInstruction = null;
            }
    };*/
    
    /*window.game.onLoginFailed = function()
    {
        if(outsideInstruction != null)
            {
                processFailGroup = tempInstance.add.group();
                var buyBG = this.add.graphics( 0, 0 );
                buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
                buyBG.drawRect(0, 0, this.world.width, this.world.height);
                processFailGroup.add(buyBG);

                var failedSymbol = this.add.sprite( 0, 0,"failedSymbol" );
                failedSymbol.anchor.setTo(0.5,0.5);
                failedSymbol.x = tempInstance.world.centerX;
                failedSymbol.y = tempInstance.world.centerY;
                processFailGroup.add(failedSymbol);

                var closeBtn = this.add.button( 0, 0,"closeBtn",closeFailGroup,tempInstance,0,0,1,0);
                closeBtn.anchor.setTo(0.5,0.5);
                closeBtn.x = failedSymbol.x + failedSymbol.width/2 - closeBtn.width/1.5;
                closeBtn.y = tempInstance.world.centerY - failedSymbol.height/2 + closeBtn.height/1.5;
                processFailGroup.add(closeBtn);

                outsideInstruction = null;
            }
    };*/
    
    store.register({
      id: "150_coins",
      alias: "150 coins",
      type: store.CONSUMABLE
    });
    store.register({
      id: "350_coins",
      alias: "350 coins",
      type: store.CONSUMABLE
    });
    store.register({
      id: "700_coins",
      alias: "700 coins",
      type: store.CONSUMABLE
    });
    store.register({
      id: "1000_coins",
      alias: "1000 coins",
      type: store.CONSUMABLE
    });
    store.register({
      id: "2x_coins",
      alias: "2x coins",
      type: store.NON_CONSUMABLE
    });
    store.register({
      id: "remove_ads",
      alias: "remove ads",
      type: store.NON_CONSUMABLE
    });
    store.register({
      id: "special_theme",
      alias: "special theme",
      type: store.NON_CONSUMABLE
    });
    
    store.when("remove ads").approved(function(p){
        globalSaveObject.showAd = false;
        onSuccessPurchase();
        p.finish();
    });
    store.when("remove ads").cancelled(onFailedPurchase);
    store.when("remove ads").error(onFailedPurchase);
    
    store.when("2x coins").approved(function(p){
        globalSaveObject.doubleCoin = true;
        onSuccessPurchase();
        p.finish();
    });
    store.when("2x coins").cancelled(onFailedPurchase);
    store.when("2x coins").error(onFailedPurchase);
    
    store.when("150 coins").approved(function(p){
        if(!globalSaveObject.coinsBought._150)
            {
                globalSaveObject.coinsBought._150 = false;
                globalSaveObject.coins += 150;
                onSuccessPurchase();
            }
        p.finish();
    });
    store.when("150 coins").cancelled(onFailedPurchase);
    store.when("150 coins").error(onFailedPurchase);
    
    store.when("350 coins").approved(function(p){
        if(!globalSaveObject.coinsBought._350)
            {
                globalSaveObject.coinsBought._350 = false;
                globalSaveObject.coins += 350;
                onSuccessPurchase();
            }
        p.finish();
    });
    store.when("350 coins").cancelled(onFailedPurchase);
    store.when("350 coins").error(onFailedPurchase);
    
    store.when("700 coins").approved(function(p){
        if(!globalSaveObject.coinsBought._700)
            {
                globalSaveObject.coinsBought._700 = false;
                globalSaveObject.coins += 700;
                onSuccessPurchase();
            }
        p.finish();
    });
    store.when("700 coins").cancelled(onFailedPurchase);
    store.when("700 coins").error(onFailedPurchase);
    
    store.when("1000 coins").approved(function(p){
        
        if(!globalSaveObject.coinsBought._1000)
            {
                globalSaveObject.coinsBought._1000 = false;
                globalSaveObject.coins += 1000;
                onSuccessPurchase();
            }
        p.finish();
    });
    store.when("1000 coins").cancelled(onFailedPurchase);
    store.when("1000 coins").error(onFailedPurchase);
    
    store.when("special theme").approved(function(p){
        globalSaveObject.themeBought.theme5 = true;
        onSuccessPurchase();
        p.finish();
    });
    store.when("special theme").cancelled(onFailedPurchase);
    store.when("special theme").error(onFailedPurchase);
    
    store.refresh();
    
    /*Appodeal.disableLocationPermissionCheck();
    Appodeal.confirm(Appodeal.SKIPPABLE_VIDEO);
    Appodeal.initialize(appoDealKey, Appodeal.INTERSTITIAL | Appodeal.SKIPPABLE_VIDEO | Appodeal.BANNER | Appodeal.REWARDED_VIDEO);
    
    document.addEventListener('onRewardedVideoFinished', function(data){
        tempInstance.successRewardAd();  //data.amount  - amount of reward, data.name - reward name
    });
    
    document.addEventListener('onRewardedVideoFailedToLoad', function(){
        tempInstance.errorRewardAd();
    });*/
    
    startPhaser();

}

function createReportCard(score,theme) 
{
    var reportCanvas = document.createElement("canvas");

    var mode = Game5x.saveObject.currentMode;
    var gameType = Game5x.saveObject.currentGameType;

    var modeString = "Game"+Game5x.saveObject.currentMode+"x";
    var typeString = Game5x.saveObject.currentGameType == 1?"typePM":"typePPPM";
    
    var hiScore = Game5x.saveObject[modeString][typeString].hiScore; 

    iW = 640;
    iH = 320;

    reportCanvas.width = iW;
    reportCanvas.height = iH;

    var ctx = reportCanvas.getContext("2d");
    ctx.fillStyle = "#"+Game5x.bgThemeColor[Game5x.saveObject.theme-1].toString(16);
    ctx.fillRect(0,0,reportCanvas.width,reportCanvas.height);

    gameName = new Image();
    gameName.onload = function()
    {
        ctx.drawImage(gameName,(iW/4)-gameName.width/2,(iH/2)-gameName.height/2);

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);
    }
    gameName.src = "asset/Theme"+theme+"/960/gameName.png";

    loadJson("modes",theme,function(file)
    {
        var jsonData = JSON.parse(file);
        var frameNumber = mode==4?2:mode-1;
        var frame = jsonData.frames["modes"+"000"+frameNumber].frame;

        var x = 7*iW/8 - frame.w/2;
        var y = iH/2 + frame.h*1.5;

        x-=frame.w/2;
        y-=frame.h/2;
        
        drawSprite(ctx,theme,"modes",frame.x,frame.y,frame.w,frame.h,x,y,frame.w,frame.h);

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);
    }); 

    loadJson("gameTypes",theme,function(file)
    {
        var jsonData = JSON.parse(file);
        var frameNumber = gameType - 1;
        var frame = jsonData.frames["gameTypes"+"000"+frameNumber].frame;

        var x = 7*iW/8 - frame.w/2;
        var y = iH/2 + frame.h*3.5;

        x-=frame.w/2;
        y-=frame.h/2;
        drawSprite(ctx,theme,"gameTypes",frame.x,frame.y,frame.w,frame.h,x,y,frame.w,frame.h);

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);
    }); 


    loadJson("digits",theme,function(file)
    {
        var jsonData = JSON.parse(file);

        var hiString = score.toString();
        var frameIndex,frame,x,y;
        for(var j = 0; j < hiString.length; j++)
        {
            frameIndex = parseInt(hiString.charAt(hiString.length-1-j));
            frame = jsonData.frames["digits"+"000"+frameIndex].frame;

            x = 7*iW/8 - (frame.w*j) ;
            y = iH/2 - frame.h*1.5;

            x-=frame.w/2;
            y-=frame.h/2;
            
            drawSprite(ctx,theme,"digits",frame.x,frame.y,frame.w,frame.h,x,y,frame.w,frame.h);
        }

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);
    }); 
    
    loadJson("hidigits",theme,function(file)
    {
        var jsonData = JSON.parse(file);

        var hiString = hiScore.toString();
        var frameIndex,frame,x,y;
        for(var j = 0; j < hiString.length; j++)
        {
            frameIndex = parseInt(hiString.charAt(hiString.length-1-j));
            frame = jsonData.frames["hidigits"+"000"+frameIndex].frame;

            x = 7*iW/8 - (frame.w*j) ;
            y = iH/2 - frame.h*3;

            x-=frame.w/2;
            y-=frame.h/2;
            drawSprite(ctx,theme,"hidigits",frame.x,frame.y,frame.w,frame.h,x,y,frame.w,frame.h);
        }

        imagesCreated++;
        if(imagesCreated == 6) shareImage(reportCanvas);

        var newX = x - frame.w*2;
        y = y - frame.w/2;

        medal = new Image();
        medal.onload = function()
        {
            ctx.drawImage(medal,newX,y);

            imagesCreated++;
            if(imagesCreated == 6) shareImage(reportCanvas);
        }
        medal.src = "asset/Theme"+theme+"/960/medal.png";
    }); 
}

function loadJson(fileName,theme,callback)
{
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET',"asset/Theme"+theme+"/960/buttons/"+fileName+".json",true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null); 
}

function drawSprite(context2d,theme,fileName,sX,sY,sW,sH,dX,dY,dW,dH)
{
    var spriteImg = new Image();
    spriteImg.onload = function()
    {
        context2d.drawImage(spriteImg,sX,sY,sW,sH,dX,dY,dW,dH);
    }
    spriteImg.src = "asset/Theme"+theme+"/960/buttons/"+fileName+".png";

}

function shareImage(reportCanvas)
{
    //window.open(reportCanvas.toDataURL('image/png'));
   window.plugins.socialsharing.share(null, "My Score", reportCanvas.toDataURL('image/png'), null);
}  

function preloadSaves()
{
    var localSave = JSON.parse(NativeStorage.getItem('saves'));

    if(!localSave)
        {
            this.createLocalSave();
        }
    else
        {
            globalSaveObject = localSave;
        }
}

function createLocalSave()
{
    globalSaveObject = new Object();

    globalSaveObject = {
                    currentMode:4,currentGameType:1,sound:true,firstRun:true,coins:0,theme:1,showAd:true,doubleCoin:false,ratedGame:false,
                    coinsBought:{_150:false,_350:false,_700:false,_1000:false},
                    themeBought:{theme1:true,theme2:false,theme3:false,theme4:false,theme5:false,theme6:false},
                    Game4x:{
                                typePM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:16,rn2:8,rn3:40,
                                            grid:[40,0,40,0,0,0,0,0,0,24,0,0,0,0,0,0],
                                },
                                typePPPM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                }
                    },
                    Game2x:{
                                typePM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                },
                                typePPPM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                }
                    },
                    Game1x:{
                                typePM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                },
                                typePPPM:{
                                            reset:true,hiScore:0,currentScore:0,rn1:0,rn2:0,rn3:0,
                                            grid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                }
                    }
    };
    NativeStorage.setItem('saves', JSON.stringify(globalSaveObject));
}

function startPhaser()
{
    //window.game.login();
    
    var config = {
    "width": canvasWidth,
    "height": canvasHeight,
    "renderer": Phaser.AUTO,
    "parent": 'game',
    //"resolution": ratio
	};
    
    
	var gameInstance = new Phaser.Game(config);
    
    //game = new Phaser.Game(480, 640, Phaser.AUTO, 'game');

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
    gameInstance.state.add("Game", Game5x.Game);
    gameInstance.state.add('Menu', Game5x.Menu);
    gameInstance.state.add('Boot', Game5x.Boot);
    
    //  Now start the Game state.
    gameInstance.state.start('Boot');
}

function initResize()
{

	ratio = window.devicePixelRatio || 1;
    w = window.innerWidth * ratio;
    h = window.innerHeight * ratio;
    
    canvasHeight = 480;
    screenMultiplier = 1;
    
    if(h >= 480)
    {
        canvasHeight = 480;
        screenMultiplier = 1;
    }  
    if(h >= 960)
	{
	  canvasHeight = 960;
	  screenMultiplier = 2;
	}
    if(h >= 1920)
	{
	  canvasHeight = 1920;
	  screenMultiplier = 4;
	}

    canvasWidth = Math.round((canvasHeight * w)/h);
}

function orderProduct(productAlias)
{
    store.order(productAlias);
}

function onSuccessPurchase()
{
    NativeStorage.setItem('saves', JSON.stringify(Game5x.saveObject));
}

function onFailedPurchase()
{
      
}

function updateLeaderBoard()
{
    /*var modes = ["Game4x","Game4x","Game2x","Game2x","Game1x","Game1x"];
    var gameTypes = ["typePM","typePPPM","typePM","typePPPM","typePM","typePPPM"]
    for(var i=0;i<leaderBoadIds.length;i++)
        {
            window.game.submitScore(leaderBoadIds[i], Game5x.saveObject[modes[i]][gameTypes[i]].hiScore);
        }
    
    window.game.showLeaderboards();*/
}

function closeFailGroup()
{
    processFailGroup.destroy(true,false);
    processFailGroup = null;
}

function onPause()
{
    if(tempInstance && tempInstance.pauseGame)
        {
            tempInstance.pauseGame();
        }
}

function onResume()
{
    
}