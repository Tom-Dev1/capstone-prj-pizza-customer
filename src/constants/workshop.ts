import { WorkshopStatus } from "@/services";

export function getWorkshopStatusVi(status: WorkshopStatus): string {
    switch (status) {
        case WorkshopStatus.Scheduled:
            return 'Đã lên lịch';
        case WorkshopStatus.Opening:
            return 'Đang mở';
        case WorkshopStatus.Closed:
            return 'Đã kết thúc';
        case WorkshopStatus.OpeningToRegister:
            return 'Mở đăng ký';
        case WorkshopStatus.ClosedRegister:
            return 'Đóng đăng ký';
        case WorkshopStatus.Cancelled:
            return 'Đã hủy';
        default:
            return 'Không xác định';
    }
}
