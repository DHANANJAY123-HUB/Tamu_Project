const db = require('./connection')
const ObjectId = require('mongoose').Types.ObjectId;

function adminModel() {

    this.fetchDetails=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({}).limit(10).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
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

	this.viewDetails=(new_id)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})
	}

	this.add_notification_msg=(userDetails)=>{
		//console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('add_notification_msg').insertOne(userDetails,(err,result)=>{
				err? reject(err) : resolve(result);
		    })
		}) 
    }	

    this.add_membership_plan=(userDetails)=>{
		//console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('add_membership_plan').insertOne(userDetails,(err,result)=>{
				err? reject(err) : resolve(result);
		    })
		}) 
    }		

    this.privacy_policy=(userDetails)=>{
		//console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('privacy_policy').insertOne(userDetails,(err,result)=>{
				err? reject(err) : resolve(result);
		    })
		}) 
    }

    this.term_and_condition=(userDetails)=>{
		//console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('term_and_condition').insertOne(userDetails,(err,result)=>{
				err? reject(err) : resolve(result);
		    })
		}) 
    }	

    this.deleteUser=(new_id)=>{
		return new Promise((resolve,reject)=>{
				db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').deleteOne({'_id':ObjectId(new_id)},(err1,result1)=>{
				err1 ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
		})
		})

	}

	this.showUser=(new_id)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
			err?reject(err):resolve(result)
		})
		})
      
	}

	this.totalUser=()=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').countDocuments({},(err,result)=>{
				err ? reject(err) : resolve(result);
			})
			/*db.collection('report_user').countDocuments({},(err1,result)=>{
				err1 ? reject(err1) : resolve(result);
			})*/
		})	
	}

	this.blockUser=()=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').countDocuments({},(err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.reportUser=()=>{
		return new Promise((resolve,reject)=>{
			db.collection('report_user').countDocuments({},(err,result)=>{
				err ? reject(err) : resolve(result);
				console.log(result)
			})
		})	
	}

	this.fetchNotification=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('add_notification_msg').find({'id':userDetails.id}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.fetchMembership=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('add_membership_plan').find({'id':userDetails.id}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.searchDetails=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'name':userDetails.name}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.addMood=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('today_mood').insertOne(userDetails,(err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}



}
module.exports=new adminModel()