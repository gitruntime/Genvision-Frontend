import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateEventPreview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Event Preview</h1>
      <div className="flex justify-center">
        <CreateEvent />
      </div>
    </div>
  );
};

const CreateEvent = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="eventName">Event Name</Label>
        <Input id="eventName" placeholder="Enter event name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="eventDate">Date</Label>
        <Input id="eventDate" type="date" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="eventType">Event Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cultural">Cultural</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full">Create Event</Button>
    </form>
  );
};

export default CreateEvent;
