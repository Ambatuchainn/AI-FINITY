# DeHockey 
name of the project built by Ambatuchainn
This is 3dHockeyGame 

# Before start this project install dfx in your OS
for windows use wsl with this link:
https://learn.microsoft.com/en-us/windows/wsl/install

# Install this in your Powershell:

wsl --install 

# write this command in your wsl after you download it
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

# Check your dfx version
dfx --version

# How to Start this in your local and run all these commands
git clone <this-repo> #clone this repo

cd AI-FINITY  #Navigate into the project directory

npm install #install all dependencies

dfx start --clean --background #start your project

dfx deploy #deploy this project to your local

dfx stop #to stop the project




