export interface TicketsTypes {
    tickets: Ticket[];
    stop: boolean;
}

export interface Ticket {
    price: number;
    carrier: string;
    segments: Segment[];
}

export interface Segment {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
}
