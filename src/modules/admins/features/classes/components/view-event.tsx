import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

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
  ];

  return (
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
  );
};

export default EventList;
