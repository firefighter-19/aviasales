import { Ticket } from '../interfaces';

export function sortByTime(tickets: Ticket[]): Ticket[] {
    const sortedByTime = [...tickets].sort((a, b) => {
        const segmentTimeA = a.segments.find((segment) => segment.duration);
        const segmentTimeB = b.segments.find((segment) => segment.duration);
        if (segmentTimeB && segmentTimeA) {
            return segmentTimeB?.duration < segmentTimeA?.duration ? 1 : -1;
        }
        return 0;
    });
    return sortedByTime;
}

export function sortByPrice(tickets: Ticket[]): Ticket[] {
    const sortedByPrice = [...tickets].sort((a, b) => a.price - b.price);
    return sortedByPrice;
}
