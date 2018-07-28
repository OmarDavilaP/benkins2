"use strict";

var fs = require('fs'),
xml2js = require('xml2js');
const util = require('util');
const {exec} = require('child_process');
const config = require('../config');
const node_ssh= require('../node_modules/node-ssh');

class utils{
  constructor(){
    this._filesCommited={};
    this.ssh = new node_ssh();
  }
    
modifyXML(){
        var parser = new xml2js.Parser();
        var xmlBuilder = new xml2js.Builder();
        fs.readFile(config.app[0].gitPath + '/build.xml', (err, data) =>{
        parser.parseString(data, (err, result)=> {
            //var newOb={ '$': { name: 'hrview/js/hrview_fake2.js' } }
           let getFiles=this.getFilesDeployed((files)=>{
                for(var i=0;i<result.project.target.length;i++){
                    if(result.project.target[i].$.name=="include-dependencies"){
                        result.project.target[i].copy[0].fileset[0].include=files;
                        //console.log(util.inspect(result.project.target[key],false,null));
                        var xml = xmlBuilder.buildObject(result);
                        fs.writeFile(config.app[0].gitPath + '/build.xml', xml ,(err) =>{
                            console.log("done");
                        });
                    }                
                }
             }); 
        });
        
        });
}

getFilesDeployed(callback){
    var arr=[];
    var output="";
    console.log(config.app[0])
    //let path= config.gitPath;
    //let getFiles=exec('git',['show','--name-only','--oneline'],{cwd:'/usr'});
    //let getFiles=exec('git show --pretty="" --name-only',{cwd:config.app[0].gitPath});
    let getFiles=exec('git diff origin/master origin/development --name-status',{cwd:config.app[0].gitPath});
    //git diff origin/master origin/development --name-status
    //const getFiles=exec('ls', ['-lh', '/usr']);
    getFiles.stdout.on('data',(data)=>{
        output+=data;
    });
    getFiles.stderr.on('data',(data)=>{
     console.log("ERROR ", data);
    });
    getFiles.on('close',(code)=>{               
        output=output.split("\n");        
        for(var key in output){
                if(output[key].length>0){                     
                    var regx=/(.*src\/)(.*)/gi;
                    var matchRes = regx.exec(output[key]);
                    if(matchRes===null){ continue } 
                    arr.push({ '$': { name: matchRes[2]} });
                }            
        }
         return callback(arr);
    });  
}

createBundle(callback){
    var output="";
    //sh /Applications/apache-ant-1.10.2/bin/ant -buildfile build.xml build
    let getFiles=exec('sh '+config.app[0].apache_path+' -buildfile build.xml build',{cwd:config.app[0].gitPath});
    //console.log('sh '+config.app[0].apache_path+'-buildfile build.xml build')
    //console.log("-",config.app[0].gitPath);
    
   getFiles.stdout.on('data',(data)=>{
        console.log("output",data);
        output+=data;
    });
    getFiles.stderr.on('data',(data)=>{
     console.log("ERROR ", data);
    });
    getFiles.on('close',(code)=>{
        let response="FAILED"
        if(output.search("SUCCESSFUL")!=-1){
            response="SUCCESSFUL";
        }

         return callback(response);
    });    
}

connectToServer(){
    return new Promise ((resolve,reject)=>{

        this.ssh.connect(config.ssh[0]).then((result)=>{
            resolve(true);
        },(error)=>{
            console.log("Something's wrong");
            console.log(error);
            reject(error)
        });
    });
}

putFile(){

    return new Promise((resolve,reject)=>{
        this.ssh.putFiles([{local:config.app[0].gitPath+'dist/m/',remote:config.ssh[0].host+':/home01/apache-2.4.10/essweb-uoq2/htdocs/httpscontent/m/eds/testgit'}]).then((result)=>{
            resolve(result);
        },(error)=>{
            reject(error);
        });
    });

}

execCmd(execCm){
    return new Promise ((resolve,reject)=>{
        this.ssh.execCommand(execCm.cmd, { cwd:execCm.path }).then((result)=> {
            resolve(result.stdout);
           },(err)=>{
            reject(err.stderr);
           });  

    });

 
}

set filesCommited(object){
    this._filesCommited=object
}
get getfilesCommited(){
    return this._filesCommited;
}
    
}

module.exports=utils;

