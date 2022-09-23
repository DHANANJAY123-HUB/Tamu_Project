const db = require('./connection')
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

function apiModel() {
	this.registerUser=(userDetails)=>{
		console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user').find().toArray((err,result)=>{
				if(err)
					reject(err)
				else
				{
					var user_id
					var OTP = Math.floor(1000 + Math.random() * 9000);
					var flag=0

					if(result.length==0)
						user_id=1
					else
					{   
					
						var max_id=result[0].user_id

						for(let row of result)
						{

						 if(row._id>max_id)
						 	max_id=row.user_id
						
						 if(row.mobile_no==userDetails.mobile_no)
						 	flag=1							 	
						 	
						}
						_id=max_id+1  	
					}
					
					//userDetails.user_id=user_id
					userDetails.form_status='0'
					userDetails.role="user"
					userDetails.info=Date()
					userDetails.OTP=OTP.toString()
					userDetails.varify_status='0'

					if(flag)
					{
						resolve(0)
					}
					else
					{
						db.collection('user').insertOne(userDetails,(err1,result1)=>{
						   //err1 ? reject(err1) : resolve(result1);
						   if(err1){
						   	reject(err1)
						   }
						   else
						   {
						   	db.collection('user').find({'country_code':userDetails.country_code,'mobile_no':userDetails.mobile_no}).toArray((err2,result2)=>{
						   		err2?reject(err2):resolve(result2)
						   	})
						   }
					 	})	
					}
					//resolve(result)
				}	
			})
			
		})	
	}

	this.googleLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no,'google_id':userDetails.google_id}).toArray((err,result)=>{
				//err?reject(err):resolve(result)
				if(err){
					reject(err)
				}else{
					db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{'fcm':userDetails.fcm}},(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1)
					})
				}
				resolve(result)
			})
		})
	}

	this.facebookLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no,'facebook_id':userDetails.facebook_id}).toArray((err,result)=>{
				//err?reject(err):resolve(result)
				if(err){
					reject(err)
				}else{
					db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{'fcm':userDetails.fcm}},(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1)
					})
				}
				resolve(result)
			})
		})
	}

	this.uploadimage=(userDetails,img)=>{
		console.log(userDetails)
    return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				} else{
					db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'image':img,'form_status':'8'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
				}
				resolve(result)
			})
		})
	}

	this.userLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no,'country_code':userDetails.country_code,'password':userDetails.password}).toArray((err,result)=>{
				//err ? reject(err) :resolve(result)
				if(err){
					reject(err)
				}else{
					db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{'fcm':userDetails.fcm}},(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1)
					})
				}
				resolve(result)
			})
		})
	}

	this.updateGender=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{

			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'gender':userDetails.gender,'form_status':'2'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);

			})
		}
		   resolve(result)

		 })
		})				
	}

	this.updatefullName=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'name':userDetails.name,'form_status':'3'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		  resolve(result)
		})
		})				
	}

	this.updateDob=(userDetails)=>{
        
    var dob = userDetails.date_of_birth;
    var year = Number(dob.substr(0, 4));
    var month = Number(dob.substr(4, 2)) - 1;
    var day = Number(dob.substr(6, 2));
    var today = new Date();
    var yy = today.getFullYear() - year;
    var mm = today.getMonth()-month;
    var dd = today.getDate()-day;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      yy--;
      mm--;
      dd--;
    }
    return new Promise((resolve,reject)=>{
      db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'date_of_birth':dob,'age':yy.toString(),'form_status':'5'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		   resolve(result)
		})	
		})			
	}

	this.updateEmail=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'email':userDetails.email,'form_status':'6'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

	this.updatePassword=(userDetails)=>{
		return new Promise((resolve,reject)=>{
				db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'password':userDetails.password,'form_status':'7'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
		})
		})

	}

	this.fetchDetails=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	

	this.fetchAllDetails=(new_id,longitude,latitude)=>{
      return new Promise((resolve,reject)=>{
        db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
           var user_gender = result[0].gender;
          // var longitude = result[0].longitude;
          // var latitude = result[0].latitude;
           
           //console.log(longitude)
           //console.log(latitude)

       db.collection('user').find({'gender': {$ne : user_gender}}).limit(10).toArray((err1,result1)=>{
        //err1 ? reject(err1) : resolve(result1);
        if (err1) {
        	reject(err1)
        }else{
        	console.log("___________")
        db.collection('user').aggregate([
         {
              $geoNear:{
                 near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                 key:"location",
                // location: "2dsphere",
                 
                 maxDistance:parseFloat(10)*1609,
                 distanceField:"dist.calculated",
                 //query: {address:"indore"},
                 //includeLocs: "dist.location",
                 spherical:true
               
            } 
         }
        ]).toArray((err2,result2)=>{
            err2 ? reject(err2):resolve(result2)
             console.log(result2)
        })

       
        }

       
           /*var user_id=[];
           for(var i=0;i<result1.length;i++){
                   user_id.push(result1[i]._id);
                   console.log(user_id)
           }
        db.collection('user').find({ _id: { $in: user_id.map(user_id => ObjectId(user_id))}}).toArray((err2,result2)=>{
        err2 ? reject(err2) : resolve(result2);
            var lat2=[];
            var lon2=[];
           for(var i=0; i<result2.length;i++){
                   lat2.push(result2[i].latitute);
                   lon2.push(result2[i].langitute);
                   console.log(lat2+" ,"+lon2)
           }
        })
           // distance(lat1,lat2,lon1,lon2);
           function distance(lat1=10, lon1=20, lat2=20, lon2=10, unit) {
	             if ((lat1 == lat2) && (lon1 == lon2)) {
		             return 0;
	              }else {
		             var radlat1 = Math.PI * lat1/180;
		             var radlat2 = Math.PI * lat2/180;
		             var theta = lon1-lon2;
		             var radtheta = Math.PI * theta/180;
		             var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		             if (dist > 50) {
			              dist = 50;
		             }
		            dist = Math.acos(dist);
		            dist = dist * 180/Math.PI;
		            dist = dist * 60 * 1.1515;
		            if (unit=="K") { dist = dist * 1.609344 }
		            if (unit=="N") { dist = dist * 0.8684 }
		              return dist;
	              }
            }
           var obj = (distance())
           console.log(obj)
    })*/
    })

    })
  })
}

this.fetchDistance=(new_id,latitude,longitude)=>{
   	return new Promise((resolve,reject)=>{
   		db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
   			if(err){
   				reject(err)
   			}else{
   		db.collection('user').aggregate([
         {
            $geoNear:{
                 near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                 key:"location",
                // location: '2dsphere',
                 maxDistance:parseFloat(10)*1609,
                 distanceField:"dist.calculated",
                 spherical:true
               
            } 
         }
        ]).toArray((err1,result1)=>{
            err1? reject(err1): resolve(result1)
             console.log(result1)
        })
      }
      //resolve(result)
      })
      })
  }
  

	this.verifyOTP=(userDetails)=>{
		console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id),'OTP':userDetails.OTP}).toArray((err,result)=>{
				//err ? reject(err) : resolve(result);
				if(err){
					reject(err)
				}
				else
				{
          var form_status = result[form_status];
					var max_status=0;
					for(let row of result)
						{
						   if(row.form_status<max_status)
						   max_status=row.form_status
						}
					form_status=max_status+1
					userDetails.form_status = form_status;
					db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'form_status':userDetails.form_status,'varify_status':'1'}},(err1,result1)=>{
				       err ? reject(err1) : resolve(result1);
			        })

			    }
                resolve(result);
			    
			})
		})	
	}

	this.maleDetails=(male)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'gender':'male'}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.femaleDetails=(female)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'gender':'female'}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.ageDetails=(age)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'age':age}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.updateSmoke=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'smoke':userDetails.smoke,'form_status':'9'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

	this.updateReligion=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'religion':userDetails.religion,'form_status':'10'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

	this.updateEducation=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'education':userDetails.education,'form_status':'11'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

	this.updateSexual=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'sexual':userDetails.sexual,'form_status':'12'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

	this.updateJoin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'tag':userDetails.tag,'form_status':'13'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

	this.findMobile_no=(userDetails)=>{
		var OTP = Math.floor(1000 + Math.random() * 9000);	
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no}).toArray((err,result)=>{
				
				if(err){
			     reject(err)
        }else{
			db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{'OTP':OTP.toString(),'form_status':'13'}},(err1,result1)=>{
				
				db.collection('user').find({'mobile_no':userDetails.mobile_no}).toArray((err,result3)=>{
           resolve(result3)
        })
				// err1 ? reject(err1) : resolve(result);
			})
		}
		// resolve(result)
			})
		})
	}


this.findMobile_no_get=(userDetails)=>{
		
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':userDetails._id}).toArray((err,results)=>{
			err ? reject(err) : resolve(results)
			console.log(results);
		})
		})
	}

this.updateForgetPassword=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			  db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{'password':userDetails.password,'form_status':'13'}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			  })
      }
		resolve(result)
		})
	})

}

this.resendOTP=(userDetails)=>{
	var OTP = Math.floor(1000 + Math.random() * 9000);	
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'mobile_no':userDetails.mobile_no},{$set:{'OTP':OTP.toString()}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

this.updateChangePassword=(userDetails)=>{
	console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id),'password':userDetails.password}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			  db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'password':userDetails.new_password}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			  })
      }
		resolve(result)
		})
	})

}

this.updateProfile=(new_id,userDetails)=>{
		return new Promise((resolve,reject)=>{
				db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(new_id)},{$set:userDetails/*{'name':name,img'date_of_birth':date_of_birth,'email':email,'smoke':smoke,'religion':religion,'education':userDetails.education,'sexual':userDetails.sexual,'join':userDetails.join},new:true}*/},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
		})
		})

}

this.viewProfile=(new_id)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
			err?reject(err):resolve(result)
		})
		})
      
	}


this.updateFCM=(userDetails)=>{
		return new Promise((resolve,reject)=>{
				db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'fcm':userDetails.fcm}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
		})
		})
  }

  this.updateRequest=(userDetails)=>{
  	console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user_request').find({'user_id':ObjectId(userDetails.frnd_id),'frnd_id':ObjectId(userDetails.user_id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user_request').insertOne(new mongoose.Types.ObjectId(userDetails),(err1,result1)=>{
       err1 ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
    })
  })
}
this.updRequest=(userDetails) => {
  	return new Promise((resolve,reject)=>{

  		
  		db.collection('user_request').insertOne({'user_id':mongoose.Types.ObjectId(userDetails.user_id),'frnd_id':mongoose.Types.ObjectId(userDetails.frnd_id),'status':userDetails.status},(err,result)=>{
       if(err){
					reject(err)
				}else{
          /* if(userDetails.status == '1'){*/

			db.collection('user_request').find({'user_id':ObjectId(userDetails.frnd_id),'frnd_id':ObjectId(userDetails.user_id),'status':'1'}).toArray((err1,result1)=>{
       err1 ? reject(err1) : resolve(result1);
			})
		/*}*/
		}
		//resolve(result)
	   })

  	})
  }

 

   this.addchat=(userDetails) =>{
   	return new Promise((resolve,reject)=>{
   		db.collection('chat_list').find({'sender_id':ObjectId(userDetails.sender_id),'receiver_id':ObjectId(userDetails.receiver_id)}).toArray((err,result)=>{
   		 
   		 if (result.length == 0) {
   		 	  sender_id = 0
   		 	  receiver_id = 0
   		 	}else{
   			var sender_id = result[0].sender_id;
   			var receiver_id = result[0].receiver_id;
   		}
   		if((userDetails.sender_id == sender_id && userDetails.receiver_id == receiver_id)){
     db.collection('chat_list').find({'sender_id':userDetails.receiver_id,'receiver_id':userDetails.sender_id}).toArray((err,result)=>{

         db.collection('chat_list').updateOne({'sender_id':ObjectId(userDetails.receiver_id),'receiver_id':ObjectId(userDetails.sender_id)},{$set:{'msg':userDetails.msg}},(err4,result4)=>{
   					err4 ? reject(err4) : resolve(result4)
            })
     })	

         db.collection('chat_list').updateOne({'sender_id':ObjectId(userDetails.sender_id),'receiver_id':ObjectId(userDetails.receiver_id)},{$set:{'msg':userDetails.msg}},(err1,result1)=>{
   				 err1 ? reject(err1) : resolve(result1)
         })
   		  } else{
           db.collection('chat_list').find({'sender_id':ObjectId(userDetails.receiver_id),'receiver_id':ObjectId(userDetails.sender_id)}).toArray((err,result)=>{

             db.collection('chat_list').updateOne({'sender_id':ObjectId(userDetails.receiver_id),'receiver_id':ObjectId(userDetails.sender_id)},{$set:{'msg':userDetails.msg}},(err4,result4)=>{
   					    err4 ? reject(err4) : resolve(result4)
            })

   			    })	
              db.collection('chat_list').insertOne({'sender_id':mongoose.Types.ObjectId(userDetails.sender_id),'receiver_id':mongoose.Types.ObjectId(userDetails.receiver_id),'msg':userDetails.msg},(err2,result2)=>{
   					  err2 ? reject(err2) : resolve(result2)
   			  })
   			}
   			resolve(result)
   		})
   	})
   }




   this.msgListsam = (user_id) => {
      	return new Promise((resolve,reject)=>{

        db.collection('user').aggregate([

        	 //{ $match: { receiver_id : user_id} },
              { 
              	$lookup:
          	    {
                 from : 'chat_list',
                 localField :'sender_id',
                 foreignField : '_id',
                      as : 'user'
                   }
                  },
                  /*{ 
                    $project: { 
                          'user._id': 1, 
                          'user.sender_id':1,
                          _id: 1,
                          image:1,
                          mobile_no:1
                          } 
                  }
*/
         
                ]).toArray((err,result) => {
                	 err ? reject(err) : resolve(result)

                })
                
               /*db.collection('user').find({'_id':ObjectId(user_id)}).toArray((err1,result1)=>{
                	err1? reject(err):resolve(result1)
                })*/

        
      })
   }

   
   this.msgList=(sender_id,receiver_id)=>{
		return new Promise((resolve,reject)=>{
			console.log(sender_id)
			console.log(receiver_id)

			db.collection('chat_list').find({$or:[{'sender_id':ObjectId(sender_id)},{'receiver_id':ObjectId(receiver_id)}]}).toArray((err,result)=>{
      //db.collection('chat_list').find({'sender_id':sender_id}||{'receiver_id':receiver_id}).toArray((err,result)=>{
			if(err){
				reject(err)
        }else{   
				    var sender_id=[];
				    var receiver_id = [];
               for(var i=0;i<result.length;i++){
                   sender_id.push(result[i].sender_id);
                   receiver_id.push(result[i].receiver_id);
                }

         console.log(sender_id)
			   console.log(receiver_id)
			   //if((sender_id == receiver_id) || (receiver_id == sender_id)){
		 	       db.collection('chat_list').aggregate([
              { $lookup:
          	    {
                 from : 'user',
                 localField :'sender_id',
                 //localField : 'receiver_id',
                 foreignField : '_id',
                      as : 'data'
                   }
                  },
         
                ]).toArray((err1,result1)=>{

		 	         
                /* db.collection('user').find({'_id':ObjectId(sender_id),'_id':ObjectId(receiver_id)}).toArray((err1,result1)=>{*/
                 	err1? reject(err1) : resolve(result1)
                 })
              //}
		 	        //resolve(result)
		    }
	    })
		})
	}

			
	this.getdislikeList=(new_id)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user_request').find({'user_id':ObjectId(new_id),'status':'0'}).toArray((err,result)=>{
	     if(err){
				  reject(err)
         }else{
            var frnd_id=[];
               for(var i=0;i<result.length;i++){
                   frnd_id.push(result[i].frnd_id);
                }
         	
			     console.log(frnd_id)
          db.collection('user_request').aggregate([

         		{ $lookup:
         			{
         				from: 'user',
         				localField : 'frnd_id',
         				foreignField :'_id',
         				as :'data'
         			}
         		}
         		]).toArray((err1,result1)=>{
         		err1 ? reject(err1):resolve(result1);
         	   	})
         		//console.log(result1)
         	  /* db.collection('user').find({'_id':ObjectId(frnd_id)}).toArray((err1,result1)=>{
         		err1 ? reject(err1):resolve(result1)*/
         		
         
         	 
         }
				//resolve(result)
		})
		})
      
	}  

	this.getlikeList=(new_id)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user_request').find({'user_id':ObjectId(new_id),'status':'1'}).toArray((err,result)=>{
        if(err){
				  reject(err)
        }else{
         	  // console.log(result)
         	   
               var frnd_id=[];
               for(var i=0;i<result.length;i++){
               	
                   frnd_id.push(result[i].frnd_id);
                  
                  console.log(frnd_id);
           /*db.collection('user').find({ _id: { $in: frnd_id.map(frnd_id => ObjectId(frnd_id)) } }).toArray((err1,result1)=>{
         	 	err1 ? reject(err1):resolve(result1)
                })*/
              }
          
         	db.collection('user_request').aggregate([

         			 { $match: { receiver_id: new_id} },
         		{ $lookup:
         			{
         				from: 'user',
         				localField : 'frnd_id',
         				foreignField :'_id',
         				as :'data'
         			}
         		}
         		]).toArray((err1,result1)=>{
         		err1 ? reject(err1):resolve(result1)
         	  /*db.collection('user').find({'_id':ObjectId(frnd_id)}).toArray((err1,result1)=>{
         		err1 ? reject(err1):resolve(result1)*/
         	//console.log(result1)
         	})
         	
         	}
         //	resolve(result)
				
		})
		})
      
	}

 this.deleteProfile=(userDetails)=>{
		return new Promise((resolve,reject)=>{
				db.collection('user_request').find({'user_id':userDetails.user_id}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user_request').deleteOne({'user_id':userDetails.user_id},(err1,result1)=>{
				err1 ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
		})
		})

	}

	this.superRequest=(userDetails) => {
  	return new Promise((resolve,reject)=>{

  		db.collection('super_user').insertOne(userDetails,(err,result)=>{
       if(err){
					reject(err)
				}else{
        db.collection('super_user').find({'user_id':userDetails.frnd_id,'frnd_id':userDetails.user_id,'status':'1'}).toArray((err1,result1)=>{
         err1 ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
	   })

  	})
  }

  this.moodRequest=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'mood':userDetails.mood}},(err1,result1)=>{
				err1 ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

		this.moodDetails=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('today_mood').find().toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.updateimage=(userDetails,)=>{
		//console.log(img)
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				} else{
				 //const img = result.find(=> image.fieldname === 'image1');
					db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'image':userDetails.file,'image':userDetails.file}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
				}
				resolve(result)
			})
		})
	}

	this.updateSetting=(new_id,userDetails)=>{
		return new Promise((resolve,reject)=>{
				db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(new_id)},{$set:userDetails/*{'name':name,img'date_of_birth':date_of_birth,'email':email,'smoke':smoke,'religion':religion,'education':userDetails.education,'sexual':userDetails.sexual,'join':userDetails.join},new:true}*/},(err1,result1)=>{
				err1 ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
		})
		})

}

this.getlikeCount=(new_id,userDetails)=>{
		return new Promise((resolve,reject)=>{
				db.collection('user_request').find({'user_id':ObjectId(new_id),'status':'1'}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user_request').countDocuments({'status':'1'},(err1,result1)=>{
				err1 ? reject(err1) : resolve(result1)
				console.log(result1)
			})
		}
	 	resolve(result)
		})
		})

}

this.blockUser=(userDetails)=>{
  	console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user_request').find({'user_id':ObjectId(userDetails.user_id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user_request').deleteOne({frnd_id:ObjectId(userDetails.frnd_id)},(err1,result1)=>{
       err1 ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
    })
  })
}

this.reportUser=(userDetails)=>{
	  return new Promise((resolve,reject)=>{
	  	var user_id1 = new mongoose.mongo.ObjectId(userDetails.user_id)
        var frnd_id1 = new mongoose.mongo.ObjectId(userDetails.frnd_id)
        console.log(user_id1 ,typeof(user_id1));
        console.log(frnd_id1 ,typeof(frnd_id1));
   db.collection('report_user').insertOne(user_id1,frnd_id1,(err,result)=>{
       err ? reject(err) : resolve(result)
	  })

  })
}

this.updatelatlang=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'latitude':userDetails.latitude,'longitude':userDetails.longitude}},(err1,result1)=>{
				err1 ? reject(err1) : resolve(result1);
			})
		}
		  resolve(result)
		})
		})				
	}

	this.fetchGender=()=>{
		return new Promise((resolve,reject)=>{
			db.collection('gender_list').find({}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.generateNotification=(userDetails,new_id)=>{
		
		return new Promise((resolve,reject)=>{
			const serverKey = 'AAAAwmnSsUI:APA91bHRKdTf1mTbUNF4u-MYrNhtZpx0llJcIeOeN8wrK3hwu0jFY5pAQDa36hNcbbGyKp99IGNKZ1fv-inpKe78IICzoil91a22RxxMh1yYA0cNOoYQDpcTdhBHxtybtpP37zuJEdut';
    //const fcm = new FCM(serverKey);
    const message ={
        to:userDetails,
        collapse_key:`TEST`,
        notification :{
            title : `Test`,
            //body : messageBody,
            sound : `ping.aiff`,
            delivery_receipt_requested : true
        },
        data : {
            message : 'abc',
            //type:type
        }
    };
			db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}


}

module.exports=new apiModel()