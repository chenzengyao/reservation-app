export class Reservation {
    reservationID: number;
    pax_no: number;
    reservation_dt: string;
    reserve_status: string;
    reserve_remark: string;
    reservation_created_dt: string;
    tableID: number;
    userID: number;
    user: {
        userName: any
    };
    order: any;
    table: any;
}