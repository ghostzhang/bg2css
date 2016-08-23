air.update = runtime.air.update;

var application;
function initialize(){
    application = new Application();
}

function Application(){
	this.initializeUpdater();
}  

function checkUpdates(){
	application.checkForUpdates();
}

Application.prototype = {
	
	initializeUpdater: function(){
		var that = this;
		var appUpdater = this.appUpdater = new runtime.air.update.ApplicationUpdaterUI();

			appUpdater.configurationFile = new air.File("app:/config/update.xml");
			appUpdater.addEventListener( runtime.air.update.events.UpdateEvent.INITIALIZED, function(ev){ that.onUpdaterInitialized() } );
			appUpdater.addEventListener( runtime.flash.events.ErrorEvent.ERROR, function(ev) { alert(air.Localizer.localizer.getString("updater", "messageErrorWhileInitializing")) } );
			
			appUpdater.initialize();

	},
	
	onUpdaterInitialized: function(){
		var that = this;
		air.NativeApplication.nativeApplication.addEventListener(air.InvokeEvent.INVOKE, function(ev) { that.nativeApplication_onInvoke(ev) });
	},
	
	checkForUpdates: function(){
		this.appUpdater.checkNow();
	},
	
	nativeApplication_onInvoke: function(ev){
		if(ev.arguments.length==1){
			var file = new air.File(ev.arguments[0]);
			if(file.exists && file.extension.toLowerCase()=="air"){
				this.appUpdater.installFromAIRFile(file);
			}
		}
	}		
}
initialize();
