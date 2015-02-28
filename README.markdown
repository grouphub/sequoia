# Plan Chooser

## Setup

    # Install Mongo and Node.
    brew install mongodb node

    # Automatically start Mongo on startup.
    ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist

    # Install dependencies.
    npm install

    # Seed the database.
    node lib/seeds.js

    # Start the server.
    npm start

    # Open in the browser.
    open 'http://localhost:9292'

    # If something goes wrong and you need to kill the server and the watcher
    # manually...
    #
    . ./bashrc
    gulp killall

    # Re-fetch zipcode data
    #
    . ./bashrc
    gulp fetch-zips

