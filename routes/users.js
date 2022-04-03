const router = require("express").Router();
const userController = require("../controller/users");

/**
 * Get user by id or email
 * @method GET
 * @visibility Private
 */
router.get("/:userId", userController.getUserByID);

/**
 * Update user by id
 * @method PUT
 * @visibility Private
 */
router.put("/:userId", userController.putUserById);

/**
 * Update user by id
 * @method PATCH
 * @visibility Private
 */
router.patch("/:userId", userController.patchUserById);

/**
 * Delete user by id
 * @method DELETE
 * @visibility Private
 */
router.delete("/:userId", userController.deleteUserById);

/**
 * create a new user
 * @method GET
 * @visibility Private
 */
router.post("/", userController.postUser);

/**
 * Get all users, include
 *  - TODO: filter
 *  - TODO: sort
 *  - TODO: pagination
 *  - TODO: select properties
 * @route /api/v1/users?sort=["by","name"]
 * @method GET
 * @visibility Private
 */
router.get("/", userController.getUsers);

module.exports = router;
