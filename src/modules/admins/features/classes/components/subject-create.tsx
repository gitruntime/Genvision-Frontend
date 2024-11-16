import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateSubject = () => {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-bold">Create New Subject</h2>
      </header>
      <form className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Subject Name
          </label>
          <input
            id="name"
            placeholder="Enter subject name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Subject Code
          </label>
          <input
            id="code"
            placeholder="Enter subject code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Create Subject</Button>
      </form>
    </div>
  );
};

export default CreateSubject;
