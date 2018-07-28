
const routes= require('./routes');
const api = require('./api');
const utils=require('../utilities/utilities');


module.exports=(app,db)=>{        
    
    app.get('/about', function (req, res) {
        res.send('About this wiki');
      })
      app.get('/getFilesDeployed',(req,res)=>{
        var myUtils = new utils();
        let getFiles=myUtils.getFilesDeployed((files)=>{
            res.send({result:files});
         }); 

    });
    app.get('/addFilesToBuild',(req,res)=>{
        var myUtils = new utils();
            myUtils.modifyXML();
            res.send({status:"sucess"})
    });
    app.get('/createBundle',(req,res)=>{
        var myUtils = new utils();
        let getFiles=myUtils.createBundle((result)=>{
            res.send({re:result});
         });         
    });
    app.get('/connectToServer',(req,res)=>{
        var myUtils = new utils();
        myUtils.connectToServer().then((res)=>{
            console.log(res);
        }).then(()=>{
            let obj={cmd:'ls',path:'/var'}
            myUtils.execCmd(obj).then((resolved)=>{
                console.log(resolved);
                res.send({re:resolved});
            });
            /*myUtils.putFile().then((solved)=>{
                console.log(resolved);
            });*/        
        });

            //res.send({re:result});


           /* let obj={cmd:'ls',path:'/var'}
            myUtils.execCmd((rCmd)=>{
                console.log(rCmd);
            });*/
       
    });         
}
