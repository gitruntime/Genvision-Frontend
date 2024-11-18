import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const EventListPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Event List Preview</h1>
      <EventList />
    </div>
  );
};

const EventList = () => {
  const events = [
    { id: 1, name: "Annual Sports Day", date: "2024-12-15", type: "Sports" },
    { id: 2, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 3, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 4, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 5, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 6, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 7, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 8, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 9, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 10, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 11, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 12, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
    { id: 13, name: "Cultural Festival", date: "2024-11-20", type: "Cultural" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 overflow-y-scroll max-h-[500px] hide-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Event Name</th>
              <th className="text-left p-4 font-medium">Date</th>
              <th className="text-left p-4 font-medium">Type</th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{event.name}</td>
                <td className="p-4">{event.date}</td>
                <td className="p-4">{event.type}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1">
        <div
          className={`flex flex-1 items-center h-full justify-center rounded-lg border border-dashed shadow-sm`}
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No Events</h3>
            <p className="text-sm text-muted-foreground">
              No Event where selected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
