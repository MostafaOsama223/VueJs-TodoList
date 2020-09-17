let mongoose = require('mongoose');
const ListSchema = require('../schemes/ListScheme');

exports.connectDB = () => {
    return new Promise ((resolve, reject) => {
        mongoose.connect('mongodb+srv://user:1234@cluster0.9591h.gcp.mongodb.net/todoCollection?retryWrites=true&w=majority', {  useNewUrlParser: true, useUnifiedTopology: true})
        .then(resolve('Connected to DB'), reject('Failed to connect to DB'))
        // .then(resolve(), reject())
        .catch(error => console.log('Error DB : ' + error))
    });
};

exports.createRecord = () => {
    return new Promise ((resolve, reject) => {
        const ListModel = mongoose.model('Lists', ListSchema);
        const newList = new ListModel(
            {
                x: "1234",
                items: [
                    {x: 1, y: 2}
                ],
                header: 'Hi'
            }
        );
        newList.save().then(resolve('Created record'), reject('Failed to create record'));
    });
};

/*
    ORM
    JPA
    PostGres 
*/