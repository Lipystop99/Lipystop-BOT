const { execFile } = require('child_process');
var fs = require('fs');
module.exports={
    //Read the file
    readfileSync: function(path){
        var data = fs.readFileSync(path, 'utf-8');
        console.log(data);
            console.log("Synchorization method comleted - ImageCore");
    },
    readfile: function(path,recall){
        fs.readFile(path, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log(data.toString());
                recall(data);
            }
        });
            console.log("Asynchronous method execution finished - Imagecore");
    },
    //Read binary image (incoming path)
    readImg: function(path,res){
        fs.readFile(path,'binary',function(err,filedata){
            if(err){
                console.log(err);
                return;
            }else{
                res.write(filedata,'binary');
                res.end();
            }
        });
    },
    //Write file
    writefile: function(path,data,recall){
        fs.writeFile(path,data,function(err){
            if(err){
                throw err;
            }
            console.log('It\'s saved!') // The file is saved
            recall('Successful writing file! - Imagecore');
        });
    },
    writeFileSync:function(path,data){  //Sync mode
        fs.writeFileSync(path,data);
            console.log("Complete writing Files Synchronously - Imagecore");
    }

}