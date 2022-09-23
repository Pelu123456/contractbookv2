const ContactService = require('../services/contactService');
const ApiError = require('../api-error');

//create new contact
exports.create = async (req,res,next) => {
    if(!req.body?.name){
        return next(new ApiError(400,'Name can not be empty'));
    }

    try{
        const contactService = new ContactService();
        const contact = await contactService.create(req.body);
        return res.send(contact);
    } catch (error){
    return next(
        new ApiError(500, 'An error occurred while creating the contact')
     );
    }
};
exports.findAll = async (req,res,next) => {
    let contacts = [];

    try{
        const contactService = new ContactService();
        const {name} = req.query;
        if(name){
            contacts = await contactService.findByName(name);

        } else{
            contacts = await contactService.all();
        }
    }
        catch (error){
            console.log(error);
            return next (
                new ApiError(500, 'An error occurred while retrieving contacts')
            );
        }
        return res.send(contacts);
    }; 
exports.findOne = async (req,res,next) => {
    try{
        const contactService = new ContactService();
        const contacts = await contactService.findById(req.params.id);
        if(!contact){
            return next(new ApiError(404,'Contact not found'));
        }
        return res.send(contact);
    }catch (error){
        return next(
            new ApiError(500,`Error retrieving contact with id =${req.params.id}`)
        );
    }
};
exports.update = async (req, res,next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,'Data to update can not be empty'));
    }
    try{
        const contactService = new ContactService();
        const update = await contactService.update(req.params.id, req.body);
        if(!update){
            return next(new ApiError(404,'Contact not found'));
        }
        return res.send({ message:'contact was update successfully'});
    } catch (error){
        console.log(error);
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try{
        const contactService = new ContactService();
        const deleted = await contactService.delete(req.params.id);
        if(!deleted){
            return res.send({
                message: 'Contact was deleted successfully' });
            }
        }
        catch (error){
            return next (
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        }
    };
exports.deleteAll = async (req,res,next) => {
    try{
        const contactService = new ContactService();
        const deleted = await contactService.deleteAll();
        return res.send({
            message: `${deleted} contacts were deleted successfully`,

        });
    } catch (error){
        console.log(error);
        return next(
            new ApiError(500,'An error occurred while removing all contracts')
        );
    }
}

};
exports.findAllFavorite = async (req, res,next) => {
    try{
        const contactService = new ContactService();
        const contacts = await contactService.allFavorite();
        return res.send(contacts);
    }    catch (error){
        return next(
            new ApiError(
                500,
                'An error occurred while retrieving favorite contacts'
            )
        );
    }
};