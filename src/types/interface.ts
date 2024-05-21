import { NotificationStatus } from "./enums/NotificationStatus";

export interface UpdatePaymentStatusRequest {
  paymentStatus: number;
}

export interface UpdateNotificationStatusRequest {
  status: NotificationStatus;
}
