import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PermissionAddComponentProps {
  children: React.ReactNode;
}

export const PermissionAddComponent: React.FC<PermissionAddComponentProps> = ({
  children,
}) => {
  const customList = (items: number[]) => (
    <Card className="w-[200px] h-[230px]">
      <ScrollArea className="h-full">
        <ul className="p-0 m-0 list-none">
          {items.map((value) => (
            <li
              key={value}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <Checkbox id={`item-${value}`} />
              <label
                htmlFor={`item-${value}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                List item {value + 1}
              </label>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </Card>
  );

  return (
    <>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Permission</DialogTitle>
          <br />
          <DialogDescription className="flex flex-col space-y-4 items-center">
            <Input type="text" placeholder="Name" className="w-full max-w-md" />
            <Input
              type="text"
              placeholder="Code Name"
              className="w-full max-w-md"
            />
            <div className="flex items-center justify-center space-x-4">
              {customList([0, 1, 2, 3])}
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" aria-label="move all right">
                  ≫
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
                <Button variant="outline" size="sm" aria-label="move all left">
                  ≪
                </Button>
              </div>
              {customList([4, 5, 6, 7])}
            </div>
            <Button type="submit" className="w-full max-w-md">
              Submit
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </>
  );
};
