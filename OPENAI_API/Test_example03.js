const express = require("express")
const OpenAI = require("openai")
const app=express()
app.use(express.json())

const openai = new Openai({
  apiKey:"openai_key"
})

app.get('/getResponse', async(req,res)=>{

  const response= await openai.chat.completions.create({
    model:'gpt-3.5-turbo', 
    message:[{"role":"user","content":"essay on global warming"}],
    max_tokens:100
  })
  console.log(response)
})

app.listen(3000,()=>{
  console.log("server started")
})
