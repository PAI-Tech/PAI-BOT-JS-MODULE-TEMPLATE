# PAI-BOT-JS Module Template


 # Description

 This base project is used for developers who wants to develop an PAI-BOT module
 the can be learned by the PAI-BOT.

 How to create a new pai-bot module from this project?

 1. Download the project (make sure you have pai-bot configured)
 1.1 If you clone the project from git please DELETE ".git" folder to enable changes.
 2. Change folder name to your-project-name
 3. Change `package.json` "name" field to your-project-name (this will be the npm package name)
 4. Edit `pai-code-interface.json` file and change the "module-name" field  to your-project-name (this will represent the module name for pai-code commands)
 5. Write your module code in the `pcm-main.js` file (this is the entry point of the module)
 6. The file `PAI.JS` is used to run the module in development environment, use this file to test your module.



## For more information

+ Documentation is available at [PAI-TECH Knowledge-base](https://blog.pai-tech.org/knowledge-base).
+ Ask for help on the
[Email](mailto:community@pai-tech.org).



## License

PAI-BOT-JS Module Template is copyright (c) 2018-present PAI-TECH ARTIFICIAL INTELLIGENCE  <contact@pai-tech.org>.

PAI-BOT-JS Module Template is free software, licensed under the GNU General Public License, Version 3.0. See the
`LICENSE` file for more details.
