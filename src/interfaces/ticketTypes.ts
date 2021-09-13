export interface TicketsTypes {
    tickets: Ticket[];
    stop: boolean;
}

export interface Ticket {
    price: number;
    carrier: string;
    segments: [
        {
            origin: string;
            destination: string;
            date: string;
            stops: string[];
            duration: number;
        },
        {
            origin: string;
            destination: string;
            date: string;
            stops: string[];
            duration: number;
        },
    ];
}
