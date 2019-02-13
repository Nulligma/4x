
// create Game function in Game5x
Game5x.Game = function (game) {
    this.logo;
    this.gridArray = null;
    this.gap;
    
    this.mode;
    this.gameType;
    this.sound;
    
    this.currentTutAnim = 1;
    this.tutSprite;
    
    this.allSnapedNumbers = new Array();
    this.deleteGridSp = new Array();
    
    this.rn1=null;
    this.rn2=null;
    this.rn3=null;
    
    this.justSubtracted = false;
    this.shuffle = false; 
    
    this.bottomMiddleY = null;
    this.medalSprite = null;
    
    this.pauseBtn = null;
    
    this.pauseGroup = null;
    this.gameOverGroup = null;
    this.settingsGroup = null;
    this.helpGroup = null;
    
    this.newMode; this.newGameType;
    this.modeString; this.typeString;
    
    this.points = 0;
    
    this.digitArray = null;
    this.hiDigitArray = null;
    this.coinArray = null;
    this.gameOver = false;
    
    this.gameOverSound = null;
    this.pickNumberSound = null;
    this.minusNumbersSound = null;
    this.generateNumbersSound = null;
    this.addNumbersSound = null;
    this.buttonSound = null;
    this.freeCoinMenu = null;
    
    this.shuffleBtn;
    this.coinBtn;
    this.theme;
    
    this.reportBGDetails;
};

var universalThis;

document.addEventListener('onAdPresent', function(e){
    if(e.adType == 'rewardvideo') {
        Game5x.saveObject.coins += 10;
        universalThis.updateDigits();
        
        NativeStorage.setItem('saves', JSON.stringify(Game5x.saveObject));
        
    }
});


// set Game function prototype
Game5x.Game.prototype = {

    preload: function () {

        // Here we load the assets required for our preloader (in this case a 
        // background and a loading bar)
        //this.load.image('logo', 'asset/phaser.png');
        this.theme = Game5x.saveObject.theme == 2?1:Game5x.saveObject.theme;
        
        if(Game5x.saveObject.showAd && AdMob)
        {
            AdMob.createBanner( {
                adId: admobid_banner,
                position: AdMob.AD_POSITION.TOP_CENTER,
                isTesting: false, // TODO: remove this line when release
                overlap: true,
                offsetTopBar: false,
                bgColor: 'black'
            } );
            
            console.log("caching on preload");
            this.cacheInterstitial();
        }
        
        AdMob.prepareRewardVideoAd( {adId:admob_reward, autoShow:false} );
        
        this.load.image('gridBG', 'asset/Theme'+this.theme+'/'+canvasHeight+'/gridBG.png');
        this.load.image('medal', 'asset/Theme'+this.theme+'/'+canvasHeight+'/medal.png');
        this.load.image('adtxt', 'asset/Theme'+this.theme+'/'+canvasHeight+'/adtxt.png');
        this.load.image('gameOverTxt', 'asset/Theme'+this.theme+'/'+canvasHeight+'/gameOverTxt.png');
        this.load.image('ssAPI', 'asset/Theme'+this.theme+'/'+canvasHeight+'/ssAPI.png');
        this.load.image('shuffleValue', 'asset/Theme'+this.theme+'/'+canvasHeight+'/shuffleValue.png');
        this.load.image('hand', 'asset/Theme'+this.theme+'/'+canvasHeight+'/hand.png');
        
        this.load.audio('gameOverSound', ['asset/sounds/gameOver.ogg','asset/sounds/gameOver.mp3']);
        this.load.audio('pickNumberSound', ['asset/sounds/pickNumber.ogg','asset/sounds/pickNumber.mp3']);
        this.load.audio('minusNumbersSound', ['asset/sounds/minusNumbers.ogg','asset/sounds/minusNumbers.mp3']);
        this.load.audio('generateNumbersSound', ['asset/sounds/generateNumbers.ogg','asset/sounds/generateNumbers.mp3']);
        this.load.audio('addNumbersSound', ['asset/sounds/addNumbers.ogg','asset/sounds/addNumbers.mp3']);
        this.load.audio('purchasedSound', ['asset/sounds/purchased.ogg','asset/sounds/purchased.mp3']);
        
        this.load.atlasJSONHash('modes', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/modes.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/modes.json');
        this.load.atlasJSONHash('gameTypes', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/gameTypes.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/gameTypes.json');
        this.load.atlasJSONHash('shareBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/shareBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/shareBtn.json');
        
        this.load.atlasJSONHash('help', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/help.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/help.json');
        this.load.atlasJSONHash('pauseBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pauseBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pauseBtn.json');
        this.load.atlasJSONHash('resetBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/resetBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/resetBtn.json');
        this.load.atlasJSONHash('bigPlayBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/bigPlayBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/bigPlayBtn.json');
        this.load.atlasJSONHash('bigSettingsBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/bigSettingsBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/bigSettingsBtn.json');
        this.load.atlasJSONHash('helpBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/helpBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/helpBtn.json');
        this.load.atlasJSONHash('home', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/home.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/home.json');
        
        this.load.atlasJSONHash('1xstrip', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/1xstrip.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/1xstrip.json');
        this.load.atlasJSONHash('4xstrip', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/4xstrip.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/4xstrip.json');
        this.load.atlasJSONHash('2xstrip', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/2xstrip.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/2xstrip.json');
        
        this.load.atlasJSONHash('shuffleBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/shuffleBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/shuffleBtn.json');
        this.load.atlasJSONHash('coin2xBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/coin2xBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/coin2xBtn.json');
        this.load.atlasJSONHash('coinBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/coinBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/coinBtn.json');
        
        this.load.atlasJSONHash('digits', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/digits.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/digits.json');
        this.load.atlasJSONHash('hidigits', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/hidigits.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/hidigits.json');
        
        
        document.addEventListener("backbutton", this.backButtonPressed, false);
        
    },
    
    init:function()
    {
        this.mode = Game5x.saveObject.currentMode;
        this.gameType = Game5x.saveObject.currentGameType;
        this.sound = Game5x.saveObject.sound;
        
        this.modeString = "Game"+Game5x.saveObject.currentMode+"x";
        this.typeString = Game5x.saveObject.currentGameType == 1?"typePM":"typePPPM";
        
        this.gridArray = null;
        
        this.allSnapedNumbers = new Array();
        this.deleteGridSp = new Array();

        this.rn1=null;
        this.rn2=null;
        this.rn3=null;

        this.justSubtracted = false;
        this.gameOver = false;
        
        this.bottomMiddleY = null;

        this.pauseBtn = null;
        this.pauseGroup = null;
        this.gameOverGroup = null;

        this.settingsGroup = null;
        this.helpGroup = null;
        
        this.points = 0;
    },

    create: function () 
    {
        this.createGame();
        tempInstance = this;
    },
    
    createGame:function()
    {
        
        this.gameOverSound = this.add.audio('gameOverSound');
        this.pickNumberSound = this.add.audio('pickNumberSound');
        this.purchasedSound = this.add.audio('purchasedSound');
        this.minusNumbersSound = this.add.audio('minusNumbersSound');
        this.generateNumbersSound = this.add.audio('generateNumbersSound');
        this.addNumbersSound = this.add.audio('addNumbersSound');
        this.buttonSound = this.add.audio('buttonSound');
        
        //var addBG = this.add.graphics( 0, 0 );
        //addBG.beginFill(0x424242, 1);
        //addBG.drawRect(0, 0, this.game.world.width, this.game.world.height*0.08);
        
        //var adtxt = this.add.sprite(this.world.centerX,0,"adtxt");
        //adtxt.anchor.setTo(0.5,0.5);
        //adtxt.y = addBG.height/2;
        
        globalScale = this.world.width/this.world.height<0.56?0.9:1; 
                
        this.gridArray = [];
        this.gap = canvasWidth/(5);
        
        var gridBG;
        var gridObj;
        var gridBGWidth = 45 * screenMultiplier;
        var leftX = (this.world.centerX) - (2*this.gap) + ((this.gap-gridBGWidth)/2);
        var topY = this.world.centerY - 2*(this.gap) + ((this.gap-gridBGWidth)/2);
        for(var i = 0;i<16;i++)
            {
                gridBG = this.add.sprite(0,0,'gridBG');
                gridBG.scale.setTo(globalScale,globalScale);
                    
                //gridBG.anchor.setTo(0.5,0.5);
                
                gridBG.x = leftX + (this.gap)*(i%4);
                gridBG.y = topY + (this.gap)*Math.floor(i/4);
                
                gridObj = new Object();
                gridObj.x = gridBG.x; gridObj.y = gridBG.y;
                gridObj.value = 0;
                gridObj.index = i;
                gridObj.sprite = gridBG;
                
                if(Game5x.saveObject[this.modeString][this.typeString].grid[i] !== 0)
                    {
                        gridObj.value = Game5x.saveObject[this.modeString][this.typeString].grid[i];
                        
                        gridObj.sprite.loadTexture(String(this.mode)+'xstrip');
                        gridObj.sprite.frame = (gridObj.value/this.mode)-1;
                    }
                
                this.gridArray.push(gridObj);
            }
        
        this.bottomMiddleY = gridBG.y + gridBG.height + (this.world.height - (gridBG.y + gridBG.height))/2;
        
        this.pauseBtn = this.add.button(0,0,'pauseBtn',this.pauseGame,this,0,0,1,0);
        this.pauseBtn.anchor.setTo(0.5,0.5);
        this.pauseBtn.x = this.gridArray[0].sprite.x + this.pauseBtn.width/2;
        this.pauseBtn.y = this.gridArray[0].sprite.y - this.pauseBtn.height*0.625;
        this.pauseBtn.setDownSound(this.buttonSound);
        
        this.shuffleBtn = this.add.button(0,0,"shuffleBtn",this.sendBackNumbers,this,0,0,1,0);
        this.shuffleBtn.x = this.shuffleBtn.width/2;
        this.shuffleBtn.y = this.bottomMiddleY;
        this.shuffleBtn.anchor.setTo(0.5,0.5);
        
        var shuffleValue = this.add.sprite(0,0,"shuffleValue");
        shuffleValue.x = this.shuffleBtn.width - shuffleValue.width/2;
        shuffleValue.y = this.bottomMiddleY - 3*shuffleValue.height/4 - this.shuffleBtn.height/2;
        shuffleValue.anchor.setTo(0.5,0.5);
        
        if(Game5x.saveObject.doubleCoin)
            this.coinBtn = this.add.button(0,0,"coin2xBtn",this.buyMenu,this,0,0,1,0);
        else
            this.coinBtn = this.add.button(0,0,"coinBtn",this.buyMenu,this,0,0,1,0);
        this.coinBtn.x = this.world.width - this.coinBtn.width/2;
        this.coinBtn.y = this.bottomMiddleY;
        this.coinBtn.anchor.setTo(0.5,0.5);
        
        if(this.digitArray == null)
            {
                this.digitArray = new Array(11);
                this.hiDigitArray = new Array(11);
                this.coinArray = new Array(11);
                
                for(var j = 0;j<11;j++)
                {
                    this.digitArray[j] = this.add.sprite(0,0,"digits");
                    this.digitArray[j].anchor.setTo(0.5,0.5);
                    this.digitArray[j].x = (this.gridArray[3].sprite.x + this.gridArray[3].sprite.width - this.digitArray[j].width/2) - (this.digitArray[j].width*j);
                    this.digitArray[j].y = this.pauseBtn.y;
                    this.digitArray[j].visible = false;
                    
                    this.hiDigitArray[j] = this.add.sprite(0,0,"hidigits");
                    this.hiDigitArray[j].anchor.setTo(0.5,0.5);
                    this.hiDigitArray[j].x = (this.gridArray[3].sprite.x + this.gridArray[3].sprite.width - this.hiDigitArray[j].width/2) - (this.hiDigitArray[j].width*j);
                    this.hiDigitArray[j].y = this.digitArray[j].y - this.hiDigitArray[j].height*1.5;
                    this.hiDigitArray[j].visible = false;
                    
                    this.coinArray[j] = this.add.sprite(0,0,"digits");
                    this.coinArray[j].anchor.setTo(0.5,0.5);
                    this.coinArray[j].x = (this.world.width - this.coinArray[j].width) - (this.coinArray[j].width*j);
                    this.coinArray[j].y = shuffleValue.y;
                    this.coinArray[j].visible = false;
                    
                }
                this.medalSprite = this.add.sprite(0,0,"medal");
                this.medalSprite.anchor.setTo(0.5,0.5);
            }
        else
            {
                for(var j = 0;j<11;j++)
                {
                    this.digitArray[j].frame = 0;
                    this.hiDigitArray[j].frame = 0;
                    this.coinArray[j].frame = 0;
                }
            }
        
        this.medalSprite.y = this.hiDigitArray[j-1].y;
        this.points = Game5x.saveObject[this.modeString][this.typeString].currentScore;
        this.updateDigits();
        
        this.generateNumbers();
        
        if(Game5x.saveObject.firstRun)
            {
                //this.createHelp();
                this.tutSprite = this.add.sprite(0,0,"hand");
                this.currentTutAnim = 1;
                this.tutAnimSwitcher();
            }
    },
    
    tutAnimSwitcher:function()
    {
        if(this.currentTutAnim == 1)        this.tutAnim1();
        else if(this.currentTutAnim == 2)   this.tutAnim2();
        else if(this.currentTutAnim == 3)   this.tutAnim3();
        else if(this.currentTutAnim == 4)
            {
                this.tutSprite.destroy(true,false);
                this.tutSprite = null;
            }
    },
    
    tutAnimAlpha:function()
    {
        this.add.tween(this.tutSprite).to( { alpha:0}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.tutAnimSwitcher,this);
    },
    
    tutAnim1:function()
    {
        this.tutSprite.x = this.rn1.x;
        this.tutSprite.y = this.rn1.y;
        this.tutSprite.alpha = 1;
        
        this.add.tween(this.tutSprite).to( { x:this.gridArray[10].sprite.x+this.gridArray[10].sprite.width/2,y:this.gridArray[10].sprite.y+this.gridArray[10].sprite.height/2}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.tutAnimAlpha,this);
    },
    
    tutAnim2:function()
    {
        this.tutSprite.x = this.rn2.x;
        this.tutSprite.y = this.rn2.y;
        this.tutSprite.alpha = 1;
        
        this.add.tween(this.tutSprite).to( { x:this.gridArray[10].sprite.x+this.gridArray[10].sprite.width/2,y:this.gridArray[10].sprite.y+this.gridArray[10].sprite.height/2}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.tutAnimAlpha,this);
    },
    
    tutAnim3:function()
    {
        this.tutSprite.x = this.rn3.x;
        this.tutSprite.y = this.rn3.y;
        this.tutSprite.alpha = 1;
        
        this.add.tween(this.tutSprite).to( { x:this.gridArray[1].sprite.x+this.gridArray[1].sprite.width/2,y:this.gridArray[1].sprite.y+this.gridArray[1].sprite.height/2}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.tutAnimAlpha,this);
    },

    onGameOver:function()
    {
        
        if(Game5x.saveObject.showAd && AdMob)
        {
            console.log("showing ad on gameover");
            AdMob.showInterstitial();
            this.cacheInterstitial();
        }
        
        this.gameOver = true;
        this.gameOverGroup = this.add.group();
        
        this.pauseBtn.destroy(true,false);
        this.pauseBtn = null;
        
        this.shuffleBtn.destroy(true,false);
        this.shuffleBtn = null;
        this.coinBtn.destroy(true,false);
        this.coinBtn = null;
        
        this.gameOverSound.play();
        
        //if(Game5x.saveObject.showAd)
            //Appodeal.show(Appodeal.INTERSTITIAL);
        
        var goBG = this.add.graphics( 0, 0 );
        goBG.beginFill(Game5x.darkThemeColor[Game5x.saveObject.theme-1], 1);
        goBG.drawRect(0, 0, this.world.width, this.world.height);
        this.gameOverGroup.add(goBG);
        
        var gameOverTxt = this.add.sprite(this.world.centerX,0,'gameOverTxt');
        gameOverTxt.y = this.world.centerY/2 - gameOverTxt.height;
        gameOverTxt.anchor.setTo(0.5,0.5);
        this.gameOverGroup.add(gameOverTxt);
        
        
        var report = this.add.group();
        var reportBG = this.add.graphics( 0, 0 );
        reportBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1],1);
        reportBG.drawRect(0, 0, this.world.width, this.world.height*0.3);
        reportBG.y = Math.round(this.world.centerY - reportBG.height/2);
        report.add(reportBG);
        
        var gameName = this.add.sprite(0,0,"gameName");
        gameName.anchor.setTo(0.5,0.5);
        gameName.x = this.world.width/4;
        gameName.y = this.world.centerY;
        report.add(gameName);
        
        var modeSP = this.add.sprite(0,0,"modes");
        modeSP.frame = this.mode==4?2:this.mode-1;
        modeSP.anchor.setTo(0.5,0.5);
        modeSP.x = 7*this.world.width/8 - modeSP.width/2;
        modeSP.y = this.world.centerY+modeSP.height*1.5;
        report.add(modeSP);
        
        var gameTypeSP = this.add.sprite(0,0,"gameTypes");
        gameTypeSP.frame = this.gameType - 1;
        gameTypeSP.anchor.setTo(1,0.5);
        gameTypeSP.x = modeSP.x + modeSP.width/2;
        gameTypeSP.y = this.world.centerY+modeSP.height*3;
        report.add(gameTypeSP);
        
        var hiString = Game5x.saveObject[this.modeString][this.typeString].hiScore.toString();
        var numberString = this.points.toString();
        
        var hiScore;
        for(var j = 0; j < hiString.length; j++)
            {
                hiScore = this.add.sprite(0,this.world.centerY,"hidigits");
                hiScore.frame = parseInt(hiString.charAt(hiString.length-1-j));
                hiScore.x = 7*this.world.width/8 - (hiScore.width)*j;
                hiScore.y = this.world.centerY - hiScore.height*3;
                hiScore.anchor.setTo(0.5,0.5);
                report.add(hiScore);
             
            }
        var ms = this.add.sprite(0,hiScore.y,"medal");
        ms.x = hiScore.x - ms.width*1.5;
        ms.anchor.setTo(0.5,0.5);
        report.add(ms);
        
        var score;
        for(var i = 0; i < numberString.length; i++)
            {
                score = this.add.sprite(0,this.world.centerY,"digits");
                score.frame = parseInt(numberString.charAt(numberString.length-1-i));
                score.x = 7*this.world.width/8 - (score.width)*i;
                score.y = this.world.centerY - (score.height)*1.5;
                score.anchor.setTo(0.5,0.5);
                report.add(score);
            }
        
        reportBG.height = gameTypeSP.y + modeSP.height - (ms.y - ms.height);
        reportBG.height *= 1.25;
        reportBG.y = this.world.centerY - reportBG.height/2;
        
        this.reportBGDetails = new Object();
        this.reportBGDetails.height = reportBG.height;
        this.reportBGDetails.y = reportBG.y;
        
        this.gameOverGroup.add(report);
        
        var resetBtn = this.add.button(this.world.centerX+this.world.centerX/1.5,0,'resetBtn',this.resetGame,this,0,0,1,0);
        resetBtn.y = (this.world.height + reportBG.y + reportBG.height)/2;
        resetBtn.anchor.setTo(0.5,0.5);
        resetBtn.setDownSound(this.buttonSound);
        this.gameOverGroup.add(resetBtn);
        
        var shareBtn = this.add.button(this.world.centerX,0,'shareBtn',this.shareGame,this,0,0,1,0);
        shareBtn.y = resetBtn.y;
        shareBtn.anchor.setTo(0.5,0.5);
        shareBtn.setDownSound(this.buttonSound);
        this.gameOverGroup.add(shareBtn);
        
        var home = this.add.button(this.world.centerX-this.world.centerX/1.5,0,'home',this.gotoHome,this,0,0,1,0);
        home.y = resetBtn.y;
        home.anchor.setTo(0.5,0.5);
        home.setDownSound(this.buttonSound);
        this.gameOverGroup.add(home);
        console.log("updating leaderBoard");
        window.plugins.playGamesServices.isSignedIn(this.onAuthCheck);
        
        console.log("updated leaderBoard");
    },

    onAuthCheck:function(result)
    {
        if(result.isSignedIn)
        {
            var modes = ["Game4x","Game4x","Game2x","Game2x","Game1x","Game1x"];
            var gameTypes = ["typePM","typePPPM","typePM","typePPPM","typePM","typePPPM"];
            var data;
            var modeString = "Game"+Game5x.saveObject.currentMode+"x";
            var typeString = Game5x.saveObject.currentGameType == 1?"typePM":"typePPPM";
            var saveObj = Game5x.saveObject[modeString][typeString];
            for(var i=0;i<leaderBoadIds.length;i++)
                {
                    data = {
                        score: Game5x.saveObject[modes[i]][gameTypes[i]].hiScore,
                        leaderboardId: leaderBoadIds[i]
                    };

                    if(modes[i] == modeString && gameTypes[i] == typeString){

                        //if(saveObj.currentScore >= saveObj.hiScore)
                            window.plugins.playGamesServices.submitScore(data);
                    }
                }
        }
    },

    pauseGame:function()
    { 
        this.pauseBtn.destroy(true,false);
        this.pauseBtn = null;
        
        this.shuffleBtn.destroy(true,false);
        this.shuffleBtn = null;
        
        this.coinBtn.destroy(true,false);
        this.coinBtn = null;
        
        this.rn1.inputEnabled = false;this.rn2.inputEnabled = false;this.rn3.inputEnabled = false;
        
        this.pauseGroup = this.add.group();
        var pauseBG = this.add.graphics( 0, 0 );
        pauseBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 0.85);
        pauseBG.drawRect(0, 0, this.world.width, this.world.height);
        this.pauseGroup.add(pauseBG);
        
        var bigPlayBtn = this.add.button(this.world.centerX,0,'bigPlayBtn',this.resumeGame,this,0,0,1,0);
        bigPlayBtn.y = this.world.centerY - bigPlayBtn.height;
        bigPlayBtn.anchor.setTo(0.5,0.5);
        bigPlayBtn.setDownSound(this.buttonSound);
        this.pauseGroup.add(bigPlayBtn);
        
        var resetBtn = this.add.button(this.world.centerX+this.world.centerX/1.5,0,'resetBtn',this.resetGame,this,0,0,1,0);
        resetBtn.y = this.world.centerY + bigPlayBtn.height;
        resetBtn.anchor.setTo(0.5,0.5);
        resetBtn.setDownSound(this.buttonSound);
        this.pauseGroup.add(resetBtn);
        
        var bigSettingsBtn = this.add.button(this.world.centerX,0,'bigSettingsBtn',this.inGameSettings,this,0,0,1,0);
        bigSettingsBtn.y = this.world.centerY + bigPlayBtn.height;
        bigSettingsBtn.anchor.setTo(0.5,0.5);
        bigSettingsBtn.setDownSound(this.buttonSound);
        this.pauseGroup.add(bigSettingsBtn);
        
        var home = this.add.button(this.world.centerX-this.world.centerX/1.5,0,'home',this.gotoHome,this,0,0,1,0);
        home.y = this.world.centerY + bigPlayBtn.height;
        home.anchor.setTo(0.5,0.5);
        home.setDownSound(this.buttonSound);
        this.pauseGroup.add(home);
        
        var helpBtn = this.add.button(this.world.centerX,0,'helpBtn',this.createHelp,this,0,0,1,0);
        helpBtn.y = this.world.height - helpBtn.height * 1.5;
        helpBtn.anchor.setTo(0.5,0.5);
        helpBtn.setDownSound(this.buttonSound);
        this.pauseGroup.add(helpBtn);
    },
    
    gotoHome:function(home)
    {
        document.removeEventListener("backbutton", this.backButtonPressed, false);
        
        if(this.gameOver)
            {
                this.resetGame();
            }
        if(home)
            home.destroy(true,false);
        this.digitArray = null;
        this.state.start('Menu');
    },
    
    shareGame:function(btn)
    {
        
        btn.destroy(true,false);
        btn = null;
        
        try{
        createReportCard(this.points,this.theme);
        }
        catch(e)
            {
                alert(e);
            }
                
                //this.resetGame();
    },
    
    createHelp:function()
    {
        if(this.pauseGroup)
            this.pauseGroup.destroy(true,false);
        this.pauseGroup = null;
        
        this.helpGroup = this.add.group();
        
        var settingsBG = this.add.graphics( 0, 0 );
        settingsBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 0.85);
        settingsBG.drawRect(0, 0, this.world.width, this.world.height);
        this.helpGroup.add(settingsBG);
        
        var hSprite = this.helpGroup.create(this.world.centerX,this.world.centerY,"help");
        hSprite.anchor.setTo(0.5,0.5);
        
        var dSprite = this.helpGroup.create(this.world.centerX,this.world.centerY/2,"dots");
        dSprite.y = (hSprite.y - hSprite.height/2)/2;
        dSprite.anchor.setTo(0.5,0.5);
        
        settingsBG.inputEnabled = true;
        settingsBG.events.onInputUp.add(this.changeHelpSprite,this);
        
        /*var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = 7*this.world.height/8 + applyBtn.height/2;
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.setDownSound(this.buttonSound);
        this.helpGroup.add(applyBtn);*/
    },
    
    changeHelpSprite:function()
    {
      
        if(this.helpGroup.children[1].frame == 4)
            {
                this.resumeGame();
            }
        else
            {
                this.helpGroup.children[1].frame += 1;
                this.helpGroup.children[2].frame += 1;

                this.helpGroup.children[0].events.onInputUp.remove(this.changeHelpSprite,this);

                var reAdd = this.time.create();
                reAdd.add(Phaser.Timer.SECOND * 0.3,this.reAddEvents,this);
                reAdd.start();
            }
    },
    
    reAddEvents:function()
    {
        if(this.helpGroup)
            this.helpGroup.children[0].events.onInputUp.add(this.changeHelpSprite,this);
    },
    
    resetGame:function()
    {
        if(this.pauseGroup)
            {
                this.pauseGroup.destroy(true,false);
                this.pauseGroup = null;
            }
        else if(this.gameOverGroup)
            {
                this.gameOverGroup.destroy(true,false);
                this.gameOverGroup = null;
            }
        
        for(var i = 0;i<16;i++)
            {
                Game5x.saveObject[this.modeString][this.typeString].grid[i] = 0;
            }
        
        Game5x.saveObject[this.modeString][this.typeString].rn1 = 0;
        Game5x.saveObject[this.modeString][this.typeString].rn2 = 0;
        Game5x.saveObject[this.modeString][this.typeString].rn3 = 0;
        
        Game5x.saveObject[this.modeString][this.typeString].currentScore = 0;
        
        Game5x.saveObject[this.modeString][this.typeString].reset = true;
        
        NativeStorage.setItem('saves', JSON.stringify(Game5x.saveObject));
        
        //if(Game5x.saveObject.showAd)
            //Appodeal.show(Appodeal.INTERSTITIAL);
        
        this.dumpAll();
        this.init();
        this.createGame();
    },
    
    inGameSettings:function()
    {
        this.pauseGroup.destroy(true,false);
        this.pauseGroup = null;
        
        this.newMode = Game5x.saveObject.currentMode;
        this.newGameType = Game5x.saveObject.currentGameType;
        
        this.settingsGroup = this.add.group();
        var settingsBG = this.add.graphics( 0, 0 );
        settingsBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 0.85);
        settingsBG.drawRect(0, 0, this.world.width, this.world.height);
        this.settingsGroup.add(settingsBG);
        
        var _1xBtn = this.add.button(this.world.width/4,this.world.centerY/2,'1xBtn',this.changeMode,this);
        _1xBtn.anchor.setTo(0.5,0.5);
        _1xBtn.frame = this.mode == 1?1:2;
        _1xBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(_1xBtn);
        var _2xBtn = this.add.button(this.world.width/2,this.world.centerY/2,'2xBtn',this.changeMode,this);
        _2xBtn.anchor.setTo(0.5,0.5);
        _2xBtn.frame = this.mode == 2?1:2;
        _2xBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(_2xBtn);
        var _4xBtn = this.add.button(3*this.world.width/4,this.world.centerY/2,'4xBtn',this.changeMode,this);
        _4xBtn.anchor.setTo(0.5,0.5);
        _4xBtn.frame = this.mode == 4?1:2;
        _4xBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(_4xBtn);
        
        var firstDiv = this.add.graphics( 0, 0 );
        firstDiv.beginFill(0x3299BB,1);
        firstDiv.drawRect(0 , 3*this.world.height/8, this.world.width, Math.floor(this.world.height/200));
        this.settingsGroup.add(firstDiv);
        
        var pppmBtn = this.add.button(0,this.world.centerY,'pppmBtn',this.changeGameType,this);
        pppmBtn.frame = this.gameType == 2?1:2;
        pppmBtn.x = this.world.centerX + pppmBtn.width/2;
        pppmBtn.anchor.setTo(0.5,0.5);
        pppmBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(pppmBtn);
        var pmBtn = this.add.button(0,this.world.centerY,'pmBtn',this.changeGameType,this);
        pmBtn.frame = this.gameType == 1?1:2;
        pmBtn.x = this.world.centerX - pppmBtn.width/2;
        pmBtn.anchor.setTo(0.5,0.5);
        pmBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(pmBtn);
         
        var secondDiv = this.add.graphics( 0, 0 );
        secondDiv.beginFill(0x3299BB,1);
        secondDiv.drawRect(0 , 5*this.world.height/8, this.world.width, Math.floor(this.world.height/200));
        this.settingsGroup.add(secondDiv);
        
        var audioOnBtn = this.add.button(0,3*this.world.centerY/2,'audioOnBtn',this.audioOn,this);
        audioOnBtn.frame = this.game.sound.mute?0:1;
        audioOnBtn.x = this.world.centerX - this.world.centerX/2;
        audioOnBtn.anchor.setTo(0.5,0.5);
        audioOnBtn.setDownSound(this.buttonSound);
        this.settingsGroup.add(audioOnBtn);
        var audioOffBtn = this.add.button(0,3*this.world.centerY/2,'audioOffBtn',this.audioOff,this);
        audioOffBtn.frame = !this.game.sound.mute?0:1;
        audioOffBtn.x = this.world.centerX + this.world.centerX/2;
        audioOffBtn.anchor.setTo(0.5,0.5);
        this.settingsGroup.add(audioOffBtn);
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = 7*this.world.height/8 + applyBtn.height/2;
        applyBtn.anchor.setTo(0.5,0.5);
        this.settingsGroup.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
    },
        
    audioOff:function()
    {
        this.game.sound.mute = true;
        this.settingsGroup.children[8].frame = 0;
        this.settingsGroup.children[9].frame = 1;  
    },
    
    audioOn:function()
    {
        this.game.sound.mute = false;
        this.settingsGroup.children[8].frame = 1;
        this.settingsGroup.children[9].frame = 0;  
    },
    
    changeMode:function(btn)
    {
        if(btn.frame == 1) return;
        
        this.settingsGroup.children[1].frame = 0;
        this.settingsGroup.children[2].frame = 0;
        this.settingsGroup.children[3].frame = 0;
        
        if(btn.key == "1xBtn")
            {
                this.newMode = 1;
            }
        else if(btn.key == "2xBtn")
            {
                this.newMode = 2;
            }
        else
            {
                this.newMode = 4;
            }
        
        btn.frame = 1;
    },
    
    changeGameType:function(btn)
    {
        if(btn.frame == 1) return;
        
        this.settingsGroup.children[5].frame = 0;
        this.settingsGroup.children[6].frame = 0;
        
        if(btn.key == "pmBtn")
            {
                this.newGameType = 1;
            }
        else
            {
                this.newGameType = 2;
            }
        
        btn.frame = 1;
    },
    
    resumeGame:function()
    {
        if(this.settingsGroup)
            {
                this.settingsGroup.destroy(true,false);
                this.settingsGroup = null;
                
                if(this.newGameType != Game5x.saveObject.currentGameType || this.newMode != Game5x.saveObject.currentMode)
                    {
                        Game5x.saveObject.currentMode = this.newMode; Game5x.saveObject.currentGameType = this.newGameType;
                        
                        //if(Game5x.saveObject.showAd)
                            //Appodeal.show(Appodeal.INTERSTITIAL);
                        
                            if(Game5x.saveObject.showAd && AdMob)
                            {
                                console.log("showing ad in settings apply");
                                AdMob.showInterstitial();
                                this.cacheInterstitial();
                            }
                            
                        this.dumpAll();
                        this.init();
                        this.createGame();
                    }
            }
        else if(this.pauseGroup)
            {
                this.pauseGroup.destroy(true,false);
                this.pauseGroup = null;
            }
        else if(this.helpGroup)
            {
                this.helpGroup.destroy(true,false);
                this.helpGroup = null;
            }
        else if(this.buyGroup)
            {
                this.buyGroup.destroy(true,false);
                this.buyGroup = null;
            }
        
        else if(this.freeCoinMenu)
            {
                this.freeCoinMenu.destroy(true,false);
                this.freeCoinMenu = null;
            }
        
        this.rn1.inputEnabled = true;this.rn2.inputEnabled = true;this.rn3.inputEnabled = true;
        
        this.pauseBtn = this.add.button(0,0,'pauseBtn',this.pauseGame,this,0,0,1,0);
        this.pauseBtn.anchor.setTo(0.5,0.5);
        this.pauseBtn.x = this.gridArray[0].sprite.x + this.pauseBtn.width/2;
        this.pauseBtn.y = this.gridArray[0].sprite.y - this.pauseBtn.height*0.625;
        this.pauseBtn.setDownSound(this.buttonSound);
        
        this.shuffleBtn = this.add.button(0,0,"shuffleBtn",this.sendBackNumbers,this,0,0,1,0);
        this.shuffleBtn.x = this.shuffleBtn.width/2;
        this.shuffleBtn.y = this.bottomMiddleY;
        this.shuffleBtn.anchor.setTo(0.5,0.5);
        
        if(Game5x.saveObject.doubleCoin)
            this.coinBtn = this.add.button(0,0,"coin2xBtn",this.buyMenu,this,0,0,1,0);
        else
            this.coinBtn = this.add.button(0,0,"coinBtn",this.buyMenu,this,0,0,1,0);
        this.coinBtn.x = this.world.width - this.coinBtn.width/2;
        this.coinBtn.y = this.bottomMiddleY;
        this.coinBtn.anchor.setTo(0.5,0.5);
    },
    
    sendBackNumbers:function()
    {
        if(Game5x.saveObject.coins < 20)
            {
                this.buyMenu();
            }
        else
            {
                this.shuffleBtn.onInputUp.remove(this.sendBackNumbers,this);

                //this.rn1.dontShuffle = !this.rn1.visible;
                //this.rn2.dontShuffle = !this.rn2.visible;
                //this.rn3.dontShuffle = !this.rn3.visible;

                this.add.tween(this.rn1).to( { alpha: 0,y: this.world.height }, 200, Phaser.Easing.Linear.None, true);
                this.add.tween(this.rn2).to( { alpha: 0,y: this.world.height }, 300, Phaser.Easing.Linear.None, true);
                this.add.tween(this.rn3).to( { alpha: 0,y: this.world.height }, 400, Phaser.Easing.Linear.None, true).onComplete.add(function () {    this.generateNumbers(); this.shuffleBtn.onInputUp.add(this.sendBackNumbers,this);  }, this);
                
                Game5x.saveObject.coins -= 20;
                this.performSave();
                this.updateDigits();
            }

    },
    
    generateNumbers:function()
    {
        
        if(Game5x.saveObject.showAd && AdMob)
            {
                var addRno = Math.random();
                if(addRno < 0.05)
                    {
                        console.log("showing ad in generate number");
                        AdMob.showInterstitial();
                        this.cacheInterstitial();
                    }
            }
        
        
        var savedNumber;
        var setDiff = false;
        var rNo = Math.random();
        for(var i = 1;i<=3;i++)
        {
            if(!this["rn"+i])
                {
                    this["rn"+i] = this.add.sprite(this.world.centerX + (this.gap*(i-2)), this.bottomMiddleY,String(this.mode)+'xstrip');
                    this["rn"+i].anchor.setTo(0.5,0.5);
                    this["rn"+i].scale.setTo(globalScale,globalScale);
                    
                    savedNumber = Game5x.saveObject[this.modeString][this.typeString]["rn"+i];
                    
                    if(savedNumber!=0)
                        {
                            this["rn"+i].frame = (savedNumber/this.mode)-1;
                        }
                    else if(Game5x.saveObject[this.modeString][this.typeString].reset)
                        {
                            this["rn"+i].frame = Math.round(Math.random()*(100/this.mode));
                            Game5x.saveObject[this.modeString][this.typeString]["rn"+i] = (this["rn"+i].frame+1) * this.mode;
                        }
                    else
                        {
                            this["rn"+i].visible = false;
                        }
                    
                    this["rn"+i].dontShuffle = false;
                    this["rn"+i].inputEnabled = true;
                    this["rn"+i].input.enableDrag();
                    this["rn"+i].events.onDragStart.add(this.startDrag,this);
                    this["rn"+i].events.onDragStop.add(this.stopDrag,this);
                    this["rn"+i].events.onDragUpdate.add(this.dragUpdate,this);
                    
                }
            else
                {
                    if(!this["rn"+i].dontShuffle)
                        {
                            if(this.mode == 4 && rNo < 0.25 && !this.diffNumberOnBoard(i))
                                {
                                    this["rn"+i].frame = 21 + i;
                                    Game5x.saveObject[this.modeString][this.typeString]["rn"+i] = 88 + (i*4); 
                                }
                            else if(this.mode == 4)
                                {
                                    this["rn"+i].frame = Math.round(Math.random()*21);
                                    Game5x.saveObject[this.modeString][this.typeString]["rn"+i] = (this["rn"+i].frame+1) * this.mode; 
                                }
                            else
                                {
                                    this["rn"+i].frame = Math.round(Math.random()*(100/this.mode));
                                    Game5x.saveObject[this.modeString][this.typeString]["rn"+i] = (this["rn"+i].frame+1) * this.mode; 
                                }
                            
                            this["rn"+i].visible = true;
                        }
                }
            
            this["rn"+i].y = this.bottomMiddleY;
            this["rn"+i].inputEnabled = this["rn"+i].visible;
            this["rn"+i].alpha = 1;
            
            if(this["rn"+i].visible && !Game5x.saveObject.firstRun) this.add.tween(this["rn"+i]).from( { alpha: 1, y: this.world.height }, 300 + (i*200), Phaser.Easing.Linear.None, true).onComplete.add(function () {    this.generateNumbersSound.play();   }, this);
            
        }
        
        Game5x.saveObject[this.modeString][this.typeString].reset = false;
        
        
        /*if(!this.rn1)
            {
                this.rn1 = this.add.sprite(this.world.centerX-this.gap, this.bottomMiddleY,String(this.mode)+'xstrip');
                this.rn2 = this.add.sprite(this.world.centerX, this.bottomMiddleY,String(this.mode)+'xstrip');
                this.rn3 = this.add.sprite(this.world.centerX+this.gap, this.bottomMiddleY,String(this.mode)+'xstrip');

                this.rn1.anchor.setTo(0.5,0.5);this.rn2.anchor.setTo(0.5,0.5);this.rn3.anchor.setTo(0.5,0.5);
                
                if(Game5x.saveObject[this.modeString][this.typeString].rn1 === 0 && Game5x.saveObject[this.modeString][this.typeString].rn2 === 0 && Game5x.saveObject[this.modeString][this.typeString].rn3 === 0)
                    {
                        this.rn1.frame = Math.round(Math.random()*(100/this.mode));
                        this.rn2.frame = Math.round(Math.random()*(100/this.mode));
                        this.rn3.frame = Math.round(Math.random()*(100/this.mode));
                        
                        Game5x.saveObject[this.modeString][this.typeString].rn1 = (this.rn1.frame+1) * this.mode;
                        Game5x.saveObject[this.modeString][this.typeString].rn2 = (this.rn2.frame+1) * this.mode;
                        Game5x.saveObject[this.modeString][this.typeString].rn3 = (this.rn3.frame+1) * this.mode;
                    }
                else
                    {
                        this.rn1.frame = (Game5x.saveObject[this.modeString][this.typeString].rn1/this.mode)-1;
                        this.rn2.frame = (Game5x.saveObject[this.modeString][this.typeString].rn2/this.mode)-1;
                        this.rn3.frame = (Game5x.saveObject[this.modeString][this.typeString].rn3/this.mode)-1;
                     }

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
                this.rn1.frame = this.rn1.dontShuffle?undefined:Math.round(Math.random()*(100/this.mode));
                this.rn2.frame = this.rn2.dontShuffle?undefined:Math.round(Math.random()*(100/this.mode));
                this.rn3.frame = this.rn3.dontShuffle?undefined:Math.round(Math.random()*(100/this.mode));
                
                Game5x.saveObject[this.modeString][this.typeString].rn1 = this.rn1.frame?(this.rn1.frame+1) * this.mode:0;
                Game5x.saveObject[this.modeString][this.typeString].rn2 = this.rn2.frame?(this.rn2.frame+1) * this.mode:0;
                Game5x.saveObject[this.modeString][this.typeString].rn3 = this.rn3.frame?(this.rn3.frame+1) * this.mode:0;
            }
        
        this.rn1.y = this.rn2.y = this.rn3.y = this.bottomMiddleY;
        
        if(!this.rn1.visible && !this.rn2.visible && !this.rn3.visible)
        {
            this.rn1.dontShuffle = false;this.rn2.dontShuffle = false;this.rn3.dontShuffle = false;
        }
        
        this.rn1.visible = this.rn1.frame != undefined;    this.rn1.alpha = 1;
        this.rn2.visible = this.rn2.frame != undefined;    this.rn2.alpha = 1;
        this.rn3.visible = this.rn3.frame != undefined;    this.rn3.alpha = 1;
        
        this.rn1.inputEnabled = true;this.rn2.inputEnabled = true;this.rn3.inputEnabled = true;
        
        if(this.rn1.visible) this.add.tween(this.rn1).from( { alpha: 1, y: this.game.height }, 500, Phaser.Easing.Linear.None, true).onComplete.add(function () {    this.generateNumbersSound.play();   }, this);
        if(this.rn2.visible) this.add.tween(this.rn2).from( { alpha: 1, y: this.game.height }, 700, Phaser.Easing.Linear.None, true).onComplete.add(function () {    this.generateNumbersSound.play();   }, this);
        if(this.rn3.visible) this.add.tween(this.rn3).from( { alpha: 1, y: this.game.height }, 900, Phaser.Easing.Linear.None, true).onComplete.add(function () {    this.generateNumbersSound.play();   }, this);
        */
    },
    
    diffNumberOnBoard:function(i)
    {
        var num = 88 + (i*4);
      for(var i = 0;i<16;i++)
            {
                if(this.gridArray[i].value == num)
                    return true;
            }
        return false;
    },
    
    startDrag:function(rnSprite)
    {
        rnSprite.defaultX = rnSprite.x;
        rnSprite.defaultY = this.bottomMiddleY;
        
        this.pickNumberSound.play();
        
        rnSprite.bringToTop(); 
        rnSprite.scale.x = rnSprite.scale.y = globalScale+0.1;
        
        //rnSprite.anchor.setTo(0.5,1.5);
    },
    
    dragUpdate:function(rnSprite, pointer, dragX, dragY, snapPoint) 
    {
        rnSprite.y = dragY - rnSprite.height;
    },
    
    stopDrag:function(rnSprite)
    {
        rnSprite.anchor.setTo(0.5,0.5);
        
        var rnX = rnSprite.x;
        var rnY = rnSprite.y;
        
        var gridObj;
        var gapDiffBy2 = ((this.gap-rnSprite.width)/2);
        var snapped = false;
        for(var i = 0;i<16;i++)
            {
                gridObj = this.gridArray[i];
                
                if(rnX >= (gridObj.x - gapDiffBy2) && rnX < (gridObj.x + gapDiffBy2 + rnSprite.width))
                    {
                        if(rnY >= (gridObj.y - gapDiffBy2) && rnY < (gridObj.y + gapDiffBy2 + rnSprite.height))
                            {
                                rnSprite.scale.x = rnSprite.scale.y = globalScale;
                                rnSprite.x = gridObj.x + rnSprite.width/2; rnSprite.y = gridObj.y + rnSprite.height/2;
                                
                                rnSprite.snappedIndex = gridObj.index;
                                
                                this.tweenToAdd(gridObj,rnSprite);
                                snapped = true;
                            }
                    }
            }
        
        if(!snapped)
            {
                rnSprite.scale.x = rnSprite.scale.y = globalScale;
                rnSprite.x = rnSprite.defaultX; rnSprite.y = rnSprite.defaultY;
            }
        
        
        this.addNumbersSound.play();
    },
    
    tweenToAdd:function(gridObj,rnSprite)
    {
        if(this.tutSprite != null) this.currentTutAnim++;
        
        var randomNumber = (rnSprite.frame + 1) * this.mode;
        
        if(gridObj.value + randomNumber <= 100)
            {
                rnSprite.inputEnabled = false;
                
                if(gridObj.value === 0)
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
                rnSprite.scale.x = rnSprite.scale.y = globalScale;
                rnSprite.x = rnSprite.defaultX; rnSprite.y = rnSprite.defaultY;
            }
    },
    
    onAddTweenComplete:function(rnSprite)
    {
        this.justSubtracted = false;
        
        var index = rnSprite.snappedIndex;
        
        if(this.gameType == 1)
            {
                this.minusCheck(index,this.gridArray[index].value);
                this.performMinus();
                this.deleteGridSp = [];
            }
        else
            {
                if(this.allSnapedNumbers.indexOf(index)==-1)
                    this.allSnapedNumbers.push(index);
            }
        
        rnSprite.x = rnSprite.defaultX; rnSprite.y = rnSprite.defaultY;
        rnSprite.visible = false;
        
        if(!this.rn1.visible && !this.rn2.visible && !this.rn3.visible)
        {
            this.onTurnEnd();
        }
        
        this.checkForGameOver();
        this.performSave();
        
    },
    
    onTurnEnd:function()
    {
        if(this.gameType == 2)
            {
                while(this.allSnapedNumbers.length > 0)
                    {
                        index = this.allSnapedNumbers.pop();
                        this.minusCheck(index,this.gridArray[index].value);
                    }

                this.performMinus();
                this.deleteGridSp = [];
            }
        
        this.rn1.dontShuffle = false;this.rn2.dontShuffle = false;this.rn3.dontShuffle = false;
        this.generateNumbers();
    },
    
    minusCheck:function(index,value)
    {
        var gridObj = this.gridArray[index];
        var delCurrent = false;
        
        if(index !==0 && this.gridArray[index-1].value === value && index%4 != 0)
		{
			delCurrent = true;
            
            if(this.deleteGridSp.indexOf(index-1)==-1)
			     this.deleteGridSp.push(index-1);	
		}
		if(index!=15 && this.gridArray[index+1].value == value && (index+1)%4 != 0)
		{
			delCurrent = true;
            
            if(this.deleteGridSp.indexOf(index+1)==-1)
			     this.deleteGridSp.push(index+1);	
		}
		if(index-4>=0 && this.gridArray[index-4].value == value)
		{
			delCurrent = true;
            
            if(this.deleteGridSp.indexOf(index-4)==-1)
			     this.deleteGridSp.push(index-4);	
		}
		if(index+4 < 16 && this.gridArray[index+4].value == value)
		{
			delCurrent = true;
            
            if(this.deleteGridSp.indexOf(index+4)==-1)
			     this.deleteGridSp.push(index+4);	
        }
        
        if(delCurrent)
        {
            if(this.deleteGridSp.indexOf(index)==-1)
                this.deleteGridSp.push(index);
        }
    },
    
    performMinus:function()
    {
        if(this.deleteGridSp.length === 0) return;
        
        var index;
        var tempSp;
        
        var earnedCoin = false;
        for(var j = 0;j<this.deleteGridSp.length;j++)
            {
                index = this.deleteGridSp[j];
                var count = this.countMatches(index,this.gridArray[index].value);
                if(count >= 3)
                {
                    if(Game5x.saveObject.doubleCoin)
                        Game5x.saveObject.coins+=2;
                    else
                        Game5x.saveObject.coins++;
                    
                    var unlockStr = "";
                    if(count == 4)  unlockStr = _match4AchivemenID;
                    else if(count == 5)  unlockStr = _match5AchivemenID;
                    
                    var data = {
                        achievementId: unlockStr
                    };
                    if(unlockStr != "")
                    window.plugins.playGamesServices.unlockAchievement(data);
                    
                }
                earnedCoin = count >= 3;
            }
        for(var i = 0;i<this.deleteGridSp.length;i++)
            {
                index = this.deleteGridSp[i];
                
                tempSp = this.add.sprite(this.gridArray[index].sprite.x,this.gridArray[index].sprite.y,String(this.mode)+'xstrip');
                tempSp.frame = this.gridArray[index].sprite.frame;
                
                this.add.tween(tempSp).to( { alpha: 0 }, 300, Phaser.Easing.Linear.None, true).onComplete.add( function(tSprite) { tSprite.kill();});
                
                this.points += this.gridArray[index].value;
                this.updateDigits();
                this.gridArray[index].sprite.loadTexture('gridBG');
                this.gridArray[index].value = 0;
            }
        
        this.justSubtracted = true;
        
        if(!earnedCoin)
            this.minusNumbersSound.play();
        else{
            this.purchasedSound.play();

            var coinStr = "coinBtn";
            if(Game5x.saveObject.doubleCoin)
                coinStr = "coin2xBtn";
                
            var heartIcon = this.add.sprite(0,0,coinStr);
            heartIcon.anchor.setTo(0.5,0.5);
            heartIcon.scale.setTo(5,5);
            heartIcon.x = this.world.centerX;
            heartIcon.y = this.world.centerY;

            this.add.tween(heartIcon).to( { alpha: 1,x:this.coinBtn.x,y:this.coinBtn.y }, 1000, Phaser.Easing.Linear.EaseOut, true).onComplete.add( function(tSprite) { tSprite.destroy();});  ;
            this.add.tween(heartIcon.scale).to( { x:1,y:1 }, 1000, Phaser.Easing.Linear.EaseOut, true);     
            
        }
        
        if(Game5x.saveObject.showAd && AdMob)
        {
            var addRno = Math.random();
            if(addRno < 0.1)
                {
                    console.log("showing ad in number minus");
                    AdMob.showInterstitial();
                    this.cacheInterstitial();
                }
        }
        
        
    },
    
    countMatches:function(index,value)
    {
        var matchCount = 0;
        
        if(index !=0 && this.gridArray[index-1].value == value && index%4 != 0)
		{
            matchCount++;
		}
		if(index!=15 && this.gridArray[index+1].value == value && (index+1)%4 != 0)
		{
            matchCount++;
		}
		if(index-4>0 && this.gridArray[index-4].value == value)
		{
            matchCount++;
		}
		if(index+4 < 16 && this.gridArray[index+4].value == value)
		{
            matchCount++;
        }
        
        if(matchCount>0) matchCount++;
        
        return matchCount;
    },
    
    buyMenu:function()
    {
        
        this.rn1.inputEnabled = false;this.rn2.inputEnabled = false;this.rn3.inputEnabled = false;
        
        this.pauseBtn.destroy(true,false);
        this.pauseBtn = null;
        
        this.shuffleBtn.destroy(true,false);
        this.shuffleBtn = null;
        
        this.coinBtn.destroy(true,false);
        this.coinBtn = null;
        
        this.buyGroup = this.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        this.buyGroup.add(buyBG);
        
        var div;
        var btnBG;
        var purchaseDetail;
        var purchasePrice;
        for(var i=0;i<6;i++)
            {
                div = this.add.graphics( 0, 0 );
                div.beginFill(0x3299BB,1);
                div.drawRect(0 , 0, this.world.width, Math.floor(this.world.height/200));
                div.y = (this.world.height/7)*(i+1) + this.world.height/18;
                this.buyGroup.add(div);
                
                btnBG = this.add.graphics( 0, 0 );
                btnBG.index = i;
                btnBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1],1);
                btnBG.drawRect(0 , 0, this.world.width, this.world.height/7.5);
                btnBG.y = div.y-btnBG.height;
                this.buyGroup.add(btnBG);
                
                if(i==0 && !Game5x.saveObject.showAd)           continue;
                else if(i==1 && Game5x.saveObject.doubleCoin)   continue;
                
                purchaseDetail = this.add.button( 0, 0,"purchaseDetails",this.startPurchase,this);
                purchaseDetail.index = i;
                purchaseDetail.anchor.setTo(0.5,0.5);
                purchaseDetail.frame = i;
                purchaseDetail.x = purchaseDetail.width/2 + this.world.width/20;
                purchaseDetail.y = (div.y+((div.y-this.world.height/7)))/2;
                this.buyGroup.add(purchaseDetail);
                
                purchasePrice = this.add.button( 0, 0,"purchasePrice",this.startPurchase,this );
                purchasePrice.index = i;
                purchasePrice.frame = i<3?0:i-2;
                purchasePrice.anchor.setTo(0.5,0.5);
                purchasePrice.x = this.world.width - purchasePrice.width/2 - this.world.width/20;
                purchasePrice.y = purchaseDetail.y;
                this.buyGroup.add(purchasePrice);
                
                if(i==5) div.visible = false;
            }
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'closeBtn',this.resumeGame,this,1,1,0,1);
        applyBtn.y = this.world.height - applyBtn.height/2;
        applyBtn.anchor.setTo(0.5,0.5);
        this.buyGroup.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
        
        this.showFreeCoins();
        
        //if(Math.random() > 0.3)
            //this.showFreeCoins();
    },
     
    startPurchase:function(btn)
    {
        if(this.buyGroup)
            {
                this.buyGroup.destroy(true,false);
                this.buyGroup = null;
                
                this.resumeGame();
            }
            
        purchaseIndex = btn.index;
        
        switch(btn.index)
            {
                case 0: productAlias = "remove ads";    break;
                case 1: productAlias = "2x coins";      break;
                case 2: productAlias = "150 coins";     break;
                case 3: productAlias = "350 coins";     break;
                case 4: productAlias = "700 coins";     break;
                case 5: productAlias = "1000 coins";    break;
            }
        
        store.ready(function() {orderProduct(productAlias)});
    },

    showFreeCoins:function()
    {
        this.freeCoinMenu = this.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        this.freeCoinMenu.add(buyBG);

        var freeCoins = this.add.sprite( 0, 0,"freeCoins" );
        freeCoins.anchor.setTo(0.5,0.5);
        freeCoins.x = this.world.centerX;
        freeCoins.y = this.world.centerY;
        this.freeCoinMenu.add(freeCoins);

        var watchVideo = this.add.button( 0, 0,"watchVideo",this.startRewardVideo,this );
        watchVideo.anchor.setTo(0.5,0.5);
        watchVideo.x = this.world.centerX;
        watchVideo.y = this.world.centerY + freeCoins.height/2 - watchVideo.height/1.5;
        this.freeCoinMenu.add(watchVideo);

        var closeBtn = this.add.button( 0, 0,"closeBtn",this.closeReward,this,0,0,1,0);
        closeBtn.anchor.setTo(0.5,0.5);
        closeBtn.x = freeCoins.x + freeCoins.width/2 - closeBtn.width/1.5;
        closeBtn.y = this.world.centerY - freeCoins.height/2 + closeBtn.height/1.5;
        this.freeCoinMenu.add(closeBtn);
        
    },

    startRewardVideo:function()
    {
        if(this.freeCoinMenu)
            {
                this.freeCoinMenu.destroy(true,false);
                this.freeCoinMenu = null;
            }
        
        this.resumeGame();
        universalThis = this;
        AdMob.showRewardVideoAd();
        AdMob.prepareRewardVideoAd( {adId:admob_reward, autoShow:false} );
        //Appodeal.enableRewardedVideoCallbacks(true);
        //Appodeal.show(Appodeal.REWARDED_VIDEO);
    },
    
    closeReward:function()
    {
        this.freeCoinMenu.destroy(true,false);
        this.freeCoinMenu = null;
    },
    
    successRewardAd:function(result)
    {
        tempInstance.freeCoinMenu = tempInstance.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        tempInstance.freeCoinMenu.add(buyBG);

        var successSymbol = this.add.sprite( 0, 0,"successSymbol" );
        successSymbol.anchor.setTo(0.5,0.5);
        successSymbol.x = tempInstance.world.centerX;
        successSymbol.y = tempInstance.world.centerY;
        tempInstance.freeCoinMenu.add(successSymbol);

        var applyBtn = this.add.button( 0, 0,"applyBtn",tempInstance.closeReward,tempInstance );
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.x = tempInstance.world.centerX;
        applyBtn.y = tempInstance.world.centerY + successSymbol.height/2 - applyBtn.height/1.5;
        tempInstance.freeCoinMenu.add(applyBtn);
        
        Game5x.saveObject.coins += 10;
        this.updateDigits();
        this.performSave();
    },
    
    errorRewardAd:function(result)
    {
        tempInstance.freeCoinMenu = tempInstance.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        tempInstance.freeCoinMenu.add(buyBG);

        var failedSymbol = this.add.sprite( 0, 0,"failedSymbol" );
        failedSymbol.anchor.setTo(0.5,0.5);
        failedSymbol.x = tempInstance.world.centerX;
        failedSymbol.y = tempInstance.world.centerY;
        tempInstance.freeCoinMenu.add(failedSymbol);

        var applyBtn = this.add.button( 0, 0,"applyBtn",tempInstance.closeReward,tempInstance );
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.x = tempInstance.world.centerX;
        applyBtn.y = tempInstance.world.centerY + failedSymbol.height/2 - applyBtn.height/1.5;
        tempInstance.freeCoinMenu.add(applyBtn);
    },
   
    performSave:function()
    {
        for(var i = 0;i<16;i++)
            {
                Game5x.saveObject[this.modeString][this.typeString].grid[i] = this.gridArray[i].value;
            }
        
        var n1 = this.rn1.visible?(this.rn1.frame+1) * this.mode:0;
        var n2 = this.rn2.visible?(this.rn2.frame+1) * this.mode:0;
        var n3 = this.rn3.visible?(this.rn3.frame+1) * this.mode:0;
        
        Game5x.saveObject[this.modeString][this.typeString].rn1 = n1;
        Game5x.saveObject[this.modeString][this.typeString].rn2 = n2;
        Game5x.saveObject[this.modeString][this.typeString].rn3 = n3;
        
        Game5x.saveObject.firstRun = false;
        Game5x.saveObject[this.modeString][this.typeString].currentScore = this.points;
        Game5x.saveObject.sound = !this.game.sound.mute;
        
        NativeStorage.setItem('saves', JSON.stringify(Game5x.saveObject));
    },
    
    dumpAll:function()
    {
        for(var i = 0;i<16;i++)
            {
                this.gridArray[i].sprite.kill();
            }
        this.rn1.kill(); this.rn1 = null;
        this.rn2.kill(); this.rn2 = null;
        this.rn3.kill(); this.rn3 = null;
    },
    
    updateDigits:function()
    {
        if(this.points >= Game5x.saveObject[this.modeString][this.typeString].hiScore)
            {
                Game5x.saveObject[this.modeString][this.typeString].hiScore = this.points;
            }
        
        var unlockStr = "";
        if(Game5x.saveObject[this.modeString][this.typeString].hiScore >= 100000)       unlockStr = _100kAchivemenID;
        else if(Game5x.saveObject[this.modeString][this.typeString].hiScore >= 10000)   unlockStr = _10kAchivemenID;
        else if(Game5x.saveObject[this.modeString][this.typeString].hiScore >= 1000)    unlockStr = _1kAchivemenID;
        
        var data = {
            achievementId: unlockStr
        };
        if(unlockStr != "")
        window.plugins.playGamesServices.unlockAchievement(data);

        var hiString = Game5x.saveObject[this.modeString][this.typeString].hiScore.toString();
        var numberString = this.points.toString();
        var coinString = Game5x.saveObject.coins.toString();
        
        for(var i = 0; i < numberString.length; i++)
            {
                this.digitArray[i].visible = true;
                this.digitArray[i].frame = parseInt(numberString.charAt(numberString.length-1-i));
            }
        while(i<10)
            {
                this.digitArray[i].visible = false;
                i++;
            }
        
        for(var j = 0; j < hiString.length; j++)
            {
                this.hiDigitArray[j].visible = true;
                this.hiDigitArray[j].frame = parseInt(hiString.charAt(hiString.length-1-j));
            }
        this.medalSprite.x = this.hiDigitArray[j-1].x - this.medalSprite.width*1.5;
        while(j<10)
            {
                this.hiDigitArray[j].visible = false;
                j++;
            }
        
        for(var k = 0; k < coinString.length; k++)
            {
                this.coinArray[k].visible = true;
                this.coinArray[k].frame = parseInt(coinString.charAt(coinString.length-1-k));
            }
        while(k<10)
            {
                this.coinArray[k].visible = false;
                k++;
            }
    },
    
    checkForGameOver:function()
    {
        if(this.gameType == 1 && this.justSubtracted)
            {
                return;
            }
        else if(this.isGridVacant())
            {
                return;
            }
        else if(this.canAdd())
            {
                return;
            }
        
        this.onGameOver();
        
    },
    
    isGridVacant:function()
    {
        var result = false;
        for(var i = 0;i<16;i++)
            {
                if(this.gridArray[i].value == 0)
                    result = true;
            }
        return result;
    },
    
    canAdd:function()
    {
        var result = false;
        var rn;
        
        for(var j = 1;j<=3;j++)
            {
                rn = this["rn"+j];
                if(!rn.visible) continue;
                
                for(var i = 0;i<16;i++)
                    {
                        if(this.gridArray[i].value + ((rn.frame+1) * this.mode) <= 100)
                            {
                                result = true;
                                break;
                            }
                    }
            }
        
        
        return result;
    },
    
    backButtonPressed:function()
    {
        if(tempInstance.pauseGroup || tempInstance.settingsGroup || tempInstance.helpGroup || this.buyGroup)
            {
                tempInstance.resumeGame();
            }
        else if(tempInstance.gameOver)
            {
                tempInstance.gotoHome();
            }
        else if(tempInstance.pauseBtn)
            {
                tempInstance.pauseGame();
            }
        
    },
    
    cacheInterstitial:function()
    {
        if(AdMob)
        {
            //console.log('preparing Interstitial');
            AdMob.prepareInterstitial( {adId:admobid_interstitial,isTesting:false, autoShow:false} );
        }
        /*var reAdd = this.time.create();
        reAdd.add(Phaser.Timer.SECOND * 2,this.reAddEvents,this);
        reAdd.start();*/
    },
    
    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

};

