const express = require("express");


const {handleGetAllUsers,
     handleGetUserById, 
     handleUpdateUserById,
     handleDeleteUserById,
    handleCreateNewUser,
}= require("../controllers/user");

const router = express.Router();  // it is used, only for users

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)

 
router
.route("/:id") // user on specific id
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;
