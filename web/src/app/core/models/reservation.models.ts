export class Reservation {
    id: number;
    pax_no: number;
    reservation_dt: string;
    reserve_status: string;
    reserve_remark: string;
    reservation_created_dt: string;
    table_id: number;
    userID: number;
    user: {
        userName: any
    };
    order: any;
    table: any;
}