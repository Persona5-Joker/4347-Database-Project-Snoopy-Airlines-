"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import useSWR from "swr";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import Image from "next/image";
import SnoopyBackground from "../../public/snoopy-background.png";
import { useRouter } from "next/navigation";

//@ts-expect-error not a big deal here
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR("/api/flight/locations", fetcher);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  function onSearch() {
    // example query
    router.push(
      "/flights?origin=New%20York&destination=Los%20Angeles&departure=2024-10-15&return=2024-10-20"
    );
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div className="min-h-screen">loading...</div>;

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <Tabs defaultValue="book" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2 relative">
          <TabsTrigger className="z-10" value="book">
            Book
          </TabsTrigger>
          <TabsTrigger className="z-10" value="manage-trip">
            Manage Trip / Check-in
          </TabsTrigger>
        </TabsList>
        <TabsContent value="book">
          <Card className="h-[400px] flex flex-col justify-evenly">
            <CardHeader className="relative">
              <CardTitle className="z-10">Book</CardTitle>
              <CardDescription className="z-10">
                Find Your Perfect Destination!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 space-x-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Origin</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Dallas" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.origins.map(
                        (val: { Origin: string }, idx: number) => {
                          return (
                            <SelectItem key={idx} value={val.Origin}>
                              {val.Origin}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Destination</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chicago" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.destinations.map(
                        (val: { Destination: string }, idx: number) => {
                          return (
                            <SelectItem key={idx} value={val.Destination}>
                              {val.Destination}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 space-x-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Origin</Label>
                  <DatePickerWithRange
                    selectedDate={dateRange}
                    onDateChange={setDateRange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Passengers</Label>
                  <Input type="number" min={1} placeholder="1" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onSearch}>Search Flight</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="manage-trip">
          <Card>
            <CardHeader>
              <CardTitle>Manage Trip / Check-in</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="w-[400px] h-[400px] relative ml-24 rounded-lg overflow-hidden shadow-lg">
        <Image
          alt="Mountains"
          src={SnoopyBackground}
          placeholder="blur"
          quality={100}
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
          }}
          className="z-0 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 flex flex-col justify-end p-6 text-white">
          <h2 className="text-2xl font-semibold">Explore the World</h2>
          <p className="text-sm mt-2">Book your next adventure with us</p>
        </div>
      </div>
    </div>
  );
}
