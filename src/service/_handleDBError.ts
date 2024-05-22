const ServiceError = require("../core/serviceError");

export const handleDBError = (error: any) => {
  const { code = "", sqlMessage } = error;

  if (code === "ER_DUP_ENTRY") {
    switch (true) {
      case sqlMessage.includes("idx_user_email_unique"):
        return ServiceError.validationFailed(
          "A user with this email already exists"
        );
      default:
        return ServiceError.validationFailed("This item already exists");
    }
  }

  if (code.startsWith("ER_NO_REFERENCED_ROW")) {
    switch (true) {
      case sqlMessage.includes("fk_user_tirecenter"):
        return ServiceError.notFound("This tire center does not exist");
      case sqlMessage.includes("fk_order_user"):
        return ServiceError.notFound("This user does not exist");
      case sqlMessage.includes("fk_appointment_user"):
        return ServiceError.notFound("This user does not exist");
      case sqlMessage.includes("fk_appointment_order"):
        return ServiceError.notFound("This order does not exist");
      case sqlMessage.includes("fk_orderitem_order"):
        return ServiceError.notFound("This order does not exist");
      case sqlMessage.includes("fk_orderitem_product"):
        return ServiceError.notFound("This product does not exist");
    }
  }

  // Return error because we don't know what happened
  return error;
};
