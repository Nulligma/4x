var productAlias;
// create Game function in Game5x
Game5x.Menu = function (game) {
    this.subMenu = null;
    this.freeCoinMenu = null;
    this.buttonSound = null;
    this.theme = 0;
    this.themeChanged = false;
    this.currentSetBtn = null;
    this.gameName =null;
};

// set Game function prototype
Game5x.Menu.prototype = {
    
    init:function()
    {
        this.theme = Game5x.saveObject.theme == 2?1:Game5x.saveObject.theme;
    },
    
    preload: function () 
    {
        this.load.image('gameName', 'asset/Theme'+this.theme+'/'+canvasHeight+'/gameName.png');
        this.load.image('lbAPI', 'asset/Theme'+this.theme+'/'+canvasHeight+'/lbAPI.png');
        this.load.image('logo', 'asset/Theme'+this.theme+'/'+canvasHeight+'/logo.png');
        this.load.image('fbBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/fbBtn.png');
        this.load.image('twitterBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/twitterBtn.png');
        this.load.image('freeCoins', 'asset/Theme'+this.theme+'/'+canvasHeight+'/freeCoins.png');
        this.load.image('watchVideo', 'asset/Theme'+this.theme+'/'+canvasHeight+'/watchVideo.png');
        this.load.image('successSymbol', 'asset/Theme'+this.theme+'/'+canvasHeight+'/successSymbol.png');
        this.load.image('successSymbol', 'asset/Theme'+this.theme+'/'+canvasHeight+'/successSymbol.png');
        this.load.image('failedSymbol', 'asset/Theme'+this.theme+'/'+canvasHeight+'/failedSymbol.png');
        this.load.image('rateGame', 'asset/Theme'+this.theme+'/'+canvasHeight+'/rateGame.png');
        
        this.load.audio('buttonSound', ['asset/sounds/button.ogg','asset/sounds/button.mp3']);
        
        this.load.atlasJSONHash('dots', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/dots.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/dots.json');
        this.load.atlasJSONHash('playBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/playBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/playBtn.json');
        this.load.atlasJSONHash('leaderBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/leaderBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/leaderBtn.json');
        this.load.atlasJSONHash('settings', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/settings.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/settings.json');
        this.load.atlasJSONHash('credits', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/credits.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/credits.json');
        this.load.atlasJSONHash('4xBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/4xBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/4xBtn.json');
        this.load.atlasJSONHash('2xBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/2xBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/2xBtn.json');
        this.load.atlasJSONHash('1xBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/1xBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/1xBtn.json');
        this.load.atlasJSONHash('pmBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pmBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pmBtn.json');
        this.load.atlasJSONHash('pppmBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pppmBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/pppmBtn.json');
        this.load.atlasJSONHash('applyBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/applyBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/applyBtn.json');
        this.load.atlasJSONHash('audioOnBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/audioOnBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/audioOnBtn.json');
        this.load.atlasJSONHash('audioOffBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/audioOffBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/audioOffBtn.json');
        this.load.atlasJSONHash('buyBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/buyBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/buyBtn.json');
        this.load.atlasJSONHash('themeBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themeBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themeBtn.json');
        this.load.atlasJSONHash('setBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/setBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/setBtn.json');
        this.load.atlasJSONHash('purchaseDetails', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/purchaseDetails.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/purchaseDetails.json');
        this.load.atlasJSONHash('purchasePrice', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/purchasePrice.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/purchasePrice.json');
        this.load.atlasJSONHash('closeBtn', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/closeBtn.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/closeBtn.json');
        this.load.atlasJSONHash('themePrice', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themePrice.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themePrice.json');
        this.load.atlasJSONHash('themeSheets', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themeSheets.png', 'asset/Theme'+this.theme+'/'+canvasHeight+'/buttons/themeSheets.json');
        
    },
    
    prefileComplete:function(progress, cacheKey, success, totalLoaded, totalFiles) 
    {
        var percent = (totalLoaded/totalFiles);
    },
    
    preloadComplete:function()
    {
        this.game.stage.backgroundColor = Game5x.bgThemeColor[Game5x.saveObject.theme-1];
        this.game.load.onLoadComplete.remove(this.preloadComplete, this);
        this.game.lockRender = false;
        
        this.gameName = this.add.sprite(this.world.centerX,this.world.height/4,'gameName');
        this.gameName.anchor.setTo(0.5,0.5);
        this.addBtns();
    },
    
    create: function () 
    {
        tempInstance = this;

        this.gameName = this.add.sprite(this.world.centerX,this.world.height/4,'gameName');
        this.gameName.anchor.setTo(0.5,0.5);
        
        this.game.sound.mute = !Game5x.saveObject.sound;
        
        this.buttonSound = this.add.audio('buttonSound');
        
        this.addBtns();
                
        if(Math.random > 0.5 && !Game5x.saveObject.firstRun &&!Game5x.saveObject.ratedGame)
            {
                this.createRateSprite();
            }
        
    },
    
    createRateSprite:function()
    {
        this.disableAllBtns();
        this.subMenu = this.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        this.subMenu.add(buyBG);

        var freeCoins = this.add.sprite( 0, 0,"rateGame" );
        freeCoins.anchor.setTo(0.5,0.5);
        freeCoins.x = this.world.centerX;
        freeCoins.y = this.world.centerY;
        this.subMenu.add(freeCoins);

        var applyBtn = this.add.button( 0, 0,"applyBtn",this.gotoGame,this );
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.x = this.world.centerX;
        applyBtn.y = this.world.centerY + failedSymbol.height/2 - applyBtn.height/1.5;
        this.subMenu.add(applyBtn);

        var closeBtn = this.add.button( 0, 0,"closeBtn",this.resumeGame,this,0,0,1,0);
        closeBtn.anchor.setTo(0.5,0.5);
        closeBtn.x = freeCoins.x + freeCoins.width/2 - closeBtn.width/1.5;
        closeBtn.y = this.world.centerY - freeCoins.height/2 + closeBtn.height/1.5;
        this.subMenu.add(closeBtn);  
    },
    
    gotoGame:function()
    {
        Game5x.saveObject.ratedGame = true;
        window.open("https://play.google.com/store/apps/details?id=com.nulligma.Game4x","_blank");
    },
    
    startGame:function(playBtn)
    {
        tempInstance = null;
        
        this.disableAllBtns();
        this.state.start('Game');
    },
    
    showLeaderBoard:function()
    {
        window.plugins.playGamesServices.showAllLeaderboards();
        /*if(window.game.isLoggedIn())
            {
                updateLeaderBoard();
            }
        else
            {
                outsideInstruction = "showLeaderBoard";
                window.game.login();
            }*/
    },
    
    showCredits:function()
    {
        this.disableAllBtns();
        this.subMenu = this.add.group();
        var creditsBG = this.add.graphics( 0, 0 );
        creditsBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        creditsBG.drawRect(0, 0, this.world.width, this.world.height);
        this.subMenu.add(creditsBG);
        
        var logo = this.add.button(this.world.width/2,this.world.centerY,'logo',this.openCredits,this);
        logo.index = 0;
        logo.y = this.world.centerY - logo.height/4;
        logo.anchor.setTo(0.5,0.5);
        this.subMenu.add(logo);
        
        var fbBtn = this.add.button(this.world.width/4,this.world.centerY,'fbBtn',this.openCredits,this);
        fbBtn.index = 1;
        fbBtn.y = logo.y+logo.height/2 + fbBtn.height;
        fbBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(fbBtn);
        
        var twitterBtn = this.add.button(3*this.world.width/4,this.world.centerY,'twitterBtn',this.openCredits,this);
        twitterBtn.index = 2;
        twitterBtn.y = fbBtn.y;
        twitterBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(twitterBtn);
        
        /*var dots = this.add.sprite(this.world.width/2,0,'dots');
        dots.y = (logo.y - logo.height/2)/2;
        dots.anchor.setTo(0.5,0.5);
        this.subMenu.add(dots);*/
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = 7*this.world.height/8 + applyBtn.height/2;
        applyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
    },
    
    openCredits:function(btn)
    {
        var url;
        switch(btn.index)
        {
            case 0: url = "http://www.nulligma.com"; break;
            case 1: url = "https://www.facebook.com/Nulligma"; break;
            case 2: url = "https://twitter.com/Nulligma"; break;
        }

        setTimeout(
                  function(){ 
                    window.open(url,"_blank");
                  }, 
                1);
    },
    
    settingsMenu:function(settingsBtn)
    {
        this.disableAllBtns();
        
        this.subMenu = this.add.group();
        var settingsBG = this.add.graphics( 0, 0 );
        settingsBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        settingsBG.drawRect(0, 0, this.world.width, this.world.height);
        this.subMenu.add(settingsBG);
        
        var _1xBtn = this.add.button(this.world.width/4,this.world.centerY/2,'1xBtn',this.changeMode,this);
        _1xBtn.anchor.setTo(0.5,0.5);
        _1xBtn.frame = Game5x.saveObject.currentMode == 1?1:2;
        _1xBtn.setDownSound(this.buttonSound);
        this.subMenu.add(_1xBtn);
        var _2xBtn = this.add.button(this.world.width/2,this.world.centerY/2,'2xBtn',this.changeMode,this);
        _2xBtn.anchor.setTo(0.5,0.5);
        _2xBtn.frame = Game5x.saveObject.currentMode == 2?1:2;
        _2xBtn.setDownSound(this.buttonSound);
        this.subMenu.add(_2xBtn);
        var _4xBtn = this.add.button(3*this.world.width/4,this.world.centerY/2,'4xBtn',this.changeMode,this);
        _4xBtn.anchor.setTo(0.5,0.5);
        _4xBtn.frame = Game5x.saveObject.currentMode == 4?1:2;
        _4xBtn.setDownSound(this.buttonSound);
        this.subMenu.add(_4xBtn);
        
        var firstDiv = this.add.graphics( 0, 0 );
        firstDiv.beginFill(0x3299BB,1);
        firstDiv.drawRect(0 , 3*this.world.height/8, this.world.width, Math.floor(this.world.height/200));
        this.subMenu.add(firstDiv);
        
        var pppmBtn = this.add.button(0,this.world.centerY,'pppmBtn',this.changeGameType,this);
        pppmBtn.frame = Game5x.saveObject.currentGameType == 2?1:2;
        pppmBtn.x = this.world.centerX + pppmBtn.width/2;
        pppmBtn.anchor.setTo(0.5,0.5);
        pppmBtn.setDownSound(this.buttonSound);
        this.subMenu.add(pppmBtn);
        var pmBtn = this.add.button(0,this.world.centerY,'pmBtn',this.changeGameType,this);
        pmBtn.frame = Game5x.saveObject.currentGameType == 1?1:2;
        pmBtn.x = this.world.centerX - pppmBtn.width/2;
        pmBtn.anchor.setTo(0.5,0.5);
        pmBtn.setDownSound(this.buttonSound);
        this.subMenu.add(pmBtn);
         
        var secondDiv = this.add.graphics( 0, 0 );
        secondDiv.beginFill(0x3299BB,1);
        secondDiv.drawRect(0 , 5*this.world.height/8, this.world.width, Math.floor(this.world.height/200));
        this.subMenu.add(secondDiv);
        
        var audioOnBtn = this.add.button(0,3*this.world.centerY/2,'audioOnBtn',this.audioOn,this);
        audioOnBtn.frame = this.game.sound.mute?0:1;
        audioOnBtn.x = this.world.centerX - this.world.centerX/2;
        audioOnBtn.anchor.setTo(0.5,0.5);
        audioOnBtn.setDownSound(this.buttonSound);
        this.subMenu.add(audioOnBtn);
        var audioOffBtn = this.add.button(0,3*this.world.centerY/2,'audioOffBtn',this.audioOff,this);
        audioOffBtn.frame = !this.game.sound.mute?0:1;
        audioOffBtn.x = this.world.centerX + this.world.centerX/2;
        audioOffBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(audioOffBtn);
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = 7*this.world.height/8 + applyBtn.height/2;
        applyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
    },
    
    checkForReward:function()
    {
        this.disableAllBtns();
        
        if(Math.random() > 0.3)
            this.showFreeCoins(true);
        else
            this.showFreeCoins(false);
    },
    
    buyMenu:function()
    {
        if(this.freeCoinMenu)
            {
                this.freeCoinMenu.destroy(true,false);
                this.freeCoinMenu = null;
            }
        
        this.subMenu = this.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        this.subMenu.add(buyBG);
        
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
                this.subMenu.add(div);
                
                btnBG = this.add.graphics( 0, 0 );
                btnBG.index = i;
                btnBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1],1);
                btnBG.drawRect(0 , 0, this.world.width, this.world.height/7.5);
                btnBG.y = div.y-btnBG.height;
                this.subMenu.add(btnBG);
                
                if(i==0 && !Game5x.saveObject.showAd)       continue;
                else if(i==1 && Game5x.saveObject.doubleCoin)   continue;
                
                purchaseDetail = this.add.button( 0, 0,"purchaseDetails",this.startPurchase,this);
                purchaseDetail.index = i;
                purchaseDetail.anchor.setTo(0.5,0.5);
                purchaseDetail.frame = i;
                purchaseDetail.x = purchaseDetail.width/2 + this.world.width/20;
                purchaseDetail.y = (div.y+((div.y-this.world.height/7)))/2;
                this.subMenu.add(purchaseDetail);
                
                purchasePrice = this.add.button( 0, 0,"purchasePrice",this.startPurchase,this);
                purchasePrice.index = i;
                purchasePrice.frame = i<3?0:i-2;
                purchasePrice.anchor.setTo(0.5,0.5);
                purchasePrice.x = this.world.width - purchasePrice.width/2 - this.world.width/20;
                purchasePrice.y = purchaseDetail.y;
                this.subMenu.add(purchasePrice);
                
                if(i==5) div.visible = false;
            }
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'closeBtn',this.resumeGame,this,1,1,0,1);
        applyBtn.y = this.world.height - applyBtn.height;
        applyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
        
    },
    
    startPurchase:function(btn)
    {
        if(this.subMenu)
            {
                this.subMenu.destroy(true,false);
                this.subMenu = null;
                
                this.addBtns();
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
    
    showFreeCoins:function(rewardReady)
    {
        if(rewardReady)
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
                
                var closeBtn = this.add.button( 0, 0,"closeBtn",this.buyMenu,this,0,0,1,0);
                closeBtn.anchor.setTo(0.5,0.5);
                closeBtn.x = freeCoins.x + freeCoins.width/2 - closeBtn.width/1.5;
                closeBtn.y = this.world.centerY - freeCoins.height/2 + closeBtn.height/1.5;
                this.freeCoinMenu.add(closeBtn);
        
            }
        else
            {
                this.buyMenu();
            }
    },

    startRewardVideo:function()
    {
        if(this.freeCoinMenu)
            {
                this.freeCoinMenu.destroy(true,false);
                this.freeCoinMenu = null;
            }
        
        //Appodeal.enableRewardedVideoCallbacks(true);
        //Appodeal.show(Appodeal.REWARDED_VIDEO);
    },
    
    successRewardAd:function(result)
    {
        Game5x.saveObject.coins += 10;
        NativeStorage.setItem('saves', JSON.stringify(Game5x.saveObject));
        
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

        var applyBtn = this.add.button( 0, 0,"applyBtn",tempInstance.buyMenu,tempInstance );
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.x = tempInstance.world.centerX;
        applyBtn.y = tempInstance.world.centerY + successSymbol.height/2 - applyBtn.height/1.5;
        tempInstance.freeCoinMenu.add(applyBtn);
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

        var applyBtn = this.add.button( 0, 0,"applyBtn",tempInstance.buyMenu,tempInstance );
        applyBtn.anchor.setTo(0.5,0.5);
        applyBtn.x = tempInstance.world.centerX;
        applyBtn.y = tempInstance.world.centerY + failedSymbol.height/2 - applyBtn.height/1.5;
        tempInstance.freeCoinMenu.add(applyBtn);
    },
   
    themeMenu:function()
    {
        this.disableAllBtns();
        
        this.subMenu = this.add.group();
        var buyBG = this.add.graphics( 0, 0 );
        buyBG.beginFill(Game5x.bgThemeColor[Game5x.saveObject.theme-1], 1);
        buyBG.drawRect(0, 0, this.world.width, this.world.height);
        this.subMenu.add(buyBG);
        
        var div;
        var btnBG;
        var themeSheets;
        var themePrice;
        var setBtn;
        var bgColor;
        for(var i=0;i<6;i++)
            {
                div = this.add.graphics( 0, 0 );
                div.beginFill(0x3299BB,1);
                div.drawRect(0 , 0, this.world.width, Math.floor(this.world.height/200));
                div.y = (this.world.height/7)*(i+1);
                this.subMenu.add(div);
                
                bgColor = i<5?Game5x.bgThemeColor[i]:Game5x.bgThemeColor[Game5x.saveObject.theme-1];
                
                btnBG = this.add.graphics( 0, 0 );
                btnBG.beginFill(bgColor,1);
                btnBG.drawRect(0 , 0, this.world.width, this.world.height/7.5);
                btnBG.y = div.y-btnBG.height;
                this.subMenu.add(btnBG);
                
                themeSheets = this.add.sprite( 0, 0,"themeSheets" );
                themeSheets.anchor.setTo(0.5,0.5);
                themeSheets.frame = i==0?0:i-1;
                themeSheets.x = themeSheets.width/2 + this.world.width/20;
                themeSheets.y = (div.y+((div.y-this.world.height/7)))/2;
                this.subMenu.add(themeSheets);
                
                if(Game5x.saveObject.themeBought["theme"+(i+1)])
                    {
                        setBtn = this.add.sprite( 0, 0,"setBtn" );
                        setBtn.index = i+1;
                        setBtn.anchor.setTo(0.5,0.5);
                        setBtn.x = this.world.width - setBtn.width/2 - this.world.width/20;
                        setBtn.y = themeSheets.y;
                        this.subMenu.add(setBtn);
                        
                        if(Game5x.saveObject.theme == i+1)
                            {
                                setBtn.frame = 1;
                                this.currentSetBtn = setBtn;
                            }
                
                        setBtn.inputEnabled = true;
                        setBtn.events.onInputUp.add(this.changeTheme,this);
                    }
                else
                    {
                        themePrice = this.add.button( 0, 0,"themePrice",this.buyTheme,this);
                        themePrice.index = i;
                        themePrice.anchor.setTo(0.5,0.5);
                        themePrice.frame = i==0?0:i-1;
                        themePrice.x = this.world.width - themePrice.width/2 - this.world.width/20;
                        themePrice.y = themeSheets.y;
                        this.subMenu.add(themePrice);
                    }
                
                /*purchasePrice = this.add.sprite( 0, 0,"purchasePrice" );
                purchasePrice.frame = i<3?0:i-2;
                purchasePrice.anchor.setTo(0.5,0.5);
                purchasePrice.x = this.world.width - purchasePrice.width/2 - this.world.width/20;
                purchasePrice.y = (div.y+((div.y-this.world.height/7)))/2;
                this.subMenu.add(purchasePrice);*/
                
                if(i==5) div.visible = false;
            }
        
        var applyBtn = this.add.button(this.world.centerX,7*this.world.height/8,'applyBtn',this.resumeGame,this,0,0,1,0);
        applyBtn.y = 7*this.world.height/8 + applyBtn.height/2;
        applyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(applyBtn);
        applyBtn.setDownSound(this.buttonSound);
        
    },
    
    buyTheme:function(btn)
    {
        var gotMoney = false;
        switch(btn.index)
            {
                case 1: if(Game5x.saveObject.coins >= 100)  {gotMoney = true;Game5x.saveObject.coins-=100; Game5x.saveObject.themeBought.theme2 = true;}    break;
                case 2: if(Game5x.saveObject.coins >= 250)  {gotMoney = true;Game5x.saveObject.coins-=250; Game5x.saveObject.themeBought.theme3 = true;}    break;
                case 3: if(Game5x.saveObject.coins >= 250)  {gotMoney = true;Game5x.saveObject.coins-=250; Game5x.saveObject.themeBought.theme4 = true;}    break;
                case 4: gotMoney = true; purchaseIndex = 6; store.ready(function() {orderProduct("special theme")});   break;  
                case 5: gotMoney = true; store.refresh();                 break;
            }
        
        if(gotMoney)
            {
                this.resumeGame();
            }
        else
            {
                //this.checkForReward();
            }
        
        NativeStorage.setItem('saves', JSON.stringify(Game5x.saveObject));
    },
    
    changeTheme:function(btn)
    {
        if(btn.index != Game5x.saveObject.theme)
            {
                btn.events.onInputUp.remove(this.changeTheme,this);
                this.currentSetBtn.frame = 0;
                this.currentSetBtn = btn;
                
                btn.frame = 1;
                
                this.theme = btn.index == 2?1:btn.index;
                Game5x.saveObject.theme = btn.index;
                this.themeChanged = true;
        
                this.currentSetBtn.events.onInputUp.add(this.changeTheme,this);
            }
    },
    
    audioOff:function()
    {
        this.game.sound.mute = true;
        this.subMenu.children[8].frame = 0;
        this.subMenu.children[9].frame = 1;  
    },
    
    audioOn:function()
    {
        this.game.sound.mute = false;
        this.subMenu.children[8].frame = 1;
        this.subMenu.children[9].frame = 0;  
    },
    
    changeMode:function(btn)
    {
        if(btn.frame == 1) return;
        
        this.subMenu.children[1].frame = 0;
        this.subMenu.children[2].frame = 0;
        this.subMenu.children[3].frame = 0;
        
        if(btn.key == "1xBtn")
            {
                Game5x.saveObject.currentMode = 1;
            }
        else if(btn.key == "2xBtn")
            {
                Game5x.saveObject.currentMode = 2;
            }
        else
            {
                Game5x.saveObject.currentMode = 4;
            }
        
        btn.frame = 1;
    },
    
    changeGameType:function(btn)
    {
        if(btn.frame == 1) return;
        
        this.subMenu.children[5].frame = 0;
        this.subMenu.children[6].frame = 0;
        
        if(btn.key == "pmBtn")
            {
                Game5x.saveObject.currentGameType = 1;
            }
        else
            {
                Game5x.saveObject.currentGameType = 2;
            }
        
        btn.frame = 1;
    },
    
    resumeGame:function()
    {
        if(this.subMenu)
            {
                this.subMenu.destroy(true,false);
                this.subMenu = null;
            }
        
        if(this.themeChanged)
            {
                this.gameName.kill();
                this.gameName = null;
                
                this.themeChanged = false;
                
                this.game.lockRender = true;
                this.game.load.onLoadComplete.add(this.preloadComplete, this);
                this.preload();
                this.game.load.start();
                
                return;
            }
        
        this.addBtns();
    },
    
    disableAllBtns:function()
    { 
        this.subMenu.destroy(true,false);
        this.subMenu = null;
    },
    
    addBtns:function()
    {
        this.subMenu = this.add.group();
        
        var playBtn = this.add.button(this.world.centerX,this.world.height/2,'playBtn',this.startGame,this,0,0,1,0);
        playBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(playBtn);
        playBtn.setDownSound(this.buttonSound);
        
        var leaderBtn = this.add.button(this.world.centerX,0,'leaderBtn',this.showLeaderBoard,this,0,0,1,0);
        leaderBtn.y = playBtn.y + playBtn.height + leaderBtn.height;
        leaderBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(leaderBtn);
        leaderBtn.setDownSound(this.buttonSound);
        
        var credits = this.add.button(0,0,'credits',this.showCredits,this,0,0,1,0);
        credits.x = this.world.width - credits.height;
        credits.y = this.world.height - credits.height;
        credits.anchor.setTo(0.5,0.5);
        this.subMenu.add(credits);
        credits.setDownSound(this.buttonSound);
        
        var settings = this.add.button(0,0,'settings',this.settingsMenu,this,0,0,1,0);
        settings.x =settings.height;
        settings.y =this.world.height - settings.height;
        settings.anchor.setTo(0.5,0.5);
        this.subMenu.add(settings);
        settings.setDownSound(this.buttonSound);
        
        var buyBtn = this.add.button(0,0,'buyBtn',this.buyMenu,this,0,0,1,0);
        buyBtn.x =this.world.centerX-buyBtn.width;
        buyBtn.y =this.world.height - buyBtn.height;
        buyBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(buyBtn);
        buyBtn.setDownSound(this.buttonSound);
        
        var themeBtn = this.add.button(0,0,'themeBtn',this.themeMenu,this,0,0,1,0);
        themeBtn.x =this.world.centerX+buyBtn.width;
        themeBtn.y =this.world.height - themeBtn.height;
        themeBtn.anchor.setTo(0.5,0.5);
        this.subMenu.add(themeBtn);
        themeBtn.setDownSound(this.buttonSound);
    },
    
    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

};