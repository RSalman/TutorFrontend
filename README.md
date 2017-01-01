# README (Fix/add anything you felt was unclear)

* Android Target API: 22 (To be discussed)
* iOS: TBD

* System dependencies: Android Studio SDK Tools, NodeJS Version >= 4.7.0

* Configuration:
		
		Open Android studio > Settings > Appearance & Behavior > System Settings > Android SDK
			Create "ANDROID_HOME" system variable and set it the path of Andriod SDK location
			Under SDK Platform, make sure "Android 5.1 API level 22" is selected
			Under SDK Tools, make sure the following are selected:
				Android SDK Build Tools
				Android SDK Tools
				Android SDK Platform Tools
				Android Suppourt Repository
        
        Steps taken to resolve "timeout getting device list" when using Geny Motion:
            Open Geny Motion settings
            Under ADB, select "Use custom Android SDK Tools" and specify the Android SDK path
            
        Steps taken to resolve react-native error: "SyntaxError: Use of const in strict mode"
            Make sure you have Node version >= 4.0

        Steps taken to resolve 'adb' is not recognized as an internal or external command
            Add platform-tools location to system path variable (e.g., C:\Users\Guest\AppData\Local\Android\sdk\platform-tools)

         Steps taken to resolve error: cannot find module 'invariant' 
            Install the invariant module globally: npm install -g invariant
            If that still doesn't work then try: npm i --save-dev invariant

* First Time Launching App:
		
		npm install (This will take some time)
		Start an Andrioid Virtual Device (from Geney Motion or Android Studio)
		react-native run-android

* Please Note: As of now, with the inital commit, the GET request will require Auth to removed from backend (remove devise declarations from User controller)
