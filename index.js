import express from "express"

const port = 3000

const app = express()

app.get('/', (req, res) =>{
    res.send("Hello this is abhijit")
})

app.use(express.json())

let teaData = []

let nextId = 1

//add tea 
app.post('/teas', (req, res) =>{
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas', (req, res) =>{
    res.status(201).send(teaData)
})

//get tea with Id
app.get('/teas/:id', (req, res) =>{
    const tea = teaData.find( t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea not found!")
    }
    res.status(200).send(tea)
})
//update tea
app.put('/teas/:id', (req, res) =>{

    const tea = teaData.find( t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea not found!")
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})
//delete

app.delete('/teas/:id', (req, res) =>{
    const index = teaData.findIndex( t => t.id === parseInt(req.params.id))

    if(index === -1){
        return res.status(404).send('tea not found')
    }

    teaData.splice(index, 1)
    return res.status(200).send('Deleted')


})

app.listen(port, ()=>{
    console.log(`Server is listening on the port http://127.0.0.1/${port}`);
    
})