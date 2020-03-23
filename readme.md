# PAI-BOT Base module

 > Description     : use this project as a bse project to write your own module

 > Author          : Ron Fridman

 > Date Created    : 19/11/2018

 > Copyright **PAI-TECH** 2018, all right reserved

 *      This program is free software; you can redistribute it and/or
 		modify it under the terms of the GNU General Public License
 		as published by the Free Software Foundation; either version
 		3 of the License, or (at your option) any later version.

 # Description

 This base project is used for developers who wants to develop an PAI-BOT module
 the can be learned by the PAI-BOT.

 How to create a new pai-bot module from this project?

 1. Download the project (make sure you have pai-bot configured)
 2. Change folder name to your-project-name
 3. Change package.json "name" field to your-project-name (this will be the npm package name)
 4. Edit pai-code-interface.json file and change the "module-name" field  to your-project-name (this will represent the module name for pai-code commands)
 5. Write your module code in the pcm-main.js file (this is the entry point of the module)
 6. The file PAI.JS is used to run the module in development environment, use this file to test your module.

 for any questions please send email to community@pai-tech.org.

 Enjoy :)
