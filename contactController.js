//import contact model
Contact = require('./contactModel');

//Handle index actions
exports.index = function (req,res){
    Contact.get(function (err,contacts) {
        if(err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            massage: "Retrived successfully",
            data: contacts
        });
        
    });
};

//Handle create contact actions
exports.new = function (req,res) {
    var contact = new Contact();
    contact.html = req.params.html;
    contact.css = req.params.css;

//save the contact and check for errors
contact.save(function (err){
    // if(err)
    // res.json(err)
    res.json({
        message: 'Created!',
        data: contact
    });
});
};

//Handle view contact info
exports.view = function (req,res){
    Contact.findById(req.params.contact_id, function (err, contact)
    {
        if(err)
            res.send(err);
        res.json({
            message: "Loading..",
            data: contact
        });
    });
};

//Handle update contact info 
exports.update = function (req,res){
    Contact.findById(req.params.contact_id, function (err, contact){
        if(err)
            res.send(err);
    
    contact.html = req.params.html;
    contact.css = req.params.css;
    
//save the contact and check for error
contact.save(function (err){
    if(err)
        res.json(err);
    res.json({
        message: 'Info updated',
        data: contact
    });
});
    });
};

//Handle delete contact
exports.delete = function (req,res){
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact){
        if(err)
            res.send(err);

    res.json({
        status: "success",
        message: "Deleted"
    });
    });
};