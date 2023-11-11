import db from './config.js';
import Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';



// register, login, put data, fetch data, delete data by email
async function registerQuery(registerData) {
  try {
    

      const check = await db('userlinkhub').where('email', registerData.email).first()
      
       if(check){
       throw Error('Email already exists');
       }else{
        const insertedRows = await db('userlinkhub').insert(registerData).returning('*');
        const inserteduser = insertedRows[0];
        return({msg:'Registered successfully.', data: inserteduser});
       }

    
  } catch (error) {
    console.error('Error Registering:', error);
    return({msg:'Error while Registering', data: error});
  }
}


async function loginQuery(loginData) {
  try {
    const check = await db('userlinkhub').where('email', loginData.email).first()
    if(check){
      if(check.password === loginData.password){
        return({status: 'success',msg:'LoggedIn successfully.', data: check});
      }else{
        throw Error('Incorrect Password');
      }
    }else{
      throw Error('Incorrect Email or Account Does not Exist ');
    }
  } catch (error) {
    console.error('Error Logging In:', error);
    return({status: 'fail',msg:'Error while Logging In', data: error});
  }
}

async function linkregisterQuery(linkData, userEmail) {
  try {
    const insertedRows = await db('userlinkhub').update(linkData).where('email', userEmail).returning('*');
    const insertedjob = insertedRows[0];
    return({msg:'Links created successfully.', data: insertedjob});
} catch (error) {
  console.error('Error creating', error);
  return({msg:'Error creating', data: error});
 }
}

async function linkDataFetchQuery(userEmail) {
  try {
    const getRows = await db('userlinkhub').where('email', userEmail).returning('*');
    const data = getRows[0];
    return({msg:'Links fetched successfully.', data: data});
} catch (error) {
  console.error('Error fetching', error);
  return({msg:'Error fetching', data: error});
 }
}

async function linkDataDeleteQuery(userEmail) {
  try {
     const getRows = await db('userlinkhub').where('email', userEmail).del();
     const data = getRows[0];
     return({msg:'Links deleted successfully.', data: data, status: 'success'});
}catch (error) {
  console.error('Error deleting', error);
  return({msg:'Error deleting', data: error, status: 'fail'});
 }
}

async function getUUIDfromLink(userlinkId) {
  try {
     const getRows = await db('userlinkhub').where('linkhub_id', userlinkId);
     
     const data = getRows[0];
     return({msg:'uuid recieved successfully.', data: data, status: 'success'});
}catch (error) {
  console.error('Error deleting', error);
  return({msg:'Error deleting', data: error, status: 'fail'});
 }
}

  
  export {
    registerQuery, loginQuery, linkregisterQuery, linkDataFetchQuery, linkDataDeleteQuery , getUUIDfromLink
  };