export enum OrderStatus {
  PLACED = "PLACED", // 0
  PROCESSED = "PROCESSED", // 1
  SHIPPED = "SHIPPED", // 2
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY", // 3
  DELIVERED = "DELIVERED", // 4
  COMPLETED = "COMPLETED", // 5
  NODATA = "NODATA",
};

const getOrderStatusByNumber = (orderStatusNumber: number): OrderStatus => {
  switch (orderStatusNumber) {
    case 0:
      return OrderStatus.PLACED;
    case 1:
      return OrderStatus.PROCESSED;
    case 2:
      return OrderStatus.SHIPPED;
    case 3:
      return OrderStatus.OUT_FOR_DELIVERY;
    case 4:
      return OrderStatus.DELIVERED;
    case 5:
      return OrderStatus.COMPLETED;
    default:
      return OrderStatus.NODATA;
  };
};

export enum PaymentStatus {
  UNPROCESSED = "UNPROCESSED", // 0
  INVOICE_SENT = "SUPINVOICE_SENTPLIER", // 1
  PAID = "PAID", // 2
  NODATA = "NODATA",
};

const getPaymentStatusByNumber = (paymentStatusNumber: number): PaymentStatus => {
  switch (paymentStatusNumber) {
    case 0:
      return PaymentStatus.UNPROCESSED;
    case 1:
      return PaymentStatus.INVOICE_SENT;
    case 2:
      return PaymentStatus.PAID;
    default:
      return PaymentStatus.NODATA;
  };
};

module.exports = { getPaymentStatusByNumber, getOrderStatusByNumber };