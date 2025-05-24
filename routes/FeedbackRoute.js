module.exports = (router) => {
  // Constant import
  const UserRole = require("../constants/UserRole.js");

  // Controller import
  const FeedbackController = require("../controllers/FeedbackController.js");

  // Middleware import
  const asyncHandler = require("../middlewares/asyncHandler.js");
  const validate = require("../middlewares/validate.js");
  const requireRoles = require("../middlewares/jwtMiddleware.js");

  // DTO import
  const InsertFeedbackRequest = require("../dto/requests/feedback/InsertFeedbackRequest.js");
  const UpdateFeedbackRequest = require("../dto/requests/feedback/UpdateFeedbackRequest.js");

  router.get("/feedbacks", asyncHandler(FeedbackController.getFeedbacks));
  router.get(
    "/feedbacks/:id",
    asyncHandler(FeedbackController.getFeedbackById)
  );
  router.post(
    "/feedbacks",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validate(InsertFeedbackRequest),
    asyncHandler(FeedbackController.insertFeedback)
  );
  router.put(
    "/feedbacks/:id",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    validate(UpdateFeedbackRequest),
    asyncHandler(FeedbackController.updateFeedback)
  );
  router.delete(
    "/feedbacks/:id",
    requireRoles([UserRole.USER, UserRole.ADMIN]),
    asyncHandler(FeedbackController.deleteFeedback)
  );
};
