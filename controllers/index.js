import {registerQuery, loginQuery, linkregisterQuery, linkDataFetchQuery, linkDataDeleteQuery, getUUIDfromLink} from '../db/queries.js';
import Stripe from "stripe";
import jwt from 'jsonwebtoken';


export async function register(req,res){
    try {
        const userData = req.body
        console.log('userData :',userData);
        const result = await registerQuery(userData);
        return res.json(result);
    }catch (error) {
      return res.json({
            msg: 'Error While Registering',
            status: 'API Error'
        })
    }
}


export async function login(req,res){
    try {
        const userData = req.body
        const result = await loginQuery(userData);
        if(result.status === 'success'){
            const stringPayload = {
             email:   userData.email
            }
            const token = jwt.sign(stringPayload, 'secretKey', { expiresIn: '2d' });
            res.cookie('jwtToken', token, { httpOnly: true });
            return res.json({jwtkn: token ,data:result,status:'success'});
        }
        else{
            return res.json({msg: "User does not exist", status: 'fail'});
        }
       
    }catch (error) {
      return res.json({
            msg: 'Error While Logging In',
            status: 'API Error'
        })
    }
}


export async function linksPost(req,res){
    try {
        const userData = req.body
        const linkData = {
            linkcards: userData.allLinks,
            image_url: userData.image_url,
            linkedin_url: userData.linkedin_url,
            instagram_url: userData.instagram_url,
            twitter_url: userData.twitter_url,
            facebook_url: userData.facebook_url,
            youtube_url: userData.youtube_url,
            shortbio: userData.shortbio,
            linkhub_id: userData.linkhub_id
        }
        const result = await linkregisterQuery(linkData,userData.email);
        return res.json(result);
    }catch (error) {
      return res.json({
            msg: 'Error While Registering Links',
            status: 'API Error'
        })
    }
}



export async function linksFetch(req,res){
    try {
        const userEmail = req.query.email
        const result = await linkDataFetchQuery(userEmail);
        return res.json(result);
    }catch (error) {
      return res.json({
            msg: 'Error While Fetching Link',
            status: 'API Error'
        })
    }
}

export async function profileDelete(req,res){
    try {
        const userEmail = req.query.email
        const result = await linkDataDeleteQuery(userEmail);
        return res.json(result);
    }catch (error) {
      return res.json({
            msg: 'Error While Deleting Link',
            status: 'API Error'
        })
    }
}
// Middleware to verify JWT token from cookies
export async function verifyToken(req, res, next) {
    const token = req.cookies.jwtToken;
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      req.user = decoded;
      next();
    });
  }


export async function logout(req,res){
    try {
        // Clear the JWT token cookie
        res.clearCookie('jwtToken');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error);
    }
}



// export async function checkout(req,res){
//     try {
//         const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
//         console.log('server side:', req.body.data);
//         let money = req.body.data[0].price *100;
//         let dataObj = req.body.data[0];
//         let customerEmail = req.body.data[0].posteremail;
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types:["card"],
//             mode:"payment",
//             line_items: req.body.data.map(item => {
//                 return{
//                     price_data:{
                        
//                         currency:"usd",
//                         product_data:{
//                             name: item.companyName + " Job Post",
//                             images: [item.display_url],
//                         },
//                         unit_amount: money,
                        
//                     },
//                     quantity: 1,
//                 }
//             }),
//             success_url: 'http://127.0.0.1:3000/success',
//             cancel_url: 'http://127.0.0.1:3000/cancel',
//             customer_email: customerEmail, // Replace with the customer's email
//         })
//         const insertData = await postJob(dataObj);
//         res.json({url: session.url})
//     } catch (e) {
//         res.status(500).json({error:e.message})
//     }
// }

export async function dataFetch(req,res){
    try {
        const linkId = req.params.linkId
        console.log(linkId);
        const getdata = await getUUIDfromLink(linkId);
        console.log('complete:data :-',getdata);
        let returnObject={
            msg: getdata.msg,
            data:{
            email: getdata.data.email,
            facebook_url: getdata.data.facebook_url,
            image_url: getdata.data.image_url,
            allLinks: getdata.data.linkcards,
            linkedin_url: getdata.data.linkedin_url,
            instagram_url: getdata.data.instagram_url,
            twitter_url: getdata.data.twitter_url,
            youtube_url: getdata.data.youtube_url,
            shortbio: getdata.data.shortbio,
            linkhub_id: getdata.data.linkhub_id,
            }
        }
        return res.json(returnObject);
    }catch (error) {
      return res.json({
            msg: 'Error While Fetching Link',
            status: 'API Error'
        })
    }
}


