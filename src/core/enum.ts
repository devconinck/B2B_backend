import { handleDBError } from "../service/_handleDBError";

export enum OrderStatus {
  PLACED = "PLACED", // 0
  PROCESSED = "PROCESSED", // 1
  SHIPPED = "SHIPPED", // 2
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY", // 3
  DELIVERED = "DELIVERED", // 4
  COMPLETED = "COMPLETED", // 5
  NODATA = "NODATA",
}

export const getOrderStatusByNumber = (
  orderStatusNumber: number | null
): OrderStatus => {
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
  }
};

export enum PaymentStatus {
  UNPROCESSED = "UNPROCESSED", // 0
  INVOICE_SENT = "INVOICE_SENT", // 1
  PAID = "PAID", // 2
  NODATA = "NODATA",
}

export const getPaymentStatusByNumber = (
  paymentStatusNumber: number | null
): PaymentStatus => {
  switch (paymentStatusNumber) {
    case 0:
      return PaymentStatus.UNPROCESSED;
    case 1:
      return PaymentStatus.INVOICE_SENT;
    case 2:
      return PaymentStatus.PAID;
    default:
      return PaymentStatus.NODATA;
  }
};

export const paymentStatusToNumber = (paymentStatus: PaymentStatus): number => {
  switch (paymentStatus) {
    case PaymentStatus.UNPROCESSED:
      return 0;
    case PaymentStatus.INVOICE_SENT:
      return 1;
    case PaymentStatus.PAID:
      return 2;
    default:
      throw handleDBError;
  }
};
