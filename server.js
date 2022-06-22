const lables = [
  "Project Information" ,  
"Name of person completing this form" ,  
"Company (if applicable)" ,
"Email" ,
"Phone" ,
"Project name:" ,
"Project ID:" ,
"Project Completion Date" ,
"Project Architect:" ,
"Project Site Address" ,
"Warranty Validation should be sent to:" ,
"Same as above 1" ,
"End User Name" ,
"End User Email Address" ,
"End User Phone Number" ,
"Address" ,
"Solar Innovations® product purchased through:" ,
"Same as above 2" ,
"Name" ,
"Company (if applicable)" ,
"Email" ,
"Phone" ,
"PHOTOGRAPHS MUST BE PROVIDED TO SOLAR INNOVATIONS®" ,
"Photographs will be provided by:" ,
"Upload Picture:" ,
"Email" ,
"Customer Feedback" ,
"HTML Block" ,
"Project Cost" ,
"Condition of Product (free of scratches, blemishes, etc.):*" ,
"Performance/Operation of Product:" ,
"Lead Times" ,
"Responsiveness to Questions/Concerns:" ,
"Project Completion Date" ,
"Shipment/Delivery (if applicable)" ,
"Installation (if applicable)" ,
"Sales Designer" ,  
"Project Manager" ,
"Project Accountant" ,
"Solar Innovations® would like to know if anything could have been done differently to deliver a customer experience beyond expectations." ,
"Solar Innovations® would like to know if you have any additional comments on your experience." ,
"Is Solar Innovations® a brand that you trust?*" ,
"Would you buy a Solar Innovations® product again?" ,
"Would you recommend Solar Innovations® to others?" ,
"Are there any specific Solar team members you would like to recognize for exceptional service during your project?" ,
"You're not a robot, are you?" ,
]









let login = "ck_e86cfb8fed55e87904e573fb3eb77cf1f6aa0a76";
          let password = "cs_573c74a16e5e00390d669f3f4e7973ad67a41583";
var base64 = require('base-64');
const fetchOptions = {
          method: "GET",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           "Access-Control-Allow-Origin": "*",
           "Authorization": `Basic ${base64.encode(`${login}:${password}`)}`
          },
         }
const express = require("express");
const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const HmacSHA1 =require( 'crypto-js/hmac-sha1');
const enc = require('crypto-js')
const apiKey = 'ck_e86cfb8fed55e87904e573fb3eb77cf1f6aa0a76'
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3001;
const path = require("path")
const cors = require('cors');
const app = express();
app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json());
  
  app.use(cors());


  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

app.get("/", async (req, res) =>{
          let today = new Date();
          let Today = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`

          let backdate = new Date(today.setDate(today.getDate() - 29))
          backdate = `${backdate.getFullYear()}/${backdate.getMonth()+1}/${backdate.getDate()}`
          console.log("line 99"+ backdate)
         let entries
          let projects = []
         

       
           let fetchUrl =`https://solarinnovations.com/wp-json/gf/v2/entries?form_ids[0]=96&search={"start_date": "${backdate}", "end_date": "${Today}"]}&paging[page_size]=20`  
            await fetch(fetchUrl, fetchOptions)
           .then(response =>response.json())
           .then((data)=>{
             entries = data.entries
          })


          const scoreCheck2 = (data)=>{
            console.log("line 114 " + data)
            if(data.length > 1){
              data = data.substring(0,2)
              
            }

            var result;
              result = parseInt(data)
              if(isNaN(result)){   
                if(data === "Select One"){
                  return 'n/a'
                }
                else{
               
                }

                return "hey"
              }
            else{
              return result
            }
            
          }


          const scoreCheck = (data)=>{
            if(data.length > 1){
              data = data.substring(0,2)
              
            }

            var result;
              result = parseInt(data)
              if(isNaN(result)){   
                if(data === "Select One"){
                  return 'n/a'
                }
                else{
                }

                return "hey"
              }
            else{
              return result
            }
            
          }
          const averageScore = (data)=>{
            var total = 0
            var given = 0
           Object.values(data).forEach(val => {
                if(typeof val === "number"){
                  total += val ;
                  given ++ ;
                }
           })
           
           var result = total/given
           result = Math.round(result * 10) / 10;
           return result
          }


          for(x in entries){
            let project = {}
            project["Title"] = entries[x]["6"];
            project["id"] = entries[x]["7"];
            project["projectCost"] = scoreCheck(entries[x]["112"]);
            project["conditionOfProduct"] = scoreCheck(entries[x]["157"]);
            project["performance"] =  scoreCheck(entries[x]["158"]);
            project["leadTimes"] =  scoreCheck(entries[x]["159"]);
            project["response"] =  scoreCheck2(entries[x]["109"]);
            project["completionDate"] =  scoreCheck(entries[x]["114"]);
            project["delivery"] =  scoreCheck(entries[x]["117"]);
            project["install"] =  scoreCheck(entries[x]["118"]);
            project["pm"] = scoreCheck(entries[x]["113"]);
            project["accountant"] = scoreCheck(entries[x]["115"]);
            project["question1"] = entries[x]["119"];
            project["question2"] = entries[x]["120"];
            project["Yorn1"] = entries[x]['160'];
            project["Yorn2"] = entries[x]['154'];
            project["Yorn3"] = entries[x]['155'];
            project["date"]  = entries[x].date_created;
            project["averageScore"] = averageScore(project)


            projects.push(project)



          }

         
         
     
        
    res.send(projects)
})

app.get("/form", async(req, res) =>{
  let fields
  let fetchUrl = "https://solarinnovations.com/wp-json/gf/v2/forms?include[0]=96"
  await fetch(fetchUrl, fetchOptions)
  .then(response =>response.json())
  .then((data)=>{
    fields = data["96"].fields
 })


res.send(fields)
})