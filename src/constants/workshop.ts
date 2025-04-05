import { WorkshopStatus } from "@/services";

export function getWorkshopStatusVi(status: WorkshopStatus): string {
    switch (status) {
        case WorkshopStatus.Scheduled:
            return 'Đã lên lịch';
        case WorkshopStatus.Opening:
            return 'Đang mở';
        case WorkshopStatus.Closed:
            return 'Đã kết thúc';
        case WorkshopStatus.Approved:
            return 'Đã duyệt';
        case WorkshopStatus.Cancelled:
            return 'Đã hủy';
        default:
            return 'Không xác định';
    }
}
