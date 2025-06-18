// ClientApp/src/types/booking.d.ts

export interface CreateBookingRequestDto {
    start_Date: string; // DateTime in C# -> string (ISO 8601)
    end_Date: string;   // DateTime in C# -> string (ISO 8601)
    deskripsi: string; // Reason for booking
    id_Barang: number;
}

export interface BookingHistoryDto { // For user's history
    id_Peminjaman: string;
    start_Date: string;
    end_Date: string;
    deskripsi?: string;
    status_Peminjaman: string; // e.g., "Pending", "Approved", "Declined", "Completed", "Returned"
    nama_Barang: string;
    denda?: number; // long? in C# maps to number | undefined
    alasan_Penolakan?: string; // Assumed column in peminjaman table
    tanggal_Pengajuan?: string; // Assumed column in peminjaman table
    tanggal_Approval?: string; // Assumed column in peminjaman table
    tanggal_Pengembalian_Aktual?: string; // Assumed column in peminjaman table
}

export interface AdminBookingRequestDto { // For admin viewing pending requests
    id_Peminjaman: string;
    start_Date: string;
    end_Date: string;
    deskripsi?: string;
    status_Peminjaman: string;
    nama_Barang: string;
    id_Barang: string;
    nama_Peminjam: string;
    id_Peminjam: string;
    peminjam_Email: string;
    peminjam_No_Telp?: string;
    tanggal_Pengajuan?: string; // Assumed column in peminjaman table
}

export interface AdminBookingHistoryDto { // For admin viewing all history
    id_Peminjaman: string;
    start_Date: string;
    end_Date: string;
    deskripsi?: string;
    status_Peminjaman: string;
    nama_Barang: string;
    id_Barang: string;
    nama_Peminjam: string;
    id_Peminjam: string;
    nama_Admin?: string; // Admin who processed (approved/declined)
    id_Admin?: string; // Assumed column in peminjaman table
    nama_Admin_Pengembalian?: string; // Admin who processed return
    id_Admin_Pengembalian?: string; // Assumed column in peminjaman table
    denda?: number;
    alasan_Penolakan?: string;
    tanggal_Pengajuan?: string;
    tanggal_Approval?: string;
    tanggal_Pengembalian_Aktual?: string;
}

export interface AdminDashboardStatsDto {
    pendingCount: number;
    todaysBookingsCount: number;
}

export interface DeclineBookingDto {
    alasan_Penolakan: string;
}

export interface CompleteBookingDto {
    denda?: number;
    status_Kondisi_Pengembalian: string; // e.g., "Good", "Damaged"
}
