const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminModel = require('../models/adminModel')

/* middleware function to check admin users */
router.use((req, res, next)=>{
  if(req.session.sunm ==undefined || req.session.srole!='admin')
    res.redirect('/login')
     next()   
});

/* GET users listing. */
router.get('/', (req, res, next)=>{
  res.render('home',{'sunm':req.session.sunm});
});

router.get('/index', (req, res,next)=>{
  //res.render('index',{'sunm':req.session.sunm});
  adminModel.totalUser(req.body).then((result)=>{

     if(result){
            //result ='true',
             //msg ='record found'
            }else{
          // result = 'false',
            //msg =  'record not found'
           } 
        res.render('index',{'sunm':req.session.sunm,'result':result});
          /*res.json({
            //result:result,
            msg:msg,
            total_record:result
          })*/
          

  }).catch((err)=>{
    res.render({message:err.message})
    //console.log(err)
  })
});

router.get('/dashboard', (req, res,next)=>{
  res.render('dashboard',{'sunm':req.session.sunm});
});

router.get('/user_male', (req, res,next)=>{
  //res.render('user_male',{'sunm':req.session.sunm});
  adminModel.maleDetails(req.body).then((result)=>{
       res.render('user_male',{ 'sunm':req.session.sunm,'list':result});   
       /*res.json({
        result
       }) */
    }).catch((err)=>{
      /* res.json({
        message:err.message
       })*/
    })
});

router.get('/user_female', (req, res,next)=>{
  //res.render('user_female',{'sunm':req.session.sunm});
   adminModel.femaleDetails(req.body).then((result)=>{
       res.render('user_female',{ 'sunm':req.session.sunm,'list':result});   
       /*res.json({
        result
       })*/ 
    }).catch((err)=>{
       res.render({message:err.message})
       /*res.json({
        message:err.message
       })*/
    })
});

router.get('/block_user', (req, res,next)=>{
  res.render('block_user',{'sunm':req.session.sunm});
});

router.get('/report_user', (req, res,next)=>{
  res.render('report_user',{'sunm':req.session.sunm});
});

router.get('/notification_msg', (req, res,next)=>{
  //res.render('notification_msg',{'sunm':req.session.sunm});
  adminModel.fetchNotification(req.body).then((result)=>{
      res.render('notification_msg',{'sunm':req.session.sunm,'list':result});   
       /*res.json({
        result
       })*/ 
    }).catch((err)=>{
       res.render({message:err.message});
       /*res.json({
        message:err.message
       })*/
    })
});

router.get('/membership_user', (req, res,next)=>{
  res.render('membership_user',{'sunm':req.session.sunm});
});

router.get('/membership_plan', (req, res,next)=>{
  //res.render('membership_plan',{'sunm':req.session.sunm});
  adminModel.fetchMembership(req.body).then((result)=>{
      res.render('membership_plan',{'sunm':req.session.sunm,'list':result});   
      /* res.json({
        result
       }) */
    }).catch((err)=>{
       res.render({message:err.message});
       /*res.json({
        message:err.message
       })*/
    })
});

router.get('/privacy_policy', (req, res,next)=>{
  res.render('privacy_policy',{'sunm':req.session.sunm});
});

router.get('/term_and_condition', (req, res,next)=>{
  res.render('term_and_condition',{'sunm':req.session.sunm});
});

router.get('/add_notification_msg', (req, res,next)=>{
  res.render('add_notification_msg',{'sunm':req.session.sunm,'output':''});
});

router.get('/add_membership_plan', (req, res,next)=>{
  res.render('add_membership_plan',{'sunm':req.session.sunm,'output':''});
});

router.get('/edit_profile', (req, res,next)=>{
  res.render('edit_profile',{'sunm':req.session.sunm});
});


router.get('/user_list', (req, res,next)=>{

  adminModel.fetchDetails(req.body).then((result)=>{
      res.render('user_list',{'sunm':req.session.sunm,'list':result});   
       /*res.json({
        result
       })*/ 
    }).catch((err)=>{
       res.render({message:err.message});
      /* res.json({
        message:err.message
       })*/
    })
});

router.post('/add_notification_msg', (req, res,next)=>{
  //res.render('add_notification_msg',{'sunm':req.session.sunm});
  adminModel.add_notification_msg(req.body).then((result)=>{
  
     if(result)
            result ='true',
             msg ='data add successfully....'
            
       else
           result = 'false',
            msg =  'data not registered'
            
        res.render('add_notification_msg',{'sunm':req.session.sunm,'output':msg});
          /*res.json({
            result:result,
            msg:msg
          })
          */

  }).catch((err)=>{
    //res.render({message:err.message})
    console.log(err)
  })
});

router.post('/add_membership_plan', (req, res,next)=>{
  //res.render('add_membership_plan',{'sunm':req.session.sunm});
  adminModel.add_membership_plan(req.body).then((result)=>{
  
     if(result)
            result ='true',
             msg ='data add successfully....'
            
       else
           result = 'false',
            msg =  'data not registered'
            
        res.render('add_membership_plan',{'sunm':req.session.sunm,'output':msg});
         /* res.json({
            result:result,
            msg:msg
          })*/
          

  }).catch((err)=>{
    //res.render({message:err.message})
    console.log(err)
  })
});

router.post('/privacy_policy', (req, res,next)=>{
  //res.render('privacy_policy',{'sunm':req.session.sunm});
   adminModel.privacy_policy(req.body).then((result)=>{
  
     if(result)
            result ='true',
             msg ='data add successfully....'
            
       else
           result = 'false',
            msg =  'data not registered'
            
       // res.render('register',{'output':msg});
          res.json({
            result:result,
            msg:msg
          })
          

  }).catch((err)=>{
    //res.render({message:err.message})
    console.log(err)
  })
});

router.post('/term_and_condition', (req, res,next)=>{
  //res.render('term_and_condition',{'sunm':req.session.sunm});
  adminModel.term_and_condition(req.body).then((result)=>{
  
     if(result)
            result ='true',
             msg ='data add successfully....'
            
       else
           result = 'false',
            msg =  'data not registered'
            
       // res.render('register',{'output':msg});
          res.json({
            result:result,
            msg:msg
          })
          

  }).catch((err)=>{
    //res.render({message:err.message})
    console.log(err)
  })
});


router.get('/delete_user/:id', (req, res,next)=>{
  
  adminModel.deleteUser(req.params).then((result)=>{
  // res.render('',{ 'sunm':req.session.sunm,'result':result}); 
           var new_id = parseInt(req.params.id);
         if(result.length==0){
                result = 'false',
                msg ='_id invalid...'
        
          }else{
                result = 'true',
                msg ='user successfully deleted'
                res.redirect('/admin/user_list') 
            }
          res.render('user_list',{'sunm':req.session.sunm,'output':msg});
          /*res.json({
            result:result,
            msg:msg
          })
*/
  }).catch((err)=>{
    res.json({message:err.message})
  })
});

/*router.get('/my_profile/:id', (req, res,next)=>{
  res.render('my_profile',{'sunm':req.session.sunm});
});*/

router.get('/my_profile/:id', (req, res,next)=>{
  
  adminModel.showUser(req.params).then((result)=>{
    console.log(result)
  // res.render('',{ 'sunm':req.session.sunm,'result':result}); 
        var new_id = parseInt(req.params.id);
         if(result.length==0){
                //result = false,
                //msg ='_id invalid...'
        
          }else{
               // result = true,
               // msg ='user successfully show'
            }
          res.render('my_profile',{'sunm':req.session.sunm, 'list':result[0]});
         /* res.json({
            //result:result,
            msg:msg,
            data:result
          })*/

  }).catch((err)=>{
    res.json({message:err.message})
  })
});

//router.get('/total_user_count', (req, res,next)=>{
  //res.render('term_and_condition',{'sunm':req.session.sunm});
 /* adminModel.totalUser(req.body).then((result)=>{

     if(result){*/
            //result ='true',
             //msg ='record found'
           /* }else{*/
          // result = 'false',
            //msg =  'record not found'
           /*} */
       // res.render('index',{'sunm':req.session.sunm,'result':result});
          /*res.json({
            //result:result,
            msg:msg,
            total_record:result
          })*/
          

/*  }).catch((err)=>{
    res.render({message:err.message})*/
    //console.log(err)
 /*})*/
//});

router.get('/block_user_count', (req, res,next)=>{
  //res.render('term_and_condition',{'sunm':req.session.sunm});
  adminModel.blockUser(req.body).then((result)=>{

     if(result){
            //result ='true',
            // msg ='record found'
            
       }else{
           //result = 'false',
           // msg =  'record not found'
          }  
        res.render('index',{'sunm':req.session.sunm,'result':result});
         /* res.json({
           // result:response,
            msg:msg,
            total_record:result
          })*/
          

  }).catch((err)=>{
    res.render({message:err.message})
    //console.log(err)
  })
});

router.get('/report_user_count', (req, res,next)=>{

  adminModel.reportUser(req.body).then((result)=>{

     if(result){
           // result ='true',
            // msg ='record found'
            
      } else{
          // result = 'false',
           // msg =  'record not found'
            }
        res.render('index',{'sunm':req.session.sunm,'result':result});
         /* res.json({
            //result:result,
            msg:msg,
            total_record:result
          })
          */

  }).catch((err)=>{
    res.render({message:err.message})
    //console.log(err)
  })
});

router.get('/search', (req, res,next)=>{
  
  adminModel.searchDetails(req.body).then((result)=>{

     if(result.length==0){
      res.redirect('/admin/user_list')
       /* res.json({
                result: 'false',
                msg:'record not found'
            })*/
      }else{
        
          res.render('user_list',{'sunm':req.session.sunm,'list':result});
          
           /* res.json({
                result:'true',
                msg:'record get successfully',
                data:result
            }); */
          }  
        //res.render('user_list',{'sunm':req.session.sunm,'result':result});
          

  }).catch((err)=>{
    res.render({message:err.message})
    })
});

router.post('/addmood',(req,res,next)=>{
    
    
  adminModel.addMood(req.body).then((result)=>{

     if(result){
         result = 'true',
            msg ='data  successfully add'
        }else{
            response = 'false',
          msg = 'data not registered'
        }   
        //var data = JSON.stringify(result2)
        
            res.json({
                result:result,
                 msg:msg
                
                
           }); 
   }).catch((err)=>{
    res.json({message:err.message})
  })
});



module.exports = router;