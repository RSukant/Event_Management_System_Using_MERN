import { create } from 'zustand';


export const useEventStore = create((set) => ({
    events: [],
    setEvents: (events) => set({ events }),
    createEvent: async (newEvent) => {
        if(!newEvent.name || !newEvent.place || !newEvent.date || !newEvent.description || !newEvent.image) {
            return {success: false, message: "Please fill all the fields"};
        }
        const res = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        });
        const data = await res.json();
        set((state) => ({ events: [...state.events, data.data] }));
        return {success: true, message: "Event created successfully"};
    },
    fetchEvents: async () => {
        const res = await fetch("/api/events");
        const data = await res.json();
        set({ events: data.data });
    },
    deleteEvent: async (eid) => {
        const res = await fetch(`/api/events/${eid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        //update the ui immediately, without needing a refresh
        set(state => ({ events: state.events.filter(event => event._id !== eid) }));
        return {success: true, message: data.message};
    },
    updateEvent: async (eid, updatedEvent) => {
        const res = await fetch(`/api/events/${eid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEvent),
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        //update the ui immediately, without needing a refresh
        set(state => ({
            events: state.events.map((event) => (event._id === eid ? data.data : event)),
            }));

            return {success: true, message: data.message};
        },
}));